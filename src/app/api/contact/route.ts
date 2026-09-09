import { NextResponse } from "next/server";

import { siteConfig } from "@/config/site";

/**
 * Contact form endpoint. PRD decision 8.
 *
 * Two destinations, checked in order:
 *  1. CONTACT_WEBHOOK_URL, an n8n webhook. Preferred, because the owner
 *     already runs n8n and can fan out from there.
 *  2. RESEND_API_KEY plus CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.
 *
 * With neither configured the route refuses the submission and says so,
 * rather than returning a success the sender would believe.
 */

export const runtime = "nodejs";

type Payload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  /** Honeypot. Real people leave it empty. */
  website?: string;
};

const MAX = { name: 120, email: 200, company: 160, message: 4000 };

/** Deliberately loose. Real validation is the reply landing in an inbox. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(body: unknown): { data: Payload } | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Malformed request." };
  }

  const raw = body as Record<string, unknown>;
  const str = (key: string) =>
    typeof raw[key] === "string" ? (raw[key] as string).trim() : "";

  const name = str("name");
  const email = str("email");
  const company = str("company");
  const message = str("message");
  const website = str("website");

  if (website) return { error: "Rejected." };
  if (name.length < 2 || name.length > MAX.name) {
    return { error: "Give me a name I can reply to." };
  }
  if (!EMAIL.test(email) || email.length > MAX.email) {
    return { error: "That email address does not look right." };
  }
  if (company.length > MAX.company) {
    return { error: "Company name is too long." };
  }
  if (message.length < 10) {
    return { error: "Tell me a little more than that." };
  }
  if (message.length > MAX.message) {
    return { error: "That message is too long. Send the short version." };
  }

  return { data: { name, email, company, message } };
}

/**
 * In-memory throttle. Enough for a single-instance portfolio site. It resets
 * on deploy, which is fine for what it is protecting.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > LIMIT;
}

async function deliver(data: Payload): Promise<{ ok: boolean; error?: string }> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...data, source: siteConfig.url }),
    });
    if (!res.ok) return { ok: false, error: `Webhook returned ${res.status}.` };
    return { ok: true };
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (key && to && from) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: data.email,
        subject: `New enquiry from ${data.name}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          data.company ? `Company: ${data.company}` : null,
          "",
          data.message,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });
    if (!res.ok) return { ok: false, error: `Email provider returned ${res.status}.` };
    return { ok: true };
  }

  return {
    ok: false,
    error:
      "No delivery destination is configured. Set CONTACT_WEBHOOK_URL, or RESEND_API_KEY with CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.",
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const result = validate(body);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Try again later, or just email me." },
      { status: 429 }
    );
  }

  try {
    const delivery = await deliver(result.data);
    if (!delivery.ok) {
      // Never lose a real message to a configuration gap.
      console.error("[contact] undelivered:", delivery.error, result.data);
      return NextResponse.json(
        {
          error:
            "The form is not connected yet. Email me directly and it will reach me.",
        },
        { status: 503 }
      );
    }
  } catch (cause) {
    console.error("[contact] delivery threw:", cause, result.data);
    return NextResponse.json(
      { error: "Something broke on my side. Email me directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

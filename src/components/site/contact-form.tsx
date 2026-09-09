"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "failed"; message: string };

const field =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:border-primary";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus({
          kind: "failed",
          message: data.error ?? "That did not go through.",
        });
        return;
      }

      form.reset();
      setStatus({ kind: "sent" });
    } catch {
      setStatus({
        kind: "failed",
        message: "No connection. Check your network, or email me directly.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div
        className="rounded-lg border border-primary/40 bg-primary/5 p-8"
        role="status"
      >
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          Message sent
        </h3>
        <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
          I read everything and usually reply within a day. If it is urgent,
          book a call instead of waiting on email.
        </p>
        <Button
          variant="outline"
          size="lg"
          className="mt-6"
          onClick={() => setStatus({ kind: "idle" })}
        >
          Send another
        </Button>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            maxLength={120}
            className={field}
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={200}
            className={field}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
        >
          Company <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          maxLength={160}
          className={field}
          placeholder="Where you work"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
        >
          What are you building
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={4000}
          className={`${field} resize-y`}
          placeholder="A paragraph is plenty. What it is, who it is for, and when you need it."
        />
      </div>

      {/* Honeypot. Hidden from people, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status.kind === "failed" ? (
        <p
          className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground/90"
          role="alert"
        >
          {status.message}{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="underline underline-offset-4"
          >
            {siteConfig.email}
          </a>
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button
          type="submit"
          variant="hero"
          size="xl"
          disabled={sending}
          className="text-xs font-semibold uppercase tracking-widest"
        >
          {sending ? "Sending" : "Send message"}
        </Button>
        <p className="text-xs font-light text-muted-foreground/70">
          No newsletter, no CRM sequence. It goes to one inbox.
        </p>
      </div>
    </form>
  );
}

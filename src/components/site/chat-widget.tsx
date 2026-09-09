"use client";

import { useEffect } from "react";

import { chatConfig } from "@/config/site";

/**
 * Deferred loader for the embedded chat widget. PRD section 8.10.
 *
 * The vendor script is injected only once the browser has gone idle after
 * load, so it never competes with first paint. Nothing renders here: the
 * vendors supply their own launcher.
 *
 * Renders nothing at all while the provider is "none", which is the current
 * state until an account exists.
 */
export function ChatWidget() {
  useEffect(() => {
    if (chatConfig.provider === "none" || !chatConfig.id) return;
    if (document.getElementById("site-chat-widget")) return;

    const src =
      chatConfig.provider === "chatbase"
        ? "https://www.chatbase.co/embed.min.js"
        : chatConfig.id;

    const inject = () => {
      const script = document.createElement("script");
      script.id = "site-chat-widget";
      script.src = src;
      script.defer = true;
      if (chatConfig.provider === "chatbase") {
        script.setAttribute("chatbotId", chatConfig.id);
        script.setAttribute("domain", "www.chatbase.co");
      }
      document.body.appendChild(script);
    };

    const supportsIdle = typeof window.requestIdleCallback === "function";
    const handle = supportsIdle
      ? window.requestIdleCallback(inject, { timeout: 4000 })
      : window.setTimeout(inject, 2500);

    return () => {
      if (supportsIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  return null;
}

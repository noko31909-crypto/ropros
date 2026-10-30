"use client";

import { useEffect, useRef } from "react";
import { TURNSTILE_ORIGIN, TURNSTILE_SITE_KEY } from "@/lib/turnstile";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: TurnstileApi } }

let loading: Promise<TurnstileApi> | undefined;

/** Loads Cloudflare's script once. Inserted by our nonced bundle, so the CSP's 'strict-dynamic' allows it. */
function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `${TURNSTILE_ORIGIN}/turnstile/v0/api.js?render=explicit`;
    s.async = true;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile")));
    s.onerror = () => { loading = undefined; reject(new Error("turnstile")); };
    document.head.appendChild(s);
  });
  return loading;
}

type Props = {
  /** Receives a fresh one-time token, or null when it expires or the check fails. */
  onToken: (token: string | null) => void;
  /** "blocked" when Cloudflare's script could not load, otherwise Turnstile's error code (e.g. "110200"). */
  onError: (reason: string) => void;
  /** Change it after every submit: a token is single-use, so the widget issues a new one. */
  resetKey: number;
};

/** Cloudflare Turnstile human check. Managed mode: most people never see a puzzle. */
export function Turnstile({ onToken, onError, resetKey }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const handlers = useRef({ onToken, onError });
  handlers.current = { onToken, onError };

  useEffect(() => {
    let cancelled = false;
    loadTurnstile().then((api) => {
      if (cancelled || !box.current) return;
      widget.current = api.render(box.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "dark",
        size: "flexible",
        callback: (token: string) => handlers.current.onToken(token),
        "expired-callback": () => handlers.current.onToken(null),
        "error-callback": (code?: string) => { handlers.current.onToken(null); handlers.current.onError(String(code ?? "unknown")); },
      });
    }).catch(() => { if (!cancelled) handlers.current.onError("blocked"); });
    return () => {
      cancelled = true;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, []);

  useEffect(() => {
    if (resetKey > 0 && widget.current) { handlers.current.onToken(null); window.turnstile?.reset(widget.current); }
  }, [resetKey]);

  return <div ref={box} className="min-h-[65px]" />;
}

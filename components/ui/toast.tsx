"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

const ToastContext = createContext<(msg: string) => void>(() => {});

/** One global status toast, above the mobile tab bar. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);
  const [n, setN] = useState(0);
  const show = useCallback((m: string) => { setMsg(m); setN((x) => x + 1); }, []);
  useEffect(() => { if (!msg) return; const t = setTimeout(() => setMsg(null), 2400); return () => clearTimeout(t); }, [msg, n]);
  return (
    <ToastContext.Provider value={show}>
      {children}
      <div role="status" aria-live="polite"
        className={`pointer-events-none fixed bottom-24 left-1/2 z-[70] -translate-x-1/2 rounded-xl border border-line bg-ink-900 px-4 py-2 font-mono text-xs text-fg shadow-xl transition-opacity lg:bottom-6 ${msg ? "opacity-100" : "opacity-0"}`}>
        {msg}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

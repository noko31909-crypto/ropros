"use client";

import { createContext, useCallback, useContext, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { clsx } from "clsx";
import { X } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { authMessages } from "@/lib/i18n/messages/auth";
import { LEVEL_FLOORS } from "@/lib/i18n/messages/common";
import { useMessages } from "@/components/i18n/locale-provider";
import { useToast } from "@/components/ui/toast";

/** Public profile row from public.users. XP and level are written only by database functions. */
export type Profile = { id: string; name: string; xp: number; level: number };

type AuthCtx = {
  ready: boolean;
  userId: string | null;
  profile: Profile | null;
  refreshProfile: () => Promise<void>;
  /** Apply XP/level returned by a DB function (e.g. record_progress) without a refetch. */
  applyProgress: (xp: number, level: number) => void;
  openAuth: (reason?: string) => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx | null>(null);

export function useAuth(): AuthCtx {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

/** Level band for a profile: index into LEVEL_FLOORS / common.levels and progress to the next level. */
export function levelBand(p: Pick<Profile, "xp" | "level">) {
  const idx = Math.min(Math.max(p.level, 1), LEVEL_FLOORS.length) - 1;
  const floor = LEVEL_FLOORS[idx]!;
  const next = LEVEL_FLOORS[idx + 1];
  const pct = next === undefined ? 100 : Math.max(0, Math.min(100, Math.round(((p.xp - floor) / (next - floor)) * 100)));
  return { idx, floor, next, pct };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [modal, setModal] = useState<{ open: boolean; reason?: string }>({ open: false });
  const toast = useToast();
  const t = useMessages(authMessages);

  const load = useCallback(async (uid: string | null) => {
    if (!uid) { setProfile(null); return; }
    const { data } = await getSupabaseBrowserClient().from("users").select("id, name, xp, level").eq("id", uid).maybeSingle<Profile>();
    setProfile(data ?? null);
  }, []);

  useEffect(() => {
    let supabase;
    try { supabase = getSupabaseBrowserClient(); } catch { setReady(true); return; } // env missing: run signed-out
    void supabase.auth.getUser().then(({ data }) => { const uid = data.user?.id ?? null; setUserId(uid); void load(uid).finally(() => setReady(true)); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const uid = session?.user.id ?? null;
      setUserId(uid);
      void load(uid);
    });
    return () => sub.subscription.unsubscribe();
  }, [load]);

  const value: AuthCtx = {
    ready, userId, profile,
    refreshProfile: () => load(userId),
    applyProgress: (xp, level) => setProfile((p) => (p ? { ...p, xp, level } : p)),
    openAuth: (reason) => setModal({ open: true, reason }),
    signOut: async () => { await getSupabaseBrowserClient().auth.signOut(); toast(t.signedOut); },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {modal.open && <AuthModal reason={modal.reason} onClose={() => setModal({ open: false })} />}
    </AuthContext.Provider>
  );
}

const field = "h-11 w-full rounded-xl border border-ink-700 bg-ink-950 px-4 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none";

function AuthModal({ reason, onClose }: { reason?: string; onClose: () => void }) {
  const t = useMessages(authMessages);
  const toast = useToast();
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "error" | "info"; text: string } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setMessage(null);
    const supabase = getSupabaseBrowserClient();
    if (mode === "signin") {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) { setMessage({ tone: "error", text: error.message }); return; }
      toast(t.welcomeToast((data.user.user_metadata?.name as string | undefined) ?? email.split("@")[0] ?? ""));
      onClose();
      return;
    }
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name }, emailRedirectTo: window.location.origin } });
    setBusy(false);
    if (error) setMessage({ tone: "error", text: error.message });
    else if (!data.session) setMessage({ tone: "info", text: t.confirm });
    else { toast(t.welcomeToast(name)); onClose(); }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink-950/80 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="auth-title" onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm animate-fade-up rounded-t-[28px] border border-line bg-ink-900 p-7 shadow-2xl sm:rounded-[28px]">
        <div className="flex items-center justify-between">
          <h2 id="auth-title" className="text-xl font-semibold text-fg">{mode === "signin" ? t.welcome : t.join}</h2>
          <button type="button" onClick={onClose} aria-label={t.close} className="rounded-lg p-1 text-fg-subtle hover:text-fg"><X className="h-5 w-5" /></button>
        </div>
        <p className="mt-1 text-sm text-fg-muted">{reason ?? t.perks}</p>
        <div className="mt-5 grid grid-cols-2 rounded-xl bg-ink-950 p-1 text-sm">
          {(["signin", "register"] as const).map((m) => (
            <button key={m} type="button" onClick={() => { setMode(m); setMessage(null); }}
              className={clsx("h-9 rounded-lg font-medium", mode === m ? "bg-ink-800 text-fg" : "text-fg-subtle")}>
              {m === "signin" ? t.signIn : t.register}
            </button>
          ))}
        </div>
        <form onSubmit={(e) => void submit(e)} className="mt-5 space-y-3">
          {mode === "register" && (
            <input value={name} onChange={(e) => setName(e.target.value)} required pattern="[A-Za-z0-9_.]{3,18}" title={t.nameHint} placeholder={t.name} autoComplete="nickname" className={field} />
          )}
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.email} autoComplete="email" className={field} />
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t.password}
            autoComplete={mode === "signin" ? "current-password" : "new-password"} className={field} />
          {message && <p className={clsx("text-sm", message.tone === "error" ? "text-accent" : "text-signal")}>{message.text}</p>}
          <button type="submit" disabled={busy} className="h-11 w-full rounded-xl bg-accent text-sm font-semibold text-ink-950 shadow-glow hover:bg-accent-hover disabled:opacity-60">
            {busy ? t.wait : mode === "signin" ? t.submitSignIn : t.submitRegister}
          </button>
        </form>
      </div>
    </div>
  );
}

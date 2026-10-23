"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { Bug, CheckCircle2, Crown, Heart, Layers, ListChecks, Lock, LogOut, Package, Terminal, type LucideIcon } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { levelBand, useAuth } from "@/components/auth/auth-provider";
import { Avatar } from "@/components/auth/avatar";
import { Container } from "@/components/ui/container";
import { useLocale, useMessages } from "@/components/i18n/locale-provider";
import { LOCALE_TAG } from "@/lib/i18n/config";
import { common } from "@/lib/i18n/messages/common";
import { profile as profileMsgs } from "@/lib/i18n/messages/profile";
import { DeletePost } from "@/components/community/delete-post";
import { Cover } from "@/components/cards/covers";
import { PlatformPill } from "@/components/cards/project-card";
import { getProject, projectHref } from "@/lib/projects";
import { useSavedBuilds } from "@/lib/saved";
import { StatusBadge, type BuildStatus } from "@/components/community/status-badge";

type Stats = { simulated: number; completed: number; posts: number; working: number; debugging: number; likes: number };
type XpEvent = { id: number; reason: string; amount: number; created_at: string };
type OwnPost = { id: string; title: string; status: BuildStatus; image_url: string; likes_count: number; created_at: string; signedUrl?: string };

type Tone = "accent" | "signal";
const ACHIEVEMENTS: { id: string; icon: LucideIcon; tone: Tone; test: (s: Stats, level: number) => boolean }[] = [
  { id: "firstSim", icon: Terminal, tone: "signal", test: (s) => s.simulated >= 1 },
  { id: "firstComplete", icon: ListChecks, tone: "signal", test: (s) => s.completed >= 1 },
  { id: "firstPost", icon: Package, tone: "accent", test: (s) => s.posts >= 1 },
  { id: "works", icon: CheckCircle2, tone: "signal", test: (s) => s.working >= 1 },
  { id: "debug", icon: Bug, tone: "accent", test: (s) => s.debugging >= 1 },
  { id: "threeWorking", icon: Layers, tone: "signal", test: (s) => s.working >= 3 },
  { id: "likes10", icon: Heart, tone: "accent", test: (s) => s.likes >= 10 },
  { id: "level4", icon: Crown, tone: "accent", test: (_s, level) => level >= 4 },
];
const TONE: Record<Tone, string> = {
  accent: "border-accent/40 bg-accent-soft text-accent shadow-[0_0_24px_-4px_rgba(255,122,26,.45)]",
  signal: "border-signal/40 bg-signal-soft text-signal shadow-[0_0_24px_-4px_rgba(46,230,201,.45)]",
};

export function ProfileView() {
  const t = useMessages(profileMsgs);
  const c = useMessages(common);
  const { locale } = useLocale();
  const { ready, userId, profile, openAuth, signOut } = useAuth();
  const supabase = getSupabaseBrowserClient();
  const [stats, setStats] = useState<Stats | null>(null);
  const [history, setHistory] = useState<XpEvent[]>([]);
  const [posts, setPosts] = useState<OwnPost[]>([]);
  const [error, setError] = useState(false);
  const { saved } = useSavedBuilds();
  const savedProjects = saved.map((s) => getProject(s)).filter((p) => p !== undefined);

  useEffect(() => {
    if (!userId) { setStats(null); setHistory([]); setPosts([]); return; }
    let cancelled = false;
    void (async () => {
      // Each query is scoped to the verified session's user id; RLS enforces owner-only reads on progress and xp_events.
      const [prog, own, xp] = await Promise.all([
        supabase.from("user_progress").select("status").eq("user_id", userId),
        supabase.from("community_posts").select("id, title, status, image_url, likes_count, created_at").eq("user_id", userId).order("created_at", { ascending: false }),
        supabase.from("xp_events").select("id, reason, amount, created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(12),
      ]);
      if (cancelled) return;
      if (prog.error || own.error || xp.error) setError(true);
      const progress = (prog.data ?? []) as { status: string }[];
      const mine = (own.data ?? []) as OwnPost[];
      const paths = mine.map((p) => p.image_url);
      const signed = paths.length ? (await supabase.storage.from("community").createSignedUrls(paths, 3600)).data ?? [] : [];
      if (cancelled) return;
      const urlByPath = new Map(signed.map((s) => [s.path, s.signedUrl]));
      setPosts(mine.map((p) => ({ ...p, signedUrl: urlByPath.get(p.image_url) ?? undefined })));
      setHistory((xp.data ?? []) as XpEvent[]);
      setStats({
        simulated: progress.filter((r) => r.status === "simulated" || r.status === "completed").length,
        completed: progress.filter((r) => r.status === "completed").length,
        posts: mine.length,
        working: mine.filter((p) => p.status === "working").length,
        debugging: mine.filter((p) => p.status === "debugging").length,
        likes: mine.reduce((n, p) => n + p.likes_count, 0),
      });
    })();
    return () => { cancelled = true; };
  }, [supabase, userId, profile?.xp]);

  const header = (inner: React.ReactNode) => (
    <header className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-32 left-1/3 h-72 w-[600px] max-w-full rounded-full bg-accent/10 blur-3xl" />
      <Container className="relative py-14 sm:py-20">{inner}</Container>
    </header>
  );

  if (!ready) return header(<p className="text-fg-muted">{t.loading}</p>);

  if (!userId || !profile) {
    return header(
      <div className="max-w-lg rounded-[28px] border border-line bg-ink-850 p-8">
        <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{t.signedOutTitle}</h1>
        <p className="mt-3 text-fg-muted">{t.signedOutLead}</p>
        <button type="button" onClick={() => openAuth()} className="mt-6 inline-flex h-11 items-center rounded-xl bg-accent px-5 text-sm font-semibold text-ink-950 shadow-glow hover:bg-accent-hover">{t.signIn}</button>
      </div>,
    );
  }

  const band = levelBand(profile);
  const levelTitle = c.levels[band.idx] ?? "";
  const dateFmt = new Intl.DateTimeFormat(LOCALE_TAG[locale], { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const unlockedCount = stats ? ACHIEVEMENTS.filter((a) => a.test(stats, profile.level)).length : 0;

  return (
    <>
      {header(
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <Avatar name={profile.name} size="lg" level={band.idx + 1} />
          <div className="min-w-0">
            <h1 className="truncate text-3xl font-semibold tracking-tight text-fg sm:text-4xl">@{profile.name}</h1>
            <p className="mt-1 font-mono text-sm text-signal">{t.levelLine(band.idx + 1, levelTitle)}</p>
          </div>
          <div className="sm:ml-auto sm:w-80">
            <div className="flex justify-between text-sm">
              <span className="text-fg-muted">{profile.xp} XP</span>
              <span className="text-fg-subtle">{band.next !== undefined ? t.toNext(band.idx + 2, Math.max(0, band.next - profile.xp)) : t.maxLevel}</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink-800" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={band.pct}>
              <div className="h-full rounded-full bg-gradient-to-r from-signal to-accent transition-[width] duration-700 motion-reduce:transition-none" style={{ width: `${band.pct}%` }} />
            </div>
            <button type="button" onClick={() => void signOut()} className="mt-4 inline-flex h-9 items-center gap-2 rounded-xl border border-line px-3 text-sm text-fg-muted hover:text-fg">
              <LogOut className="h-4 w-4" aria-hidden />{t.signOut}
            </button>
          </div>
        </div>,
      )}
      <Container className="space-y-12 py-12">
        {error && <p className="text-sm text-accent" role="alert">{t.loadError}</p>}
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-5">
          {([["simulated", stats?.simulated], ["completed", stats?.completed], ["posts", stats?.posts], ["likes", stats?.likes], ["xp", profile.xp]] as const).map(([k, v]) => (
            <div key={k} className="bg-ink-900 p-5">
              <dt className="text-sm text-fg-muted">{t.stats[k]}</dt>
              <dd className="mt-1 text-3xl font-semibold tabular-nums text-fg">{v ?? "–"}</dd>
            </div>
          ))}
        </dl>

        <section>
          <div className="mb-5 flex items-baseline gap-3">
            <h2 className="text-xl font-semibold text-fg">{t.achievementsTitle}</h2>
            <span className="font-mono text-xs text-fg-subtle">{unlockedCount}/{ACHIEVEMENTS.length}</span>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {ACHIEVEMENTS.map((a) => {
              const on = !!stats && a.test(stats, profile.level);
              const [name, desc] = t.achievements[a.id] ?? ["", ""];
              const Icon = a.icon;
              return (
                <li key={a.id} className={clsx("relative overflow-hidden rounded-2xl border p-4 sm:p-5", on ? "border-line bg-ink-850" : "border-line/60 bg-ink-900/60")}>
                  <span className={clsx("inline-flex h-12 w-12 items-center justify-center rounded-2xl border", on ? TONE[a.tone] : "border-line bg-ink-900 text-ink-700")}>
                    {on ? <Icon className="h-6 w-6" aria-hidden /> : <Lock className="h-5 w-5" aria-hidden />}
                  </span>
                  <p className={clsx("mt-4 font-semibold", on ? "text-fg" : "text-fg-subtle")}>{name}</p>
                  <p className={clsx("mt-1 text-sm", on ? "text-fg-muted" : "text-fg-subtle")}>{desc}</p>
                  <span className={clsx("mt-3 inline-block font-mono text-[11px]", on ? "text-signal" : "text-fg-subtle")}>{on ? t.unlocked : t.locked}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-sm text-fg-subtle">{t.howTo}</p>
        </section>

        <section id="saved" className="scroll-mt-24">
          <div className="mb-5 flex items-baseline justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <h2 className="text-xl font-semibold text-fg">{t.savedTitle}</h2>
              <span className="font-mono text-xs text-fg-subtle">{t.savedNote}</span>
            </div>
            <Link href="/projects" className="text-sm font-semibold text-accent hover:underline">{t.savedBrowse}</Link>
          </div>
          {savedProjects.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-ink-700 p-8 text-center text-sm text-fg-subtle">{t.savedEmpty}</p>
          ) : (
            <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
              {savedProjects.map((p) => (
                <Link key={p.slug} href={projectHref(p)}
                  className="group mb-4 block break-inside-avoid overflow-hidden rounded-[28px] border border-line bg-ink-850 transition-colors hover:border-accent/40">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Cover id={p.cover} title={p.title} className="absolute inset-0 h-full w-full" />
                  </div>
                  <div className="flex flex-col gap-2 p-4">
                    <PlatformPill board={p.board} />
                    <p className="font-semibold leading-snug text-fg group-hover:text-accent">{p.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <section>
            <h2 className="mb-5 text-xl font-semibold text-fg">{t.historyTitle}</h2>
            {history.length === 0 ? <p className="text-sm text-fg-subtle">{t.historyEmpty}</p> : (
              <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-ink-900">
                {history.map((e) => (
                  <li key={e.id} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm text-fg">{t.reasons[e.reason] ?? e.reason}</p>
                      <p className="font-mono text-[11px] text-fg-subtle">{dateFmt.format(new Date(e.created_at))}</p>
                    </div>
                    <span className={clsx("font-mono text-sm tabular-nums", e.amount > 0 ? "text-signal" : "text-fg-subtle")}>+{e.amount}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <div className="mb-5 flex items-baseline justify-between gap-3">
              <h2 className="text-xl font-semibold text-fg">{t.postsTitle}</h2>
              <Link href="/community" className="text-sm font-semibold text-accent hover:underline">{t.sharePrompt}</Link>
            </div>
            {posts.length === 0 ? <p className="text-sm text-fg-subtle">{t.postsEmpty}</p> : (
              <div className="columns-2 gap-4 sm:columns-3">
                {posts.map((p) => (
                  <article key={p.id} className="mb-4 break-inside-avoid overflow-hidden rounded-[28px] border border-line bg-ink-850">
                    <div className="relative">
                      {p.signedUrl
                        // eslint-disable-next-line @next/next/no-img-element -- short-lived signed URL from a private bucket
                        ? <img src={p.signedUrl} alt={p.title} loading="lazy" className="block h-auto min-h-32 w-full object-cover" />
                        : <div className="aspect-square bg-ink-800" />}
                      <div className="absolute left-2 top-2 origin-top-left scale-90"><StatusBadge status={p.status} label={t.status[p.status]} /></div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 p-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-fg">{p.title}</p>
                        <p className="font-mono text-[11px] text-fg-subtle">{dateFmt.format(new Date(p.created_at))}</p>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-fg-muted"><Heart className="h-3.5 w-3.5" aria-hidden />{p.likes_count}</span>
                      <DeletePost id={p.id} title={p.title} imagePath={p.image_url} onDeleted={(id) => setPosts((ps) => ps.filter((x) => x.id !== id))} />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </Container>
    </>
  );
}

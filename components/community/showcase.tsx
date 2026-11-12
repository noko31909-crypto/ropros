"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";
import Link from "next/link";
import { Camera, Info, Plus, Users } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/components/ui/toast";
import { Container } from "@/components/ui/container";
import { useMessages } from "@/components/i18n/locale-provider";
import { community } from "@/lib/i18n/messages/community";
import { PostCard, type FeedPost } from "./post-card";
import { ShareModal } from "./share-modal";

type Filter = "all" | "working" | "debugging";
type Sort = "newest" | "popular";

export function CommunityShowcase() {
  const t = useMessages(community);
  const supabase = getSupabaseBrowserClient();
  const { userId, profile, openAuth, refreshProfile } = useAuth();
  const toast = useToast();
  const [posts, setPosts] = useState<FeedPost[] | null>(null);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("newest");
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  const load = useCallback(async () => {
    const { data, error: err } = await supabase
      .from("community_posts")
      .select("id, user_id, title, status, image_url, likes_count, created_at, users!community_posts_user_id_fkey(name, level)")
      .order("created_at", { ascending: false })
      .limit(90);
    if (err) { setError(true); setPosts([]); return; }
    setError(false);
    const rows = (data ?? []) as unknown as (Omit<FeedPost, "author" | "authorLevel" | "signedUrl"> & { users: { name: string; level: number } | null })[];
    const paths = rows.map((r) => r.image_url);
    const signed = paths.length ? (await supabase.storage.from("community").createSignedUrls(paths, 3600)).data ?? [] : [];
    const urlByPath = new Map(signed.map((s) => [s.path, s.signedUrl]));
    setPosts(rows.map(({ users, ...r }) => ({ ...r, author: users?.name ?? "maker", authorLevel: users?.level, signedUrl: urlByPath.get(r.image_url) ?? undefined })));
  }, [supabase]);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    if (!userId) { setLiked(new Set()); return; }
    // RLS: post_likes rows are readable only by their owner.
    void supabase.from("post_likes").select("post_id").then(({ data }) => setLiked(new Set((data ?? []).map((r) => r.post_id as string))));
  }, [supabase, userId]);

  const toggleLike = async (post: FeedPost) => {
    if (!userId) { openAuth(t.authLike); return; }
    const isLiked = liked.has(post.id);
    // Optimistic UI; likes_count itself is maintained by the post_likes trigger.
    setLiked((s) => { const n = new Set(s); if (isLiked) n.delete(post.id); else n.add(post.id); return n; });
    setPosts((ps) => ps?.map((p) => (p.id === post.id ? { ...p, likes_count: Math.max(0, p.likes_count + (isLiked ? -1 : 1)) } : p)) ?? null);
    const { error: err } = isLiked
      ? await supabase.from("post_likes").delete().eq("post_id", post.id).eq("user_id", userId)
      : await supabase.from("post_likes").insert({ post_id: post.id, user_id: userId });
    if (err) {
      setLiked((s) => { const n = new Set(s); if (isLiked) n.add(post.id); else n.delete(post.id); return n; });
      void load();
    }
  };

  const onPublished = async () => {
    setOpen(false);
    const before = profile?.xp ?? 0;
    await load();
    void refreshProfile();
    // XP is written by DB triggers; re-read our own row to report what this post earned (0 if the daily cap was hit).
    let gained = 0;
    if (userId) {
      const { data } = await supabase.from("users").select("xp").eq("id", userId).single();
      gained = ((data?.xp as number | undefined) ?? before) - before;
    }
    toast(gained > 0 ? t.xpGained(gained) : t.xpCapped);
  };

  const list = useMemo(() => {
    const base = (posts ?? []).filter((p) => filter === "all" || p.status === filter);
    return sort === "popular" ? [...base].sort((a, b) => b.likes_count - a.likes_count || b.created_at.localeCompare(a.created_at)) : base;
  }, [posts, filter, sort]);

  const chip = (k: Filter) => (
    <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)}
      className={clsx("h-9 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors",
        filter === k ? "border-accent/60 bg-accent-soft text-accent" : "border-line text-fg-muted hover:text-fg")}>
      {t.filters[k]}
    </button>
  );

  return (
    <>
      <header className="relative overflow-hidden border-b border-line bg-ink-900/40">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <Container className="relative flex flex-col gap-6 py-8 sm:gap-8 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-5 hidden h-10 w-10 items-center justify-center rounded-xl border border-line bg-ink-850 text-fg-muted sm:inline-flex"><Users className="h-5 w-5" aria-hidden /></div>
            <h1 className="text-[2rem] font-semibold leading-tight tracking-tight text-fg sm:text-5xl">{t.title}</h1>
            <p className="mt-3 max-w-xl text-base text-fg-muted sm:mt-4 sm:text-lg">{t.lead}</p>
          </div>
          <button type="button" onClick={() => (userId ? setOpen(true) : openAuth(t.authShare))}
            className="group relative isolate inline-flex h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-accent px-6 text-base font-semibold text-ink-950 shadow-glow transition-all hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 sm:w-auto sm:self-start lg:self-auto">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-ink-950/15 transition-transform group-hover:rotate-90 motion-reduce:group-hover:rotate-0"><Plus className="h-4 w-4" /></span>
            {t.share}
          </button>
        </Container>
      </header>
      <Container className="py-8 sm:py-10">
        {/* Filters only make sense once there is something to filter. */}
        <div className={clsx("-mx-5 mb-6 flex items-center gap-2 overflow-x-auto px-5 sm:mx-0 sm:mb-8 sm:flex-wrap sm:px-0", !posts?.length && "hidden")}>
          {(["all", "working", "debugging"] as const).map(chip)}
          <label className="ml-2 flex shrink-0 items-center gap-2 text-sm text-fg-subtle">
            <span className="sr-only sm:not-sr-only">{t.sort.label}</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}
              className="h-9 rounded-full border border-line bg-ink-900 px-3 text-base sm:text-sm text-fg focus:border-accent focus:outline-none">
              <option value="newest">{t.sort.newest}</option>
              <option value="popular">{t.sort.popular}</option>
            </select>
          </label>
          <span className="ml-auto shrink-0 text-sm text-fg-subtle">{posts ? t.count(list.length) : t.loading}</span>
        </div>
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-line bg-ink-900 px-4 py-3 text-sm text-fg-muted">
          <Info className="h-4 w-4 shrink-0 text-fg-subtle" aria-hidden />
          <p className="flex-1">{userId ? t.signedInNote : t.signedOutNote}</p>
          {!userId && <button type="button" onClick={() => openAuth()} className="inline-flex h-9 shrink-0 items-center rounded-lg border border-line px-3 text-sm font-semibold text-fg hover:border-fg-subtle">{t.signIn}</button>}
        </div>
        {error && <p className="mb-6 text-sm text-accent" role="alert">{t.loadError}</p>}
        {/* While the feed loads, hold the empty state's space so nothing below jumps when it arrives. */}
        {posts === null && !error ? (
          <div aria-busy="true" aria-label={t.loading} className="h-[340px] animate-pulse rounded-[28px] border border-line bg-ink-900 motion-reduce:animate-none" />
        ) : posts && list.length === 0 && !error ? (
          <div className="rounded-[28px] border border-line bg-gradient-to-b from-ink-850 to-ink-900 px-6 py-12 text-center sm:py-16">
            <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-ink-900 text-fg-muted"><Camera className="h-6 w-6" aria-hidden /></span>
            <h2 className="mt-5 text-xl font-semibold text-fg">{t.empty} {t.emptyCta}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">{t.emptyBody}</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={() => (userId ? setOpen(true) : openAuth(t.authShare))}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-ink-950 hover:bg-accent-hover"><Plus className="h-4 w-4" aria-hidden />{t.share}</button>
              <Link href="/projects" className="inline-flex h-11 items-center justify-center rounded-xl border border-ink-700 bg-ink-850 px-5 text-sm font-semibold text-fg hover:border-fg-subtle">{t.emptyGuides}</Link>
            </div>
          </div>
        ) : (
          <div className="columns-2 gap-3 sm:gap-6 lg:columns-3 2xl:columns-4">
            {list.map((p) => <PostCard key={p.id} post={p} liked={liked.has(p.id)} mine={!!userId && p.user_id === userId} onLike={() => void toggleLike(p)}
              onDeleted={(id) => setPosts((ps) => ps?.filter((x) => x.id !== id) ?? null)} />)}
          </div>
        )}
      </Container>
      {open && userId && <ShareModal userId={userId} onClose={close} onPublished={() => void onPublished()} />}
    </>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { Camera, MessageCircle, Plus } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/components/ui/toast";
import { useMessages } from "@/components/i18n/locale-provider";
import { community } from "@/lib/i18n/messages/community";
import type { FeedPost } from "./post-card";
import { PostDialog } from "./post-dialog";
import { ShareModal } from "./share-modal";
import { StatusBadge } from "./status-badge";
import { useBuildCounts } from "./use-build-counts";

const SHOWN = 8;
type Row = Omit<FeedPost, "author" | "authorLevel" | "signedUrl" | "guide"> & { users: { name: string; level: number } | null };

/**
 * "Built by the community" on a guide page: the latest build logs linked to this guide, how many makers shared one,
 * and "I built this", which opens the share form with the guide already picked. Real posts only: an empty state
 * when there are none.
 */
export function BuildLogs({ projectId, slug, title }: { projectId: string; slug: string; title: string }) {
  const t = useMessages(community);
  const { userId, profile, openAuth, refreshProfile } = useAuth();
  const toast = useToast();
  const [posts, setPosts] = useState<FeedPost[] | null>(null);
  const { counts, refresh: refreshCounts } = useBuildCounts(projectId);
  const [error, setError] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [openPost, setOpenPost] = useState<string | null>(null);
  const closeShare = useCallback(() => setSharing(false), []);
  const closePost = useCallback(() => setOpenPost(null), []);

  const load = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    const query = (counts: boolean) => supabase.from("community_posts")
      .select(`id, user_id, title, status, image_url, likes_count,${counts ? " comments_count," : ""} created_at, users!community_posts_user_id_fkey(name, level)`)
      .eq("project_id", projectId).order("created_at", { ascending: false }).limit(SHOWN);
    let list = await query(true);
    // 42703: comments_count is missing until migration 0003 runs.
    if (list.error?.code === "42703") list = await query(false);
    if (list.error) { setError(true); setPosts([]); return; }
    setError(false);
    const rows = (list.data ?? []) as unknown as Row[];
    const paths = rows.map((r) => r.image_url);
    const signed = paths.length ? (await supabase.storage.from("community").createSignedUrls(paths, 3600)).data ?? [] : [];
    const urlByPath = new Map(signed.map((s) => [s.path, s.signedUrl]));
    setPosts(rows.map(({ users, ...r }) => ({ ...r, comments_count: r.comments_count ?? 0, author: users?.name ?? "maker", authorLevel: users?.level, signedUrl: urlByPath.get(r.image_url) ?? undefined, guide: slug })));
  }, [projectId, slug]);

  useEffect(() => { void load(); }, [load]);

  const countComments = useCallback((delta: number) => {
    setPosts((ps) => ps?.map((p) => (p.id === openPost ? { ...p, comments_count: Math.max(0, p.comments_count + delta) } : p)) ?? null);
  }, [openPost]);

  const onPublished = async () => {
    setSharing(false);
    const before = profile?.xp ?? 0;
    await load();
    refreshCounts();
    void refreshProfile();
    // XP is written by database triggers: re-read our own row to say what this post earned (0 after the daily cap).
    let gained = 0;
    if (userId) {
      const { data } = await getSupabaseBrowserClient().from("users").select("xp").eq("id", userId).single();
      gained = ((data?.xp as number | undefined) ?? before) - before;
    }
    toast(gained > 0 ? t.xpGained(gained) : t.xpCapped);
  };

  const share = () => (userId ? setSharing(true) : openAuth(t.builds.auth));
  const current = openPost ? posts?.find((p) => p.id === openPost) : undefined;

  return (
    <section aria-labelledby="build-logs" className="border-t border-line py-12 sm:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="build-logs" className="text-2xl font-semibold tracking-tight text-fg">{t.builds.title}</h2>
          <p className="mt-2 text-fg-muted">{posts === null ? t.loading : error ? t.builds.loadError
            : counts && counts.builders > 0 ? (counts.working > 0 ? t.builds.countWorking(counts.builders, counts.working) : t.builds.count(counts.builders))
            : posts.length > 0 ? t.builds.count(new Set(posts.map((p) => p.user_id)).size) : t.builds.none}</p>
        </div>
        <button type="button" onClick={share}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-ink-950 shadow-glow hover:bg-accent-hover">
          <Plus className="h-4 w-4" aria-hidden />{t.builds.cta}
        </button>
      </div>
      {posts === null ? (
        <div aria-hidden className="mt-8 h-40 animate-pulse rounded-[28px] border border-line bg-ink-900 motion-reduce:animate-none" />
      ) : posts.length > 0 && (
        <ul className="mt-8 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
          {posts.map((p) => (
            <li key={p.id} className="mb-3 break-inside-avoid sm:mb-4">
              <button type="button" onClick={() => setOpenPost(p.id)} aria-label={t.open(p.title)}
                className="group relative block w-full overflow-hidden rounded-[20px] border border-line bg-ink-850 text-left transition-colors hover:border-accent/40 sm:rounded-[28px]">
                {p.signedUrl
                  // eslint-disable-next-line @next/next/no-img-element -- short-lived signed URL from a private bucket
                  ? <img src={p.signedUrl} alt="" loading="lazy" className="block h-auto min-h-32 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100" />
                  : <span className="flex aspect-[4/5] w-full items-center justify-center bg-ink-800 bg-grid"><Camera className="h-6 w-6 text-fg-subtle" aria-hidden /></span>}
                <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950/90 to-transparent" aria-hidden />
                <span className="absolute left-2 top-2 origin-top-left scale-[.82]"><StatusBadge status={p.status} label={t.status[p.status]} /></span>
                <span className="absolute inset-x-3 bottom-2.5 flex items-end justify-between gap-2">
                  <span className="min-w-0 truncate text-[13px] font-semibold text-fg sm:text-sm">@{p.author}</span>
                  {p.comments_count > 0 && <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] text-fg-muted"><MessageCircle className="h-3.5 w-3.5" aria-hidden />{p.comments_count}</span>}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {sharing && userId && <ShareModal userId={userId} onClose={closeShare} onPublished={() => void onPublished()} initialProjectId={projectId} initialTitle={title} />}
      {current && <PostDialog post={current} guideTitle={title} onClose={closePost} onCountChange={countComments} />}
    </section>
  );
}

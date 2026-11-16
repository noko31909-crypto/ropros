"use client";

import { useCallback, useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

export type BuildCounts = { builders: number; working: number };
const cache = new Map<string, Promise<BuildCounts | null>>();

async function fetchCounts(projectId: string): Promise<BuildCounts | null> {
  const supabase = getSupabaseBrowserClient();
  const both = await supabase.rpc("project_build_counts", { p_project: projectId });
  const row = Array.isArray(both.data) ? (both.data[0] as Partial<BuildCounts> | undefined) : undefined;
  if (!both.error && row) return { builders: Number(row.builders ?? 0), working: Number(row.working ?? 0) };
  // Before migration 0004: only the makers count exists.
  const builders = await supabase.rpc("project_builders", { p_project: projectId });
  return builders.error || typeof builders.data !== "number" ? null : { builders: builders.data, working: 0 };
}

/**
 * Makers who shared a build of a guide and how many got it working (project_build_counts(), 0004), shared by the
 * guide header badge and the build logs section. `refresh` re-reads after a new post.
 */
export function useBuildCounts(projectId: string | null) {
  const [counts, setCounts] = useState<BuildCounts | null>(null);
  const [version, setVersion] = useState(0);
  useEffect(() => {
    if (!projectId) { setCounts(null); return; }
    let alive = true;
    let p = cache.get(projectId);
    if (!p) { p = fetchCounts(projectId).catch(() => null); cache.set(projectId, p); }
    void p.then((c) => { if (alive) setCounts(c); });
    return () => { alive = false; };
  }, [projectId, version]);
  const refresh = useCallback(() => { if (projectId) cache.delete(projectId); setVersion((v) => v + 1); }, [projectId]);
  return { counts, refresh };
}

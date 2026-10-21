-- ---------- user_progress ----------
create table public.user_progress (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.users (id) on delete cascade,
  project_id    uuid not null references public.projects (id) on delete cascade,
  status        public.progress_status not null default 'not_started',
  is_completed  boolean generated always as (status = 'completed') stored,
  simulated_at  timestamptz,
  completed_at  timestamptz,
  updated_at    timestamptz not null default now(),
  unique (user_id, project_id)          -- one row per user per project
);
create index user_progress_user_idx on public.user_progress (user_id, updated_at desc);

-- ---------- community_posts ----------
create table public.community_posts (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.users (id) on delete cascade,
  project_id   uuid references public.projects (id) on delete set null,
  title        text not null check (length(title) between 1 and 80),
  status       public.build_status not null default 'working',
  image_url    text not null,           -- storage path inside the 'community' bucket
  likes_count  integer not null default 0 check (likes_count >= 0),
  created_at   timestamptz not null default now()
);
create index community_posts_recent_idx  on public.community_posts (created_at desc);
create index community_posts_popular_idx on public.community_posts (likes_count desc, created_at desc);

-- One like per user per post, enforced by the primary key (not by app code).
create table public.post_likes (
  post_id     uuid not null references public.community_posts (id) on delete cascade,
  user_id     uuid not null references public.users (id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (post_id, user_id)
);

-- likes_count is maintained atomically by triggers; clients can't write it.
create function public.sync_likes_count() returns trigger
language plpgsql security definer set search_path = '' as $fn$
begin
  if tg_op = 'INSERT' then
    update public.community_posts set likes_count = likes_count + 1 where id = new.post_id;
  else
    update public.community_posts set likes_count = greatest(likes_count - 1, 0) where id = old.post_id;
  end if;
  return null;
end $fn$;
create trigger post_likes_count after insert or delete on public.post_likes
  for each row execute function public.sync_likes_count();


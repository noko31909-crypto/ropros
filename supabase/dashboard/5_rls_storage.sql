-- ---------- Row Level Security ----------
alter table public.users           enable row level security;
alter table public.projects        enable row level security;
alter table public.user_progress   enable row level security;
alter table public.community_posts enable row level security;
alter table public.post_likes      enable row level security;
alter table public.xp_events       enable row level security;

-- users: public profile fields readable by everyone, email is NOT granted to clients.
revoke all on public.users from anon, authenticated;
grant select (id, name, avatar_url, xp, level, created_at) on public.users to anon, authenticated;
grant update (name, avatar_url) on public.users to authenticated;
create policy users_read        on public.users for select using (true);
create policy users_update_self on public.users for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

-- projects: read published only, writes go through the service role (admin tooling).
revoke all on public.projects from anon, authenticated;
grant select on public.projects to anon, authenticated;
create policy projects_read on public.projects for select using (is_published);

-- user_progress: each user reads only their own rows, writes only via record_progress().
revoke all on public.user_progress from anon, authenticated;
grant select on public.user_progress to authenticated;
create policy progress_read_own on public.user_progress for select to authenticated using (user_id = auth.uid());

-- community_posts: public feed, authors create/edit/delete their own, likes_count is not writable.
revoke all on public.community_posts from anon, authenticated;
grant select on public.community_posts to anon, authenticated;
grant insert (user_id, project_id, title, status, image_url) on public.community_posts to authenticated;
grant update (title, status) on public.community_posts to authenticated;
grant delete on public.community_posts to authenticated;
create policy posts_read       on public.community_posts for select using (true);
create policy posts_insert_own on public.community_posts for insert to authenticated
  with check (user_id = auth.uid()
              and image_url like auth.uid()::text || '/%');   -- image must live in the authors folder
create policy posts_update_own on public.community_posts for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy posts_delete_own on public.community_posts for delete to authenticated using (user_id = auth.uid());

-- post_likes: users like/unlike as themselves only.
revoke all on public.post_likes from anon, authenticated;
grant select, insert, delete on public.post_likes to authenticated;
create policy likes_read_own   on public.post_likes for select to authenticated using (user_id = auth.uid());
create policy likes_insert_own on public.post_likes for insert to authenticated with check (user_id = auth.uid());
create policy likes_delete_own on public.post_likes for delete to authenticated using (user_id = auth.uid());

-- xp_events: private ledger, visible to its owner.
revoke all on public.xp_events from anon, authenticated;
grant select on public.xp_events to authenticated;
create policy xp_read_own on public.xp_events for select to authenticated using (user_id = auth.uid());

-- Functions: only the progress RPC is callable from clients.
revoke execute on function public.record_progress(uuid, text) from public, anon;
grant  execute on function public.record_progress(uuid, text) to authenticated;
revoke execute on function public.award_xp(uuid, text, uuid, integer) from public, anon, authenticated;
revoke execute on function public.handle_new_user()  from public, anon, authenticated;
revoke execute on function public.sync_likes_count() from public, anon, authenticated;
revoke execute on function public.reward_post()      from public, anon, authenticated;

-- ---------- Storage: private-by-default bucket for build photos ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('community', 'community', false, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy community_upload_own on storage.objects for insert to authenticated
  with check (bucket_id = 'community' and (storage.foldername(name))[1] = auth.uid()::text);
create policy community_delete_own on storage.objects for delete to authenticated
  using (bucket_id = 'community' and (storage.foldername(name))[1] = auth.uid()::text);
create policy community_read on storage.objects for select
  using (bucket_id = 'community');   -- serve via short-lived signed URLs from the server

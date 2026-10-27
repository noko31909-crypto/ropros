-- ropros security hardening, part e of 5: Storage policies
-- Paste the whole file into the Supabase SQL editor and run it. Parts go in order, 6a first.
-- Safe to run again: anything already there is skipped or replaced.
-- A notice saying a relation already exists is normal, not an error.

-- ---------- 7. Storage policies (last: these need ownership of storage.objects) ----------
drop policy if exists community_read on storage.objects;
create policy community_read on storage.objects for select
  using (bucket_id = 'community'
         and ((storage.foldername(name))[1] = (select auth.uid())::text
              or exists (select 1 from public.community_posts p where p.image_url = objects.name)));

drop policy if exists community_upload_own on storage.objects;
create policy community_upload_own on storage.objects for insert to authenticated
  with check (bucket_id = 'community'
              and (storage.foldername(name))[1] = (select auth.uid())::text
              and public.community_upload_allowed());

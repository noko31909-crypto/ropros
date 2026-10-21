-- =====================================================================
-- ropros · initial schema (Supabase / PostgreSQL 15+)
-- Passwords live only in Supabase Auth (auth.users). public.users holds the public profile.
-- Clients get read access + narrow column grants, all scoring (XP, likes, progress)
-- happens inside SECURITY DEFINER functions, so it cannot be faked from the browser.
-- =====================================================================

-- ---------- Types ----------
create type public.platform_type    as enum ('arduino', 'esp32', 'raspberry_pi');
create type public.difficulty_level as enum ('beginner', 'intermediate', 'advanced');
-- Declaration order matters: GREATEST() uses it so progress never moves backwards.
create type public.progress_status  as enum ('not_started', 'in_progress', 'simulated', 'completed');
create type public.build_status     as enum ('working', 'debugging');

-- ---------- users (public profile, 1:1 with auth.users) ----------
create table public.users (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null unique,
  name        text not null check (name ~ '^[A-Za-z0-9_.]{3,24}\Z'),
  avatar_url  text check (avatar_url is null or avatar_url ~ '^https://'),
  xp          integer not null default 0 check (xp >= 0),
  -- Level is derived from XP, so it can never disagree with it.
  level       integer generated always as (
                case when xp >= 1600 then 6 when xp >= 1100 then 5 when xp >= 700 then 4
                     when xp >= 400 then 3 when xp >= 150 then 2 else 1 end) stored,
  created_at  timestamptz not null default now()
);
create unique index users_name_lower_idx on public.users (lower(name));

-- Create the profile automatically when someone signs up through Supabase Auth.
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $fn$
declare
  wanted text := coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1));
  clean  text := left(regexp_replace(wanted, '[^A-Za-z0-9_.]', '', 'g'), 18);
begin
  if length(clean) < 3 then clean := 'maker'; end if;
  insert into public.users (id, email, name)
  values (new.id, new.email, clean || '_' || substr(replace(new.id::text, '-', ''), 1, 5));
  return new;
end $fn$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- projects ----------
create table public.projects (
  id                   uuid primary key default gen_random_uuid(),
  slug                 text not null unique check (slug ~ '^[a-z0-9-]{3,64}\Z'),
  title                text not null check (length(title) between 1 and 120),
  platform             public.platform_type not null,
  difficulty           public.difficulty_level not null,
  components_required  text[] not null check (cardinality(components_required) between 1 and 40),
  wiring_json          jsonb  not null default '[]'::jsonb check (jsonb_typeof(wiring_json) = 'array'),
  code_block           text   not null default '' check (length(code_block) <= 50000),
  xp_reward            integer not null default 200 check (xp_reward between 0 and 1000),
  is_published         boolean not null default false,
  created_at           timestamptz not null default now()
);
create index projects_components_gin on public.projects using gin (components_required);
create index projects_platform_idx   on public.projects (platform, difficulty) where is_published;


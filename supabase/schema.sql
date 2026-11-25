-- ============================================================================
-- Vitrine RSE — Schéma PostgreSQL / Supabase Multi-Éditions (10+ ans)
-- Organisateur : INGRIDD (Ouagadougou, Burkina Faso)
-- ============================================================================

create extension if not exists "pgcrypto";

-- Enums
create type edition_status as enum (
  'brouillon',
  'annoncee',
  'inscriptions_ouvertes',
  'en_cours',
  'terminee',
  'archivee'
);

create type registration_type as enum (
  'participant',
  'exposant',
  'partenaire',
  'intervenant'
);

create type registration_status as enum (
  'nouvelle',
  'en_cours',
  'validee',
  'refusee'
);

create type partner_category as enum (
  'institutionnel',
  'technique',
  'financier',
  'media',
  'entreprise'
);

create type user_role as enum (
  'admin',
  'editeur',
  'gestionnaire_inscriptions'
);

-- 1. Profils & Rôles d'administration
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null,
  role user_role not null default 'editeur',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Éditions (cœur du système multi-éditions)
create table if not exists public.editions (
  id uuid primary key default gen_random_uuid(),
  year int not null unique,
  edition_number int not null unique,
  slug text not null unique,
  title text not null,
  theme text,
  status edition_status not null default 'brouillon',
  start_date date,
  end_date date,
  date_label text not null,
  location text not null,
  city text not null default 'Ouagadougou',
  poster_url text,
  banner_url text,
  summary text,
  is_featured boolean not null default false,
  registration_open boolean not null default false,
  accent_color text default '#115338',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_editions_year on public.editions(year desc);
create index idx_editions_status on public.editions(status);

-- 3. Programme & Séances
create table if not exists public.program_sessions (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid not null references public.editions(id) on delete cascade,
  day_number int not null,
  day_label text not null,
  act_number text,
  time_range text not null,
  title text not null,
  session_type text not null default 'panel',
  description text,
  sort_order int not null default 0
);

create index idx_program_edition on public.program_sessions(edition_id, day_number, sort_order);

-- 4. Thèmes des Panels
create table if not exists public.panel_themes (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid not null references public.editions(id) on delete cascade,
  panel_number int not null,
  title text not null,
  schedule_label text not null,
  main_question text not null,
  sub_questions jsonb not null default '[]'::jsonb
);

-- 5. Intervenants
create table if not exists public.speakers (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid not null references public.editions(id) on delete cascade,
  full_name text not null,
  role_title text not null,
  organization text not null,
  bio text,
  photo_url text,
  sort_order int not null default 0
);

-- 6. Organisations & Partenaires
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category partner_category not null default 'entreprise',
  logo_url text not null,
  website_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.edition_partners (
  edition_id uuid not null references public.editions(id) on delete cascade,
  partner_id uuid not null references public.partners(id) on delete cascade,
  tier text default 'partenaire',
  primary key (edition_id, partner_id)
);

-- 7. Exposants (notamment FCPE)
create table if not exists public.exhibitors (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid not null references public.editions(id) on delete cascade,
  organization_name text not null,
  sector text,
  stand_code text,
  description text,
  logo_url text
);

-- 8. Inscriptions & Demandes (liées à une édition précise)
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid not null references public.editions(id) on delete restrict,
  type registration_type not null,
  full_name text not null,
  email text not null,
  phone text not null,
  organization text,
  role_title text,
  sector text,
  message text,
  metadata jsonb not null default '{}'::jsonb,
  status registration_status not null default 'nouvelle',
  consent_gdpr boolean not null default false,
  consent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_registrations_edition_type on public.registrations(edition_id, type, status);
create index idx_registrations_created on public.registrations(created_at desc);

-- 9. Actualités / Articles éditoriaux
create table if not exists public.news_articles (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid references public.editions(id) on delete set null,
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null default 'Événement',
  image_url text,
  external_url text,
  published_at date not null default current_date,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create index idx_news_published on public.news_articles(is_published, published_at desc);

-- 10. Médiathèque (Photos, Vidéos, Affiches)
create table if not exists public.media_items (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid references public.editions(id) on delete set null,
  title text not null,
  media_type text not null check (media_type in ('photo', 'video', 'affiche', 'document')),
  url text not null,
  thumbnail_url text,
  caption text,
  created_at timestamptz not null default now()
);

-- 11. Prix & Distinctions (Trophées Vitrine RSE & FCPE)
create table if not exists public.awards (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid not null references public.editions(id) on delete cascade,
  title text not null,
  category text not null,
  recipient text,
  description text
);

-- 12. Journal d'audit administratif
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================
alter table public.profiles enable row level security;
alter table public.editions enable row level security;
alter table public.program_sessions enable row level security;
alter table public.panel_themes enable row level security;
alter table public.speakers enable row level security;
alter table public.partners enable row level security;
alter table public.edition_partners enable row level security;
alter table public.exhibitors enable row level security;
alter table public.registrations enable row level security;
alter table public.news_articles enable row level security;
alter table public.media_items enable row level security;
alter table public.awards enable row level security;
alter table public.audit_logs enable row level security;

-- Helper function to check user role
create or replace function public.has_role(required_roles user_role[])
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = any(required_roles)
  );
$$;

-- Public read access for published content (never drafts)
create policy "Public read published editions" on public.editions
  for select using (status <> 'brouillon' or public.has_role(array['admin','editeur']::user_role[]));

create policy "Public read program" on public.program_sessions
  for select using (true);

create policy "Public read panels" on public.panel_themes
  for select using (true);

create policy "Public read speakers" on public.speakers
  for select using (true);

create policy "Public read partners" on public.partners
  for select using (is_active = true or public.has_role(array['admin','editeur']::user_role[]));

create policy "Public read edition_partners" on public.edition_partners
  for select using (true);

create policy "Public read exhibitors" on public.exhibitors
  for select using (true);

create policy "Public read published news" on public.news_articles
  for select using (is_published = true or public.has_role(array['admin','editeur']::user_role[]));

create policy "Public read media" on public.media_items
  for select using (true);

create policy "Public read awards" on public.awards
  for select using (true);

-- Registrations: public can INSERT only if consent_gdpr = true; ONLY authorized staff can SELECT/UPDATE
create policy "Public insert registration" on public.registrations
  for insert with check (consent_gdpr = true);

create policy "Staff read registrations" on public.registrations
  for select using (public.has_role(array['admin','gestionnaire_inscriptions']::user_role[]));

create policy "Staff update registrations" on public.registrations
  for update using (public.has_role(array['admin','gestionnaire_inscriptions']::user_role[]));

-- Admin & Editor write policies
create policy "Admins manage editions" on public.editions
  for all using (public.has_role(array['admin','editeur']::user_role[]));

create policy "Admins manage news" on public.news_articles
  for all using (public.has_role(array['admin','editeur']::user_role[]));

create policy "Admins manage partners" on public.partners
  for all using (public.has_role(array['admin','editeur']::user_role[]));

create policy "Admins read audit logs" on public.audit_logs
  for select using (public.has_role(array['admin']::user_role[]));

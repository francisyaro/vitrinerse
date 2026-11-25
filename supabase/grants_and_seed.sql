-- ============================================================================
-- Droits (GRANT) pour Supabase PostgREST + Initialisation des éditions 2024–2027
-- À exécuter dans Supabase → SQL Editor → Run
-- ============================================================================

grant usage on schema public to anon, authenticated, service_role;
grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;

grant select on public.editions, public.program_sessions, public.panel_themes,
  public.speakers, public.partners, public.edition_partners, public.exhibitors,
  public.news_articles, public.media_items, public.awards
  to anon, authenticated;

grant insert on public.registrations to anon, authenticated;

insert into public.editions (
  year, edition_number, slug, title, theme, status,
  start_date, end_date, date_label, location, city,
  poster_url, banner_url, summary, is_featured, registration_open
) values
  (
    2024, 1, '2024', '1re édition — Vitrine RSE 2024', null, 'archivee',
    null, null, '2024', 'Ouagadougou', 'Ouagadougou',
    null, null, 'Édition fondatrice de Vitrine RSE lancée par l’INGRIDD en 2024 à Ouagadougou.',
    false, false
  ),
  (
    2025, 2, '2025', '2e édition — Vitrine RSE 2025', null, 'archivee',
    null, null, '2025', 'Ouagadougou', 'Ouagadougou',
    null, null, 'Deuxième édition annuelle de Vitrine RSE organisée par l’INGRIDD à Ouagadougou.',
    false, false
  ),
  (
    2026, 3, '2026', '3e édition — Vitrine RSE 2026',
    'Économie circulaire et Responsabilité Sociale des Entreprises', 'archivee',
    '2026-06-04', '2026-06-05', '4 – 5 juin 2026', 'Azalaï Hôtel Ouagadougou', 'Ouagadougou',
    '/images/affiches/visuel-officiel.jpg', '/images/hero-vitrine-rse.jpg',
    '3e édition consacrée à l’économie circulaire et à la RSE à l’Azalaï Hôtel Ouagadougou.',
    false, false
  ),
  (
    2027, 4, '2027', '4e édition — Vitrine RSE 2027',
    'RSE et Changements climatiques, cadre réglementaire pour les États et les entreprises',
    'inscriptions_ouvertes',
    '2027-06-03', '2027-06-05', '3, 4 et 5 juin 2027', 'Salle des fêtes de Ouaga 2000', 'Ouagadougou',
    '/images/editions/2027/affiche-4e-edition.jpg', '/images/editions/2027/banniere-4e-edition.jpg',
    '4e édition de Vitrine RSE avec 6 panels, communications et 1re édition de la FCPE.',
    true, true
  )
on conflict (year) do nothing;

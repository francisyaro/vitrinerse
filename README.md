# Vitrine RSE — Plateforme officielle (Next.js + TypeScript + Tailwind CSS)

Refonte stratégique et technique du site officiel **Vitrine RSE** (Ouagadougou, Burkina Faso), organisé par l’**INGRIDD** (*Institut de Gestion des Risques Industriels et du Développement Durable*).

## Architecture technique

- **Framework** : Next.js (App Router), React 19, TypeScript
- **Styles** : Tailwind CSS v4
- **Validation** : Zod (client & serveur)
- **Base de données & Auth (prêt pour production)** : Schéma PostgreSQL + RLS dans `supabase/schema.sql`
- **Hébergement cible** : Vercel (`https://vercel.com/faso-web/`)

## Rubriques & Routes

- `/` : Accueil (4e édition 2027, programme officiel 3 jours, 6 panels TDR, FCPE, actualités, partenaires)
- `/a-propos` : Présentation d’INGRIDD, PNA (2015/2021), EIES, normes HSE et ISO 9000/14000/26000
- `/editions` et `/editions/[year]` : Gestion multi-éditions pérenne (`/editions/2024`, `/editions/2025`, `/editions/2026`, `/editions/2027`)
- `/participer` : Portail d’inscription multi-profils (Participant, Exposant FCPE, Partenaire, Intervenant)
- `/actualites` et `/actualites/[slug]` : Espace éditorial
- `/partenaires` : Annuaire catégorisé des partenaires
- `/mediatheque` : Affiches officielles et vidéos
- `/contact` : Coordonnées INGRIDD et formulaire sécurisé
- `/admin` : Console d’administration protégée (suivi des inscriptions, export CSV Excel, cycle de vie des éditions)

## Installation locale

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Déploiement sur Vercel & Supabase

1. Créer un projet Supabase et exécuter `supabase/schema.sql` dans le SQL Editor.
2. Configurer les variables d’environnement sur Vercel (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`).
3. Déployer la branche `main` sur Vercel.
4. Les anciennes URL `.php` sont automatiquement redirigées en `301` dans `next.config.ts`.

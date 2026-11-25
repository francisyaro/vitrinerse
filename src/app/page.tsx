import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  FileText,
  Handshake,
  MapPin,
  Megaphone,
  Mic,
  Scale,
  Users,
} from "lucide-react";
import { PartnersMarquee } from "@/components/PartnersMarquee";
import { ProgramSection } from "@/components/ProgramSection";
import { EDITIONS, getFeaturedEdition } from "@/data/editions";
import { NEWS_ARTICLES } from "@/data/news";
import { EDITION_STATUS_LABELS, SITE_INFO } from "@/data/site";

export default function HomePage() {
  const featured = getFeaturedEdition();
  const statusInfo = EDITION_STATUS_LABELS[featured.status];
  const pastEditions = EDITIONS.filter((e) => e.year < featured.year);
  const latestNews = NEWS_ARTICLES.slice(0, 4);

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: featured.title,
    description: featured.summary,
    startDate: featured.startDate,
    endDate: featured.endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: featured.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ouagadougou",
        addressCountry: "BF",
      },
    },
    organizer: {
      "@type": "Organization",
      name: SITE_INFO.organizerFullName,
      url: SITE_INFO.domain,
    },
    image: `${SITE_INFO.domain}${featured.posterUrl}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A3624] via-[#115338] to-[#0E442E] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 20%, #facc15 0%, transparent 45%), radial-gradient(circle at 85% 75%, #e8830c 0%, transparent 45%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-amber-400/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 border border-amber-300/30">
                  {featured.editionNumber}e édition • {featured.year}
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-100 border border-emerald-300/25">
                  {statusInfo?.label}
                </span>
              </div>

              <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                « {featured.theme} »
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-emerald-50/90 sm:text-lg">
                {featured.summary}
              </p>

              {/* Key Info Pills */}
              <div className="grid gap-3 sm:grid-cols-2 max-w-xl">
                <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm border border-white/15">
                  <Calendar className="h-5 w-5 shrink-0 text-amber-300" />
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-emerald-200">
                      Dates officielles
                    </div>
                    <div className="text-sm font-bold text-white">
                      {featured.dateLabel}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm border border-white/15">
                  <MapPin className="h-5 w-5 shrink-0 text-amber-300" />
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-emerald-200">
                      Lieu
                    </div>
                    <div className="text-sm font-bold text-white">
                      {featured.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {featured.registrationOpen && (
                  <Link
                    href="/participer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#E8830C] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#c26a06]"
                  >
                    S’inscrire à la {featured.editionNumber}e édition
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
                <a
                  href="#programme"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  Consulter le programme
                </a>
                <Link
                  href={`/editions/${featured.year}`}
                  className="text-sm font-semibold text-amber-300 underline-offset-4 hover:underline"
                >
                  Dossier complet {featured.year} →
                </Link>
              </div>
            </div>

            {/* Right Visual: Official 4th Edition Poster */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border-2 border-amber-400/40 bg-white p-2 shadow-2xl">
                <Image
                  src="/images/editions/2027/affiche-4e-edition.jpg"
                  alt="Affiche officielle — 4e édition Vitrine RSE 2027"
                  width={540}
                  height={760}
                  priority
                  className="h-auto w-full rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICIAL BANNER STRIP */}
      <section className="bg-slate-50 py-8 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src="/images/editions/2027/banniere-4e-edition.jpg"
              alt="Bannière officielle Vitrine RSE 4e édition — Panels, Communications, FCPE"
              width={1400}
              height={460}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3 PILLARS OF 4TH EDITION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8830C]">
              Architecture de l’événement
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900">
              Trois piliers pour transformer les engagements RSE en actions
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs transition-shadow hover:shadow-md">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-[#E8830C]">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-slate-900">
                Panels thématiques
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Des experts, décideurs publics et dirigeants réunis autour de 6
                panels stratégiques : conformité réglementaire, décarbonation,
                finance durable, ESG, résilience des territoires et économie
                circulaire.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs transition-shadow hover:shadow-md">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-[#115338]">
                <Megaphone className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-slate-900">
                Communications
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Une tribune dédiée aux entreprises, chercheurs et spécialistes
                pour valoriser leurs actions concrètes, retours d’expérience
                HSE/ISO et innovations face aux défis climatiques.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-7 shadow-xs transition-shadow hover:shadow-md">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#115338] text-white">
                <Scale className="h-6 w-6" />
              </div>
              <div className="mt-5 flex items-center gap-2">
                <h3 className="font-display text-xl font-bold text-slate-900">
                  F.C.P.E
                </h3>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                  1re édition
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                La Foire Commerciale de la Performance des Entreprises : une
                plateforme d’exposition sur 3 jours pour présenter vos produits,
                services responsables et solutions durables, couronnée par la
                remise des trophées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TDR CONTEXT & REGULATORY FRAMEWORK */}
      <section className="border-y border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#115338]">
                <FileText className="h-3.5 w-3.5" />
                Contexte & Justification (TDR)
              </span>
              <h2 className="font-display text-3xl font-bold text-slate-900">
                Du Plan National d’Adaptation aux normes ISO : la RSE face à
                l’urgence climatique
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                Au Burkina Faso, la responsabilité sociétale des entreprises
                s’ancre dans le Plan National d’Adaptation (PNA, adopté en 2015
                et relu en 2021), la Loi sur le développement durable,
                l’obligation d’Étude d’Impact Environnemental et Social (EIES) et
                les normes HSE sur les sites industriels et miniers.
              </p>
              <p className="text-sm leading-relaxed text-slate-600">
                Les référentiels <strong>ISO 9000</strong> (qualité),{" "}
                <strong>ISO 14000</strong> (environnement) et{" "}
                <strong>ISO 26000</strong> (responsabilité sociétale) offrent aux
                entreprises des leviers concrets en matière de gestion des déchets
                (DEEE, plastiques), d’efficacité énergétique solaire et de
                compensation carbone.
              </p>
              <div className="pt-2">
                <Link
                  href="/a-propos"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#115338] hover:text-[#0A3624]"
                >
                  En savoir plus sur l’INGRIDD et le cadre institutionnel
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid gap-4 sm:grid-cols-2">
              {featured.regulatoryContext?.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#115338]" />
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE 3-DAY PROGRAM & 6 PANELS */}
      <section id="programme" className="py-16 sm:py-20 bg-white scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8830C]">
              Programme officiel • 3, 4 et 5 juin 2027
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900">
              Trois journées de conférences, panels, exposition et formation
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Consultez le déroulé complet issu des Termes de Référence (TDR) de
              la 4e édition, incluant la formation agroalimentaire et la remise
              des trophées Vitrine RSE & FCPE.
            </p>
          </div>

          {featured.program && (
            <ProgramSection
              program={featured.program}
              panels={featured.panels}
            />
          )}
        </div>
      </section>

      {/* PARTICIPATION PATHWAYS */}
      <section className="bg-[#0A3624] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Inscriptions ouvertes — 4e édition
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold text-white">
                Rejoignez Vitrine RSE 2027
              </h2>
              <p className="mt-1 text-sm text-emerald-100/85">
                Sélectionnez votre mode de participation à Ouaga 2000.
              </p>
            </div>
            <Link
              href="/participer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E8830C] px-5 py-3 text-sm font-bold text-white hover:bg-[#c26a06]"
            >
              Accéder au portail d’inscription
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Users,
                title: "Participants",
                desc: "Entreprises, institutions, ONG, étudiants : assistez aux panels et conférences.",
                href: "/participer?type=participant",
                cta: "S’inscrire",
              },
              {
                icon: Building2,
                title: "Exposants (F.C.P.E)",
                desc: "Réservez votre stand pour la 1re édition de la Foire Commerciale de la Performance des Entreprises.",
                href: "/participer?type=exposant",
                cta: "Demander un stand",
              },
              {
                icon: Handshake,
                title: "Partenaires & Sponsors",
                desc: "Associez votre institution ou entreprise à l’événement RSE de référence.",
                href: "/participer?type=partenaire",
                cta: "Devenir partenaire",
              },
              {
                icon: Mic,
                title: "Intervenants",
                desc: "Proposez une communication d’entreprise ou une expertise sur nos 6 panels.",
                href: "/participer?type=intervenant",
                cta: "Proposer une intervention",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="flex flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <div>
                    <Icon className="h-7 w-7 text-amber-300" />
                    <h3 className="mt-4 font-display text-lg font-bold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm text-emerald-100/80 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                  <Link
                    href={card.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-amber-200"
                  >
                    {card.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEWS SECTION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#115338]">
                Espace éditorial
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold text-slate-900">
                Actualités & mobilisations
              </h2>
            </div>
            <Link
              href="/actualites"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#115338] hover:text-[#0A3624]"
            >
              Toutes les actualités
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {latestNews.map((article) => (
              <article
                key={article.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-[#E8830C]">
                        {article.category}
                      </span>
                      <span>{article.dateDisplay}</span>
                    </div>
                    <h3 className="mt-2 font-display text-base font-bold leading-snug text-slate-900 line-clamp-3">
                      <Link
                        href={`/actualites/${article.slug}`}
                        className="hover:text-[#115338]"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                  <Link
                    href={`/actualites/${article.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#115338] hover:underline"
                  >
                    Lire l’article <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HISTORICAL EDITIONS ARCHIVE */}
      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#115338]">
                Patrimoine numérique
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold text-slate-900">
                Les éditions précédentes (2024 – 2026)
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Chaque édition dispose d’une archive dédiée et pérenne.
              </p>
            </div>
            <Link
              href="/editions"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#115338]"
            >
              Voir la chronologie complète <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {pastEditions.map((ed) => (
              <Link
                key={ed.year}
                href={`/editions/${ed.year}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:border-[#115338] hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-extrabold text-[#115338]">
                    {ed.year}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-700">
                    <Award className="h-3 w-3" />
                    {ed.editionNumber}e édition
                  </span>
                </div>
                <h3 className="mt-3 font-display text-base font-bold text-slate-900 group-hover:text-[#115338]">
                  {ed.theme ? `« ${ed.theme} »` : ed.title}
                </h3>
                <p className="mt-2 text-xs text-slate-500">
                  {ed.dateLabel} • {ed.location}
                </p>
                <p className="mt-3 text-sm text-slate-600 line-clamp-3">
                  {ed.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#115338]">
                  Consulter l’archive <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS MARQUEE */}
      <PartnersMarquee />
    </>
  );
}

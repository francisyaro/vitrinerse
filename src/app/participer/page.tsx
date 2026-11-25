import type { Metadata } from "next";
import { Calendar, MapPin, Phone, ShieldCheck } from "lucide-react";
import { RegistrationForm } from "@/components/RegistrationForm";
import { getFeaturedEdition } from "@/data/editions";
import { SITE_INFO } from "@/data/site";
import type { RegistrationType } from "@/types/rse";

export const metadata: Metadata = {
  title: "Participer, Exposer ou Sponsoriser",
  description:
    "Inscrivez-vous en ligne à la 4e édition de Vitrine RSE (3, 4 et 5 juin 2027 à Ouaga 2000) : participant, exposant FCPE, partenaire ou intervenant.",
};

const VALID_TYPES: RegistrationType[] = [
  "participant",
  "exposant",
  "partenaire",
  "intervenant",
];

export default async function ParticiperPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const featured = getFeaturedEdition();
  const defaultType: RegistrationType = VALID_TYPES.includes(
    type as RegistrationType
  )
    ? (type as RegistrationType)
    : "participant";

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-[#0A3624] py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Portail d’inscription • {featured.editionNumber}e édition
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            Participer à {featured.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-emerald-100/90">
            Inscriptions directes pour les participants, exposants de la F.C.P.E,
            partenaires/sponsors et intervenants.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <RegistrationForm
              editionYear={featured.year}
              editionTitle={featured.title}
              registrationOpen={featured.registrationOpen}
              defaultType={defaultType}
            />
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Informations pratiques
              </h2>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-4 w-4 text-[#E8830C] shrink-0" />
                  <div>
                    <strong className="block text-slate-900">Dates</strong>
                    {featured.dateLabel}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-[#E8830C] shrink-0" />
                  <div>
                    <strong className="block text-slate-900">Lieu</strong>
                    {featured.location}, {featured.city}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-[#E8830C] shrink-0" />
                  <div>
                    <strong className="block text-slate-900">Infoline</strong>
                    {SITE_INFO.phones.slice(0, 2).map((p) => (
                      <a
                        key={p.href}
                        href={p.href}
                        className="block hover:text-[#115338]"
                      >
                        {p.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 text-xs leading-relaxed text-emerald-950">
              <div className="flex items-center gap-2 font-bold text-[#115338] text-sm">
                <ShieldCheck className="h-4 w-4" />
                Protection des données
              </div>
              <p className="mt-2">
                Chaque demande est rattachée à l’édition {featured.year}, validée
                côté serveur et consultable uniquement par les gestionnaires
                habilités d’INGRIDD.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

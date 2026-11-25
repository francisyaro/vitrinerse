import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PARTNERS } from "@/data/partners";
import type { PartnerCategory } from "@/types/rse";

export const metadata: Metadata = {
  title: "Partenaires",
  description:
    "Découvrez les partenaires institutionnels, techniques, entreprises et médias qui soutiennent Vitrine RSE au Burkina Faso.",
};

const CATEGORY_LABELS: Record<PartnerCategory, string> = {
  institutionnel: "Partenaires institutionnels",
  technique: "Partenaires techniques & associatifs",
  entreprise: "Entreprises & Sponsors",
  media: "Partenaires médias",
  financier: "Partenaires financiers",
};

export default function PartenairesPage() {
  const categories: PartnerCategory[] = [
    "institutionnel",
    "entreprise",
    "technique",
    "media",
  ];

  return (
    <div className="bg-white">
      <section className="bg-[#0A3624] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Réseau & Alliances
            </span>
            <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
              Nos partenaires officiels
            </h1>
            <p className="mt-3 max-w-2xl text-base text-emerald-100/90">
              Institutions publiques, agences techniques, acteurs industriels,
              associations et médias engagés pour la RSE au Burkina Faso.
            </p>
          </div>
          <Link
            href="/participer?type=partenaire"
            className="inline-flex items-center gap-2 rounded-xl bg-[#E8830C] px-5 py-3 text-sm font-bold text-white hover:bg-[#c26a06] shrink-0"
          >
            Devenir partenaire 2027
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="py-16 space-y-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
          {categories.map((cat) => {
            const list = PARTNERS.filter((p) => p.category === cat);
            if (list.length === 0) return null;
            return (
              <div key={cat}>
                <h2 className="font-display text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">
                  {CATEGORY_LABELS[cat]}
                </h2>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {list.map((partner) => (
                    <div
                      key={partner.id}
                      className="flex flex-col items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xs transition-shadow hover:shadow-md"
                    >
                      <div className="flex h-20 w-full items-center justify-center">
                        <Image
                          src={partner.logoUrl}
                          alt={partner.name}
                          width={140}
                          height={64}
                          unoptimized
                          className="max-h-16 w-auto object-contain"
                        />
                      </div>
                      <span className="mt-3 text-xs font-semibold text-slate-700">
                        {partner.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

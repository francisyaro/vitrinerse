import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PARTNERS } from "@/data/partners";

export function PartnersMarquee() {
  const duplicated = [...PARTNERS, ...PARTNERS];

  return (
    <section className="border-y border-slate-200 bg-slate-50/70 py-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#115338]">
              Écosystème & Soutiens
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              Ils accompagnent Vitrine RSE
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Institutions publiques, partenaires techniques, entreprises et médias engagés au Burkina Faso.
            </p>
          </div>
          <Link
            href="/partenaires"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#115338] hover:text-[#0A3624]"
          >
            Voir tous les partenaires
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-8 relative">
        <div className="animate-marquee flex items-center gap-5 px-4">
          {duplicated.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className="flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-3 shadow-xs transition-transform hover:scale-105"
              title={partner.name}
            >
              <Image
                src={partner.logoUrl}
                alt={partner.name}
                width={130}
                height={56}
                unoptimized
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

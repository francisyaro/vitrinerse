import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { EDITIONS } from "@/data/editions";
import { EDITION_STATUS_LABELS } from "@/data/site";

export const metadata: Metadata = {
  title: "Toutes les éditions (2024 – 2027)",
  description:
    "Consultez l’historique complet et les archives officielles de Vitrine RSE depuis 2024 jusqu’à la 4e édition en 2027 à Ouagadougou.",
};

export default function EditionsPage() {
  return (
    <div className="bg-white">
      <section className="bg-[#0A3624] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Patrimoine & Continuité
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            Les éditions de Vitrine RSE
          </h1>
          <p className="mt-3 max-w-2xl text-base text-emerald-100/90">
            Chaque édition dispose d’une URL pérenne préservant ses visuels, son
            programme, ses thématiques et ses archives officielles.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          {EDITIONS.map((ed) => {
            const st = EDITION_STATUS_LABELS[ed.status];
            return (
              <article
                key={ed.id}
                className={`rounded-2xl border p-6 sm:p-8 transition-shadow hover:shadow-md ${
                  ed.isFeatured
                    ? "border-emerald-300 bg-emerald-50/40"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-display text-2xl font-extrabold text-[#115338]">
                        {ed.year}
                      </span>
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-800">
                        {ed.editionNumber}e édition
                      </span>
                      {st && (
                        <span
                          className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${st.badgeClass}`}
                        >
                          {st.label}
                        </span>
                      )}
                    </div>

                    <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
                      {ed.theme ? `« ${ed.theme} »` : ed.title}
                    </h2>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-[#E8830C]" />
                        {ed.dateLabel}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-[#E8830C]" />
                        {ed.location}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-600">
                      {ed.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 shrink-0">
                    <Link
                      href={`/editions/${ed.year}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#115338] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0A3624]"
                    >
                      Ouvrir l’édition {ed.year}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    {ed.registrationOpen && (
                      <Link
                        href="/participer"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#E8830C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#c26a06]"
                      >
                        S’inscrire
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

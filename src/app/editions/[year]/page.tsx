import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight, Calendar, CheckCircle2, MapPin } from "lucide-react";
import { ProgramSection } from "@/components/ProgramSection";
import { EDITIONS, getEditionByYear } from "@/data/editions";
import { EDITION_STATUS_LABELS } from "@/data/site";

export async function generateStaticParams() {
  return EDITIONS.map((e) => ({ year: String(e.year) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;
  const edition = getEditionByYear(Number(year));
  if (!edition) return { title: "Édition introuvable" };
  return {
    title: `${edition.editionNumber}e édition (${edition.year})`,
    description: edition.theme
      ? `${edition.title} — ${edition.theme} (${edition.dateLabel}, ${edition.location}).`
      : edition.summary,
  };
}

export default async function EditionDetailPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const edition = getEditionByYear(Number(year));

  if (!edition) {
    notFound();
  }

  const st = EDITION_STATUS_LABELS[edition.status];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-[#0A3624] py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/editions"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Toutes les éditions
          </Link>

          <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-300/30">
                  {edition.editionNumber}e édition • {edition.year}
                </span>
                {st && (
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                    {st.label}
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
                {edition.theme ? `« ${edition.theme} »` : edition.title}
              </h1>

              <p className="text-base text-emerald-100/90 leading-relaxed max-w-3xl">
                {edition.summary}
              </p>

              <div className="flex flex-wrap gap-5 pt-2 text-sm text-emerald-100">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-amber-300" />
                  {edition.dateLabel}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-300" />
                  {edition.location}, {edition.city}
                </span>
              </div>

              {edition.registrationOpen && (
                <div className="pt-3">
                  <Link
                    href="/participer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#E8830C] px-6 py-3 text-sm font-bold text-white hover:bg-[#c26a06]"
                  >
                    S’inscrire à cette édition
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>

            {edition.posterUrl && (
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="w-full max-w-xs overflow-hidden rounded-2xl border-2 border-amber-400/40 bg-white p-1.5 shadow-xl">
                  <Image
                    src={edition.posterUrl}
                    alt={`Affiche officielle ${edition.title}`}
                    width={400}
                    height={560}
                    className="h-auto w-full rounded-xl object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Missing Archive Notice (for 2024 / 2025) */}
      {edition.missingArchiveNotice && (
        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
            <div>
              <strong className="block font-semibold">
                Archive historique en cours de consolidation
              </strong>
              <p className="mt-1">{edition.missingArchiveNotice}</p>
            </div>
          </div>
        </section>
      )}

      {/* Highlights */}
      {edition.highlights && edition.highlights.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Temps forts de l’édition {edition.year}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {edition.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#115338]" />
                  <span className="text-sm text-slate-800">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Program & Panels (when available) */}
      {edition.program && edition.program.length > 0 && (
        <section className="border-t border-slate-200 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 font-display text-2xl font-bold text-slate-900">
              Programme détaillé & Panels
            </h2>
            <ProgramSection program={edition.program} panels={edition.panels} />
          </div>
        </section>
      )}

      {/* Gallery (Posters & Videos) */}
      {edition.gallery && edition.gallery.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Galerie & Ressources visuelles ({edition.year})
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {edition.gallery.map((item) =>
                item.type === "video" ? (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs"
                  >
                    <div className="aspect-video w-full">
                      <iframe
                        src={item.url}
                        title={item.title}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 text-sm font-semibold text-slate-800">
                      {item.title}
                    </div>
                  </div>
                ) : (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs"
                  >
                    <div className="relative aspect-[4/3] w-full bg-slate-100">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-sm font-semibold text-slate-800">
                        {item.title}
                      </div>
                      {item.caption && (
                        <div className="mt-1 text-xs text-slate-500">
                          {item.caption}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

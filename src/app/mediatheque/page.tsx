import type { Metadata } from "next";
import Image from "next/image";
import { EDITIONS } from "@/data/editions";

export const metadata: Metadata = {
  title: "Médiathèque officielle",
  description:
    "Affiches officielles, photographies et vidéos des éditions de Vitrine RSE à Ouagadougou.",
};

export default function MediathequePage() {
  const allMedia = EDITIONS.flatMap((ed) =>
    (ed.gallery ?? []).map((item) => ({ ...item, year: ed.year }))
  );
  const videos = allMedia.filter((m) => m.type === "video");
  const visuals = allMedia.filter((m) => m.type !== "video");

  return (
    <div className="bg-white">
      <section className="bg-[#0A3624] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Archives visuelles & audiovisuelles
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            Médiathèque officielle
          </h1>
          <p className="mt-3 max-w-2xl text-base text-emerald-100/90">
            Retrouvez les affiches officielles de la 4e édition (2027), les
            visuels des éditions précédentes et les reportages vidéo.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Affiches & Visuels officiels
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visuals.map((item) => (
                <figure
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
                  <figcaption className="p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#E8830C]">
                      Édition {item.year}
                    </span>
                    <div className="mt-1 text-sm font-semibold text-slate-900">
                      {item.title}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Vidéos & Reportages
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((v) => (
                <div
                  key={v.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs"
                >
                  <div className="aspect-video w-full">
                    <iframe
                      src={v.url}
                      title={v.title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#115338]">
                      Édition {v.year}
                    </span>
                    <div className="mt-1 text-sm font-semibold text-slate-900">
                      {v.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

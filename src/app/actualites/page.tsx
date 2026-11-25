import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NEWS_ARTICLES } from "@/data/news";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Suivez toute l’actualité de Vitrine RSE, les annonces officielles de la 4e édition (2027) et les mobilisations des partenaires au Burkina Faso.",
};

export default function ActualitesPage() {
  return (
    <div className="bg-white">
      <section className="bg-[#0A3624] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Espace éditorial
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            Actualités de Vitrine RSE
          </h1>
          <p className="mt-3 max-w-2xl text-base text-emerald-100/90">
            Communiqués officiels, rencontres stratégiques avec les institutions
            et partenaires, et préparatifs des éditions.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {NEWS_ARTICLES.map((article) => (
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
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-[#E8830C]">
                      {article.category}
                    </span>
                    <span>{article.dateDisplay}</span>
                  </div>
                  <h2 className="mt-2 font-display text-lg font-bold leading-snug text-slate-900">
                    <Link
                      href={`/actualites/${article.slug}`}
                      className="hover:text-[#115338]"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {article.excerpt}
                  </p>
                </div>
                <Link
                  href={`/actualites/${article.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#115338] hover:underline"
                >
                  Lire l’article complet
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

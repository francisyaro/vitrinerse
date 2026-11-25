import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { NEWS_ARTICLES } from "@/data/news";

export async function generateStaticParams() {
  return NEWS_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Article introuvable" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <article className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/actualites"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#115338] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux actualités
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-900">
            {article.category}
          </span>
          <span className="text-slate-500">{article.dateDisplay}</span>
          <Link
            href={`/editions/${article.editionYear}`}
            className="text-[#115338] hover:underline"
          >
            Édition {article.editionYear}
          </Link>
        </div>

        <h1 className="mt-4 font-display text-2xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
          {article.title}
        </h1>

        <p className="mt-4 text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
          {article.excerpt}
        </p>

        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-700">
          {article.content.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {article.externalUrl && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-4">
            <span className="text-xs text-slate-600">
              Publication d’archive relayée sur la page officielle Facebook :
            </span>
            <a
              href={article.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#115338] hover:underline shrink-0"
            >
              Voir le post original <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

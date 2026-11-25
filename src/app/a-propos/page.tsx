import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, Globe2, Shield, Target } from "lucide-react";
import { SITE_INFO } from "@/data/site";

export const metadata: Metadata = {
  title: "À propos & INGRIDD",
  description:
    "Découvrez Vitrine RSE, son organisateur l’INGRIDD, son ancrage dans le Plan National d’Adaptation (PNA) du Burkina Faso et les normes ISO 9000, 14000 et 26000.",
};

export default function AProposPage() {
  return (
    <div className="bg-white">
      <section className="bg-[#0A3624] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Présentation institutionnelle
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            À propos de Vitrine RSE & de l’INGRIDD
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-emerald-100/90">
            Organisée à Ouagadougou par l’{SITE_INFO.organizerFullName} (
            {SITE_INFO.organizer}), Vitrine RSE est la plateforme annuelle de
            référence dédiée à la Responsabilité Sociale des Entreprises, au
            développement durable et aux partenariats économiques au Burkina Faso.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Origine, vision et cadre réglementaire
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              La Responsabilité sociale ou sociétale des entreprises (RSE) face
              aux enjeux des changements climatiques au Burkina Faso tire sa
              source du <strong>Plan National d’Adaptation (PNA)</strong> adopté
              en 2015 et relu en 2021, ainsi que des textes nationaux relatifs à
              la préservation de l’environnement.
            </p>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Cette démarche repose sur quatre principes directeurs : le{" "}
              <strong>partenariat</strong>, la{" "}
              <strong>durabilité des actions sur le terrain</strong>, la{" "}
              <strong>gestion axée sur les résultats</strong> et la{" "}
              <strong>prise en compte du genre et de l’inclusion sociale</strong>.
            </p>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
              <h3 className="font-display text-base font-bold text-[#115338]">
                Référentiels internationaux mobilisés
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#115338]" />
                  <span>
                    <strong>ISO 9000</strong> : management de la qualité et
                    performance organisationnelle.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#115338]" />
                  <span>
                    <strong>ISO 14000</strong> : management environnemental,
                    maîtrise des risques et transition bas-carbone.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#115338]" />
                  <span>
                    <strong>ISO 26000</strong> : lignes directrices relatives à
                    la responsabilité sociétale des organisations.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: Shield,
                title: "EIES & Normes HSE",
                desc: "Accompagnement des entreprises vers la conformité : Étude d’Impact Environnemental et Social (EIES) obligatoire et normes HSE sur les sites industriels et miniers.",
              },
              {
                icon: Globe2,
                title: "Action climatique",
                desc: "Gestion des déchets (DEEE, plastiques), efficacité énergétique solaire, éco-conception, économie circulaire et reboisement / agroécologie.",
              },
              {
                icon: Target,
                title: "Impact territorial",
                desc: "Amélioration des conditions de vie des collaborateurs et dialogue constructif avec les communautés locales et collectivités.",
              },
              {
                icon: Building2,
                title: "Performance économique (FCPE)",
                desc: "Valorisation du savoir-faire des entreprises burkinabè et ouest-africaines à travers la Foire Commerciale de la Performance des Entreprises.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
                >
                  <Icon className="h-6 w-6 text-[#E8830C]" />
                  <h3 className="mt-4 font-display text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Prêt à participer à la 4e édition (2027) ?
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Rendez-vous les 3, 4 et 5 juin 2027 à la Salle des fêtes de Ouaga 2000.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/participer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#115338] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0A3624]"
            >
              S’inscrire <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/editions/2027"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Voir le programme 2027
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

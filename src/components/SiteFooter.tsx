import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ExternalLink, ShieldCheck } from "lucide-react";
import { EDITIONS, getFeaturedEdition } from "@/data/editions";
import { SITE_INFO } from "@/data/site";

export function SiteFooter() {
  const featured = getFeaturedEdition();

  return (
    <footer className="border-t border-slate-200 bg-[#0A3624] text-emerald-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & INGRIDD */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-vitrine-rse.jpg"
                alt="Vitrine RSE"
                width={44}
                height={44}
                className="h-11 w-11 rounded-lg bg-white p-0.5 object-contain"
              />
              <div>
                <div className="font-display text-lg font-bold text-white">
                  Vitrine RSE
                </div>
                <div className="text-xs text-emerald-200">
                  Filiale de l’{SITE_INFO.organizer}
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-emerald-100/85">
              Événement professionnel annuel consacré à la Responsabilité Sociale des
              Entreprises, au développement durable et aux partenariats économiques
              au Burkina Faso.
            </p>
            <div className="rounded-xl bg-white/5 p-3 text-xs text-emerald-100/90 border border-white/10">
              <div className="font-semibold text-amber-300">
                {featured.editionNumber}e édition • {featured.dateLabel}
              </div>
              <div className="mt-0.5">{featured.location}</div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-amber-300">
              Rubriques
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/a-propos" className="hover:text-white transition-colors">
                  À propos & INGRIDD
                </Link>
              </li>
              <li>
                <Link href="/participer" className="hover:text-white transition-colors">
                  Participer / Exposer / Sponsoriser
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="hover:text-white transition-colors">
                  Actualités
                </Link>
              </li>
              <li>
                <Link href="/partenaires" className="hover:text-white transition-colors">
                  Partenaires
                </Link>
              </li>
              <li>
                <Link href="/mediatheque" className="hover:text-white transition-colors">
                  Médiathèque officielle
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Editions Archive */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-amber-300">
              Éditions & Archives
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/editions" className="hover:text-white transition-colors">
                  Toutes les éditions
                </Link>
              </li>
              {EDITIONS.map((ed) => (
                <li key={ed.year}>
                  <Link
                    href={`/editions/${ed.year}`}
                    className="hover:text-white transition-colors"
                  >
                    {ed.editionNumber}e édition — {ed.year}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-200/80 hover:text-white"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Espace administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Infoline */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-amber-300">
              Infoline & Siège
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-emerald-100/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <span>{SITE_INFO.address}</span>
              </li>
              {SITE_INFO.phones.map((p) => (
                <li key={p.href} className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-amber-300" />
                  <a href={p.href} className="hover:text-white">
                    {p.label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-amber-300" />
                <a href={`mailto:${SITE_INFO.email}`} className="hover:text-white">
                  {SITE_INFO.email}
                </a>
              </li>
              <li className="pt-1 flex flex-wrap gap-3 text-xs">
                <a
                  href={SITE_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-300 hover:underline"
                >
                  Facebook <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href={SITE_INFO.social.youtubePlaylist}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-300 hover:underline"
                >
                  YouTube <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col gap-3 text-xs text-emerald-200/80 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} {SITE_INFO.name} — Filiale de l’
            {SITE_INFO.organizerFullName} ({SITE_INFO.organizer}). Tous droits réservés.
          </div>
          <div className="font-mono text-[11px] text-emerald-200/70">
            RCCM N° {SITE_INFO.legal.rccm} • IFU N° {SITE_INFO.legal.ifu} • ECOBANK N°{" "}
            {SITE_INFO.legal.ecobank}
          </div>
        </div>
      </div>
    </footer>
  );
}

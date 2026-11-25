"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, Phone, Mail, Calendar, MapPin, X } from "lucide-react";
import { EDITIONS, getFeaturedEdition } from "@/data/editions";
import { SITE_INFO } from "@/data/site";

const NAV_ITEMS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/actualites", label: "Actualités" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/mediatheque", label: "Médiathèque" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [editionsOpen, setEditionsOpen] = useState(false);
  const featured = getFeaturedEdition();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      {/* Top institutional bar */}
      <div className="bg-[#0A3624] text-xs text-emerald-50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5 font-medium text-amber-300">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {featured.editionNumber}e édition • {featured.dateLabel}
            </span>
            <span className="hidden items-center gap-1.5 text-emerald-100/90 sm:inline-flex">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {featured.location}, Ouagadougou
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={SITE_INFO.phones[0].href}
              className="inline-flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Phone className="h-3 w-3" aria-hidden="true" />
              <span>{SITE_INFO.phones[0].label}</span>
            </a>
            <a
              href={`mailto:${SITE_INFO.email}`}
              className="hidden items-center gap-1 hover:text-amber-300 transition-colors sm:inline-flex"
            >
              <Mail className="h-3 w-3" aria-hidden="true" />
              <span>{SITE_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#115338] rounded-lg"
        >
          <Image
            src="/images/logo-vitrine-rse.jpg"
            alt="Logo Vitrine RSE – Responsabilité Sociale des Entreprises"
            width={48}
            height={48}
            className="h-11 w-11 rounded-lg object-contain border border-slate-100 bg-white"
            priority
          />
          <div className="leading-tight">
            <span className="block font-display text-lg font-extrabold tracking-tight text-[#0F172A]">
              Vitrine <span className="text-[#115338]">RSE</span>
            </span>
            <span className="block text-[11px] font-medium text-slate-500">
              Initiative de l’INGRIDD • Burkina Faso
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/"
                ? "bg-emerald-50 text-[#115338] font-semibold"
                : "text-slate-700 hover:bg-slate-50 hover:text-[#115338]"
            }`}
          >
            Accueil
          </Link>
          <Link
            href="/a-propos"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/a-propos"
                ? "bg-emerald-50 text-[#115338] font-semibold"
                : "text-slate-700 hover:bg-slate-50 hover:text-[#115338]"
            }`}
          >
            À propos
          </Link>

          {/* Editions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setEditionsOpen(true)}
            onMouseLeave={() => setEditionsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setEditionsOpen((v) => !v)}
              aria-expanded={editionsOpen}
              className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname.startsWith("/editions")
                  ? "bg-emerald-50 text-[#115338] font-semibold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-[#115338]"
              }`}
            >
              Éditions
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
            {editionsOpen && (
              <div className="absolute left-0 top-full w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                <Link
                  href="/editions"
                  onClick={() => setEditionsOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#115338] hover:bg-emerald-50"
                >
                  Toutes les éditions (2024–2027)
                </Link>
                <div className="my-1 border-t border-slate-100" />
                {EDITIONS.map((ed) => (
                  <Link
                    key={ed.year}
                    href={`/editions/${ed.year}`}
                    onClick={() => setEditionsOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#115338]"
                  >
                    <span>
                      {ed.editionNumber}e édition ({ed.year})
                    </span>
                    {ed.isFeatured && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                        Actuelle
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {NAV_ITEMS.slice(2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname.startsWith(item.href)
                  ? "bg-emerald-50 text-[#115338] font-semibold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-[#115338]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Primary CTA */}
        <div className="flex items-center gap-3">
          {featured.registrationOpen ? (
            <Link
              href="/participer"
              className="hidden rounded-xl bg-[#E8830C] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#c26a06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8830C] sm:inline-flex"
            >
              S’inscrire — {featured.editionNumber}e éd.
            </Link>
          ) : (
            <Link
              href="/editions"
              className="hidden rounded-xl bg-[#115338] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0A3624] sm:inline-flex"
            >
              Consulter les archives
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <nav aria-label="Navigation mobile" className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  pathname === item.href
                    ? "bg-emerald-50 text-[#115338] font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 pb-1 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Éditions
            </div>
            <Link
              href="/editions"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[#115338] hover:bg-emerald-50"
            >
              Toutes les éditions
            </Link>
            {EDITIONS.map((ed) => (
              <Link
                key={ed.year}
                href={`/editions/${ed.year}`}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-5 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                {ed.editionNumber}e édition ({ed.year})
              </Link>
            ))}
            <div className="pt-3">
              <Link
                href={featured.registrationOpen ? "/participer" : "/editions"}
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-xl bg-[#E8830C] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                {featured.registrationOpen
                  ? `S’inscrire — ${featured.editionNumber}e édition (${featured.year})`
                  : "Consulter les éditions"}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

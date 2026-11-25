"use client";

import { useState } from "react";
import { Download, LogOut, ShieldCheck, RefreshCw, Lock } from "lucide-react";
import { EDITIONS } from "@/data/editions";
import { NEWS_ARTICLES } from "@/data/news";
import { PARTNERS } from "@/data/partners";
import { EDITION_STATUS_LABELS } from "@/data/site";
import type { RegistrationRecord, RegistrationStatus } from "@/types/rse";

interface AdminDashboardClientProps {
  initialAuthenticated: boolean;
  initialRegistrations: RegistrationRecord[];
  hasSupabase: boolean;
}

export function AdminDashboardClient({
  initialAuthenticated,
  initialRegistrations,
  hasSupabase,
}: AdminDashboardClientProps) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [email, setEmail] = useState("admin@vitrinerse.org");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const [registrations, setRegistrations] =
    useState<RegistrationRecord[]>(initialRegistrations);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterEdition, setFilterEdition] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<
    "inscriptions" | "editions" | "contenus"
  >("inscriptions");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);
    setLoadingAuth(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Connexion refusée");
        return;
      }
      setAuthenticated(true);
      await refreshRegistrations();
    } catch {
      setAuthError("Erreur réseau");
    } finally {
      setLoadingAuth(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    setRegistrations([]);
  }

  async function refreshRegistrations() {
    const res = await fetch("/api/inscriptions");
    if (res.ok) {
      const data = await res.json();
      setRegistrations(data.items || []);
    }
  }

  async function handleStatusChange(id: string, status: RegistrationStatus) {
    const res = await fetch("/api/inscriptions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setRegistrations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    }
  }

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#115338] text-white">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-slate-900">
                Administration Vitrine RSE
              </h1>
              <p className="text-xs text-slate-500">
                Accès réservé au comité d’organisation (INGRIDD)
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-sm font-medium text-slate-700"
              >
                Identifiant e-mail
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#115338] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="admin-pass"
                className="block text-sm font-medium text-slate-700"
              >
                Mot de passe
              </label>
              <input
                id="admin-pass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#115338] focus:outline-none"
              />
            </div>

            {authError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs text-red-800">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={loadingAuth}
              className="w-full rounded-xl bg-[#115338] py-3 text-sm font-semibold text-white hover:bg-[#0A3624] disabled:opacity-60"
            >
              {loadingAuth ? "Vérification..." : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filtered = registrations.filter((r) => {
    if (filterType !== "all" && r.type !== filterType) return false;
    if (filterEdition !== "all" && String(r.editionYear) !== filterEdition)
      return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#115338]">
            <ShieldCheck className="h-4 w-4" />
            Console d’administration INGRIDD
          </div>
          <h1 className="mt-1 font-display text-2xl font-extrabold text-slate-900">
            Pilotage multi-éditions & Inscriptions
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Mode de stockage actif :{" "}
            <strong>
              {hasSupabase
                ? "Supabase PostgreSQL (Production)"
                : "Stockage local (.local-data) — configurez NEXT_PUBLIC_SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY pour Supabase"}
            </strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/inscriptions/export"
            className="inline-flex items-center gap-2 rounded-xl bg-[#115338] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0A3624]"
          >
            <Download className="h-4 w-4" />
            Exporter CSV (Excel)
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Real KPIs only */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-medium text-slate-500">
            Éditions configurées
          </div>
          <div className="mt-1 font-display text-2xl font-extrabold text-slate-900">
            {EDITIONS.length}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-medium text-slate-500">
            Inscriptions enregistrées
          </div>
          <div className="mt-1 font-display text-2xl font-extrabold text-[#115338]">
            {registrations.length}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-medium text-slate-500">
            Partenaires actifs
          </div>
          <div className="mt-1 font-display text-2xl font-extrabold text-slate-900">
            {PARTNERS.length}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-medium text-slate-500">
            Articles publiés
          </div>
          <div className="mt-1 font-display text-2xl font-extrabold text-slate-900">
            {NEWS_ARTICLES.length}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {[
          { id: "inscriptions", label: "Inscriptions" },
          { id: "editions", label: "Cycle de vie des éditions" },
          { id: "contenus", label: "Contenus & Partenaires" },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() =>
              setActiveTab(t.id as "inscriptions" | "editions" | "contenus")
            }
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === t.id
                ? "border-[#115338] text-[#115338]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "inscriptions" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-3">
              <select
                value={filterEdition}
                onChange={(e) => setFilterEdition(e.target.value)}
                aria-label="Filtrer par édition"
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium"
              >
                <option value="all">Toutes les éditions</option>
                {EDITIONS.map((ed) => (
                  <option key={ed.year} value={String(ed.year)}>
                    Édition {ed.year}
                  </option>
                ))}
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                aria-label="Filtrer par profil"
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium"
              >
                <option value="all">Tous les profils</option>
                <option value="participant">Participants</option>
                <option value="exposant">Exposants (FCPE)</option>
                <option value="partenaire">Partenaires</option>
                <option value="intervenant">Intervenants</option>
              </select>
            </div>

            <button
              type="button"
              onClick={refreshRegistrations}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Actualiser
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase">
                <tr>
                  <th className="px-4 py-3">Réf.</th>
                  <th className="px-4 py-3">Édition</th>
                  <th className="px-4 py-3">Profil</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Organisation</th>
                  <th className="px-4 py-3">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      Aucune inscription enregistrée pour le moment.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3 font-mono font-semibold text-slate-700">
                        {item.id.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        {item.editionYear}
                      </td>
                      <td className="px-4 py-3 capitalize">{item.type}</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">
                          {item.fullName}
                        </div>
                        <div className="text-slate-500">
                          {item.email} • {item.phone}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>{item.organization}</div>
                        {item.roleTitle && (
                          <div className="text-slate-500">{item.roleTitle}</div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(
                              item.id,
                              e.target.value as RegistrationStatus
                            )
                          }
                          aria-label={`Statut pour ${item.fullName}`}
                          className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium"
                        >
                          <option value="nouvelle">Nouvelle</option>
                          <option value="en_cours">En cours</option>
                          <option value="validee">Validée</option>
                          <option value="refusee">Refusée</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "editions" && (
        <div className="grid gap-4 md:grid-cols-2">
          {EDITIONS.map((ed) => {
            const st = EDITION_STATUS_LABELS[ed.status];
            return (
              <div
                key={ed.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-slate-900">
                    {ed.title}
                  </span>
                  {st && (
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${st.badgeClass}`}
                    >
                      {st.label}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600">
                  {ed.dateLabel} • {ed.location}
                </p>
                <p className="text-xs text-slate-500">
                  Séances programme : {ed.program?.length ?? 0} • Panels :{" "}
                  {ed.panels?.length ?? 0} • Inscriptions :{" "}
                  {ed.registrationOpen ? "Ouvertes" : "Fermées"}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "contenus" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 space-y-2">
          <p>
            <strong>{PARTNERS.length}</strong> partenaires répertoriés dans{" "}
            <code>src/data/partners.ts</code> et synchronisables avec la table{" "}
            <code>public.partners</code> de Supabase.
          </p>
          <p>
            <strong>{NEWS_ARTICLES.length}</strong> articles publiés dans{" "}
            <code>src/data/news.ts</code> et synchronisables avec la table{" "}
            <code>public.news_articles</code>.
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { CheckCircle2, Building2, Users, Handshake, Mic, AlertCircle } from "lucide-react";
import type { RegistrationType } from "@/types/rse";

const PROFILE_OPTIONS: Array<{
  id: RegistrationType;
  label: string;
  desc: string;
  icon: typeof Users;
}> = [
  {
    id: "participant",
    label: "Participant / Visiteur",
    desc: "Accès aux conférences, panels et visite de la FCPE.",
    icon: Users,
  },
  {
    id: "exposant",
    label: "Exposant (Stand FCPE)",
    desc: "Réserver un stand à la Foire Commerciale de la Performance des Entreprises.",
    icon: Building2,
  },
  {
    id: "partenaire",
    label: "Partenaire / Sponsor",
    desc: "Associer votre organisation et soutenir l’édition.",
    icon: Handshake,
  },
  {
    id: "intervenant",
    label: "Intervenant / Panéliste",
    desc: "Proposer une communication ou candidature de panel.",
    icon: Mic,
  },
];

interface RegistrationFormProps {
  editionYear: number;
  editionTitle: string;
  registrationOpen: boolean;
  defaultType?: RegistrationType;
}

export function RegistrationForm({
  editionYear,
  editionTitle,
  registrationOpen,
  defaultType = "participant",
}: RegistrationFormProps) {
  const [type, setType] = useState<RegistrationType>(defaultType);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [sector, setSector] = useState("");
  const [standNeeds, setStandNeeds] = useState("");
  const [partnershipTier, setPartnershipTier] = useState("Partenaire technique");
  const [topicProposal, setTopicProposal] = useState("");
  const [message, setMessage] = useState("");
  const [consentGdpr, setConsentGdpr] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{
    referenceId: string;
    message: string;
  } | null>(null);

  if (!registrationOpen) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
        <h3 className="font-display text-lg font-bold">
          Inscriptions fermées pour {editionTitle}
        </h3>
        <p className="mt-2 text-sm">
          Les inscriptions pour cette édition ne sont pas ouvertes actuellement.
          Consultez la rubrique Éditions pour suivre le calendrier officiel.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/inscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          editionYear,
          type,
          fullName,
          email,
          phone,
          organization,
          roleTitle,
          sector,
          standNeeds: type === "exposant" ? standNeeds : "",
          partnershipTier: type === "partenaire" ? partnershipTier : "",
          topicProposal: type === "intervenant" ? topicProposal : "",
          message,
          consentGdpr,
          honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Veuillez vérifier les informations saisies.");
        return;
      }

      setConfirmation({
        referenceId: data.referenceId,
        message: data.message,
      });
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#115338]" />
        <h3 className="mt-4 font-display text-2xl font-bold text-slate-900">
          Demande enregistrée
        </h3>
        <p className="mt-2 text-sm text-slate-700">{confirmation.message}</p>
        <div className="mt-4 inline-block rounded-xl bg-white px-4 py-2 font-mono text-sm font-bold text-[#115338] border border-emerald-200">
          Référence : VRSE-{editionYear}-{confirmation.referenceId}
        </div>
        <p className="mt-4 text-xs text-slate-600">
          Notre équipe d’organisation (INGRIDD) vous contactera prochainement via{" "}
          <strong>{email}</strong> ou par téléphone.
        </p>
        <button
          type="button"
          onClick={() => {
            setConfirmation(null);
            setFullName("");
            setEmail("");
            setPhone("");
            setOrganization("");
            setMessage("");
            setConsentGdpr(false);
          }}
          className="mt-6 rounded-xl bg-[#115338] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0A3624]"
        >
          Soumettre une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot anti-spam */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_url">Ne pas remplir</label>
        <input
          id="website_url"
          name="website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Profile Selector */}
      <div>
        <label className="block text-sm font-semibold text-slate-900">
          1. Choisissez votre profil de participation ({editionTitle})
        </label>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {PROFILE_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const active = type === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setType(opt.id)}
                className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                  active
                    ? "border-[#115338] bg-emerald-50/70 ring-1 ring-[#115338]"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <Icon
                  className={`mt-0.5 h-5 w-5 shrink-0 ${
                    active ? "text-[#115338]" : "text-slate-400"
                  }`}
                />
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {opt.label}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-600">{opt.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Core Fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-slate-700"
          >
            Nom et prénoms *
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ex. Aminata Ouédraogo"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#115338] focus:outline-none focus:ring-2 focus:ring-[#115338]/20"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700"
          >
            Adresse e-mail professionnelle *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nom@organisation.bf"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#115338] focus:outline-none focus:ring-2 focus:ring-[#115338]/20"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-700"
          >
            Téléphone (WhatsApp) *
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+226 70 00 00 00"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#115338] focus:outline-none focus:ring-2 focus:ring-[#115338]/20"
          />
        </div>

        <div>
          <label
            htmlFor="organization"
            className="block text-sm font-medium text-slate-700"
          >
            Entreprise / Institution / ONG *
          </label>
          <input
            id="organization"
            type="text"
            required
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="Nom de votre structure"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#115338] focus:outline-none focus:ring-2 focus:ring-[#115338]/20"
          />
        </div>

        <div>
          <label
            htmlFor="roleTitle"
            className="block text-sm font-medium text-slate-700"
          >
            Fonction / Poste
          </label>
          <input
            id="roleTitle"
            type="text"
            value={roleTitle}
            onChange={(e) => setRoleTitle(e.target.value)}
            placeholder="Ex. Responsable HSE / RSE"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#115338] focus:outline-none focus:ring-2 focus:ring-[#115338]/20"
          />
        </div>

        <div>
          <label
            htmlFor="sector"
            className="block text-sm font-medium text-slate-700"
          >
            Secteur d’activité
          </label>
          <input
            id="sector"
            type="text"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            placeholder="Mines, Agroalimentaire, Énergie, Finance..."
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#115338] focus:outline-none focus:ring-2 focus:ring-[#115338]/20"
          />
        </div>
      </div>

      {/* Dynamic Profile Fields */}
      {type === "exposant" && (
        <div>
          <label
            htmlFor="standNeeds"
            className="block text-sm font-medium text-slate-700"
          >
            Besoins pour votre stand (F.C.P.E)
          </label>
          <input
            id="standNeeds"
            type="text"
            value={standNeeds}
            onChange={(e) => setStandNeeds(e.target.value)}
            placeholder="Produits/services exposés, surface souhaitée, besoins électriques..."
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#115338] focus:outline-none focus:ring-2 focus:ring-[#115338]/20"
          />
        </div>
      )}

      {type === "partenaire" && (
        <div>
          <label
            htmlFor="partnershipTier"
            className="block text-sm font-medium text-slate-700"
          >
            Type de partenariat envisagé
          </label>
          <select
            id="partnershipTier"
            value={partnershipTier}
            onChange={(e) => setPartnershipTier(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-[#115338] focus:outline-none focus:ring-2 focus:ring-[#115338]/20"
          >
            <option>Partenaire institutionnel</option>
            <option>Sponsor officiel / Financier</option>
            <option>Partenaire technique</option>
            <option>Partenaire média</option>
          </select>
        </div>
      )}

      {type === "intervenant" && (
        <div>
          <label
            htmlFor="topicProposal"
            className="block text-sm font-medium text-slate-700"
          >
            Thématique ou panel souhaité
          </label>
          <input
            id="topicProposal"
            type="text"
            value={topicProposal}
            onChange={(e) => setTopicProposal(e.target.value)}
            placeholder="Précisez le panel (1 à 6) ou le sujet de votre communication"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#115338] focus:outline-none focus:ring-2 focus:ring-[#115338]/20"
          />
        </div>
      )}

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-slate-700"
        >
          Précisions complémentaires
        </label>
        <textarea
          id="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Vos attentes, questions ou informations utiles pour l’équipe d’organisation..."
          className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#115338] focus:outline-none focus:ring-2 focus:ring-[#115338]/20"
        />
      </div>

      {/* Consent */}
      <label className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-xs text-slate-600 border border-slate-200 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={consentGdpr}
          onChange={(e) => setConsentGdpr(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#115338] focus:ring-[#115338]"
        />
        <span>
          J’accepte que mes données personnelles soient traitées par l’INGRIDD /
          Vitrine RSE exclusivement pour la gestion de mon inscription à la{" "}
          {editionTitle} et le suivi logistique de l’événement. Ces données ne
          sont jamais revendues à des tiers.
        </span>
      </label>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-[#115338] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0A3624] disabled:opacity-60"
      >
        {submitting
          ? "Enregistrement en cours..."
          : `Valider ma demande (${editionYear})`}
      </button>
    </form>
  );
}

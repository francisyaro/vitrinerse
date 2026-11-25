"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";

export function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [consentGdpr, setConsentGdpr] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          subject,
          message,
          consentGdpr,
          honeypot,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de l’envoi.");
        return;
      }
      setSent(data.message);
      setFullName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
      setConsentGdpr(false);
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-[#115338]" />
        <h3 className="mt-3 font-display text-xl font-bold text-slate-900">
          Message envoyé
        </h3>
        <p className="mt-2 text-sm text-slate-700">{sent}</p>
        <button
          type="button"
          onClick={() => setSent(null)}
          className="mt-5 rounded-xl bg-[#115338] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          tabIndex={-1}
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="block text-sm font-medium text-slate-700">
            Nom complet *
          </label>
          <input
            id="c-name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#115338] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="c-email" className="block text-sm font-medium text-slate-700">
            E-mail *
          </label>
          <input
            id="c-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#115338] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-phone" className="block text-sm font-medium text-slate-700">
            Téléphone
          </label>
          <input
            id="c-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#115338] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="c-subject" className="block text-sm font-medium text-slate-700">
            Objet *
          </label>
          <input
            id="c-subject"
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Partenariat, presse, stand FCPE, information..."
            className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#115338] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="c-msg" className="block text-sm font-medium text-slate-700">
          Message *
        </label>
        <textarea
          id="c-msg"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#115338] focus:outline-none"
        />
      </div>

      <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={consentGdpr}
          onChange={(e) => setConsentGdpr(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#115338]"
        />
        <span>
          J’accepte que mes coordonnées soient utilisées par l’INGRIDD pour
          répondre à ma demande.
        </span>
      </label>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 border border-red-200">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 rounded-xl bg-[#115338] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0A3624] disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {submitting ? "Envoi..." : "Envoyer le message"}
      </button>
    </form>
  );
}

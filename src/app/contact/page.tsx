import type { Metadata } from "next";
import { Mail, MapPin, Phone, Building } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { SITE_INFO } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact & Infoline",
  description:
    "Contactez le secrétariat de Vitrine RSE / INGRIDD à Ouagadougou (01 BP 2850 Ouaga 01) par téléphone, e-mail ou formulaire sécurisé.",
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-[#0A3624] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Secrétariat permanent • INGRIDD
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            Contactez Vitrine RSE
          </h1>
          <p className="mt-3 max-w-2xl text-base text-emerald-100/90">
            Une question sur la 4e édition, les stands de la F.C.P.E, le
            partenariat ou les trophées ? Écrivez-nous directement.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-6">
              Envoyer un message sécurisé
            </h2>
            <ContactForm />
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Coordonnées officielles
              </h2>
              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <Building className="mt-0.5 h-5 w-5 text-[#115338] shrink-0" />
                  <div>
                    <strong className="block text-slate-900">
                      Organisateur
                    </strong>
                    Vitrine RSE, filiale de l’{SITE_INFO.organizerFullName} (
                    {SITE_INFO.organizer})
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-[#E8830C] shrink-0" />
                  <div>
                    <strong className="block text-slate-900">Adresse</strong>
                    {SITE_INFO.address}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-[#E8830C] shrink-0" />
                  <div>
                    <strong className="block text-slate-900">Infoline</strong>
                    {SITE_INFO.phones.map((p) => (
                      <a
                        key={p.href}
                        href={p.href}
                        className="block hover:text-[#115338]"
                      >
                        {p.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-[#E8830C] shrink-0" />
                  <div>
                    <strong className="block text-slate-900">E-mail</strong>
                    <a
                      href={`mailto:${SITE_INFO.email}`}
                      className="hover:text-[#115338]"
                    >
                      {SITE_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs text-xs text-slate-600 space-y-1.5">
              <div className="font-display text-sm font-bold text-slate-900">
                Mentions légales & bancaires
              </div>
              <p>RCCM N° {SITE_INFO.legal.rccm}</p>
              <p>IFU N° {SITE_INFO.legal.ifu}</p>
              <p>Compte ECOBANK N° {SITE_INFO.legal.ecobank}</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export const SITE_INFO = {
  name: "Vitrine RSE",
  fullName: "Vitrine de la Responsabilité Sociale des Entreprises",
  organizer: "INGRIDD",
  organizerFullName:
    "Institut de Gestion des Risques Industriels et du Développement Durable",
  domain: "https://vitrinerse.org",
  address: "01 BP 2850 Ouaga 01, Ouagadougou, Burkina Faso",
  email: "info@vitrinerse.org",
  phones: [
    { label: "(+226) 78 01 95 85", href: "tel:+22678019585" },
    { label: "(+226) 70 12 78 77", href: "tel:+22670127877" },
    { label: "(+226) 01 64 20 20", href: "tel:+22601642020" },
  ],
  legal: {
    rccm: "BF-OUA-01-2024-B13-13479",
    ifu: "00247031S",
    ecobank: "171694147001",
  },
  social: {
    facebook: "https://web.facebook.com/profile.php?id=61555531560204",
    youtubePlaylist:
      "https://www.youtube.com/watch?v=rnMKunRKAzE&list=PLSmOZRlbQ6z8Wcm2uUtuZGLcQd3HVFbRr",
  },
} as const;

export const EDITION_STATUS_LABELS: Record<
  string,
  { label: string; badgeClass: string; description: string }
> = {
  brouillon: {
    label: "Brouillon",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    description: "En préparation interne.",
  },
  annoncee: {
    label: "Annoncée",
    badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
    description: "Édition officiellement annoncée.",
  },
  inscriptions_ouvertes: {
    label: "Inscriptions ouvertes",
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
    description: "Les inscriptions participants, exposants et partenaires sont ouvertes.",
  },
  en_cours: {
    label: "En cours",
    badgeClass: "bg-green-600 text-white border-green-700",
    description: "L’événement se déroule actuellement à Ouagadougou.",
  },
  terminee: {
    label: "Terminée",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-300",
    description: "Édition clôturée, bilan en cours de consolidation.",
  },
  archivee: {
    label: "Archivée",
    badgeClass: "bg-stone-100 text-stone-700 border-stone-200",
    description: "Patrimoine numérique et archives officielles.",
  },
};

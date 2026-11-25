export type EditionStatus =
  | "brouillon"
  | "annoncee"
  | "inscriptions_ouvertes"
  | "en_cours"
  | "terminee"
  | "archivee";

export type RegistrationType =
  | "participant"
  | "exposant"
  | "partenaire"
  | "intervenant";

export type RegistrationStatus =
  | "nouvelle"
  | "en_cours"
  | "validee"
  | "refusee";

export type PartnerCategory =
  | "institutionnel"
  | "technique"
  | "financier"
  | "media"
  | "entreprise";

export type SessionType =
  | "ceremonie"
  | "conference"
  | "panel"
  | "communication"
  | "formation"
  | "exposition"
  | "reseautage"
  | "trophee";

export interface ProgramSession {
  id: string;
  dayNumber: 1 | 2 | 3;
  dayLabel: string;
  actNumber?: string;
  timeRange: string;
  title: string;
  type: SessionType;
  description?: string;
}

export interface PanelTheme {
  id: string;
  panelNumber: number;
  title: string;
  scheduleLabel: string;
  mainQuestion: string;
  keyPoints: string[];
}

export interface EditionGalleryItem {
  id: string;
  title: string;
  type: "photo" | "video" | "affiche";
  url: string;
  caption?: string;
}

export interface Edition {
  id: string;
  year: number;
  editionNumber: number;
  slug: string;
  title: string;
  theme: string | null;
  status: EditionStatus;
  dateLabel: string;
  startDate?: string;
  endDate?: string;
  location: string;
  city: string;
  posterUrl?: string;
  bannerUrl?: string;
  summary: string;
  highlights?: string[];
  regulatoryContext?: string[];
  program?: ProgramSession[];
  panels?: PanelTheme[];
  gallery?: EditionGalleryItem[];
  isFeatured: boolean;
  registrationOpen: boolean;
  missingArchiveNotice?: string;
}

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  logoUrl: string;
  websiteUrl?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  editionYear: number;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  publishedAt: string;
  dateDisplay: string;
  imageUrl: string;
  externalUrl?: string;
}

export interface RegistrationRecord {
  id: string;
  editionYear: number;
  type: RegistrationType;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  roleTitle?: string;
  sector?: string;
  message?: string;
  standNeeds?: string;
  partnershipTier?: string;
  topicProposal?: string;
  status: RegistrationStatus;
  consentGdpr: boolean;
  createdAt: string;
}

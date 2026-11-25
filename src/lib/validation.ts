import { z } from "zod";

export const registrationSchema = z.object({
  editionYear: z.number().int().min(2024).max(2050),
  type: z.enum(["participant", "exposant", "partenaire", "intervenant"]),
  fullName: z
    .string()
    .trim()
    .min(2, "Veuillez indiquer votre nom complet.")
    .max(120),
  email: z
    .string()
    .trim()
    .email("Veuillez saisir une adresse e-mail valide.")
    .max(160),
  phone: z
    .string()
    .trim()
    .min(6, "Veuillez saisir un numéro de téléphone valide.")
    .max(40),
  organization: z
    .string()
    .trim()
    .min(2, "Veuillez indiquer votre entreprise, institution ou organisation.")
    .max(160),
  roleTitle: z.string().trim().max(120).optional().default(""),
  sector: z.string().trim().max(120).optional().default(""),
  standNeeds: z.string().trim().max(500).optional().default(""),
  partnershipTier: z.string().trim().max(120).optional().default(""),
  topicProposal: z.string().trim().max(500).optional().default(""),
  message: z.string().trim().max(1500).optional().default(""),
  consentGdpr: z.boolean().refine((val) => val === true, {
    message:
      "Vous devez accepter le traitement de vos données pour soumettre votre demande.",
  }),
  honeypot: z.string().max(0, "Soumission invalide.").optional().default(""),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Nom requis.").max(120),
  email: z.string().trim().email("E-mail invalide.").max(160),
  phone: z.string().trim().max(40).optional().default(""),
  subject: z.string().trim().min(3, "Objet requis.").max(160),
  message: z.string().trim().min(10, "Message trop court.").max(2000),
  consentGdpr: z.boolean().refine((val) => val === true, {
    message: "Le consentement au traitement des données est requis.",
  }),
  honeypot: z.string().max(0).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

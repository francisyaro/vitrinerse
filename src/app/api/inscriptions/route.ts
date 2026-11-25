import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { getEditionByYear } from "@/data/editions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  listRegistrations,
  saveRegistration,
  updateRegistrationStatus,
} from "@/lib/storage";
import { registrationSchema } from "@/lib/validation";
import type { RegistrationStatus } from "@/types/rse";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    if (data.honeypot && data.honeypot.length > 0) {
      return NextResponse.json({ error: "Requête rejetée" }, { status: 400 });
    }

    const edition = getEditionByYear(data.editionYear);
    if (!edition) {
      return NextResponse.json(
        { error: "Édition introuvable." },
        { status: 404 }
      );
    }

    if (!edition.registrationOpen) {
      return NextResponse.json(
        {
          error: `Les inscriptions pour l’édition ${edition.year} ne sont pas ouvertes.`,
        },
        { status: 403 }
      );
    }

    const record = {
      id: crypto.randomUUID(),
      editionYear: data.editionYear,
      type: data.type,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      organization: data.organization,
      roleTitle: data.roleTitle,
      sector: data.sector,
      standNeeds: data.standNeeds,
      partnershipTier: data.partnershipTier,
      topicProposal: data.topicProposal,
      message: data.message,
      status: "nouvelle" as const,
      consentGdpr: data.consentGdpr,
      createdAt: new Date().toISOString(),
    };

    const saved = await saveRegistration(record);

    return NextResponse.json(
      {
        message: "Votre demande d’inscription a bien été enregistrée.",
        referenceId: saved.record.id.slice(0, 8).toUpperCase(),
        editionYear: data.editionYear,
        storage: saved.storage,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Erreur lors du traitement de votre demande." },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const items = await listRegistrations();
  return NextResponse.json({ items });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const { id, status } = (await req.json()) as {
      id?: string;
      status?: RegistrationStatus;
    };
    const allowed: RegistrationStatus[] = [
      "nouvelle",
      "en_cours",
      "validee",
      "refusee",
    ];
    if (!id || !status || !allowed.includes(status)) {
      return NextResponse.json(
        { error: "Paramètres invalides" },
        { status: 400 }
      );
    }
    const ok = await updateRegistrationStatus(id, status);
    if (!ok) {
      return NextResponse.json(
        { error: "Inscription introuvable" },
        { status: 404 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

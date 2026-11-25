import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Veuillez vérifier les champs du formulaire.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
      return NextResponse.json({ error: "Requête rejetée" }, { status: 400 });
    }

    return NextResponse.json(
      {
        message:
          "Votre message a bien été transmis au secrétariat d’INGRIDD / Vitrine RSE.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Impossible d’envoyer le message pour le moment." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createSessionToken,
  getExpectedAdminPassword,
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = (await req.json()) as {
      email?: string;
      password?: string;
    };

    const expected = getExpectedAdminPassword();
    if (!expected) {
      return NextResponse.json(
        {
          error:
            "ADMIN_PASSWORD non configuré dans les variables d’environnement.",
        },
        { status: 503 }
      );
    }

    if (!email || !password || password !== expected) {
      return NextResponse.json(
        { error: "Identifiants incorrects." },
        { status: 401 }
      );
    }

    const token = createSessionToken(email);
    const res = NextResponse.json({ ok: true, email });
    res.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE_NAME);
  return res;
}

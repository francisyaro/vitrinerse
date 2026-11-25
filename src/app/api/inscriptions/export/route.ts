import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listRegistrations } from "@/lib/storage";

function csvCell(value: unknown): string {
  const str = String(value ?? "").replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const items = await listRegistrations();
  const headers = [
    "Reference",
    "Edition",
    "Type",
    "Statut",
    "Nom complet",
    "Email",
    "Telephone",
    "Organisation",
    "Fonction",
    "Secteur",
    "Message",
    "Consentement RGPD",
    "Date",
  ];

  const rows = items.map((r) => [
    csvCell(r.id.slice(0, 8).toUpperCase()),
    csvCell(r.editionYear),
    csvCell(r.type),
    csvCell(r.status),
    csvCell(r.fullName),
    csvCell(r.email),
    csvCell(r.phone),
    csvCell(r.organization),
    csvCell(r.roleTitle),
    csvCell(r.sector),
    csvCell(r.message),
    csvCell(r.consentGdpr ? "Oui" : "Non"),
    csvCell(r.createdAt),
  ]);

  const csvContent =
    "\uFEFF" + [headers.map(csvCell).join(";"), ...rows.map((r) => r.join(";"))].join("\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="inscriptions-vitrine-rse.csv"`,
    },
  });
}

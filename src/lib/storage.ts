import { promises as fs } from "node:fs";
import path from "node:path";
import type { RegistrationRecord, RegistrationStatus } from "@/types/rse";

const DATA_DIR = path.join(process.cwd(), ".local-data");
const REG_FILE = path.join(DATA_DIR, "registrations.json");

// Fallback in-memory store for read-only serverless environments when Supabase is not yet configured
const memoryStore: RegistrationRecord[] = [];

function hasSupabaseConfig(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

async function readLocalRegistrations(): Promise<RegistrationRecord[]> {
  try {
    const raw = await fs.readFile(REG_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [...memoryStore];
  }
}

async function writeLocalRegistrations(
  items: RegistrationRecord[]
): Promise<void> {
  memoryStore.length = 0;
  memoryStore.push(...items);
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(REG_FILE, JSON.stringify(items, null, 2), "utf8");
  } catch {
    // Serverless read-only filesystem: memoryStore keeps state for current instance
  }
}

export async function saveRegistration(
  record: RegistrationRecord
): Promise<{ storage: "supabase" | "local"; record: RegistrationRecord }> {
  if (hasSupabaseConfig()) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    // Resolve edition_id by year
    const edRes = await fetch(
      `${supabaseUrl}/rest/v1/editions?year=eq.${record.editionYear}&select=id`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
      }
    );

    if (edRes.ok) {
      const editions = (await edRes.json()) as Array<{ id: string }>;
      if (editions.length > 0) {
        const insertRes = await fetch(`${supabaseUrl}/rest/v1/registrations`, {
          method: "POST",
          headers: {
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            id: record.id,
            edition_id: editions[0].id,
            type: record.type,
            full_name: record.fullName,
            email: record.email,
            phone: record.phone,
            organization: record.organization,
            role_title: record.roleTitle || null,
            sector: record.sector || null,
            message: record.message || null,
            metadata: {
              standNeeds: record.standNeeds || null,
              partnershipTier: record.partnershipTier || null,
              topicProposal: record.topicProposal || null,
            },
            status: record.status,
            consent_gdpr: record.consentGdpr,
            consent_at: record.createdAt,
          }),
        });

        if (insertRes.ok) {
          return { storage: "supabase", record };
        }
      }
    }
  }

  const existing = await readLocalRegistrations();
  existing.unshift(record);
  await writeLocalRegistrations(existing);
  return { storage: "local", record };
}

export async function listRegistrations(): Promise<RegistrationRecord[]> {
  if (hasSupabaseConfig()) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const res = await fetch(
      `${supabaseUrl}/rest/v1/registrations?select=*,editions(year)&order=created_at.desc`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
        cache: "no-store",
      }
    );
    if (res.ok) {
      const rows = (await res.json()) as Array<Record<string, unknown>>;
      return rows.map((r) => {
        const meta = (r.metadata as Record<string, string>) || {};
        const ed = r.editions as { year?: number } | null;
        return {
          id: String(r.id),
          editionYear: ed?.year ?? 2027,
          type: r.type as RegistrationRecord["type"],
          fullName: String(r.full_name),
          email: String(r.email),
          phone: String(r.phone),
          organization: String(r.organization ?? ""),
          roleTitle: r.role_title ? String(r.role_title) : undefined,
          sector: r.sector ? String(r.sector) : undefined,
          message: r.message ? String(r.message) : undefined,
          standNeeds: meta.standNeeds || undefined,
          partnershipTier: meta.partnershipTier || undefined,
          topicProposal: meta.topicProposal || undefined,
          status: r.status as RegistrationStatus,
          consentGdpr: Boolean(r.consent_gdpr),
          createdAt: String(r.created_at),
        };
      });
    }
  }
  return readLocalRegistrations();
}

export async function updateRegistrationStatus(
  id: string,
  status: RegistrationStatus
): Promise<boolean> {
  if (hasSupabaseConfig()) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const res = await fetch(
      `${supabaseUrl}/rest/v1/registrations?id=eq.${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
      }
    );
    if (res.ok) return true;
  }

  const items = await readLocalRegistrations();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return false;
  items[idx].status = status;
  await writeLocalRegistrations(items);
  return true;
}

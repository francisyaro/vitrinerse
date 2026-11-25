import type { Metadata } from "next";
import { AdminDashboardClient } from "@/components/AdminDashboardClient";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listRegistrations } from "@/lib/storage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();
  const registrations = authenticated ? await listRegistrations() : [];
  const hasSupabase = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminDashboardClient
        initialAuthenticated={authenticated}
        initialRegistrations={registrations}
        hasSupabase={hasSupabase}
      />
    </div>
  );
}

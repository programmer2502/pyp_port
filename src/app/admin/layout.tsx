import type { Metadata } from "next";
import "./admin.css";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    template: "%s — PYP Admin",
    default: "Dashboard — PYP Admin",
  },
  description: "PYP Studio content management system",
  robots: "noindex, nofollow",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userEmail: string | undefined;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userEmail = user?.email ?? undefined;
  } catch {
    // Supabase not configured yet — gracefully degrade
  }

  return <AdminShell userEmail={userEmail}>{children}</AdminShell>;
}

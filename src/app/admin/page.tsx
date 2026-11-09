import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Camera,
  Film,
  Inbox,
  HardDrive,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { StatCard } from "@/components/admin/ui/StatCard";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { getProjects, getInquiries } from "@/lib/data/api";

export default async function AdminDashboardPage() {
  const [projects, inquiries] = await Promise.all([
    getProjects({ publishedOnly: false }),
    getInquiries(),
  ]);

  const totalProjects = projects.length;
  const photoProjects = projects.filter((p) => p.type === "photo" || p.type === "both").length;
  const videoProjects = projects.filter((p) => p.type === "video" || p.type === "both").length;
  const newInquiries = inquiries.filter((i) => i.status === "new").length;

  const isConnected =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder");

  return (
    <>
      <PageHeader
        title="PYP Dashboard"
        description="Real-time overview of your portfolio showcase, client inquiries, and media storage."
        icon={LayoutDashboard}
      />

      {/* Stat Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard
          title="Total Projects"
          value={totalProjects}
          caption={`${projects.filter((p) => p.published).length} live on site`}
          icon={Briefcase}
        />
        <StatCard
          title="Photo Suites"
          value={photoProjects}
          caption="Published stills"
          icon={Camera}
        />
        <StatCard
          title="Video Projects"
          value={videoProjects}
          caption="Cinema films"
          icon={Film}
        />
        <StatCard
          title="New Inquiries"
          value={newInquiries}
          caption={`${inquiries.length} total messages`}
          icon={Inbox}
        />
        <StatCard
          title="Storage Used"
          value="64 MB"
          caption="of 1 GB free tier"
          icon={HardDrive}
        />
      </div>

      {/* Quick Actions Row */}
      <div className="admin-card p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="text-sm font-semibold" style={{ color: "var(--admin-text)" }}>
              Quick Actions
            </h3>
            <p className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
              Frequently used publishing shortcuts
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link href="/admin/projects/new" className="admin-btn admin-btn-primary">
            <Plus size={15} />
            <span>New Project</span>
          </Link>
          <Link href="/admin/showreel" className="admin-btn admin-btn-secondary">
            <Film size={15} />
            <span>Update Showreel</span>
          </Link>
          <Link href="/admin/inquiries" className="admin-btn admin-btn-secondary">
            <Inbox size={15} />
            <span>Review Inquiries ({newInquiries})</span>
          </Link>
          <Link href="/" target="_blank" className="admin-btn admin-btn-ghost">
            <span>View Live Site</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries Inbox */}
        <div className="admin-card lg:col-span-2">
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid var(--admin-border)" }}
          >
            <div>
              <h2 className="text-sm font-semibold" style={{ color: "var(--admin-text)" }}>
                Recent Inquiries
              </h2>
              <p className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
                Prospective clients from the public contact form
              </p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold hover:underline"
              style={{ color: "var(--admin-accent)" }}
            >
              View all inquiries →
            </Link>
          </div>

          <div className="divide-y" style={{ borderColor: "var(--admin-border)" }}>
            {inquiries.slice(0, 5).map((inq) => (
              <div key={inq.id} className="p-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold truncate" style={{ color: "var(--admin-text)" }}>
                      {inq.name}
                    </span>
                    <span
                      className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded-full ${
                        inq.status === "new"
                          ? "bg-red-100 text-red-700 font-bold"
                          : inq.status === "booked"
                          ? "bg-green-100 text-green-700 font-bold"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                  <p className="text-xs truncate" style={{ color: "var(--admin-text-muted)" }}>
                    {inq.service || "General Inquiry"} • {inq.budget_range || "Budget TBD"}
                  </p>
                  <p className="text-xs truncate mt-1 text-[#111111]/80 max-w-lg">
                    &ldquo;{inq.message}&rdquo;
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="font-mono text-xs block" style={{ color: "var(--admin-text-muted)" }}>
                    {new Date(inq.created_at).toLocaleDateString()}
                  </span>
                  <Link
                    href="/admin/inquiries"
                    className="admin-btn admin-btn-ghost admin-btn-sm mt-1"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System & Storage Status */}
        <div className="flex flex-col gap-6">
          {/* Cloud Database Status */}
          <div className="admin-card p-5">
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--admin-text)" }}>
              Supabase Status
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`w-3 h-3 rounded-full ${
                  isConnected ? "bg-green-500 animate-pulse" : "bg-amber-500"
                }`}
              />
              <span className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>
                {isConnected ? "Connected to Cloud Postgres" : "Local Development / Demo Mode"}
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--admin-text-muted)" }}>
              {isConnected
                ? "All database writes and storage uploads stream directly to your live Supabase project."
                : "Active in standalone mode. Paste your live Supabase credentials into .env.local to enable cloud synchronization."}
            </p>
          </div>

          {/* Storage Quota */}
          <div className="admin-card p-5">
            <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--admin-text)" }}>
              Storage Usage
            </h3>
            <div className="flex items-baseline justify-between text-xs mb-2">
              <span style={{ color: "var(--admin-text-muted)" }}>64 MB used</span>
              <span className="font-mono" style={{ color: "var(--admin-text)" }}>
                1,024 MB limit
              </span>
            </div>
            <div
              className="w-full h-2 rounded-full overflow-hidden"
              style={{ background: "var(--admin-border)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: "6.4%", background: "var(--admin-accent)" }}
              />
            </div>
            <p className="text-[11px] mt-3" style={{ color: "var(--admin-text-muted)" }}>
              Images are automatically optimized and capped at 2400px width before upload.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

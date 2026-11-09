import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  caption?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  loading?: boolean;
  className?: string;
}

export function StatCard({
  title,
  value,
  caption,
  icon: Icon,
  trend,
  loading,
  className,
}: StatCardProps) {
  if (loading) {
    return (
      <div className={cn("admin-card p-5", className)}>
        <div className="admin-skeleton h-4 w-24 mb-3 rounded" />
        <div className="admin-skeleton h-8 w-16 mb-2 rounded" />
        <div className="admin-skeleton h-3 w-32 rounded" />
      </div>
    );
  }

  return (
    <div className={cn("admin-card p-5", className)}>
      <div className="flex items-start justify-between mb-3">
        <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--admin-text-muted)" }}>
          {title}
        </span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--admin-accent-subtle)", color: "var(--admin-accent-text)" }}
        >
          <Icon size={16} />
        </div>
      </div>
      <div className="admin-stat-number mb-1">{value}</div>
      {caption && (
        <p style={{ fontSize: "12px", color: "var(--admin-text-muted)" }}>{caption}</p>
      )}
      {trend && (
        <div className="flex items-center gap-1 mt-2">
          <span
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: trend.value >= 0 ? "var(--admin-success)" : "var(--admin-danger)",
            }}
          >
            {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
          <span style={{ fontSize: "12px", color: "var(--admin-text-muted)" }}>{trend.label}</span>
        </div>
      )}
    </div>
  );
}

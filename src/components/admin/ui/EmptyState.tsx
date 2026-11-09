"use client";

import { type LucideIcon, Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="admin-empty">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-1"
        style={{ background: "var(--admin-surface-raised)", color: "var(--admin-text-muted)" }}
      >
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--admin-text)" }}>{title}</p>
      {description && (
        <p style={{ fontSize: "14px", color: "var(--admin-text-muted)", maxWidth: 320 }}>
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

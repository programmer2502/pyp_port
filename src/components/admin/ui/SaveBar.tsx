"use client";

import { cn } from "@/lib/utils";

interface SaveBarProps {
  visible: boolean;
  onSave: () => void;
  onDiscard: () => void;
  loading?: boolean;
  sidebarCollapsed?: boolean;
}

export function SaveBar({ visible, onSave, onDiscard, loading, sidebarCollapsed }: SaveBarProps) {
  return (
    <div
      className={cn("admin-save-bar", visible && "visible")}
      style={{
        left: sidebarCollapsed
          ? "var(--admin-sidebar-collapsed)"
          : "var(--admin-sidebar-width)",
      }}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: "var(--admin-warning)" }}
        />
        <span style={{ fontSize: "14px", color: "var(--admin-text-muted)" }}>
          You have unsaved changes
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="admin-btn admin-btn-secondary admin-btn-sm"
          onClick={onDiscard}
          disabled={loading}
        >
          Discard
        </button>
        <button
          className="admin-btn admin-btn-primary admin-btn-sm"
          onClick={onSave}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving…
            </span>
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </div>
  );
}

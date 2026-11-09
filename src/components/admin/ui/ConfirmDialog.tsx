"use client";

import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

interface ConfirmDialogProps {
  open: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  loading?: boolean;
  variant?: "danger" | "default";
  destructive?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onCancel,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  loading = false,
  variant = "danger",
  destructive,
}: ConfirmDialogProps) {
  const handleClose = onClose || onCancel || (() => {});
  const isDanger = variant === "danger" || destructive === true;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div className="admin-dialog-overlay" onClick={handleClose}>
      <div
        className="admin-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: isDanger ? "var(--admin-danger-bg)" : "var(--admin-accent-subtle)",
              color: isDanger ? "var(--admin-danger)" : "var(--admin-accent)",
            }}
          >
            <AlertTriangle size={18} />
          </div>
          <div className="flex-1">
            <h2
              id="dialog-title"
              style={{ fontSize: "16px", fontWeight: 600, color: "var(--admin-text)", marginBottom: 4 }}
            >
              {title}
            </h2>
            <p id="dialog-desc" style={{ fontSize: "14px", color: "var(--admin-text-muted)" }}>
              {description}
            </p>
          </div>
          <button className="admin-btn admin-btn-ghost admin-btn-icon" onClick={handleClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <div className="flex items-center justify-end gap-3">
          <button className="admin-btn admin-btn-secondary" onClick={handleClose} disabled={loading}>
            Cancel
          </button>
          <button
            className={`admin-btn ${isDanger ? "admin-btn-danger" : "admin-btn-primary"}`}
            onClick={onConfirm}
            disabled={loading}
            autoFocus
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span
                  className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"
                />
                {confirmLabel}…
              </span>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties; size?: number }>;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ title, description, icon: Icon, children, className }: FormSectionProps) {
  return (
    <div className={cn("admin-card", className)}>
      <div
        className="px-5 py-4 flex items-start gap-3"
        style={{ borderBottom: "1px solid var(--admin-border)" }}
      >
        {Icon && (
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: "var(--admin-surface-raised)", border: "1px solid var(--admin-border)" }}
          >
            <Icon size={16} style={{ color: "var(--admin-primary)" }} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--admin-text)" }}>
            {title}
          </h3>
          {description && (
            <p className="mt-0.5" style={{ fontSize: "13px", color: "var(--admin-text-muted)" }}>
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="p-5 flex flex-col gap-5">{children}</div>
    </div>
  );
}

interface FieldProps {
  label: string;
  helper?: string;
  error?: string;
  required?: boolean;
  charCount?: { current: number; max: number };
  children: React.ReactNode;
}

export function Field({ label, helper, error, required, charCount, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="admin-label" style={{ margin: 0 }}>
          {label}
          {required && <span style={{ color: "var(--admin-danger)", marginLeft: 3 }}>*</span>}
        </label>
        {charCount && (
          <span
            className="admin-mono"
            style={{
              color:
                charCount.current > charCount.max
                  ? "var(--admin-danger)"
                  : "var(--admin-text-muted)",
            }}
          >
            {charCount.current}/{charCount.max}
          </span>
        )}
      </div>
      {children}
      {helper && !error && <p className="admin-helper">{helper}</p>}
      {error && <p className="admin-error-text" role="alert">{error}</p>}
    </div>
  );
}

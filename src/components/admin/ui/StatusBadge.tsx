import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "published" | "draft" | "error";
  className?: string;
}

const labels: Record<StatusBadgeProps["status"], string> = {
  published: "Published",
  draft: "Draft",
  error: "Error",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "admin-badge",
        status === "published" && "admin-badge-published",
        status === "draft" && "admin-badge-draft",
        status === "error" && "admin-badge-error",
        className
      )}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{
          background:
            status === "published"
              ? "var(--admin-success)"
              : status === "draft"
              ? "var(--admin-warning)"
              : "var(--admin-danger)",
        }}
      />
      {labels[status]}
    </span>
  );
}

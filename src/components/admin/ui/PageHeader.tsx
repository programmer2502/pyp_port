import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  actions?: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export function PageHeader({
  title,
  description,
  action,
  actions,
  icon: Icon,
  className,
}: PageHeaderProps) {
  const rightContent = action ?? actions;
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-6", className)}>
      <div className="flex items-start gap-3">
        {Icon && (
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{
              background: "var(--admin-accent-subtle)",
              color: "var(--admin-accent-text)",
            }}
          >
            <Icon size={20} />
          </div>
        )}
        <div>
          <h1
            className="font-semibold"
            style={{ fontSize: "24px", color: "var(--admin-text)", lineHeight: "1.2" }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="mt-1"
              style={{ fontSize: "14px", color: "var(--admin-text-muted)" }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
      {rightContent && <div className="flex-shrink-0">{rightContent}</div>}
    </div>
  );
}

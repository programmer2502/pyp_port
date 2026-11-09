"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Film,
  Tags,
  Layers,
  MessageSquareQuote,
  Inbox,
  Settings,
  ChevronLeft,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: "Portfolio",
    items: [
      { href: "/admin/projects", label: "Projects", icon: Briefcase },
      { href: "/admin/showreel", label: "Showreel", icon: Film },
      { href: "/admin/categories", label: "Categories", icon: Tags },
      { href: "/admin/services", label: "Services", icon: Layers },
      { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
    ],
  },
  {
    label: "Communications",
    items: [
      { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/settings", label: "Site Settings", icon: Settings },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          "admin-sidebar",
          collapsed && "collapsed",
          mobileOpen && "mobile-open"
        )}
        aria-label="Admin navigation"
      >
        {/* Logo */}
        <div className="admin-sidebar-logo">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--admin-accent)", color: "white" }}
          >
            <span style={{ fontSize: "13px", fontWeight: 700 }}>P</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm truncate" style={{ color: "var(--admin-text)" }}>
                PYP Studio
              </span>
              <span className="text-[11px] truncate" style={{ color: "var(--admin-text-muted)" }}>
                CMS Console
              </span>
            </div>
          )}
          <button
            className="admin-collapse-btn"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            style={{
              marginLeft: collapsed ? "auto" : "auto",
            }}
          >
            <ChevronLeft
              size={16}
              style={{
                transform: collapsed ? "rotate(180deg)" : "none",
                transition: "transform 150ms ease",
              }}
            />
          </button>
        </div>

        {/* Nav */}
        <nav className="admin-sidebar-nav" aria-label="Primary">
          {navGroups.map((group) => (
            <div key={group.label} className="admin-nav-group">
              <div className="admin-nav-group-label">{group.label}</div>
              {group.items.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn("admin-nav-item", active && "active")}
                    title={collapsed ? item.label : undefined}
                    onClick={onMobileClose}
                  >
                    <item.icon size={20} style={{ flexShrink: 0 }} aria-hidden="true" />
                    <span className="label">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer: View live site */}
        <div className="admin-sidebar-footer">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-nav-item"
            title="View live site"
          >
            <ExternalLink size={18} style={{ flexShrink: 0 }} aria-hidden="true" />
            <span className="label">View live site ↗</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

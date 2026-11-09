"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, Search, Sun, Moon, ChevronRight, LogOut, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const routeLabels: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/projects": "Projects",
  "/admin/projects/new": "New Project",
  "/admin/showreel": "Showreel",
  "/admin/categories": "Categories",
  "/admin/services": "Services",
  "/admin/testimonials": "Testimonials",
  "/admin/inquiries": "Inquiries",
  "/admin/settings": "Site Settings",
};

interface HeaderProps {
  onMobileMenuOpen: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
  userEmail?: string;
  collapsed: boolean;
}

export function Header({
  onMobileMenuOpen,
  darkMode,
  onToggleDark,
  userEmail,
  collapsed,
}: HeaderProps) {
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  const currentLabel = routeLabels[pathname] ?? "Admin";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch {}
    document.cookie = "vareno_admin_demo=; path=/; max-age=0";
    toast.success("Signed out successfully");
    router.push("/admin/login");
    router.refresh();
  };

  const initials = userEmail
    ? userEmail.slice(0, 2).toUpperCase()
    : "VA";

  return (
    <header
      className="admin-header"
      style={{
        left: collapsed
          ? "var(--admin-sidebar-collapsed)"
          : "var(--admin-sidebar-width)",
      }}
    >
      {/* Mobile hamburger */}
      <button
        className="admin-btn admin-btn-ghost admin-btn-icon md:hidden"
        onClick={onMobileMenuOpen}
        aria-label="Open navigation menu"
      >
        <Menu size={20} />
      </button>

      {/* Breadcrumbs */}
      <nav
        className="hidden md:flex items-center gap-1.5 flex-1 min-w-0"
        aria-label="Breadcrumb"
      >
        <Link
          href="/admin"
          style={{ fontSize: "13px", color: "var(--admin-text-muted)", textDecoration: "none" }}
          className="hover:text-[var(--admin-text)] transition-colors"
        >
          Admin
        </Link>
        {pathname !== "/admin" && (
          <>
            <ChevronRight size={14} style={{ color: "var(--admin-text-muted)", flexShrink: 0 }} />
            <span style={{ fontSize: "13px", color: "var(--admin-text)", fontWeight: 500 }}>
              {currentLabel}
            </span>
          </>
        )}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Search */}
        <div className="admin-search hidden lg:flex" style={{ width: 240 }}>
          <Search size={15} className="search-icon" />
          <input
            className="admin-input"
            style={{ paddingLeft: 34, height: 36, fontSize: 13 }}
            placeholder="Search…"
            aria-label="Global search"
          />
        </div>

        {/* Theme toggle */}
        <button
          className="admin-btn admin-btn-ghost admin-btn-icon"
          onClick={onToggleDark}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={darkMode ? "Light mode" : "Dark mode"}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User menu */}
        <div ref={menuRef} style={{ position: "relative" }}>
          <button
            className="flex items-center gap-2 admin-btn admin-btn-ghost"
            style={{ padding: "5px 8px" }}
            onClick={() => setUserMenuOpen((v) => !v)}
            aria-label="User menu"
            aria-expanded={userMenuOpen}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white flex-shrink-0"
              style={{ background: "var(--admin-accent)", fontSize: "11px", fontWeight: 600 }}
            >
              {initials}
            </div>
            <span
              className="hidden lg:block"
              style={{ fontSize: "13px", color: "var(--admin-text-muted)", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
            >
              {userEmail ?? "Admin"}
            </span>
          </button>

          {userMenuOpen && (
            <div
              className="admin-card"
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                width: 220,
                zIndex: 50,
                padding: "4px",
                boxShadow: "var(--admin-shadow-lg)",
              }}
            >
              <div
                className="px-3 py-2 mb-1"
                style={{ borderBottom: "1px solid var(--admin-border)" }}
              >
                <p style={{ fontSize: "12px", color: "var(--admin-text-muted)" }}>Signed in as</p>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--admin-text)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {userEmail ?? "admin@vareno.co"}
                </p>
              </div>
              <button
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg hover:bg-[var(--admin-surface-raised)] transition-colors"
                style={{ fontSize: "14px", color: "var(--admin-text)", border: "none", background: "none", cursor: "pointer", textAlign: "left" }}
              >
                <User size={15} style={{ color: "var(--admin-text-muted)" }} />
                Account settings
              </button>
              <button
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg hover:bg-[var(--admin-danger-bg)] transition-colors"
                style={{ fontSize: "14px", color: "var(--admin-danger)", border: "none", background: "none", cursor: "pointer", textAlign: "left" }}
                onClick={handleLogout}
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/layout/Sidebar";
import { Header } from "@/components/admin/layout/Header";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

interface AdminShellProps {
  children: React.ReactNode;
  userEmail?: string;
}

export function AdminShell({ children, userEmail }: AdminShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Persist preferences
  useEffect(() => {
    const savedCollapsed = localStorage.getItem("admin-sidebar-collapsed");
    const savedDark = localStorage.getItem("admin-dark-mode");
    if (savedCollapsed) setCollapsed(savedCollapsed === "true");
    if (savedDark) setDarkMode(savedDark === "true");
  }, []);

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("admin-sidebar-collapsed", String(next));
  };

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("admin-dark-mode", String(next));
  };

  if (pathname === "/admin/login") {
    return (
      <div className="admin-root" data-theme={darkMode ? "dark" : "light"}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--admin-surface)",
              color: "var(--admin-text)",
              border: "1px solid var(--admin-border)",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
            },
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="admin-root"
      data-theme={darkMode ? "dark" : "light"}
    >
      <Sidebar
        collapsed={collapsed}
        onToggle={toggleCollapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <Header
        onMobileMenuOpen={() => setMobileOpen(true)}
        darkMode={darkMode}
        onToggleDark={toggleDark}
        userEmail={userEmail}
        collapsed={collapsed}
      />

      <main
        className={cn("admin-main", collapsed && "sidebar-collapsed")}
        id="main-content"
      >
        <div className="admin-content">{children}</div>
      </main>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--admin-surface)",
            color: "var(--admin-text)",
            border: "1px solid var(--admin-border)",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
          },
        }}
      />
    </div>
  );
}

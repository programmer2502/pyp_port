"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname() || "";

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [drawerOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [drawerOpen]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="site-header">
        <div className="container container--wide">
          <nav className="nav" aria-label="Primary">
            <Link className="brand" href="/" aria-label="PYP Studio">
              <img
                src="/assets/img/pyp-logo-trans.png"
                alt="PYP"
                className="brand-logo"
                style={{
                  height: "30px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Link>
            <div className="nav-links" role="navigation">
              <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
                Index
              </Link>
              <Link href="/work" aria-current={pathname.startsWith("/work") ? "page" : undefined}>
                Work
              </Link>
              <Link
                href="/studio"
                aria-current={
                  pathname.startsWith("/studio") || pathname.startsWith("/about")
                    ? "page"
                    : undefined
                }
              >
                Studio
              </Link>
              <Link
                href="/services"
                aria-current={pathname.startsWith("/services") ? "page" : undefined}
              >
                Services
              </Link>
              <Link
                href="/contact"
                aria-current={pathname.startsWith("/contact") ? "page" : undefined}
              >
                Contact
              </Link>
            </div>
            <div className="nav-cta-row">
              <Link href="/contact" className="btn btn--primary btn--sm">
                Start a project
                <svg
                  className="arrow"
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <button
                className="nav-toggle"
                aria-label="Open menu"
                aria-expanded={drawerOpen}
                aria-controls="mobile-drawer"
                onClick={() => setDrawerOpen(true)}
              >
                <span aria-hidden="true"></span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div
        className={`mobile-drawer ${drawerOpen ? "open" : ""}`}
        id="mobile-drawer"
        aria-hidden={!drawerOpen}
      >
        <button
          className="drawer-close"
          aria-label="Close menu"
          onClick={() => setDrawerOpen(false)}
        >
          Close
        </button>
        <Link href="/" onClick={() => setDrawerOpen(false)}>
          Index
        </Link>
        <Link href="/work" onClick={() => setDrawerOpen(false)}>
          Work
        </Link>
        <Link href="/studio" onClick={() => setDrawerOpen(false)}>
          Studio
        </Link>
        <Link href="/services" onClick={() => setDrawerOpen(false)}>
          Services
        </Link>
        <Link href="/contact" onClick={() => setDrawerOpen(false)}>
          Contact
        </Link>
      </div>
    </>
  );
}

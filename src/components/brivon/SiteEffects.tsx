"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll reveal observer (respects prefers-reduced-motion)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && "IntersectionObserver" in window) {
      const els = document.querySelectorAll(".reveal");
      if (els.length) {
        els.forEach(function (el) {
          const htmlEl = el as HTMLElement;
          htmlEl.style.opacity = "0";
          htmlEl.style.transform = "translateY(16px)";
          htmlEl.style.transition =
            "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)";
        });

        const io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                const target = entry.target as HTMLElement;
                target.style.opacity = "1";
                target.style.transform = "translateY(0)";
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
        );

        els.forEach(function (el) {
          io.observe(el);
        });

        return () => io.disconnect();
      }
    }
  }, [pathname]);

  useEffect(() => {
    // Sticky header subtle shadow on scroll
    const header = document.querySelector(".site-header") as HTMLElement | null;
    if (!header) return;

    let last = 0;
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > 4 && last <= 4) {
        header.style.boxShadow = "0 8px 24px -16px rgba(0,0,0,0.6)";
      }
      if (y <= 4 && last > 4) {
        header.style.boxShadow = "none";
      }
      last = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}


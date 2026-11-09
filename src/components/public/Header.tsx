"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-[#09090B]/90 backdrop-blur-md border-b border-white/[0.08] py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-[#09090B]/60 backdrop-blur-sm border-b border-white/[0.05] py-5 lg:py-6"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-2xl lg:text-[26px] font-black tracking-[-0.03em] text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span>PYP</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)] transition-transform duration-300 group-hover:scale-150" />
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400 pl-1 border-l border-white/10 ml-1">
              Studio
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-11">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-medium tracking-[0.08em] uppercase transition-colors relative py-1 ${
                    active ? "text-white font-semibold" : "text-zinc-400 hover:text-amber-400"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.03]"
            >
              <span>Book a shoot</span>
              <ArrowUpRight size={14} className="stroke-[2.5]" />
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#09090B]/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-semibold">
                [ Navigation Index ]
              </span>
              {navLinks.map((link, idx) => {
                const active = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-4xl font-extrabold tracking-tight transition-colors block py-2 ${
                        active ? "text-amber-400" : "text-white hover:text-amber-400"
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col gap-5 pt-8 border-t border-white/10">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-amber-400 text-black py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold shadow-lg shadow-amber-500/20"
              >
                Book a shoot &rarr;
              </Link>
              <div className="flex justify-between items-center text-xs font-mono text-zinc-500">
                <span>NEW YORK &bull; WORLDWIDE</span>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-zinc-300"
                >
                  Admin &rarr;
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

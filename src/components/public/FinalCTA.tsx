"use client";

import Link from "next/link";
import { ArrowUpRight, MessageSquare, Mail, Phone, Calendar } from "lucide-react";
import type { SiteSettings } from "@/types/database";

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

interface FinalCTAProps {
  settings: SiteSettings;
}

export function FinalCTA({ settings }: FinalCTAProps) {
  const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    "Hi PYP Studio, I'm interested in booking a photo/video production!"
  )}`;

  return (
    <section className="w-full py-28 sm:py-36 lg:py-44 px-5 sm:px-8 lg:px-12 bg-[#08080A] text-white relative overflow-hidden">
      {/* Ambient Cinema Warmth Glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-gradient-to-t from-amber-500/10 via-amber-600/5 to-transparent blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1600px] mx-auto flex flex-col items-start justify-between relative z-10">
        {/* Top mono label */}
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
          <span className="font-mono text-xs sm:text-[13px] font-semibold text-amber-400 tracking-[0.2em] uppercase">
            [ INITIATE COMMISSION &bull; 2026 CALENDAR ]
          </span>
          <span className="w-16 h-[1px] bg-white/20" />
        </div>

        {/* Huge Headline */}
        <h2
          className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-[-0.03em] text-white leading-[1.0] max-w-5xl mb-12 sm:mb-16"
          style={{ fontFamily: "var(--font-display)" }}
        >
          LET&apos;S MAKE YOUR STORY{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 italic">
            MOVE.
          </span>
        </h2>

        {/* Direct Action Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-white/10 items-end">
          <div className="md:col-span-7 flex flex-col gap-6">
            <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-xl leading-relaxed">
              Accepting commissions worldwide for the upcoming season. From multi-day destination weddings to automotive brand campaigns and high-fashion editorials.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black px-8 sm:px-10 py-4 sm:py-5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105"
              >
                <span>Book a shoot</span>
                <ArrowUpRight size={16} className="stroke-[2.5]" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-[#25D366] hover:text-white text-white px-6 sm:px-8 py-4 sm:py-5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 border border-white/15 shadow-lg"
              >
                <MessageSquare size={16} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col md:items-end gap-4 font-mono text-xs sm:text-sm text-zinc-300">
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-2.5 hover:text-amber-400 transition-colors"
            >
              <Mail size={16} className="text-amber-400" />
              <span>{settings.email}</span>
            </a>
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-2.5 hover:text-amber-400 transition-colors"
            >
              <Phone size={16} className="text-amber-400" />
              <span>{settings.phone}</span>
            </a>
            <a
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 hover:text-amber-400 transition-colors"
            >
              <InstagramIcon size={16} className="text-amber-400" />
              <span>@pyp_films</span>
            </a>
            <span className="text-zinc-500 pt-2 text-right text-xs">
              {settings.address} &bull; Average response time: under 12 hours
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SiteSettings } from "@/types/database";

interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#060608] text-white border-t border-white/[0.08] pt-20 pb-24 sm:pb-28 px-5 sm:px-8 lg:px-12 relative z-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 pb-16 border-b border-white/[0.08]">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-4xl sm:text-5xl font-black tracking-[-0.04em] text-white hover:text-amber-400 transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span>PYP</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
            </Link>
            <p className="font-mono text-xs text-zinc-400 tracking-widest uppercase mt-4 leading-relaxed">
              {settings.tagline || "Photography & Films that move people."}
            </p>
            <p className="text-xs text-zinc-500 mt-2">
              Commissioning internationally across North America, Europe, Asia, and worldwide destinations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 sm:gap-20 font-mono text-xs sm:text-sm">
            <div className="flex flex-col gap-3.5">
              <span className="text-amber-400 font-bold tracking-widest uppercase text-xs">
                Navigation
              </span>
              <Link href="/work" className="text-zinc-400 hover:text-white transition-colors">
                Work Archive
              </Link>
              <Link href="/services" className="text-zinc-400 hover:text-white transition-colors">
                Services &amp; Pricing
              </Link>
              <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">
                About The Studio
              </Link>
              <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">
                Initiate Inquiry
              </Link>
            </div>

            <div className="flex flex-col gap-3.5">
              <span className="text-amber-400 font-bold tracking-widest uppercase text-xs">
                Channels
              </span>
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Instagram</span>
                <ArrowUpRight size={13} />
              </a>
              <a
                href={settings.vimeo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Vimeo</span>
                <ArrowUpRight size={13} />
              </a>
              <Link
                href="/admin"
                className="text-zinc-500 hover:text-amber-400 transition-colors pt-2 flex items-center gap-1.5"
              >
                <span>CMS Admin</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500 tracking-wider">
          <p>© {currentYear} PYP Studio. All rights reserved.</p>
          <p className="hidden md:inline">Cinema Grade &bull; Editorial Direction</p>
          <p>Coordinates: {settings.coordinates || "40.7128° N, 74.0060° W"}</p>
        </div>
      </div>
    </footer>
  );
}

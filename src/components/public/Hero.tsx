"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Volume2, ArrowDown } from "lucide-react";
import { VideoModal } from "./VideoModal";
import type { Showreel } from "@/types/database";

interface HeroProps {
  showreel: Showreel;
  tagline?: string;
}

export function Hero({ showreel, tagline }: HeroProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative w-full pt-32 sm:pt-36 lg:pt-44 pb-16 sm:pb-24 px-5 sm:px-8 lg:px-12 overflow-hidden bg-[#09090B]">
        {/* Cinema Ambient Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[400px] sm:h-[600px] bg-gradient-to-tr from-amber-500/10 via-amber-600/5 to-transparent blur-[140px] pointer-events-none rounded-full" />
        
        {/* Subtle Film Grain Texture */}
        <div className="film-grain" />

        <div className="max-w-[1500px] mx-auto flex flex-col items-center relative z-10">
          {/* Top Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-6 sm:mb-8 backdrop-blur-md shadow-inner"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="font-mono text-[11px] sm:text-xs font-medium tracking-[0.18em] text-zinc-300 uppercase">
              STUDIO EDITION 2026 &bull; DIRECTORS &amp; STILLS
            </span>
          </motion.div>

          {/* Balanced, Inspiring Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-5xl mb-6 sm:mb-8"
          >
            <h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.035em] text-white leading-[1.02] sm:leading-[0.98]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              STORIES CRAFTED WITH LIGHT &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 italic">
                CINEMATIC
              </span>{" "}
              INTENTION.
            </h1>
          </motion.div>

          {/* Subtitle & Mission */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-zinc-400 font-normal max-w-2xl text-center leading-relaxed mb-10 sm:mb-12"
          >
            {tagline || "Photography & Films that move people."} We produce award-winning visual narratives for luxury destination celebrations, commercial brands, and human-first stories worldwide.
          </motion.p>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-14 sm:mb-18"
          >
            <button
              onClick={() => setModalOpen(true)}
              className="group inline-flex items-center gap-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black px-7 sm:px-9 py-4 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.03]"
            >
              <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={12} fill="currentColor" className="ml-0.5" />
              </div>
              <span>Watch 2026 Showreel</span>
            </button>

            <a
              href="#selected-work"
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-4 rounded-full font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-all duration-300"
            >
              <span>Explore Selected Work</span>
              <ArrowDown size={14} className="text-amber-400" />
            </a>
          </motion.div>

          {/* Cinematic Widescreen Showreel Viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => setModalOpen(true)}
            className="w-full relative group rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_80px_-20px_rgba(0,0,0,0.8)] border border-white/15 bg-[#121316] aspect-[16/9] sm:aspect-[21/9] cursor-pointer"
            data-cursor="PLAY"
          >
            <video
              src={showreel.hero_video_url}
              poster={showreel.poster_url}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-all duration-700 group-hover:scale-[1.02]"
            />

            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

            {/* Top Bar Badges */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between pointer-events-none">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/90 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>4K CINEMA PREVIEW</span>
              </span>

              <span className="font-mono text-[10px] sm:text-xs text-white/70 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                120 FPS &bull; PRORES
              </span>
            </div>

            {/* Center Floating Play Button */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black/70 hover:bg-amber-500 text-white hover:text-black backdrop-blur-xl border border-white/20 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full flex items-center gap-3.5 shadow-2xl transition-all duration-300 group-hover:border-amber-400"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-black/20 flex items-center justify-center">
                  <Play size={16} fill="currentColor" className="ml-0.5" />
                </div>
                <span className="font-mono text-xs sm:text-sm uppercase font-bold tracking-widest">
                  Watch with sound
                </span>
                <Volume2 size={16} className="opacity-80" />
              </motion.div>
            </div>

            {/* Bottom Film Strip Metadata */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between font-mono text-[11px] sm:text-xs text-zinc-400 pointer-events-none">
              <span>{showreel.title}</span>
              <span className="hidden sm:inline">NYC &bull; PARIS &bull; TOKYO &bull; CAPE TOWN</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal with sound */}
      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        videoUrl={showreel.modal_video_url}
        title={showreel.title}
      />
    </>
  );
}

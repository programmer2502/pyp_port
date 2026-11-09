"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { ProjectMedia } from "@/types/database";

interface ProjectLightboxProps {
  media: ProjectMedia[];
}

export function ProjectLightbox({ media }: ProjectLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const imagesOnly = media.filter((m) => m.type === "image");

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => ((prev ?? 0) + 1) % imagesOnly.length);
  }, [selectedIndex, imagesOnly.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => ((prev ?? 0) - 1 + imagesOnly.length) % imagesOnly.length);
  }, [selectedIndex, imagesOnly.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, handleNext, handlePrev]);

  if (imagesOnly.length === 0) return null;

  return (
    <>
      {/* Editorial Gallery Layout (Full-width, two-up, three-up rhythm) */}
      <div className="w-full flex flex-col gap-6 sm:gap-10">
        {imagesOnly.map((item, idx) => {
          const isFull = idx === 0 || idx % 3 === 0;

          return (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="relative group cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl bg-[#121316] border border-white/10"
              data-cursor="VIEW"
            >
              <div
                className={`relative w-full ${isFull
                  ? "aspect-[16/10] sm:aspect-[21/10]"
                  : "aspect-[4/3] sm:aspect-[16/11]"
                  }`}
              >
                <Image
                  src={item.url}
                  alt={item.alt_text || `Project photograph ${idx + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1600px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hover overlay with zoom hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg">
                    <Maximize2 size={18} />
                  </div>
                </div>

                {/* Caption tag */}
                {item.caption && (
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 font-mono text-[11px] text-white/90">
                    {item.caption}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between z-10">
              <span className="font-mono text-xs text-white/70 uppercase tracking-widest">
                FRAME {selectedIndex + 1} OF {imagesOnly.length}
              </span>

              <button
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors"
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Center Image Viewport */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <div className="relative w-full h-full max-w-6xl max-h-[82vh]">
                <Image
                  src={imagesOnly[selectedIndex].url}
                  alt={imagesOnly[selectedIndex].alt_text || "Project image"}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Prev/Next arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption & Film Info */}
            <div className="w-full text-center font-mono text-xs text-zinc-400">
              {imagesOnly[selectedIndex].caption || "Master Stills &bull; Shot on Leica Summicron-C / Hasselblad"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import type { Testimonial } from "@/types/database";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="w-full py-28 sm:py-36 lg:py-44 px-5 sm:px-8 lg:px-12 bg-[#0A0B0E] border-b border-white/[0.08] relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Header with Nav Controls */}
        <div className="flex items-center justify-between mb-14 sm:mb-20">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-amber-400 tracking-[0.2em] uppercase">
              [ 03 &bull; CLIENT ENDORSEMENTS ]
            </span>
            <span className="w-12 h-[1px] bg-white/20" />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-white/15 bg-white/[0.03] hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-200 flex items-center justify-center text-zinc-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-white/15 bg-white/[0.03] hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-200 flex items-center justify-center text-zinc-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Card Box */}
        <div className="relative min-h-[300px] flex items-center bg-[#121318] p-8 sm:p-14 lg:p-16 rounded-3xl border border-white/[0.08] shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {/* Star Rating & Quote Icon */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-1.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <div className="text-amber-400/40">
                  <Quote size={32} />
                </div>
              </div>

              {/* Quote Text */}
              <p
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-relaxed mb-10 max-w-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;{current.quote}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                {current.client_avatar ? (
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400/60 shadow-lg">
                    <Image
                      src={current.client_avatar}
                      alt={current.client_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center font-bold text-amber-400 text-lg">
                    {current.client_name.slice(0, 1)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-lg text-white tracking-tight">
                    {current.client_name}
                  </h4>
                  <p className="font-mono text-xs text-zinc-400 tracking-wider uppercase font-medium mt-0.5">
                    {current.project_name}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-2.5 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-amber-400" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

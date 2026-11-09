"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import type { Service } from "@/types/database";

interface ServicesPreviewProps {
  services: Service[];
}

export function ServicesPreview({ services }: ServicesPreviewProps) {
  const [activeId, setActiveId] = useState<string | null>(services[0]?.id || null);

  return (
    <section className="w-full py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 bg-[#0C0D10] border-b border-white/[0.08] relative">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs font-semibold text-amber-400 tracking-[0.2em] uppercase">
                [ 02 &bull; DISCIPLINES &amp; CRAFT ]
              </span>
              <span className="w-12 h-[1px] bg-white/20" />
            </div>
            <h2
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WHAT WE CRAFT.
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-300 hover:text-amber-400 transition-colors border-b border-zinc-600 hover:border-amber-400 pb-1 w-fit font-semibold"
          >
            <span>View packages &amp; pricing</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Expanding Rows List */}
        <div className="border-t border-white/[0.08]">
          {services.map((service, index) => {
            const isExpanded = activeId === service.id;
            const num = String(index + 1).padStart(2, "0");

            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveId(service.id)}
                onClick={() => setActiveId(isExpanded ? null : service.id)}
                className={`group border-b border-white/[0.08] transition-colors cursor-pointer ${
                  isExpanded ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                }`}
              >
                <div className="py-7 sm:py-9 px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="font-mono text-sm text-amber-400 font-bold tracking-widest">
                      {num}
                    </span>
                    <h3
                      className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight transition-colors ${
                        isExpanded ? "text-amber-400" : "text-white group-hover:text-amber-300"
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {service.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden md:inline font-mono text-xs text-zinc-400 uppercase tracking-wider font-medium">
                      {isExpanded ? "Active Service" : "Click to view details"}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${
                        isExpanded
                          ? "bg-amber-400 text-black rotate-45 border-amber-400"
                          : "group-hover:border-white text-zinc-300"
                      }`}
                    >
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>

                {/* Expanded content: description + deliverables + sample image */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden pb-8 sm:pb-12 px-4 sm:px-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#15161B] p-6 sm:p-10 rounded-2xl border border-white/10 shadow-2xl">
                        {/* Description & deliverables */}
                        <div className="md:col-span-7 flex flex-col justify-between">
                          <div>
                            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-6 font-normal">
                              {service.full_desc || service.short_desc}
                            </p>

                            {service.packages && service.packages.length > 0 && service.packages[0].deliverables && (
                              <div className="mb-8">
                                <span className="font-mono text-xs text-amber-400 uppercase tracking-wider block mb-3 font-semibold">
                                  Standard Deliverables Included:
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                  {service.packages[0].deliverables.slice(0, 4).map((item: string, dIdx: number) => (
                                    <div
                                      key={dIdx}
                                      className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300"
                                    >
                                      <Check size={14} className="text-amber-400 shrink-0" />
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className="font-mono text-xs text-zinc-400">
                              Estimated Delivery: 2-4 Weeks
                            </span>
                            <Link
                              href="/services"
                              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-white transition-colors"
                            >
                              <span>Explore Full Package</span>
                              <ArrowUpRight size={14} />
                            </Link>
                          </div>
                        </div>

                        {/* Sample Imagery Preview */}
                        <div className="md:col-span-5 relative aspect-[16/10] rounded-xl overflow-hidden bg-black border border-white/10 shadow-lg">
                          {service.sample_image ? (
                            <Image
                              src={service.sample_image}
                              alt={service.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 40vw"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-zinc-500">
                              Preview Gallery
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                          <div className="absolute bottom-3 left-3">
                            <span className="font-mono text-[10px] text-white/90 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                              Visual Sample
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

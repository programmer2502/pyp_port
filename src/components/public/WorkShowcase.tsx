"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, Camera, Film, Layers } from "lucide-react";
import type { Project, Category, ProjectType } from "@/types/database";

interface WorkShowcaseProps {
  initialProjects: Project[];
  categories: Category[];
}

export function WorkShowcase({ initialProjects, categories }: WorkShowcaseProps) {
  const [selectedType, setSelectedType] = useState<"all" | ProjectType>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // Filter by type
      if (selectedType !== "all") {
        if (selectedType === "photo" && project.type === "video") return false;
        if (selectedType === "video" && project.type === "photo") return false;
      }
      // Filter by category
      if (selectedCategory !== "all") {
        if (project.category_id !== selectedCategory) return false;
      }
      return true;
    });
  }, [initialProjects, selectedType, selectedCategory]);

  return (
    <div className="w-full">
      {/* Filter Toolbar */}
      <div className="flex flex-col gap-6 pb-10 border-b border-white/[0.08]">
        {/* Type Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setSelectedType("all")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
              selectedType === "all"
                ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20"
                : "bg-white/[0.04] text-zinc-300 border border-white/10 hover:border-white/30"
            }`}
          >
            <Layers size={13} />
            <span>All Formats</span>
          </button>
          <button
            onClick={() => setSelectedType("photo")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
              selectedType === "photo"
                ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20"
                : "bg-white/[0.04] text-zinc-300 border border-white/10 hover:border-white/30"
            }`}
          >
            <Camera size={13} />
            <span>Photography</span>
          </button>
          <button
            onClick={() => setSelectedType("video")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
              selectedType === "video"
                ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20"
                : "bg-white/[0.04] text-zinc-300 border border-white/10 hover:border-white/30"
            }`}
          >
            <Film size={13} />
            <span>Videography &amp; Films</span>
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-1.5 rounded-full font-mono text-xs transition-colors ${
              selectedCategory === "all"
                ? "bg-white/15 text-white font-bold border border-white/20 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            All Categories ({initialProjects.length})
          </button>
          {categories.map((cat) => {
            const count = initialProjects.filter((p) => p.category_id === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full font-mono text-xs transition-colors ${
                  isSelected
                    ? "bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40 shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry Column Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-12"
      >
        <AnimatePresence>
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col"
            >
              <MasonryCard project={project} index={idx} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State if filter yields no projects */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-24 bg-[#111216] rounded-2xl border border-white/10 mt-8">
          <p className="font-mono text-sm text-zinc-400 uppercase tracking-widest font-medium">
            No projects matched the selected filters.
          </p>
          <button
            onClick={() => {
              setSelectedType("all");
              setSelectedCategory("all");
            }}
            className="mt-4 inline-flex items-center gap-2 bg-amber-400 text-black px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold shadow-lg shadow-amber-400/20"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

function MasonryCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const numStr = `No. ${String(index + 1).padStart(2, "0")}`;

  const hasVideo = Boolean((project.type === "video" || project.type === "both") && project.video_url);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const aspectClass =
    index % 3 === 0
      ? "aspect-[4/5]"
      : index % 3 === 1
      ? "aspect-[16/11]"
      : "aspect-[1/1]";

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block w-full text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor={hasVideo ? "PLAY" : "VIEW"}
    >
      <div
        className={`relative ${aspectClass} overflow-hidden rounded-2xl bg-[#121316] border border-white/[0.08] hover:border-amber-400/40 transition-all duration-500 shadow-xl`}
      >
        <Image
          src={project.cover_image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Hover looping video preview */}
        {hasVideo && (
          <video
            ref={videoRef}
            src={project.video_url || undefined}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <span className="font-mono text-[10px] sm:text-xs font-semibold text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
            {project.category_name || "COMMISSION"}
          </span>

          <div className="flex items-center gap-2">
            {hasVideo && (
              <span className="bg-amber-400 text-black font-mono text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                <Play size={10} fill="currentColor" />
                <span>FILM</span>
              </span>
            )}
            <span className="font-mono text-xs font-semibold text-zinc-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
              {numStr}
            </span>
          </div>
        </div>

        {/* Bottom Title & Details */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between pointer-events-none z-10">
          <div>
            <h3
              className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-amber-400 transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.title}
            </h3>
            <p className="font-mono text-xs text-zinc-400 uppercase tracking-wider mt-1 flex items-center gap-2">
              <span>{project.client}</span>
              <span>&bull;</span>
              <span>{project.location}</span>
              <span>&bull;</span>
              <span>{project.year}</span>
            </p>
          </div>

          <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 transition-all duration-300">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}

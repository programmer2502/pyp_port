"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play, Film } from "lucide-react";
import type { Project } from "@/types/database";

interface SelectedWorkProps {
  projects: Project[];
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  // Show 6 featured projects
  const displayProjects = projects.slice(0, 6);

  return (
    <section id="selected-work" className="w-full py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 bg-[#09090B] border-b border-white/[0.08] relative">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs font-semibold text-amber-400 tracking-[0.2em] uppercase">
                [ 01 &bull; CURATED ARCHIVE ]
              </span>
              <span className="w-12 h-[1px] bg-white/20" />
            </div>
            <h2
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SELECTED WORK.
            </h2>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-300 hover:text-amber-400 transition-colors border-b border-zinc-600 hover:border-amber-400 pb-1 w-fit font-semibold"
          >
            <span>View complete portfolio</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Asymmetric 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {displayProjects.map((project, idx) => {
            let colSpan = "md:col-span-6";
            if (idx === 0) colSpan = "md:col-span-7";
            else if (idx === 1) colSpan = "md:col-span-5";
            else if (idx === 2) colSpan = "md:col-span-5";
            else if (idx === 3) colSpan = "md:col-span-7";

            const numberStr = `No. 0${idx + 1}`;

            return (
              <div key={project.id} className={`${colSpan} flex flex-col`}>
                <WorkCard project={project} numberStr={numberStr} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA with clean isolated spacing to avoid any overlapping */}
        <div className="mt-20 sm:mt-28 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-3 bg-white/[0.05] hover:bg-amber-400 text-white hover:text-black border border-white/15 hover:border-amber-400 px-9 py-4 sm:py-5 rounded-full font-mono text-xs sm:text-sm uppercase tracking-widest font-bold transition-all duration-300 shadow-xl hover:scale-105"
          >
            <span>Explore All Projects ({projects.length})</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WorkCard({ project, numberStr }: { project: Project; numberStr: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hasVideoPreview = Boolean(
    (project.type === "video" || project.type === "both") && project.video_url
  );

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

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group block w-full bg-[#121316] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-amber-400/40 transition-all duration-500 shadow-xl"
      data-cursor={project.type === "video" ? "PLAY" : "VIEW"}
    >
      {/* Media Canvas */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-black">
        {/* Cover Image */}
        <Image
          src={project.cover_image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            isHovered && hasVideoPreview ? "opacity-0" : "opacity-90 group-hover:opacity-100"
          }`}
          priority={false}
        />

        {/* Video Preview on Hover (if available) */}
        {hasVideoPreview && (
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

        {/* Subtle Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Floating Top Header Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <span className="font-mono text-[11px] font-semibold text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
            {project.category_name || "COMMISSION"}
          </span>

          <div className="flex items-center gap-2">
            {hasVideoPreview && (
              <span className="bg-amber-400 text-black font-mono text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                <Film size={10} />
                <span>FILM</span>
              </span>
            )}
            <span className="font-mono text-xs font-semibold text-zinc-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
              {numberStr}
            </span>
          </div>
        </div>

        {/* Bottom Floating Info Over Media */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between pointer-events-none z-10">
          <div>
            <h3
              className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight group-hover:text-amber-400 transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.title}
            </h3>
            <p className="font-mono text-xs text-zinc-400 uppercase tracking-wider mt-1.5 flex items-center gap-2">
              <span>{project.client}</span>
              <span>&bull;</span>
              <span>{project.location}</span>
              <span>&bull;</span>
              <span className="text-zinc-500">{project.year}</span>
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 transition-all duration-300">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </Link>
  );
}

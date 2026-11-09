import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { ProjectLightbox } from "@/components/public/ProjectLightbox";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProjectBySlug, getProjects, getSiteSettings } from "@/lib/data/api";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found — PYP" };
  }

  return {
    title: `${project.title} — PYP Studio`,
    description: project.seo_description || project.story.slice(0, 160),
    openGraph: {
      title: `${project.title} — PYP Studio`,
      description: project.seo_description || project.story.slice(0, 160),
      images: [{ url: project.cover_image, width: 1600, height: 1067 }],
    },
  };
}

export const revalidate = 60;

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, allProjects, settings] = await Promise.all([
    getProjectBySlug(slug),
    getProjects({ publishedOnly: true }),
    getSiteSettings(),
  ]);

  if (!project) {
    notFound();
  }

  // Calculate Next Project for bottom link
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject =
    allProjects[(currentIndex + 1) % allProjects.length] || allProjects[0];

  const hasVideo = Boolean((project.type === "video" || project.type === "both") && project.video_url);

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between">
      <Header />

      <main className="w-full pt-32 sm:pt-40 pb-24 px-5 sm:px-8 lg:px-12 flex-1">
        <div className="max-w-[1600px] mx-auto">
          {/* Back button */}
          <div className="mb-6 sm:mb-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-amber-400 transition-colors font-semibold"
            >
              <ArrowLeft size={14} />
              <span>Back to Archive</span>
            </Link>
          </div>

          {/* Project Title & Client Heading */}
          <div className="mb-10 sm:mb-14">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs font-semibold text-amber-400 tracking-widest uppercase">
                {project.category_name || "COMMISSION"}
              </span>
              <span className="w-12 h-[1px] bg-white/20" />
              <span className="font-mono text-xs text-zinc-400 tracking-widest uppercase font-medium">
                {project.year}
              </span>
            </div>

            <h1
              className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-[-0.03em] text-white max-w-5xl leading-[0.98]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.title}
            </h1>
          </div>

          {/* Mono Details Specification Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-b border-white/10 font-mono text-xs uppercase tracking-wider mb-12 sm:mb-16">
            <div>
              <p className="text-zinc-500 mb-1 font-medium">CLIENT</p>
              <p className="font-bold text-white">{project.client}</p>
            </div>
            <div>
              <p className="text-zinc-500 mb-1 font-medium">LOCATION</p>
              <p className="font-bold text-white">{project.location}</p>
            </div>
            <div>
              <p className="text-zinc-500 mb-1 font-medium">ROLE</p>
              <p className="font-bold text-white">{project.role}</p>
            </div>
            <div>
              <p className="text-zinc-500 mb-1 font-medium">FORMAT</p>
              <p className="font-bold text-amber-400">
                {project.type === "both"
                  ? "PHOTO & CINEMA"
                  : project.type === "video"
                  ? "CINEMA FILM"
                  : "35MM STILLS"}
              </p>
            </div>
          </div>

          {/* Full-bleed Cover Media */}
          <div className="w-full relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/10 mb-14 sm:mb-20">
            <Image
              src={project.cover_image}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          {/* Narrative Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 sm:mb-24">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs font-bold text-amber-400 tracking-widest uppercase">
                [ THE NARRATIVE ]
              </span>
              <h2
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Behind the lens &amp; creative intention.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-lg sm:text-2xl text-zinc-300 leading-relaxed font-normal">
                {project.story}
              </p>
            </div>
          </div>

          {/* Video Player Section (if project has motion picture) */}
          {hasVideo && project.video_url && (
            <div className="mb-16 sm:mb-24">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs font-bold text-amber-400 tracking-widest uppercase">
                  [ MOTION PICTURE CUT ]
                </span>
                <span className="w-12 h-[1px] bg-white/20" />
              </div>
              <div className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/10">
                <video
                  src={project.video_url}
                  poster={project.poster_image || project.cover_image}
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}

          {/* Editorial Lightbox Photo Gallery */}
          {project.media && project.media.length > 0 && (
            <div className="mb-20 sm:mb-32">
              <div className="flex items-center gap-3 mb-8">
                <span className="font-mono text-xs font-bold text-amber-400 tracking-widest uppercase">
                  [ STILL FRAMES ]
                </span>
                <span className="w-12 h-[1px] bg-white/20" />
              </div>
              <ProjectLightbox media={project.media} />
            </div>
          )}

          {/* Next Project Footer Callout */}
          {nextProject && (
            <div className="border-t border-white/10 pt-12 sm:pt-16">
              <span className="font-mono text-xs text-amber-400 uppercase tracking-widest block mb-4 font-semibold">
                Next Project
              </span>
              <Link
                href={`/work/${nextProject.slug}`}
                className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-4"
              >
                <h3
                  className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {nextProject.title} →
                </h3>
                <span className="font-mono text-xs text-zinc-400 tracking-wider uppercase font-medium">
                  {nextProject.client} ({nextProject.year})
                </span>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}

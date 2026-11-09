"use client";

import { useState, useEffect } from "react";
import { Film, Save, Play, ExternalLink, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { FormSection, Field } from "@/components/admin/ui/FormSection";
import { toast } from "sonner";
import type { Showreel } from "@/types/database";
import { getShowreel, updateShowreel } from "@/lib/data/api";

export default function AdminShowreelPage() {
  const [showreel, setShowreel] = useState<Showreel | null>(null);
  const [saving, setSaving] = useState(false);

  const [heroVideoUrl, setHeroVideoUrl] = useState("");
  const [modalVideoUrl, setModalVideoUrl] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");

  useEffect(() => {
    getShowreel().then((data) => {
      setShowreel(data);
      setHeroVideoUrl(data.hero_video_url);
      setModalVideoUrl(data.modal_video_url);
      setPosterUrl(data.poster_url);
      setTitle(data.title);
      setTagline(data.tagline);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateShowreel({
        hero_video_url: heroVideoUrl,
        modal_video_url: modalVideoUrl,
        poster_url: posterUrl,
        title,
        tagline,
      });
      toast.success("Showreel updated successfully!");
    } catch {
      toast.error("Failed to update showreel.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Showreel Configuration"
        description="Set the hero looping background film and full cinema modal playback."
        icon={Film}
        actions={
          <button
            onClick={handleSave}
            disabled={saving}
            className="admin-btn admin-btn-primary"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <FormSection
            title="Video Sources"
            description="Hero autoplay loop preview and interactive full-audio modal stream"
          >
            <Field
              label="Hero Loop MP4 Video URL"
              required
              helper="Lightweight muted looping video (under 50 MB) displayed in the hero section"
            >
              <input
                type="url"
                value={heroVideoUrl}
                onChange={(e) => setHeroVideoUrl(e.target.value)}
                placeholder="https://.../preview.mp4"
                className="admin-input font-mono text-xs"
              />
            </Field>

            <Field
              label="Full Modal Showreel URL"
              required
              helper="YouTube, Vimeo, or MP4 link played with full stereo/surround audio when user clicks Watch Showreel"
            >
              <input
                type="url"
                value={modalVideoUrl}
                onChange={(e) => setModalVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                className="admin-input font-mono text-xs"
              />
            </Field>

            <Field
              label="Video Poster Frame URL"
              required
              helper="High-resolution poster image loaded before video begins playing"
            >
              <input
                type="url"
                value={posterUrl}
                onChange={(e) => setPosterUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="admin-input font-mono text-xs"
              />
            </Field>
          </FormSection>

          <FormSection
            title="Display Titles"
            description="Overlay labels rendered across the showreel preview"
          >
            <Field label="Showreel Title">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="PYP Showreel 2026"
                className="admin-input"
              />
            </Field>

            <Field label="Showreel Subtitle / Tagline">
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Moving images, quiet stills, and stories built to endure."
                className="admin-input"
              />
            </Field>
          </FormSection>
        </div>

        {/* Live Video Preview Frame */}
        <div className="lg:col-span-5 flex flex-col gap-4 sticky top-20">
          <div className="admin-card p-5">
            <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--admin-text)" }}>
              Hero Video Preview
            </h3>
            <p className="text-xs mb-4" style={{ color: "var(--admin-text-muted)" }}>
              How the looping video renders inside the rounded hero frame
            </p>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black border border-[#D9D5CB] shadow-md">
              {heroVideoUrl ? (
                <video
                  src={heroVideoUrl}
                  poster={posterUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/40 font-mono text-xs">
                  No video URL specified
                </div>
              )}

              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-white font-mono text-[10px] uppercase">
                {title || "Showreel Preview"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


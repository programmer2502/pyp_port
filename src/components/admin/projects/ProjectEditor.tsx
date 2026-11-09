"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Upload,
  Trash2,
  Star,
  ExternalLink,
  GripVertical,
  Play,
  Film,
  Camera,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { FormSection, Field } from "@/components/admin/ui/FormSection";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { toast } from "sonner";
import type { Project, ProjectMedia, Category, ProjectType } from "@/types/database";
import { saveProject } from "@/lib/data/api";

interface ProjectEditorProps {
  initialProject?: Project | null;
  categories: Category[];
}

export function ProjectEditor({ initialProject, categories }: ProjectEditorProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState(initialProject?.title || "");
  const [slug, setSlug] = useState(initialProject?.slug || "");
  const [client, setClient] = useState(initialProject?.client || "");
  const [categoryId, setCategoryId] = useState(
    initialProject?.category_id || categories[0]?.id || ""
  );
  const [type, setType] = useState<ProjectType>(initialProject?.type || "both");
  const [year, setYear] = useState<number>(initialProject?.year || new Date().getFullYear());
  const [location, setLocation] = useState(initialProject?.location || "");
  const [role, setRole] = useState(initialProject?.role || "Director & Cinematographer");
  const [story, setStory] = useState(initialProject?.story || "");
  const [coverImage, setCoverImage] = useState(
    initialProject?.cover_image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&q=85"
  );
  const [videoUrl, setVideoUrl] = useState(initialProject?.video_url || "");
  const [videoType, setVideoType] = useState<"embed" | "upload">(
    initialProject?.video_type || "upload"
  );
  const [posterImage, setPosterImage] = useState(initialProject?.poster_image || "");
  const [featured, setFeatured] = useState(initialProject?.featured ?? false);
  const [published, setPublished] = useState(initialProject?.published ?? true);
  const [seoTitle, setSeoTitle] = useState(initialProject?.seo_title || "");
  const [seoDescription, setSeoDescription] = useState(initialProject?.seo_description || "");

  const [mediaList, setMediaList] = useState<ProjectMedia[]>(
    initialProject?.media || [
      {
        id: "m-init-1",
        project_id: initialProject?.id || "",
        type: "image",
        url: coverImage,
        caption: "Main establishing portrait",
        alt_text: "Editorial portrait",
        width: 1600,
        height: 2000,
        size_bytes: 1450000,
        sort_order: 1,
        is_cover: true,
      },
    ]
  );

  // Generate slug automatically from title if new project
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialProject) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  // Client-side image resize helper (max width 2400px, quality 0.85)
  const processImageFile = async (file: File): Promise<{ url: string; width: number; height: number; size: number }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const maxWidth = 2400;
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          const resizedUrl = canvas.toDataURL("image/jpeg", 0.85);
          resolve({
            url: resizedUrl,
            width,
            height,
            size: Math.round((resizedUrl.length * 3) / 4),
          });
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`File ${file.name} exceeds 10 MB limit.`);
        continue;
      }

      toast.info(`Optimizing ${file.name}...`);
      const { url, width, height, size } = await processImageFile(file);

      const newMedia: ProjectMedia = {
        id: `media-${Date.now()}-${i}`,
        project_id: initialProject?.id || "",
        type: "image",
        url,
        caption: file.name.replace(/\.[^/.]+$/, ""),
        alt_text: title ? `${title} photo frame` : "Project photo",
        width,
        height,
        size_bytes: size,
        sort_order: mediaList.length + 1,
        is_cover: mediaList.length === 0,
      };

      setMediaList((prev) => [...prev, newMedia]);
      if (mediaList.length === 0 || !coverImage) {
        setCoverImage(url);
      }
    }

    toast.success("Files processed and added to gallery");
  };

  const handleSetCover = (item: ProjectMedia) => {
    setCoverImage(item.url);
    setMediaList((prev) =>
      prev.map((m) => ({
        ...m,
        is_cover: m.id === item.id,
      }))
    );
    toast.success("Cover image set");
  };

  const handleDeleteMedia = (id: string) => {
    setMediaList((prev) => prev.filter((m) => m.id !== id));
    toast.success("Item removed from gallery");
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please enter a project title.");
      return;
    }
    if (!slug.trim()) {
      toast.error("Please enter a valid URL slug.");
      return;
    }

    setSaving(true);
    try {
      const result = await saveProject(
        {
          id: initialProject?.id,
          title,
          slug,
          client,
          category_id: categoryId,
          type,
          year: Number(year),
          location,
          role,
          story,
          cover_image: coverImage,
          video_url: videoUrl || null,
          video_type: videoType,
          poster_image: posterImage || null,
          featured,
          published,
          seo_title: seoTitle || null,
          seo_description: seoDescription || null,
        },
        mediaList
      );

      if (result.success) {
        toast.success("Project saved successfully!");
        router.push("/admin/projects");
        router.refresh();
      }
    } catch {
      toast.error("Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  const selectedCategoryName = categories.find((c) => c.id === categoryId)?.name || "General";

  return (
    <>
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#D9D5CB]">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projects"
            className="admin-btn admin-btn-ghost admin-btn-icon"
            aria-label="Back to projects"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--admin-text)" }}>
              {initialProject ? `Edit: ${initialProject.title}` : "New Project Commission"}
            </h1>
            <p className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
              URL: /work/{slug || "new-project"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/projects" className="admin-btn admin-btn-secondary">
            Cancel
          </Link>
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
                <span>Save Project</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Form (Left 8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* General Metadata */}
          <FormSection title="Core Information" description="Headline, client, and taxonomy details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Project Title" required>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. SOLITUDE IN MONACO"
                  className="admin-input"
                />
              </Field>

              <Field label="URL Slug" required helper="Unique slug for /work/[slug]">
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="solitude-in-monaco"
                  className="admin-input font-mono text-xs"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Client / Publication">
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="Vogue International"
                  className="admin-input"
                />
              </Field>

              <Field label="Category" required>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="admin-input"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Format / Medium">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as ProjectType)}
                  className="admin-input"
                >
                  <option value="both">Photography &amp; Cinema Film</option>
                  <option value="photo">Photography Only</option>
                  <option value="video">Cinema Film Only</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Year">
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="admin-input font-mono"
                />
              </Field>

              <Field label="Location">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Monte Carlo, Monaco"
                  className="admin-input"
                />
              </Field>

              <Field label="Production Role">
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Direction & Cinematography"
                  className="admin-input"
                />
              </Field>
            </div>

            <Field label="Editorial Narrative Story" helper="Detailed creative context shown on the project case study">
              <textarea
                rows={4}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Shot on Kodak Vision3 500T on the sun-bleached cliffs of Monte Carlo..."
                className="admin-input text-sm leading-relaxed"
              />
            </Field>
          </FormSection>

          {/* Video Integration */}
          {(type === "video" || type === "both") && (
            <FormSection
              title="Motion Picture &amp; Video Cut"
              description="Configure short looping preview mp4 or full cinema links"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Video Type">
                  <select
                    value={videoType}
                    onChange={(e) => setVideoType(e.target.value as "embed" | "upload")}
                    className="admin-input"
                  >
                    <option value="upload">Direct MP4 URL (Loop &amp; Preview)</option>
                    <option value="embed">YouTube / Vimeo Link (Full Film)</option>
                  </select>
                </Field>

                <Field label="Video URL" helper="Supports mp4 up to 50MB, or YouTube/Vimeo URLs">
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://...mp4 or https://youtube.com/watch?v=..."
                    className="admin-input font-mono text-xs"
                  />
                </Field>
              </div>

              <Field label="Custom Video Poster Image" helper="Displayed before playback begins">
                <input
                  type="url"
                  value={posterImage}
                  onChange={(e) => setPosterImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="admin-input font-mono text-xs"
                />
              </Field>
            </FormSection>
          )}

          {/* Gallery Media Upload & Management */}
          <FormSection
            title="Gallery &amp; Still Frames"
            description="Drag-and-drop photos. Only JPG/PNG/WebP up to 10 MB (auto-resized to 2400px)."
          >
            {/* Upload Dropzone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:border-[#4F46E5] hover:bg-[#4F46E5]/5 transition-colors"
              style={{ borderColor: "var(--admin-border)" }}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Upload size={28} className="mx-auto mb-3" style={{ color: "var(--admin-accent)" }} />
              <p className="text-sm font-semibold" style={{ color: "var(--admin-text)" }}>
                Click to upload photos or drag files here
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--admin-text-muted)" }}>
                Supports JPG, PNG, and WebP up to 10 MB per file.
              </p>
            </div>

            {/* Gallery items list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {mediaList.map((item, idx) => (
                <div
                  key={item.id}
                  className="admin-card p-3 flex gap-3 relative rounded-xl border"
                  style={{ borderColor: item.is_cover ? "#4F46E5" : "var(--admin-border)" }}
                >
                  <div
                    className="relative rounded-lg overflow-hidden flex-shrink-0"
                    style={{ width: 88, height: 70, background: "var(--admin-surface-raised)" }}
                  >
                    <img src={item.url} alt="" className="w-full h-full object-cover" />
                    {item.is_cover && (
                      <span className="absolute bottom-1 left-1 bg-[#4F46E5] text-white text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold">
                        Cover
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <input
                        type="text"
                        value={item.caption || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMediaList((prev) =>
                            prev.map((m) => (m.id === item.id ? { ...m, caption: val } : m))
                          );
                        }}
                        placeholder="Caption / Subject"
                        className="admin-input text-xs py-1 px-2 mb-1"
                      />
                      <span className="font-mono text-[10px] block truncate" style={{ color: "var(--admin-text-muted)" }}>
                        {item.width && item.height ? `${item.width}×${item.height}px` : "Image"} •{" "}
                        {item.size_bytes ? `${Math.round(item.size_bytes / 1024)} KB` : ""}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {!item.is_cover ? (
                        <button
                          type="button"
                          onClick={() => handleSetCover(item)}
                          className="text-[11px] font-semibold hover:underline"
                          style={{ color: "var(--admin-accent)" }}
                        >
                          Set as Cover
                        </button>
                      ) : (
                        <span className="text-[11px] font-semibold text-green-600 flex items-center gap-1">
                          <Check size={12} /> Primary Cover
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteMedia(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        aria-label="Delete image"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FormSection>

          {/* SEO & Search Discovery */}
          <FormSection title="Search Engine Optimization (SEO)" description="OpenGraph and crawler meta tags">
            <Field label="Custom SEO Title" helper="Defaults to project title if left blank">
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder={`${title || "Project Title"} — PYP Studio`}
                className="admin-input"
              />
            </Field>

            <Field label="SEO Meta Description">
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Brief summary for Google search snippets and social shares..."
                className="admin-input text-sm"
              />
            </Field>
          </FormSection>
        </div>

        {/* Sidebar Controls & Live Card Preview (Right 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6 sticky top-20">
          {/* Publishing Controls */}
          <div className="admin-card p-5">
            <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--admin-text)" }}>
              Visibility &amp; Publishing
            </h3>

            <div className="flex flex-col gap-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-sm font-medium block" style={{ color: "var(--admin-text)" }}>
                    Published
                  </span>
                  <span className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
                    Visible on live portfolio
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="admin-checkbox"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer border-t pt-4" style={{ borderColor: "var(--admin-border)" }}>
                <div>
                  <span className="text-sm font-medium block" style={{ color: "var(--admin-text)" }}>
                    Featured on Home
                  </span>
                  <span className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
                    Show in top 6 home grid
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="admin-checkbox"
                />
              </label>
            </div>
          </div>

          {/* Live Card Preview */}
          <div className="admin-card p-5">
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--admin-text)" }}>
              Live Portfolio Card Preview
            </h3>
            <p className="text-xs mb-4" style={{ color: "var(--admin-text-muted)" }}>
              How this project renders on the public site
            </p>

            <div className="rounded-xl overflow-hidden bg-[#F3F0E8] p-4 border border-[#D9D5CB]">
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-black mb-3 border border-[#D9D5CB]">
                <img
                  src={coverImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800"}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-[#111111]/80 text-white font-mono text-[9px] px-2 py-0.5 rounded font-bold">
                  No. 01
                </span>
                {type !== "photo" && (
                  <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#FF4B2B] text-white flex items-center justify-center">
                    <Play size={10} fill="currentColor" />
                  </span>
                )}
              </div>
              <h4 className="font-extrabold text-base tracking-tight text-[#111111]">
                {title || "Untitled Project"}
              </h4>
              <p className="font-mono text-[10px] text-[#111111]/60 uppercase mt-0.5">
                {client || "Client Name"} • {location || "Location"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


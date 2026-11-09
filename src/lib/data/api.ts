"use server";

import { createClient } from "@/lib/supabase/server";
import {
  INITIAL_CATEGORIES,
  INITIAL_PROJECTS,
  INITIAL_PROJECT_MEDIA,
  INITIAL_SERVICES,
  INITIAL_TESTIMONIALS,
  INITIAL_STATS,
  INITIAL_SHOWREEL,
  INITIAL_SITE_SETTINGS,
  INITIAL_INQUIRIES,
} from "./mockData";
import type {
  Category,
  Project,
  ProjectMedia,
  Service,
  Testimonial,
  StatItem,
  Inquiry,
  Showreel,
  SiteSettings,
  ProjectType,
  InquiryStatus,
} from "@/types/database";
import { revalidatePath } from "next/cache";

// In-memory persistent cache on globalThis for seamless fallback across RSC and Route Handlers
interface MemoryStore {
  projects: Project[];
  categories: Category[];
  services: Service[];
  testimonials: Testimonial[];
  stats: StatItem[];
  showreel: Showreel;
  siteSettings: SiteSettings;
  inquiries: Inquiry[];
  media: Record<string, ProjectMedia[]>;
}

const g = globalThis as unknown as { __PYP_STORE__?: MemoryStore };
if (!g.__PYP_STORE__) {
  g.__PYP_STORE__ = {
    projects: [...INITIAL_PROJECTS],
    categories: [...INITIAL_CATEGORIES],
    services: [...INITIAL_SERVICES],
    testimonials: [...INITIAL_TESTIMONIALS],
    stats: [...INITIAL_STATS],
    showreel: { ...INITIAL_SHOWREEL },
    siteSettings: { ...INITIAL_SITE_SETTINGS },
    inquiries: [...INITIAL_INQUIRIES],
    media: { ...INITIAL_PROJECT_MEDIA },
  };
}

const getStore = () => g.__PYP_STORE__!;

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && !url.includes("placeholder"));
}

// -------------------------------------------------------------
// CATEGORIES
// -------------------------------------------------------------
export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn("Supabase categories query failed, using fallback:", e);
    }
  }
  return [...getStore().categories].sort((a, b) => a.sort_order - b.sort_order);
}

// -------------------------------------------------------------
// PROJECTS
// -------------------------------------------------------------
export async function getProjects(options?: {
  categorySlug?: string;
  type?: ProjectType | "all";
  featuredOnly?: boolean;
  publishedOnly?: boolean;
}): Promise<Project[]> {
  const publishedOnly = options?.publishedOnly ?? true;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      let query = supabase.from("projects").select("*, categories(name, slug)").order("sort_order", { ascending: true });

      if (publishedOnly) {
        query = query.eq("published", true);
      }
      if (options?.featuredOnly) {
        query = query.eq("featured", true);
      }
      if (options?.type && options.type !== "all") {
        query = query.or(`type.eq.${options.type},type.eq.both`);
      }

      const { data, error } = await query;
      if (!error && data) {
        let projects: Project[] = data.map((p: any) => ({
          ...p,
          category_name: p.categories?.name,
        }));

        if (options?.categorySlug && options.categorySlug !== "all") {
          projects = projects.filter((p: any) => p.categories?.slug === options.categorySlug);
        }
        return projects;
      }
    } catch (e) {
      console.warn("Supabase projects query failed, using fallback:", e);
    }
  }

  // Fallback
  let list = [...getStore().projects];
  if (publishedOnly) {
    list = list.filter((p) => p.published);
  }
  if (options?.featuredOnly) {
    list = list.filter((p) => p.featured);
  }
  if (options?.type && options.type !== "all") {
    list = list.filter((p) => p.type === options.type || p.type === "both");
  }
  if (options?.categorySlug && options.categorySlug !== "all") {
    const cat = getStore().categories.find((c) => c.slug === options.categorySlug);
    if (cat) {
      list = list.filter((p) => p.category_id === cat.id);
    }
  }
  return list.sort((a, b) => a.sort_order - b.sort_order);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("projects")
        .select("*, categories(name, slug), project_media(*)")
        .eq("slug", slug)
        .single();

      if (!error && data) {
        return {
          ...data,
          category_name: data.categories?.name,
          media: (data.project_media || []).sort(
            (a: ProjectMedia, b: ProjectMedia) => a.sort_order - b.sort_order
          ),
        };
      }
    } catch (e) {
      console.warn("Supabase project by slug failed, using fallback:", e);
    }
  }

  const proj = getStore().projects.find((p) => p.slug === slug);
  if (!proj) return null;
  return {
    ...proj,
    media: getStore().media[proj.id] || [],
  };
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("projects")
        .select("*, categories(name, slug), project_media(*)")
        .eq("id", id)
        .single();

      if (!error && data) {
        return {
          ...data,
          category_name: data.categories?.name,
          media: (data.project_media || []).sort(
            (a: ProjectMedia, b: ProjectMedia) => a.sort_order - b.sort_order
          ),
        };
      }
    } catch (e) {
      console.warn("Supabase project by id failed, using fallback:", e);
    }
  }

  const proj = getStore().projects.find((p) => p.id === id);
  if (!proj) return null;
  return {
    ...proj,
    media: getStore().media[proj.id] || [],
  };
}

// -------------------------------------------------------------
// SERVICES
// -------------------------------------------------------------
export async function getServices(): Promise<Service[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn("Supabase services failed, using fallback:", e);
    }
  }
  return [...getStore().services].sort((a, b) => a.sort_order - b.sort_order);
}

// -------------------------------------------------------------
// TESTIMONIALS
// -------------------------------------------------------------
export async function getTestimonials(): Promise<Testimonial[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn("Supabase testimonials failed, using fallback:", e);
    }
  }
  return getStore().testimonials.filter((t) => t.published).sort((a, b) => a.sort_order - b.sort_order);
}

// -------------------------------------------------------------
// STATS
// -------------------------------------------------------------
export async function getStats(): Promise<StatItem[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from("stats").select("*").order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn("Supabase stats failed, using fallback:", e);
    }
  }
  return [...getStore().stats].sort((a, b) => a.sort_order - b.sort_order);
}

// -------------------------------------------------------------
// SHOWREEL
// -------------------------------------------------------------
export async function getShowreel(): Promise<Showreel> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from("showreel").select("*").limit(1).single();
      if (!error && data) return data;
    } catch (e) {
      console.warn("Supabase showreel failed, using fallback:", e);
    }
  }
  return { ...getStore().showreel };
}

// -------------------------------------------------------------
// SITE SETTINGS
// -------------------------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from("site_settings").select("*").limit(1).single();
      if (!error && data) return data;
    } catch (e) {
      console.warn("Supabase site settings failed, using fallback:", e);
    }
  }
  return { ...getStore().siteSettings };
}

// -------------------------------------------------------------
// INQUIRIES
// -------------------------------------------------------------
export async function getInquiries(): Promise<Inquiry[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
      if (!error && data) return data;
    } catch (e) {
      console.warn("Supabase inquiries failed, using fallback:", e);
    }
  }
  return [...getStore().inquiries].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

// -------------------------------------------------------------
// MUTATIONS (Server Actions / API endpoints)
// -------------------------------------------------------------
export async function createInquiry(
  input: Omit<Inquiry, "id" | "created_at" | "status">
): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from("inquiries").insert({
        ...input,
        status: "new",
      });
      if (error) throw error;
      revalidatePath("/admin/inquiries");
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || "Failed to submit inquiry" };
    }
  }

  // Memory fallback
  const newInq: Inquiry = {
    id: `inq-${Date.now()}`,
    ...input,
    status: "new",
    created_at: new Date().toISOString(),
  };
  getStore().inquiries.unshift(newInq);
  revalidatePath("/admin/inquiries");
  return { success: true };
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
  notes?: string
): Promise<{ success: boolean }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase
        .from("inquiries")
        .update({ status, ...(notes !== undefined ? { notes } : {}) })
        .eq("id", id);
      revalidatePath("/admin/inquiries");
      return { success: true };
    } catch (e) {
      console.error(e);
    }
  }
  const inq = getStore().inquiries.find((i) => i.id === id);
  if (inq) {
    inq.status = status;
    if (notes !== undefined) inq.notes = notes;
  }
  revalidatePath("/admin/inquiries");
  return { success: true };
}

export async function saveProject(
  projectData: Partial<Project> & { id?: string },
  mediaItems?: ProjectMedia[]
): Promise<{ success: boolean; id: string; slug?: string; title?: string }> {
  const isNew = !projectData.id;
  const projectId = projectData.id || `p-${Date.now()}`;
  const finalMedia = mediaItems || projectData.media;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const cleanProject = {
        title: projectData.title!,
        slug: projectData.slug!,
        client: projectData.client || "",
        category_id: projectData.category_id || null,
        type: projectData.type || "both",
        year: projectData.year || new Date().getFullYear(),
        location: projectData.location || "",
        role: projectData.role || "Director & Cinematographer",
        story: projectData.story || "",
        cover_image: projectData.cover_image || "",
        video_url: projectData.video_url || null,
        video_type: projectData.video_type || null,
        poster_image: projectData.poster_image || null,
        featured: projectData.featured ?? false,
        published: projectData.published ?? true,
        sort_order: projectData.sort_order ?? 0,
        seo_title: projectData.seo_title || null,
        seo_description: projectData.seo_description || null,
        updated_at: new Date().toISOString(),
      };

      if (isNew) {
        const { data, error } = await supabase.from("projects").insert(cleanProject).select("id").single();
        if (error) throw error;
        projectData.id = data.id;
      } else {
        const { error } = await supabase.from("projects").update(cleanProject).eq("id", projectId);
        if (error) throw error;
      }

      // Upsert media
      if (finalMedia && finalMedia.length > 0) {
        await supabase.from("project_media").delete().eq("project_id", projectData.id || projectId);
        await supabase.from("project_media").insert(
          finalMedia.map((m, idx) => ({
            project_id: projectData.id || projectId,
            type: m.type,
            url: m.url,
            poster_url: m.poster_url || null,
            caption: m.caption || null,
            alt_text: m.alt_text || null,
            width: m.width || null,
            height: m.height || null,
            size_bytes: m.size_bytes || null,
            sort_order: idx + 1,
            is_cover: m.is_cover ?? idx === 0,
          }))
        );
      }

      revalidatePath("/");
      revalidatePath("/work");
      if (projectData.slug) revalidatePath(`/work/${projectData.slug}`);
      revalidatePath("/admin/projects");
      return { success: true, id: projectData.id || projectId, slug: projectData.slug, title: projectData.title };
    } catch (e) {
      console.error("Supabase save project error:", e);
    }
  }

  // Memory fallback
  const store = getStore();
  const existingIdx = store.projects.findIndex((p) => p.id === projectId);
  const cat = store.categories.find((c) => c.id === projectData.category_id);
  const resolved: Project = {
    id: projectId,
    title: projectData.title || "Untitled Project",
    slug: projectData.slug || `project-${Date.now()}`,
    client: projectData.client || "",
    category_id: projectData.category_id || store.categories[0]?.id || "",
    category_name: cat?.name || "General",
    type: projectData.type || "both",
    year: projectData.year || new Date().getFullYear(),
    location: projectData.location || "",
    role: projectData.role || "Direction & Cinematography",
    story: projectData.story || "",
    cover_image: projectData.cover_image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&q=85",
    video_url: projectData.video_url || null,
    video_type: projectData.video_type || null,
    poster_image: projectData.poster_image || null,
    featured: projectData.featured ?? false,
    published: projectData.published ?? true,
    sort_order: projectData.sort_order ?? store.projects.length + 1,
    seo_title: projectData.seo_title || null,
    seo_description: projectData.seo_description || null,
    updated_at: new Date().toISOString(),
  };

  if (existingIdx >= 0) {
    store.projects[existingIdx] = resolved;
  } else {
    store.projects.unshift(resolved);
  }

  if (finalMedia) {
    store.media[projectId] = finalMedia.map((m, idx) => ({
      ...m,
      project_id: projectId,
      sort_order: m.sort_order || idx + 1,
    }));
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath(`/work/${resolved.slug}`);
  revalidatePath("/admin/projects");
  return { success: true, id: projectId, slug: resolved.slug, title: resolved.title };
}

export async function deleteProject(id: string): Promise<{ success: boolean }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase.from("projects").delete().eq("id", id);
      revalidatePath("/");
      revalidatePath("/work");
      revalidatePath("/admin/projects");
      return { success: true };
    } catch (e) {
      console.error("Delete project error:", e);
    }
  }

  getStore().projects = getStore().projects.filter((p) => p.id !== id);
  delete getStore().media[id];
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function reorderProjects(orderedIds: string[]): Promise<{ success: boolean }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      for (let i = 0; i < orderedIds.length; i++) {
        await supabase.from("projects").update({ sort_order: i + 1 }).eq("id", orderedIds[i]);
      }
      revalidatePath("/");
      revalidatePath("/work");
      revalidatePath("/admin/projects");
      return { success: true };
    } catch (e) {
      console.error(e);
    }
  }

  getStore().projects.sort((a, b) => {
    const idxA = orderedIds.indexOf(a.id);
    const idxB = orderedIds.indexOf(b.id);
    if (idxA >= 0 && idxB >= 0) return idxA - idxB;
    return a.sort_order - b.sort_order;
  });
  getStore().projects.forEach((p, i) => (p.sort_order = i + 1));
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function updateShowreel(data: Partial<Showreel>): Promise<{ success: boolean }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase.from("showreel").update(data).eq("id", getStore().showreel.id);
      revalidatePath("/");
      revalidatePath("/admin/showreel");
      return { success: true };
    } catch (e) {
      console.error(e);
    }
  }
  getStore().showreel = { ...getStore().showreel, ...data, updated_at: new Date().toISOString() };
  revalidatePath("/");
  revalidatePath("/admin/showreel");
  return { success: true };
}

export async function updateSiteSettings(data: Partial<SiteSettings>): Promise<{ success: boolean }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase.from("site_settings").update(data).eq("id", getStore().siteSettings.id);
      revalidatePath("/");
      revalidatePath("/admin/settings");
      return { success: true };
    } catch (e) {
      console.error(e);
    }
  }
  getStore().siteSettings = { ...getStore().siteSettings, ...data, updated_at: new Date().toISOString() };
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}

export async function saveCategory(category: Partial<Category>): Promise<{ success: boolean }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (category.id) {
        await supabase.from("categories").update(category).eq("id", category.id);
      } else {
        await supabase.from("categories").insert(category);
      }
      revalidatePath("/admin/categories");
      revalidatePath("/work");
      return { success: true };
    } catch (e) {
      console.error(e);
    }
  }
  const store = getStore();
  if (category.id) {
    const idx = store.categories.findIndex((c) => c.id === category.id);
    if (idx >= 0) store.categories[idx] = { ...store.categories[idx], ...category };
  } else {
    store.categories.push({
      id: `c-${Date.now()}`,
      name: category.name || "New Category",
      slug: category.slug || `cat-${Date.now()}`,
      sort_order: store.categories.length + 1,
    });
  }
  revalidatePath("/admin/categories");
  revalidatePath("/work");
  return { success: true };
}

export async function deleteCategory(id: string): Promise<{ success: boolean }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase.from("categories").delete().eq("id", id);
      revalidatePath("/admin/categories");
      revalidatePath("/work");
      return { success: true };
    } catch (e) {
      console.error(e);
    }
  }
  getStore().categories = getStore().categories.filter((c) => c.id !== id);
  revalidatePath("/admin/categories");
  revalidatePath("/work");
  return { success: true };
}

export async function saveService(service: Partial<Service>): Promise<{ success: boolean }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (service.id) {
        await supabase.from("services").update(service).eq("id", service.id);
      } else {
        await supabase.from("services").insert(service);
      }
      revalidatePath("/services");
      revalidatePath("/admin/services");
      return { success: true };
    } catch (e) {
      console.error(e);
    }
  }
  const store = getStore();
  if (service.id) {
    const idx = store.services.findIndex((s) => s.id === service.id);
    if (idx >= 0) store.services[idx] = { ...store.services[idx], ...service };
  } else {
    store.services.push({
      id: `s-${Date.now()}`,
      name: service.name || "New Service",
      slug: service.slug || `srv-${Date.now()}`,
      short_desc: service.short_desc || "",
      full_desc: service.full_desc || "",
      packages: service.packages || [],
      sample_image: service.sample_image || "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
      sort_order: store.services.length + 1,
    });
  }
  revalidatePath("/services");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function deleteService(id: string): Promise<{ success: boolean }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase.from("services").delete().eq("id", id);
      revalidatePath("/services");
      revalidatePath("/admin/services");
      return { success: true };
    } catch (e) {
      console.error(e);
    }
  }
  getStore().services = getStore().services.filter((s) => s.id !== id);
  revalidatePath("/services");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function saveTestimonial(testimonial: Partial<Testimonial>): Promise<{ success: boolean }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      if (testimonial.id) {
        await supabase.from("testimonials").update(testimonial).eq("id", testimonial.id);
      } else {
        await supabase.from("testimonials").insert(testimonial);
      }
      revalidatePath("/");
      revalidatePath("/admin/testimonials");
      return { success: true };
    } catch (e) {
      console.error(e);
    }
  }
  const store = getStore();
  if (testimonial.id) {
    const idx = store.testimonials.findIndex((t) => t.id === testimonial.id);
    if (idx >= 0) store.testimonials[idx] = { ...store.testimonials[idx], ...testimonial };
  } else {
    store.testimonials.push({
      id: `t-${Date.now()}`,
      quote: testimonial.quote || "",
      client_name: testimonial.client_name || "Client Name",
      project_name: testimonial.project_name || "Project",
      client_avatar: testimonial.client_avatar || null,
      published: testimonial.published ?? true,
      sort_order: store.testimonials.length + 1,
    });
  }
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function deleteTestimonial(id: string): Promise<{ success: boolean }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase.from("testimonials").delete().eq("id", id);
      revalidatePath("/");
      revalidatePath("/admin/testimonials");
      return { success: true };
    } catch (e) {
      console.error(e);
    }
  }
  getStore().testimonials = getStore().testimonials.filter((t) => t.id !== id);
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}


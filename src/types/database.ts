export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ProjectType = "photo" | "video" | "both";
export type InquiryStatus = "new" | "contacted" | "booked" | "closed";

export interface Category {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  created_at?: string;
}

export interface ProjectMedia {
  id: string;
  project_id: string;
  type: "image" | "video";
  url: string;
  poster_url?: string | null;
  caption?: string | null;
  alt_text?: string | null;
  width?: number | null;
  height?: number | null;
  size_bytes?: number | null;
  sort_order: number;
  is_cover: boolean;
  created_at?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  category_id: string;
  category_name?: string;
  type: ProjectType;
  year: number;
  location: string;
  role: string;
  story: string;
  cover_image: string;
  video_url?: string | null;
  video_type?: "embed" | "upload" | null;
  poster_image?: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at?: string;
  updated_at?: string;
  media?: ProjectMedia[];
}

export interface ServicePackage {
  name: string;
  price_range: string;
  deliverables: string[];
  best_for: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  short_desc: string;
  full_desc: string;
  packages: ServicePackage[];
  sample_image: string;
  sort_order: number;
  created_at?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  client_name: string;
  project_name: string;
  client_avatar?: string | null;
  published: boolean;
  sort_order: number;
  created_at?: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  prefix?: string | null;
  suffix?: string | null;
  sort_order: number;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  event_date?: string | null;
  budget_range?: string | null;
  message: string;
  status: InquiryStatus;
  notes?: string | null;
  created_at: string;
}

export interface Showreel {
  id: string;
  hero_video_url: string;
  modal_video_url: string;
  poster_url: string;
  title: string;
  tagline: string;
  updated_at?: string;
}

export interface SiteSettings {
  id: string;
  brand_name: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  vimeo: string;
  address: string;
  coordinates: string;
  seo_title: string;
  seo_description: string;
  updated_at?: string;
}

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: Omit<Category, "id" | "created_at">;
        Update: Partial<Category>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at" | "updated_at" | "category_name" | "media">;
        Update: Partial<Project>;
      };
      project_media: {
        Row: ProjectMedia;
        Insert: Omit<ProjectMedia, "id" | "created_at">;
        Update: Partial<ProjectMedia>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, "id" | "created_at">;
        Update: Partial<Service>;
      };
      testimonials: {
        Row: Testimonial;
        Insert: Omit<Testimonial, "id" | "created_at">;
        Update: Partial<Testimonial>;
      };
      stats: {
        Row: StatItem;
        Insert: Omit<StatItem, "id">;
        Update: Partial<StatItem>;
      };
      inquiries: {
        Row: Inquiry;
        Insert: Omit<Inquiry, "id" | "created_at">;
        Update: Partial<Inquiry>;
      };
      showreel: {
        Row: Showreel;
        Insert: Omit<Showreel, "id" | "updated_at">;
        Update: Partial<Showreel>;
      };
      site_settings: {
        Row: SiteSettings;
        Insert: Omit<SiteSettings, "id" | "updated_at">;
        Update: Partial<SiteSettings>;
      };
    };
  };
}

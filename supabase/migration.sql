-- ====================================================================
-- PYP PORTFOLIO & CMS — SUPABASE DATABASE MIGRATION
-- Run this in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- ====================================================================

-- 1. Enable UUID generator
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client TEXT NOT NULL DEFAULT '',
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('photo', 'video', 'both')) DEFAULT 'both',
  year INT NOT NULL DEFAULT 2026,
  location TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'Direction & Cinematography',
  story TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL,
  video_url TEXT,
  video_type TEXT CHECK (video_type IN ('embed', 'upload', NULL)),
  poster_image TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. PROJECT MEDIA TABLE
CREATE TABLE IF NOT EXISTS public.project_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')) DEFAULT 'image',
  url TEXT NOT NULL,
  poster_url TEXT,
  caption TEXT,
  alt_text TEXT,
  width INT,
  height INT,
  size_bytes BIGINT,
  sort_order INT NOT NULL DEFAULT 0,
  is_cover BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_desc TEXT NOT NULL DEFAULT '',
  full_desc TEXT NOT NULL DEFAULT '',
  packages JSONB NOT NULL DEFAULT '[]'::jsonb,
  sample_image TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  client_name TEXT NOT NULL,
  project_name TEXT NOT NULL,
  client_avatar TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. STATS TABLE
CREATE TABLE IF NOT EXISTS public.stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value INT NOT NULL DEFAULT 0,
  prefix TEXT,
  suffix TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- 8. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  event_date TEXT,
  budget_range TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('new', 'contacted', 'booked', 'closed')) DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. SHOWREEL TABLE
CREATE TABLE IF NOT EXISTS public.showreel (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_video_url TEXT NOT NULL,
  modal_video_url TEXT NOT NULL,
  poster_url TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT 'Showreel 2026',
  tagline TEXT NOT NULL DEFAULT 'Stories captured with light, motion, and intention.',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name TEXT NOT NULL DEFAULT 'PYP',
  tagline TEXT NOT NULL DEFAULT 'Photography & Films that move people.',
  email TEXT NOT NULL DEFAULT 'hello@pypstudio.com',
  phone TEXT NOT NULL DEFAULT '+1 (555) 234-5678',
  whatsapp TEXT NOT NULL DEFAULT '15552345678',
  instagram TEXT NOT NULL DEFAULT 'https://instagram.com/pyp_films',
  vimeo TEXT NOT NULL DEFAULT 'https://vimeo.com/pyp',
  address TEXT NOT NULL DEFAULT 'Studio 4B, 184 Franklin St, New York, NY 10013',
  coordinates TEXT NOT NULL DEFAULT 'N 40.7128° / W 74.0060°',
  seo_title TEXT NOT NULL DEFAULT 'PYP — Photography & Films That Move People',
  seo_description TEXT NOT NULL DEFAULT 'Award-winning photo and video production company specializing in weddings, commercial campaigns, editorial portraits, and cinematic brand films.',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showreel ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies (read published / public items)
CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public can view published projects" ON public.projects FOR SELECT USING (published = true);
CREATE POLICY "Public can view published project media" ON public.project_media FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_media.project_id AND projects.published = true)
);
CREATE POLICY "Public can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public can view published testimonials" ON public.testimonials FOR SELECT USING (published = true);
CREATE POLICY "Public can view stats" ON public.stats FOR SELECT USING (true);
CREATE POLICY "Public can view showreel" ON public.showreel FOR SELECT USING (true);
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);

-- Public insert policy for contact inquiries
CREATE POLICY "Public can insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

-- Admin full access policies (authenticated role)
CREATE POLICY "Admin full categories" ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full project_media" ON public.project_media FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full stats" ON public.stats FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full inquiries" ON public.inquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full showreel" ON public.showreel FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ====================================================================
-- STORAGE BUCKETS SETUP
-- ====================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('pyp-media', 'pyp-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can read pyp-media" ON storage.objects
  FOR SELECT USING (bucket_id = 'pyp-media');

CREATE POLICY "Admin can upload to pyp-media" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'pyp-media');

CREATE POLICY "Admin can update pyp-media" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'pyp-media');

CREATE POLICY "Admin can delete from pyp-media" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'pyp-media');

-- ====================================================================
-- SEED DATA
-- ====================================================================

-- Categories
INSERT INTO public.categories (id, name, slug, sort_order) VALUES
  ('c1111111-1111-1111-1111-111111111111', 'Weddings', 'weddings', 1),
  ('c2222222-2222-2222-2222-222222222222', 'Commercial', 'commercial', 2),
  ('c3333333-3333-3333-3333-333333333333', 'Editorial & Fashion', 'editorial', 3),
  ('c4444444-4444-4444-4444-444444444444', 'Films & Documentaries', 'films', 4),
  ('c5555555-5555-5555-5555-555555555555', 'Live Events', 'events', 5),
  ('c6666666-6666-6666-6666-666666666666', 'Drone & Aerial', 'drone', 6)
ON CONFLICT (slug) DO NOTHING;

-- Projects
INSERT INTO public.projects (id, title, slug, client, category_id, type, year, location, role, story, cover_image, video_url, video_type, poster_image, featured, published, sort_order, seo_title, seo_description) VALUES
(
  'p1111111-1111-1111-1111-111111111111',
  'SOLITUDE IN MONACO',
  'solitude-in-monaco',
  'Vogue International',
  'c3333333-3333-3333-3333-333333333333',
  'both',
  2026,
  'Monte Carlo, Monaco',
  'Creative Direction & 35mm Photography',
  'Shot on Kodak Vision3 500T on the sun-bleached cliffs of Monte Carlo. We blended high-contrast architectural geometry with fluid couture silks to tell a story of quiet solitude amidst luxury.',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&q=85&auto=format&fit=crop',
  'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-pink-light-room-41843-large.mp4',
  'upload',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&q=85&auto=format&fit=crop',
  true,
  true,
  1,
  'Solitude in Monaco — Editorial Story | PYP',
  'Vogue International editorial photographed and filmed on 35mm motion picture stock in Monte Carlo.'
),
(
  'p2222222-2222-2222-2222-222222222222',
  'THE HIGHLAND VOWS',
  'the-highland-vows',
  'Elena & Marcus Vance',
  'c1111111-1111-1111-1111-111111111111',
  'both',
  2026,
  'Isle of Skye, Scotland',
  'Lead Cinematography & Dual Photo Suite',
  'An intimate autumn celebration surrounded by mist, lochs, and jagged peaks. We captured the vows with anamorphic lenses and natural dawn light, emphasizing raw emotional honesty over posed perfection.',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85&auto=format&fit=crop',
  'https://assets.mixkit.co/videos/preview/mixkit-young-couple-walking-outdoors-in-the-countryside-42407-large.mp4',
  'upload',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85&auto=format&fit=crop',
  true,
  true,
  2,
  'The Highland Vows — Cinematic Wedding Film | PYP',
  'Intimate Scottish Highlands destination wedding film and documentary photography by PYP.'
),
(
  'p3333333-3333-3333-3333-333333333333',
  'AETHER MOTORWORKS',
  'aether-motorworks',
  'Aether Electric Vehicles',
  'c2222222-2222-2222-2222-222222222222',
  'video',
  2026,
  'Mojave Desert, California',
  'Commercial Director & Pursuit Vehicle Team',
  'A national launch film captured with high-speed chase rigs at sunrise across dry lakebeds. Sharp industrial design meets dust, heat waves, and lightning-fast low-angle track shots.',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85&auto=format&fit=crop',
  'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-through-the-streets-at-night-42294-large.mp4',
  'upload',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85&auto=format&fit=crop',
  true,
  true,
  3,
  'Aether Motorworks — Commercial Launch Film | PYP',
  'Commercial automotive campaign directed and filmed across Mojave Desert for Aether EVs.'
),
(
  'p4444444-4444-4444-4444-444444444444',
  'KYOTO AFTER HOURS',
  'kyoto-after-hours',
  'Sony Sound Systems',
  'c4444444-4444-4444-4444-444444444444',
  'video',
  2025,
  'Gion & Pontocho, Kyoto',
  'Director & Soundscape Recordist',
  'A short documentary following underground jazz musicians in Kyoto narrow alleyways after midnight. Shot entirely handheld with vintage cinema primes and binaural audio captures.',
  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&q=85&auto=format&fit=crop',
  'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-playing-the-piano-40502-large.mp4',
  'upload',
  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&q=85&auto=format&fit=crop',
  true,
  true,
  4,
  'Kyoto After Hours — Documentary Short | PYP',
  'Cultural doc short capturing underground music culture in Kyoto illuminated by lanterns and neon.'
),
(
  'p5555555-5555-5555-5555-555555555555',
  'COASTAL BRUTALISM',
  'coastal-brutalism',
  'Architectural Record',
  'c6666666-6666-6666-6666-666666666666',
  'photo',
  2026,
  'Basque Coast, Spain',
  'Architectural Photographer & Drone Pilot',
  'Heavy board-formed concrete cliffs cantilevered over crashing Atlantic surf. We studied tidal shadows across 7 days to document the symbiotic tension between raw structure and tidal power.',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85&auto=format&fit=crop',
  NULL,
  NULL,
  NULL,
  true,
  true,
  5,
  'Coastal Brutalism — Architectural Series | PYP',
  'A photographic essay on seaside modernist architecture on the rugged Basque coastline.'
),
(
  'p6666666-6666-6666-6666-666666666666',
  'LUMIÈRE GALA NYC',
  'lumiere-gala-nyc',
  'Metropolitan Arts Foundation',
  'c5555555-5555-5555-5555-555555555555',
  'both',
  2026,
  'Manhattan, New York',
  'Event Visual Director & Multi-Camera Crew',
  'A 1,200-guest charity gala documented across three floors of historic brick arches. We deployed a team of four photojournalists and two steady-cam operators for real-time live-edit turnaround.',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&q=85&auto=format&fit=crop',
  'https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-music-festival-cheering-41834-large.mp4',
  'upload',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&q=85&auto=format&fit=crop',
  true,
  true,
  6,
  'Lumière Gala NYC — Event Production | PYP',
  'Full visual documentation and same-night highlight film for the annual Metropolitan Arts Gala.'
),
(
  'p7777777-7777-7777-7777-777777777777',
  'CHRONOS HOROLOGY',
  'chronos-horology',
  'Vacheron & Zenith Collectors',
  'c2222222-2222-2222-2222-222222222222',
  'photo',
  2025,
  'Geneva, Switzerland',
  'Macro Photographer & Lighting Specialist',
  'Extreme macro photography of hand-finished mechanical tourbillons. Using motorized stacking rails and custom diffused fiber optics, every ruby jewel and anglage bevel was revealed with tactile clarity.',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=85&auto=format&fit=crop',
  NULL,
  NULL,
  NULL,
  false,
  true,
  7,
  'Chronos Horology — Macro Product Series | PYP',
  'Precision high-magnification horological product photography for Swiss luxury timepieces.'
),
(
  'p8888888-8888-8888-8888-888888888888',
  'AMALFI SUNSET VOWS',
  'amalfi-sunset-vows',
  'Sophia & Matteo Rossi',
  'c1111111-1111-1111-1111-111111111111',
  'both',
  2025,
  'Ravello, Italy',
  'Cinematographer & Film Photographer',
  'Perched 1,000 feet above the Tyrrhenian sea at Villa Cimbrone. We captured warm afternoon golden hour, acoustic mandolin melodies, and evening candlelit terrace dinners on Medium Format film.',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=85&auto=format&fit=crop',
  'https://assets.mixkit.co/videos/preview/mixkit-young-couple-walking-outdoors-in-the-countryside-42407-large.mp4',
  'upload',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=85&auto=format&fit=crop',
  false,
  true,
  8,
  'Amalfi Sunset Vows — Destination Wedding | PYP',
  'Destination wedding film and portrait portfolio captured in Ravello on the Amalfi Coast.'
)
ON CONFLICT (slug) DO NOTHING;

-- Project Media (Gallery Images for Projects)
INSERT INTO public.project_media (project_id, type, url, caption, alt_text, width, height, sort_order, is_cover) VALUES
  ('p1111111-1111-1111-1111-111111111111', 'image', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&q=85', 'Portrait in late Mediterranean sunlight', 'Editorial model looking into camera', 1600, 2000, 1, true),
  ('p1111111-1111-1111-1111-111111111111', 'image', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=85', 'Couture silhouette against stone archways', 'Fashion couture model standing under stone arch', 1600, 2400, 2, false),
  ('p1111111-1111-1111-1111-111111111111', 'image', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=85', 'High contrast yellow silk and sharp shadows', 'Model in bright designer attire', 1600, 2000, 3, false),
  ('p1111111-1111-1111-1111-111111111111', 'image', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1600&q=85', 'Coastal breeze and linen styling', 'Outdoor editorial capture on cliffside', 1600, 1067, 4, false),

  ('p2222222-2222-2222-2222-222222222222', 'image', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85', 'The vow exchange before the Quiraing', 'Bride and groom surrounded by Scottish mist', 1600, 1067, 1, true),
  ('p2222222-2222-2222-2222-222222222222', 'image', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&q=85', 'Embrace beside the black stone cottage', 'Couple embracing outdoors in rustic setting', 1600, 2400, 2, false),
  ('p2222222-2222-2222-2222-222222222222', 'image', 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1600&q=85', 'Handmade vows penned on aged deckle paper', 'Close up of wedding stationery and gold rings', 1600, 1067, 3, false),

  ('p3333333-3333-3333-3333-333333333333', 'image', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85', 'Aether Prototype 01 cutting through dawn dust', 'Automotive tracking shot across desert lakebed', 1600, 1067, 1, true),
  ('p3333333-3333-3333-3333-333333333333', 'image', 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1600&q=85', 'Aerodynamic rim detail at 90mph', 'Precision wheel motion blur', 1600, 1067, 2, false),
  ('p3333333-3333-3333-3333-333333333333', 'image', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=85', 'Rear light bar illuminating dusk horizon', 'Car headlights cutting through twilight darkness', 1600, 1067, 3, false),

  ('p4444444-4444-4444-4444-444444444444', 'image', 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&q=85', 'Gion alleyway wet with spring rain', 'Kyoto lantern reflecting in wet cobblestones', 1600, 2400, 1, true),
  ('p4444444-4444-4444-4444-444444444444', 'image', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=85', 'Tenor saxophone solo in basement club', 'Musician playing saxophone in smoky amber light', 1600, 1067, 2, false),

  ('p5555555-5555-5555-5555-555555555555', 'image', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85', 'Cantilevered concrete terrace facing the Atlantic', 'Modernist concrete home built into sea cliff', 1600, 1067, 1, true),
  ('p5555555-5555-5555-5555-555555555555', 'image', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85', 'Interior light casting long midday shadows', 'Minimalist architectural living space', 1600, 1067, 2, false),

  ('p6666666-6666-6666-6666-666666666666', 'image', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&q=85', 'Grand hall chandeliers reflecting over dinner guests', 'High end banquet event with warm ambient light', 1600, 1067, 1, true),
  ('p6666666-6666-6666-6666-666666666666', 'image', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=85', 'Keynote address and stage presentation', 'Speaker on illuminated stage with backdrop', 1600, 1067, 2, false)
ON CONFLICT DO NOTHING;

-- Services
INSERT INTO public.services (name, slug, short_desc, full_desc, packages, sample_image, sort_order) VALUES
(
  'Wedding Cinematography & Photography',
  'weddings',
  'Story-first films and documentary photo suites that capture raw vows, quiet glances, and wild receptions without invasive staging.',
  'We treat weddings as once-in-a-lifetime documentary films. Using discreet cinema cameras, vintage prime glass, and natural light, we capture the day as it genuinely felt — candid, intimate, and timeless.',
  '[
    {"name": "The Essential Suite", "price_range": "$6,500 – $8,500", "deliverables": ["8 Hours Coverage", "2 Lead Shooters (Photo + Cinema)", "500+ Curated Color-Graded Stills", "5-Min Highlight Cinema Film", "Full Ceremony & Speeches Edit"], "best_for": "Local celebrations and intimate gatherings"},
    {"name": "The Editorial Archive", "price_range": "$11,000 – $14,500", "deliverables": ["Full Weekend Coverage", "3 Shooters + Drone Pilot", "800+ 35mm & Digital Stills", "12-Min Short Film + Teaser Reel", "Bespoke Leather Bound Album"], "best_for": "Multi-day destination weddings"}
  ]'::jsonb,
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
  1
),
(
  'Commercial Films & Brand Campaigns',
  'commercial',
  'High-impact visual narratives for forward-thinking brands that demand emotional resonance and surgical art direction.',
  'From automotive launches to luxury lifestyle campaigns, we manage full production: concept scripting, casting, high-speed camera pursuit rigs, and precision color finishing.',
  '[
    {"name": "Brand Hero Film", "price_range": "$15,000 – $28,000", "deliverables": ["90-Sec Brand Anthem Film", "3x 15-Sec Social Cutdowns", "Campaign Stills Suite (25 Assets)", "Full Licensing & Broadcast Color"], "best_for": "Product launches and brand rebranding"},
    {"name": "Retainer Visual Suite", "price_range": "$8,000 / month", "deliverables": ["Quarterly Production Days", "12 Monthly Video Assets", "Monthly High-Res Photo Bank", "Creative Direction Consultation"], "best_for": "High-growth consumer & tech brands"}
  ]'::jsonb,
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
  2
),
(
  'Editorial & Portrait Photography',
  'editorial',
  'Magazine covers, artist press kits, and couture lookbooks shot with high-contrast, filmic honesty and distinctive lighting.',
  'We work with publications, fashion designers, and artists to craft images that hold attention in print and digital realms alike.',
  '[
    {"name": "Lookbook & Campaign", "price_range": "$5,000 – $9,000", "deliverables": ["Full Studio or Location Day", "Art Direction & Lighting Tech", "35 Retouched High-Res Images", "Print-Ready Color Separations"], "best_for": "Seasonal fashion collections and press"},
    {"name": "Artist Press Suite", "price_range": "$3,200 – $4,500", "deliverables": ["Half-Day Location Shoot", "15 Curated Master Portraits", "Digital & Social Licensing"], "best_for": "Musicians, directors, authors, and founders"}
  ]'::jsonb,
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80',
  3
),
(
  'Documentary & Music Visuals',
  'films',
  'Immersive storytelling that digs beneath the surface to explore human passion, soundscapes, and cultural movements.',
  'Deeply personal projects produced with cinema-grade anamorphic optics, intimate sound design, and festival-ready delivery.',
  '[
    {"name": "Short Documentary", "price_range": "$18,000 – $35,000", "deliverables": ["10–20 Min Short Film", "Sound Design & Original Score Mix", "Color Grade in DaVinci Resolve", "Festival Package DCP"], "best_for": "Cultural institutions and non-profits"},
    {"name": "Official Music Video", "price_range": "$9,500 – $19,000", "deliverables": ["Full Concept & Treatment", "2-Day Multi-Location Shoot", "Choreographed Lighting Design", "Vertical Cutdowns for Streaming"], "best_for": "Recording artists and record labels"}
  ]'::jsonb,
  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&q=80',
  4
),
(
  'Live Events & Galas',
  'events',
  'Unobtrusive multi-camera coverage capturing VIP keynotes, electric crowd atmospheres, and same-night turnaround highlights.',
  'Trusted by world-class foundations and corporate summits to provide fast, reliable, publication-grade imagery on tight deadlines.',
  '[
    {"name": "Summit & Gala Coverage", "price_range": "$4,800 – $8,500", "deliverables": ["Up to 8 Hours Multi-Cam", "Same-Night Press Stills Selection", "300+ Curated Final Photos", "3-Min Event Recap Video"], "best_for": "Conferences, award shows, and galas"}
  ]'::jsonb,
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
  5
),
(
  'Drone & Heavy-Lift Aerials',
  'drone',
  'FAA Part 107 licensed aerial cinematography with ProRes and RAW capability over coastal terrain, architecture, and live action.',
  'Our licensed pilots deliver stable, cinematic sweeping aerials that anchor projects with majestic geographic perspective.',
  '[
    {"name": "Aerial Production Day", "price_range": "$3,500 – $6,000", "deliverables": ["Licensed Pilot + Camera Operator", "5.1K Apple ProRes 422HQ", "Raw DNG Stills", "Insurance & Airspace Authorizations"], "best_for": "Commercials, architecture, and features"}
  ]'::jsonb,
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
  6
)
ON CONFLICT (slug) DO NOTHING;

-- Testimonials
INSERT INTO public.testimonials (quote, client_name, project_name, client_avatar, sort_order) VALUES
  ('PYP did not just shoot our wedding — they crafted an heirloom film that brought our entire family to tears. The subtlety, framing, and sound design feel like a Criterion cinema piece rather than a typical wedding video.', 'Elena & Marcus Vance', 'The Highland Vows, Isle of Skye', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80', 1),
  ('Working with PYP on our national campaign set a new benchmark for our brand. They navigated high-speed desert rigs with relentless creative rigor and delivered 10 days ahead of schedule.', 'Julian Sterling', 'CMO, Aether Electric Vehicles', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', 2),
  ('The photo series they captured in Monaco for our autumn issue is pure poetry. Every frame breathes with texture, light, and confident restraint.', 'Claire Fontaine', 'Creative Director, Vogue International', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80', 3),
  ('The speed, discretion, and breathtaking quality PYP provided for our 1,200-person gala was unprecedented. Our board of trustees and donors were mesmerized by the recap film.', 'David K. Morrison', 'Metropolitan Arts Foundation NYC', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', 4)
ON CONFLICT DO NOTHING;

-- Stats
INSERT INTO public.stats (label, value, prefix, suffix, sort_order) VALUES
  ('Projects Shot', 280, NULL, '+', 1),
  ('Years Behind Lens', 12, NULL, NULL, 2),
  ('Countries Filmed', 24, NULL, NULL, 3),
  ('Client Happiness', 99, NULL, '%', 4)
ON CONFLICT DO NOTHING;

-- Showreel
INSERT INTO public.showreel (hero_video_url, modal_video_url, poster_url, title, tagline) VALUES
(
  'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-pink-light-room-41843-large.mp4',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1800&q=85',
  'PYP Showreel 2026',
  'Moving images, quiet stills, and stories built to endure.'
)
ON CONFLICT DO NOTHING;

-- Site Settings
INSERT INTO public.site_settings (brand_name, tagline, email, phone, whatsapp, instagram, vimeo, address, coordinates, seo_title, seo_description) VALUES
(
  'PYP',
  'Photography & Films that move people.',
  'hello@pypstudio.com',
  '+1 (555) 234-5678',
  '15552345678',
  'https://instagram.com/pyp_films',
  'https://vimeo.com/pyp',
  'Studio 4B, 184 Franklin St, New York, NY 10013',
  'N 40.7128° / W 74.0060°',
  'PYP — Photography & Films That Move People',
  'Award-winning photo and video production company specializing in weddings, commercial campaigns, editorial portraits, and cinematic brand films.'
)
ON CONFLICT DO NOTHING;

-- Inquiries sample
INSERT INTO public.inquiries (name, email, phone, service, event_date, budget_range, message, status, notes) VALUES
  ('Charlotte & Henry Adams', 'charlotte.adams@example.com', '+1 (555) 891-2345', 'Wedding Cinematography & Photography', 'October 18, 2026', '$10,000 – $15,000', 'We are getting married in Lake Como next autumn and fell in love with your Highland wedding film. Looking for dual photo and video coverage.', 'new', 'Follow up with Lake Como travel pricing deck'),
  ('Artemis Media Group', 'production@artemis.io', '+1 (555) 762-1100', 'Commercial Films & Brand Campaigns', 'July 2026', '$25,000+', 'Looking for a director and drone unit for a luxury sustainable yacht brand launch. 3-day shoot in South of France.', 'contacted', 'Sent pitch deck on Monday')
ON CONFLICT DO NOTHING;


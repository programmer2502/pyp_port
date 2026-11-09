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
} from "@/types/database";

export const INITIAL_CATEGORIES: Category[] = [
  { id: "c1111111-1111-1111-1111-111111111111", name: "Weddings", slug: "weddings", sort_order: 1 },
  { id: "c2222222-2222-2222-2222-222222222222", name: "Commercial", slug: "commercial", sort_order: 2 },
  { id: "c3333333-3333-3333-3333-333333333333", name: "Editorial & Fashion", slug: "editorial", sort_order: 3 },
  { id: "c4444444-4444-4444-4444-444444444444", name: "Films & Documentaries", slug: "films", sort_order: 4 },
  { id: "c5555555-5555-5555-5555-555555555555", name: "Live Events", slug: "events", sort_order: 5 },
  { id: "c6666666-6666-6666-6666-666666666666", name: "Drone & Aerial", slug: "drone", sort_order: 6 },
];

export const INITIAL_PROJECT_MEDIA: Record<string, ProjectMedia[]> = {
  "p1111111-1111-1111-1111-111111111111": [
    {
      id: "m1-1",
      project_id: "p1111111-1111-1111-1111-111111111111",
      type: "image",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&q=85&auto=format&fit=crop",
      caption: "Portrait in late Mediterranean sunlight on Kodak Vision3 500T",
      alt_text: "Editorial portrait of model in warm natural light",
      width: 1600,
      height: 2000,
      size_bytes: 1450000,
      sort_order: 1,
      is_cover: true,
    },
    {
      id: "m1-2",
      project_id: "p1111111-1111-1111-1111-111111111111",
      type: "image",
      url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=85&auto=format&fit=crop",
      caption: "Couture silhouette against classical limestone arches",
      alt_text: "Fashion model posing under archways",
      width: 1600,
      height: 2400,
      size_bytes: 1820000,
      sort_order: 2,
      is_cover: false,
    },
    {
      id: "m1-3",
      project_id: "p1111111-1111-1111-1111-111111111111",
      type: "image",
      url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=85&auto=format&fit=crop",
      caption: "High-key chartreuse silks under midday Mediterranean sun",
      alt_text: "Model in bright couture gown",
      width: 1600,
      height: 2000,
      size_bytes: 1390000,
      sort_order: 3,
      is_cover: false,
    },
    {
      id: "m1-4",
      project_id: "p1111111-1111-1111-1111-111111111111",
      type: "image",
      url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1600&q=85&auto=format&fit=crop",
      caption: "Coastal cliffside study with subtle breeze and natural grain",
      alt_text: "Couture editorial shot against open ocean horizon",
      width: 1600,
      height: 1067,
      size_bytes: 1220000,
      sort_order: 4,
      is_cover: false,
    },
  ],
  "p2222222-2222-2222-2222-222222222222": [
    {
      id: "m2-1",
      project_id: "p2222222-2222-2222-2222-222222222222",
      type: "image",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85&auto=format&fit=crop",
      caption: "Vow exchange surrounded by Scottish Highland mist",
      alt_text: "Bride and groom standing on dramatic Scottish ridge",
      width: 1600,
      height: 1067,
      size_bytes: 1350000,
      sort_order: 1,
      is_cover: true,
    },
    {
      id: "m2-2",
      project_id: "p2222222-2222-2222-2222-222222222222",
      type: "image",
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&q=85&auto=format&fit=crop",
      caption: "Quiet embrace outside the historic stone croft",
      alt_text: "Couple holding each other in scenic highlands",
      width: 1600,
      height: 2400,
      size_bytes: 1650000,
      sort_order: 2,
      is_cover: false,
    },
    {
      id: "m2-3",
      project_id: "p2222222-2222-2222-2222-222222222222",
      type: "image",
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1600&q=85&auto=format&fit=crop",
      caption: "Deckle edge vows and heirloom gold bands",
      alt_text: "Wedding rings and handwritten letter",
      width: 1600,
      height: 1067,
      size_bytes: 1110000,
      sort_order: 3,
      is_cover: false,
    },
  ],
  "p3333333-3333-3333-3333-333333333333": [
    {
      id: "m3-1",
      project_id: "p3333333-3333-3333-3333-333333333333",
      type: "image",
      url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85&auto=format&fit=crop",
      caption: "Chase vehicle tracking prototype at 85mph",
      alt_text: "Sports electric vehicle tearing across dry lakebed",
      width: 1600,
      height: 1067,
      size_bytes: 1410000,
      sort_order: 1,
      is_cover: true,
    },
    {
      id: "m3-2",
      project_id: "p3333333-3333-3333-3333-333333333333",
      type: "image",
      url: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1600&q=85&auto=format&fit=crop",
      caption: "Carbon composite aerodynamics and forged wheel detail",
      alt_text: "High speed car wheel motion close up",
      width: 1600,
      height: 1067,
      size_bytes: 1290000,
      sort_order: 2,
      is_cover: false,
    },
  ],
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "p1111111-1111-1111-1111-111111111111",
    title: "SOLITUDE IN MONACO",
    slug: "solitude-in-monaco",
    client: "Vogue International",
    category_id: "c3333333-3333-3333-3333-333333333333",
    category_name: "Editorial & Fashion",
    type: "both",
    year: 2026,
    location: "Monte Carlo, Monaco",
    role: "Creative Direction & 35mm Photography",
    story:
      "Captured on Kodak Vision3 500T on the sun-bleached cliffs of Monte Carlo. We blended high-contrast architectural geometry with fluid couture silks to tell a story of quiet solitude amidst luxury. The editorial spans four locations across the principality, highlighting the quiet tension between human form and monolithic stone.",
    cover_image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&q=85&auto=format&fit=crop",
    video_url:
      "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-pink-light-room-41843-large.mp4",
    video_type: "upload",
    poster_image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&q=85&auto=format&fit=crop",
    featured: true,
    published: true,
    sort_order: 1,
    seo_title: "Solitude in Monaco — Editorial Story | PYP",
    seo_description: "Vogue International editorial photographed and filmed on 35mm motion picture stock in Monte Carlo.",
  },
  {
    id: "p2222222-2222-2222-2222-222222222222",
    title: "THE HIGHLAND VOWS",
    slug: "the-highland-vows",
    client: "Elena & Marcus Vance",
    category_id: "c1111111-1111-1111-1111-111111111111",
    category_name: "Weddings",
    type: "both",
    year: 2026,
    location: "Isle of Skye, Scotland",
    role: "Lead Cinematography & Dual Photo Suite",
    story:
      "An intimate autumn celebration surrounded by mist, lochs, and jagged basalt peaks. We captured the vows with anamorphic lenses and natural dawn light, emphasizing raw emotional honesty over posed perfection. A celebration that felt less like an event and more like an elemental chapter in two lives.",
    cover_image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85&auto=format&fit=crop",
    video_url:
      "https://assets.mixkit.co/videos/preview/mixkit-young-couple-walking-outdoors-in-the-countryside-42407-large.mp4",
    video_type: "upload",
    poster_image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85&auto=format&fit=crop",
    featured: true,
    published: true,
    sort_order: 2,
    seo_title: "The Highland Vows — Cinematic Wedding Film | PYP",
    seo_description: "Intimate Scottish Highlands destination wedding film and documentary photography by PYP.",
  },
  {
    id: "p3333333-3333-3333-3333-333333333333",
    title: "AETHER MOTORWORKS",
    slug: "aether-motorworks",
    client: "Aether Electric Vehicles",
    category_id: "c2222222-2222-2222-2222-222222222222",
    category_name: "Commercial",
    type: "video",
    year: 2026,
    location: "Mojave Desert, California",
    role: "Commercial Director & Pursuit Vehicle Team",
    story:
      "A national launch film captured with high-speed chase rigs at sunrise across dry lakebeds. Sharp industrial design meets dust, heat waves, and lightning-fast low-angle track shots. Delivered with cinema Dolby Atmos master mix.",
    cover_image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85&auto=format&fit=crop",
    video_url:
      "https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-through-the-streets-at-night-42294-large.mp4",
    video_type: "upload",
    poster_image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85&auto=format&fit=crop",
    featured: true,
    published: true,
    sort_order: 3,
    seo_title: "Aether Motorworks — Commercial Launch Film | PYP",
    seo_description: "Commercial automotive campaign directed and filmed across Mojave Desert for Aether EVs.",
  },
  {
    id: "p4444444-4444-4444-4444-444444444444",
    title: "KYOTO AFTER HOURS",
    slug: "kyoto-after-hours",
    client: "Sony Sound Systems",
    category_id: "c4444444-4444-4444-4444-444444444444",
    category_name: "Films & Documentaries",
    type: "video",
    year: 2025,
    location: "Gion & Pontocho, Kyoto",
    role: "Director & Soundscape Recordist",
    story:
      "A short documentary following underground jazz musicians in Kyoto's narrow alleyways after midnight. Shot entirely handheld with vintage cinema primes and binaural audio captures.",
    cover_image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&q=85&auto=format&fit=crop",
    video_url:
      "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-playing-the-piano-40502-large.mp4",
    video_type: "upload",
    poster_image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&q=85&auto=format&fit=crop",
    featured: true,
    published: true,
    sort_order: 4,
    seo_title: "Kyoto After Hours — Documentary Short | PYP",
    seo_description: "Cultural doc short capturing underground music culture in Kyoto illuminated by lanterns and neon.",
  },
  {
    id: "p5555555-5555-5555-5555-555555555555",
    title: "COASTAL BRUTALISM",
    slug: "coastal-brutalism",
    client: "Architectural Record",
    category_id: "c6666666-6666-6666-6666-666666666666",
    category_name: "Drone & Aerial",
    type: "photo",
    year: 2026,
    location: "Basque Coast, Spain",
    role: "Architectural Photographer & Drone Pilot",
    story:
      "Heavy board-formed concrete cliffs cantilevered over crashing Atlantic surf. We studied tidal shadows across 7 days to document the symbiotic tension between raw structure and tidal power.",
    cover_image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85&auto=format&fit=crop",
    featured: true,
    published: true,
    sort_order: 5,
    seo_title: "Coastal Brutalism — Architectural Series | PYP",
    seo_description: "A photographic essay on seaside modernist architecture on the rugged Basque coastline.",
  },
  {
    id: "p6666666-6666-6666-6666-666666666666",
    title: "LUMIÈRE GALA NYC",
    slug: "lumiere-gala-nyc",
    client: "Metropolitan Arts Foundation",
    category_id: "c5555555-5555-5555-5555-555555555555",
    category_name: "Live Events",
    type: "both",
    year: 2026,
    location: "Manhattan, New York",
    role: "Event Visual Director & Multi-Camera Crew",
    story:
      "A 1,200-guest charity gala documented across three floors of historic brick arches. We deployed a team of four photojournalists and two steady-cam operators for real-time live-edit turnaround.",
    cover_image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&q=85&auto=format&fit=crop",
    video_url:
      "https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-music-festival-cheering-41834-large.mp4",
    video_type: "upload",
    poster_image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&q=85&auto=format&fit=crop",
    featured: true,
    published: true,
    sort_order: 6,
    seo_title: "Lumière Gala NYC — Event Production | PYP",
    seo_description: "Full visual documentation and same-night highlight film for the annual Metropolitan Arts Gala.",
  },
  {
    id: "p7777777-7777-7777-7777-777777777777",
    title: "CHRONOS HOROLOGY",
    slug: "chronos-horology",
    client: "Vacheron & Zenith Collectors",
    category_id: "c2222222-2222-2222-2222-222222222222",
    category_name: "Commercial",
    type: "photo",
    year: 2025,
    location: "Geneva, Switzerland",
    role: "Macro Photographer & Lighting Specialist",
    story:
      "Extreme macro photography of hand-finished mechanical tourbillons. Using motorized stacking rails and custom diffused fiber optics, every ruby jewel and anglage bevel was revealed with tactile clarity.",
    cover_image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=85&auto=format&fit=crop",
    featured: false,
    published: true,
    sort_order: 7,
    seo_title: "Chronos Horology — Macro Product Series | PYP",
    seo_description: "Precision high-magnification horological product photography for Swiss luxury timepieces.",
  },
  {
    id: "p8888888-8888-8888-8888-888888888888",
    title: "AMALFI SUNSET VOWS",
    slug: "amalfi-sunset-vows",
    client: "Sophia & Matteo Rossi",
    category_id: "c1111111-1111-1111-1111-111111111111",
    category_name: "Weddings",
    type: "both",
    year: 2025,
    location: "Ravello, Italy",
    role: "Cinematographer & Film Photographer",
    story:
      "Perched 1,000 feet above the Tyrrhenian sea at Villa Cimbrone. We captured warm afternoon golden hour, acoustic mandolin melodies, and evening candlelit terrace dinners on Medium Format film.",
    cover_image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=85&auto=format&fit=crop",
    video_url:
      "https://assets.mixkit.co/videos/preview/mixkit-young-couple-walking-outdoors-in-the-countryside-42407-large.mp4",
    video_type: "upload",
    poster_image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=85&auto=format&fit=crop",
    featured: false,
    published: true,
    sort_order: 8,
    seo_title: "Amalfi Sunset Vows — Destination Wedding | PYP",
    seo_description: "Destination wedding film and portrait portfolio captured in Ravello on the Amalfi Coast.",
  },
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: "s1",
    name: "Wedding Cinematography & Photography",
    slug: "weddings",
    short_desc:
      "Story-first films and documentary photo suites that capture raw vows, quiet glances, and wild receptions without invasive staging.",
    full_desc:
      "We treat weddings as once-in-a-lifetime documentary films. Using discreet cinema cameras, vintage prime glass, and natural light, we capture the day as it genuinely felt — candid, intimate, and timeless.",
    packages: [
      {
        name: "The Essential Suite",
        price_range: "$6,500 – $8,500",
        deliverables: [
          "8 Hours Continuous Coverage",
          "2 Lead Shooters (Director + Cinematographer)",
          "500+ Curated Color-Graded Stills",
          "5-Min Highlight Cinema Film",
          "Full Ceremony & Speeches Edit",
        ],
        best_for: "Local celebrations and intimate gatherings",
      },
      {
        name: "The Editorial Archive",
        price_range: "$11,000 – $14,500",
        deliverables: [
          "Full Weekend Coverage (Rehearsal + Wedding)",
          "3 Shooters + Licensed Drone Unit",
          "800+ 35mm & Digital Stills",
          "12-Min Short Film + Teaser Reel",
          "Bespoke Leather Bound Album",
        ],
        best_for: "Multi-day destination weddings",
      },
    ],
    sample_image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    sort_order: 1,
  },
  {
    id: "s2",
    name: "Commercial Films & Brand Campaigns",
    slug: "commercial",
    short_desc:
      "High-impact visual narratives for forward-thinking brands that demand emotional resonance and surgical art direction.",
    full_desc:
      "From automotive launches to luxury lifestyle campaigns, we manage full production: concept scripting, casting, high-speed camera pursuit rigs, and precision color finishing.",
    packages: [
      {
        name: "Brand Hero Film",
        price_range: "$15,000 – $28,000",
        deliverables: [
          "90-Sec Brand Anthem Film",
          "3x 15-Sec Social Cutdowns",
          "Campaign Stills Suite (25 Assets)",
          "Full Licensing & Broadcast Color",
        ],
        best_for: "Product launches and brand rebranding",
      },
      {
        name: "Retainer Visual Suite",
        price_range: "$8,000 / month",
        deliverables: [
          "Quarterly Production Days",
          "12 Monthly Video Assets",
          "Monthly High-Res Photo Bank",
          "Creative Direction Consultation",
        ],
        best_for: "High-growth consumer & tech brands",
      },
    ],
    sample_image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
    sort_order: 2,
  },
  {
    id: "s3",
    name: "Editorial & Portrait Photography",
    slug: "editorial",
    short_desc:
      "Magazine covers, artist press kits, and couture lookbooks shot with high-contrast, filmic honesty and distinctive lighting.",
    full_desc:
      "We work with publications, fashion designers, and artists to craft images that hold attention in print and digital realms alike.",
    packages: [
      {
        name: "Lookbook & Campaign",
        price_range: "$5,000 – $9,000",
        deliverables: [
          "Full Studio or Location Day",
          "Art Direction & Lighting Tech",
          "35 Retouched High-Res Images",
          "Print-Ready Color Separations",
        ],
        best_for: "Seasonal fashion collections and press",
      },
      {
        name: "Artist Press Suite",
        price_range: "$3,200 – $4,500",
        deliverables: [
          "Half-Day Location Shoot",
          "15 Curated Master Portraits",
          "Digital & Social Licensing",
        ],
        best_for: "Musicians, directors, authors, and founders",
      },
    ],
    sample_image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80",
    sort_order: 3,
  },
  {
    id: "s4",
    name: "Documentary & Music Visuals",
    slug: "films",
    short_desc:
      "Immersive storytelling that digs beneath the surface to explore human passion, soundscapes, and cultural movements.",
    full_desc:
      "Deeply personal projects produced with cinema-grade anamorphic optics, intimate sound design, and festival-ready delivery.",
    packages: [
      {
        name: "Short Documentary",
        price_range: "$18,000 – $35,000",
        deliverables: [
          "10–20 Min Short Film",
          "Sound Design & Original Score Mix",
          "Color Grade in DaVinci Resolve",
          "Festival Package DCP",
        ],
        best_for: "Cultural institutions and non-profits",
      },
    ],
    sample_image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&q=80",
    sort_order: 4,
  },
  {
    id: "s5",
    name: "Live Events & Galas",
    slug: "events",
    short_desc:
      "Unobtrusive multi-camera coverage capturing VIP keynotes, electric crowd atmospheres, and same-night turnaround highlights.",
    full_desc:
      "Trusted by world-class foundations and corporate summits to provide fast, reliable, publication-grade imagery on tight deadlines.",
    packages: [
      {
        name: "Summit & Gala Coverage",
        price_range: "$4,800 – $8,500",
        deliverables: [
          "Up to 8 Hours Multi-Cam",
          "Same-Night Press Stills Selection",
          "300+ Curated Final Photos",
          "3-Min Event Recap Video",
        ],
        best_for: "Conferences, award shows, and galas",
      },
    ],
    sample_image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
    sort_order: 5,
  },
  {
    id: "s6",
    name: "Drone & Heavy-Lift Aerials",
    slug: "drone",
    short_desc:
      "FAA Part 107 licensed aerial cinematography with ProRes and RAW capability over coastal terrain, architecture, and live action.",
    full_desc:
      "Our licensed pilots deliver stable, cinematic sweeping aerials that anchor projects with majestic geographic perspective.",
    packages: [
      {
        name: "Aerial Production Day",
        price_range: "$3,500 – $6,000",
        deliverables: [
          "Licensed Pilot + Camera Operator",
          "5.1K Apple ProRes 422HQ",
          "Raw DNG Stills",
          "Insurance & Airspace Authorizations",
        ],
        best_for: "Commercials, architecture, and features",
      },
    ],
    sample_image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    sort_order: 6,
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "PYP did not just shoot our wedding — they crafted an heirloom film that brought our entire family to tears. The subtlety, framing, and sound design feel like a Criterion cinema piece rather than a typical wedding video.",
    client_name: "Elena & Marcus Vance",
    project_name: "The Highland Vows, Isle of Skye",
    client_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    published: true,
    sort_order: 1,
  },
  {
    id: "t2",
    quote:
      "Working with PYP on our national campaign set a new benchmark for our brand. They navigated high-speed desert chase rigs with relentless creative rigor and delivered 10 days ahead of schedule.",
    client_name: "Julian Sterling",
    project_name: "CMO, Aether Electric Vehicles",
    client_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    published: true,
    sort_order: 2,
  },
  {
    id: "t3",
    quote:
      "The photo series they captured in Monaco for our autumn issue is pure poetry. Every frame breathes with texture, light, and confident restraint.",
    client_name: "Claire Fontaine",
    project_name: "Creative Director, Vogue International",
    client_avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    published: true,
    sort_order: 3,
  },
  {
    id: "t4",
    quote:
      "The speed, discretion, and breathtaking quality PYP provided for our 1,200-person gala was unprecedented. Our board of trustees and donors were mesmerized by the recap film.",
    client_name: "David K. Morrison",
    project_name: "Metropolitan Arts Foundation NYC",
    client_avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    published: true,
    sort_order: 4,
  },
];

export const INITIAL_STATS: StatItem[] = [
  { id: "st1", label: "Projects Shot", value: 280, suffix: "+", sort_order: 1 },
  { id: "st2", label: "Years Behind Lens", value: 12, sort_order: 2 },
  { id: "st3", label: "Countries Filmed", value: 24, sort_order: 3 },
  { id: "st4", label: "Client Happiness", value: 99, suffix: "%", sort_order: 4 },
];

export const INITIAL_SHOWREEL: Showreel = {
  id: "sr1",
  hero_video_url:
    "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-pink-light-room-41843-large.mp4",
  modal_video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  poster_url:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1800&q=85&auto=format&fit=crop",
  title: "PYP Showreel 2026",
  tagline: "Moving images, quiet stills, and stories built to endure.",
};

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  id: "ss1",
  brand_name: "PYP",
  tagline: "Photography & Films that move people.",
  email: "hello@pypstudio.com",
  phone: "+1 (555) 234-5678",
  whatsapp: "15552345678",
  instagram: "https://instagram.com/pyp_films",
  vimeo: "https://vimeo.com/pyp",
  address: "Studio 4B, 184 Franklin St, New York, NY 10013",
  coordinates: "N 40.7128° / W 74.0060°",
  seo_title: "PYP — Photography & Films That Move People",
  seo_description:
    "Award-winning photo and video production company specializing in weddings, commercial campaigns, editorial portraits, and cinematic brand films.",
};

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "inq-1",
    name: "Charlotte & Henry Adams",
    email: "charlotte.adams@example.com",
    phone: "+1 (555) 891-2345",
    service: "Wedding Cinematography & Photography",
    event_date: "October 18, 2026",
    budget_range: "$10,000 – $15,000",
    message:
      "We are getting married in Lake Como next autumn and fell in love with your Highland wedding film. Looking for dual photo and video coverage for 3 days.",
    status: "new",
    notes: "Follow up with Lake Como travel pricing deck",
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "inq-2",
    name: "Artemis Media Group",
    email: "production@artemis.io",
    phone: "+1 (555) 762-1100",
    service: "Commercial Films & Brand Campaigns",
    event_date: "July 2026",
    budget_range: "$25,000+",
    message:
      "Looking for a director and drone unit for a luxury sustainable yacht brand launch. 3-day shoot in South of France.",
    status: "contacted",
    notes: "Sent pitch deck on Monday",
    created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
  {
    id: "inq-3",
    name: "Liam O'Connor",
    email: "liam@oconnorarch.com",
    phone: "+1 (555) 349-9801",
    service: "Drone & Heavy-Lift Aerials",
    event_date: "August 2026",
    budget_range: "$5,000 – $10,000",
    message:
      "Documenting a brutalist mountain residence in the Colorado Rockies. Need aerials at sunrise and dusk.",
    status: "booked",
    notes: "Contract signed, deposit received",
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
];


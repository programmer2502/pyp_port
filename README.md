# PYP Studio — Photography & Films Portfolio + Admin CMS

An editorial-brutalist portfolio website and dedicated content management system built for **PYP Studio**, a commercial and editorial photography and videography studio.

## ✨ Features

- **Public Showcase**:
  - **Home**: Hero with signature display typography, selected work masonry grid with hover previews, capabilities bento, and client testimonials.
  - **Work Archive (`/work`)**: Categorized project showcase (Editorial, Campaign, Architecture, Food, Product, Portrait, Documentary).
  - **The Studio (`/studio`)**: Brooklyn & Berlin studio information, team grid, equipment roster, and production capabilities.
  - **Services (`/services`)**: Comprehensive rate tiers, deliverables, turnaround times, and FAQs.
  - **Contact & Booking (`/contact`)**: Inbound inquiry form with direct WhatsApp, studio booking details, and location metadata.
- **Admin CMS (`/admin`)**:
  - Full-featured dashboard with stat counters, project management, showreel manager, categories, inquiries inbox, and site settings.
  - Demo authentication mode and Supabase Auth integration.
- **Branding & Design**:
  - Near-black editorial ground (`#0A0A0C`), crisp paper-ivory typography (`#F4F4F0`), electric lime accents (`#D4FF3D`), and custom PYP transparent logo branding.
  - Responsive across all viewports (mobile, tablet, desktop).

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.local.example` to `.env.local` and add your Supabase credentials:
```bash
cp .env.local.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the live portfolio.

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Custom Design System Tokens
- **Icons & Animation**: Lucide React, Framer Motion
- **Database & Storage**: Supabase (PostgreSQL, Storage, Auth)
- **Forms & Validation**: React Hook Form, Zod

## 📖 Deployment
Ready for one-click deployment on [Vercel](https://vercel.com). See [SETUP.md](./SETUP.md) for database migration instructions and production deployment steps.

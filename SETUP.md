# PYP Studio — Setup & Deployment Guide

This guide walks you through setting up **PYP** (Photography & Videography Portfolio + Admin CMS) with Next.js 16, Supabase, and Vercel.

---

## 1. Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- A free [Supabase](https://supabase.com) account
- A free [Vercel](https://vercel.com) account (for production deployment)

---

## 2. Setting Up Supabase

### Step 2.1: Create a New Supabase Project
1. Log in to [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **New Project**.
3. Choose an organization, enter a name (e.g. `pyp-studio`), set a secure database password, and select your nearest region.
4. Click **Create new project** and wait ~2 minutes for provisioning to finish.

### Step 2.2: Run the SQL Migration
1. In your Supabase Dashboard left sidebar, click **SQL Editor**.
2. Click **+ New Query**.
3. Copy the entire contents of [`supabase/migration.sql`](./supabase/migration.sql) from this project.
4. Paste the SQL into the editor and click **Run** (or `Ctrl+Enter` / `Cmd+Enter`).
5. This creates:
   - All 8 tables (`categories`, `projects`, `project_media`, `services`, `testimonials`, `stats`, `inquiries`, `showreel`, `site_settings`)
   - The public storage bucket `pyp-media`
   - Complete Row-Level Security (RLS) policies
   - Realistic seed content with 8 projects, services, showreel, and testimonials.

### Step 2.3: Create Your Admin User
1. In your Supabase Dashboard left sidebar, click **Authentication** -> **Users**.
2. Click **Add user** -> **Create user**.
3. Enter:
   - **Email**: `admin@pypstudio.com` (or your preferred admin email)
   - **Password**: Choose a secure password
   - Check **Auto Confirm User?** so you don't need email confirmation.
4. Click **Create user**.

---

## 3. Configuring Environment Variables

### Exactly where to paste credentials:

Open or create the file `.env.local` in the project root (`vareno-studio/.env.local`).

1. In Supabase, go to **Project Settings** (gear icon) -> **API**.
2. Copy your **Project URL** and **anon / public** API key.
3. Paste them into `.env.local`:

```env
# -------------------------------------------------------------
# PYP STUDIO — ENVIRONMENT CONFIGURATION
# -------------------------------------------------------------

# 1. Project URL (found in Supabase Settings -> API -> Project URL)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co

# 2. Public Anon Key (found in Supabase Settings -> API -> Project API Keys -> anon public)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 3. Service Role Key (found in Supabase Settings -> API -> Project API Keys -> service_role secret)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 4. Canonical Site URL (used for sitemap and OpenGraph metadata)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Note**: If you don't have Supabase configured yet, the site automatically operates in **Standalone Local / Demo Mode** with pre-seeded data and 1-click demo sign-in so you can test all features immediately!

---

## 4. Running Locally

Install dependencies (if not already installed) and start the local development server:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser:
- **Public Site**: [http://localhost:3000](http://localhost:3000)
- **Work Archive**: [http://localhost:3000/work](http://localhost:3000/work)
- **Services & Rates**: [http://localhost:3000/services](http://localhost:3000/services)
- **About The Studio**: [http://localhost:3000/about](http://localhost:3000/about)
- **Contact Desk**: [http://localhost:3000/contact](http://localhost:3000/contact)
- **Admin CMS**: [http://localhost:3000/admin](http://localhost:3000/admin) (Sign in with your Supabase credentials, or click **Quick Demo Sign In**)

---

## 5. Building for Production

Test that the production build compiles with zero errors:

```bash
npm run build
```

---

## 6. Deploying to Vercel

1. Push your code to a GitHub / GitLab / Bitbucket repository.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Click **Import** next to your repository.
4. In the **Environment Variables** section, add the same keys from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (set to your production domain, e.g. `https://pypstudio.com`)
5. Click **Deploy**. Vercel will build and deploy your site with global edge CDN caching.

---

## 7. Architecture Overview

- **Public Frontend**: Next.js App Router Server Components with ISR revalidation (`revalidate = 60`).
- **Styling**: Tailwind CSS + custom tokens (`#F3F0E8` paper, `#111111` ink, `#FF4B2B` vermilion, `#D9D5CB` grey, `#0C0C0C` showreel/footer black).
- **Typography**: Bricolage Grotesque (display), Inter (body), JetBrains Mono (labels).
- **Admin CMS**: `/admin` built with clean light UI, dark mode toggle, indigo `#4F46E5` accent, drag-and-drop sortable lists (`@dnd-kit`), form validation (`react-hook-form` + `zod`), and toast notifications (`sonner`).
- **Next.js 16 Proxy**: Uses `src/proxy.ts` for route protection and cookie session validation.
- **Cache Invalidation**: Every admin modification triggers `revalidatePath` to refresh the public site within seconds.


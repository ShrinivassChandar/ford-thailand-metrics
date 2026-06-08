# Ford Thailand Metrics

Internal file management dashboard for Ford Thailand team.

## Quick Start

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for it to initialize (~2 minutes)

### 2. Run Database Schema
1. In your Supabase dashboard, go to **SQL Editor**
2. Paste the contents of `supabase-schema.sql` and click **Run**

### 3. Create Storage Bucket
1. Go to **Storage** in your Supabase dashboard
2. Click **New bucket**
3. Name it: `metrics-files`
4. Check **Public bucket**
5. Click **Save**

### 4. Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. In Supabase dashboard, go to **Settings → API**
3. Copy your **Project URL** and **anon/public key**
4. Fill in `.env`:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

### 5. Run Locally
```bash
npm install
npm run dev
```

### 6. Deploy to Vercel
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Add environment variables in Vercel project settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

### 7. Share the URL
The Vercel deployment URL is your shareable link. Share it with the team — no login required!

## Features
- 4 file categories: Back Order, Over Due, Fill Rate, Inventory
- Upload .csv, .xlsx, .xls files (max 50MB)
- Preview files in-browser with SheetJS
- Multi-sheet Excel preview with tab switching
- Sort, filter, search files
- Real-time updates via Supabase
- Download original files

## Tech Stack
- React + Vite
- Tailwind CSS
- Supabase (database + storage)
- Framer Motion
- SheetJS (xlsx)

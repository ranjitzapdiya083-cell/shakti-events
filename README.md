# Shakti Events — Next.js + Supabase

This is your Shakti Events website rebuilt on a modern stack:

- **Frontend**: Next.js 14 (App Router) — same design, same colors, same layout as your original PHP site, now fully mobile responsive with a collapsible menu
- **Backend/Database**: Supabase (hosted Postgres + file storage) instead of MySQL + local file uploads
- **Auth**: Same idea as before (users table with bcrypt-hashed passwords, `role` = `user`/`admin`), but sessions are secure signed cookies instead of PHP `$_SESSION`
- **Hosting**: Deploys free on Vercel; database + storage free on Supabase. No PHP/MySQL hosting needed ever again.

## What was carried over 1:1
- Every page: Home, About, Services, Gallery, Booking, Contact, Register, Login, User Dashboard
- Full Admin panel: Dashboard stats, Bookings (approve/reject), Services (add/delete), Gallery (add/delete), Users (list/delete)
- Your exact CSS/design — colors, fonts, layout — untouched, just made responsive

## What changed under the hood
- MySQL → Supabase Postgres (schema in `supabase/schema.sql`)
- Local `/uploads` folder → Supabase Storage buckets (`services`, `gallery`) — required because serverless hosts like Vercel have no persistent disk
- PHP `$_SESSION` → signed httpOnly JWT cookies
- `mysqli` queries → `@supabase/supabase-js` calls in Next.js API routes

---

## 1. Set up Supabase (free tier)

1. Go to [supabase.com](https://supabase.com) → New Project (free tier is fine)
2. Once created, go to **SQL Editor** → paste the contents of `supabase/schema.sql` → **Run**
   This creates all 5 tables (`users`, `bookings`, `contacts`, `gallery`, `services`) with the right permissions.
3. Go to **Storage** → create two buckets:
   - `services` → toggle **Public bucket: ON**
   - `gallery` → toggle **Public bucket: ON**
4. Go to **Settings → API** and copy:
   - Project URL
   - `anon` `public` key
   - `service_role` key (keep this secret — never expose it in the browser)

## 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in the values from Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SESSION_SECRET=any-long-random-string
```

You can generate a random `SESSION_SECRET` with: `openssl rand -base64 32`

## 3. Run it locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## 4. Create your first admin account

1. Go to `/register` and sign up normally with your real email
2. In Supabase → **Table Editor** → `users` table, find your row, change `role` from `user` to `admin`
3. Log in at `/admin/login` with that same email/password — you'll land on the admin dashboard

(Your old database's passwords/hashes weren't imported, since some were unhashed test data — starting fresh here is safer.)

## 5. Add your real content

- Go to `/admin/services/add` and `/admin/gallery/add` to upload your actual service and gallery images
  (your original uploaded images are in this project's `uploads/` folders in the old ZIP if you want to re-upload them)

## 6. Deploy for free

**Frontend (Vercel):**
1. Push this project to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → import the repo
3. Add the same environment variables from `.env.local` in Vercel's project settings
4. Deploy — you'll get a free `https://yourproject.vercel.app` URL (custom domains supported free too)

**Backend (Supabase):** already hosted from step 1 — nothing else to deploy.

No PHP, no MySQL, no shared hosting renewal headaches, and it scales automatically.

---

## Project structure

```
app/
  (site)/          → public pages (home, about, services, gallery, booking, contact, login, register, dashboard, logout)
  admin/            → admin panel pages (own layout, no public header/footer)
  api/              → all backend logic (booking, contact, auth, admin CRUD)
components/         → Header, Footer, AdminSidebar, small interactive buttons
lib/                → Supabase clients + session/auth helpers
supabase/schema.sql → run this once in Supabase's SQL Editor
middleware.js       → protects /admin and /dashboard at the edge
```

## Notes
- The original hero background referenced a `hero.mp4` video, but the actual file in your assets folder was a mislabeled JPEG (`hero.bmp`). I used it as a static hero background image. If you have a real hero video, drop it at `public/videos/hero.mp4` and I can wire it back in.
- All service/gallery images you had are copied into `public/images/` for the static home page; new uploads through the admin panel go to Supabase Storage instead.

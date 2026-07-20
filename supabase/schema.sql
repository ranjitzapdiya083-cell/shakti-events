-- =========================================================
-- Shakti Events — Supabase (Postgres) schema
-- Converted from your original shakti_events.sql (MySQL/MariaDB)
--
-- Key differences from the MySQL version:
--   - `image` (local filename) is replaced with `image_url`
--     (a full public URL, since files live in Supabase Storage,
--     not a local /uploads folder on a PHP server)
--   - IDs use Postgres `bigint generated always as identity`
--     instead of MySQL AUTO_INCREMENT
--   - Row Level Security (RLS) is enabled: the public can only
--     READ services/gallery; all writes go through the app's
--     API routes using the service_role key, which bypasses RLS
--
-- HOW TO USE:
--   Supabase Dashboard -> SQL Editor -> paste this file -> Run
-- =========================================================

-- ---------- users ----------
create table if not exists users (
  id bigint generated always as identity primary key,
  fullname varchar(100) not null,
  email varchar(100) not null unique,
  phone varchar(15),
  password text not null,           -- bcrypt hash
  role varchar(10) not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);

-- ---------- bookings ----------
create table if not exists bookings (
  id bigint generated always as identity primary key,
  user_id bigint references users(id) on delete set null,
  full_name varchar(100) not null,
  email varchar(100) not null,
  phone varchar(15) not null,
  event_type varchar(100) not null,
  event_date date not null,
  event_time time not null,
  venue varchar(255) not null,
  guests int,
  budget varchar(50),
  message text,
  status varchar(10) not null default 'Pending' check (status in ('Pending','Approved','Rejected')),
  created_at timestamptz not null default now()
);

-- ---------- contacts ----------
create table if not exists contacts (
  id bigint generated always as identity primary key,
  name varchar(100) not null,
  email varchar(100) not null,
  phone varchar(15),
  subject varchar(200),
  message text,
  created_at timestamptz not null default now()
);

-- ---------- gallery ----------
create table if not exists gallery (
  id bigint generated always as identity primary key,
  title varchar(100),
  image_url text not null,
  created_at timestamptz not null default now()
);

-- ---------- services ----------
create table if not exists services (
  id bigint generated always as identity primary key,
  title varchar(100) not null,
  description text,
  image_url text,
  created_at timestamptz not null default now()
);

-- =========================================================
-- Row Level Security
-- =========================================================

alter table users enable row level security;
alter table bookings enable row level security;
alter table contacts enable row level security;
alter table gallery enable row level security;
alter table services enable row level security;

-- Public (anon key) can only READ services & gallery — used by
-- the Services and Gallery pages directly from the browser/server component.
create policy "public can read services" on services
  for select using (true);

create policy "public can read gallery" on gallery
  for select using (true);

-- No public policies on users, bookings, or contacts —
-- all access to those tables goes through API routes using
-- the service_role key (lib/supabaseAdmin.js), which bypasses RLS entirely.

-- =========================================================
-- Storage buckets for images (run once)
-- =========================================================
-- Go to Supabase Dashboard -> Storage -> Create a new bucket:
--   1) name: "services"   -> Public bucket: ON
--   2) name: "gallery"    -> Public bucket: ON
-- That's it — the app uploads directly to these buckets and
-- stores the resulting public URL in image_url.

-- =========================================================
-- Create your first admin account
-- =========================================================
-- Don't insert a password here directly — passwords must be
-- bcrypt-hashed, and your old dump's hashes/plaintext values
-- won't necessarily match. Instead, after deploying:
--   1. Go to /register and create a normal account
--   2. In Supabase -> Table Editor -> users, change that row's
--      `role` from 'user' to 'admin'
--   3. Log in at /admin/login with that same email/password

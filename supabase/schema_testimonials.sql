-- Run this in your Supabase SQL editor

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  role text not null,
  image_url text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table testimonials enable row level security;

create policy "Public can read active testimonials" on testimonials
  for select using (active = true);

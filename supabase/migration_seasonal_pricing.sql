-- Migration: occupancy-based room pricing + seasonal/festival rate overrides
-- Run this in the Supabase SQL editor (Project → SQL Editor → New query).
-- Safe to run more than once — every statement is additive/idempotent and
-- does not delete or overwrite any existing rows.

-- 1. Base rate table: tag each package with the room occupancy it prices for
--    (1-5 guests). Booking price lookups use this instead of package identity.
alter table packages add column if not exists occupancy integer;

-- Backfill occupancy on the 4 existing sharing-tier packages from their titles.
-- Only fills rows where occupancy is still null, so manual edits are untouched.
update packages set occupancy = 2 where title ilike '%double%' and occupancy is null;
update packages set occupancy = 3 where title ilike '%three%' and occupancy is null;
update packages set occupancy = 4 where title ilike '%four%'  and occupancy is null;
update packages set occupancy = 5 where title ilike '%five%'  and occupancy is null;

-- 2. Seasonal / festival rate windows. Each row is one named date range with
--    its own total room price per occupancy tier (1-5), stored as jsonb:
--    {"1": 7000, "2": 8000, "3": 11000, "4": 13500, "5": 16000}
create table if not exists seasonal_rates (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  start_date date not null,
  end_date date not null,
  rates jsonb not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint seasonal_rates_dates_check check (end_date >= start_date)
);

create index if not exists seasonal_rates_dates_idx on seasonal_rates (start_date, end_date, active);

alter table seasonal_rates enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'seasonal_rates' and policyname = 'Service role full access seasonal_rates'
  ) then
    create policy "Service role full access seasonal_rates" on seasonal_rates
      using (true) with check (true);
  end if;
end $$;

-- 3. Persist the computed price + per-room breakdown on each booking, locked
--    in at the moment the booking is created (never recalculated later).
alter table bookings add column if not exists rooms jsonb not null default '[]';
alter table bookings add column if not exists total_amount integer;

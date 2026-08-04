import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

// Parse .env.local manually
const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf-8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => {
      const [k, ...rest] = l.split("=");
      return [k.trim(), rest.join("=").trim()];
    })
);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

// Additive only: backfills `occupancy` on the existing 4 sharing packages
// (by title match) and inserts a new Single Occupancy tier if missing.
// Does NOT delete or overwrite anything — safe to run against live data.
// Requires supabase/migration_seasonal_pricing.sql to have been run first
// (adds the `occupancy` column to packages).

const OCCUPANCY_BY_TITLE = [
  { match: /double/i, occupancy: 2 },
  { match: /three/i, occupancy: 3 },
  { match: /four/i, occupancy: 4 },
  { match: /five/i, occupancy: 5 },
];

const SINGLE_OCCUPANCY_PACKAGE = {
  number: "00",
  title: "Single Occupancy",
  description:
    "A quiet stay to yourself. Mist-covered hills, a hot cup of coffee by the estate, and an evening bonfire — at your own pace.",
  price: 5000,
  nights: 1,
  occupancy: 1,
  features: [
    { label: "Breakfast" },
    { label: "Evening Snacks & Tea" },
    { label: "Veg / Non-Veg Dinner" },
    { label: "Campfire & Music" },
    { label: "Estate Walk" },
    { label: "Cycling & Tennis" },
    { label: "Carrom & Chess" },
    { label: "BBQ Available" },
  ],
  image_url:
    "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800&q=80&auto=format&fit=crop",
  image_alt: "Solo traveller's quiet room overlooking the coffee estate",
  active: true,
};

async function run() {
  const { data: packages, error: fetchErr } = await supabase.from("packages").select("*");
  if (fetchErr) {
    console.error("Failed to fetch packages:", fetchErr.message);
    console.error("Did you run supabase/migration_seasonal_pricing.sql in the Supabase SQL editor first?");
    process.exit(1);
  }

  for (const pkg of packages) {
    if (pkg.occupancy != null) continue;
    const rule = OCCUPANCY_BY_TITLE.find((r) => r.match.test(pkg.title));
    if (!rule) continue;
    const { error } = await supabase.from("packages").update({ occupancy: rule.occupancy }).eq("id", pkg.id);
    if (error) console.error(`Failed to backfill occupancy for "${pkg.title}":`, error.message);
    else console.log(`Backfilled occupancy=${rule.occupancy} on "${pkg.title}"`);
  }

  const hasSingle = packages.some((p) => p.occupancy === 1);
  if (hasSingle) {
    console.log("Single Occupancy tier already exists — skipping insert.");
  } else {
    const { error } = await supabase.from("packages").insert(SINGLE_OCCUPANCY_PACKAGE);
    if (error) console.error("Failed to insert Single Occupancy package:", error.message);
    else console.log("Inserted Single Occupancy package (₹5,000 / night).");
  }

  console.log("Done.");
}

run();

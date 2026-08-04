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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// Every package offers the same facilities — keep this in sync with the brochure.
const FEATURES = [
  { label: "Breakfast" },
  { label: "Evening Snacks & Tea" },
  { label: "Veg / Non-Veg Dinner" },
  { label: "Campfire & Music" },
  { label: "Estate Walk" },
  { label: "Cycling & Tennis" },
  { label: "Carrom & Chess" },
  { label: "BBQ Available" },
];

async function sync() {
  const { data: existing, error: readErr } = await supabase
    .from("packages")
    .select("id, title, features");

  if (readErr) {
    console.error("Read failed:", readErr.message);
    process.exit(1);
  }

  console.log(`Found ${existing.length} packages. Updating features (ids preserved)...`);

  for (const pkg of existing) {
    const { error } = await supabase
      .from("packages")
      .update({ features: FEATURES })
      .eq("id", pkg.id);

    if (error) {
      console.error(`  ${pkg.title} — FAILED: ${error.message}`);
      process.exit(1);
    }
    console.log(`  ${pkg.title} — ${pkg.features.length} -> ${FEATURES.length} features`);
  }

  console.log("Done.");
}

sync();

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

const PACKAGES = [
  {
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
  },
  {
    number: "01",
    title: "Double Sharing",
    description:
      "Perfect for couples or two friends. Wake up to mist-covered hills, enjoy a hot cup of coffee by the estate, and end the evening around a bonfire.",
    price: 3000,
    nights: 1,
    occupancy: 2,
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
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80&auto=format&fit=crop",
    image_alt: "Misty forest path at sunrise in Chikmagalur",
    active: true,
  },
  {
    number: "02",
    title: "Three Sharing",
    description:
      "Great for a trio of friends or a small family. Share the calm of the coffee estate, enjoy the cool mountain air and a warm bonfire night together.",
    price: 2850,
    nights: 1,
    occupancy: 3,
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
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80&auto=format&fit=crop",
    image_alt: "Lush green forest canopy in the Western Ghats",
    active: true,
  },
  {
    number: "03",
    title: "Four Sharing",
    description:
      "Ideal for small groups and families. Spend the day exploring the estate, play games under the open sky, and gather around the fire at night.",
    price: 2650,
    nights: 1,
    occupancy: 4,
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
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80&auto=format&fit=crop",
    image_alt: "Sunlight streaming through tall trees in a forest",
    active: true,
  },
  {
    number: "04",
    title: "Five Sharing",
    description:
      "Best value for a larger group. Everyone gets a piece of the mountains — fresh air, great food, evening campfire, and memories to last a lifetime.",
    price: 2500,
    nights: 1,
    occupancy: 5,
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
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop",
    image_alt: "Panoramic view of misty mountain peaks at golden hour",
    active: true,
  },
];

async function seed() {
  console.log("Deleting existing packages...");
  const { error: delErr } = await supabase.from("packages").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (delErr) {
    console.error("Delete failed:", delErr.message);
    process.exit(1);
  }

  console.log("Inserting 4 sharing-tier packages...");
  const { data, error } = await supabase.from("packages").insert(PACKAGES).select();
  if (error) {
    console.error("Insert failed:", error.message);
    process.exit(1);
  }

  console.log(`Done — inserted ${data.length} packages:`);
  data.forEach((p) => console.log(`  ${p.number} ${p.title} — ₹${p.price}/person`));
}

seed();

import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { supabaseAdmin } from "@/lib/supabase";
import type { ApiPackage } from "@/components/PackagesSection";
import { fetchUpcomingSeasonalRates, type UpcomingSeason } from "@/lib/pricing";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.naturekingdomhomestay.com/",
  },
};

async function fetchPackages(): Promise<ApiPackage[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("packages")
      .select("*")
      .order("number");
    if (error) throw error;
    return data ?? [];
  } catch {
    return [];
  }
}

async function fetchSeasons(): Promise<UpcomingSeason[]> {
  try {
    return await fetchUpcomingSeasonalRates();
  } catch {
    return [];
  }
}

export default async function Page() {
  const [packages, upcomingSeasons] = await Promise.all([fetchPackages(), fetchSeasons()]);
  return <HomePage initialPackages={packages} upcomingSeasons={upcomingSeasons} />;
}

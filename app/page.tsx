import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { supabaseAdmin } from "@/lib/supabase";
import type { ApiPackage } from "@/components/PackagesSection";

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

export default async function Page() {
  const packages = await fetchPackages();
  return <HomePage initialPackages={packages} />;
}

import type { Metadata } from "next";
import LocationSection from "@/components/LocationSection";
import StayInfoShell from "@/components/StayInfoShell";

const BASE_URL = "https://www.naturekingdomhomestay.com";
const PAGE_URL = `${BASE_URL}/stay-info/location/`;

export const metadata: Metadata = {
  title: "Location & Directions — Nature Kingdom Homestay",
  description: "Find Nature Kingdom Homestay at Bommenahalli, Mallenahalli Post, Chikmagalur, Karnataka. Map and directions.",
  alternates: { canonical: PAGE_URL },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Nature Kingdom",
    title: "Location & Directions — Nature Kingdom Homestay",
    description: "Find Nature Kingdom Homestay at Bommenahalli, Mallenahalli Post, Chikmagalur, Karnataka.",
    locale: "en_IN",
  },
};

export default function LocationPage() {
  return (
    <StayInfoShell>
      <LocationSection />
    </StayInfoShell>
  );
}

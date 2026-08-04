import type { Metadata } from "next";
import StayInfoShell from "@/components/StayInfoShell";
import GalleryLightbox from "@/components/GalleryLightbox";
import { STAY_INFO_PHOTOS, STAY_INFO_VIDEOS } from "@/lib/stayInfoMedia";

const BASE_URL = "https://www.naturekingdomhomestay.com";
const PAGE_URL = `${BASE_URL}/stay-info/gallery/`;

export const metadata: Metadata = {
  title: "Photos & Videos — Nature Kingdom Homestay",
  description: "Photos and videos of Nature Kingdom Homestay, Chikmagalur — rooms, dining, the estate, and the property.",
  alternates: { canonical: PAGE_URL },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Nature Kingdom",
    title: "Photos & Videos — Nature Kingdom Homestay",
    description: "Photos and videos of Nature Kingdom Homestay, Chikmagalur.",
    images: [{ url: STAY_INFO_PHOTOS[0], width: 1200, height: 630, alt: "Nature Kingdom Homestay" }],
    locale: "en_IN",
  },
};

export default function GalleryPage() {
  return (
    <StayInfoShell>
      <section className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 pb-10 text-center">
        <span className="text-[10px] tracking-[0.35em] font-semibold text-[#e9c349] uppercase font-sans">
          Nature Kingdom Homestay
        </span>
        <h1 className="font-headline text-4xl sm:text-5xl text-on-surface leading-[1.1] tracking-tight mt-4 mb-5">
          Photos &amp; Videos
        </h1>
        <p className="font-sans font-light text-sm text-on-surface/50 max-w-xl mx-auto leading-relaxed">
          A look at the rooms, the estate, and the property.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 pb-24">
        <GalleryLightbox photos={STAY_INFO_PHOTOS} videos={STAY_INFO_VIDEOS} />
      </section>
    </StayInfoShell>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import StayInfoShell from "@/components/StayInfoShell";
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

function videoPoster(url: string) {
  return url.replace("/upload/", "/upload/so_0/").replace(/\.mp4$/, ".jpg");
}

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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {STAY_INFO_PHOTOS.map((src, i) => (
            <div key={src} className="relative aspect-square overflow-hidden border border-white/5">
              <Image
                src={src}
                alt={`Nature Kingdom Homestay photo ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <h2 className="font-headline text-xl sm:text-2xl text-on-surface mt-16 mb-6 text-center">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STAY_INFO_VIDEOS.map((src) => (
            <video
              key={src}
              controls
              preload="none"
              playsInline
              poster={videoPoster(src)}
              className="w-full aspect-video border border-white/5 bg-black"
            >
              <source src={src} type="video/mp4" />
            </video>
          ))}
        </div>
      </section>
    </StayInfoShell>
  );
}

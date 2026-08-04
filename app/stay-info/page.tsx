import type { Metadata } from "next";
import StayInfoShell from "@/components/StayInfoShell";
import { STAY_INFO_PHOTOS } from "@/lib/stayInfoMedia";

const BASE_URL = "https://www.naturekingdomhomestay.com";
const PAGE_URL = `${BASE_URL}/stay-info/`;

export const metadata: Metadata = {
  title: "Photos, Rates & Booking Details — Nature Kingdom Homestay",
  description:
    "Everything you need for your stay at Nature Kingdom Homestay, Chikmagalur — photos, videos, room rates, location, and payment details in one place.",
  alternates: { canonical: PAGE_URL },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Nature Kingdom",
    title: "Photos, Rates & Booking Details — Nature Kingdom Homestay",
    description:
      "Photos, videos, rates, location, and payment details for your stay at Nature Kingdom Homestay, Chikmagalur.",
    images: [{ url: STAY_INFO_PHOTOS[0], width: 1200, height: 630, alt: "Nature Kingdom Homestay" }],
    locale: "en_IN",
  },
};

const links = [
  {
    href: "/stay-info/gallery",
    title: "Photos & Videos",
    desc: "Rooms, dining, the estate, and the property.",
  },
  {
    href: "/stay-info/rates",
    title: "Rates & Packages",
    desc: "Current pricing for every stay option.",
  },
  {
    href: "/stay-info/location",
    title: "Location",
    desc: "Map, address, and how to reach us.",
  },
  {
    href: "/stay-info/payment",
    title: "Payment Details",
    desc: "UPI and bank transfer information.",
  },
];

export default function StayInfoPage() {
  return (
    <StayInfoShell>
      <section className="max-w-[900px] mx-auto px-6 sm:px-12 py-10 sm:py-16 text-center">
        <span className="text-[10px] tracking-[0.35em] font-semibold text-[#e9c349] uppercase font-sans">
          Nature Kingdom Homestay
        </span>
        <h1 className="font-headline text-4xl sm:text-5xl text-on-surface leading-[1.1] tracking-tight mt-4 mb-5">
          Everything for Your Stay
        </h1>
        <p className="font-sans font-light text-sm sm:text-base text-on-surface/50 max-w-xl mx-auto leading-relaxed mb-14">
          Pick what you need below — each link opens on its own page, easy to share separately.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="border border-white/10 p-7 hover:border-[#e9c349]/40 transition-colors duration-300 group"
            >
              <h2 className="font-headline text-xl text-on-surface mb-2 group-hover:text-[#e9c349] transition-colors duration-300">
                {l.title}
              </h2>
              <p className="font-sans font-light text-xs text-on-surface/45 leading-relaxed">{l.desc}</p>
            </a>
          ))}
        </div>
      </section>
    </StayInfoShell>
  );
}

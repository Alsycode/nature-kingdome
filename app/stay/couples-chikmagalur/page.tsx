import type { Metadata } from "next";
import FAQ, { type FaqItem } from "@/components/FAQ";
import LuxuryFooter from "@/components/LuxuryFooter";

const BASE_URL = "https://www.naturekingdomhomestay.com";
const PAGE_URL = `${BASE_URL}/stay/couples-chikmagalur/`;

export const metadata: Metadata = {
  title: "Resort in Chikmagalur for Couples — Nature Kingdom",
  description:
    "A private nature stay in Chikmagalur for couples — bonfire evenings, coffee estate mornings, and mountain silence. Nature Kingdom, Bommenahalli, Karnataka.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Nature Kingdom",
    title: "Resort in Chikmagalur for Couples — Nature Kingdom",
    description:
      "A private nature stay for couples in Chikmagalur. Bonfire evenings, coffee estate mornings, and the Western Ghats beyond your terrace.",
    images: [
      {
        url: "/assets/nightvilla.png",
        width: 1200,
        height: 630,
        alt: "Nature Kingdom resort at night, Chikmagalur — a couples retreat in the Western Ghats",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resort in Chikmagalur for Couples — Nature Kingdom",
    description:
      "Bonfire evenings, coffee estate mornings, mountain silence. A private nature stay for couples in Chikmagalur, Karnataka.",
    images: ["/assets/nightvilla.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Nature Kingdom",
      item: `${BASE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Couples Stay in Chikmagalur",
      item: PAGE_URL,
    },
  ],
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Is Nature Kingdom suitable for a honeymoon in Chikmagalur?",
    a: "Yes — the private property, enclosed setting, and evening bonfires make it a natural fit for honeymooners. There are no other guests sharing the space, no common lobby to navigate. If you let us know you're on your honeymoon when booking, we'll make small arrangements to mark the occasion. Most couples find the combination of coffee estate walks, bonfire evenings, and quiet mountain mornings is exactly what they were looking for.",
  },
  {
    q: "What is included in a couples stay at Nature Kingdom?",
    a: "Your stay includes private accommodation, all meals prepared on the property, a bonfire set up each evening, a living room and dining area, a flat-screen TV, housekeeping, parking, power backup, and a terrace with open hillside views. BBQ can be arranged on request for an additional charge. The coffee estate surrounds the property — you can walk through it freely at any hour. Check-in is at 12 PM and check-out at 11 AM.",
  },
  {
    q: "How far is Chikmagalur from Bangalore for a couples weekend?",
    a: "Nature Kingdom is approximately 250 kilometres from Bangalore — around 5 to 6 hours by road via the Nelamangala–Hassan highway (NH75). Most couples leave on Friday evening or early Saturday morning, arrive for lunch, and spend two nights before returning on Sunday. Leaving Bangalore before 7 AM means you arrive with the full first day ahead of you.",
  },
  {
    q: "Can you arrange something special for an anniversary?",
    a: "Yes — tell us when you book and describe what would feel meaningful to you. We don't offer fixed anniversary packages with preset decorations. What we offer is genuine effort: a particular dinner setup, a bonfire set for a specific hour, fresh flowers from the estate, or simply making sure your room is ready well before noon on arrival day. Tell us what would feel right and we will do what we can.",
  },
  {
    q: "What is the best time for a couples trip to Chikmagalur?",
    a: "September through February is the most popular window — the coffee harvest runs from November, the air is cool, and the skies are clear enough for stargazing from the terrace. March to May is quieter and pleasantly warm. The monsoon (June to August) brings spectacular waterfalls and deep green estates, though some roads become difficult and certain trekking routes close. Nature Kingdom is open year-round.",
  },
];

const nearbyPlaces = [
  {
    place: "Mullayanagiri",
    dist: "~45 km · ~1 hr",
    detail:
      "Karnataka's highest peak at 1,930 metres. A sunrise trek if you're early risers — the views above the cloud line are worth it.",
  },
  {
    place: "Jhari Falls",
    dist: "~30 km · ~45 min",
    detail:
      "Quieter than the well-known waterfalls in the region. Few visitors on weekdays — a good choice if you prefer to have a spot to yourselves.",
  },
  {
    place: "Hirekolale Lake",
    dist: "~32 km · ~50 min",
    detail:
      "A still mountain lake that catches the last light spectacularly. The drive through coffee and cardamom estates is half the point.",
  },
  {
    place: "Baba Budangiri",
    dist: "~40 km · ~1 hr",
    detail:
      "A sacred range with wide open ridgeline views. Less visited than Mullayanagiri and more atmospheric on overcast mornings.",
  },
  {
    place: "Kemmanagundi",
    dist: "~55 km · ~1.5 hr",
    detail:
      "The old Krishnaraja Wadiyar summer retreat. Good walking trails, rose gardens, and a hillside viewpoint called Z Point.",
  },
  {
    place: "Manikyadhara Falls",
    dist: "~65 km · ~2 hr",
    detail:
      "A two-tier waterfall reached via a short mountain walk. Best visited in the morning before the tourist buses arrive.",
  },
];

export default function CouplesChikmagalurPage() {
  return (
    <div className="bg-surface text-on-surface font-sans antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Simple nav ── */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 sm:px-12 py-6 bg-surface border-b border-on-surface/5">
        <a
          href="/"
          className="text-[10px] tracking-[0.35em] text-[#e9c349] uppercase font-sans hover:opacity-70 transition-opacity duration-300"
        >
          ← Nature Kingdom
        </a>
        <a
          href="/book"
          className="btn-editorial px-5 py-2.5 text-[10px] tracking-[0.25em] text-[#e9c349]"
        >
          Book Your Stay
        </a>
      </header>

      <main>
        {/* ─────────────────────────────────────────
            Hero / H1
        ───────────────────────────────────────── */}
        <section className="pt-36 pb-20 sm:pt-44 sm:pb-28 px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <span className="text-[10px] tracking-[0.4em] text-[#e9c349] uppercase font-sans font-semibold block mb-6">
                Couples Stays · Chikmagalur, Karnataka
              </span>
              <h1 className="font-headline text-4xl sm:text-5xl lg:text-[3.5rem] text-on-surface leading-[1.1] tracking-tight mb-8">
                A Nature Resort in Chikmagalur for Couples — Coffee Estates, Bonfires, and Mountain Mornings
              </h1>
              <p className="font-sans font-light text-base sm:text-lg text-on-surface/60 leading-[1.85] mb-5 max-w-2xl">
                Most couples arriving in Chikmagalur are here to slow down. Somewhere between Bangalore's
                noise and the long highway north, something shifts — the coffee estate rows appear, the mist
                thickens, and the phone signal weakens. Most guests quietly decide that's fine.
              </p>
              <p className="font-sans font-light text-base text-on-surface/60 leading-[1.85] mb-10 max-w-2xl">
                Nature Kingdom is a private property in Bommenahalli, surrounded by coffee and spice
                plantations at the edge of the Western Ghats. No lobby, no other guests at breakfast, no
                shared pool. Just the two of you, the estate, and whatever you choose to do with your days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/book"
                  className="btn-editorial inline-block px-10 py-4 text-xs tracking-[0.25em] text-[#e9c349]"
                >
                  Reserve Your Stay
                </a>
                <a
                  href="/"
                  className="inline-block px-10 py-4 text-xs tracking-[0.25em] uppercase font-sans text-on-surface/40 hover:text-[#e9c349] transition-colors duration-300 border border-on-surface/10 hover:border-[#e9c349]/30"
                >
                  See the Property →
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-on-surface/8 mx-6 sm:mx-12 lg:mx-20" />

        {/* ─────────────────────────────────────────
            Section 1 — The Setting
        ───────────────────────────────────────── */}
        <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <span className="text-[10px] tracking-[0.35em] text-[#e9c349] uppercase font-sans font-semibold block mb-5">
                01 — The Setting
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface leading-tight">
                Private. Quiet. Yours for the Length of Your Stay.
              </h2>
            </div>
            <div className="space-y-5 lg:pt-14">
              <p className="font-sans font-light text-sm sm:text-base text-on-surface/65 leading-[1.85]">
                Most couples choosing a stay in Chikmagalur end up choosing between two kinds of places — a
                hotel that feels like a hotel, or a homestay that feels too informal. Nature Kingdom sits
                somewhere deliberate between the two. The property is enclosed. Meals are cooked inside, not
                catered in from elsewhere. Evenings end at a bonfire in the open courtyard.
              </p>
              <p className="font-sans font-light text-sm sm:text-base text-on-surface/65 leading-[1.85]">
                The terrace looks out over open hillside. On clear mornings between October and February, you
                can watch the mist lift off the coffee rows from your room. No packages, no group excursions,
                no scheduled activities unless you choose them. The pace is yours to set from the moment you
                arrive.
              </p>
              <p className="font-sans font-light text-sm sm:text-base text-on-surface/65 leading-[1.85]">
                The stay includes a living room, dining area, flat-screen TV, full housekeeping, parking,
                power backup, and a private terrace. Bonfire is set up each evening. BBQ can be arranged on
                request for an additional charge. All meals are prepared on the property using seasonal, local Karnataka produce.
              </p>
            </div>
          </div>
        </section>

        <div className="border-t border-on-surface/8 mx-6 sm:mx-12 lg:mx-20" />

        {/* ─────────────────────────────────────────
            Section 2 — What two days look like
        ───────────────────────────────────────── */}
        <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 max-w-xl">
              <span className="text-[10px] tracking-[0.35em] text-[#e9c349] uppercase font-sans font-semibold block mb-5">
                02 — The Experience
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface leading-tight">
                What Two Days at Nature Kingdom Actually Looks Like
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="border-l border-[#e9c349]/30 pl-6 space-y-4">
                <p className="text-[10px] tracking-[0.3em] text-[#e9c349] uppercase font-sans font-semibold">
                  Day One
                </p>
                <p className="font-sans font-light text-sm sm:text-base text-on-surface/65 leading-[1.85]">
                  Most couples arrive around noon and don't actually do much beyond settling in — exploring
                  the property, eating lunch on the terrace, reading or napping through the afternoon. That
                  restfulness is itself the point.
                </p>
                <p className="font-sans font-light text-sm sm:text-base text-on-surface/65 leading-[1.85]">
                  By late afternoon, someone usually wanders out toward the coffee estate. The bonfire starts
                  at whatever hour feels right. BBQ can be arranged for an extra charge if you want it — just
                  let the hosts know in the morning. Dinner is prepared on the property.
                </p>
              </div>
              <div className="border-l border-[#e9c349]/30 pl-6 space-y-4">
                <p className="text-[10px] tracking-[0.3em] text-[#e9c349] uppercase font-sans font-semibold">
                  Day Two
                </p>
                <p className="font-sans font-light text-sm sm:text-base text-on-surface/65 leading-[1.85]">
                  Day two tends to involve getting out. Mullayanagiri — Karnataka's highest peak — is about
                  45 kilometres from Nature Kingdom, roughly an hour's drive. Jhari Falls, quieter and less
                  visited, is around 30 kilometres away.
                </p>
                <p className="font-sans font-light text-sm sm:text-base text-on-surface/65 leading-[1.85]">
                  Most couples spend a morning at one spot and return for lunch, using the afternoon for a
                  plantation walk or simply sitting in the quiet before heading back to Bangalore on Sunday.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-on-surface/8 mx-6 sm:mx-12 lg:mx-20" />

        {/* ─────────────────────────────────────────
            Section 3 — Nearby places with distances
        ───────────────────────────────────────── */}
        <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 max-w-xl">
              <span className="text-[10px] tracking-[0.35em] text-[#e9c349] uppercase font-sans font-semibold block mb-5">
                03 — Beyond the Estate
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface leading-tight mb-4">
                Nearby Chikmagalur — Places Worth the Drive
              </h2>
              <p className="font-sans font-light text-sm sm:text-base text-on-surface/55 leading-relaxed">
                The Western Ghats offer more day options than most guests expect. None of these require a
                guide or advance booking — drive out, walk around, come back.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-on-surface/8 border border-on-surface/8">
              {nearbyPlaces.map(({ place, dist, detail }) => (
                <div key={place} className="bg-surface px-7 py-8">
                  <p className="font-headline text-lg sm:text-xl text-on-surface mb-1">{place}</p>
                  <p className="text-[10px] tracking-[0.22em] text-[#e9c349]/70 uppercase font-sans mb-4">
                    {dist}
                  </p>
                  <p className="font-sans font-light text-xs sm:text-sm text-on-surface/50 leading-relaxed">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="border-t border-on-surface/8 mx-6 sm:mx-12 lg:mx-20" />

        {/* ─────────────────────────────────────────
            Section 4 — Special occasions
        ───────────────────────────────────────── */}
        <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <span className="text-[10px] tracking-[0.35em] text-[#e9c349] uppercase font-sans font-semibold block mb-5">
                04 — Special Occasions
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface leading-tight">
                Anniversaries and Honeymoons in Chikmagalur
              </h2>
            </div>
            <div className="space-y-5 lg:pt-14">
              <p className="font-sans font-light text-sm sm:text-base text-on-surface/65 leading-[1.85]">
                If you are celebrating an anniversary, a birthday, or planning a honeymoon in Chikmagalur,
                tell us when you book. We don't offer a fixed menu of decoration packages. What we offer is
                honest effort.
              </p>
              <p className="font-sans font-light text-sm sm:text-base text-on-surface/65 leading-[1.85]">
                That might mean a particular dinner setup, a bonfire ready at a specific hour, fresh flowers
                from the estate, or simply making sure your room is ready well before noon on the day you
                arrive. Tell us what would feel right and we will do what we can.
              </p>
              <div className="pt-4">
                <a
                  href="/book"
                  className="btn-editorial inline-block px-10 py-4 text-xs tracking-[0.25em] text-[#e9c349]"
                >
                  Book Your Stay
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <FAQ items={FAQ_ITEMS} />

        {/* ─────────────────────────────────────────
            Final CTA
        ───────────────────────────────────────── */}
        <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 bg-[#050505] border-t border-on-surface/5">
          <div className="max-w-2xl mx-auto text-center space-y-7">
            <span className="text-[10px] tracking-[0.4em] text-[#e9c349] uppercase font-sans font-semibold block">
              Reserve Your Stay
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl text-on-surface leading-tight">
              Ready for Chikmagalur?
            </h2>
            <p className="font-sans font-light text-sm sm:text-base text-on-surface/55 leading-relaxed max-w-lg mx-auto">
              Fill in your dates on the booking form and we'll confirm via WhatsApp within 2 hours.
              No payment required until your booking is confirmed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="/book"
                className="btn-editorial inline-block px-12 py-4 text-xs tracking-[0.25em] text-[#e9c349]"
              >
                Check Availability
              </a>
              <a
                href="/"
                className="inline-block px-12 py-4 text-xs tracking-[0.25em] uppercase font-sans text-on-surface/40 hover:text-[#e9c349] transition-colors duration-300"
              >
                View the Property →
              </a>
            </div>
          </div>
        </section>
      </main>

      <LuxuryFooter />
    </div>
  );
}

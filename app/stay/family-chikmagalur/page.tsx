import type { Metadata } from "next";
import FAQ, { type FaqItem } from "@/components/FAQ";
import LuxuryFooter from "@/components/LuxuryFooter";

const BASE_URL = "https://www.naturekingdomhomestay.com";
const PAGE_URL = `${BASE_URL}/stay/family-chikmagalur/`;

export const metadata: Metadata = {
  title: "Family Resort in Chikmagalur — Nature Kingdom",
  description:
    "A private, enclosed property in Bommenahalli — no shared spaces, open grounds for children, and a quiet that lets families actually slow down. Nature Kingdom, Chikmagalur.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Nature Kingdom",
    title: "Family Resort in Chikmagalur — Nature Kingdom",
    description:
      "Private property, no shared spaces, open grounds for children, and the quiet of the Western Ghats. Nature Kingdom is a family stay in Chikmagalur that lets everyone breathe.",
    images: [
      {
        url: "/assets/nightvilla.png",
        width: 1200,
        height: 630,
        alt: "Nature Kingdom — a family stay in Chikmagalur, Karnataka",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Family Resort in Chikmagalur — Nature Kingdom",
    description:
      "Private, enclosed, no shared spaces. Children outdoors. Parents finally resting. Nature Kingdom is a family stay in Chikmagalur worth the drive from Bangalore.",
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
      name: "Family Stay in Chikmagalur",
      item: PAGE_URL,
    },
  ],
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Is Nature Kingdom suitable for families with young children?",
    a: "Yes. Nature Kingdom is a private, enclosed property — the entire space is yours for the duration of your stay. There are no other guests on the grounds, no shared lobbies, no swimming pool hazards, and no busy roads running through the property. Children can move freely outdoors. The grounds are open and relatively flat, with the coffee estate a short walk away for those who want to explore. Parents consistently tell us that being able to let children outside without constant supervision is the part they value most.",
  },
  {
    q: "What meals are available for children?",
    a: "Meals are prepared on the property using local Karnataka produce. The kitchen can accommodate simple meals for children — rice, dal, rotis, eggs, and fresh fruit are all available. If your children have specific preferences or dietary needs, let us know when you book and we will prepare accordingly. Breakfast is included with your stay. Lunch and dinner can be arranged on request. There is no fixed menu — the meals adapt to who is staying.",
  },
  {
    q: "What can kids do at Nature Kingdom?",
    a: "The outdoors is the main draw. Children can explore the coffee and spice estate on the property, collect fallen pods, and spend time in the open grounds. Evenings around the bonfire are a favourite — the fire, the dark sky above the estate, and the quiet tend to hold children's attention in a way that screens rarely do. For day trips, Hirekolale Lake (around 20 km) is calm and approachable for all ages. Jhari Falls is a short walk from the road and works well with children. Mullayanagiri, Karnataka's highest peak, has a motorable road to the summit — no serious hiking required.",
  },
  {
    q: "What is the best time for a family trip to Chikmagalur?",
    a: "October through February is the most comfortable window for families. The weather is cool but not cold, the skies are clear, and the roads are in good condition after the monsoon. The coffee harvest runs November through January — the estate is in full activity during this period and children find it genuinely interesting to watch. If you can manage a school holiday trip during this period, the evenings are cold enough for a bonfire to feel properly necessary rather than decorative. March through May is warmer but still pleasant. Avoid the peak monsoon months (June through August) if you are travelling with young children, as some roads become difficult.",
  },
  {
    q: "How far is Nature Kingdom from Bangalore for a family weekend?",
    a: "Bangalore to Nature Kingdom is approximately 260 to 270 kilometres, depending on the route. The most direct way is via NH75 through Hassan, continuing towards Chikmagalur and then to Bommenahalli. The drive takes 5 to 6 hours in normal traffic — manageable for a Friday evening departure or an early Saturday morning start. Most families from Bangalore arrive in time for lunch on Saturday and leave after breakfast on Monday, which gives a full weekend without a rushed schedule. The drive itself passes through good roads and the final stretch through the coffee estate routes is pleasant.",
  },
];

const days = [
  {
    label: "Day 1",
    heading: "Arrive, Unpack, Breathe",
    desc: "Most families arrive by early afternoon. Lunch on the property. Let the children find the grounds. Explore the edge of the estate before the light fades. Bonfire at sunset — this is the moment the weekend properly begins.",
  },
  {
    label: "Day 2",
    heading: "The Estate and a Waterfall",
    desc: "Morning walk through the coffee rows while the air is still cool. After breakfast, drive to Jhari Falls — around 30 km away, a short walk from the road, manageable with children. Back for lunch, then a slow afternoon. BBQ available in the evening for an extra charge, on request.",
  },
  {
    label: "Day 3",
    heading: "Mountains and Home",
    desc: "Early start to Mullayanagiri — Karnataka's highest peak, around 45 km. The road goes most of the way up. Back by midday for a final lunch. Check-out at 11 AM, or stay for lunch if you book ahead. The drive home feels different after two days of quiet.",
  },
];

export default function FamilyChikmagalurPage() {
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
                Family Stays · Chikmagalur, Karnataka
              </span>
              <h1 className="font-headline text-4xl sm:text-5xl lg:text-[3.5rem] text-on-surface leading-[1.1] tracking-tight mb-8">
                A Family Stay in Chikmagalur — Private Grounds, Open Air, and Two Nights of Actual Rest
              </h1>
              <p className="font-sans font-light text-base sm:text-lg text-on-surface/60 leading-[1.85] mb-5 max-w-2xl">
                Most family trips involve a hotel corridor, a shared pool, and the constant awareness of
                other guests. Chikmagalur can be different — and Nature Kingdom is what that difference
                looks like in practice.
              </p>
              <p className="font-sans font-light text-base text-on-surface/60 leading-[1.85] mb-10 max-w-2xl">
                Nature Kingdom is a private homestay in Bommenahalli — the property is yours alone for
                your entire stay. No other guests. No shared spaces. Open grounds where children can move
                freely. Coffee estate rows running to the edge of the fence. This is a family resort in
                Chikmagalur that does not feel like a resort at all — it feels like staying at someone's
                home in the mountains.
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
            Section 1 — Why it works for families
        ───────────────────────────────────────── */}
        <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <span className="text-[10px] tracking-[0.35em] text-[#e9c349] uppercase font-sans font-semibold block mb-5">
                01 — Why It Works
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface leading-tight">
                Private Property, Enclosed Grounds, and No One Else's Schedule
              </h2>
            </div>
            <div className="space-y-5 lg:pt-14">
              <p className="font-sans font-light text-sm sm:text-base text-on-surface/65 leading-[1.85]">
                When you book Nature Kingdom, the property is entirely yours. No other guests arrive during
                your stay. There is no shared dining area, no common pool, no lobby with strangers — just
                the house, the terrace, the grounds, and the estate beyond the fence. For families with
                children, this changes the texture of the whole trip.
              </p>
              <p className="font-sans font-light text-sm sm:text-base text-on-surface/65 leading-[1.85]">
                The grounds are open and the property is enclosed. Children can be outside — running,
                exploring the edge of the coffee estate, picking up fallen pods, watching birds — without
                parents following at every step. That kind of freedom is harder to find at a larger resort,
                where the grounds are shared and the busy road is near.
              </p>
              <p className="font-sans font-light text-sm sm:text-base text-on-surface/65 leading-[1.85]">
                The house has a living room, a terrace, a dining area, and a flat TV for evenings when
                the children need a quieter end to the day. Power backup means there are no outages to
                manage. Parking is on-site. The small details that make a family trip functional are
                taken care of — so you can pay attention to the parts that actually matter.
              </p>
            </div>
          </div>
        </section>

        <div className="border-t border-on-surface/8 mx-6 sm:mx-12 lg:mx-20" />

        {/* ─────────────────────────────────────────
            Section 2 — The weekend rhythm
        ───────────────────────────────────────── */}
        <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 max-w-xl">
              <span className="text-[10px] tracking-[0.35em] text-[#e9c349] uppercase font-sans font-semibold block mb-5">
                02 — The Weekend
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface leading-tight mb-4">
                What a Family Weekend at Nature Kingdom Looks Like
              </h2>
              <p className="font-sans font-light text-sm sm:text-base text-on-surface/55 leading-relaxed">
                A three-day weekend from Bangalore gives you two full days on the property and one long
                drive through the Western Ghats. Here is how most families spend them.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-on-surface/8 border border-on-surface/8">
              {days.map(({ label, heading, desc }) => (
                <div key={label} className="bg-surface px-7 py-8">
                  <p className="text-[10px] tracking-[0.25em] text-[#e9c349]/70 uppercase font-sans mb-3">
                    {label}
                  </p>
                  <p className="font-headline text-lg text-on-surface mb-4">{heading}</p>
                  <p className="font-sans font-light text-xs sm:text-sm text-on-surface/50 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="border-t border-on-surface/8 mx-6 sm:mx-12 lg:mx-20" />

        {/* ─────────────────────────────────────────
            Section 3 — Nearby attractions for kids
        ───────────────────────────────────────── */}
        <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <span className="text-[10px] tracking-[0.35em] text-[#e9c349] uppercase font-sans font-semibold block mb-5">
                03 — Nearby Attractions
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface leading-tight">
                Places That Work Well With Children
              </h2>
            </div>
            <div className="space-y-5 lg:pt-14">
              <p className="font-sans font-light text-sm sm:text-base text-on-surface/65 leading-[1.85]">
                The Chikmagalur region has more within an easy drive than most families expect — and
                several of the best spots are genuinely accessible with children in tow.
              </p>
              <div className="space-y-4">
                {[
                  {
                    place: "Hirekolale Lake",
                    dist: "~20 km · ~30 min",
                    note: "A calm, flat lake with mountains behind it. Good for young children — no steep paths, no current.",
                  },
                  {
                    place: "Jhari Falls",
                    dist: "~30 km · ~45 min",
                    note: "Short walk from the road. Quiet on weekdays. Children can get to the base without difficulty.",
                  },
                  {
                    place: "Mullayanagiri",
                    dist: "~45 km · ~1 hr",
                    note: "Karnataka's highest peak. A motorable road reaches the top — older children can walk the final stretch.",
                  },
                  {
                    place: "Baba Budangiri",
                    dist: "~40 km · ~1 hr",
                    note: "A sacred range with a good road through it. The drive itself through the mist is worth making.",
                  },
                ].map(({ place, dist, note }) => (
                  <div
                    key={place}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-3 border-b border-on-surface/8"
                  >
                    <p className="font-headline text-base text-on-surface w-40 flex-shrink-0">{place}</p>
                    <p className="text-[10px] tracking-[0.2em] text-[#e9c349]/60 uppercase font-sans w-28 flex-shrink-0">
                      {dist}
                    </p>
                    <p className="font-sans font-light text-xs text-on-surface/45 leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-on-surface/8 mx-6 sm:mx-12 lg:mx-20" />

        {/* ─────────────────────────────────────────
            Section 4 — Practical info
        ───────────────────────────────────────── */}
        <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <span className="text-[10px] tracking-[0.35em] text-[#e9c349] uppercase font-sans font-semibold block mb-5">
                04 — Practical Details
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface leading-tight">
                Meals, Space, and What Families Usually Ask Before Booking
              </h2>
            </div>
            <div className="space-y-5 lg:pt-14">
              <div className="space-y-6">
                {[
                  {
                    heading: "Meals for children",
                    body: "The kitchen prepares food to order using local Karnataka produce. Simple meals for children — rice, dal, roti, eggs, fresh fruit — are always available. If your family has specific needs, tell us when you book. Breakfast is included. Lunch and dinner are arranged on request.",
                  },
                  {
                    heading: "Space",
                    body: "The property has a living room, dining area, terrace, and open grounds. There is enough space for children to be in a different part of the property from the adults. It is not a small apartment — it is a house with room to breathe.",
                  },
                  {
                    heading: "Parking and access",
                    body: "On-site parking for your vehicle. The road to the property is accessible by standard cars — no off-road driving required. Power backup ensures there are no outages during your stay.",
                  },
                  {
                    heading: "Check-in and check-out",
                    body: "Check-in from 12:00 PM. Check-out by 11:00 AM. If you need a late check-out, contact us in advance and we will do our best to accommodate.",
                  },
                ].map(({ heading, body }) => (
                  <div key={heading} className="border-l border-[#e9c349]/30 pl-6">
                    <p className="font-headline text-base text-on-surface mb-2">{heading}</p>
                    <p className="font-sans font-light text-xs sm:text-sm text-on-surface/55 leading-relaxed">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
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
              Reserve Your Family Stay
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl text-on-surface leading-tight">
              The Whole Property. Just Your Family.
            </h2>
            <p className="font-sans font-light text-sm sm:text-base text-on-surface/55 leading-relaxed max-w-lg mx-auto">
              Fill in your dates and we will confirm via WhatsApp within 2 hours. No payment required
              until your booking is confirmed.
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

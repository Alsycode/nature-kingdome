import type { Metadata } from "next";
import FAQ, { type FaqItem } from "@/components/FAQ";
import LuxuryFooter from "@/components/LuxuryFooter";

const BASE_URL = "https://www.naturekingdomhomestay.com";
const PAGE_URL = `${BASE_URL}/stay/coffee-estate-chikmagalur/`;
const IMG = "/assets/nightvilla.png";

export const metadata: Metadata = {
  title: "Coffee Estate Stay in Chikmagalur — Nature Kingdom",
  description:
    "Wake up inside a working coffee and spice plantation in Chikmagalur. Nature Kingdom sits in Bommenahalli, Karnataka — surrounded by Arabica estate rows, mist, and the Western Ghats.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Nature Kingdom",
    title: "Coffee Estate Stay in Chikmagalur — Nature Kingdom",
    description:
      "A nature homestay set inside a working coffee plantation in Chikmagalur, Karnataka. Walk the estate rows at dawn, watch the harvest, and end the day at a bonfire.",
    images: [
      {
        url: "/assets/nightvilla.png",
        width: 1200,
        height: 630,
        alt: "Nature Kingdom — a coffee estate stay in Chikmagalur, Karnataka",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coffee Estate Stay in Chikmagalur — Nature Kingdom",
    description:
      "Wake up inside a working coffee plantation in Chikmagalur. Estate walks, harvest season, bonfire evenings — Nature Kingdom, Bommenahalli, Karnataka.",
    images: ["/assets/nightvilla.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Nature Kingdom", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Coffee Estate Stay in Chikmagalur", item: PAGE_URL },
  ],
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is a coffee estate stay in Chikmagalur?",
    a: "Chikmagalur is one of India's oldest coffee-growing regions. A coffee estate stay means sleeping on or directly beside a working plantation — not a resort with coffee as a theme, but a property where the estate rows start a few metres from your terrace. At Nature Kingdom, the surrounding plantation grows Arabica coffee, pepper, cardamom, and other spices. You can walk the rows, watch the harvest if you visit between November and January, and understand the landscape that produces your morning cup.",
  },
  {
    q: "Can I see the coffee harvesting process during my stay?",
    a: "Yes, if you visit between November and January. The Chikmagalur coffee harvest runs through these months — the red cherries are at their peak ripeness and the estate is in full activity. You can walk the rows, see the picking process, and observe the beginning stages of coffee processing. Outside harvest season, the plantation is still fully alive — the bushes, the shade trees above them, and the smell of the crop on cool mornings are present year-round.",
  },
  {
    q: "What is the best time to visit Chikmagalur for a coffee estate experience?",
    a: "November through January is the peak harvest window — the most active time on the plantation and the most dramatic season in the Western Ghats. The air is cold, the skies are clear, and the evenings are cold enough for a bonfire to feel essential. September and October are the pre-harvest months — the estates are deeply green and quieter. February to May is post-harvest, with pleasant weather and fewer visitors. The monsoon (June–August) turns the plantation extraordinarily green but some roads become difficult.",
  },
  {
    q: "Can I walk through the coffee plantation at Nature Kingdom?",
    a: "Yes — the estate surrounds the property and you can walk through it freely. A full walk through the rows takes around 30 to 45 minutes. Early morning, before 9 AM, is the best time: the air is cold, the light is soft through the shade trees, and the estate is quiet before the day begins. There are no guided tours or scheduled times — you go when it suits you.",
  },
  {
    q: "How far is Nature Kingdom from Chikmagalur town?",
    a: "Nature Kingdom is in Bommenahalli, Mallenahalli Post — approximately 20 to 25 kilometres from Chikmagalur town, around 35 to 45 minutes by road through the coffee and spice estate routes. The drive itself is part of the arrival experience. The property is far enough from town to feel genuinely away, close enough that you can reach any attraction or pick up supplies without a long detour.",
  },
];

const seasons = [
  {
    label: "Pre-harvest",
    months: "Sep — Oct",
    symbol: "☽",
    desc: "Dry days and warm nights. Ideal for walks through the estate. Comfort trails, fresh air and no wet.",
  },
  {
    label: "Peak harvest",
    months: "Nov — Jan",
    symbol: "✿",
    desc: "Ripe cherries at their best. Mornings in the rows, afternoons with freshly roasted estate coffee.",
  },
  {
    label: "Post-harvest",
    months: "Feb — May",
    symbol: "☀",
    desc: "Clear skies and silver in air. Fewer visitors and quiet season. The property's most slow.",
  },
  {
    label: "Monsoon",
    months: "Jun — Aug",
    symbol: "☁",
    desc: "The plantation is lush and alive. Extraordinary monsoon showers nourish the soil. Some roads become difficult.",
  },
];

const dayRhythm = [
  { time: "5:30 AM", symbol: "○", label: "Mist over the estate. Birding and the first light." },
  { time: "7:00 AM", symbol: "◎", label: "Fresh filter coffee on the verandah." },
  { time: "10:00 AM", symbol: "◌", label: "Walk the rows. Understand the estate, the soil and the stories." },
  { time: "1:00 PM", symbol: "◉", label: "Estate lunch. Simple, local and always fresh." },
  { time: "7:00 PM", symbol: "◆", label: "Bonfire under the stars. Quiet that stays with you." },
];

const nearby = [
  { place: "Mullayanagiri", dist: "46 KM", time: "1.5 HR", note: "Karnataka's highest peak. Walk the wooden steps.", pos: "top" },
  { place: "Jhari Falls", dist: "28 KM", time: "1 HR", note: "Tallest waterfall. The valley is enormous.", pos: "right" },
  { place: "Baba Budangiri", dist: "26 KM", time: "1 HR", note: "The ancient origins where Chikmagalur's coffee story began.", pos: "left" },
  { place: "Kemmanagundi", dist: "42 KM", time: "1.45 HR", note: "Scenic viewpoints, lakes and old-plantation trails.", pos: "bottom" },
];

export default function CoffeeEstateChikmagalurPage() {
  return (
    <div className="bg-[#050505] text-on-surface font-sans antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Nav ── */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 sm:px-12 py-6">
        <a
          href="/"
          className="text-[10px] tracking-[0.35em] text-[#C8A97E] uppercase font-sans hover:opacity-70 transition-opacity duration-300"
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
            HERO — full-bleed image, text overlaid left
        ───────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Full-bleed background image */}
          <img
            src={IMG}
            alt="Coffee estate at Nature Kingdom, Chikmagalur"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Gradient: solid dark on left fading to transparent right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] from-30% via-[#050505]/85 via-60% to-[#050505]/10" />
          <div className="absolute inset-0 bg-black/20" />

          {/* Text — left side */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 pt-32 pb-20">
            <div className="max-w-2xl">
              <span className="text-[9px] tracking-[0.45em] text-[#C8A97E] uppercase font-sans font-semibold block mb-8">
                Coffee Estate Stay → Chikmagalur, Karnataka
              </span>
              <h1 className="font-headline text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[4rem] text-on-surface leading-[1.05] tracking-tight mb-8">
                A Coffee Estate Stay in Chikmagalur — Wake Up Inside a Working Plantation
              </h1>
              <p className="font-sans font-light text-sm sm:text-base text-on-surface/60 leading-[1.85] mb-4">
                Chikmagalur grows some of India's oldest coffee. The first beans arrived here in the 17th
                century, carried across the Arabian Sea by Sufi saint-turned Baba Budan, and the region has
                been producing Arabica and Robusta ever since. Our estate is about 1 hr from town, waking up
                inside it.
              </p>
              <p className="font-sans font-light text-sm text-on-surface/60 leading-[1.85] mb-10">
                Nature Kingdom is in the middle of a working coffee and pepper plantation surrounded by the
                silent music made by the rhythm of the property. Coffee bushes and silver oaks line the
                terrain. On clear mornings, before the mist lifts, you can smell the crop on the air. This is
                where a coffee estate stay in Chikmagalur actually means — not a resort near coffee country,
                but a property that lives it.
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
                  className="inline-block px-10 py-4 text-xs tracking-[0.25em] uppercase font-sans text-on-surface/35 hover:text-[#C8A97E] transition-colors duration-300 border border-[rgba(200,169,126,0.20)] hover:border-[rgba(200,169,126,0.50)]"
                >
                  See the Property →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────
            SECTION 01 — The Plantation
        ───────────────────────────────────────── */}
        <section className="pt-24 sm:pt-32">
          <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <span className="text-[10px] tracking-[0.35em] text-[#C8A97E] uppercase font-sans font-semibold block mb-5">
                  01 — The Plantation
                </span>
                <h2 className="font-headline text-3xl sm:text-4xl text-on-surface leading-tight">
                  Arabica Rows, Pepper Vines, and the Smell of the Crop on the Morning Air
                </h2>
              </div>
              <div className="space-y-5 lg:pt-14">
                <p className="font-sans font-light text-sm sm:text-base text-on-surface/55 leading-[1.85]">
                  The soils of Nature Kingdom grow Arabica coffee alongside pepper, cardamom, and other
                  native plants. It is a working plantation — the same land that has sustained crop for
                  generations.
                </p>
                <p className="font-sans font-light text-sm sm:text-base text-on-surface/55 leading-[1.85]">
                  Shade trees protect the arabica from above the sun's heat, and the crop ripens through
                  the seasons whether gentle rain, or a shower or not.
                </p>
                <p className="font-sans font-light text-sm sm:text-base text-on-surface/55 leading-[1.85]">
                  During the harvest season in November through January — the estate is at its most alive
                  on the bushes. You can watch the picking process, ask questions of the workers, and see
                  the beginning stages of what eventually becomes someone's morning cup.
                </p>
              </div>
            </div>
          </div>

          {/* Full-bleed image strip */}
          <div className="flex gap-0.5 overflow-hidden">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1 aspect-[4/3] overflow-hidden min-w-0">
                <img
                  src={IMG}
                  alt=""
                  aria-hidden
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  style={{ objectPosition: `${10 + i * 20}% center` }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────
            SECTION 02 — The Calendar
        ───────────────────────────────────────── */}
        <section className="py-24 sm:py-32 px-8 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-14 lg:gap-20 items-start">
            <div>
              <span className="text-[10px] tracking-[0.35em] text-[#C8A97E] uppercase font-sans font-semibold block mb-5">
                02 — The Calendar
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface leading-tight mb-5">
                When to Come — The Coffee Estate Through the Year
              </h2>
              <p className="font-sans font-light text-sm text-on-surface/50 leading-relaxed">
                The harvest calendar shapes the character of Chikmagalur more than any other factor.
                Each season on the plantation is distinct.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-px bg-[rgba(200,169,126,0.10)]">
              {seasons.map(({ label, months, symbol, desc }) => (
                <div key={label} className="bg-[#050505] p-6 flex flex-col gap-4">
                  <span className="text-[#C8A97E] text-2xl font-light leading-none">{symbol}</span>
                  <div>
                    <p className="font-headline text-base text-on-surface mb-1">{label}</p>
                    <p className="text-[9px] tracking-[0.22em] text-[#C8A97E] uppercase font-sans">
                      {months}
                    </p>
                  </div>
                  <p className="font-sans font-light text-xs text-on-surface/45 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────
            SECTION 03 — The Rhythm
        ───────────────────────────────────────── */}
        <section className="py-24 sm:py-32 px-8 sm:px-12 lg:px-20 border-t border-[rgba(200,169,126,0.08)]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-14 lg:gap-20 items-start">
            <div>
              <span className="text-[10px] tracking-[0.35em] text-[#C8A97E] uppercase font-sans font-semibold block mb-5">
                03 — The Rhythm
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface leading-tight">
                What a Day on a Coffee Estate Actually Feels Like
              </h2>
            </div>

            <div className="lg:pt-14 overflow-x-auto">
              <div className="grid grid-cols-5 min-w-[480px]">
                {dayRhythm.map(({ time, symbol, label }, i) => (
                  <div
                    key={time}
                    className={`flex flex-col items-center text-center px-4 py-2${
                      i < dayRhythm.length - 1 ? " border-r border-[rgba(200,169,126,0.12)]" : ""
                    }`}
                  >
                    <span className="text-[#C8A97E] text-xl mb-3 leading-none">{symbol}</span>
                    <p className="text-[9px] tracking-[0.2em] text-[#C8A97E] uppercase font-sans mb-3">
                      {time}
                    </p>
                    <p className="font-sans font-light text-[11px] text-on-surface/45 leading-relaxed">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────
            SECTION 04 — Beyond the Estate
        ───────────────────────────────────────── */}
        <section className="py-24 sm:py-32 px-8 sm:px-12 lg:px-20 border-t border-[rgba(200,169,126,0.08)]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-14 lg:gap-20 items-start">
            <div>
              <span className="text-[10px] tracking-[0.35em] text-[#C8A97E] uppercase font-sans font-semibold block mb-5">
                04 — Beyond the Estate
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface leading-tight mb-6">
                The Western Ghats Are Outside the Gate
              </h2>
              <p className="font-sans font-light text-sm text-on-surface/50 leading-relaxed">
                The estate is close enough to explore, far enough to stay undisturbed. Here's what's
                nearby.
              </p>
            </div>

            <div className="flex flex-col items-center">
              {/* Compass graphic */}
              <div className="relative w-80 h-80 mb-12 flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 320 320"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  aria-hidden
                >
                  {/* Outer dashed ring */}
                  <circle
                    cx="160" cy="160" r="148"
                    fill="none" stroke="#C8A97E" strokeWidth="0.5"
                    strokeDasharray="3 7" strokeOpacity="0.25"
                  />
                  {/* Inner solid ring */}
                  <circle
                    cx="160" cy="160" r="72"
                    fill="none" stroke="#C8A97E" strokeWidth="0.8" strokeOpacity="0.40"
                  />
                  {/* Radial lines to 4 points */}
                  <line x1="160" y1="88"  x2="160" y2="12"  stroke="#C8A97E" strokeWidth="0.5" strokeDasharray="2 5" strokeOpacity="0.28" />
                  <line x1="232" y1="160" x2="308" y2="160" stroke="#C8A97E" strokeWidth="0.5" strokeDasharray="2 5" strokeOpacity="0.28" />
                  <line x1="160" y1="232" x2="160" y2="308" stroke="#C8A97E" strokeWidth="0.5" strokeDasharray="2 5" strokeOpacity="0.28" />
                  <line x1="88"  y1="160" x2="12"  y2="160" stroke="#C8A97E" strokeWidth="0.5" strokeDasharray="2 5" strokeOpacity="0.28" />
                  {/* Endpoint dots */}
                  <circle cx="160" cy="12"  r="2.5" fill="#C8A97E" fillOpacity="0.45" />
                  <circle cx="308" cy="160" r="2.5" fill="#C8A97E" fillOpacity="0.45" />
                  <circle cx="160" cy="308" r="2.5" fill="#C8A97E" fillOpacity="0.45" />
                  <circle cx="12"  cy="160" r="2.5" fill="#C8A97E" fillOpacity="0.45" />
                  {/* Center label */}
                  <text x="160" y="156" textAnchor="middle" fill="#C8A97E" fontSize="7"
                    letterSpacing="3" fontFamily="sans-serif" fillOpacity="0.70">NATURE</text>
                  <text x="160" y="169" textAnchor="middle" fill="#C8A97E" fontSize="7"
                    letterSpacing="3" fontFamily="sans-serif" fillOpacity="0.70">KINGDOM</text>
                </svg>

                {/* Top — Mullayanagiri */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
                  <p className="font-sans font-medium text-[11px] text-on-surface/80 whitespace-nowrap tracking-wide">
                    Mullayanagiri
                  </p>
                  <p className="font-sans text-[8px] text-[#C8A97E] tracking-[0.2em] whitespace-nowrap">
                    46 KM / 1.5 HR
                  </p>
                </div>

                {/* Right — Jhari Falls */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-left pl-1">
                  <p className="font-sans font-medium text-[11px] text-on-surface/80 whitespace-nowrap tracking-wide">
                    Jhari Falls
                  </p>
                  <p className="font-sans text-[8px] text-[#C8A97E] tracking-[0.2em] whitespace-nowrap">
                    28 KM / 1 HR
                  </p>
                </div>

                {/* Bottom — Kemmanagundi */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                  <p className="font-sans font-medium text-[11px] text-on-surface/80 whitespace-nowrap tracking-wide">
                    Kemmanagundi
                  </p>
                  <p className="font-sans text-[8px] text-[#C8A97E] tracking-[0.2em] whitespace-nowrap">
                    42 KM / 1.45 HR
                  </p>
                </div>

                {/* Left — Baba Budangiri */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-right pr-1">
                  <p className="font-sans font-medium text-[11px] text-on-surface/80 whitespace-nowrap tracking-wide">
                    Baba Budangiri
                  </p>
                  <p className="font-sans text-[8px] text-[#C8A97E] tracking-[0.2em] whitespace-nowrap">
                    26 KM / 1 HR
                  </p>
                </div>
              </div>

              {/* Attraction list */}
              <div className="w-full mb-10">
                {nearby.map(({ place, dist, time, note }) => (
                  <div
                    key={place}
                    className="flex items-start gap-4 py-3 border-b border-[rgba(200,169,126,0.10)]"
                  >
                    <p className="font-headline text-sm text-on-surface w-36 flex-shrink-0">{place}</p>
                    <p className="text-[9px] tracking-[0.15em] text-[#C8A97E] uppercase font-sans w-28 flex-shrink-0 pt-0.5">
                      {dist} · {time}
                    </p>
                    <p className="font-sans font-light text-xs text-on-surface/40 leading-relaxed">
                      {note}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="/book"
                className="btn-editorial inline-block px-12 py-4 text-xs tracking-[0.25em] text-[#e9c349]"
              >
                Book Your Stay
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <FAQ items={FAQ_ITEMS} />

        {/* ─────────────────────────────────────────
            Final CTA — image bg
        ───────────────────────────────────────── */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <img
            src={IMG}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/72" />
          <div className="relative z-10 text-center px-6 py-24 max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] tracking-[0.4em] text-[#C8A97E] uppercase font-sans font-semibold block">
              Reserve Your Stay
            </span>
            <h2 className="font-headline text-4xl sm:text-6xl text-on-surface leading-tight">
              Stay Inside the Estate.
            </h2>
            <p className="font-sans font-light text-sm text-on-surface/55 leading-relaxed max-w-md mx-auto">
              Fill in your dates and we'll confirm via WhatsApp within 2 hours. No payment required
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
                className="inline-block px-12 py-4 text-xs tracking-[0.25em] uppercase font-sans text-on-surface/40 hover:text-[#C8A97E] transition-colors duration-300"
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

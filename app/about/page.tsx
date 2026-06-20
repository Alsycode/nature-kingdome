"use client";

import { motion } from "motion/react";
import LuxuryFooter from "@/components/LuxuryFooter";

const ease = [0.25, 1, 0.5, 1] as [number, number, number, number];
const IMG = "/assets/nightvilla.png";

/* ── SVG icons ── */
const LeafIcon = () => (
  <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
    <path d="M17 40C17 40 2 27 2 14C2 7.4 8.7 2 17 2C25.3 2 32 7.4 32 14C32 27 17 40 17 40Z" stroke="currentColor" strokeWidth="0.85" />
    <line x1="17" y1="2" x2="17" y2="40" stroke="currentColor" strokeWidth="0.85" />
    <path d="M17 14C12 9 5 10 3 16" stroke="currentColor" strokeWidth="0.85" />
    <path d="M17 24C22 19 29 20 31 26" stroke="currentColor" strokeWidth="0.85" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
    <rect x="4" y="15" width="30" height="21" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <path d="M19 2L2 15H36L19 2Z" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <rect x="14" y="24" width="10" height="12" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <rect x="6" y="19" width="7" height="7" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <rect x="25" y="19" width="7" height="7" stroke="currentColor" strokeWidth="0.85" fill="none" />
  </svg>
);

const PeopleIcon = () => (
  <svg width="46" height="34" viewBox="0 0 46 34" fill="none">
    <circle cx="15" cy="9" r="6" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <circle cx="31" cy="9" r="6" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <path d="M2 32C2 23.7 7.9 17 15 17C22.1 17 28 23.7 28 32" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <path d="M18 32C18 23.7 23.9 17 31 17C38.1 17 44 23.7 44 32" stroke="currentColor" strokeWidth="0.85" fill="none" />
  </svg>
);

const CoupleIcon = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
    <circle cx="11" cy="9" r="5.5" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <circle cx="23" cy="9" r="5.5" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <path d="M1 32C1 24.3 5.6 18 11 18" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <path d="M33 32C33 24.3 28.4 18 23 18" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <path d="M15 24C15 19.5 15.9 18 17 18C18.1 18 19 19.5 19 24" stroke="currentColor" strokeWidth="0.85" fill="none" />
  </svg>
);

const FamilyIcon = () => (
  <svg width="38" height="34" viewBox="0 0 38 34" fill="none">
    <circle cx="11" cy="8" r="5.5" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <circle cx="27" cy="8" r="5.5" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <circle cx="19" cy="11" r="4" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <path d="M1 32C1 23 5 16 11 16C13.5 16 15.7 17.8 17 21" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <path d="M37 32C37 23 33 16 27 16C24.5 16 22.3 17.8 21 21" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <path d="M14 32C14 26 16.3 21 19 21C21.7 21 24 26 24 32" stroke="currentColor" strokeWidth="0.85" fill="none" />
  </svg>
);

const CameraIcon = () => (
  <svg width="38" height="30" viewBox="0 0 38 30" fill="none">
    <rect x="2" y="9" width="34" height="19" rx="2" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <path d="M13 9L15.5 3H22.5L25 9" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <circle cx="19" cy="18" r="5.5" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <circle cx="30" cy="13" r="1.5" stroke="currentColor" strokeWidth="0.85" fill="none" />
  </svg>
);

const NatureLeafIcon = () => (
  <svg width="30" height="38" viewBox="0 0 30 38" fill="none">
    <path d="M15 36C15 36 2 24 2 13C2 7 7.9 2 15 2C22.1 2 28 7 28 13C28 24 15 36 15 36Z" stroke="currentColor" strokeWidth="0.85" fill="none" />
    <line x1="15" y1="2" x2="15" y2="36" stroke="currentColor" strokeWidth="0.85" />
    <path d="M15 13C11 9 5 10 3 15" stroke="currentColor" strokeWidth="0.85" />
    <path d="M15 22C19 18 25 19 27 24" stroke="currentColor" strokeWidth="0.85" />
  </svg>
);

/* ── Data ── */
const perspectives = [
  {
    Icon: LeafIcon,
    title: "Coffee and Spice Estates",
    body: "The surrounding region has been under coffee cultivation for generations. The estate that surrounds us continues that tradition with care, not as a sight to look at.",
  },
  {
    Icon: BuildingIcon,
    title: "Architecture That Defers",
    body: "We did not want the architecture to lead. The structures are minimal and low-slung, built around what was already here — the trees, the slopes, and the sound.",
  },
  {
    Icon: PeopleIcon,
    title: "People Who Want to Slow Down",
    body: "We are not for people in transit. We are for those who want to pause — to breathe, to read, to sit without agenda, to feel surrounded by silence that stays with them.",
  },
];

const pillars = [
  {
    num: "01",
    title: "SILENCE",
    body: "The quiet is a living thing. It asks for nothing. But it only stays when we protect it. Silence here is not absence. It is a return.",
    svg: (
      <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
        <path d="M18 2C18 2 2 14 2 26C2 34.3 9.2 41 18 41C26.8 41 34 34.3 34 26C34 14 18 2 18 2Z" stroke="currentColor" strokeWidth="0.85" fill="none" />
        <line x1="18" y1="2" x2="18" y2="41" stroke="currentColor" strokeWidth="0.85" />
        <path d="M18 26C12 20 6 22 4 28" stroke="currentColor" strokeWidth="0.85" />
        <path d="M18 18C13 13 8 15 6 20" stroke="currentColor" strokeWidth="0.85" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "PRESENCE",
    body: "We are not chasing the perfect view or the perfect moment. We are here, in every small gesture, in every detail we can control. This is our language of care.",
    svg: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="19" stroke="currentColor" strokeWidth="0.85" />
        <path d="M7 31L15 20L21 26L27 18L37 31" stroke="currentColor" strokeWidth="0.85" fill="none" />
        <path d="M30 14 A3.5 3.5 0 1 1 37 14" stroke="currentColor" strokeWidth="0.85" fill="none" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "HONESTY",
    body: "We offer what we have, and we say what we cannot. No false promises. No polished stories. Just good hospitality, real food and time you can use your way.",
    svg: (
      <svg width="38" height="48" viewBox="0 0 38 48" fill="none">
        <path d="M19 2L32 18H25L36 34H22V46H16V34H2L13 18H6L19 2Z" stroke="currentColor" strokeWidth="0.85" fill="none" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const guests = [
  {
    Icon: CoupleIcon,
    type: "Couples",
    body: "Anniversary weekends. Long walks. Looking out across the valley without speaking.",
  },
  {
    Icon: FamilyIcon,
    type: "Families",
    body: "Children who get to be outside. Parents who can actually relax. Shared meals. Unhurried days.",
  },
  {
    Icon: CameraIcon,
    type: "Weekend Travellers",
    body: "Short escapes from the city. For those who value experiences more than a checklist of places.",
  },
  {
    Icon: NatureLeafIcon,
    type: "Nature Lovers",
    body: "They find meaning in birds, rain, trails, and the feel of soil under their shoes.",
  },
];

const whatIsHere = [
  "Fresh mountain air",
  "Coffee estate walking",
  "Home-cooked meals",
  "Long views & slow mornings",
  "Friendly & sincere hosts",
  "Working estate life",
];

const whatIsNot = [
  "Television signal",
  "Room service",
  "Crowd and rush",
  "Noise",
  "24/7 hot water (due to our belief in the right energy expression).",
];

/* ── Page ── */
export default function AboutPage() {
  return (
    <div className="bg-[#050505] text-on-surface font-sans antialiased">

      {/* ── Nav ── */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 sm:px-12 py-5 bg-[#050505]/90 backdrop-blur-sm border-b border-[rgba(200,169,126,0.1)]">
        <a
          href="/"
          className="text-[10px] tracking-[0.35em] text-[#e9c349] uppercase font-sans hover:opacity-70 transition-opacity duration-300"
        >
          + Nature Kingdom
        </a>
        <a
          href="/book"
          className="btn-editorial px-5 py-2.5 text-[10px] tracking-[0.25em] text-[#e9c349]"
        >
          Book Your Stay
        </a>
      </header>

      <main>

        {/* ═══════════════════════════════════════════
            HERO — left text / right image
        ═══════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050505] pt-20">

          {/* "STORY" watermark */}
          <div className="absolute inset-x-0 top-0 pointer-events-none select-none overflow-hidden z-[1]" aria-hidden="true">
            <span
              className="font-headline font-bold text-[#F4E7D6] block leading-none"
              style={{ fontSize: "22vw", opacity: 0.042, letterSpacing: "-0.02em", paddingLeft: "1vw", lineHeight: 0.82 }}
            >
              STORY
            </span>
          </div>

          {/* Right image panel */}
          <div className="absolute right-0 top-0 w-[55%] h-full hidden lg:block">
            <img
              src={IMG}
              alt="Nature Kingdom at night"
              className="w-full h-full object-cover"
            />
            {/* gradient fade left → transparent */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #050505 0%, rgba(5,5,5,0.55) 35%, transparent 70%)" }} />
          </div>

          {/* Left text */}
          <div className="relative z-10 w-full lg:w-1/2 px-8 sm:px-12 lg:px-20 py-24 lg:py-32">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease }}
              className="block text-[10px] tracking-[0.42em] text-[#e9c349] uppercase font-sans font-semibold mb-7"
            >
              About · Nature Kingdom
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease }}
              className="font-headline text-4xl sm:text-5xl lg:text-[3.4rem] text-[#F4E7D6] leading-[1.06] tracking-tight mb-8"
            >
              We Did Not Build a Resort.<br />We Curated a Clearing.
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease }}
              className="origin-left mb-8"
              style={{ width: 44, height: 1, background: "rgba(200,169,126,0.5)" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease }}
              className="font-sans font-light text-sm sm:text-base text-[#F4E7D6]/60 leading-[1.85] max-w-xl"
            >
              Nature Kingdom is a private nature homestay in Bommenahalli, Chikmagalur —
              surrounded by coffee estates, spice plantations, and the first ridgeline of
              the Western Ghats. It is not a hotel, and it was not designed to look like one.
            </motion.p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            01 — OUR VISION  (3-column: heading | image | text)
        ═══════════════════════════════════════════ */}
        <section className="border-t border-[rgba(200,169,126,0.1)] py-24 sm:py-32 px-8 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px_1fr] gap-12 lg:gap-16 items-start">

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.2, ease }}
            >
              <span className="block text-[10px] tracking-[0.38em] text-[#e9c349] uppercase font-sans font-semibold mb-5">
                01 — Our Vision
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl lg:text-[2.6rem] text-[#F4E7D6] leading-tight">
                A Property in the Landscape,<br />Not Above It.
              </h2>
            </motion.div>

            {/* Centre image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.3, delay: 0.1, ease }}
              className="w-full overflow-hidden"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={IMG}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Body text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.2, delay: 0.2, ease }}
              className="space-y-5 lg:pt-20"
            >
              <p className="font-sans font-light text-sm text-[#F4E7D6]/55 leading-[1.88]">
                Chikmagalur has been a coffee growing district for more than two hundred and
                fifty years. The landscape exists, the topography — this is the living land.
                We were few visitors when we first came. We came back because we felt it.
              </p>
              <p className="font-sans font-light text-sm text-[#F4E7D6]/55 leading-[1.88]">
                The property sits within a working estate, never in front of it. The morning
                smell of coffee and damp earth. The evening fog out at play. The road that
                leads here — not a road you find by accident — which is, in a sense, the point.
              </p>
              <p className="font-sans font-light text-sm text-[#F4E7D6]/55 leading-[1.88]">
                We are not a retreat from it. We are not a sixth. We are in the property,
                one team and a whole commitment that every gesture we make here leaves
                nothing permanently behind.
              </p>
            </motion.div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════
            02 — KEY PERSPECTIVES  (heading + 3 icon cards)
        ═══════════════════════════════════════════ */}
        <section className="border-t border-[rgba(200,169,126,0.1)] py-24 sm:py-32 px-8 sm:px-12 lg:px-20 bg-[#060606]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-14 lg:gap-20 items-start">

            {/* Left heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.2, ease }}
            >
              <span className="block text-[10px] tracking-[0.38em] text-[#e9c349] uppercase font-sans font-semibold mb-5">
                02 — Key Perspectives
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-[#F4E7D6] leading-tight">
                Three Things Worth Knowing.
              </h2>
            </motion.div>

            {/* Three icon cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[rgba(200,169,126,0.1)]">
              {perspectives.map(({ Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 1, delay: i * 0.12, ease }}
                  className="bg-[#060606] px-8 py-10 lg:px-10 lg:py-12 flex flex-col gap-5"
                >
                  <div className="text-[#C8A97E]/60">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-headline text-base text-[#F4E7D6] mb-3">{title}</h3>
                    <p className="font-sans font-light text-xs text-[#F4E7D6]/45 leading-relaxed">{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════
            03 — OUR PHILOSOPHY  (heading + 3 pillars + right image)
        ═══════════════════════════════════════════ */}
        <section className="border-t border-[rgba(200,169,126,0.1)] py-24 sm:py-32 px-8 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr_320px] gap-12 lg:gap-16 items-start">

            {/* Left heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.2, ease }}
            >
              <span className="block text-[10px] tracking-[0.38em] text-[#e9c349] uppercase font-sans font-semibold mb-5">
                03 — Our Philosophy
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-[#F4E7D6] leading-tight">
                What We Believe a Good Stay Should Feel Like.
              </h2>
            </motion.div>

            {/* Three pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-[rgba(200,169,126,0.15)]">
              {pillars.map(({ num, title, body, svg }, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 1, delay: i * 0.12, ease }}
                  className="flex flex-col px-6 py-10 border-b sm:border-b-0 sm:border-r border-[rgba(200,169,126,0.1)] last:border-r-0"
                >
                  <div className="flex items-start gap-3 mb-5">
                    <span className="font-sans text-[#C8A97E] font-light" style={{ fontSize: 12, letterSpacing: "0.08em" }}>{num}</span>
                    <div className="text-[#C8A97E]/50">{svg}</div>
                  </div>
                  <span className="font-sans font-medium text-[#F4E7D6]/65 block mb-3" style={{ fontSize: 10, letterSpacing: "0.35em" }}>{title}</span>
                  <div className="mb-4" style={{ width: 18, height: 1, background: "rgba(200,169,126,0.45)" }} />
                  <p className="font-sans font-light text-[#F4E7D6]/40 leading-relaxed" style={{ fontSize: 12 }}>{body}</p>
                </motion.div>
              ))}
            </div>

            {/* Right image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.3, delay: 0.15, ease }}
              className="hidden lg:block overflow-hidden"
              style={{ aspectRatio: "3/4" }}
            >
              <img src={IMG} alt="" aria-hidden="true" className="w-full h-full object-cover" />
            </motion.div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════
            04 — THE REALITY  (heading + two lists + right image)
        ═══════════════════════════════════════════ */}
        <section className="border-t border-[rgba(200,169,126,0.1)] py-24 sm:py-32 px-8 sm:px-12 lg:px-20 bg-[#060606]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr_320px] gap-12 lg:gap-16 items-start">

            {/* Left heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.2, ease }}
            >
              <span className="block text-[10px] tracking-[0.38em] text-[#e9c349] uppercase font-sans font-semibold mb-5">
                04 — The Reality
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-[#F4E7D6] leading-tight">
                What Is Here and What Is Not.
              </h2>
            </motion.div>

            {/* Two-column lists */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.2, delay: 0.12, ease }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-10"
            >
              {/* What IS here */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  {/* ✓ icon */}
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[#C8A97E] flex-shrink-0">
                    <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="0.85" />
                    <path d="M5 9.5L7.5 12L13 6.5" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
                  </svg>
                  <span className="text-[10px] tracking-[0.32em] text-[#C8A97E] uppercase font-sans font-semibold">What Is Here</span>
                </div>
                <ul className="space-y-3">
                  {whatIsHere.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="mt-[7px] flex-shrink-0 w-1 h-1 rounded-full bg-[rgba(200,169,126,0.55)]" />
                      <span className="font-sans font-light text-[#F4E7D6]/50 leading-snug" style={{ fontSize: 13 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What IS NOT here */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  {/* ✗ icon */}
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[#C8A97E]/50 flex-shrink-0">
                    <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="0.85" />
                    <path d="M6 6L12 12M12 6L6 12" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
                  </svg>
                  <span className="text-[10px] tracking-[0.32em] text-[#C8A97E]/60 uppercase font-sans font-semibold">What Is Not Here</span>
                </div>
                <ul className="space-y-3">
                  {whatIsNot.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="mt-[7px] flex-shrink-0" style={{ width: 12, height: 1, background: "rgba(200,169,126,0.3)", marginTop: 9 }} />
                      <span className="font-sans font-light text-[#F4E7D6]/30 leading-snug" style={{ fontSize: 13 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.3, delay: 0.18, ease }}
              className="hidden lg:block overflow-hidden"
              style={{ aspectRatio: "3/4" }}
            >
              <img src={IMG} alt="" aria-hidden="true" className="w-full h-full object-cover" />
            </motion.div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════
            05 — OUR GUESTS  (heading + 2×2 icon grid + right image)
        ═══════════════════════════════════════════ */}
        <section className="border-t border-[rgba(200,169,126,0.1)] py-24 sm:py-32 px-8 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr_320px] gap-12 lg:gap-16 items-start">

            {/* Left heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.2, ease }}
            >
              <span className="block text-[10px] tracking-[0.38em] text-[#e9c349] uppercase font-sans font-semibold mb-5">
                05 — Our Guests
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-[#F4E7D6] leading-tight">
                Who Comes to Nature Kingdom.
              </h2>
            </motion.div>

            {/* 2×2 guest grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[rgba(200,169,126,0.1)]">
              {guests.map(({ Icon, type, body }, i) => (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 1, delay: i * 0.1, ease }}
                  className="bg-[#050505] px-8 py-10 flex flex-col gap-4"
                >
                  <div className="text-[#C8A97E]/60">
                    <Icon />
                  </div>
                  <div>
                    <p className="font-headline text-lg text-[#F4E7D6] mb-2">{type}</p>
                    <div style={{ width: 20, height: 1, background: "rgba(200,169,126,0.4)", marginBottom: 12 }} />
                    <p className="font-sans font-light text-xs text-[#F4E7D6]/45 leading-relaxed">{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.3, delay: 0.15, ease }}
              className="hidden lg:block overflow-hidden"
              style={{ aspectRatio: "3/4" }}
            >
              <img src={IMG} alt="" aria-hidden="true" className="w-full h-full object-cover" />
            </motion.div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════
            CTA
        ═══════════════════════════════════════════ */}
        <section className="border-t border-[rgba(200,169,126,0.1)] py-24 sm:py-32 px-8 sm:px-12 lg:px-20 bg-[#060606]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.2, ease }}
            className="max-w-2xl mx-auto text-center space-y-7"
          >
            <span className="block text-[10px] tracking-[0.42em] text-[#e9c349] uppercase font-sans font-semibold">
              Core Reason
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl text-[#F4E7D6] leading-tight">
              The Best Way to Understand<br />Nature Kingdom Is to Stay.
            </h2>
            <p className="font-sans font-light text-sm text-[#F4E7D6]/45 leading-relaxed max-w-lg mx-auto">
              Secure your dates on the booking form and we will confirm via WhatsApp within
              2 hours. No payment required until your booking is confirmed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="/book"
                className="btn-editorial inline-block px-10 py-4 text-xs tracking-[0.28em] text-[#e9c349]"
              >
                Check Availability
              </a>
              <a
                href="/faq"
                className="inline-block px-10 py-4 text-xs tracking-[0.28em] uppercase font-sans text-[#F4E7D6]/35 hover:text-[#e9c349] transition-colors duration-300 border border-[rgba(200,169,126,0.15)] hover:border-[#e9c349]/30"
              >
                Read the FAQ →
              </a>
            </div>
          </motion.div>
        </section>

      </main>

      <LuxuryFooter />
    </div>
  );
}

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, MapPin } from "lucide-react";

interface Stop {
  name: string;
  time: string;
  type: string;
}

interface Day {
  day: number;
  theme: string;
  tagline: string;
  stops: Stop[];
}

const itinerary: Day[] = [
  {
    day: 1,
    theme: "Peaks & Coffee Country",
    tagline: "Start close, climb higher. Day 1 takes you through coffee estates and up to Karnataka's highest ground.",
    stops: [
      { name: "Siri Coffee Bar & Khushi Homestay", time: "25–30 min", type: "Coffee Estate" },
      { name: "Seethalayanagiri", time: "20–25 min", type: "Peak" },
      { name: "Mullayanagiri Peak", time: "30 min", type: "Peak · Highest in Karnataka" },
      { name: "Honnammana Halla Falls", time: "50–55 min", type: "Waterfall" },
      { name: "Z Point View", time: "50–60 min", type: "Viewpoint · Baba Budangiri Road" },
      { name: "Jhari Waterfall", time: "45–50 min", type: "Waterfall" },
      { name: "Datta Peeta", time: "1 hr 5–10 min", type: "Pilgrimage Site" },
      { name: "Baba Budan Giri", time: "25 min", type: "Sacred Peak · Coffee Origin" },
    ],
  },
  {
    day: 2,
    theme: "Temples, Mist & Waterfalls",
    tagline: "Begin at a local temple just minutes away, then head into the high-altitude sanctuary of Kemmangundi.",
    stops: [
      { name: "Adishakthyathmaka Sri Deviramma Temple", time: "10–15 min", type: "Temple" },
      { name: "Kallathigiri Falls", time: "55–60 min", type: "Waterfall" },
      { name: "Kemmangundi", time: "1 hr", type: "Hill Station · Royal Retreat" },
      { name: "Z Point Trekking Peak", time: "1 hr 35–45 min", type: "Trek · Kemmangundi" },
      { name: "Shanti Falls", time: "1 hr 40–50 min", type: "Waterfall" },
      { name: "Hebbe Waterfalls", time: "1.5 hrs", type: "Waterfall · Two-Tiered" },
    ],
  },
  {
    day: 3,
    theme: "Lakes, Mountains & Sunsets",
    tagline: "A quieter day — still water, open mountains, and one of the best sunset spots in Chikmagalur.",
    stops: [
      { name: "Hirekolale Lake", time: "25–30 min", type: "Lake · Sunset Views" },
      { name: "Bandekallu Gudda", time: "35–40 min", type: "Rock Peak" },
      { name: "Mallanduru Sunset Setting Point", time: "30–35 min", type: "Viewpoint · Best at Dusk" },
      { name: "Bhadra Tiger Reserve (Muthodi Safari)", time: "1 hr 5–15 min", type: "Wildlife Safari" },
      { name: "Ukkada Waterfalls", time: "1 hr 20–30 min", type: "Waterfall" },
    ],
  },
  {
    day: 4,
    theme: "Hoysala Heritage Circuit",
    tagline: "End your stay with stone temples that have stood for 900 years — and a peaceful boat ride on the river.",
    stops: [
      { name: "Hiremagaluru Temple", time: "30–35 min", type: "Temple" },
      { name: "Belur Boating", time: "1 hr 10–20 min", type: "River Activity" },
      { name: "Belur Chennakeshava Temple", time: "1 hr 10–20 min", type: "Hoysala Temple · UNESCO" },
      { name: "Halebeedu", time: "1 hr 30–40 min", type: "Hoysala Ruins" },
      { name: "Belavadi Veera Narayana Temple", time: "1 hr 40–50 min", type: "Hoysala Temple" },
    ],
  },
];

const ease = [0.25, 1, 0.5, 1] as [number, number, number, number];

export default function ItinerarySection() {
  const [activeDay, setActiveDay] = useState(0);
  const current = itinerary[activeDay];

  return (
    <section className="bg-[#050505] border-t border-white/5 py-24 sm:py-32 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1, ease }}
          className="mb-16"
        >
          <span className="text-[10px] tracking-[0.4em] text-[#e9c349] uppercase font-sans font-semibold block mb-5">
            Chikmagalur in 4 Days · From Nature Kingdom
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-[#F4E7D6] leading-tight max-w-2xl">
              Every road worth taking,<br />timed from your doorstep.
            </h2>
            <p className="font-sans font-light text-sm text-white/40 max-w-sm leading-relaxed lg:text-right">
              Drive times are approximate from Nature Kingdom, Bommenahalli.
              Road conditions vary — always start early.
            </p>
          </div>
        </motion.div>

        {/* Day Tabs */}
        <div className="flex gap-2 sm:gap-3 mb-10 flex-wrap">
          {itinerary.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(i)}
              className={`relative px-5 sm:px-7 py-3 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-sans font-semibold transition-all duration-300 ${
                activeDay === i
                  ? "bg-[#e9c349] text-[#0a0a0a]"
                  : "border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
              }`}
            >
              Day {d.day}
              {activeDay === i && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute inset-0 bg-[#e9c349] -z-10"
                  transition={{ duration: 0.3, ease }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Day Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease }}
          >
            {/* Day header */}
            <div className="mb-10 pb-8 border-b border-white/5">
              <div className="flex items-start gap-6">
                <span
                  className="font-headline text-[80px] sm:text-[100px] leading-none text-white/[0.04] select-none flex-shrink-0 -mt-3"
                  aria-hidden="true"
                >
                  {current.day}
                </span>
                <div className="pt-2">
                  <h3 className="font-headline text-2xl sm:text-3xl text-[#F4E7D6] mb-3">
                    {current.theme}
                  </h3>
                  <p className="font-sans font-light text-sm text-white/45 leading-relaxed max-w-xl">
                    {current.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Stops */}
            <div className="space-y-0">
              {current.stops.map((stop, i) => (
                <motion.div
                  key={stop.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.055, ease }}
                  className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-5 border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors duration-300 px-0 sm:px-3 -mx-0 sm:-mx-3"
                >
                  {/* Stop number */}
                  <span className="font-mono text-[10px] text-white/20 tracking-[0.2em] w-6 flex-shrink-0 hidden sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Name + type */}
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-medium text-sm sm:text-base text-[#F4E7D6] group-hover:text-[#e9c349] transition-colors duration-300 leading-snug">
                      {stop.name}
                    </p>
                    <p className="font-sans text-[10px] text-white/30 mt-0.5 tracking-wide">
                      {stop.type}
                    </p>
                  </div>

                  {/* Drive time */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Clock size={11} className="text-[#e9c349]/50" />
                    <span className="font-sans text-xs text-white/50 tracking-wide whitespace-nowrap">
                      {stop.time}
                    </span>
                    <span className="font-sans text-[9px] text-white/20 tracking-wide hidden sm:inline">
                      from resort
                    </span>
                  </div>

                  {/* Map pin accent */}
                  <MapPin size={12} className="text-white/10 group-hover:text-[#e9c349]/30 transition-colors duration-300 flex-shrink-0 hidden sm:block" />
                </motion.div>
              ))}
            </div>

            {/* Day CTA */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-white/5">
              <p className="font-sans text-xs text-white/30 leading-relaxed">
                {current.stops.length} stops · Stay close, explore far — Nature Kingdom is your base camp.
              </p>
              <a
                href="/book"
                className="inline-flex items-center gap-2 text-[10px] font-sans tracking-[0.25em] uppercase text-[#e9c349]/70 hover:text-[#e9c349] transition-colors duration-300"
              >
                Book Your Stay
                <span className="w-6 h-6 rounded-full border border-[#e9c349]/30 hover:border-[#e9c349]/70 flex items-center justify-center text-xs">→</span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

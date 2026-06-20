"use client";
import { motion } from "motion/react";
import { useState, useEffect, useCallback, useRef } from "react";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "The journey there felt like part of the experience.",
    name: "Arjun M.",
    role: "Solo Traveler",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=900",
  },
  {
    id: 2,
    quote: "Breakfast among the trees felt unreal.",
    name: "Meera & Karan",
    role: "Photographers",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=900",
  },
  {
    id: 3,
    quote: "The campfire conversations stayed with us long after we left.",
    name: "Rohan V.",
    role: "Entrepreneur",
    image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=900",
  },
  {
    id: 4,
    quote: "The wilderness here is raw, honest and beautiful.",
    name: "Ananya P.",
    role: "Solo Traveler",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=900",
  },
  {
    id: 5,
    quote: "It's not just a stay, it's a feeling you carry home.",
    name: "Dev & Simran",
    role: "Couple",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=900",
  },
];

const POS_CONFIG: Record<
  number,
  { x: number; scale: number; zIndex: number; opacity: number }
> = {
  [-2]: { x: -490, scale: 0.78, zIndex: 10, opacity: 1 },
  [-1]: { x: -268, scale: 0.90, zIndex: 30, opacity: 1 },
  [0]:  { x: 0,    scale: 1.00, zIndex: 50, opacity: 1 },
  [1]:  { x: 268,  scale: 0.90, zIndex: 30, opacity: 1 },
  [2]:  { x: 490,  scale: 0.78, zIndex: 10, opacity: 1 },
};

const OFF_SCREEN_LEFT  = { x: -820, scale: 0.70, zIndex: 0, opacity: 0 };
const OFF_SCREEN_RIGHT = { x:  820, scale: 0.70, zIndex: 0, opacity: 0 };

function getRelativePos(index: number, active: number, total: number): number {
  let pos = ((index - active) % total + total) % total;
  if (pos > Math.floor(total / 2)) pos -= total;
  return pos;
}

const CARD_W  = 340;
const CARD_H  = 520;
const AUTOPLAY_MS = 6000;

export default function TestimonialStories() {
  const [active, setActive]       = useState(0);
  const [isPaused, setIsPaused]   = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const advance = useCallback(() => {
    setActive((p) => (p + 1) % testimonials.length);
    setProgressKey((k) => k + 1);
  }, []);

  const retreat = useCallback(() => {
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
    setProgressKey((k) => k + 1);
  }, []);

  const goTo = useCallback((i: number) => {
    setActive(i);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (isPaused) return;
    timerRef.current = setTimeout(advance, AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [advance, isPaused, active]);

  return (
    <section className="relative w-full bg-[#050505] pt-20 pb-16 overflow-hidden">

      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div className="px-12 lg:px-20 mb-16 flex items-start justify-between">

        {/* Left cluster */}
        <div className="flex items-start gap-0">
          <div className="space-y-3 max-w-[280px]">
            <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#C8A97E]/60">
              Whispers from the Sanctuary
            </p>
            <h2 className="font-headline text-5xl text-[#F4E7D6] leading-[1.1] tracking-tight">
              Memories that<br />stay with you
            </h2>
          </div>

          <div className="w-px self-stretch mx-10 bg-[#C8A97E]/30" style={{ marginTop: 28, height: 80 }} />

          <p className="font-sans font-light text-sm text-white/60 leading-relaxed max-w-[200px] mt-7">
            Real stories from real travelers.<br />
            Moments they'll never forget,<br />
            shared in their own words.
          </p>
        </div>

        {/* Circular CTA */}
        <button className="relative w-[96px] h-[96px] rounded-full border border-[#C8A97E]/35 flex items-center justify-center group hover:border-[#C8A97E]/70 transition-colors duration-400 flex-shrink-0">
          <span
            className="absolute w-1.5 h-1.5 rounded-full bg-[#C8A97E]"
            style={{ top: 10, right: 26 }}
          />
          <span className="font-sans text-[9px] tracking-[0.22em] uppercase text-[#C8A97E] text-center leading-[1.6]">
            View All<br />Stories
          </span>
        </button>
      </div>

      {/* ── CAROUSEL ───────────────────────────────────────────────── */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: CARD_H + 60 }}
      >
        {/* Left nav */}
        <button
          onClick={retreat}
          className="absolute left-8 z-[60] w-11 h-11 rounded-full border border-[#C8A97E]/35 flex items-center justify-center hover:border-[#C8A97E]/80 hover:bg-[#C8A97E]/8 transition-all duration-300"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2.5L4.5 7L9 11.5" stroke="#C8A97E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Cards */}
        {testimonials.map((t, i) => {
          const pos    = getRelativePos(i, active, testimonials.length);
          const config = pos in POS_CONFIG
            ? POS_CONFIG[pos]
            : pos < 0 ? OFF_SCREEN_LEFT : OFF_SCREEN_RIGHT;

          const isCenter = pos === 0;

          return (
            <motion.div
              key={t.id}
              animate={{
                x:       config.x,
                scale:   config.scale,
                opacity: config.opacity,
                zIndex:  config.zIndex,
              }}
              transition={{
                duration: 1.0,
                ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
                zIndex: { duration: 0 },
              }}
              style={{
                position: "absolute",
                width:     CARD_W,
                height:    CARD_H,
                zIndex:    config.zIndex,
                cursor:    isCenter ? "default" : "pointer",
              }}
              onClick={() => { if (!isCenter) goTo(i); }}
            >
              {/* Card shell */}
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  borderRadius: 14,
                  border: isCenter
                    ? "1px solid rgba(200,169,126,0.45)"
                    : "1px solid rgba(200,169,126,0.14)",
                }}
              >
                {/* Background image */}
                <img
                  src={t.image}
                  alt={t.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />

                {/* Cinematic dark gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.82) 100%)",
                  }}
                />

                {/* Warm amber colour cast */}
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(55,28,5,0.38)", mixBlendMode: "multiply" }}
                />

                {/* Radial vignette */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 40%, transparent 35%, rgba(0,0,0,0.55) 100%)",
                  }}
                />

                {/* ── Card content ── */}
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  {/* Quote mark */}
                  <div
                    className="font-headline leading-none text-[#C8A97E]"
                    style={{ fontSize: 72, opacity: 0.75, lineHeight: 0.8 }}
                  >
                    "
                  </div>

                  {/* Bottom: text + attribution */}
                  <div className="space-y-5">
                    <p
                      className="font-headline text-[#F4E7D6] leading-snug"
                      style={{ fontSize: isCenter ? 22 : 18 }}
                    >
                      {t.quote}
                    </p>

                    <div
                      className="w-7"
                      style={{ height: 1, background: "rgba(200,169,126,0.55)" }}
                    />

                    <div>
                      <p className="font-sans text-[13px] font-medium text-[#F4E7D6]">
                        {t.name}
                      </p>
                      <p
                        className="font-sans uppercase text-[#C8A97E]/65 mt-1"
                        style={{ fontSize: 9, letterSpacing: "0.28em" }}
                      >
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Right nav */}
        <button
          onClick={advance}
          className="absolute right-8 z-[60] w-11 h-11 rounded-full border border-[#C8A97E]/35 flex items-center justify-center hover:border-[#C8A97E]/80 hover:bg-[#C8A97E]/8 transition-all duration-300"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2.5L9.5 7L5 11.5" stroke="#C8A97E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── BOTTOM CONTROLS ────────────────────────────────────────── */}
      <div className="px-12 lg:px-20 mt-10 flex items-center justify-between">

        {/* Left: label + progress line */}
        <div className="flex items-center gap-5">
          <span
            className="font-sans uppercase text-[#C8A97E]/45"
            style={{ fontSize: 8, letterSpacing: "0.38em" }}
          >
            Autoplaying Stories
          </span>
          <div className="relative w-36 h-px bg-[#C8A97E]/18">
            <motion.div
              key={progressKey}
              className="absolute left-0 top-0 h-full bg-[#C8A97E]"
              initial={{ width: "0%" }}
              animate={{ width: isPaused ? "0%" : "100%" }}
              transition={{
                duration: isPaused ? 0 : AUTOPLAY_MS / 1000,
                ease: "linear",
              }}
            />
            <motion.div
              key={`dot-${progressKey}`}
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C8A97E]"
              initial={{ left: "0%" }}
              animate={{ left: isPaused ? "0%" : "100%" }}
              transition={{
                duration: isPaused ? 0 : AUTOPLAY_MS / 1000,
                ease: "linear",
              }}
              style={{ marginLeft: -3 }}
            />
          </div>
        </div>

        {/* Center: pagination dashes */}
        <div className="flex items-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-500"
              style={{
                height:          1,
                width:           i === active ? 36 : 22,
                background:      i === active
                  ? "#C8A97E"
                  : "rgba(200,169,126,0.28)",
                display:         "block",
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Right: pause / play */}
        <button
          onClick={() => setIsPaused((p) => !p)}
          className="flex items-center gap-2 group transition-colors duration-200"
        >
          <span
            className="font-sans uppercase text-[#C8A97E]/50 group-hover:text-[#C8A97E] transition-colors duration-200"
            style={{ fontSize: 8, letterSpacing: "0.38em" }}
          >
            {isPaused ? "Play" : "Pause"}
          </span>
          {isPaused ? (
            <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
              <path d="M1 1L8 5.5L1 10V1Z" fill="#C8A97E" fillOpacity="0.5" />
            </svg>
          ) : (
            <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
              <rect x="1" y="1" width="2.5" height="9" fill="#C8A97E" fillOpacity="0.5" rx="0.5" />
              <rect x="5.5" y="1" width="2.5" height="9" fill="#C8A97E" fillOpacity="0.5" rx="0.5" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}

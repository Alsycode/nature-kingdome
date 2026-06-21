"use client";
import { motion } from "motion/react";
import { useRef, type ReactNode } from "react";
import {
  MapPin,
  ExternalLink,
  ArrowUpRight,
  Clock,
  Car,
} from "lucide-react";

const RESORT = {
  googleMapsUrl: "https://maps.google.com/?q=Nature+Kingdom+Homestay+Chikmagalur&ll=13.3122,75.7700",
};

const highlights = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.3" stroke="currentColor" className="w-5 h-5">
        <path d="M3 17L7.5 8L12 14L15.5 9L21 17" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 21h18" strokeLinecap="round" />
      </svg>
    ),
    title: "Surrounded by Nature",
    desc: "Lakes, forests and scenic trails.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.3" stroke="currentColor" className="w-5 h-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
        <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" strokeLinecap="round" />
      </svg>
    ),
    title: "Peaceful & Private",
    desc: "The perfect escape from the city.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.3" stroke="currentColor" className="w-5 h-5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v9l4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Easy to Reach",
    desc: "Well connected yet worlds away.",
  },
];

const infoBar = [
  {
    icon: <MapPin size={22} strokeWidth={1.3} />,
    label: "Address",
    lines: ["Bommenahalli, Mallenahalli Post,", "Chikmagalur, Karnataka, India"],
  },
  {
    icon: <Car size={22} strokeWidth={1.3} />,
    label: "Location",
    lines: ["Chikmagalur District", "Karnataka, India"],
  },
  {
    icon: <Clock size={22} strokeWidth={1.3} />,
    label: "Best Time to Visit",
    lines: ["March – June  |  September – December", "Pleasant weather all year round."],
  },
];


interface InfoItemProps {
  icon: ReactNode;
  label: string;
  lines: string[];
  isLast?: boolean;
}

function LocationInfoItem({ icon, label, lines, isLast }: InfoItemProps) {
  return (
    <div className={`flex flex-col items-center text-center gap-3 py-8 px-6 sm:px-8 ${!isLast ? "border-b sm:border-b-0 sm:border-r border-white/8" : ""}`}>
      <span className="text-[#e9c349]/50">{icon}</span>
      <div className="space-y-1.5">
        <p className="text-[9px] font-sans tracking-[0.28em] uppercase text-on-surface/35 font-medium">
          {label}
        </p>
        {lines.map((line, i) => (
          <p key={i} className="font-sans font-light text-xs text-on-surface/65 leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] },
    }),
  };

  return (
    <section
      id="location"
      ref={sectionRef}
      className="w-full bg-surface relative overflow-hidden"
    >
      {/* ── Two-column body ──────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 py-20 sm:py-28 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* ── Left Panel ─────────────────────────────────────── */}
          <div className="w-full lg:w-[38%] flex flex-col gap-8">
            <motion.span
              initial="hidden"
              whileInView="visible"
              custom={0}
              variants={fadeUp}
              viewport={{ once: true, margin: "-8%" }}
              className="text-[10px] tracking-[0.35em] font-semibold text-[#e9c349] uppercase font-sans"
            >
              Our Location
            </motion.span>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              custom={0.1}
              variants={fadeUp}
              viewport={{ once: true, margin: "-8%" }}
              className="font-headline text-4xl sm:text-5xl lg:text-[3.4rem] text-on-surface leading-[1.1] tracking-tight -mt-4"
            >
              Nestled in<br />Nature's Embrace
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              custom={0.15}
              variants={fadeUp}
              viewport={{ once: true, margin: "-8%" }}
              className="-mt-2"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 2 C14 2 22 8 22 14 C22 20 14 26 14 26 C14 26 6 20 6 14 C6 8 14 2 14 2Z"
                  stroke="#e9c349" strokeWidth="0.8" fill="none" opacity="0.6"/>
                <path d="M14 6 C14 6 19 10 19 14 C19 18 14 22 14 22 C14 22 9 18 9 14 C9 10 14 6 14 6Z"
                  stroke="#e9c349" strokeWidth="0.6" fill="none" opacity="0.4"/>
                <line x1="14" y1="2" x2="14" y2="26" stroke="#e9c349" strokeWidth="0.5" opacity="0.3"/>
                <line x1="6" y1="14" x2="22" y2="14" stroke="#e9c349" strokeWidth="0.5" opacity="0.3"/>
              </svg>
            </motion.div>

            <motion.p
              initial="hidden"
              whileInView="visible"
              custom={0.2}
              variants={fadeUp}
              viewport={{ once: true, margin: "-8%" }}
              className="font-sans font-light text-sm sm:text-[0.9rem] text-on-surface/50 leading-[1.8] -mt-2 max-w-sm"
            >
              Hidden away from the ordinary, our resort is surrounded by untouched forests, misty mountains, and serene landscapes.
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              custom={0.28}
              variants={fadeUp}
              viewport={{ once: true, margin: "-8%" }}
              className="flex flex-col divide-y divide-white/8"
            >
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-4 py-4">
                  <span className="text-[#e9c349]/45 mt-0.5 flex-shrink-0">{h.icon}</span>
                  <div>
                    <p className="text-[10px] tracking-[0.22em] uppercase font-sans font-semibold text-[#e9c349]/70 mb-1">
                      {h.title}
                    </p>
                    <p className="font-sans font-light text-xs text-on-surface/40 leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              custom={0.38}
              variants={fadeUp}
              viewport={{ once: true, margin: "-8%" }}
            >
              <a
                href={RESORT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 btn-editorial text-[10px] tracking-[0.2em] uppercase text-on-surface/70 hover:text-surface px-6 py-3.5 group"
              >
                Get Directions
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </a>
            </motion.div>
          </div>

          {/* ── Right Panel — Map ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
            className="w-full lg:w-[62%]"
          >
            <div
              className="relative overflow-hidden"
              style={{
                border: "1px solid rgba(200,168,75,0.15)",
                borderRadius: "1px",
                aspectRatio: "16/10",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3878.2!2d75.7700!3d13.3122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbaba4e5dd58d45%3A0x9c1f0a3b2e4f5c6d!2sNature+Kingdom+Homestay%2C+Chikmagalur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0 grayscale contrast-[1.1] brightness-[0.85]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nature Kingdom location map"
              />

              {/* Tint overlay to match dark theme */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "rgba(10,10,8,0.18)", mixBlendMode: "multiply" }}
              />

              <div className="absolute top-4 right-4 z-10">
                <a
                  href={RESORT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-[#0d1119]/90 border border-[#c8a84b]/25 hover:border-[#c8a84b]/55 px-4 py-2.5 text-[10px] font-sans tracking-[0.2em] uppercase text-[#c8a84b]/70 hover:text-[#c8a84b] transition-all duration-400 group backdrop-blur-sm"
                >
                  <MapPin size={11} />
                  Open in Google Maps
                  <ExternalLink size={10} className="opacity-60" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom Info Bar ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
        className="border-t border-white/6"
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/6">
            {infoBar.map((item, i) => (
              <div key={i}>
                <LocationInfoItem
                  icon={item.icon}
                  label={item.label}
                  lines={item.lines}
                  isLast={i === infoBar.length - 1}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

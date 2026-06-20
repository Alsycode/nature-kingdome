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
  googleMapsUrl: "https://maps.google.com/?q=Nature+Kingdom+Chikmagalur+Karnataka+India",
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

function TopographicMap() {
  return (
    <svg
      viewBox="0 0 800 500"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ display: "block" }}
    >
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#1a2030" />
          <stop offset="100%" stopColor="#0d1119" />
        </radialGradient>
        <radialGradient id="hill1" cx="35%" cy="40%" r="30%">
          <stop offset="0%" stopColor="#1e2d1e" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0d1119" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hill2" cx="70%" cy="30%" r="25%">
          <stop offset="0%" stopColor="#1a2a1a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0d1119" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hill3" cx="60%" cy="70%" r="28%">
          <stop offset="0%" stopColor="#1c2820" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0d1119" stopOpacity="0" />
        </radialGradient>
        <filter id="noise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended" />
          <feComponentTransfer in="blended">
            <feFuncA type="linear" slope="0.06" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode />
          </feMerge>
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="markerGlow">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="800" height="500" fill="url(#bgGrad)" />
      <ellipse cx="280" cy="200" rx="220" ry="170" fill="url(#hill1)" />
      <ellipse cx="560" cy="150" rx="200" ry="140" fill="url(#hill2)" />
      <ellipse cx="480" cy="350" rx="190" ry="150" fill="url(#hill3)" />
      <ellipse cx="640" cy="200" rx="65" ry="45" fill="#111e2a" opacity="0.7" />
      <ellipse cx="640" cy="200" rx="60" ry="40" fill="#152030" opacity="0.5" />

      <path d="M50,380 Q120,280 200,240 Q280,200 350,180 Q430,160 510,170 Q600,185 680,220 Q730,245 760,300 Q780,350 750,400 Q700,450 620,460 Q500,475 380,465 Q260,455 160,430 Q80,410 50,380Z"
        fill="none" stroke="#c8a84b" strokeWidth="0.4" opacity="0.2" />
      <path d="M80,360 Q150,275 230,238 Q310,200 380,183 Q460,168 535,178 Q615,193 685,228 Q725,252 745,300 Q762,345 732,390 Q685,440 610,450 Q495,463 378,453 Q265,445 168,420 Q100,400 80,360Z"
        fill="none" stroke="#c8a84b" strokeWidth="0.4" opacity="0.25" />
      <path d="M110,340 Q185,268 265,235 Q340,202 410,190 Q485,178 555,188 Q625,200 680,235 Q715,258 730,300 Q742,340 715,378 Q672,425 600,435 Q490,447 378,438 Q272,430 180,408 Q120,388 110,340Z"
        fill="none" stroke="#c8a84b" strokeWidth="0.5" opacity="0.3" />
      <path d="M145,318 Q220,260 298,232 Q370,205 438,196 Q508,186 572,198 Q638,212 678,245 Q706,267 718,305 Q727,342 700,375 Q658,418 590,426 Q483,438 375,428 Q278,418 195,396 Q142,375 145,318Z"
        fill="none" stroke="#c8a84b" strokeWidth="0.5" opacity="0.33" />
      <path d="M185,295 Q258,252 332,228 Q400,208 463,202 Q530,196 586,210 Q642,226 672,255 Q693,275 702,308 Q710,340 686,368 Q647,405 582,412 Q476,423 372,413 Q285,404 213,383 Q167,363 185,295Z"
        fill="none" stroke="#c8a84b" strokeWidth="0.6" opacity="0.36" />
      <path d="M268,252 Q332,235 398,218 Q458,204 516,202 Q572,200 614,218 Q653,237 668,264 Q680,288 683,315 Q686,342 664,362 Q629,390 568,394 Q466,403 364,392 Q298,383 252,358 Q225,338 268,252Z"
        fill="none" stroke="#c8a84b" strokeWidth="0.7" opacity="0.42" />
      <path d="M348,222 Q402,212 454,206 Q506,201 554,204 Q600,208 628,228 Q652,248 658,274 Q664,300 660,322 Q655,344 636,358 Q606,376 552,379 Q456,386 358,374 Q306,365 290,338 Q278,315 348,222Z"
        fill="none" stroke="#c8a84b" strokeWidth="0.8" opacity="0.48" />

      <path d="M0,310 Q100,305 200,295 Q300,285 400,280 Q500,275 620,268 Q700,265 800,260"
        fill="none" stroke="#c8a84b" strokeWidth="1.2" opacity="0.5" />
      <path d="M400,280 Q410,320 418,370 Q424,410 430,500"
        fill="none" stroke="#c8a84b" strokeWidth="0.8" opacity="0.4" />
      <path d="M400,280 Q395,240 388,195 Q382,155 375,80"
        fill="none" stroke="#c8a84b" strokeWidth="0.8" opacity="0.38" />
      <path d="M400,280 Q480,255 560,230 Q620,212 680,195"
        fill="none" stroke="#c8a84b" strokeWidth="0.7" opacity="0.35" />
      <path d="M400,280 Q340,270 270,260 Q190,250 100,245 Q50,242 0,238"
        fill="none" stroke="#c8a84b" strokeWidth="0.7" opacity="0.35" />
      <path d="M400,280 Q460,310 520,345 Q570,372 620,400"
        fill="none" stroke="#c8a84b" strokeWidth="0.5" opacity="0.28" strokeDasharray="4 3" />

      <path d="M160,80 Q220,140 280,190 Q320,220 360,250 Q380,265 400,280"
        fill="none" stroke="#1e3a5a" strokeWidth="2.5" opacity="0.6" />
      <path d="M162,82 Q222,142 282,192 Q322,222 362,252"
        fill="none" stroke="#254a70" strokeWidth="1.2" opacity="0.4" />

      <text x="375" y="72" textAnchor="middle" fill="#c8a84b" fillOpacity="0.55"
        fontSize="11" fontFamily="'Hanken Grotesk', sans-serif" letterSpacing="2" fontWeight="300">Pine</text>
      <text x="375" y="87" textAnchor="middle" fill="#c8a84b" fillOpacity="0.55"
        fontSize="11" fontFamily="'Hanken Grotesk', sans-serif" letterSpacing="2" fontWeight="300">Forest</text>
      <text x="95" y="258" textAnchor="middle" fill="#c8a84b" fillOpacity="0.5"
        fontSize="10" fontFamily="'Hanken Grotesk', sans-serif" letterSpacing="1.5" fontWeight="300">Whispering</text>
      <text x="95" y="272" textAnchor="middle" fill="#c8a84b" fillOpacity="0.5"
        fontSize="10" fontFamily="'Hanken Grotesk', sans-serif" letterSpacing="1.5" fontWeight="300">Falls</text>
      <text x="170" y="398" textAnchor="middle" fill="#c8a84b" fillOpacity="0.45"
        fontSize="10" fontFamily="'Hanken Grotesk', sans-serif" letterSpacing="1.5" fontWeight="300">Mountain</text>
      <text x="170" y="412" textAnchor="middle" fill="#c8a84b" fillOpacity="0.45"
        fontSize="10" fontFamily="'Hanken Grotesk', sans-serif" letterSpacing="1.5" fontWeight="300">Trail</text>
      <text x="695" y="186" textAnchor="middle" fill="#c8a84b" fillOpacity="0.5"
        fontSize="10" fontFamily="'Hanken Grotesk', sans-serif" letterSpacing="1.5" fontWeight="300">Lake</text>
      <text x="695" y="200" textAnchor="middle" fill="#c8a84b" fillOpacity="0.5"
        fontSize="10" fontFamily="'Hanken Grotesk', sans-serif" letterSpacing="1.5" fontWeight="300">Viewpoint</text>

      <ellipse cx="640" cy="200" rx="42" ry="28" fill="#182535" opacity="0.55" />
      <ellipse cx="640" cy="200" rx="35" ry="22" fill="#1a2d40" opacity="0.4" />

      <text x="660" y="400" textAnchor="middle" fill="#c8a84b" fillOpacity="0.45"
        fontSize="10" fontFamily="'Hanken Grotesk', sans-serif" letterSpacing="1.5" fontWeight="300">Sunrise</text>
      <text x="660" y="414" textAnchor="middle" fill="#c8a84b" fillOpacity="0.45"
        fontSize="10" fontFamily="'Hanken Grotesk', sans-serif" letterSpacing="1.5" fontWeight="300">Point</text>

      <circle cx="400" cy="280" r="28" fill="#c8a84b" fillOpacity="0.06" filter="url(#markerGlow)" />
      <circle cx="400" cy="280" r="18" fill="#c8a84b" fillOpacity="0.1" />
      <g filter="url(#glow)" transform="translate(400,280)">
        <path d="M0,-34 C-14,-34 -24,-24 -24,-10 C-24,6 0,28 0,28 C0,28 24,6 24,-10 C24,-24 14,-34 0,-34Z"
          fill="#c8a84b" />
        <circle cx="0" cy="-12" r="8" fill="#0d1119" />
      </g>

      <rect x="320" y="315" width="160" height="42" rx="0" fill="#0d1119" fillOpacity="0.82" />
      <rect x="320" y="315" width="160" height="42" rx="0" fill="none" stroke="#c8a84b" strokeWidth="0.5" strokeOpacity="0.3" />
      <text x="400" y="332" textAnchor="middle" fill="#c8a84b"
        fontSize="11" fontFamily="'Playfair Display', serif" letterSpacing="2.5" fontWeight="400">NATURE KINGDOM</text>
      <text x="400" y="347" textAnchor="middle" fill="#c8a84b" fillOpacity="0.55"
        fontSize="8.5" fontFamily="'Hanken Grotesk', sans-serif" letterSpacing="3" fontWeight="300">NATURE RESORT</text>

      <rect x="740" y="360" width="36" height="36" rx="2" fill="#0d1119" fillOpacity="0.85"
        stroke="#c8a84b" strokeWidth="0.5" strokeOpacity="0.3" />
      <text x="758" y="384" textAnchor="middle" fill="#c8a84b" fillOpacity="0.7"
        fontSize="20" fontFamily="'Hanken Grotesk', sans-serif" fontWeight="200">+</text>
      <rect x="740" y="400" width="36" height="36" rx="2" fill="#0d1119" fillOpacity="0.85"
        stroke="#c8a84b" strokeWidth="0.5" strokeOpacity="0.3" />
      <text x="758" y="424" textAnchor="middle" fill="#c8a84b" fillOpacity="0.7"
        fontSize="22" fontFamily="'Hanken Grotesk', sans-serif" fontWeight="200">−</text>

      <defs>
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="#0a0c10" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#vignette)" />

      {[100,200,300,400,500,600,700].map(x => (
        <line key={`vg${x}`} x1={x} y1="0" x2={x} y2="500"
          stroke="#c8a84b" strokeWidth="0.15" strokeOpacity="0.08" />
      ))}
      {[100,200,300,400].map(y => (
        <line key={`hg${y}`} x1="0" y1={y} x2="800" y2={y}
          stroke="#c8a84b" strokeWidth="0.15" strokeOpacity="0.08" />
      ))}
    </svg>
  );
}

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
              <div className="absolute inset-0">
                <TopographicMap />
              </div>

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

              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface/40 to-transparent pointer-events-none" />
              <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0c10]/50 to-transparent pointer-events-none" />
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

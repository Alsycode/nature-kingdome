"use client";
import { motion } from "motion/react";
import { useState, useRef } from "react";
import { ArrowRight, Moon, UtensilsCrossed, TreePine, Flower2, Heart, Waves, Mountain, Compass, Map, Wifi, Flame, Footprints, ChevronLeft, ChevronRight, Bike, Brain, Target, Zap, Music } from "lucide-react";
import PackageCard, { PackageData } from "./PackageCard";

export type ApiPackage = {
  id: string;
  number: string;
  title: string;
  description: string;
  price: number;
  nights: number;
  features: { label: string }[];
  image_url: string;
  image_alt: string;
  active: boolean;
};

function featureIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("night")) return <Moon size={10} />;
  if (l.includes("meal") || l.includes("dinner")) return <UtensilsCrossed size={10} />;
  if (l.includes("trail") || l.includes("nature")) return <TreePine size={10} />;
  if (l.includes("balcony") || l.includes("pool") || l.includes("spa")) return <Waves size={10} />;
  if (l.includes("flower") || l.includes("couple")) return <Flower2 size={10} />;
  if (l.includes("adventure") || l.includes("trek")) return <Mountain size={10} />;
  if (l.includes("guide")) return <Map size={10} />;
  if (l.includes("activit")) return <Compass size={10} />;
  return <TreePine size={10} />;
}

function packageIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("romantic") || t.includes("couple") || t.includes("honeymoon")) return <Heart size={16} />;
  if (t.includes("adventure") || t.includes("trail")) return <Mountain size={16} />;
  if (t.includes("luxury") || t.includes("hideaway")) return <Flower2 size={16} />;
  return <TreePine size={16} />;
}

function toCardData(pkg: ApiPackage): PackageData {
  return {
    id: pkg.id,
    number: pkg.number,
    title: pkg.title,
    description: pkg.description,
    image: pkg.image_url,
    imageAlt: pkg.image_alt,
    icon: packageIcon(pkg.title),
    features: pkg.features.map((f) => ({ icon: featureIcon(f.label), label: f.label })),
    price: pkg.price,
    nights: pkg.nights,
  };
}

const trustFeatures = [
  {
    icon: <Wifi size={28} strokeWidth={1.2} />,
    title: "Free Wi-Fi",
    description: "Stay connected across the property whenever you need it.",
  },
  {
    icon: <Footprints size={28} strokeWidth={1.2} />,
    title: "Nature Trails",
    description: "Walk the coffee estate rows and mountain paths at your own pace.",
  },
  {
    icon: <UtensilsCrossed size={28} strokeWidth={1.2} />,
    title: "Homestyle Meals",
    description: "Fresh Karnataka cooking, breakfast, evening tea, and a full dinner.",
  },
  {
    icon: <Flame size={28} strokeWidth={1.2} />,
    title: "Campfire Spot",
    description: "Bonfire set up each evening under an open sky full of stars.",
  },
  {
    icon: <Bike size={28} strokeWidth={1.2} />,
    title: "Cycling",
    description: "Explore the estate and surrounding roads at your own pace.",
  },
  {
    icon: <Brain size={28} strokeWidth={1.2} />,
    title: "Chess",
    description: "A quiet game of chess in the open air with a cup of fresh coffee.",
  },
  {
    icon: <Target size={28} strokeWidth={1.2} />,
    title: "Carroms",
    description: "Classic carrom board sessions for a relaxed afternoon.",
  },
  {
    icon: <Zap size={28} strokeWidth={1.2} />,
    title: "Table Tennis",
    description: "Quick rallies and friendly matches right on the property.",
  },
  {
    icon: <Music size={28} strokeWidth={1.2} />,
    title: "Campfire & Music",
    description: "Evenings around the fire with acoustic music under the stars.",
  },
];

interface PackagesSectionProps {
  initialPackages: ApiPackage[];
}

export default function PackagesSection({ initialPackages }: PackagesSectionProps) {
  const packages = initialPackages.filter((p) => p.active).map(toCardData);
  const [slideIndex, setSlideIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prevSlide = () => setSlideIndex((i) => (i - 1 + packages.length) % packages.length);
  const nextSlide = () => setSlideIndex((i) => (i + 1) % packages.length);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 44) {
      delta > 0 ? nextSlide() : prevSlide();
    }
    touchStartX.current = null;
  }

  return (
    <section
      id="packages"
      className="w-full bg-surface relative overflow-hidden"
      style={{ paddingTop: "6rem", paddingBottom: "0" }}
    >
      {/* ── Section Header ───────────────────────────────────────── */}
      <div className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
          className="text-center flex flex-col items-center"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.35em] font-semibold text-[#e9c349] uppercase font-sans mb-4">
            Curated Experiences
          </span>
          <h2 className="font-headline text-5xl sm:text-6xl lg:text-7xl text-on-surface tracking-tight leading-none mb-5">
            Nature Stay Packages
          </h2>
          <p className="font-sans font-light text-sm sm:text-base text-on-surface/45 max-w-md leading-relaxed text-center">
            Thoughtfully crafted stays for every kind of escape.
            <br />
            Immerse in nature, luxury, and timeless moments.
          </p>
        </motion.div>

        {/* Vertical rule */}
        <div className="flex flex-col items-center mt-6 mb-12">
          <div className="w-px h-10 bg-gradient-to-b from-[#e9c349]/20 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-end mb-8"
        >
          <a href="/book" className="flex items-center gap-2.5 text-[10px] font-sans tracking-[0.25em] uppercase text-on-surface/40 hover:text-[#e9c349] transition-colors duration-400 group">
            View All Packages
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>

        {/* ── Package Cards ──────────────────────────────────────── */}
        {packages.length > 0 && (
          <>
            {/* Desktop: 4-column grid (≥1024px) */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-5">
              {packages.map((pkg, i) => (
                <PackageCard key={pkg.number} pkg={pkg} index={i} />
              ))}
            </div>

            {/* Mobile + Tablet: single-card swipe carousel (<1024px) */}
            <div className="lg:hidden">
              <div
                className="relative overflow-hidden select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                role="region"
                aria-label="Packages carousel"
              >
                {/* Slide track */}
                <div
                  className="flex"
                  style={{
                    transform: `translateX(${-slideIndex * 100}%)`,
                    transition: "transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)",
                  }}
                >
                  {packages.map((pkg, i) => (
                    <div key={pkg.number} className="w-full flex-shrink-0">
                      <PackageCard pkg={pkg} index={i} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel controls */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prevSlide}
                  aria-label="Previous package"
                  className="w-11 h-11 border border-white/10 flex items-center justify-center text-on-surface/50 hover:text-[#e9c349] hover:border-[#e9c349]/30 transition-all duration-300"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                  {packages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      aria-label={`Go to package ${i + 1}`}
                      className="transition-all duration-400"
                      style={{
                        height: 1,
                        width: i === slideIndex ? 32 : 18,
                        background: i === slideIndex ? "#e9c349" : "rgba(233,195,73,0.25)",
                        display: "block",
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  aria-label="Next package"
                  className="w-11 h-11 border border-white/10 flex items-center justify-center text-on-surface/50 hover:text-[#e9c349] hover:border-[#e9c349]/30 transition-all duration-300"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <p className="text-center mt-4 text-[8px] tracking-[0.3em] font-sans uppercase text-on-surface/25">
                Swipe to explore packages
              </p>
            </div>
          </>
        )}
      </div>

      {/* ── Trust Feature Strip ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
        className="mt-20 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-3 gap-px bg-white/5">
          {trustFeatures.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-4 py-10 px-4 sm:px-6 bg-surface"
            >
              <span className="text-[#e9c349]/50">{f.icon}</span>
              <div className="space-y-2">
                <p className="font-sans font-medium text-sm text-on-surface/80 tracking-wide">
                  {f.title}
                </p>
                <p className="font-sans font-light text-xs text-on-surface/35 leading-relaxed max-w-[160px]">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

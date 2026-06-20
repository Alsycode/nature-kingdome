"use client";
import { motion } from "motion/react";
import { ArrowRight, Moon, UtensilsCrossed, TreePine, Flower2, Heart, Waves, Mountain, Compass, Map, ShieldCheck, Headphones, Briefcase } from "lucide-react";
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
    icon: <Briefcase size={28} strokeWidth={1.2} />,
    title: "Handpicked Stays",
    description: "Every stay is carefully selected for comfort, charm, and character.",
  },
  {
    icon: <Flower2 size={28} strokeWidth={1.2} />,
    title: "Authentic Experiences",
    description: "Curated activities that connect you with nature and culture.",
  },
  {
    icon: <Headphones size={28} strokeWidth={1.2} />,
    title: "Personalized Service",
    description: "From the moment you book to your last goodbye.",
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.2} />,
    title: "Safe & Secure",
    description: "Your safety and peace of mind are always our priority.",
  },
];

interface PackagesSectionProps {
  initialPackages: ApiPackage[];
}

export default function PackagesSection({ initialPackages }: PackagesSectionProps) {
  const packages = initialPackages.filter((p) => p.active).map(toCardData);

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

        {/* ── Package Cards Grid ──────────────────────────────────── */}
        {packages.length > 0 && (
          <>
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {packages.map((pkg, i) => (
                <div key={pkg.number}>
                  <PackageCard pkg={pkg} index={i} />
                </div>
              ))}
            </div>

            <div
              className="sm:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {packages.map((pkg, i) => (
                <div key={pkg.number} className="flex-shrink-0 w-[78vw] snap-start">
                  <PackageCard pkg={pkg} index={i} />
                </div>
              ))}
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
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
          {trustFeatures.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-4 py-12 px-6 sm:px-8"
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

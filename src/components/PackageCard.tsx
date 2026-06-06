import { motion } from "motion/react";
import type { ReactNode } from "react";
import { ArrowRight, Moon, UtensilsCrossed, TreePine, Flower2, Heart, Waves, Mountain, Compass } from "lucide-react";

export interface PackageData {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: ReactNode;
  features: { icon: ReactNode; label: string }[];
  price: number;
  nights: number;
}

interface PackageCardProps {
  pkg: PackageData;
  index: number;
}

export default function PackageCard({ pkg, index }: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col bg-[#111110] border border-white/5 overflow-hidden cursor-pointer"
      style={{ transition: "box-shadow 0.5s ease, transform 0.5s cubic-bezier(0.25,1,0.5,1)" }}
    >
      {/* Hover gold glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
        style={{ boxShadow: "inset 0 0 60px rgba(233,195,73,0.04)" }} />

      {/* Image Container */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        {/* Package Number */}
        <span className="absolute top-4 left-4 z-20 font-mono text-xs tracking-[0.25em] text-white/70">
          {pkg.number}
        </span>

        {/* Image */}
        <motion.img
          src={pkg.image}
          alt={pkg.imageAlt}
          className="w-full h-full object-cover select-none"
          style={{ filter: "brightness(0.85)" }}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
        />

        {/* Bottom image gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-transparent to-transparent opacity-60" />
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        {/* Title Row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-headline text-xl text-on-surface leading-tight">
            {pkg.title}
          </h3>
          <span className="text-[#e9c349]/60 flex-shrink-0 mt-0.5">
            {pkg.icon}
          </span>
        </div>

        {/* Description */}
        <p className="font-sans font-light text-xs text-on-surface/50 leading-relaxed">
          {pkg.description}
        </p>

        {/* Divider */}
        <div className="border-t border-white/5 pt-3">
          {/* Features */}
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            {pkg.features.map((f, i) => (
              <span key={i} className="flex items-center gap-1.5 text-[10px] font-sans tracking-wide text-on-surface/40">
                <span className="text-[#e9c349]/40">{f.icon}</span>
                {f.label}
              </span>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price + CTA Row */}
        <div className="flex items-end justify-between pt-2 border-t border-white/5">
          <div>
            <p className="font-sans text-xs font-light text-on-surface/50 tracking-wide">
              Contact for Pricing
            </p>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-sans tracking-[0.2em] uppercase text-[#e9c349]/70 group-hover:text-[#e9c349] transition-colors duration-300">
            View Details
            <span className="w-6 h-6 rounded-full border border-[#e9c349]/30 group-hover:border-[#e9c349]/70 flex items-center justify-center transition-colors duration-300">
              <ArrowRight size={10} />
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

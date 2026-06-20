"use client";
import { motion } from "motion/react";

interface NavigationProps {
  onEnquireClick?: () => void;
}

export default function Navigation({ onEnquireClick }: NavigationProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-8 mix-blend-difference"
    >
      {/* Brand Logo & Editorial Links */}
      <div className="flex items-center space-x-12">
        <span className="text-xs tracking-[0.4em] font-bold uppercase text-on-surface">
          Nature Kingdom
        </span>
        <nav className="hidden md:flex space-x-8">
          {[
            { label: "The Stay", href: "#stay" },
            { label: "Experience", href: "/experience" },
            { label: "Explore", href: "/explore" },
            { label: "About", href: "/about" },
            { label: "FAQ", href: "/faq" },
            { label: "Reserve", href: "#reserve" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[10px] tracking-[0.3em] uppercase text-on-surface/50 hover:text-[#e9c349] hover:opacity-100 transition-all duration-300 relative group"
            >
              {item.label}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[#e9c349] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>

      {/* Brand Specific Coordinates & Menu / Enquire trigger */}
      <div className="flex items-center space-x-8">
        <span className="hidden sm:inline-block text-[10px] tracking-[0.2em] font-mono text-on-surface/60">
          Chikkamagaluru — 13.31° N, 75.77° E
        </span>

        <button
          onClick={onEnquireClick}
          className="btn-editorial px-6 py-2.5 text-[10px] tracking-[0.3em] uppercase text-[#e9c349]"
        >
          Enquire
        </button>
      </div>
    </motion.header>
  );
}

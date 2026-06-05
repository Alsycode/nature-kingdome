import { motion } from "motion/react";
import { ArrowRight, Moon, UtensilsCrossed, TreePine, Flower2, Heart, Waves, Mountain, Compass, Map, ShieldCheck, Headphones, Briefcase } from "lucide-react";
import PackageCard, { PackageData } from "./PackageCard";

const packages: PackageData[] = [
  {
    number: "01",
    title: "Wilderness Escape",
    description: "Disconnect to reconnect. A secluded retreat surrounded by untouched nature.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxdrtD8r9pKg2sIi6aAwhzlDeDG0NXqzuFNnnaM19DoRp2s_OOXWcSWnluK0iXbjPJkq0L4yv2WZryVS5YmctpBdfpnFZFzwXc6I3ZKyll7tfrPd56-CEpi5hiDESV5N0MYxZ1z4wlFRU9_cSHbvsxqr851SWHUcLRh3fZGY2D1cMbqO6P1OEa-9kwJg3XAqSCcXrYXqk_HdbwcjIXjm5_l0srbCldba2G9w_i5DIrz6xk3SP5Wf4Gu1wFElp1lbE1MpTxWmWe_f7P",
    imageAlt: "Secluded cabin in dense forest wilderness at dusk",
    icon: <TreePine size={16} />,
    features: [
      { icon: <Moon size={10} />, label: "2 Nights Stay" },
      { icon: <UtensilsCrossed size={10} />, label: "All Meals" },
      { icon: <TreePine size={10} />, label: "Nature Trails" },
    ],
    price: 420,
    nights: 2,
  },
  {
    number: "02",
    title: "Luxury Hideaway",
    description: "Indulge in comfort and elegance with world-class amenities.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1SHNI7ct5Yx-u6MpbHwS6oyrEJ921q4Yn3Z41bBEtgFzPY-__Lg_Axd8x-eh003gHkw-ViyffOteJk8_n_ziwXc03RRkVHf0Q3B_CaP3K4ezodoZj0G-kr_2Z1plC0m0B7BoXboDtjB8LSLTM3EV5DRrsKXtK5GH8Ztq4jiR9aNexNnnHDoVbgmTf11k1cEGvX-GRrK3RqOfcMhclTt9nEPzzdiDesoiSebBETDWiD7BhZ4yKHKCpaTXyg7eEcOiPFSC4Mj52ZASf",
    imageAlt: "Luxury outdoor bathtub on private deck surrounded by lush ferns",
    icon: <Flower2 size={16} />,
    features: [
      { icon: <Moon size={10} />, label: "2 Nights Stay" },
      { icon: <UtensilsCrossed size={10} />, label: "All Meals" },
      { icon: <Waves size={10} />, label: "Private Balcony" },
    ],
    price: 620,
    nights: 2,
  },
  {
    number: "03",
    title: "Romantic Retreat",
    description: "A perfect escape for two. Romance awaits in every moment.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbx7oCYwE5oWzq4nJnM5iFpBrBs_rT9yLqTH_3gIa1q_p7YXjCRkMNYaSN0s4JqS2v84p3RRCFSg3_X_pv0lpRl_i_Z02YF8K6RyCG8J8Wz25o68VIoRPlrKTpHzuqN0eEuSx7I4JmfKiCWaFMPBkk8FXGOJFHJipVuPFhEVhbdYpVrEzjcI1DfhiqwpPGsT7hKjnTJL98Sy8VDYgTHJFW7H1VvBN-tZX1xNwIMaV0lkH-lqZCkFqYH68u2E_pVPtNpqGR72L_rR",
    imageAlt: "Intimate fireplace interior with candlelight and forest view",
    icon: <Heart size={16} />,
    features: [
      { icon: <Moon size={10} />, label: "2 Nights Stay" },
      { icon: <UtensilsCrossed size={10} />, label: "Candlelight Dinner" },
      { icon: <Flower2 size={10} />, label: "Couple Spa" },
    ],
    price: 580,
    nights: 2,
  },
  {
    number: "04",
    title: "Adventure Trails",
    description: "For the explorers at heart. Experience thrills and unforgettable journeys.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO_ZFKqiYjFNLbxPFLRKsn_Z5PJxxjt35LhP_xHPJCcTRHHhOq0GcQgCJVYoI72rTnjqEaTunbRfzG-kQFIi64lC5AJJHQjBcj8IqXcHfxT9TuwRJGqXm3INGf0VCEhCrClAzJ3F2h98m0IxZv-Ew2GF_EHr8CDG0cHLmDh7N49cYQ6h7gT9gbNMbOJBTEVPZBcMLc7hDj0VbNi8lv1j-yxKMzZJqCr9aeAQN4w5KQX_bRi7wKrD9dn3w9gK-0HWNQj1Wdz4dLm",
    imageAlt: "Campfire gathering under forest canopy at night",
    icon: <Mountain size={16} />,
    features: [
      { icon: <Moon size={10} />, label: "3 Nights Stay" },
      { icon: <Compass size={10} />, label: "Adventure Activities" },
      { icon: <Map size={10} />, label: "Guide" },
    ],
    price: 480,
    nights: 3,
  },
];

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

export default function PackagesSection() {
  return (
    <section
      id="packages"
      className="w-full bg-surface relative overflow-hidden"
      style={{ paddingTop: "6rem", paddingBottom: "0" }}
    >
      {/* ── Section Header ───────────────────────────────────────── */}
      <div className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        {/* Top label + heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="text-center flex flex-col items-center"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.35em] font-semibold text-[#e9c349] uppercase font-sans mb-4">
            Curated Experiences
          </span>
          <h2 className="font-headline text-5xl sm:text-6xl lg:text-7xl text-on-surface tracking-tight leading-none mb-5">
            Our Packages
          </h2>
          <p className="font-sans font-light text-sm sm:text-base text-on-surface/45 max-w-md leading-relaxed text-center">
            Thoughtfully crafted stays for every kind of escape.
            <br />
            Immerse in nature, luxury, and timeless moments.
          </p>
        </motion.div>

        {/* Vertical rule + View All CTA */}
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
          <button className="flex items-center gap-2.5 text-[10px] font-sans tracking-[0.25em] uppercase text-on-surface/40 hover:text-[#e9c349] transition-colors duration-400 group">
            View All Packages
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>

        {/* ── Package Cards Grid ──────────────────────────────────── */}
        {/* Desktop: 4 col | Tablet: 2 col | Mobile: horizontal scroll */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {packages.map((pkg, i) => (
            <div key={pkg.number}>
              <PackageCard pkg={pkg} index={i} />
            </div>
          ))}
        </div>

        {/* Mobile: horizontal carousel */}
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
      </div>

      {/* ── Trust Feature Strip ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
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

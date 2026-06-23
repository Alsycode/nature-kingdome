"use client";
import { motion } from "motion/react";
import { useRef } from "react";
const goldenHourImg = "/assets/golden_hour_hike.png";
const campfire = "/assets/campfire.png";
const breakfast = "/assets/breakfast.png";

interface TimelineItem {
  time: string;
  title: string;
  description: string;
  image: string;
}

const timelineData: TimelineItem[] = [
  {
    time: "05:40 AM",
    title: "The Forest Wakes",
    description: "The jungle breathes. Thick, blue fog rises slowly from the valley floors as the first calls of the Malabar whistling thrush break the nighttime silence. A cool mountain breeze filters directly through the open window.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200"
  },
  {
    time: "08:00 AM",
    title: "Breakfast Among The Trees",
    description: "Sip locally-grown Arabica coffee on a private timber deck, paired with ancestral baked breads. Overhead, giant wood squirrels make their way across the sun-drenched jungle canopy.",
    image: breakfast,
  },
  {
    time: "11:00 AM",
    title: "Estate Walks",
    description: "Wander companionless through organic coffee blocks alongside our estate naturalists. Touch damp mosses, identify wild orchids, and learn the rich, centuries-old coffee-growing heritage of Chikkamagaluru.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200"
  },
  {
    time: "03:00 PM",
    title: "Cycling Through The Landscape",
    description: "Take out high-performance trail cycles to cruise along empty, single-track mountain roads. Run below massive bamboo tunnels and dynamic cascading hillsides.",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1200"
  },
  {
    time: "06:45 PM",
    title: "Golden Hour Silence",
    description: "Position yourself on the western lookout as the mountain range is bathed in heavy orange-gold sunlight. Watch the colors fade to velvet violet over infinite forest ridges.",
    image: goldenHourImg
  },
  {
    time: "08:00 PM",
    title: "Campfire & Conversation",
    description: "Gather around dry-wood fire pits in the central court. Engage in simple, warm conversations with like-minded minds under the cooling canopy whispering in the stellar dark.",
    image: campfire
  },
  {
    time: "08:30 PM",
    title: "Dinner at the Table",
    description: "Settle into the dining area for a warm, home-cooked Karnataka meal. Rice, dal, fresh curries, and a sweet dish — prepared in the kitchen and served at the table. Simple food, good company, and the sounds of the night outside.",
    image: "/dining.webp"
  }
];

export default function ADayInTheForest() {
  const containerRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      ref={containerRef}
      id="experiences"
      className="py-20 sm:py-32 lg:py-48 px-6 sm:px-12 lg:px-20 w-full bg-[#0a0a0a] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-20 sm:space-y-36 lg:space-y-48">

        {/* Intro header block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={revealVariants}
          className="space-y-4 text-center max-w-3xl mx-auto"
        >
          <span className="text-xs sm:text-sm tracking-[0.4em] font-semibold text-[#e9c349] uppercase block font-sans">
            A Day Inside
          </span>
          <h2 className="font-headline text-3xl sm:text-5xl lg:text-7xl leading-tight text-on-surface font-medium">
            Silent Moments <br />
            Represented In Time.
          </h2>
          <p className="font-sans font-light text-sm sm:text-lg text-on-surface/60 leading-relaxed max-w-xl mx-auto">
            A curated flow of experiences throughout your day. Feel the natural, comforting transition of the sun while rediscovering pure stillness.
          </p>
        </motion.div>

        {/* Dynamic Asymmetric Timeline Stack */}
        <div className="space-y-20 sm:space-y-36 lg:space-y-64">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-center"
              >
                {/* Visual Image Block */}
                <div className={`lg:col-span-7 ${isEven ? "" : "lg:order-2"}`}>
                  <motion.div
                    initial={{ scale: 1.05, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
                    className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden brightness-85 select-none"
                  >
                    <div className="absolute inset-0 border border-on-surface/5 pointer-events-none z-10" />
                    <img
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-1000 scale-100 hover:scale-105"
                      src={item.image}
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </div>

                {/* Narrative Typography Block */}
                <div className={`lg:col-span-5 flex flex-col space-y-5 sm:space-y-6 ${isEven ? "" : "lg:order-1 lg:pr-12"}`}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={revealVariants}
                    className="space-y-3 sm:space-y-4"
                  >
                    {/* Time Marker Accent */}
                    <div className="flex items-center space-x-4">
                      <span className="font-sans text-[#e9c349] font-semibold tracking-[0.3em] uppercase text-xs sm:text-sm">
                        {item.time}
                      </span>
                      <div className="w-8 h-[1px] bg-[#e9c349]/40" />
                    </div>

                    {/* Headline */}
                    <h3 className="font-headline text-2xl sm:text-4xl text-on-surface leading-tight font-medium">
                      {item.title}
                    </h3>
                  </motion.div>

                  {/* Prose */}
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15, duration: 1.2 }}
                    className="font-sans font-light text-sm sm:text-base text-on-surface/75 leading-relaxed"
                  >
                    {item.description}
                  </motion.p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

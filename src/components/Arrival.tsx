import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import arrivalVideo from "../../assets/.aistudio/4447119190657531631_sample_1.mp4";

export default function Arrival() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={sectionRef}
      id="arrival"
      className="relative w-full min-h-screen overflow-hidden bg-black lg:-ml-20 lg:w-[calc(100%+5rem)]"
    >
      {/* Full-bleed background video */}
      <motion.div style={{ y: videoY }} className="absolute inset-0 scale-110 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center" }}
        >
          <source src={arrivalVideo} type="video/mp4" />
        </video>
        {/* Dark gradient — heavy on left so text is readable, fades to transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10" />
        {/* Subtle top & bottom fades */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/20" />
      </motion.div>

      {/* Giant ARRIVAL watermark — spans full width, sits behind content */}
      <div className="absolute inset-0 z-10 flex items-start pointer-events-none select-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-headline font-bold text-[22vw] leading-none tracking-tighter text-transparent w-full text-center"
          style={{
            WebkitTextStroke: "1px rgba(233,195,73,0.18)",
            color: "transparent",
            backgroundImage:
              "linear-gradient(180deg, rgba(233,195,73,0.22) 0%, rgba(233,195,73,0.06) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          ARRIVAL
        </motion.span>
      </div>

      {/* Main content — bottom-left anchored */}
      <div className="relative z-20 flex flex-col justify-end min-h-screen pb-16 px-10 sm:px-16 lg:px-24 max-w-2xl">
        {/* THE PROLOGUE label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-3"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.35em] font-semibold text-[#e9c349] uppercase font-sans">
            The Prologue
          </span>
          {/* Gold rule below label */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-2 w-12 h-[1px] bg-[#e9c349]/60 origin-left"
          />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-headline text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.08] tracking-tight mb-6"
        >
          The Kingdom<br />Begins Here.
        </motion.h2>

        {/* Body paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.45 }}
          className="font-sans font-light text-sm sm:text-base text-white/75 leading-relaxed mb-5 max-w-md"
        >
          The road narrows, the canopy thickens, and the air cools. Your arrival is not
          merely a destination reached,<br className="hidden sm:inline" /> but a deliberate
          transition from the noise of the world<br className="hidden sm:inline" /> into a
          sanctuary of profound quiet.
        </motion.p>

        {/* Italic quote with left gold border */}
        <motion.blockquote
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="border-l-2 border-[#e9c349]/50 pl-4 mb-8"
        >
          <p className="font-sans font-light italic text-sm text-white/50 leading-relaxed max-w-xs">
            Let the winding paths of Chikkamagaluru guide you to a place where time is
            measured not in hours, but in moments of pure, unfiltered stillness.
          </p>
        </motion.blockquote>

        {/* Bottom gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="w-12 h-[1px] bg-[#e9c349]/50 origin-left"
        />
      </div>
    </section>
  );
}

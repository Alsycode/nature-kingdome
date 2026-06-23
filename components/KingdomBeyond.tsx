"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface Sights {
  name: string;
  description: string;
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  concept: string;
  sights: Sights[];
  image: string;
  ambientColor: string;
}

const chapters: Chapter[] = [
  {
    id: "peaks",
    number: "01",
    title: "Peaks",
    concept: "The mist-covered ceilings of Karnataka where cliffs touch the high heavens.",
    sights: [
      { name: "Mullayanagiri", description: "The highest peak in Karnataka, where ancient steps guide you directly through passing mountain clouds." },
      { name: "Baba Budangiri", description: "A mystical range where the winds narrate legacy tales of the first coffee seeds." },
      { name: "Jhari Falls", description: "Deep within forest estates, water cascades down natural basalt tiers like liquid silver." }
    ],
    image: "/assets/mullayanagiri.png",
    ambientColor: "from-[#111A16]/85 to-[#0A0D0B]/95"
  },
  {
    id: "mist-water",
    number: "02",
    title: "Mist & Water",
    concept: "Cool botanic sanctuaries where running streams sculpt primeval rocks.",
    sights: [
      { name: "Kemmanagundi", description: "A royal summer retreat perched high in the sub-tropical mist, framed by wild woodland trails." },
      { name: "Hebbe Falls", description: "A two-tiered mountain waterfall crashing with raw majesty deep inside natural reserves." },
      { name: "Z Point", description: "A steep, raw hillside trail terminating on an overlook above infinite oceans of emerald valley." }
    ],
    image: "/assets/golden_hour_hike.png",
    ambientColor: "from-[#121A24]/85 to-[#080C12]/95"
  },
  {
    id: "forest-lake",
    number: "03",
    title: "Forest & Lake",
    concept: "Mirror-still glass catchments holding reflections of eternal ancient canopies.",
    sights: [
      { name: "Hirekolale Lake", description: "An elegant, perfectly still mountain basin catching spectacular lilac gradients of sunset." },
      { name: "Muthodi Forest", description: "The deep, primeval heartbeat of Bhadra Sanctuary, echoing with the calls of native tigers." },
      { name: "Bandekal Gudda", description: "An imposing, rarely trodden rock peak crowned with dramatic, moody evening clouds." }
    ],
    image: "/assets/hirekolale.png",
    ambientColor: "from-[#131713]/85 to-[#090A09]/95"
  },
  {
    id: "heritage",
    number: "04",
    title: "Heritage",
    concept: "Monolithic structures sculpted in soft soapstone, silent witnesses to human mastery.",
    sights: [
      { name: "Belur", description: "The monumental Chennakeshava Temple, featuring intricate carvings that challenge the limits of stone." },
      { name: "Halebeedu", description: "A sprawling masterpiece of dark basalt ruins, housing stellar double-shrine Hoysaleswara chambers." },
      { name: "Belavadi", description: "A peaceful, majestic triple-shrine structure carrying deep architectural balance and absolute calm." }
    ],
    image: "/assets/belur.png",
    ambientColor: "from-[#1E1712]/85 to-[#0D0A08]/95"
  }
];

function TopographicalCurves({ progress }: { progress: any }) {
  const lineY = useTransform(progress, [0, 1], ["0px", "-60px"]);
  const rotateContour = useTransform(progress, [0, 1], [0, 5]);

  return (
    <motion.div
      style={{ y: lineY, rotate: rotateContour }}
      className="absolute inset-0 w-full h-full opacity-[0.09] pointer-events-none z-0 overflow-hidden"
    >
      <svg className="w-full h-full stroke-[#e9c349]" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100 200 C300 150 500 450 900 300 C1100 200 1300 400 1600 250" strokeWidth="0.75" />
        <path d="M-100 240 C320 200 520 490 880 340 C1080 250 1280 430 1600 290" strokeWidth="0.5" strokeDasharray="3,3" />
        <path d="M-100 280 C340 250 540 530 860 380 C1060 300 1260 460 1600 330" strokeWidth="0.5" />
        <path d="M-100 320 C360 300 560 570 840 420 C1040 350 1240 490 1600 370" strokeWidth="0.5" />
        <path d="M-100 360 C380 350 580 610 820 460 C1020 400 1220 520 1600 410" strokeWidth="0.5" strokeDasharray="3,3" />
        <path d="M100 800 C400 700 300 500 600 600 C900 700 1100 550 1500 700" strokeWidth="0.75" />
        <path d="M120 830 C380 730 280 540 580 630 C880 720 1080 580 1480 730" strokeWidth="0.5" />
        <path d="M140 860 C360 760 260 580 560 660 C860 740 1060 610 1460 760" strokeWidth="0.5" />
        <circle cx="850" cy="450" r="160" strokeWidth="0.5" strokeDasharray="5,5" />
        <circle cx="850" cy="450" r="130" strokeWidth="0.5" />
        <circle cx="850" cy="450" r="100" strokeWidth="0.5" />
        <circle cx="850" cy="450" r="70" strokeWidth="0.75" />
        <circle cx="850" cy="450" r="40" strokeWidth="0.5" />
        <text x="800" y="440" className="text-[9px] font-mono fill-[#e9c349] opacity-40 tracking-wider">MULLAYANAGIRI PEAK</text>
        <text x="800" y="455" className="text-[8px] font-mono fill-[#e9c349] opacity-40 tracking-widest">ELEVATION 1,930M</text>
        <text x="800" y="470" className="text-[7px] font-mono fill-[#e9c349] opacity-30 tracking-wider">13.31° N, 75.77° E</text>
        <line x1="0" y1="450" x2="1600" y2="450" strokeWidth="0.25" strokeDasharray="10,10" />
        <line x1="850" y1="0" x2="850" y2="900" strokeWidth="0.25" strokeDasharray="10,10" />
      </svg>
    </motion.div>
  );
}

export default function KingdomBeyond() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-83.333%"]);

  return (
    <div ref={containerRef} className="relative h-auto lg:h-[550vh] bg-surface lg:-ml-20 lg:w-[calc(100%+5rem)]" id="kingdom-beyond">
      {/* Sticky container that locks in place during vertical scroll (desktop only) */}
      <div className="lg:sticky lg:top-0 lg:h-screen w-full overflow-hidden flex flex-col justify-between">

        <TopographicalCurves progress={scrollYProgress} />

        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.6em] text-on-surface/20 uppercase z-30 pointer-events-none text-center">
          The Kingdom Beyond — Travel Documentary
        </div>

        {/* Horizontal Moving Slider track (Desktop Only) */}
        <motion.div
          style={{ x: xTranslate }}
          className="hidden lg:flex h-full w-[600vw] flex-row items-stretch select-none"
        >
          {/* SCREEN 0: INTRODUCTORY SLIDE */}
          <div className="w-[100vw] h-full flex flex-col justify-center px-24 relative bg-gradient-to-br from-[#0e0e0e] to-surface overflow-hidden">
            <div className="max-w-4xl space-y-8 z-10">
              <span className="text-xs tracking-[0.4em] text-[#e9c349] font-semibold uppercase font-sans">
                The Narrative Chronicle
              </span>
              <h2 className="font-headline text-[100px] leading-[0.9] tracking-tighter text-on-surface">
                The Kingdom <br />
                <span className="italic font-light text-[#e9c349]/90">Beyond the Gates</span>
              </h2>
              <p className="font-sans font-light text-xl text-on-surface/60 max-w-2xl leading-relaxed">
                Beyond Chikkamagaluru's private valleys lies a monumental expanse of raw wilderness and deep history. We invite you to step past our sanctuary gates and explore four distinct chapters of the Western Ghats.
              </p>

              <div className="pt-12 text-[10px] tracking-[0.3em] text-[#e9c349] uppercase flex items-center space-x-6 animate-pulse">
                <span>Scroll vertically to travel horizontally</span>
                <span className="text-lg">→</span>
              </div>
            </div>

            <div className="absolute bottom-12 right-24 text-[220px] font-headline font-bold text-on-surface/[0.02] select-none pointer-events-none italic leading-none">
              Wilderness
            </div>
          </div>

          {/* SCREENS 1 TO 4: CHAPTER SLIDES */}
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className={`w-[100vw] h-full flex flex-col justify-center px-16 relative bg-gradient-to-b ${chapter.ambientColor} transition-colors duration-1000`}
            >
              <div className="grid grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto z-10">

                {/* Visual Image Block */}
                <div className="col-span-6 relative aspect-[4/5] bg-surface-container-highest overflow-hidden select-none shadow-2xl">
                  <div className="absolute inset-0 border border-on-surface/5 pointer-events-none z-10" />
                  <img
                    alt={`Scenic landscape illustrating Chapter ${chapter.number} — ${chapter.title}`}
                    className="w-full h-full object-cover brightness-85 contrast-95 transition-all duration-700 hover:scale-105"
                    src={chapter.image}
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute top-10 right-10 flex flex-col items-end">
                    <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#e9c349]/80 mb-2">
                      Chapter
                    </span>
                    <span className="font-headline text-7xl font-semibold text-[#e9c349]/90 italic leading-none">
                      {chapter.number}
                    </span>
                  </div>
                </div>

                {/* Narrative Typography Block */}
                <div className="col-span-6 pl-12 flex flex-col justify-center space-y-12">
                  <div className="space-y-4">
                    <span className="text-xs tracking-[0.4em] text-[#e9c349] font-semibold uppercase block font-sans">
                      Chapter {chapter.number}
                    </span>
                    <h3 className="font-headline text-6xl tracking-tight text-on-surface font-medium">
                      {chapter.title}
                    </h3>
                    <p className="font-sans font-light text-lg text-[#bdcac0] leading-relaxed">
                      {chapter.concept}
                    </p>
                  </div>

                  <div className="space-y-8">
                    {chapter.sights.map((sight, sIdx) => (
                      <div key={sIdx} className="group flex flex-col space-y-2 border-l border-[#e9c349]/20 pl-6 hover:border-[#e9c349] transition-colors duration-500">
                        <h4 className="font-headline text-xl text-on-surface/90 font-medium group-hover:text-[#e9c349] transition-colors duration-350">
                          {sight.name}
                        </h4>
                        <p className="font-sans font-light text-xs sm:text-sm text-on-surface/60 leading-relaxed">
                          {sight.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="absolute bottom-16 right-24 text-[260px] font-headline font-bold text-on-surface/[0.03] select-none pointer-events-none leading-none">
                {chapter.title}
              </div>
            </div>
          ))}

          {/* SCREEN 5: OUTRO */}
          <div className="w-[100vw] h-full flex flex-col justify-center px-24 relative bg-gradient-to-br from-surface to-[#0d0d0c] overflow-hidden">
            <div className="max-w-3xl space-y-10 z-10">
              <span className="text-xs tracking-[0.4em] text-[#e9c349] font-semibold uppercase font-sans">
                The Call of the Heights
              </span>
              <h3 className="font-headline text-7xl leading-tight text-on-surface">
                Begin Your <br />
                <span className="not-italic font-sans font-light text-[#bdcac0]">Adventure outside.</span>
              </h3>
              <p className="font-sans font-light text-lg text-on-surface/60 leading-relaxed">
                As the daylight fades into a warm twilight glow over Chikkamagaluru, return to your sanctuary cabin at Nature Kingdom. A hot stone bath, custom tea blends, and absolute silence await your return.
              </p>
            </div>

            <div className="absolute top-1/2 right-40 -translate-y-1/2 text-on-surface/[0.04] font-mono text-[22vw] select-none pointer-events-none leading-none">
              ✦
            </div>
          </div>

        </motion.div>

        {/* MOBILE LAYOUT */}
        <div className="lg:hidden w-full px-6 py-20 sm:py-28 space-y-20 sm:space-y-28 bg-surface z-10">

          <div className="space-y-6 pt-12 pb-12 border-b border-on-surface/5">
            <span className="text-xs tracking-[0.3em] text-[#e9c349] font-semibold uppercase font-sans">
              The Narrative Chronicle
            </span>
            <h2 className="font-headline text-4xl sm:text-5xl text-on-surface">
              The Kingdom <br />
              <span className="italic font-light text-[#e9c349]/90">Beyond the Gates</span>
            </h2>
            <p className="font-sans font-light text-base text-on-surface/70 leading-relaxed">
              Beyond Chikkamagaluru's private valleys lies a monumental expanse of raw wilderness and deep history. We invite you to step past our sanctuary gates and explore four distinct chapters of the Western Ghats.
            </p>
          </div>

          {chapters.map((chapter) => (
            <div key={chapter.id} className="space-y-10 pb-16 border-b border-on-surface/5">
              <div className="space-y-4">
                <div className="flex justify-between items-baseline border-b border-[#e9c349]/20 pb-2">
                  <span className="text-xs tracking-[0.4em] text-[#e9c349] font-semibold uppercase font-sans">
                    Chapter {chapter.number}
                  </span>
                  <span className="font-headline text-3xl font-semibold italic text-[#e9c349]/90">
                    {chapter.number}
                  </span>
                </div>
                <h3 className="font-headline text-3xl text-on-surface">
                  {chapter.title}
                </h3>
                <p className="font-sans font-light text-sm text-on-surface/70 leading-relaxed">
                  {chapter.concept}
                </p>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden grayscale-[10%] select-none rounded-[1px]">
                <img
                  alt={`Scenic landscape illustrating Chapter ${chapter.number} — ${chapter.title}`}
                  className="w-full h-full object-cover"
                  src={chapter.image}
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-6 pt-2">
                {chapter.sights.map((sight, sIdx) => (
                  <div key={sIdx} className="space-y-1.5 pl-4 border-l border-[#e9c349]/30">
                    <h4 className="font-headline text-lg text-[#e9c349]">
                      {sight.name}
                    </h4>
                    <p className="font-sans font-light text-xs text-on-surface/60 leading-relaxed">
                      {sight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="space-y-6 pt-12 pb-24 text-center">
            <span className="text-xs tracking-[0.3em] text-[#e9c349] font-mono block">✦ ✦ ✦</span>
            <h3 className="font-headline text-4xl text-on-surface">
              Begin Your Outside Adventure.
            </h3>
            <p className="font-sans font-light text-sm text-on-surface/60 max-w-sm mx-auto leading-relaxed">
              As the daylight fades into a warm twilight glow over Chikkamagaluru, return to your sanctuary cabin at Nature Kingdom. A hot stone bath, custom tea blends, and absolute silence await your return.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

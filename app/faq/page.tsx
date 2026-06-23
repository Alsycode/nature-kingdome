"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import LuxuryFooter from "@/components/LuxuryFooter";

const ease = [0.25, 1, 0.5, 1] as [number, number, number, number];
const PLACEHOLDER = "/assets/nightvilla.png";
const HERO_IMG = "/assets/goldenhourhouse.png";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  num: string;
  label: string;
  title: string;
  img?: string;
  items: FaqItem[];
}

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    num: "01",
    label: "Planning Your Visit",
    title: "Before You Pack",
    img: "/assets/arivalcar.png",
    items: [
      {
        q: "What is the best time to visit Chikmagalur?",
        a: "September to February is the most popular window — cool weather, clear skies, and the coffee harvest running from November onwards. March to May is pleasant and quieter. June to August is monsoon season: some roads become difficult and trekking paths may close, but the waterfalls are spectacular and the estates are at their greenest. We are open year-round.",
      },
      {
        q: "How far is Nature Kingdom from Bangalore?",
        a: "Nature Kingdom is approximately 250 km from Bangalore — around 5 to 6 hours by road. The most direct route is via the Nelamangala–Hassan highway (NH75), then on to Chikmagalur. Many guests enjoy the drive; the final stretch through the coffee and spice estates is one of the most scenic roads in Karnataka. Starting early lets you arrive before sunset.",
      },
      {
        q: "Is Nature Kingdom suitable for couples?",
        a: "Many of our guests are couples on anniversaries, honeymoons, or a quiet escape together. The private property, bonfire evenings, sunrise views from the terrace, and the surrounding forest create an atmosphere that feels naturally romantic. If you are celebrating something special, let us know in advance and we will make small arrangements to mark the occasion.",
      },
      {
        q: "Can families with children stay at Nature Kingdom?",
        a: "Families are very welcome. Children enjoy the open outdoor areas, the coffee estate surroundings, and the freedom of being somewhere that is not a city. We can arrange meals suited to younger guests. Parents appreciate that the property is private, enclosed, and calm — the kind of place where children actually want to be outside.",
      },
      {
        q: "Is Nature Kingdom suitable for solo travellers?",
        a: "Solo travellers do stay with us, and many find the quiet and the landscape exactly what they were looking for. The property is private, so you would have the space to yourself. If you have questions about whether the property suits what you have in mind, message us on WhatsApp before booking — we will be straightforward about whether it is the right fit.",
      },
      {
        q: "What should I pack for a Chikmagalur stay?",
        a: "Light layers are enough in most months. Between October and February, evenings can be genuinely cold, so pack a jacket. Comfortable walking shoes are useful if you plan to explore the estate or visit Mullayanagiri. The property has power backup and housekeeping, so everyday essentials are all you need. Monsoon visitors should bring rain gear and waterproof footwear.",
      },
    ],
  },
  {
    num: "02",
    label: "The Property & Facilities",
    title: "What to Expect",
    img: "/assets/nightvilla.png",
    items: [
      {
        q: "What facilities are included in the stay?",
        a: "Your stay includes a dining area, living room, flat-screen TV, private terrace with forest views, housekeeping, parking, power backup, and a washing machine. Bonfire and BBQ facilities are set up for you each evening — just let us know your preferred time. Meals are prepared on the property using seasonal, local Karnataka produce.",
      },
      {
        q: "Is Nature Kingdom a private property or shared with other guests?",
        a: "Nature Kingdom is a private property. When you stay, the space is yours — no shared lobby, no other guests at the dining table, no common pool. The experience is closer to renting a private estate than checking into a hotel. This is a deliberate decision. We believe it makes a meaningful difference to how the stay feels.",
      },
      {
        q: "Is Wi-Fi available at Nature Kingdom?",
        a: "Wi-Fi is available on the property. Signal strength depends on your mobile network — Chikmagalur is a hilly region and some networks perform better than others. Guests who plan to work remotely generally manage, though we would gently suggest that the setting makes disconnecting easier than staying online.",
      },
      {
        q: "Is the property accessible by car?",
        a: "Yes — private parking is available at the property. The roads leading to Bommenahalli are paved and accessible to regular cars. During heavy monsoon rain, some approach roads can get muddy or slippery. If you are travelling in June to August, a slightly higher vehicle clearance helps. We can share driving directions after you confirm your booking.",
      },
      {
        q: "What is the coffee estate experience like at the property?",
        a: "Chikmagalur is one of India's oldest coffee-growing regions. Staying at Nature Kingdom means waking up surrounded by coffee and spice plantations. You can smell the fresh crop on the morning air, walk among the estate rows, and experience the landscape that produces your morning cup — a genuinely different kind of holiday, quiet and grounded.",
      },
    ],
  },
  {
    num: "03",
    label: "Food & Dining",
    title: "Meals at the Property",
    img: "/assets/campfire.png",
    items: [
      {
        q: "Are meals included in the stay?",
        a: "Every stay includes three meals: breakfast (8:30–10:00 AM), evening high tea, and dinner (8:30–10:00 PM). No lunch is served. Breakfast is a choice of Set Dosa, Idly, or Neer Dosa with Sambar and Chutney, plus Lemon Rice or Pullav or Uppama, and coffee, tea, or milk. Evening high tea is Onion or Vegetable Pakoda with a hot drink. Dinner is a full spread — rice, chapathi, dal or rasam, a veg curry, and sweets. Non-vegetarian options (chicken or fish) are available for dinner, subject to availability.",
      },
      {
        q: "What kind of food is served at Nature Kingdom?",
        a: "Home-style Karnataka cooking — not a hotel buffet, not catered. Dinner includes Ghee Rice or Jeera Rice with Chapathi, Dal or Rasam, Paneer or Veg Kurma, Gobi, Sabaji, Papad, Curd Rice, and a sweet dish like Gulab Jamun or Payasa. Chicken gravy or fry and fish are available as optional non-vegetarian additions. All items are subject to availability and prepared fresh on the property.",
      },
      {
        q: "Are vegetarian and non-vegetarian options available?",
        a: "Both are available. Let us know your preferences when you book so we can plan meals accordingly. If you have specific dietary requirements — allergies, intolerances, or religious dietary restrictions — mention these in advance and we will accommodate them where possible.",
      },
      {
        q: "Can we arrange a bonfire and BBQ during the stay?",
        a: "Yes — bonfire evenings are one of the things guests talk about most after they leave. We set up the fire in the outdoor area at sunset. It is included as part of your stay — just let us know your preferred time and we will have it ready. BBQ arrangements are also available on request. Tell us in the morning if you want BBQ in the evening.",
      },
    ],
  },
  {
    num: "04",
    label: "Booking & Payment",
    title: "Reserving Your Stay",
    img: "/assets/breakfast.png",
    items: [
      {
        q: "How do I confirm a booking?",
        a: "Fill in the booking form on our website with your dates and details. You will receive a booking reference immediately. Message us on WhatsApp with that reference — we will confirm your dates and share payment details within 2 hours. Your booking is confirmed once payment is received.",
      },
      {
        q: "What payment methods are accepted?",
        a: "We accept UPI transfers (Google Pay, PhonePe, Paytm, NEFT) and cash. Payment is arranged via WhatsApp after you submit your booking request — there is no online payment gateway on the site. We confirm your stay once payment is received and do not hold a pre-authorisation on your card.",
      },
      {
        q: "What are the check-in and check-out times?",
        a: "Check-in is at 12:00 PM and check-out is at 10:00 AM. If you need an early check-in or late check-out, let us know when booking and we will do our best to accommodate. Guests arriving early are welcome to leave their luggage with us and explore the estate while the room is being prepared.",
      },
      {
        q: "What is the cancellation policy?",
        a: "We handle cancellations on a case-by-case basis and try to be reasonable when plans genuinely change. If you need to cancel, contact us as early as possible via WhatsApp. We will discuss the situation and work out something fair. We do not enforce rigid cancellation windows because we do not want a policy to create unnecessary friction between guests and the property.",
      },
      {
        q: "Can I make a special request for an anniversary or honeymoon?",
        a: "Yes — tell us when you book and describe what would feel meaningful to you. We do not offer fixed anniversary packages with preset decorations. What we offer is genuine effort: a particular dinner setup, a bonfire set for a specific hour, fresh flowers from the estate, or simply making sure your room is ready well before noon on arrival day.",
      },
    ],
  },
  {
    num: "05",
    label: "House Rules",
    title: "Guest Guidelines",
    img: "/assets/nightvilla.png",
    items: [
      {
        q: "What are the check-in and check-out times?",
        a: "Check-in is at 12:00 PM. Check-out is at 10:00 AM. If you need to arrive early or leave later, let us know in advance and we will accommodate where possible.",
      },
      {
        q: "Is there a quiet hours policy?",
        a: "We ask all guests to keep noise levels low after 10:00 PM. Nature Kingdom is a peaceful property and the surrounding environment — the forest, the birds, the stillness — is part of what makes the stay special. Respecting that benefits everyone.",
      },
      {
        q: "Are there any rules around water and electricity?",
        a: "Yes — we ask guests to use water and electricity mindfully. The property is in a natural setting and we are conscious of our environmental footprint. Power backup is available, but we appreciate guests switching off lights and appliances when not in use.",
      },
      {
        q: "Is smoking allowed at Nature Kingdom?",
        a: "Smoking is not permitted in common areas or inside the rooms. If you smoke, please do so in the outdoor areas away from other guests and the property interiors.",
      },
      {
        q: "Is the management responsible for lost belongings?",
        a: "The management is not responsible for lost or misplaced belongings. We recommend keeping valuables secure during your stay. If you do misplace something, let us know immediately and we will do our best to help locate it.",
      },
    ],
  },
  {
    num: "06",
    label: "Activities & Nearby",
    title: "Beyond the Estate",
    img: "/assets/golden_hour_hike.png",
    items: [
      {
        q: "What activities are available at Nature Kingdom?",
        a: "On the property itself: estate walks through the coffee rows, terrace time, bonfire evenings, BBQ, and the particular pleasure of having nowhere you need to be. The mornings in Chikmagalur are worth waking up early for. Beyond the property: the Mullayanagiri range, Baba Budangiri, Jhari Falls, Kemmangundi, and Manikyadhara Falls are all within a manageable drive.",
      },
      {
        q: "Can we go trekking from Nature Kingdom?",
        a: "Mullayanagiri — Karnataka's highest peak at 1,930 metres — is approximately 45 kilometres from the property, around an hour's drive. It is one of the most popular sunrise treks in the region. Baba Budangiri and the trails around Kemmangundi are also accessible. Most treks in the region do not require a guide for the main routes, though conditions vary by season.",
      },
      {
        q: "What waterfalls are near Chikmagalur?",
        a: "Jhari Falls is approximately 30 kilometres from Nature Kingdom — quieter than the more well-known waterfalls in Karnataka and worth it for the drive through coffee estates alone. Manikyadhara Falls is further, around 65 kilometres, and is best visited in the morning before tour groups arrive. Both are most spectacular between July and October when water flow is highest.",
      },
      {
        q: "Is Chikmagalur town accessible from Nature Kingdom?",
        a: "Chikmagalur town is approximately 25 to 30 kilometres from the property — around 40 to 50 minutes by road. The town has markets, restaurants, coffee board outlets, and the practical amenities most guests need. We can recommend what is worth visiting in town if you ask when you arrive.",
      },
    ],
  },
];

function AccordionItem({
  item,
  globalIndex,
  openIndex,
  setOpenIndex,
}: {
  item: FaqItem;
  globalIndex: number;
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
}) {
  const isOpen = openIndex === globalIndex;

  return (
    <div
      style={{ borderBottom: "1px solid rgba(200,169,126,0.13)" }}
    >
      <button
        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-6 py-5 text-left group"
      >
        <span
          className="font-sans font-light text-[#F4E7D6]/75 group-hover:text-[#F4E7D6] transition-colors duration-300 leading-snug"
          style={{ fontSize: 13, letterSpacing: "0.01em" }}
        >
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.28, ease }}
          className="flex-shrink-0 mt-0.5 text-[#C8A97E] text-lg font-light leading-none select-none"
          style={{ width: 20, textAlign: "center" }}
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`a-${globalIndex}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease }}
            className="overflow-hidden"
          >
            <p
              className="font-sans font-light text-[#F4E7D6]/45 leading-relaxed pb-5 pr-8"
              style={{ fontSize: 13 }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
      cat.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      }))
    ),
  };

  let globalIdx = 0;

  return (
    <div className="bg-[#050505] text-[#F4E7D6] font-sans antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Navigation ── */}
      <header
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 sm:px-12 py-5"
        style={{ borderBottom: "1px solid rgba(200,169,126,0.10)" }}
      >
        {/* Subtle blur backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backdropFilter: "blur(12px)", background: "rgba(5,5,5,0.72)" }}
        />
        <a
          href="/"
          className="relative text-[10px] tracking-[0.35em] text-[#C8A97E] uppercase font-sans hover:text-[#e9c349] transition-colors duration-300"
        >
          ← Nature Kingdom
        </a>
        <a
          href="/book"
          className="relative btn-editorial px-5 py-2.5 text-[10px] tracking-[0.25em] text-[#e9c349]"
        >
          Book Your Stay
        </a>
      </header>

      <main>
        {/* ═══════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════ */}
        <section className="relative flex flex-col justify-end overflow-hidden" style={{ minHeight: "78vh" }}>

          {/* Background image */}
          <Image
            src={HERO_IMG}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover pointer-events-none select-none"
            style={{ objectPosition: "center 40%" }}
          />

          {/* Layered dark overlays */}
          <div className="absolute inset-0 bg-black/10" />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(20,10,2,0.48)", mixBlendMode: "multiply" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.0) 30%, rgba(5,5,5,0.72) 80%, rgba(5,5,5,1) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(5,5,5,0.55) 0%, transparent 70%)",
            }}
          />

          {/* Top fade from nav */}
          <div
            className="absolute inset-x-0 top-0 h-32 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.6), transparent)" }}
          />

          {/* Watermark — "QUESTIONS" */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none select-none overflow-hidden"
            aria-hidden="true"
          >
            <span
              className="font-headline font-bold text-[#F4E7D6] block leading-none"
              style={{
                fontSize: "17vw",
                opacity: 0.042,
                letterSpacing: "-0.02em",
                paddingLeft: "2vw",
                lineHeight: 0.85,
                paddingTop: "4vw",
              }}
            >
              QUESTIONS
            </span>
          </div>

          {/* Foreground content */}
          <div className="relative z-10 px-8 sm:px-12 lg:px-20 pb-16 lg:pb-20">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease }}
              className="text-[10px] tracking-[0.4em] text-[#C8A97E] uppercase font-sans font-medium block mb-5"
            >
              Before You Arrive · FAQ
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.08, ease }}
              className="font-headline text-[#F4E7D6] leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: "clamp(32px, 4.5vw, 62px)" }}
            >
              Everything You Need to Know,<br />Before You Stay.
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.28, ease }}
              className="origin-left mb-6"
              style={{ width: 44, height: 1, background: "rgba(200,169,126,0.55)" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.38, ease }}
              className="font-sans font-light text-[#F4E7D6]/55 leading-relaxed max-w-xl"
              style={{ fontSize: 14 }}
            >
              At Nature Kingdom, transparency and trust are at the heart of
              everything we do. Practical answers to the questions most guests
              ask before arriving.
            </motion.p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            STICKY CATEGORY NAV
        ═══════════════════════════════════════════════════ */}
        <nav
          className="sticky top-[61px] z-40 overflow-x-auto"
          style={{
            background: "#050505",
            borderBottom: "1px solid rgba(200,169,126,0.12)",
          }}
        >
          <div className="flex items-center min-w-max">
            {FAQ_CATEGORIES.map(({ num, label }, i) => (
              <a
                key={num}
                href={`#cat-${num}`}
                className="group flex-shrink-0 flex items-center gap-2.5 px-5 py-4 text-[9.5px] tracking-[0.28em] uppercase font-sans text-[#F4E7D6]/35 hover:text-[#C8A97E] transition-colors duration-300"
                style={{
                  borderRight:
                    i < FAQ_CATEGORIES.length - 1
                      ? "1px solid rgba(200,169,126,0.10)"
                      : "none",
                }}
              >
                <span className="text-[#C8A97E]/40 group-hover:text-[#C8A97E] transition-colors duration-300 font-medium">
                  {num}
                </span>
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* ═══════════════════════════════════════════════════
            FAQ SECTIONS — image left + accordion right
        ═══════════════════════════════════════════════════ */}
        {FAQ_CATEGORIES.map((cat) => {
          const catStartIndex = globalIdx;
          globalIdx += cat.items.length;

          return (
            <section
              key={cat.num}
              id={`cat-${cat.num}`}
              className="scroll-mt-28"
              style={{ borderBottom: "1px solid rgba(200,169,126,0.10)" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">

                {/* ── Left: Image ── */}
                <div className="relative min-h-[320px] lg:min-h-0 overflow-hidden">
                  <Image
                    src={cat.img ?? PLACEHOLDER}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover pointer-events-none select-none"
                  />
                  {/* Subtle right-side fade to blend into content */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to right, transparent 60%, rgba(5,5,5,0.45) 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "rgba(10,5,2,0.22)" }}
                  />
                </div>

                {/* ── Right: Accordion ── */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-6%" }}
                  transition={{ duration: 1, ease }}
                  className="px-8 sm:px-12 lg:px-14 py-14 lg:py-16 flex flex-col"
                  style={{ borderLeft: "1px solid rgba(200,169,126,0.08)" }}
                >
                  {/* Section label */}
                  <span
                    className="font-sans font-medium text-[#C8A97E] uppercase block mb-4"
                    style={{ fontSize: 9.5, letterSpacing: "0.38em" }}
                  >
                    {cat.num} — {cat.label}
                  </span>

                  {/* Section title */}
                  <h2
                    className="font-headline text-[#F4E7D6] leading-tight mb-8"
                    style={{ fontSize: "clamp(26px, 2.8vw, 40px)" }}
                  >
                    {cat.title}
                  </h2>

                  {/* Gold rule */}
                  <div
                    className="mb-2"
                    style={{ height: 1, background: "rgba(200,169,126,0.18)" }}
                  />

                  {/* Accordion items */}
                  <div>
                    {cat.items.map((item, itemIdx) => (
                      <AccordionItem
                        key={itemIdx}
                        item={item}
                        globalIndex={catStartIndex + itemIdx}
                        openIndex={openIndex}
                        setOpenIndex={setOpenIndex}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          );
        })}

        {/* ═══════════════════════════════════════════════════
            CTA — We're Here to Help
        ═══════════════════════════════════════════════════ */}
        <section
          className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 text-center"
          style={{ borderBottom: "1px solid rgba(200,169,126,0.10)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.2, ease }}
            className="max-w-2xl mx-auto"
          >
            <span
              className="font-sans font-medium text-[#C8A97E] uppercase block mb-5"
              style={{ fontSize: 9.5, letterSpacing: "0.42em" }}
            >
              Questions?
            </span>

            <h2
              className="font-headline text-[#F4E7D6] leading-tight mb-5"
              style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}
            >
              We're Here to Help.
            </h2>

            <p
              className="font-sans font-light text-[#F4E7D6]/45 leading-relaxed mb-10 mx-auto"
              style={{ fontSize: 14, maxWidth: 480 }}
            >
              If you have any questions about your stay, feel free to reach out
              to our team. We are straightforward about whether Nature Kingdom
              is the right fit for what you have in mind.
            </p>

            <a
              href="/book"
              className="btn-editorial inline-flex items-center gap-3 px-10 py-4 text-[10px] tracking-[0.3em] text-[#e9c349]"
            >
              Contact Us
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </section>
      </main>

      <LuxuryFooter />
    </div>
  );
}

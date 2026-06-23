"use client";

import { useState } from "react";
import SmoothScroll from "./SmoothScroll";
import Navigation from "./Navigation";
import SidebarRail from "./SidebarRail";
import Hero from "./Hero";
import Arrival from "./Arrival";
import BrandStory from "./BrandStory";
import Accommodation from "./Accommodation";
import ChapterDivider from "./ChapterDivider";
import LuxuryFooter from "./LuxuryFooter";
import TestimonialStories from "./TestimonialStories";
import PackagesSection, { type ApiPackage } from "./PackagesSection";
import LocationSection from "./LocationSection";
import EnquiryModal from "./EnquiryModal";

interface HomePageProps {
  initialPackages: ApiPackage[];
}

export default function HomePage({ initialPackages }: HomePageProps) {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-surface text-on-surface font-sans antialiased overflow-x-clip">
      <SmoothScroll />

      <Navigation onEnquireClick={() => setEnquiryOpen(true)} />
      <SidebarRail />
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />

      <main className="lg:pl-20">
        <Hero />
        <div className="bg-black h-20 lg:-ml-20 lg:w-[calc(100%+5rem)]" />
        <Arrival />

        <ChapterDivider
          number="1"
          title="Ethos & Philosophy"
          subtitle="The Silent Keepers"
          quote="We do not alter the landscape. We merely set boundaries where humans may observe it."
        />
        <BrandStory />

        <ChapterDivider
          number="2"
          title="Sanctuary & Dwelling"
          subtitle="Luxury Pavilions"
          quote="An authentic immersion within the sub-tropical foliage, leaving zero footprint, only stillness."
        />
        <Accommodation />

        <ChapterDivider
          number="3"
          title="Curated Experiences"
          subtitle="Our Packages"
          quote="Every stay is a chapter. Choose your story, and let the forest write the rest."
        />
        <PackagesSection initialPackages={initialPackages} />

        <LocationSection />
        <TestimonialStories />

        {/* FAQ teaser — full questions live at /faq */}
        <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-20 bg-[#0a0a0a] border-t border-on-surface/5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] tracking-[0.35em] text-[#e9c349] uppercase font-sans font-semibold block mb-3">
                Common Questions
              </span>
              <p className="font-headline text-2xl sm:text-3xl text-on-surface">
                Have questions before you book?
              </p>
            </div>
            <a
              href="/faq"
              className="btn-editorial flex-shrink-0 inline-block px-10 py-4 text-xs tracking-[0.25em] text-[#e9c349]"
            >
              Read the FAQ →
            </a>
          </div>
        </section>

        <LuxuryFooter />
      </main>
    </div>
  );
}

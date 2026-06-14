"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import SmoothScroll from "./components/SmoothScroll";
import Navigation from "./components/Navigation";
import SidebarRail from "./components/SidebarRail";
import Hero from "./components/Hero";
import Arrival from "./components/Arrival";
import BrandStory from "./components/BrandStory";
import ForestImmersion from "./components/ForestImmersion";
import Accommodation from "./components/Accommodation";
import KingdomBeyond from "./components/KingdomBeyond";
import ADayInTheForest from "./components/AdayInTheForest";
import Dining from "./components/Dining";
import ChapterDivider from "./components/ChapterDivider";
import CinematicCTA from "./components/CinematicCTA";
import LuxuryFooter from "./components/LuxuryFooter";
import TestimonialStories from "./components/TestimonialStories";
import PackagesSection from "./components/PackagesSection";
import LocationSection from "./components/LocationSection";

export default function App() {
  return (
    <div className="relative min-h-screen bg-surface text-on-surface font-sans antialiased overflow-x-clip">
      {/* Premium custom smooth scrolling driver */}
      <SmoothScroll />

      {/* Luxury layout frames & navigation */}
      <Navigation />
      <SidebarRail />

      {/* Main interactive sections */}
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
        <ForestImmersion />
        <Accommodation />

        <ChapterDivider
          number="3"
          title="The Kingdom Beyond"
          subtitle="Chikkamagaluru Chronicles"
          quote="Past the compound fence, an infinite theater of raw valleys and ancient Hoysala ruins await."
        />
        <KingdomBeyond />

        <ChapterDivider
          number="4"
          title="Chronology of Silence"
          subtitle="A Day in the Forest"
          quote="Measure your day not in hours, but in passing clouds, changing shadows, and wild choruses."
        />
        <ADayInTheForest />

        <ChapterDivider
          number="5"
          title="The Nourishment"
          subtitle="Simple Food, Extraordinary Setting"
          quote="Ancestral organic recipes simmered in hand-hammered copper, complementing the cool forest chill."
        />
        <Dining />

        <ChapterDivider
          number="6"
          title="Curated Experiences"
          subtitle="Our Packages"
          quote="Every stay is a chapter. Choose your story, and let the forest write the rest."
        />
        <PackagesSection />

        <LocationSection />

        {/* Testimonial Stories */}
        <TestimonialStories />

        {/* Final Cinematic Outro */}
        {/* <CinematicCTA /> */}

        {/* Footer */}
        <LuxuryFooter />
      </main>
    </div>
  );
}


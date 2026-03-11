"use client";

import Hero from "../Hero";
import PainPoints from "../PainPoints";
import ServicesCards from "../ServicesCards";
import CaseStudyPreview from "../CaseStudyPreview";
import WhyEaseWorkflow from "../WhyEaseWorkflow";
import CTASection from "../CTASection";

export default function Home() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Pain Points */}
        <PainPoints />

        {/* Services */}
        <ServicesCards />

        {/* Case Study */}
        <CaseStudyPreview />

        {/* Why EaseWorkflow */}
        <WhyEaseWorkflow />

        {/* CTA */}
        <CTASection />
      </main>

      {/* Gradient Animation */}
      <style jsx global>{`
        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
}
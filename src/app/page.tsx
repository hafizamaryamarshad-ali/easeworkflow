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
       <section
  style={{
    position: "relative",
    padding: "80px 20px",
    minHeight: "100vh",
    textAlign: "center",
    color: "#fff",
    overflow: "hidden",
    background: "transparent", // <-- removed extra gradient
  }}
>
          <Hero />
        </section>

        {/* Pain Points */}
        <section style={{ padding: "80px 20px" }}>
          <PainPoints />
        </section>

        {/* Services */}
        <section style={{ padding: "80px 20px" }}>
          <ServicesCards />
        </section>

        {/* Case Study */}
        <section style={{ padding: "80px 20px" }}>
          <CaseStudyPreview />
        </section>

        {/* Why EaseWorkflow */}
        <section style={{ padding: "80px 20px" }}>
          <WhyEaseWorkflow />
        </section>

        {/* CTA */}
        <section style={{ padding: "80px 20px" }}>
          <CTASection />
        </section>
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
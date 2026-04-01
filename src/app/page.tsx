"use client";

import Hero from "../Hero";
import PainPoints from "../PainPoints";
import ServicesCards from "../ServicesCards";
// import CaseStudyPreview from "../CaseStudyPreview";
import WhyEaseWorkflow from "../FeaturedProjects";
import CTASection from "../CTASection";
import PrivacySection from "../PrivacySection";
import ProcessSection from "../ProcessSection";
import Testimonials from "../Testimonials";
import FAQ from "../FAQ";

export default function Home() {
	return (
		<main>
			<Hero />
			<PainPoints />
			<ServicesCards />
			<ProcessSection />
			<PrivacySection />
			<Testimonials />
			{/* <CaseStudyPreview /> */}
			<FAQ />
			<WhyEaseWorkflow />
			<CTASection />
		</main>
	);
}
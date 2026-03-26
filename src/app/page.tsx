"use client";

import Hero from "../Hero";
import PainPoints from "../PainPoints";
import ServicesCards from "../ServicesCards";
import CaseStudyPreview from "../CaseStudyPreview";
import WhyEaseWorkflow from "../FeaturedProjects";
import CTASection from "../CTASection";
import PrivacySection from "../PrivacySection";

export default function Home() {
	return (
		<main>
			<Hero />
			<PainPoints />
			<ServicesCards />
			<PrivacySection />
			<CaseStudyPreview />
			<WhyEaseWorkflow />
			<CTASection />
		</main>
	);
}
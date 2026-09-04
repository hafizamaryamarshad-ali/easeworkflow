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

export default function HomeClient() {
	const organizationJsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		"@id": "https://www.easeworkflow.com/#organization",
		name: "EaseWorkflow",
		url: "https://www.easeworkflow.com/",
		logo: "https://www.easeworkflow.com/favicon-512.png",
	};
	const websiteJsonLd = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": "https://www.easeworkflow.com/#website",
		url: "https://www.easeworkflow.com/",
		name: "EaseWorkflow",
		publisher: { "@id": "https://www.easeworkflow.com/#organization" },
	};

	return (
		<main>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
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

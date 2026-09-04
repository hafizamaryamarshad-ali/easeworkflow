import type { ReactNode } from "react";
import { buildPageMetadata } from "../../lib/seo";

export const metadata = buildPageMetadata({
  title: "AI Healthcare Automation for Clinic Workflows | EaseWorkflow",
  description:
    "Use AI-assisted scheduling, EMR optimization, and patient notifications to reduce repetitive clinic work and improve workflow efficiency.",
  path: "/healthcare-automation",
  imageUrl: "/images/telemedicine.jpg",
});

export default function HealthcareAutomationLayout({ children }: { children: ReactNode }) {
  return children;
}

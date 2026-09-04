import type { ReactNode } from "react";
import { buildPageMetadata } from "../../lib/seo";

export const metadata = buildPageMetadata({
  title: "Healthcare Automation Services for Clinics | EaseWorkflow",
  description:
    "Explore healthcare automation services for EMR integration, appointment scheduling, telemedicine, clinical workflows, and operational analytics.",
  path: "/services-details",
  imageUrl: "/images/our-services.png",
});

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children;
}

import type { ReactNode } from "react";
import { buildPageMetadata } from "../../lib/seo";

export const metadata = buildPageMetadata({
  title: "Book a Clinic Automation Consultation | EaseWorkflow",
  description:
    "Schedule a conversation with EaseWorkflow about healthcare workflow automation for your clinic or medical practice.",
  path: "/booking",
  noIndex: true,
});

export default function BookingLayout({ children }: { children: ReactNode }) {
  return children;
}

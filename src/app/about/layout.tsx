import type { ReactNode } from "react";
import { buildPageMetadata } from "../../lib/seo";

export const metadata = buildPageMetadata({
  title: "About EaseWorkflow | Healthcare Automation Team",
  description:
    "Learn how EaseWorkflow approaches healthcare workflow automation, secure system integration, and practical technology for modern clinics.",
  path: "/about",
  imageUrl: "/images/about-illustration.png",
});

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}

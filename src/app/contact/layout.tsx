import type { ReactNode } from "react";
import { buildPageMetadata } from "../../lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact EaseWorkflow | Discuss Clinic Automation",
  description:
    "Tell EaseWorkflow about a repetitive clinic workflow and discuss practical options for healthcare automation, system integration, and implementation.",
  path: "/contact",
  imageUrl: "/contact-illustration.png",
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}

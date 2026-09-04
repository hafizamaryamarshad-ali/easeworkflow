import type { ReactNode } from "react";
import { buildPageMetadata } from "../../lib/seo";

export const metadata = buildPageMetadata({
  title: "EaseWorkflow Team | Healthcare Automation Specialists",
  description:
    "Meet the people building healthcare workflow automation, AI integrations, and dependable digital systems at EaseWorkflow.",
  path: "/team",
  imageUrl: "/images/team-collaboration.png",
});

export default function TeamLayout({ children }: { children: ReactNode }) {
  return children;
}

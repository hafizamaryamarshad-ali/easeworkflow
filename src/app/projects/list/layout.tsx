import type { ReactNode } from "react";
import { buildPageMetadata } from "../../../lib/seo";

export const metadata = buildPageMetadata({
  title: "Healthcare Automation Projects | EaseWorkflow",
  description: "Browse EaseWorkflow healthcare automation projects.",
  path: "/projects",
  noIndex: true,
});

export default function ProjectListLayout({ children }: { children: ReactNode }) {
  return children;
}

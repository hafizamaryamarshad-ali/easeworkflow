import CaseStudiesClient from "./CaseStudiesClient";
import { fetchCaseStudies } from "../../lib/fetchCaseStudies";
import { buildPageMetadata } from "../../lib/seo";

export const metadata = buildPageMetadata({
  title: "Clinic Workflow Automation Case Studies | EaseWorkflow",
  description:
    "See how EaseWorkflow approached clinic workflow automation, implementation challenges, safeguards, and outcomes across real healthcare systems.",
  path: "/case-studies",
  imageUrl: "/images/case1.jpg",
});

export default async function CaseStudiesPage() {
  const caseStudies = await fetchCaseStudies();
  return <CaseStudiesClient initialCaseStudies={caseStudies.filter((study) => Boolean(study.slug))} />;
}

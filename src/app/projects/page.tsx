import ProjectsList from "./list/page";
import { fetchProjects } from "../../lib/fetchProjects";
import { buildPageMetadata } from "../../lib/seo";

export const metadata = buildPageMetadata({
  title: "Healthcare Automation Projects | EaseWorkflow",
  description:
    "Explore implemented healthcare automation systems for patient registration, insurance eligibility, SOAP notes, telemedicine, document handling, and clinic calls.",
  path: "/projects",
  imageUrl: "/images/dashboard.jpg",
});

export default async function ProjectsPage() {
  const projects = await fetchProjects();
  return <ProjectsList initialProjects={projects} />;
}

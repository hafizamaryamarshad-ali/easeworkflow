import HomeClient from "./HomeClient";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: "Clinic Workflow Automation for Medical Practices | EaseWorkflow",
  description:
    "Automate patient intake, EMR data entry, insurance verification, SOAP notes, and follow-ups so clinic teams spend less time on repetitive administration.",
  path: "/",
  imageUrl: "/images/telemedicine.jpg",
});

export default function HomePage() {
  return <HomeClient />;
}

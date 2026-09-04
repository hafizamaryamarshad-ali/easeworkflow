import "./globals.css";
import SiteLayout from "./SiteLayout";
import Script from "next/script";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const timestamp = new Date().toISOString().split('T')[0]; // Cache bust with date

export const metadata = {
  metadataBase: new URL("https://www.easeworkflow.com"),
  title: "Clinic Workflow Automation for Medical Practices | EaseWorkflow",
  description:
    "Automate patient intake, EMR data entry, insurance verification, SOAP notes, and follow-ups so clinic teams spend less time on repetitive administration.",
  icons: {
    icon: [
      {
        url: `/favicon.ico?v=${timestamp}`,
        sizes: "any",
      },
      {
        url: `/logo18.png?v=${timestamp}`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: `/apple-touch-icon.png?v=${timestamp}`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EaseWorkflow",
  },
  openGraph: {
    title: "Clinic Workflow Automation for Medical Practices | EaseWorkflow",
    description:
      "Automate patient intake, EMR data entry, insurance verification, SOAP notes, and follow-ups so clinic teams spend less time on repetitive administration.",
    url: "/",
    type: "website",
    images: [
      {
        url: `/logo18.png?v=${timestamp}`,
        width: 512,
        height: 512,
        alt: "EaseWorkflow Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinic Workflow Automation for Medical Practices | EaseWorkflow",
    description:
      "Automate patient intake, EMR data entry, insurance verification, SOAP notes, and follow-ups so clinic teams spend less time on repetitive administration.",
    images: [`/images/telemedicine.jpg?v=${timestamp}`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <SiteLayout>{children}</SiteLayout>
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}

import "./globals.css";
import Navbar from "../Navbar";
import ScrollToTop from "../ScrollToTop";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EaseWorkflow - Healthcare Automation Solutions for Clinics",
  description:
    "Automate your clinic's workflow with EaseWorkflow. Smart healthcare automation for appointments, EMR integration, and patient management. Trusted by clinics for efficiency.",
  keywords: "healthcare automation, clinic workflow, EMR integration, appointment scheduling, telemedicine, medical automation",
  authors: [{ name: "EaseWorkflow" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://easeworkflow.com",
    siteName: "EaseWorkflow",
    title: "EaseWorkflow - Healthcare Automation Solutions for Clinics",
    description:
      "Automate your clinic's workflow with EaseWorkflow. Smart healthcare automation for appointments, EMR integration, and patient management.",
    images: [
      {
        url: "https://easeworkflow.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EaseWorkflow Healthcare Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EaseWorkflow - Healthcare Automation Solutions",
    description:
      "Automate your clinic's workflow with smart healthcare automation solutions.",
    images: ["https://easeworkflow.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "EaseWorkflow",
              description: "Healthcare automation solutions for clinics",
              url: "https://easeworkflow.com",
              logo: "https://easeworkflow.com/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-234-567-890",
                contactType: "Customer Service",
              },
            }),
          }}
        />
      </head>
      <body
        className={inter.className}
        style={{
          margin: 0,
          backgroundColor: "#f9fafb",
          color: "#111",
        }}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        
        <Navbar />

        <main id="main-content">{children}</main>

        <ScrollToTop />

        <footer
          style={{
            textAlign: "center",
            padding: "40px 20px",
            background: "#111",
            color: "#fff",
            fontSize: "0.9rem",
          }}
        >
          © {new Date().getFullYear()} EaseWorkflow. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
import "./globals.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ThemeProvider from "../theme/ThemeProvider";
import BackButton from "../BackButton";
import SideButtons from "../../src/SideButtons"; // ✅ ADDED
import Script from "next/script";
import type { Metadata } from "next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const metadata: Metadata = {
  metadataBase: new URL("https://easeworkflow.com"),

  // ✅ FIX: Canonical (Google confusion solve)
  alternates: {
    canonical: "https://easeworkflow.com",
  },

  // ✅ FIX: Strong favicon signals for Google
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  title: {
    default: "EaseWorkflow",
    template: "%s | EaseWorkflow",
  },
  description:
    "EaseWorkflow helps healthcare teams automate clinic workflows with practical, production-ready software.",

  openGraph: {
    type: "website",
    siteName: "EaseWorkflow",
    url: "https://easeworkflow.com",
    title: "EaseWorkflow",
    description:
      "EaseWorkflow helps healthcare teams automate clinic workflows with practical, production-ready software.",
    images: [
      {
        url: "/images/telemedicine.jpg",
        width: 1200,
        height: 630,
        alt: "EaseWorkflow",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EaseWorkflow",
    description:
      "EaseWorkflow helps healthcare teams automate clinic workflows with practical, production-ready software.",
    images: ["/images/telemedicine.jpg"],
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <ThemeProvider>
          <Navbar />
          <SideButtons /> {/* ✅ ADDED */}
          <BackButton />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>

        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
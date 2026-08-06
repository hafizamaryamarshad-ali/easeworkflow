import "./globals.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ThemeProvider from "../theme/ThemeProvider";
import BackButton from "../BackButton";
import SideButtons from "../../src/SideButtons"; // ✅ ADDED
import Script from "next/script";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const timestamp = new Date().toISOString().split('T')[0]; // Cache bust with date

export const metadata = {
  title: "EaseWorkflow - Healthcare Automation",
  description:
    "Automate your clinic's workflow with EaseWorkflow. Trusted by US clinics for healthcare automation solutions.",
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
    images: [
      {
        url: `/logo18.png?v=${timestamp}`,
        width: 512,
        height: 512,
        alt: "EaseWorkflow Logo",
      },
    ],
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
        <ThemeProvider>
          <Navbar />
          <SideButtons /> {/* ✅ ADDED */}
          <BackButton />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
         {/* ✅ ADD THIS (VERY IMPORTANT) */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}

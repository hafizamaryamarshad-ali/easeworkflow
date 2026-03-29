import "./globals.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ThemeProvider from "../theme/ThemeProvider";
import BackButton from "../BackButton";
import SideButtons from "../../src/SideButtons"; // ✅ ADDED

export const metadata = {
  title: "EaseWorkflow - Healthcare Automation",
  description:
    "Automate your clinic's workflow with EaseWorkflow. Trusted by US clinics for healthcare automation solutions.",
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
      </body>
    </html>
  );
}

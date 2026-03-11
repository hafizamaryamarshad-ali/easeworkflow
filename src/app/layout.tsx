import "./globals.css";
import Navbar from "../Navbar";

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
          backgroundColor: "#f9fafb",
          color: "#111",
        }}
      >
        <Navbar />

        <main>{children}</main>

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
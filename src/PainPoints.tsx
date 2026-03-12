"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaClock, FaUserMd, FaFileMedical, FaLaptopMedical } from "react-icons/fa";

const points = [
  {
    Icon: FaClock,
    title: "Missed Appointments",
    description: "Automate scheduling to reduce no-shows and save time for both staff and patients.",
  },
  {
    Icon: FaUserMd,
    title: "Staff Overload",
    description: "Let smart workflows handle repetitive tasks so your medical staff can focus on patients.",
  },
  {
    Icon: FaFileMedical,
    title: "EMR Inefficiencies",
    description: "Streamline Electronic Medical Records with smart data entry and retrieval.",
  },
  {
    Icon: FaLaptopMedical,
    title: "Manual Follow-ups",
    description: "Automated reminders keep patients informed and engaged without manual effort.",
  },
];

export default function PainPoints() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Track body background like Hero
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const bg = getComputedStyle(document.body).background;
      if (bg.includes("linear-gradient")) setTheme("dark");
      else setTheme("light");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  const bgColors = {
    dark: "#0f172a",
    light: "#f5f7fa",
  };
  const cardBg = {
    dark: "#1e293b",
    light: "#ffffff",
  };
  const textColor = {
    dark: "#f8fafc",
    light: "#111",
  };
  const subTextColor = {
    dark: "#cbd5e1",
    light: "#334155",
  };
  const iconColor = {
    dark: "#0ea5e9",
    light: "#3b82f6",
  };
  const boxShadow = {
    dark: "0 12px 28px rgba(0,0,0,0.35)",
    light: "0 12px 28px rgba(0,0,0,0.1)",
  };

  return (
    <section
      style={{
        minHeight: "80vh",
        padding: "80px 20px",
        background: bgColors[theme],
        color: textColor[theme],
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "all 0.5s ease",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "2.5rem",
          fontWeight: 900,
          marginBottom: "60px",
          color: textColor[theme],
        }}
      >
        Common Clinic Challenges
      </motion.h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {points.map((point, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            style={{
              background: cardBg[theme],
              padding: "30px",
              borderRadius: "24px",
              boxShadow: boxShadow[theme],
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              transition: "all 0.5s ease",
            }}
          >
            <point.Icon style={{ fontSize: "48px", color: iconColor[theme] }} />
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: textColor[theme] }}>
              {point.title}
            </h3>
            <p style={{ fontSize: "1rem", color: subTextColor[theme], lineHeight: "1.5" }}>
              {point.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
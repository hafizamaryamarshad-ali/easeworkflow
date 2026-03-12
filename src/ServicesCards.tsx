"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRobot, FaFileMedical, FaCalendarCheck, FaMobileAlt } from "react-icons/fa";

const services = [
  {
    Icon: FaRobot,
    title: "Automation & Workflow",
    description:
      "Streamline your clinic operations with smart automation for appointments, reminders, and EMR tasks.",
  },
  {
    Icon: FaFileMedical,
    title: "EMR Integration",
    description:
      "Connect all your patient records and reports in a secure, error-free digital system.",
  },
  {
    Icon: FaCalendarCheck,
    title: "Scheduling & Follow-ups",
    description:
      "Manage appointments, cancellations, and patient follow-ups efficiently and automatically.",
  },
  {
    Icon: FaMobileAlt,
    title: "Telemedicine & Remote Care",
    description:
      "Provide consultations remotely and keep patient care uninterrupted, even online.",
  },
];

export default function Services() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Track body background theme dynamically
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const bg = getComputedStyle(document.body).background;
      if (bg.includes("linear-gradient")) setTheme("dark");
      else setTheme("light");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  const bgColors = { dark: "#0f172a", light: "#f5f7fa" };
  const cardBg = { dark: "#1e293b", light: "#ffffff" };
  const textColor = { dark: "#f8fafc", light: "#111" };
  const subTextColor = { dark: "#cbd5e1", light: "#334155" };
  const iconColor = { dark: "#0ea5e9", light: "#3b82f6" };
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
        style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "60px", color: textColor[theme] }}
      >
        Our Services
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
        {services.map((service, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
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
              cursor: "pointer",
              transition: "all 0.5s ease",
            }}
          >
            <service.Icon style={{ fontSize: "2.5rem", color: iconColor[theme] }} />
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: textColor[theme] }}>{service.title}</h3>
            <p style={{ fontSize: "1rem", color: subTextColor[theme], lineHeight: "1.5" }}>
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
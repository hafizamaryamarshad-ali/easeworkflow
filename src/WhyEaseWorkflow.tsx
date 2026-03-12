"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaClock, FaShieldAlt, FaChartLine, FaHandsHelping } from "react-icons/fa";

const benefits = [
  {
    Icon: FaClock,
    title: "Save Time",
    description:
      "Automate appointments, reminders, and follow-ups, freeing up time for patient care.",
  },
  {
    Icon: FaShieldAlt,
    title: "Reduce Errors",
    description:
      "Minimize manual mistakes with intelligent EMR integration and automated processes.",
  },
  {
    Icon: FaChartLine,
    title: "Scale Efficiently",
    description:
      "Gain actionable insights and analytics to grow your clinic operations smoothly.",
  },
  {
    Icon: FaHandsHelping,
    title: "Better Patient Care",
    description:
      "Focus on what matters most—delivering exceptional care while automation handles the rest.",
  },
];

export default function WhyUs() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const bg = getComputedStyle(document.body).background;
      if (bg.includes("linear-gradient")) setTheme("dark");
      else setTheme("light");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  const bgColors = { dark: "#020617", light: "#f8fafc" };
  const textColors = { dark: "#f8fafc", light: "#0f172a" };
  const cardBg = { dark: "rgba(30,41,59,0.85)", light: "#ffffff" };
  const iconBg = "linear-gradient(135deg,#0ea5e9,#2563eb)";
  const subTextColor = { dark: "#cbd5f5", light: "#475569" };
  const boxShadow = { dark: "0 25px 50px rgba(0,0,0,0.45)", light: "0 12px 28px rgba(59,130,246,0.15)" };

  return (
    <section
      style={{
        position: "relative",
        padding: "130px 20px",
        background: bgColors[theme],
        color: textColors[theme],
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Animated gradient blobs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle,#0ea5e955,transparent)",
          filter: "blur(120px)",
          top: "-150px",
          left: "-150px",
        }}
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 28, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle,#2563eb55,transparent)",
          filter: "blur(120px)",
          bottom: "-150px",
          right: "-150px",
        }}
      />

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          fontSize: "2.8rem",
          fontWeight: 900,
          marginBottom: "110px",
          position: "relative",
          zIndex: 2,
        }}
      >
        Why Choose EaseWorkflow?
      </motion.h2>

      {/* Benefit Cards */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {benefits.map((benefit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            whileHover={{ y: -8, scale: 1.03 }}
            style={{
              flex: "1 1 260px", // ensures responsive fit
              maxWidth: "280px",
              background: cardBg[theme],
              padding: "40px",
              borderRadius: "24px",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: boxShadow[theme],
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              transition: "all 0.35s ease",
            }}
          >
            {/* Icon circle */}
            <div
              style={{
                minWidth: "95px",
                height: "95px",
                borderRadius: "50%",
                background: iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 20px 40px rgba(59,130,246,0.6)",
              }}
            >
              <benefit.Icon style={{ fontSize: "36px", color: "#fff" }} />
            </div>

            <h3 style={{ fontSize: "1.55rem", fontWeight: 700 }}>{benefit.title}</h3>
            <p style={{ fontSize: "1rem", lineHeight: "1.7", color: subTextColor[theme] }}>
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
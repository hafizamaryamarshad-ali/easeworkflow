"use client";

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
  return (
    <section
      style={{
        minHeight: "80vh",
        padding: "80px 20px",
        background: "#1e293b",
        color: "#f8fafc",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "60px" }}
      >
        Why Choose EaseWorkflow?
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
        {benefits.map((benefit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            style={{
              background: "#0f172a",
              padding: "30px",
              borderRadius: "24px",
              boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <benefit.Icon style={{ fontSize: "2.5rem", color: "#0ea5e9" }} />
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>{benefit.title}</h3>
            <p style={{ fontSize: "1rem", color: "#cbd5e1", lineHeight: "1.5" }}>
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
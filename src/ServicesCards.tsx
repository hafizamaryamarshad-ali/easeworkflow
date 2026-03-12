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

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const bg = getComputedStyle(document.body).background;
      if (bg.includes("linear-gradient")) setTheme("dark");
      else setTheme("light");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  const bg = { dark: "#020617", light: "#f8fafc" };
  const text = { dark: "#f8fafc", light: "#0f172a" };
  const sub = { dark: "#cbd5f5", light: "#475569" };
  const iconColor = { dark: "#38bdf8", light: "#2563eb" };

  return (
    <section
      style={{
        position: "relative",
        padding: "130px 20px",
        background: bg[theme],
        overflow: "hidden",
        color: text[theme],
      }}
    >
      {/* Animated background blobs */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -60, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle,#2563eb55,transparent)",
          filter: "blur(140px)",
          top: "-200px",
          left: "-200px",
        }}
      />
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle,#06b6d455,transparent)",
          filter: "blur(140px)",
          bottom: "-200px",
          right: "-200px",
        }}
      />

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          textAlign: "center",
          fontSize: "2.8rem",
          fontWeight: 900,
          marginBottom: "110px",
          position: "relative",
          zIndex: 2,
        }}
      >
        Our Services
      </motion.h2>

      {/* Cards */}
      <div
        style={{
          maxWidth: "1050px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "70px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              display: "flex",
              flexDirection: i % 2 === 0 ? "row" : "row-reverse",
              alignItems: "center",
              gap: "40px",
            }}
          >
            {/* Icon Circle */}
            <div
              style={{
                minWidth: "95px",
                height: "95px",
                borderRadius: "50%",
                background: "linear-gradient(135deg,#0ea5e9,#2563eb)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 20px 40px rgba(59,130,246,0.6)",
              }}
            >
              <service.Icon style={{ fontSize: "36px", color: "#fff" }} />
            </div>

            {/* Card */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              style={{
                flex: 1,
                padding: "40px",
                borderRadius: "22px",
                background:
                  "linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 25px 50px rgba(0,0,0,0.45)",
                transition: "all 0.35s ease",
                position: "relative",
              }}
            >
              {/* subtle gradient border */}
              <div
                style={{
                  position: "absolute",
                  inset: "-1px",
                  borderRadius: "22px",
                  background: "linear-gradient(120deg,#0ea5e9,transparent,transparent)",
                  opacity: 0.15,
                  zIndex: 0,
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <h3
                  style={{
                    fontSize: "1.55rem",
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  {service.title}
                </h3>

                <p style={{ fontSize: "1rem", lineHeight: "1.7", color: sub[theme] }}>
                  {service.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
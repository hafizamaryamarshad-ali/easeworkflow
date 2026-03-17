"use client";

import { motion } from "framer-motion";
import { FaClock, FaUserMd, FaFileMedical, FaLaptopMedical } from "react-icons/fa";
import { useTheme } from "./theme/ThemeProvider";

const points = [
  {
    Icon: FaClock,
    title: "Missed Appointments",
    description:
      "Automate scheduling to reduce no-shows and save time for both staff and patients.",
  },
  {
    Icon: FaUserMd,
    title: "Staff Overload",
    description:
      "Let smart workflows handle repetitive tasks so your medical staff can focus on patients.",
  },
  {
    Icon: FaFileMedical,
    title: "EMR Inefficiencies",
    description:
      "Streamline Electronic Medical Records with smart data entry and retrieval.",
  },
  {
    Icon: FaLaptopMedical,
    title: "Manual Follow-ups",
    description:
      "Automated reminders keep patients informed and engaged without manual effort.",
  },
];

export default function PainPoints() {
  const { theme } = useTheme();

  const bg = {
    dark: "#020617",
    light: "#f8fafc",
  };

  const text = {
    dark: "#f8fafc",
    light: "#0f172a",
  };

  const sub = {
    dark: "#cbd5f5",
    light: "#475569",
  };

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
      {/* Animated Background Glow */}
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

      {/* Title */}
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
        Common Clinic Challenges
      </motion.h2>

      {/* Content */}
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
        {points.map((point, i) => (
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
            {/* Icon */}
            <div
              style={{
                minWidth: "95px",
                height: "95px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg,#0ea5e9,#2563eb)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 20px 40px rgba(59,130,246,0.6)",
              }}
            >
              <point.Icon
                style={{
                  fontSize: "36px",
                  color: "#fff",
                }}
              />
            </div>

            {/* Card */}
            <motion.div
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              style={{
                flex: 1,
                padding: "40px",
                borderRadius: "22px",
                background:
                  "linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "0 25px 50px rgba(0,0,0,0.45)",
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
                  background:
                    "linear-gradient(120deg,#0ea5e9,transparent,transparent)",
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
                  {point.title}
                </h3>

                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.7",
                    color: sub[theme],
                  }}
                >
                  {point.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
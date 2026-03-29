"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";

export default function AboutPage() {
  const { theme } = useTheme();

  const textColor = theme === "dark" ? "#e2e8f0" : "#0f172a";
  const subText = theme === "dark" ? "#94a3b8" : "#475569";

  const values = [
    {
      title: "Innovation",
      desc: "We continuously explore and implement advanced technologies to build intelligent healthcare systems that solve real-world problems and improve efficiency.",
    },
    {
      title: "Integrity",
      desc: "We follow strong ethical principles and ensure honesty in every solution we deliver, building long-term trust with our clients.",
    },
    {
      title: "Transparency",
      desc: "We maintain clear communication and open processes so that clients remain fully informed throughout the entire development lifecycle.",
    },
    {
      title: "Excellence",
      desc: "We focus on delivering high-quality, reliable, and scalable solutions that exceed expectations and set new industry standards.",
    },
    {
      title: "Security",
      desc: "We prioritize data protection and implement secure systems to ensure patient information remains safe and compliant with healthcare standards.",
    },
    {
      title: "Reliability",
      desc: "Our systems are built for stability and consistency, ensuring they perform seamlessly in critical healthcare environments.",
    },
    {
      title: "Scalability",
      desc: "Our solutions are designed to grow with your organization, supporting increasing workloads without compromising performance.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      style={{
        padding: "60px 20px 120px 20px",
        background:
          theme === "dark"
            ? "radial-gradient(circle at top, #020617, #010314)"
            : "radial-gradient(circle at top, #f8fafc, #ffffff)",
        color: textColor,
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "auto" }}>
        {/* HERO TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: "3.8rem",
            fontWeight: 900,
            textAlign: "center",
            letterSpacing: "-1.5px",
          }}
        >
          About EaseWorkflow
        </motion.h1>

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: subText,
            maxWidth: "850px",
            marginInline: "auto",
            lineHeight: 1.8,
            fontSize: "1.15rem",
          }}
        >
          We design intelligent healthcare automation systems that simplify workflows,
          reduce manual effort, and enhance patient care using modern AI-driven solutions.
        </p>

        {/* ================= STATS (ADDED) ================= */}
        <div
          style={{
            marginTop: "80px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "25px",
          }}
        >
          {[
            { number: "400+", label: "Solutions Delivered" },
            { number: "10+", label: "Years of Driving Growth" },
            { number: "95%", label: "Customer Satisfaction" },
            { number: "15+", label: "Industries Served" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: "30px 20px",
                borderRadius: "16px",
                textAlign: "center",
                background:
                  theme === "dark"
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(0,0,0,0.03)",
                border:
                  theme === "dark"
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <h2
                style={{
                  fontSize: "2.3rem",
                  fontWeight: 900,
                  color: "#0ea5e9",
                }}
              >
                {item.number}
              </h2>

              <p
                style={{
                  marginTop: "10px",
                  color: subText,
                  fontWeight: 500,
                }}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ================= MISSION ================= */}
        <div
          style={{
            marginTop: "100px",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "70px",
            alignItems: "center",
          }}
        >
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span style={{ color: "#0ea5e9", fontWeight: 700, letterSpacing: "2px" }}>
              OUR PURPOSE
            </span>

            <h2 style={{ fontSize: "3rem", fontWeight: 900, marginTop: "10px" }}>
              Our Mission
            </h2>

            <p style={{ marginTop: "25px", lineHeight: 1.9, color: subText }}>
              Our mission is to transform healthcare systems by integrating intelligent automation,
              AI-powered workflows, and scalable digital solutions that improve efficiency, accuracy, and performance.
            </p>

            <p style={{ marginTop: "18px", lineHeight: 1.9, color: subText }}>
              We aim to reduce administrative burden, eliminate inefficiencies, and enable healthcare professionals
              to focus entirely on what matters most—delivering exceptional patient care.
            </p>
          </motion.div>

          <motion.img
            src="images/about-illustration.png"
            alt="Mission"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              width: "100%",
              borderRadius: "26px",
              boxShadow:
                theme === "dark"
                  ? "0 50px 120px rgba(0,0,0,0.85)"
                  : "0 50px 120px rgba(0,0,0,0.12)",
            }}
          />
        </div>

        {/* ================= VISION ================= */}
        <div
          style={{
            marginTop: "120px",
            display: "grid",
            gridTemplateColumns: "0.8fr 1.2fr",
            gap: "70px",
            alignItems: "center",
          }}
        >
          <motion.img
            src="images/team-collaboration.png"
            alt="Vision"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              width: "100%",
              borderRadius: "26px",
              boxShadow:
                theme === "dark"
                  ? "0 50px 120px rgba(0,0,0,0.85)"
                  : "0 50px 120px rgba(0,0,0,0.12)",
            }}
          />

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span style={{ color: "#0ea5e9", fontWeight: 700, letterSpacing: "2px" }}>
              FUTURE DIRECTION
            </span>

            <h2 style={{ fontSize: "3rem", fontWeight: 900, marginTop: "10px" }}>
              Our Vision
            </h2>

            <p style={{ marginTop: "25px", lineHeight: 1.9, color: subText }}>
              Our vision is to create a fully connected and intelligent healthcare ecosystem
              where technology works seamlessly to enhance patient outcomes and operational efficiency.
            </p>

            <p style={{ marginTop: "18px", lineHeight: 1.9, color: subText }}>
              We strive to become a global leader in healthcare technology by setting new benchmarks in innovation,
              reliability, and digital transformation across the industry.
            </p>
          </motion.div>
        </div>

        {/* ================= VALUES ================= */}
        <div
          style={{
            marginTop: "130px",
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: "60px",
          }}
        >
          {/* LEFT NAV */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {values.map((v, i) => {
              const active = activeIndex === i;

              return (
                <motion.button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    padding: "16px 18px",
                    borderRadius: "14px",
                    textAlign: "left",
                    fontWeight: 600,
                    border: active
                      ? "1px solid rgba(14,165,233,0.6)"
                      : "1px solid rgba(148,163,184,0.15)",
                    background: active
                      ? "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(37,99,235,0.15))"
                      : "transparent",
                    color: active
                      ? "#0ea5e9"
                      : theme === "dark"
                      ? "#e2e8f0"
                      : "#0f172a",
                  }}
                >
                  {v.title}
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT CARD */}
          <div style={{ position: "relative", minHeight: "460px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "330px",
                  padding: "30px",
                  borderRadius: "26px",
                  background:
                    theme === "dark"
                      ? "linear-gradient(160deg, #0f172a, #020617)"
                      : "linear-gradient(160deg, #ffffff, #f8fafc)",
                  border:
                    theme === "dark"
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <h3 style={{ fontSize: "2.3rem", fontWeight: 900 }}>
                  {values[activeIndex].title}
                </h3>

                <p
                  style={{
                    marginTop: "22px",
                    lineHeight: 2,
                    fontSize: "1.1rem",
                    color: subText,
                  }}
                >
                  {values[activeIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
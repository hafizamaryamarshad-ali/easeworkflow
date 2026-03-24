"use client";

import { motion } from "framer-motion";
import { FiCpu, FiGlobe, FiShield } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useTheme } from "../../theme/ThemeProvider";

export default function AboutPage() {
  const router = useRouter();
  const { theme } = useTheme();

  const sectionBg = {
    dark: "var(--color-page-gradient-dark)",
    light: "var(--color-bg-light)",
  };
  const textColor = { dark: "var(--color-text-primary)", light: "var(--color-text-dark)" };
  const subText = { dark: "var(--color-text-muted)", light: "var(--color-text-muted-light)" };
  const accent = { dark: "var(--color-primary)", light: "var(--color-secondary)" };
  const cardBg = { dark: "var(--color-card-dark)", light: "var(--color-card-light)" };
  const cardBorder = {
    dark: "1px solid var(--color-border-dark)",
    light: "1px solid var(--color-border-light)",
  };

  return (
    <section
      style={{
        position: "relative",
        padding: "100px 20px",
        minHeight: "100vh",
        color: textColor[theme],
        backgroundColor: theme === "dark" ? "var(--color-bg)" : "var(--color-bg-light)",
        backgroundImage: theme === "dark" ? sectionBg.dark : "none",
        backgroundSize: "400% 400%",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "8px 14px",
          borderRadius: "10px",
          border:
            theme === "dark"
              ? "1px solid var(--color-border-dark)"
              : "1px solid var(--color-border-light)",
          background: theme === "dark" ? "var(--color-card-dark)" : "var(--color-card-light)",
          backdropFilter: theme === "dark" ? "blur(10px)" : "none",
          color: accent[theme],
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        ← Back
      </button>

      <div style={{ maxWidth: "68.75rem", margin: "auto" }}>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: "3rem",
            fontWeight: 900,
            textAlign: "center",
            marginBottom: "30px",
            color: textColor[theme],
            background: "none",
            WebkitBackgroundClip: "unset",
          }}
        >
          About EaseWorkflow
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: "1.15rem",
            lineHeight: 1.8,
            maxWidth: "53.125rem",
            margin: "auto",
            textAlign: "center",
            opacity: 0.95,
            color: subText[theme],
          }}
        >
          EaseWorkflow is a premium healthcare automation agency delivering
          AI-driven solutions, workflow optimization, and digital transformation
          to modern healthcare institutions.
        </motion.p>

        {/* Cards */}
        <div
          style={{
            marginTop: "90px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
          }}
        >
          {[
            {
              title: "Our Mission",
              icon: <FiCpu size={26} />,
              desc: "Our mission is to transform healthcare operations through smart automation, AI-driven workflows, and digital innovation to reduce manual workload and improve efficiency.",
            },
            {
              title: "Our Vision",
              icon: <FiGlobe size={26} />,
              desc: "Our vision is to become a global leader in healthcare technology by delivering scalable, secure, and intelligent systems that empower medical institutions worldwide.",
            },
            {
              title: "Our Values",
              icon: <FiShield size={26} />,
              desc: "We value innovation, integrity, transparency, and excellence. Every solution is built with long-term reliability, security, and trust at its core.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              style={{
                padding: "32px",
                borderRadius: "20px",
                background: cardBg[theme],
                backdropFilter: theme === "dark" ? "blur(20px)" : "none",
                border: cardBorder[theme],
                textAlign: "left",
              }}
            >
              <div style={{ color: accent[theme], marginBottom: "12px" }}>
                {item.icon}
              </div>

              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  marginBottom: "10px",
                }}
              >
                {item.title}
              </h3>

              <p style={{ lineHeight: 1.7, opacity: 0.95, color: subText[theme] }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Images Row */}
        <div
          style={{
            marginTop: "90px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            alignItems: "center",
          }}
        >
          <motion.img
            src="images/about-illustration.png"
            alt="Healthcare Automation"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              width: "100%",
              borderRadius: "18px",
              boxShadow:
                theme === "dark"
                  ? "var(--shadow-soft-dark)"
                  : "var(--shadow-soft-light)",
            }}
          />

          <motion.img
            src="images/team-collaboration.png"
            alt="Team Collaboration"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              width: "100%",
              borderRadius: "18px",
              boxShadow:
                theme === "dark"
                  ? "var(--shadow-soft-dark)"
                  : "var(--shadow-soft-light)",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}
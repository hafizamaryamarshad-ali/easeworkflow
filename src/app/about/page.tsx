"use client";

import { motion } from "framer-motion";
import { FiCpu, FiGlobe, FiShield } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useTheme } from "../../theme/ThemeProvider";

export default function AboutPage() {
  const router = useRouter();
  const { theme } = useTheme();

  const floatingIcons = [
    { Icon: FiCpu, size: 52, top: "10%", left: "8%", speed: 16, opacity: 0.14 },
    { Icon: FiGlobe, size: 44, top: "24%", left: "88%", speed: 18, opacity: 0.12 },
    { Icon: FiShield, size: 56, top: "78%", left: "6%", speed: 20, opacity: 0.13 },
    { Icon: FiCpu, size: 40, top: "40%", left: "4%", speed: 19, opacity: 0.1 },
    { Icon: FiGlobe, size: 38, top: "62%", left: "92%", speed: 17, opacity: 0.11 },
    { Icon: FiShield, size: 48, top: "16%", left: "80%", speed: 21, opacity: 0.12 },
  ];

  const sectionBg = {
    dark: "var(--bg-gradient-dark)",
    light: "#f5f7fa",
  };

  const textColor = {
    dark: "var(--color-text-primary)",
    light: "var(--color-text-dark)",
  };

  const subText = {
    dark: "var(--color-text-muted)",
    light: "var(--color-text-muted-light)",
  };

  const accent = {
    dark: "var(--color-primary)",
    light: "var(--color-secondary)",
  };

  // ✅ Blue-tinted cards (light + dark)
  const cardBg = {
    dark: "linear-gradient(145deg, rgba(14,165,233,0.10), rgba(255,255,255,0.02))",
    light: "linear-gradient(145deg, #e0f2fe, #ffffff)",
  };

  const cardBorder = {
    dark: "1px solid rgba(14,165,233,0.25)",
    light: "1px solid rgba(14,165,233,0.18)",
  };

  return (
    <section
      style={{
        position: "relative",
        padding: "100px 20px",
        minHeight: "100vh",
        color: textColor[theme],
        backgroundColor: theme === "dark" ? "#0f172a" : sectionBg.light,
        backgroundImage: theme === "dark" ? sectionBg.dark : "none",
        backgroundSize: "600% 600%",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
      }}
    >
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: ["0%", "-18%", "0%"] }}
          transition={{
            duration: icon.speed,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: icon.top,
            left: icon.left,
            fontSize: icon.size,
            opacity: icon.opacity,
            pointerEvents: "none",
            zIndex: 0,
            color: theme === "dark" ? "#0ea5e9" : "#3b82f6",
            textShadow:
              theme === "dark"
                ? "0 0 12px rgba(14,165,233,0.5), 0 0 24px rgba(37,99,235,0.45)"
                : "none",
          }}
        >
          <icon.Icon />
        </motion.div>
      ))}

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
              ? "1px solid rgba(255,255,255,0.2)"
              : "1px solid rgba(0,0,0,0.15)",
          background:
            theme === "dark"
              ? "rgba(255,255,255,0.06)"
              : "rgba(0,0,0,0.04)",
          backdropFilter: theme === "dark" ? "blur(10px)" : "none",
          color: theme === "dark" ? "#ffffff" : "#111827",
          cursor: "pointer",
          fontWeight: 600,
          boxShadow:
            theme === "dark"
              ? "0 4px 20px rgba(0,0,0,0.4)"
              : "0 4px 15px rgba(0,0,0,0.1)",
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
              whileHover={{ scale: 1.05, y: -6 }}
              style={{
                padding: "32px",
                borderRadius: "22px",
                background: cardBg[theme],
                border: cardBorder[theme],
                backdropFilter: theme === "dark" ? "blur(20px)" : "none",
                boxShadow:
                  theme === "dark"
                    ? "0 25px 50px rgba(14,165,233,0.20)"
                    : "0 10px 25px rgba(14,165,233,0.12)",
                position: "relative",
                transition: "all 0.35s ease",
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
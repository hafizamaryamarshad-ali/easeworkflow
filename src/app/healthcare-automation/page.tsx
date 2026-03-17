"use client";

import { motion } from "framer-motion";
import { FiSmartphone, FiDatabase, FiBell } from "react-icons/fi";
import { useTheme } from "../../theme/ThemeProvider";

export default function HealthcareAutomationPage() {
  const { theme } = useTheme();

  const sectionBg = { dark: "linear-gradient(135deg, #0f1c2c, #1f2a48, #2a3a6e, #00c6ff)", light: "#f5f7fa" };
  const textColor = { dark: "#f8fafc", light: "#111" };
  const cardBg = { dark: "rgba(255,255,255,0.08)", light: "#ffffff" };
  const cardTextColor = { dark: "#fff", light: "#111" };
  const iconBg = { dark: "rgba(0,198,255,0.2)", light: "rgba(59,130,246,0.2)" };
  const iconColor = { dark: "#00c6ff", light: "#3b82f6" };
  const boxShadow = { dark: "0 16px 40px rgba(0,0,0,0.25)", light: "0 12px 28px rgba(0,0,0,0.1)" };
  const borderColor = { dark: "rgba(0,198,255,0.2)", light: "rgba(59,130,246,0.2)" };
  const borderHoverColor = { dark: "#00c6ff", light: "#3b82f6" };

  const features = [
    { title: "AI Appointment Scheduling", description: "Automate scheduling with AI to reduce no-shows and free up staff time for patient care.", icon: <FiSmartphone size={28} /> },
    { title: "EMR Optimization", description: "Streamline your EMR workflows, reduce errors, and ensure accurate patient records.", icon: <FiDatabase size={28} /> },
    { title: "Patient Notifications", description: "Automated reminders and follow-ups to enhance patient engagement and retention.", icon: <FiBell size={28} /> },
  ];

  return (
    <section
      style={{
        position: "relative",
        padding: "80px 20px",
        minHeight: "100vh",
        textAlign: "center",
        color: textColor[theme],
        overflow: "hidden",
        backgroundColor: theme === "dark" ? "#0f1c2c" : sectionBg.light,
        backgroundImage: theme === "dark" ? sectionBg.dark : "none",
        backgroundSize: "cover",
        transition: "all 0.5s ease",
      }}
    >
      {/* Tech Particle Layer */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="particle" style={{ "--i": i.toString(), background: iconColor[theme] } as React.CSSProperties}></div>
        ))}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          position: "relative",
          fontSize: "3rem",
          fontWeight: 900,
          marginBottom: "40px",
          fontFamily: "'Roboto', sans-serif",
          background: theme === "dark" ? "linear-gradient(90deg, #00c6ff, #0072ff)" : "none",
          WebkitBackgroundClip: theme === "dark" ? "text" : "unset",
          color: theme === "dark" ? "transparent" : "#111",
          transition: "all 0.5s ease",
        }}
      >
        Healthcare Automation
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ position: "relative", fontSize: "1.2rem", lineHeight: 1.7, maxWidth: "800px", margin: "auto", color: textColor[theme] }}
      >
        Automate your clinic’s appointment scheduling, EMR workflows, and patient follow-ups. AI-driven automation ensures your staff focuses on care, not paperwork.
      </motion.p>

      <motion.div style={{ position: "relative", marginTop: "60px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              boxShadow: theme === "dark" ? "0 25px 60px rgba(0,198,255,0.45)" : "0 20px 50px rgba(59,130,246,0.35)",
            }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            style={{
              position: "relative",
              minWidth: "250px",
              maxWidth: "300px",
              padding: "32px",
              borderRadius: "20px",
              background: cardBg[theme],
              backdropFilter: theme === "dark" ? "blur(25px)" : "none",
              boxShadow: boxShadow[theme],
              color: cardTextColor[theme],
              overflow: "hidden",
              transition: "all 0.5s ease",
            }}
          >
            {/* Floating Icon */}
            <motion.div
              style={{
                marginBottom: "12px",
                display: "inline-flex",
                padding: "12px",
                borderRadius: "50%",
                background: iconBg[theme],
                color: iconColor[theme],
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2 + i, repeat: Infinity }}
            >
              {item.icon}
            </motion.div>

            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "12px", color: cardTextColor[theme] }}>{item.title}</h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.5, color: cardTextColor[theme] }}>{item.description}</p>

            {/* Neon Border Glow on Hover */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "20px",
                border: `2px solid ${borderColor[theme]}`,
                pointerEvents: "none",
                transition: "all 0.3s ease",
              }}
              className="cardBorder"
            ></div>
          </motion.div>
        ))}
      </motion.div>

      <style jsx>{`
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          top: calc(10% + 80 * var(--i));
          left: calc(20% + 60 * var(--i));
          opacity: 0.3;
          animation: particleMove 12s linear infinite;
        }
        @keyframes particleMove {
          0% { transform: translate(0,0); }
          50% { transform: translate(20px, -10px); }
          100% { transform: translate(0,0); }
        }
        .cardBorder:hover {
          border-color: ${borderHoverColor[theme]};
          box-shadow: 0 0 15px ${borderHoverColor[theme]};
        }
      `}</style>
    </section>
  );
}
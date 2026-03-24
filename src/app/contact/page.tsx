"use client";

import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { useTheme } from "../../theme/ThemeProvider";

export default function ContactPage() {
  const { theme } = useTheme();

  const sectionBg = { dark: "var(--color-page-gradient-dark)", light: "var(--color-bg-light)" };
  const textColor = { dark: "var(--color-text-primary)", light: "var(--color-text-dark)" };
  const subText = { dark: "var(--color-text-muted)", light: "var(--color-text-muted-light)" };
  const accent = { dark: "var(--color-primary)", light: "var(--color-secondary)" };
  const cardBg = { dark: "var(--color-card-dark)", light: "var(--color-card-light)" };
  const cardBorder = {
    dark: "1px solid var(--color-border-dark)",
    light: "1px solid var(--color-border-light)",
  };
  const cardShadow = {
    dark: "var(--shadow-soft-dark)",
    light: "var(--shadow-soft-light)",
  };

  const contacts = [
    { label: "Email", value: "info@easeworkflow.com", icon: <FiMail size={22} /> },
    { label: "Phone", value: "+1 234 567 890", icon: <FiPhone size={22} /> },
    { label: "Address", value: "123 AI Street, Tech City", icon: <FiMapPin size={22} /> },
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
        backgroundColor: theme === "dark" ? "var(--color-bg)" : sectionBg.light,
        backgroundImage: theme === "dark" ? sectionBg.dark : "none",
        backgroundSize: "400% 400%",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        transition: "all 0.5s ease",
      }}
    >
      {/* Particles */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{ "--i": i.toString(), background: accent[theme] } as React.CSSProperties}
          ></div>
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
          background:
            theme === "dark"
              ? "linear-gradient(90deg, var(--color-primary), var(--color-secondary))"
              : "none",
          WebkitBackgroundClip: theme === "dark" ? "text" : "unset",
          color: theme === "dark" ? "transparent" : textColor.light,
          transition: "all 0.5s ease",
        }}
      >
        Contact Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          position: "relative",
          fontSize: "1.2rem",
          lineHeight: 1.7,
          maxWidth: "50rem",
          margin: "auto",
          color: subText[theme],
        }}
      >
        Have questions or want a free consultation? Reach out to us and our team will get back to you promptly.
      </motion.p>

      <motion.div style={{ position: "relative", marginTop: "60px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        {contacts.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              boxShadow: cardShadow[theme],
            }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "20px 30px",
              borderRadius: "15px",
              background: cardBg[theme],
              backdropFilter: theme === "dark" ? "blur(20px)" : "none",
              boxShadow: cardShadow[theme],
              border: cardBorder[theme],
              color: textColor[theme],
              minWidth: "15.625rem",
              maxWidth: "25rem",
              transition: "all 0.5s ease",
              cursor: "pointer",
            }}
          >
            <span style={{ color: accent[theme] }}>{item.icon}</span>
            <p style={{ fontSize: "1rem", margin: 0, color: textColor[theme] }}>
              <strong>{item.label}:</strong> {item.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <style jsx>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          top: calc(10% + 60 * var(--i));
          left: calc(15% + 70 * var(--i));
          opacity: 0.3;
          animation: particleMove 12s linear infinite;
        }

        @keyframes particleMove {
          0% { transform: translate(0,0); }
          50% { transform: translate(20px, -10px); }
          100% { transform: translate(0,0); }
        }
      `}</style>
    </section>
  );
}
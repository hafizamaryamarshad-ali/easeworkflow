"use client";

import { motion } from "framer-motion";
import { FiShield, FiLock, FiUserCheck } from "react-icons/fi";
import { useTheme } from "./theme/ThemeProvider";

export default function PrivacySection() {
  const { theme } = useTheme();

  const bg = {
    dark: "var(--color-bg)",
    light: "var(--color-bg-light)",
  } as const;

  const headingColor = {
    dark: "var(--color-text-primary)",
    light: "var(--color-text-dark)",
  } as const;

  const textColor = {
    dark: "var(--color-text-muted)",
    light: "var(--color-text-muted-light)",
  } as const;

  const cardBg = {
    dark: "linear-gradient(145deg, rgba(15,23,42,0.95), rgba(15,23,42,0.85))",
    light: "linear-gradient(145deg, #ffffff, #e5f0ff)",
  } as const;

  const cardBorder = {
    dark: "1px solid rgba(148,163,184,0.45)",
    light: "1px solid rgba(148,163,184,0.3)",
  } as const;

  return (
    <section
      id="privacy"
      style={{
        position: "relative",
        padding: "150px 20px",
        background: bg[theme],
        overflow: "hidden",
      }}
    >
      {/* Soft background glow */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -60, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "32rem",
          height: "32rem",
          background:
            theme === "dark"
              ? "radial-gradient(circle, rgba(56,189,248,0.4), transparent)"
              : "radial-gradient(circle, rgba(59,130,246,0.25), transparent)",
          filter: "blur(140px)",
          top: "-160px",
          left: "-160px",
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
        transition={{ duration: 24, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "28rem",
          height: "28rem",
          background:
            theme === "dark"
              ? "radial-gradient(circle, rgba(34,197,94,0.3), transparent)"
              : "radial-gradient(circle, rgba(16,185,129,0.22), transparent)",
          filter: "blur(140px)",
          bottom: "-160px",
          right: "-160px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            textAlign: "center",
            fontSize: "2.6rem",
            fontWeight: 900,
            marginBottom: "20px",
            color: headingColor[theme],
          }}
        >
          Privacy &amp; Data Protection
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            maxWidth: "42rem",
            margin: "0 auto 60px",
            textAlign: "center",
            fontSize: "1.05rem",
            lineHeight: 1.8,
            color: textColor[theme],
          }}
        >
          Every workflow we build is designed around strict privacy standards.
          We protect patient data, respect user privacy, and ensure that
          sensitive information is handled securely across every integration.
        </motion.p>

        {/* Key Pillars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {[ 
            {
              Icon: FiShield,
              title: "Data Protection",
              body:
                "HIPAA-conscious architecture, strict access controls, and encrypted data flows across every integration.",
            },
            {
              Icon: FiUserCheck,
              title: "User Privacy",
              body:
                "Clear consent, minimal data collection, and workflows that keep clinicians and patients in control.",
            },
            {
              Icon: FiLock,
              title: "Secure Handling",
              body:
                "Hardened infrastructure, vetted vendors, and continuous review of how information moves through your systems.",
            },
          ].map(({ Icon, title, body }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5,
                boxShadow:
                  theme === "dark"
                    ? "0 26px 70px rgba(15,23,42,0.9)"
                    : "0 18px 48px rgba(15,23,42,0.16)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{
                padding: "24px 22px",
                borderRadius: "20px",
                background: cardBg[theme],
                border: cardBorder[theme],
                boxShadow:
                  theme === "dark"
                    ? "0 22px 60px rgba(15,23,42,0.85)"
                    : "0 16px 40px rgba(15,23,42,0.12)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    theme === "dark"
                      ? "rgba(15,23,42,0.9)"
                      : "rgba(239,246,255,1)",
                  border:
                    theme === "dark"
                      ? "1px solid rgba(148,163,184,0.6)"
                      : "1px solid rgba(59,130,246,0.6)",
                }}
              >
                <Icon
                  size={20}
                  style={{
                    color: theme === "dark" ? "#0ea5e9" : "#2563eb",
                  }}
                />
              </div>

              <h3
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  margin: 0,
                  color: headingColor[theme],
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.98rem",
                  lineHeight: 1.7,
                  color: textColor[theme],
                }}
              >
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

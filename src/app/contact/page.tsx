"use client";

import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiArrowLeft, FiCpu, FiGlobe, FiShield } from "react-icons/fi";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useTheme } from "../../theme/ThemeProvider";
import Link from "next/link";

export default function ContactPage() {
  const { theme } = useTheme();

  const sectionBg = { dark: "var(--color-page-gradient-dark)", light: "var(--color-bg-light)" };
  const textColor = { dark: "var(--color-text-primary)", light: "var(--color-text-dark)" };
  const accent = { dark: "#fff", light: "#fff" }; // white icons for gradient cards

  const cardBaseStyle: React.CSSProperties = {
    padding: "20px 30px",
    borderRadius: "15px",
    background: "linear-gradient(90deg,var(--primary),var(--secondary))",
    color: "#fff",
    boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
    border: "1px solid rgba(255,255,255,0.15)",
    transition: "all 0.25s ease",
  };

  // Make form fields clearly visible on the blue gradient while
  // still respecting the existing light/dark palette.
  const inputBg = {
    dark: "rgba(15,23,42,0.55)", // translucent dark surface over gradient
    light: "rgba(255,255,255,0.9)", // light card-style background
  };
  const inputBorder = {
    dark: "rgba(255,255,255,0.55)",
    light: "rgba(59,130,246,0.55)",
  };
  const inputText = {
    dark: "var(--text-light)",
    light: "var(--text-dark)",
  };

  const contacts = [
    { label: "Email", value: "contact@easeworkflow.com", icon: <FiMail size={22} /> },
    { label: "Phone", value: "+92 3000335194", icon: <FiPhone size={22} /> },
    { label: "Address", value: "Faisalabad, PK", icon: <FiMapPin size={22} /> },
  ];

  const floatingIcons = [
    { Icon: FiCpu, top: "18%", left: "10%", duration: 18 },
    { Icon: FiGlobe, top: "72%", left: "82%", duration: 24 },
    { Icon: FiShield, top: "42%", left: "88%", duration: 26 },
  ];

  return (
    <section
      style={{
        position: "relative",
        padding: "40px 20px",
        minHeight: "100vh",
        color: textColor[theme],
        overflow: "hidden",
        backgroundColor: theme === "dark" ? "#0f172a" : sectionBg.light,
        backgroundImage: theme === "dark" ? "var(--bg-gradient-dark)" : "none",
        backgroundSize: theme === "dark" ? "600% 600%" : "auto",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        transition: "all 0.5s ease",
      }}
    >
      {floatingIcons.map(({ Icon, top, left, duration }, index) => (
        <motion.div
          key={index}
          initial={{ y: -8, opacity: theme === "dark" ? 0.22 : 0.1 }}
          animate={{ y: 8 }}
          transition={{ duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          style={{
            position: "absolute",
            top,
            left,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "999px",
              border:
                theme === "dark"
                  ? "1px solid rgba(148, 163, 184, 0.3)"
                  : "1px solid rgba(148, 163, 184, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                theme === "dark"
                  ? "radial-gradient(circle at top, rgba(56,189,248,0.18), rgba(15,23,42,0.1))"
                  : "radial-gradient(circle at top, rgba(59,130,246,0.12), rgba(248,250,252,0.1))",
              boxShadow:
                theme === "dark"
                  ? "0 20px 45px rgba(15,23,42,0.85)"
                  : "0 16px 40px rgba(15,23,42,0.12)",
            }}
          >
            <Icon
              style={{
                width: "54px",
                height: "54px",
                color: theme === "dark" ? "rgba(226, 232, 240, 0.85)" : "rgba(30, 64, 175, 0.9)",
              }}
            />
          </div>
        </motion.div>
      ))}
      {/* Back Button */}
      <div style={{ position: "absolute", top: "20px", left: "20px" }}>
        <Link href="/">
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "10px",
              border:
                theme === "dark"
                  ? "1px solid rgba(255,255,255,0.15)"
                  : "1px solid rgba(2,132,199,0.25)",
              background:
                theme === "dark"
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              color: theme === "dark" ? "#fff" : "#0f172a",
              boxShadow:
                theme === "dark"
                  ? "0 10px 25px rgba(0,0,0,0.3)"
                  : "0 6px 15px rgba(2,132,199,0.15)",
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.25s ease",
            }}
          >
            <FiArrowLeft size={16} />
            Back
          </button>
        </Link>
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.h1
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "3rem",
          fontWeight: 900,
          marginBottom: "20px",
          fontFamily: "'Roboto', sans-serif",
          textAlign: "center",
          color: textColor[theme],
        }}
        >
          Contact Information
        </motion.h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "60px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
        {/* Left: Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.03 }}
          style={{
            flex: "1 1 350px",
            maxWidth: "450px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            // Match the same gradient and behavior as the right-side cards
            ...cardBaseStyle,
            background:
              theme === "dark"
                ? "linear-gradient(90deg,var(--primary),var(--secondary))"
                : "var(--surface-light)",
            color: theme === "dark" ? "#fff" : textColor.light,
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            style={{
              padding: "12px 15px",
              borderRadius: "10px",
              border: `1px solid ${inputBorder[theme]}`,
              outline: "none",
              background: inputBg[theme],
              color: inputText[theme],
            }}
          />
          <input
            type="email"
            placeholder="Email Address"
            style={{
              padding: "12px 15px",
              borderRadius: "10px",
              border: `1px solid ${inputBorder[theme]}`,
              outline: "none",
              background: inputBg[theme],
              color: inputText[theme],
            }}
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            style={{
              padding: "12px 15px",
              borderRadius: "10px",
              border: `1px solid ${inputBorder[theme]}`,
              outline: "none",
              background: inputBg[theme],
              color: inputText[theme],
              resize: "none",
            }}
          />
          <button
            style={{
              padding: "12px 20px",
              borderRadius: "10px",
              border: "none",
              background: "var(--btn-gradient)",
              color: "var(--text-light)",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Send Message
          </button>
        </motion.div>

        {/* Right: Gradient Contact Cards */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            flex: "1 1 300px",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {contacts.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              style={{
                ...cardBaseStyle,
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
              }}
            >
              <span>{item.icon}</span>
              <p style={{ margin: 0, fontSize: "1rem" }}>
                <strong>{item.label}:</strong> {item.value}
              </p>
            </motion.div>
          ))}

          {/* Social Icons */}
          <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
            {[FaGithub, FaTwitter, FaLinkedin, FaInstagram].map((Icon, idx) => (
              <div
                key={idx}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "linear-gradient(90deg,#6366f1,#3b82f6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#fff",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
                  transition: "all 0.3s ease",
                }}
              >
                <Icon size={18} />
              </div>
            ))}
          </div>
        </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Theme-aware placeholder colors so they stay readable */
        :global(html[data-theme='dark'] input::placeholder),
        :global(html[data-theme='dark'] textarea::placeholder) {
          color: rgba(255, 255, 255, 0.85);
        }

        :global(html[data-theme='light'] input::placeholder),
        :global(html[data-theme='light'] textarea::placeholder) {
          color: rgba(15, 23, 42, 0.65);
        }
      `}</style>
    </section>
  );
}
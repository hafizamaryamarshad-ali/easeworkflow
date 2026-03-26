"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaStethoscope,
  FaPills,
  FaHeart,
} from "react-icons/fa";
import { useTheme } from "../../theme/ThemeProvider";

export default function ContactPage() {
  const { theme } = useTheme();

  const sectionBg = { dark: "var(--bg-gradient-dark)", light: "var(--color-bg-light)" };
  const textColor = { dark: "var(--color-text-primary)", light: "var(--color-text-dark)" };

  const subText = {
    dark: "var(--color-text-muted)",
    light: "var(--color-text-muted-light)",
  };

  const cardBaseStyle: CSSProperties = {
    padding: "26px 28px",
    borderRadius: "20px",
    background: "linear-gradient(120deg,var(--primary),var(--secondary))",
    color: "#fff",
    boxShadow: "0 18px 40px rgba(15,23,42,0.6)",
    border: "3px solid rgba(255,255,255,0.3)",
    backdropFilter: "blur(18px)",
    transition: "all 0.25s ease",
  };

  const inputBg = {
    dark: "rgba(15,23,42,0.85)",
    light: "rgba(255,255,255,0.9)",
  };
  const inputBorder = {
    dark: "rgba(148,163,184,0.7)",
    light: "rgba(15,23,42,0.18)",
  };
  const inputText = {
    dark: "var(--text-light)",
    light: "var(--text-dark)",
  };

  const formCardBg = {
    dark: "linear-gradient(145deg, #020617, #020617, #0b1120)",
    light: "linear-gradient(145deg, #1d4ed8, #1e40af)",
  };

  const formCardBorder = {
    dark: "3px solid rgba(255,255,255,0.3)",
    light: "3px solid rgba(255,255,255,0.3)",
  };

  const contacts = [
    {
      label: "Email",
      value: "hello@easeworkflow.com",
      icon: <FiMail size={22} />,
    },
    {
      label: "Phone",
      value: "+1 (555) 123-4567",
      icon: <FiPhone size={22} />,
    },
    {
      label: "Location",
      value: "Remote • Serving US clinics",
      icon: <FiMapPin size={22} />,
    },
  ];

  const floatingIcons = [
    { Icon: FaStethoscope, top: "16%", left: "12%", duration: 18 },
    { Icon: FaPills, top: "68%", left: "80%", duration: 24 },
    { Icon: FaHeart, top: "42%", left: "88%", duration: 26 },
  ] as const;

  return (
    <section
      style={{
        position: "relative",
        padding: "100px 20px",
        minHeight: "100vh",
        color: textColor[theme],
        overflow: "hidden",
        backgroundColor: theme === "dark" ? "#0f172a" : sectionBg.light,
        backgroundImage: theme === "dark" ? sectionBg.dark : "none",
        backgroundSize: theme === "dark" ? "600% 600%" : "auto",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        transition: "all 0.5s ease",
      }}
    >
      {/* Floating decorative icons */}
      {floatingIcons.map(({ Icon, top, left, duration }, index) => (
        <motion.div
          key={index}
          initial={{ y: 0, opacity: theme === "dark" ? 0.22 : 0.1 }}
          animate={{ y: ["0%", "-18%", "0%"] }}
          transition={{ duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
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
                color: theme === "dark" ? "#0ea5e9" : "#3b82f6",
              }}
            />
          </div>
        </motion.div>
      ))}

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
            marginBottom: "40px",
            textAlign: "center",
            color: textColor[theme],
          }}
        >
          Contact Information
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            maxWidth: "640px",
            margin: "0 auto 40px auto",
            textAlign: "center",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            opacity: 0.9,
            color: subText[theme],
          }}
        >
          Share a bit about your clinic and we’ll get back
          to you with tailored automation recommendations.
        </motion.p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "56px",
            flexWrap: "wrap",
          }}
        >
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              flex: "1 1 380px",
              maxWidth: "480px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              padding: "30px 28px",
              borderRadius: "24px",
              background: formCardBg[theme],
              border: formCardBorder[theme],
              boxShadow:
                theme === "dark"
                  ? "0 22px 55px rgba(15,23,42,0.95), 0 0 0 1px rgba(148,163,184,0.35)"
                  : "0 18px 40px rgba(30,64,175,0.35), 0 0 0 1px rgba(191,219,254,0.8)",
              color: theme === "dark" ? "#fff" : textColor.light,
              backdropFilter: "blur(22px)",
            }}
          >
            <input
              type="text"
              placeholder="Your Name"
              className="contact-input"
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
              className="contact-input"
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
              className="contact-input"
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
            <motion.button
              whileHover={{
                scale: 1.04,
                y: -1,
                boxShadow:
                  theme === "dark"
                    ? "0 18px 40px rgba(56,189,248,0.55)"
                    : "0 16px 34px rgba(37,99,235,0.45)",
                filter: "brightness(1.08)",
              }}
              whileTap={{ scale: 0.98, y: 0 }}
              style={{
                padding: "12px 32px",
                borderRadius: "999px",
                border: "none",
                background:
                  theme === "light"
                    ? "linear-gradient(120deg,#2563eb,#1d4ed8)"
                    : "linear-gradient(120deg,var(--primary),var(--secondary))",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.98rem",
                cursor: "pointer",
                alignSelf: "flex-start",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                boxShadow:
                  theme === "dark"
                    ? "0 10px 26px rgba(15,23,42,0.85)"
                    : "0 10px 24px rgba(37,99,235,0.28)",
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
              }}
            >
              Send Message
            </motion.button>
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
              gap: "22px",
            }}
          >
            {contacts.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04, y: -4 }}
                style={{
                  ...cardBaseStyle,
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
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
            <div style={{ display: "flex", gap: "15px", marginTop: "16px" }}>
              {[FaGithub, FaTwitter, FaLinkedin, FaInstagram].map((Icon, idx) => (
                <div
                  key={idx}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "linear-gradient(120deg,var(--primary),var(--secondary))",
                    border: "3px solid rgba(255,255,255,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#fff",
                    boxShadow: "0 10px 28px rgba(15,23,42,0.6)",
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

        :global(html[data-theme='dark'] input::placeholder),
        :global(html[data-theme='dark'] textarea::placeholder) {
          color: rgba(255, 255, 255, 0.85);
        }

        :global(html[data-theme='light'] input::placeholder),
        :global(html[data-theme='light'] textarea::placeholder) {
          color: rgba(15, 23, 42, 0.65);
        }

        :global(.contact-input:focus) {
          box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.75), 0 0 0 4px rgba(59, 130, 246, 0.28);
          border-color: rgba(59, 130, 246, 0.95) !important;
        }

        :global(.contact-input:hover) {
          border-color: rgba(129, 140, 248, 0.9);
        }
      `}</style>
    </section>
  );
}

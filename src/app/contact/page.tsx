"use client";

import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiArrowLeft } from "react-icons/fi";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useTheme } from "../../theme/ThemeProvider";
import Link from "next/link";

export default function ContactPage() {
  const { theme } = useTheme();

  const sectionBg = { dark: "var(--color-page-gradient-dark)", light: "var(--color-bg-light)" };
  const textColor = { dark: "var(--color-text-primary)", light: "var(--color-text-dark)" };
  const accent = { dark: "#fff", light: "#fff" }; // white icons for gradient cards

  const contacts = [
    { label: "Email", value: "contact@easeworkflow.com", icon: <FiMail size={22} /> },
    { label: "Phone", value: "+92 3000335194", icon: <FiPhone size={22} /> },
    { label: "Address", value: "Faisalabad, PK", icon: <FiMapPin size={22} /> },
  ];

  return (
    <section
      style={{
        position: "relative",
        padding: "40px 20px",
        minHeight: "100vh",
        color: textColor[theme],
        overflow: "hidden",
        backgroundColor: theme === "dark" ? "var(--color-bg)" : sectionBg.light,
        backgroundImage: theme === "dark" ? sectionBg.dark : "none",
        backgroundSize: "400% 400%",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        transition: "all 0.5s ease",
      }}
    >
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
          background:
            theme === "dark"
              ? "linear-gradient(90deg, var(--color-primary), var(--color-secondary))"
              : "none",
          WebkitBackgroundClip: theme === "dark" ? "text" : "unset",
          color: theme === "dark" ? "transparent" : textColor.light,
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
          style={{
            flex: "1 1 350px",
            maxWidth: "450px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            background: "linear-gradient(145deg, #ffffff, #e0f2fe)", // form stays same
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            style={{
              padding: "12px 15px",
              borderRadius: "10px",
              border: "1px solid rgba(0,0,0,0.1)",
              outline: "none",
            }}
          />
          <input
            type="email"
            placeholder="Email Address"
            style={{
              padding: "12px 15px",
              borderRadius: "10px",
              border: "1px solid rgba(0,0,0,0.1)",
              outline: "none",
            }}
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            style={{
              padding: "12px 15px",
              borderRadius: "10px",
              border: "1px solid rgba(0,0,0,0.1)",
              outline: "none",
              resize: "none",
            }}
          />
          <button
            style={{
              padding: "12px 20px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(90deg,#6366f1,#3b82f6)",
              color: "#fff",
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
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "20px 30px",
                borderRadius: "15px",
                background: "linear-gradient(90deg,#6366f1,#3b82f6)", // gradient same as button
                color: "#fff", // white text
                cursor: "pointer",
                boxShadow: "0 8px 25px rgba(0,0,0,0.25)", // subtle shadow
                transition: "all 0.25s ease",
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

      <style jsx>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
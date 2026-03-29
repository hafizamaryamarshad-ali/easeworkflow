"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiTwitter, FiLinkedin } from "react-icons/fi";
import { useTheme } from "../../theme/ThemeProvider";

export default function ContactPage() {
  const { theme } = useTheme();
  const primaryColor = "#0ea5e9";

  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "14px",
    border: `1px solid ${primaryColor}`, // permanent focus color
    outline: "none",
    background: theme === "dark" ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.9)",
    color: theme === "dark" ? "#e2e8f0" : "#0f172a",
    fontSize: "0.9rem",
    boxSizing: "border-box",
    transition: "border 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
  };

  const cardStyle: CSSProperties = {
    padding: "14px 16px",
    borderRadius: "16px",
    background:
      theme === "dark"
        ? "linear-gradient(145deg, rgba(15,23,42,0.95), rgba(15,23,42,0.85))"
        : "linear-gradient(135deg,#3b82f6,#60a5fa)", // matches form button gradient
    border:
      theme === "dark"
        ? "2px solid #0ea5e9"
        : "2px solid #3b82f6", // thick border like Send button
    boxShadow:
      theme === "dark"
        ? "0 16px 40px rgba(15,23,42,0.95)"
        : "0 16px 40px rgba(15,23,42,0.18)",
    backdropFilter: "blur(16px)",
    color: "#f9fafb",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    cursor: "pointer",
  };

  const floatingIcons = [
    { Icon: FiMail, top: "10%", left: "6%", size: 44, duration: 22, opacity: 0.12 },
    { Icon: FiPhone, top: "22%", left: "88%", size: 38, duration: 26, opacity: 0.1 },
    { Icon: FiMapPin, top: "78%", left: "8%", size: 40, duration: 24, opacity: 0.1 },
    { Icon: FiTwitter, top: "70%", left: "92%", size: 34, duration: 28, opacity: 0.08 },
    { Icon: FiLinkedin, top: "40%", left: "4%", size: 36, duration: 30, opacity: 0.09 },
  ];

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "80px 16px 72px",
        background:
          theme === "dark"
            ? "radial-gradient(circle at top, #020617, #020617 30%, #0f172a 70%)"
            : "radial-gradient(circle at top, #eef2ff, #f8fafc 55%, #e2e8f0 95%)",
      }}
    >
      {/* Floating background icons */}
      {floatingIcons.map(({ Icon, top, left, size, duration, opacity }, index) => (
        <motion.div
          key={index}
          initial={{ y: 0 }}
          animate={{ y: ["0%", "-18%", "0%"] }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
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
              width: size + 42,
              height: size + 42,
              borderRadius: 999,
              border:
                theme === "dark"
                  ? "1px solid rgba(148,163,184,0.25)"
                  : "1px solid rgba(148,163,184,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                theme === "dark"
                  ? "radial-gradient(circle at top, rgba(56,189,248,0.18), rgba(15,23,42,0.1))"
                  : "radial-gradient(circle at top, rgba(59,130,246,0.12), rgba(248,250,252,0.1))",
              boxShadow:
                theme === "dark"
                  ? "0 20px 45px rgba(15,23,42,0.8)"
                  : "0 16px 40px rgba(15,23,42,0.14)",
              filter: "blur(1px)",
              opacity,
            }}
          >
            <Icon
              size={size}
              style={{
                color: theme === "dark" ? "#0ea5e9" : "#3b82f6",
              }}
            />
          </div>
        </motion.div>
      ))}

      <div style={{ maxWidth: "1080px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              fontSize: "2.4rem",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: theme === "dark" ? "#e5f4ff" : "#0f172a",
            }}
          >
            Let’s talk about your workflow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{
              maxWidth: "560px",
              margin: "10px auto 0",
              fontSize: "0.98rem",
              lineHeight: 1.7,
              color: theme === "dark" ? "#94a3b8" : "#475569",
            }}
          >
            Share a bit about your clinic and we’ll follow up with a tailored
            automation plan within one business day.
          </motion.p>
        </div>

        {/* MAIN LAYOUT */}
        <div
          style={{
            display: "flex",
            gap: "26px",
            alignItems: "stretch",
            flexWrap: "wrap",
          }}
        >
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            style={{ flex: "1 1 420px" }}
          >
            <div
              style={{
                padding: "24px 24px 22px",
                borderRadius: "22px",
                background:
                  theme === "dark"
                    ? "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(15,23,42,0.88))"
                    : "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(241,245,249,0.96))",
                border:
                  theme === "dark"
                    ? "1px solid rgba(148,163,184,0.35)"
                    : "1px solid rgba(148,163,184,0.25)",
                boxShadow:
                  theme === "dark"
                    ? "0 24px 60px rgba(15,23,42,0.9)"
                    : "0 20px 50px rgba(15,23,42,0.12)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {["Your Name", "Work Email"].map((placeholder, i) => (
                  <input
                    key={placeholder}
                    type={i === 1 ? "email" : "text"}
                    placeholder={placeholder}
                    style={inputStyle}
                  />
                ))}

                <textarea
                  placeholder="Tell us briefly what you’d like to improve."
                  rows={4}
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

              <button
                style={{
                  marginTop: "16px",
                  width: "100%",
                  padding: "13px 18px",
                  borderRadius: "999px",
                  border: "none",
                  background:
                    theme === "dark"
                      ? "linear-gradient(90deg,#0ea5e9,#3b82f6)"
                      : "linear-gradient(90deg,#3b82f6,#60a5fa)",
                  color: "#f9fafb",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  boxShadow:
                    theme === "dark"
                      ? "0 16px 34px rgba(8,47,73,0.9)"
                      : "0 16px 34px rgba(59,130,246,0.35)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    theme === "dark"
                      ? "0 0 25px rgba(14,165,233,0.6)"
                      : "0 0 25px rgba(59,130,246,0.55)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    theme === "dark"
                      ? "0 16px 34px rgba(8,47,73,0.9)"
                      : "0 16px 34px rgba(59,130,246,0.35)";
                }}
              >
                Send message
              </button>
            </div>

            {/* CONTACT INFO CARDS under the form */}
            <div
              style={{
                display: "flex",
                gap: "14px",
                marginTop: "18px",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {[
                {
                  icon: <FiMail size={18} />,
                  title: "Email",
                  lines: ["contact@easeworkflow.com"],
                },
                {
                  icon: <FiPhone size={18} />,
                  title: "Phone",
                  lines: ["+92 3000335194"],
                },
                {
                  icon: <FiMapPin size={18} />,
                  title: "Location",
                  lines: ["Faisalabad, Pakistan"],
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  style={{
                    ...cardStyle,
                    flex: "1 1 calc(33.333% - 10px)",
                    minWidth: "210px",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 999,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        theme === "dark"
                          ? "rgba(15,23,42,0.2)"
                          : "rgba(15,23,42,0.1)",
                      marginBottom: 6,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h4 style={{ margin: 0, fontWeight: 600, fontSize: "0.9rem" }}>
                    {item.title}
                  </h4>
                  {item.lines.map((line, idx) => (
                    <p
                      key={idx}
                      style={{
                        fontSize: "0.8rem",
                        opacity: 0.96,
                        margin: idx === 0 ? "4px 0 0" : "2px 0 0",
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ILLUSTRATION PANEL remains unchanged */}
             {/* ILLUSTRATION / VISUAL PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            style={{ flex: "1 1 380px", display: "flex", alignItems: "stretch" }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: "24px",
                padding: "22px 22px 20px",
                width: "100%",
                background:
                  theme === "dark"
                    ? "radial-gradient(circle at top left, rgba(59,130,246,0.25), rgba(15,23,42,0.96))"
                    : "radial-gradient(circle at top left, rgba(191,219,254,0.9), rgba(248,250,252,0.98))",
                border:
                  theme === "dark"
                    ? "1px solid rgba(148,163,184,0.4)"
                    : "1px solid rgba(148,163,184,0.3)",
                boxShadow:
                  theme === "dark"
                    ? "0 24px 70px rgba(15,23,42,0.95)"
                    : "0 20px 60px rgba(15,23,42,0.12)",
                backdropFilter: "blur(22px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 18,
              }}
            >
              {/* Top: image + label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: theme === "dark" ? "#bae6fd" : "#1d4ed8",
                      margin: 0,
                    }}
                  >
                    Concierge onboarding
                  </p>
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: theme === "dark" ? "#e5f4ff" : "#0f172a",
                      margin: 0,
                    }}
                  >
                    A dedicated team for your clinic rollout.
                  </h3>
                </div>

                <div
                  style={{
                    flexShrink: 0,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: -8,
                      borderRadius: 24,
                      background:
                        theme === "dark"
                          ? "radial-gradient(circle at top, rgba(59,130,246,0.5), transparent)"
                          : "radial-gradient(circle at top, rgba(96,165,250,0.6), transparent)",
                      opacity: 0.7,
                      filter: "blur(6px)",
                    }}
                  />
                  <img
                    src="/contact-illustration.png"
                    alt="EaseWorkflow contact illustration"
                    style={{
                      position: "relative",
                      width: 160,
                      height: "auto",
                      borderRadius: 24,
                      boxShadow:
                        theme === "dark"
                          ? "0 18px 40px rgba(15,23,42,0.95)"
                          : "0 16px 32px rgba(15,23,42,0.2)",
                    }}
                  />
                </div>
              </div>

              {/* Feature chips */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2,minmax(0,1fr))",
                  gap: 10,
                  marginTop: 4,
                }}
              >
                {["HIPAA-aware setup", "Training included", "US-based clinics", "Secure by design"].map(
                  (label) => (
                    <div
                      key={label}
                      style={{
                        padding: "9px 11px",
                        borderRadius: 14,
                        background:
                          theme === "dark"
                            ? "rgba(15,23,42,0.9)"
                            : "rgba(255,255,255,0.96)",
                        border:
                          theme === "dark"
                            ? "1px solid rgba(148,163,184,0.45)"
                            : "1px solid rgba(148,163,184,0.35)",
                        fontSize: "0.78rem",
                        color: theme === "dark" ? "#e5e7eb" : "#1f2933",
                      }}
                    >
                      {label}
                    </div>
                  )
                )}
              </div>

              {/* Stats row */}
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "0.8rem",
                    color: theme === "dark" ? "#cbd5e1" : "#475569",
                  }}
                >
                  <span style={{ opacity: 0.9 }}>Average first reply time</span>
                  <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>under 4 hours</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: "0.82rem",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "999px",
                      background:
                        theme === "dark"
                          ? "linear-gradient(135deg,#0ea5e9,#3b82f6)"
                          : "linear-gradient(135deg,#3b82f6,#60a5fa)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#f9fafb",
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      boxShadow:
                        theme === "dark"
                          ? "0 10px 22px rgba(8,47,73,0.9)"
                          : "0 10px 22px rgba(59,130,246,0.35)",
                    }}
                  >
                    24/7
                  </div>
                  <div style={{ color: theme === "dark" ? "#cbd5e1" : "#475569" }}>
                    <div>Priority support for US clinics</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
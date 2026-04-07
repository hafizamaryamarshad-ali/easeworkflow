"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import {
  FaUserMd,
  FaHospital,
  FaClock,
  FaCheckCircle,
  FaEye,
  FaLinkedin,
  FaGithub,
  FaNetworkWired,
  FaShieldAlt,
  FaClinicMedical,
} from "react-icons/fa";

// --- COUNTER COMPONENT ---
type CounterProps = { value: string; duration?: number };
const Counter = ({ value, duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.replace(/[,+]/g, ""));
      if (start === end) return;
      let timer = setInterval(() => {
        start += Math.ceil(end / 60); 
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{value.includes("+") ? "+" : value.includes("%") ? "%" : ""}</span>;
};

export default function AboutPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const accentColor = isDark ? "#0ea5e9" : "#3b82f6";
  const colors = {
    bgImage: isDark ? "var(--bg-gradient-dark)" : "none",
    bgColor: isDark ? "#0f172a" : "#f5f7fa", 
    text: isDark ? "#f8fafc" : "#0f172a",
    subText: isDark ? "#cbd5e1" : "#1e293b",
    cardBg: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
    cardBorder: isDark ? "rgba(14, 165, 233, 0.2)" : "rgba(59, 130, 246, 0.1)",
    glow: isDark ? "0 12px 28px rgba(0,198,255,0.25)" : "0 12px 28px rgba(59,130,246,0.15)"
  };

  const stats = [
    { label: "Years Experience", value: "10+", icon: <FaClock /> },
    { label: "Patients Served", value: "10,000+", icon: <FaUserMd /> },
    { label: "Satisfaction", value: "100%", icon: <FaCheckCircle /> },
  { label: "Clinics Integrated", value: "30+", icon: <FaHospital /> },
  ];

  const coreValues = [
    { title: "Innovation", desc: "Pushing technological boundaries to transform healthcare.", icon: "⚡" },
    { title: "Integrity", desc: "Transparency and ethical principles guide every line of code.", icon: "🛡️" },
    { title: "Collaboration", desc: "Working hand-in-hand with medical experts to co-create.", icon: "🤝" },
    { title: "Excellence", desc: "Setting industry benchmarks through superior engineering.", icon: "💎" },
    { title: "User-First", desc: "Built around the clinician's actual daily needs.", icon: "👤" },
    { title: "Security", desc: "Enterprise-grade protection for sensitive medical data.", icon: "🔒" }
  ];

  const cardStyle = {
    padding: "28px 26px",
    borderRadius: "30px",
    background: isDark
      ? "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.85))"
      : "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(226,232,240,0.9))",
    border: `1px solid ${colors.cardBorder}`,
    boxShadow: colors.glow,
    display: "flex",
    flexDirection: "column" as const,
    height: "100%",
    position: "relative" as const,
    overflow: "hidden" as const,
    transition:
      "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease",
  };

  const aboutSplitRowHeight = 360;

  return (
    <div style={{ 
      backgroundColor: colors.bgColor, 
      backgroundImage: colors.bgImage,
      backgroundSize: "600% 600%",
      color: colors.text, 
      minHeight: "100vh", 
      fontFamily: "'Inter', sans-serif", 
      transition: "all 0.5s ease",
      paddingBottom: "100px"
    }}>
      
      {/* --- HERO SECTION --- */}
      <section style={{ padding: "100px 20px 60px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: accentColor, fontWeight: 800, letterSpacing: "5px", textTransform: "uppercase", fontSize: "0.75rem", marginBottom: "15px" }}>
          The Spirit of Innovation
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 900, lineHeight: "1.1", letterSpacing: "-2px" }}>
          Leading the <span style={{ color: accentColor, textShadow: isDark ? `0 0 20px ${accentColor}` : "none" }}>MedTech</span> Frontier
        </motion.h1>
      </section>

      {/* --- STATS BAR --- */}
      <section style={{ maxWidth: "1100px", margin: "0 auto 80px", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "25px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ 
              padding: "35px", background: colors.cardBg, borderRadius: "28px", border: `1px solid ${colors.cardBorder}`, 
              textAlign: "center", boxShadow: colors.glow, backdropFilter: "blur(10px)" 
            }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: colors.text }}><Counter value={s.value} /></div>
              <p style={{ color: colors.subText, fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700, marginTop: "8px", letterSpacing: "1px" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- PERSONAL & VISION SECTION (SPLIT CASE-STUDY LAYOUT) --- */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto 150px",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          gap: 60,
        }}
      >
        {/* SECTION 1: FOUNDER - IMAGE LEFT / TEXT RIGHT */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 28,
            alignItems: "stretch",
            height: aboutSplitRowHeight,
          }}
        >
          {/* Image side */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              flex: "1 1 0",
              height: "100%",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: isDark
                ? "0 26px 60px rgba(15,23,42,0.9)"
                : "0 24px 55px rgba(15,23,42,0.35)",
              border: `1px solid ${colors.cardBorder}`,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url(/images/profile.jpeg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "45% 0 0 0",
                background:
                  "linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.4) 40%, rgba(15,23,42,0.75) 100%)",
              }}
            />
          </motion.div>

          {/* Content side */}
          <div
            style={{
              flex: "1 1 0",
              display: "flex",
              alignItems: "stretch",
              height: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 24,
                padding: "22px 22px 20px",
                background: isDark
                  ? "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(15,23,42,0.94))"
                  : "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(226,232,240,0.96))",
                border: `1px solid ${colors.cardBorder}`,
                boxShadow: colors.glow,
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: colors.subText,
                }}
              >
                Founder Profile
              </span>
              <h2
                style={{
                  fontSize: "1.9rem",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  margin: "6px 0 4px",
                }}
              >
                Muhammad Umer
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: accentColor,
                  margin: 0,
                }}
              >
                Lead Developer · Founder
              </p>
              <p
                style={{
                  margin: "12px 0 0",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  color: colors.subText,
                  maxWidth: 420,
                }}
              >
                Designing calm, predictable automation so clinicians can focus on people, not portals.
              </p>

              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {["MedTech", "AI Systems", "EMR Integrations"].map((tag) => (
                  <motion.div
                    key={tag}
                    whileHover={{ y: -2, scale: 1.03 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{
                      padding: "4px 11px",
                      borderRadius: 999,
                      fontSize: "0.72rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      background: isDark
                        ? "rgba(15,23,42,0.98)"
                        : "rgba(241,245,249,0.98)",
                      border: `1px solid ${accentColor}66`,
                      boxShadow: "0 10px 26px rgba(15,23,42,0.35)",
                    }}
                  >
                    {tag}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* SECTION 2: VISION - TEXT LEFT / IMAGE RIGHT */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 28,
            alignItems: "stretch",
            height: aboutSplitRowHeight,
          }}
        >
          {/* Text side */}
          <div
            style={{
              flex: "1 1 0",
              display: "flex",
              alignItems: "stretch",
              height: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 24,
                padding: "22px 22px 20px",
                background: isDark
                  ? "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(15,23,42,0.94))"
                  : "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(226,232,240,0.96))",
                border: `1px solid ${colors.cardBorder}`,
                boxShadow: colors.glow,
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: colors.subText,
                }}
              >
                Product Vision
              </span>
              <h2
                style={{
                  fontSize: "1.9rem",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  margin: "6px 0 8px",
                }}
              >
                Our Vision for Care
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  color: colors.subText,
                  maxWidth: 460,
                }}
              >
                Building connected, safe automation that quietly keeps every workflow in sync across the clinic.
              </p>

              <div
                style={{
                  marginTop: 16,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 12,
                }}
              >
                {[
                  {
                    icon: <FaNetworkWired size={18} />,
                    title: "Connected Workflows",
                    line: "Scheduling, EMR, and messaging stay in sync.",
                  },
                  {
                    icon: <FaShieldAlt size={18} />,
                    title: "Safe Automation",
                    line: "Automation that protects clinicians and patients.",
                  },
                  {
                    icon: <FaClinicMedical size={18} />,
                    title: "Scalable Clinics",
                    line: "Built to grow from single sites to networks.",
                  },
                ].map((feature) => (
                  <motion.div
                    key={feature.title}
                    whileHover={{ y: -3, boxShadow: isDark ? "0 16px 40px rgba(15,23,42,0.9)" : "0 14px 34px rgba(15,23,42,0.3)" }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 18,
                      background: isDark
                        ? "rgba(15,23,42,0.96)"
                        : "rgba(241,245,249,0.96)",
                      border: `1px solid ${accentColor}33`,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isDark
                          ? "rgba(15,23,42,0.98)"
                          : "rgba(219,234,254,0.98)",
                        color: accentColor,
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.86rem",
                          fontWeight: 700,
                          color: colors.text,
                        }}
                      >
                        {feature.title}
                      </span>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: colors.subText,
                        }}
                      >
                        {feature.line}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Illustration side */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              flex: "1 1 0",
              height: "100%",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: isDark
                ? "0 26px 60px rgba(15,23,42,0.9)"
                : "0 24px 55px rgba(15,23,42,0.35)",
              border: `1px solid ${colors.cardBorder}`,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url(/images/dashboard.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 0% 0%, rgba(15,23,42,0.25), transparent 60%)",
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* --- CORE VALUES --- */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <h2
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3rem)",
            fontWeight: 900,
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          Core Values
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px" }}>
          {coreValues.map((v, i) => (
            <motion.div key={i} whileHover={{ y: -10, borderColor: accentColor, boxShadow: colors.glow }} style={{ 
              padding: "40px", borderRadius: "32px", background: colors.cardBg, border: `1px solid ${colors.cardBorder}`, 
              textAlign: "center", transition: "all 0.3s ease", backdropFilter: "blur(10px)"
            }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "20px" }}>{v.icon}</div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "12px" }}>{v.title}</h3>
              <p style={{ color: colors.subText, lineHeight: "1.7", fontSize: "0.95rem" }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
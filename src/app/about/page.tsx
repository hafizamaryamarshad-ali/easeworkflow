"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { FaUserMd, FaHospital, FaClock, FaCheckCircle, FaEye, FaLinkedin, FaGithub } from "react-icons/fa";

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
    { label: "Clinics Integrated", value: "300+", icon: <FaHospital /> },
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
    backdropFilter: "blur(22px)",
    display: "flex",
    flexDirection: "column" as const,
    height: "100%",
    position: "relative" as const,
    overflow: "hidden" as const,
    transition:
      "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease",
  };

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

      {/* --- PERSONAL & VISION SECTION --- */}
      {/* Margin bottom barha diya taaki niche wali heading se gap milay */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto 150px",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "28px",
            alignItems: "stretch",
          }}
        >
          {/* PROFILE CARD */}
          <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            style={{
              ...cardStyle,
              padding: "30px 26px",
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              columnGap: 22,
              rowGap: 16,
              alignItems: "center",
            }}
          >
            {/* Left: avatar + status */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "32px",
                  padding: 3,
                  background:
                    "linear-gradient(135deg, " + accentColor + " 0%, transparent 60%)," +
                    (isDark
                      ? "radial-gradient(circle at 0 0, rgba(148,163,184,0.25), transparent 60%)"
                      : "radial-gradient(circle at 0 0, rgba(148,163,184,0.25), transparent 60%)"),
                  boxShadow: `0 20px 45px ${accentColor}3d`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "26px",
                    overflow: "hidden",
                    background: isDark ? "#020617" : "#e2e8f0",
                  }}
                >
                  <img
                    src="\images\profile.jpeg"
                    alt="Muhammad Umer"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://ui-avatars.com/api/?name=Muhammad+Umer&background=0ea5e9&color=fff";
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: isDark
                    ? "rgba(15,23,42,0.9)"
                    : "rgba(226,232,240,0.9)",
                  border: `1px solid ${accentColor}55`,
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: colors.subText,
                }}
              >
                Product Engineer · MedTech
              </div>
            </div>

            {/* Right: text + socials */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 14,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: colors.subText,
                  }}
                >
                  Founder Profile
                </span>
                <h2
                  style={{
                    fontSize: "1.9rem",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    margin: 0,
                  }}
                >
                  Muhammad Umer
                </h2>
                <p
                  style={{
                    color: accentColor,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    margin: "2px 0 6px",
                  }}
                >
                  Lead Developer · Founder
                </p>
                <p
                  style={{
                    color: colors.subText,
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    maxWidth: 380,
                    margin: 0,
                  }}
                >
                  Designing healthcare automation experiences that feel human, predictable, and performance‑driven —
                  from appointment flows to EMR integrations.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  marginTop: 4,
                }}
              >
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    { icon: <FaLinkedin />, link: "#" },
                    { icon: <FaGithub />, link: "#" },
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 999,
                        background: isDark
                          ? "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.8))"
                          : "linear-gradient(135deg, #ffffff, #e5edff)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: colors.text,
                        fontSize: "1.05rem",
                        boxShadow: isDark
                          ? "0 10px 24px rgba(15,23,42,0.9)"
                          : "0 8px 20px rgba(15,23,42,0.18)",
                        border: `1px solid ${accentColor}66`,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>

                <div
                  style={{
                    fontSize: "0.8rem",
                    color: colors.subText,
                    textAlign: "right",
                  }}
                >
                  Shipping AI products for
                  <br />
                  clinics & health systems.
                </div>
              </div>
            </div>

            {/* subtle top accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background:
                  "linear-gradient(90deg, transparent, " + accentColor + ", transparent)",
                opacity: 0.4,
              }}
            />
          </motion.div>

          {/* VISION CARD */}
          <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            style={{
              ...cardStyle,
              padding: "30px 26px",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {/* Background glow chips */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -60,
                  right: -40,
                  width: 200,
                  height: 200,
                  borderRadius: "999px",
                  background:
                    theme === "dark"
                      ? "radial-gradient(circle, rgba(56,189,248,0.4), transparent 70%)"
                      : "radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)",
                  filter: "blur(42px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -60,
                  left: -40,
                  width: 180,
                  height: 180,
                  borderRadius: "999px",
                  background:
                    theme === "dark"
                      ? "radial-gradient(circle, rgba(30,64,175,0.5), transparent 70%)"
                      : "radial-gradient(circle, rgba(129,140,248,0.45), transparent 70%)",
                  filter: "blur(40px)",
                }}
              />
            </div>

            <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 14, alignItems: "center" }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    theme === "dark"
                      ? "linear-gradient(135deg, #0ea5e9, #22c55e)"
                      : "linear-gradient(135deg, #2563eb, #22c55e)",
                  boxShadow: `0 14px 30px ${accentColor}66`,
                  color: "#f9fafb",
                }}
              >
                <FaEye size={24} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: colors.subText,
                  }}
                >
                  Product Vision
                </span>
                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    margin: 0,
                  }}
                >
                  Our Vision for Care
                </h2>
              </div>
            </div>

            <p
              style={{
                position: "relative",
                zIndex: 1,
                color: colors.subText,
                fontSize: "0.98rem",
                lineHeight: 1.8,
                margin: 0,
                maxWidth: 520,
              }}
            >
              We imagine healthcare teams supported by quiet, reliable automation — where admin friction disappears
              and every interaction is focused on the patient, not the system.
            </p>

            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 12,
                marginTop: 6,
              }}
            >
              {[
                {
                  label: "Connected Workflows",
                  desc: "From intake to discharge, every touchpoint stays in sync.",
                },
                {
                  label: "Safe Automation",
                  desc: "AI handles the busywork; clinicians keep every decision.",
                },
                {
                  label: "Scalable Clinics",
                  desc: "Designed to grow from single sites to large networks.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 18,
                    background: isDark
                      ? "rgba(15,23,42,0.9)"
                      : "rgba(241,245,249,0.9)",
                    border: `1px solid ${accentColor}33`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: colors.text,
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.86rem",
                      color: colors.subText,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 1,
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: "0.82rem",
                color: colors.subText,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 1,
                  background:
                    "linear-gradient(90deg, " + accentColor + ", transparent)",
                  opacity: 0.7,
                }}
              />
              Built for teams who want healthcare automation that feels
              <span style={{ color: accentColor, fontWeight: 600 }}>invisible yet powerful</span>.
            </div>
          </motion.div>
        </div>
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
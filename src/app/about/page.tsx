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
    padding: "35px 32px", // Height kam karne ke liye padding thodi kam ki
    borderRadius: "40px",
    background: colors.cardBg,
    border: `1px solid ${colors.cardBorder}`,
    boxShadow: colors.glow,
    backdropFilter: "blur(20px)",
    display: "flex",
    flexDirection: "column" as const,
    height: "100%", 
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
      <section style={{ maxWidth: "1200px", margin: "0 auto 150px", padding: "0 20px" }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", 
          gap: "30px", 
          alignItems: "stretch" 
        }}>
          
          <motion.div
            whileHover={{ y: -10, borderColor: accentColor }}
            style={{ ...cardStyle, alignItems: "center", textAlign: "center", justifyContent: "center" }}
          >
            <div style={{ 
              width: "120px", 
              height: "120px", 
              borderRadius: "50%", 
              overflow: "hidden", 
              border: `4px solid ${accentColor}`,
              boxShadow: `0 0 20px ${accentColor}33`,
              marginBottom: "15px",
              background: isDark ? "#1e293b" : "#e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <img 
                src="\images\profile.jpeg" 
                alt="Muhammad Umer"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Muhammad+Umer&background=0ea5e9&color=fff"; }}
              />
            </div>

            <h2 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.03em", margin: 0 }}>
              Muhammad Umer
            </h2>
            <p style={{ color: accentColor, fontSize: "0.9rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", margin: "8px 0" }}>
              Lead Developer / Founder
            </p>
            <p style={{ color: colors.subText, fontSize: "0.95rem", lineHeight: "1.5", maxWidth: "320px", marginBottom: "15px" }}>
              Building efficient, high-performance digital solutions for the healthcare industry.
            </p>

            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { icon: <FaLinkedin />, link: "#" },
                { icon: <FaGithub />, link: "#" }
              ].map((social, idx) => (
                <motion.a 
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, backgroundColor: accentColor, color: "#fff" }}
                  style={{ 
                    width: "42px", 
                    height: "42px", 
                    borderRadius: "12px", 
                    background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    color: colors.text,
                    fontSize: "1.2rem",
                    transition: "all 0.3s ease"
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -10, borderColor: accentColor }}
            style={{ ...cardStyle, alignItems: "flex-start", textAlign: "left" }}
          >
            <div style={{ fontSize: "2.2rem", color: accentColor, marginBottom: "10px" }}><FaEye /></div>
            <h2 style={{ fontSize: "2.1rem", fontWeight: 900, letterSpacing: "-0.03em", margin: 0 }}>
              Our Vision
            </h2>
            <p style={{ color: colors.subText, fontSize: "1rem", lineHeight: "1.7", margin: 0 }}>
              We envision healthcare systems that are fully connected, automated, and data‑driven—where every workflow is efficient, secure, and clinically meaningful. 
              <br/><br/>
              EaseWorkflow aims to lead this shift by building smart, adaptive tools that support clinicians, eliminate friction, and make high‑quality care consistently accessible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <h2 style={{ fontSize: "3rem", fontWeight: 900, textAlign: "center", marginBottom: "60px" }}>Core Values</h2>
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
"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { FaUserMd, FaHospital, FaClock, FaCheckCircle, FaLinkedin, FaTwitter, FaGithub, FaRocket, FaEye } from "react-icons/fa";

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

  // --- COLORS SYNCED WITH HERO COMPONENT ---
  const accentColor = isDark ? "#0ea5e9" : "#3b82f6";
  const colors = {
    bgImage: isDark ? "var(--bg-gradient-dark)" : "none",
    bgColor: isDark ? "#0f172a" : "#f5f7fa",
    text: isDark ? "#f8fafc" : "#0f172a",
    subText: isDark ? "#cbd5e1" : "#1e293b",
    cardBg: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
    cardBorder: isDark ? "rgba(14, 165, 233, 0.2)" : "rgba(59, 130, 246, 0.1)",
    btnGradient: isDark ? "linear-gradient(90deg,#0ea5e9,#3b82f6)" : "linear-gradient(90deg,#3b82f6,#60a5fa)",
    glow: isDark ? "0 12px 28px rgba(0,198,255,0.25)" : "0 12px 28px rgba(59,130,246,0.15)"
  };

  const stats = [
    { label: "Years Experience", value: "10+", icon: <FaClock /> },
    { label: "Patients Served", value: "10,000+", icon: <FaUserMd /> },
    { label: "Satisfaction", value: "99%", icon: <FaCheckCircle /> },
    { label: "Clinics Integrated", value: "500+", icon: <FaHospital /> },
  ];

  const coreValues = [
    { title: "Innovation", desc: "Pushing technological boundaries to transform healthcare.", icon: "⚡" },
    { title: "Integrity", desc: "Transparency and ethical principles guide every line of code.", icon: "🛡️" },
    { title: "Collaboration", desc: "Working hand-in-hand with medical experts to co-create.", icon: "🤝" },
    { title: "Excellence", desc: "Setting industry benchmarks through superior engineering.", icon: "💎" },
    { title: "User-First", desc: "Built around the clinician's actual daily needs.", icon: "👤" },
    { title: "Security", desc: "Enterprise-grade protection for sensitive medical data.", icon: "🔒" }
  ];

  const leaders = [
    { name: "Muhammad Umer", role: "Chief Executive Officer", img: "data:image/jpeg;base64,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",bio: "Visionary behind EaseWorkflow's core automation engine." }, 
    { name: "Muhammad Mueed", role: "Head of Engineering", img: "data:image/png;base64,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",bio: "Expert in secure medical-grade cloud infrastructure." },
    { name: "Mr.s Umer", role: "Product Strategy", img: "data:image/jpeg;base64,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", bio: "Designing next-gen seamless clinical experiences." }
  ];

  return (
    <div style={{ 
      backgroundColor: colors.bgColor, 
      backgroundImage: colors.bgImage,
      backgroundSize: "600% 600%",
      color: colors.text, 
      minHeight: "100vh", 
      fontFamily: "'Inter', sans-serif", 
      transition: "all 0.5s ease" 
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

      {/* --- MISSION & VISION --- */}
      <section style={{ maxWidth: "1200px", margin: "0 auto 100px", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
          {[
            {
              title: "Our Mission",
              icon: <FaRocket />,
              text:
                "EaseWorkflow’s mission is to simplify and modernize healthcare operations with intelligent, reliable, user‑centered digital solutions. We reduce administrative burden, improve patient outcomes, and integrate seamlessly with existing systems while upholding strict standards for compliance, data security, and ethical AI.",
            },
            {
              title: "Our Vision",
              icon: <FaEye />,
              text:
                "We envision healthcare systems that are fully connected, automated, and data‑driven—where every workflow is efficient, secure, and clinically meaningful. EaseWorkflow aims to lead this shift by building smart, adaptive tools that support clinicians, eliminate friction, and make high‑quality care consistently accessible.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{
                y: -10,
                boxShadow:
                  theme === "dark"
                    ? "0 22px 55px rgba(15,23,42,0.9)"
                    : "0 18px 40px rgba(15,23,42,0.12)",
                borderColor: accentColor,
              }}
              style={{
                padding: "40px 32px",
                borderRadius: "32px",
                background: colors.cardBg,
                border: `1px solid ${colors.cardBorder}`,
                boxShadow: colors.glow,
                backdropFilter: "blur(15px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "18px",
              }}
            >
              <div style={{ fontSize: "2.3rem", color: accentColor }}>{card.icon}</div>
              <h2
                style={{
                  fontSize: "2.1rem",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  margin: 0,
                }}
              >
                {card.title}
              </h2>
              <p
                style={{
                  color: colors.subText,
                  fontSize: "1rem",
                  lineHeight: "1.7",
                  margin: 0,
                }}
              >
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section style={{ maxWidth: "1200px", margin: "0 auto 100px", padding: "0 20px" }}>
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

      {/* --- LEADERSHIP TEAM --- */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 100px" }}>
         <h2 style={{ fontSize: "3rem", fontWeight: 900, textAlign: "center", marginBottom: "80px" }}>Leadership Team</h2>
         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px" }}>
            {leaders.map((lead, i) => (
              <motion.div key={i} whileHover={{ y: -15 }} style={{ textAlign: "center" }}>
                <div style={{ 
                  width: "220px", height: "220px", margin: "0 auto 30px", borderRadius: "40px", 
                  overflow: "hidden", border: `3px solid ${colors.cardBorder}`, boxShadow: colors.glow 
                }}>
                  <img src={lead.img} alt={lead.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <h3 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "5px" }}>{lead.name}</h3>
                <p style={{ color: accentColor, fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px" }}>{lead.role}</p>
                <p style={{ color: colors.subText, fontSize: "1rem", lineHeight: "1.6", marginBottom: "25px", padding: "0 20px" }}>{lead.bio}</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "20px", color: colors.subText }}>
                  <motion.a whileHover={{ color: accentColor }} href="#"><FaLinkedin size={22} /></motion.a>
                  <motion.a whileHover={{ color: accentColor }} href="#"><FaTwitter size={22} /></motion.a>
                  <motion.a whileHover={{ color: accentColor }} href="#"><FaGithub size={22} /></motion.a>
                </div>
              </motion.div>
            ))}
         </div>
      </section>
    </div>
  );
}
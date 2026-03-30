"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
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
  const [activeStep, setActiveStep] = useState(0);
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
    { name: "S. Al-Fahad", role: "Chief Executive Officer", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&h=300&auto=format&fit=crop", bio: "Visionary behind EaseWorkflow's core automation engine." },
    { name: "Hassan Raza", role: "Head of Engineering", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&h=300&auto=format&fit=crop", bio: "Expert in secure medical-grade cloud infrastructure." },
    { name: "Zain Ahmed", role: "Product Strategy", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&h=300&auto=format&fit=crop", bio: "Designing next-gen seamless clinical experiences." }
  ];

  const processSteps = [
    { title: "Strategy", icon: "🎯", desc: "Analyzing workflows and goal mapping." },
    { title: "Design", icon: "🎨", desc: "User-centric clinical interface crafting." },
    { title: "Engineering", icon: "⚙️", desc: "Building secure, scalable AI engines." },
    { title: "Deployment", icon: "🚀", desc: "Seamless integration with zero downtime." },
    { title: "Evolve", icon: "🛠️", desc: "Continuous monitoring and optimization." },
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
            { title: "Our Mission", icon: <FaRocket />, text: "EaseWorkflow ka maqsad healthcare mein administrative friction ko khatam karna aur manual paperwork ko digital speed mein tabdeel karna hai." },
            { title: "Our Vision", icon: <FaEye />, text: "Humara vision aik aisa ecosystem banana hai jahan technology aur insani care mil kar healthcare ko mazeed efficient banayein." }
          ].map((card, i) => (
            <motion.div key={i} whileHover={{ y: -8 }} style={{ 
              padding: "50px", borderRadius: "40px", background: colors.cardBg, border: `1px solid ${colors.cardBorder}`, 
              boxShadow: colors.glow, backdropFilter: "blur(15px)"
            }}>
              <div style={{ fontSize: "2.5rem", color: accentColor, marginBottom: "25px" }}>{card.icon}</div>
              <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "20px" }}>{card.title}</h2>
              <p style={{ color: colors.subText, fontSize: "1.1rem", lineHeight: "1.8" }}>{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- OPERATIONAL LIFECYCLE --- */}
      <section style={{ textAlign: "center", marginBottom: "120px" }}>
        <h2 style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "60px" }}>Our Lifecycle</h2>
        <div style={{ position: "relative", width: "min(450px, 90vw)", height: "min(450px, 90vw)", margin: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
           <div style={{ position: "absolute", width: "100%", height: "100%", border: `1px solid ${colors.cardBorder}`, borderRadius: "50%" }} />
           <div style={{ width: "260px", zIndex: 5 }}>
              <AnimatePresence mode="wait">
                <motion.div key={activeStep} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div style={{ fontSize: "3rem", marginBottom: "10px" }}>{processSteps[activeStep].icon}</div>
                  <h3 style={{ fontSize: "1.8rem", fontWeight: 900, color: accentColor }}>{processSteps[activeStep].title}</h3>
                  <p style={{ color: colors.subText, fontSize: "0.95rem" }}>{processSteps[activeStep].desc}</p>
                </motion.div>
              </AnimatePresence>
           </div>
           {processSteps.map((step, i) => {
              const angle = (i * 360) / processSteps.length;
              const x = Math.cos((angle - 90) * (Math.PI / 180)) * 225;
              const y = Math.sin((angle - 90) * (Math.PI / 180)) * 225;
              return (
                <div key={i} onMouseEnter={() => setActiveStep(i)} style={{
                  position: "absolute", left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`,
                  width: "60px", height: "60px", marginLeft: "-30px", marginTop: "-30px",
                  background: activeStep === i ? colors.btnGradient : (isDark ? "#1e293b" : "#e2e8f0"), borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  border: `2px solid ${activeStep === i ? "#fff" : colors.cardBorder}`, transition: "0.3s",
                  boxShadow: activeStep === i ? colors.glow : "none"
                }}>
                  <span style={{ fontSize: "1.3rem" }}>{step.icon}</span>
                </div>
              );
           })}
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
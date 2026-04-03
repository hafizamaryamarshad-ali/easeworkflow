"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "./theme/ThemeProvider";

const steps = [
  { title: "Strategy", desc: "Analyzing healthcare workflows to identify AI opportunities compliant with GDPR.", sprint: 1, pos: "0%", width: "35%", color: "#00D1FF", textColor: "#000", icon: "💡" },
  { title: "Design", desc: "User-centric UI/UX design for medical staff and secure AI architecture.", sprint: 1.5, pos: "12%", width: "40%", color: "#3b82f6", textColor: "#fff", icon: "🎨" },
  { title: "Development", desc: "Building high-performance AI solutions with rigorous clinical validation.", sprint: 2, pos: "25%", width: "45%", color: "#00D1FF", textColor: "#000", icon: "⚙️" },
  { title: "Security & Privacy", desc: "We sign a Data Processing Agreement (DPA) to guarantee rigorous data security and protect patient privacy.", sprint: 2.5, pos: "45%", width: "40%", color: "#10b981", textColor: "#fff", icon: "🛡️" },
  { title: "Launch", desc: "Seamless deployment of the AI system into your clinical environment.", sprint: 3, pos: "70%", width: "24%", color: "#3b82f6", textColor: "#fff", icon: "🚀" },
  { title: "Support", desc: "Ongoing maintenance and optimization to ensure your system thrives.", sprint: 3.5, pos: "80%", width: "25%", color: "#00D1FF", textColor: "#000", icon: "👥" },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const colors = {
    bg: isDark ? "#08081A" : "#f8fafc",
    text: isDark ? "#FFF" : "#0f172a",
    subText: isDark ? "#CCC" : "#475569",
    border: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
    orbitBorder: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)",
    cardBg: isDark ? "#08081A" : "#ffffff",
    labelInactive: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
  };

  return (
    <section
      className="process-section"
      style={{
        padding: "80px 40px",
        background: colors.bg,
        color: colors.text,
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        transition: "all 0.5s ease"
      }}
    >
      
      <h2
        style={{
          textAlign: "center",
          fontSize: "clamp(2.2rem, 4.5vw, 3rem)",
          fontWeight: "800",
          marginBottom: "80px",
        }}
      >
        How We Build Your AI Product: Our Process
      </h2>

      <div
        className="process-grid"
        style={{
          maxWidth: "1550px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.3fr",
          gap: "110px",
          alignItems: "center",
          transform: "scale(0.92)",
        }}
      >

        {/* LEFT SECTION: GANTT CHART */}
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", marginBottom: "30px", fontSize: "0.9rem", fontWeight: "700", opacity: 0.8 }}>
            <span style={{ flex: 1, textAlign: "center" }}>SPRINT 1</span>
            <span style={{ flex: 1, textAlign: "center" }}>SPRINT 2</span>
            <span style={{ flex: 1, textAlign: "center" }}>SPRINT 3</span>
          </div>

          <div style={{ position: "relative", borderTop: `1px solid ${colors.border}` }}>
            <div style={{ position: "absolute", left: "33.33%", top: 0, bottom: 0, width: "1px", background: colors.border }} />
            <div style={{ position: "absolute", left: "66.66%", top: 0, bottom: 0, width: "1px", background: colors.border }} />

            {steps.map((step, i) => (
              <div 
                key={i} 
                onMouseEnter={() => setActiveStep(step)}
                onMouseLeave={() => setActiveStep(null)}
                style={{ height: "85px", borderBottom: `1px solid ${colors.border}`, position: "relative", display: "flex", alignItems: "center" }}
              >
                <motion.div
                  style={{
                    position: "absolute",
                    left: step.pos,
                    width: step.width,
                    height: "45px",
                    background: step.color,
                    borderRadius: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: step.textColor,
                    fontWeight: "800",
                    fontSize: "1rem",
                    cursor: "pointer",
                    padding: "0 25px",
                    boxShadow: activeStep?.title === step.title ? `0 0 35px ${step.color}aa` : "0 4px 15px rgba(0,0,0,0.1)",
                    zIndex: activeStep?.title === step.title ? 10 : 1
                  }}
                >
                  {step.title}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION: ORBIT DESIGN */}
        <div
          className="process-orbit-wrapper"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "700px",
          }}
        >
          
          <div style={{ position: "absolute", width: "280px", textAlign: "center", zIndex: 100, pointerEvents: "none" }}>
            <AnimatePresence mode="wait">
              {activeStep && (
                <motion.div key={activeStep.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                  <h3 style={{ color: "#0ea5e9", fontSize: "1.6rem", marginBottom: "12px", fontWeight: "800" }}>{activeStep.title}</h3>
                  <p style={{ fontSize: "0.95rem", color: colors.subText, lineHeight: "1.7" }}>{activeStep.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="process-orbit"
            style={{ position: "relative", width: "580px", height: "580px" }}
          >
            {/* Center Gradient Depth */}
            <div style={{ 
                position: "absolute", 
                inset: "155px", 
                borderRadius: "50%", 
                background: isDark 
                    ? "radial-gradient(circle, rgba(0, 209, 255, 0.15) 0%, #08081A 80%)" 
                    : "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, #f8fafc 80%)", 
                zIndex: 1 
            }} />

            {/* Middle Icon Orbit */}
            <motion.div 
              animate={{ rotate: isPaused ? undefined : 360 }}
              transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: "50px", borderRadius: "50%", border: `2px solid ${colors.orbitBorder}`, zIndex: 10, pointerEvents: "none" }}
            >
              {steps.map((step, i) => {
                const angle = (i * 360) / steps.length;
                const isActive = activeStep?.title === step.title;
                return (
                  <div key={i} style={{ position: "absolute", inset: 0, transform: `rotate(${angle}deg)` }}>
                    <div 
                      onMouseEnter={() => { setActiveStep(step); setIsPaused(true); }}
                      onMouseLeave={() => { setActiveStep(null); setIsPaused(false); }}
                      style={{
                        position: "absolute", top: "-36px", left: "50%",
                        transform: `translateX(-50%) rotate(${-angle}deg)`, 
                        cursor: "pointer", pointerEvents: "auto", zIndex: 200
                      }}
                    >
                      <motion.div
                        animate={{ 
                            backgroundColor: isActive ? (isDark ? "#FFF" : "#3b82f6") : (isDark ? step.color : "#94a3b8"), 
                            scale: isActive ? 1.25 : 1,
                            color: isActive && !isDark ? "#fff" : "inherit"
                        }}
                        style={{
                          width: "72px", height: "72px", borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "2rem", border: `6px solid ${colors.bg}`,
                          boxShadow: isActive ? `0 0 40px ${isDark ? "#FFF" : "#3b82f6"}` : "0 0 20px rgba(0, 209, 255, 0.1)"
                        }}
                      >
                        {step.icon}
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Outer Label Orbit */}
            <motion.div 
              animate={{ rotate: isPaused ? undefined : -360 }}
              transition={{ duration: 85, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: "-65px", borderRadius: "50%", border: `1px solid ${isDark ? "rgba(0, 209, 255, 0.1)" : "rgba(0,0,0,0.05)"}`, zIndex: 5, pointerEvents: "none" }}
            >
              {steps.map((step, i) => {
                const angle = (i * 360) / steps.length;
                return (
                  <div key={i} style={{ position: "absolute", top: "50%", left: "50%", transform: `rotate(${angle}deg) translate(345px)` }}>
                    <motion.div 
                      animate={{ rotate: isPaused ? undefined : 360 }} 
                      transition={{ duration: 85, repeat: Infinity, ease: "linear" }}
                    >
                      <span style={{
                        fontSize: "1.05rem", fontWeight: "700",
                        color: activeStep?.title === step.title ? (isDark ? "#00D1FF" : "#3b82f6") : colors.labelInactive,
                        display: "block", transform: `rotate(${-angle}deg)`, whiteSpace: "nowrap"
                      }}>
                        {step.title}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
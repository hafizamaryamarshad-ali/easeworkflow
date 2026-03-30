"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const steps = [
  { title: "Strategy", desc: "Analyzing healthcare workflows to identify AI opportunities compliant with GDPR.", sprint: 1, pos: "0%", width: "40%", color: "#00D1FF", textColor: "#000", icon: "💡" },
  { title: "Design", desc: "User-centric UI/UX design for medical staff and secure AI architecture.", sprint: 1.5, pos: "15%", width: "45%", color: "#FFF", textColor: "#000", icon: "🎨" },
  { title: "Development & Testing", desc: "Building high-performance AI solutions with rigorous clinical validation.", sprint: 2, pos: "30%", width: "50%", color: "#00D1FF", textColor: "#000", icon: "⚙️" },
  { title: "Launch", desc: "Seamless deployment of the AI system into your clinical environment.", sprint: 3, pos: "70%", width: "24%", color: "#FFF", textColor: "#000", icon: "🚀" },
  { title: "Support", desc: "Ongoing maintenance and optimization to ensure your system thrives.", sprint: 3.5, pos: "80%", width: "25%", color: "#00D1FF", textColor: "#000", icon: "👥" },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section style={{
      padding: "80px 40px",
      background: "#08081A", 
      color: "#FFF",
      fontFamily: "'Inter', sans-serif",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: "hidden"
    }}>
      
      <h2 style={{ textAlign: "center", fontSize: "3rem", fontWeight: "800", marginBottom: "80px" }}>
        How We Build Your AI Product: Our Process
      </h2>

      <div style={{
        maxWidth: "1550px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1.3fr",
        gap: "110px", // Increased padding between table and circle
        alignItems: "center",
        transform: "scale(0.92)", 
      }}>

        {/* LEFT SECTION: GANTT CHART */}
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", marginBottom: "30px", fontSize: "0.9rem", fontWeight: "700", opacity: 0.8 }}>
            <span style={{ flex: 1, textAlign: "center" }}>SPRINT 1</span>
            <span style={{ flex: 1, textAlign: "center" }}>SPRINT 2</span>
            <span style={{ flex: 1, textAlign: "center" }}>SPRINT 3</span>
          </div>

          <div style={{ position: "relative", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
            <div style={{ position: "absolute", left: "33.33%", top: 0, bottom: 0, width: "1px", background: "rgba(255,255,255,0.1)" }} />
            <div style={{ position: "absolute", left: "66.66%", top: 0, bottom: 0, width: "1px", background: "rgba(255,255,255,0.1)" }} />

            {steps.map((step, i) => (
              <div 
                key={i} 
                onMouseEnter={() => setActiveStep(step)}
                onMouseLeave={() => setActiveStep(null)}
                style={{ height: "95px", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "relative", display: "flex", alignItems: "center" }}
              >
                <motion.div
                  style={{
                    position: "absolute",
                    left: step.pos,
                    width: step.width,
                    height: "50px",
                    background: step.color,
                    borderRadius: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: step.textColor,
                    fontWeight: "800",
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    padding: "0 35px", // Extra padding for buttons
                    boxShadow: activeStep?.title === step.title ? `0 0 35px ${step.color}aa` : "0 4px 15px rgba(0,0,0,0.3)",
                  }}
                >
                  {step.title}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION: 100% ACCURATE ORBIT DESIGN */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", height: "700px" }}>
          
          <div style={{ position: "absolute", width: "260px", textAlign: "center", zIndex: 100, pointerEvents: "none" }}>
            <AnimatePresence mode="wait">
              {activeStep && (
                <motion.div key={activeStep.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                  <h3 style={{ color: "#00D1FF", fontSize: "1.6rem", marginBottom: "12px", fontWeight: "800" }}>{activeStep.title}</h3>
                  <p style={{ fontSize: "0.95rem", color: "#CCC", lineHeight: "1.7" }}>{activeStep.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ position: "relative", width: "580px", height: "580px" }}>
            {/* Center Gradient Depth */}
            <div style={{ position: "absolute", inset: "155px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0, 209, 255, 0.15) 0%, #08081A 80%)", zIndex: 1 }} />

            {/* Middle Icon Orbit (With Intermediate Dots) */}
            <motion.div 
              animate={{ rotate: isPaused ? undefined : 360 }}
              transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: "50px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", zIndex: 10, pointerEvents: "none" }}
            >
              {steps.map((step, i) => {
                const angle = (i * 360) / steps.length;
                const isActive = activeStep?.title === step.title;
                return (
                  <div key={i} style={{ position: "absolute", inset: 0, transform: `rotate(${angle}deg)` }}>
                    {/* Main Icon */}
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
                        animate={{ backgroundColor: isActive ? "#FFF" : "#00D1FF", scale: isActive ? 1.25 : 1 }}
                        style={{
                          width: "72px", height: "72px", borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "2rem", border: "6px solid #08081A",
                          boxShadow: isActive ? "0 0 40px #FFF" : "0 0 20px rgba(0, 209, 255, 0.4)"
                        }}
                      >
                        {step.icon}
                      </motion.div>
                    </div>
                    {/* Decorative Orbit Dot (Image match) */}
                    <div style={{ position: "absolute", top: "0px", left: "50%", width: "18px", height: "18px", background: "#FFF", borderRadius: "50%", border: "4px solid #08081A", transform: `rotate(36deg) translateX(-50%) translateY(-50%)`, transformOrigin: "50% 240px" }} />
                  </div>
                );
              })}
            </motion.div>

            {/* Outer Label Orbit (Always Upright Text) */}
            <motion.div 
              animate={{ rotate: isPaused ? undefined : -360 }}
              transition={{ duration: 85, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: "-65px", borderRadius: "50%", border: "1px solid rgba(0, 209, 255, 0.1)", zIndex: 5, pointerEvents: "none" }}
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
                        color: activeStep?.title === step.title ? "#00D1FF" : "rgba(255,255,255,0.45)",
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
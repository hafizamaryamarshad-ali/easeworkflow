"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaUserMd, FaHospital, FaClock, FaCheckCircle, FaLinkedin, FaTwitter, FaGithub, FaRocket, FaEye } from "react-icons/fa";

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState(0);

  const accentColor = "#00d4ff";
  const subText = "#94a3b8";

  const stats = [
    { label: "Patients Impacted", value: "10M+", icon: <FaUserMd /> },
    { label: "Clinics Integrated", value: "500+", icon: <FaHospital /> },
    { label: "Automation Speed", value: "2.5x", icon: <FaClock /> },
    { label: "Trust Score", value: "99.9%", icon: <FaCheckCircle /> },
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

  return (
    <div style={{ background: "#050508", color: "#fff", minHeight: "100vh", fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      
      {/* --- HERO SECTION --- */}
      <section style={{ position: "relative", padding: "120px 20px 60px", maxWidth: "1400px", margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: accentColor, fontWeight: 800, letterSpacing: "4px", textTransform: "uppercase", fontSize: "0.75rem", marginBottom: "15px" }}>
          Leading the MedTech Frontier
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: "5.5rem", fontWeight: 900, lineHeight: "1", letterSpacing: "-3px" }}>
          The Spirit of <span style={{ color: accentColor }}>Innovation</span>
        </motion.h1>
      </section>

      {/* --- STATS BAR --- */}
      <section style={{ maxWidth: "1200px", margin: "0 auto 80px", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: "30px", background: "rgba(255,255,255,0.02)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
              <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#fff" }}>{s.value}</div>
              <p style={{ color: subText, fontSize: "0.75rem", textTransform: "uppercase", marginTop: "5px" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- MISSION & VISION --- */}
      <section style={{ maxWidth: "1300px", margin: "0 auto 100px", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          {[
            { title: "Our Mission", icon: <FaRocket />, text: "EaseWorkflow ka maqsad healthcare mein administrative friction ko khatam karna aur manual paperwork ko digital speed mein tabdeel karna hai.", color: accentColor },
            { title: "Our Vision", icon: <FaEye />, text: "Humara vision aik aisa ecosystem banana hai jahan technology aur insani care mil kar healthcare ko mazeed efficient banayein.", color: "#fff" }
          ].map((card, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} style={{ 
              padding: "60px 45px", borderRadius: "40px", 
              background: "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", 
              border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" 
            }}>
              <div style={{ fontSize: "2.5rem", color: accentColor, marginBottom: "20px" }}>{card.icon}</div>
              <h2 style={{ fontSize: "2.8rem", fontWeight: 900, color: card.color, marginBottom: "20px" }}>{card.title}</h2>
              <p style={{ color: subText, fontSize: "1.1rem", lineHeight: "1.8" }}>{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- OPERATIONAL LIFECYCLE --- */}
      <section style={{ textAlign: "center", marginBottom: "120px" }}>
        <h2 style={{ fontSize: "3.5rem", fontWeight: 900, marginBottom: "60px" }}>Our Lifecycle</h2>
        <div style={{ position: "relative", width: "450px", height: "450px", margin: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
           <div style={{ position: "absolute", width: "100%", height: "100%", border: "1px solid rgba(0,212,255,0.1)", borderRadius: "50%" }} />
           <div style={{ width: "260px", zIndex: 5 }}>
              <AnimatePresence mode="wait">
                <motion.div key={activeStep} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div style={{ fontSize: "3.5rem", marginBottom: "10px" }}>{processSteps[activeStep].icon}</div>
                  <h3 style={{ fontSize: "1.8rem", fontWeight: 900, color: accentColor }}>{processSteps[activeStep].title}</h3>
                  <p style={{ color: subText, fontSize: "0.9rem" }}>{processSteps[activeStep].desc}</p>
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
                  background: activeStep === i ? accentColor : "#151525", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  border: `2px solid ${activeStep === i ? "#fff" : "rgba(255,255,255,0.1)"}`, transition: "0.3s"
                }}>
                  <span>{step.icon}</span>
                </div>
              );
           })}
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section style={{ maxWidth: "1300px", margin: "0 auto 120px", padding: "0 20px" }}>
        <h2 style={{ fontSize: "3.5rem", fontWeight: 900, textAlign: "center", marginBottom: "60px" }}>Core Values</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "25px" }}>
          {coreValues.map((v, i) => (
            <motion.div key={i} whileHover={{ y: -10, borderColor: accentColor }} style={{ 
              padding: "40px", borderRadius: "32px", background: "rgba(255,255,255,0.02)", 
              border: "1px solid rgba(255,255,255,0.08)", transition: "0.3s ease", textAlign: "center" 
            }}>
              <div style={{ fontSize: "2.2rem", marginBottom: "20px" }}>{v.icon}</div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "12px" }}>{v.title}</h3>
              <p style={{ color: subText, lineHeight: "1.6", fontSize: "0.95rem" }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- LEADERSHIP TEAM --- */}
      <section style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 20px 100px" }}>
         <h2 style={{ fontSize: "3.5rem", fontWeight: 900, textAlign: "center", marginBottom: "80px" }}>Leadership Team</h2>
         <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
            {leaders.map((lead, i) => (
              <motion.div key={i} whileHover={{ y: -15 }} style={{ textAlign: "center" }}>
                <div style={{ width: "240px", height: "240px", margin: "0 auto 30px", borderRadius: "40px", overflow: "hidden", border: `1px solid rgba(0,212,255,0.2)`, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
                  <img src={lead.img} alt={lead.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <h3 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "5px" }}>{lead.name}</h3>
                <p style={{ color: accentColor, fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px" }}>{lead.role}</p>
                <p style={{ color: subText, fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "20px", padding: "0 10px" }}>{lead.bio}</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "20px", color: subText }}>
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

const processSteps = [
  { title: "Strategy", icon: "🎯", desc: "Analyzing workflows and goal mapping." },
  { title: "Design", icon: "🎨", desc: "User-centric clinical interface crafting." },
  { title: "Engineering", icon: "⚙️", desc: "Building secure, scalable AI engines." },
  { title: "Deployment", icon: "🚀", desc: "Seamless integration with zero downtime." },
  { title: "Evolve", icon: "🛠️", desc: "Continuous monitoring and optimization." },
];
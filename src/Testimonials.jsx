"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "./theme/ThemeProvider";

const testimonials = [
  { id: 1, name: "Dr. Sarah Williams", role: "Clinic Director, UK", image: "https://randomuser.me/api/portraits/women/1.jpg", shortText: "Reduced admin workload by 60%...", fullText: "The implementation of this AI system has been nothing short of revolutionary for our facility. We've seen a 60% reduction in administrative overhead, allowing our medical staff to redirect their focus entirely toward patient care.", rating: 5, time: "2m" },
  { id: 2, name: "Dr. Marco Rossi", role: "Healthcare Consultant, Germany", image: "https://randomuser.me/api/portraits/men/2.jpg", shortText: "Highly secure and efficient...", fullText: "Highly secure and efficient system. Perfectly aligned with GDPR standards. It processes complex diagnostic data while maintaining absolute patient anonymity. It's the most reliable AI tool we've used to date.", rating: 5, time: "15m" },
  { id: 3, name: "Dr. Elena Novak", role: "Hospital Manager, Netherlands", image: "https://randomuser.me/api/portraits/women/3.jpg", shortText: "Exactly what we needed...", fullText: "The team delivered exactly what we needed. Smooth integration and excellent support throughout. Highly recommended for complex hospital workflows. The ROI was evident within the first quarter.", rating: 4, time: "1h" },
];

const doubleTestimonials = [...testimonials, ...testimonials, ...testimonials];

export default function TestimonialChat() {
  const [activeTab, setActiveTab] = useState(testimonials[0]);
  const [isPaused, setIsPaused] = useState(false);
  const { theme } = useTheme();

  const isDark = theme === "dark";

  // Dynamic Theme Colors
  const colors = {
    sectionBg: isDark ? "#08081A" : "#f1f5f9",
    mainText: isDark ? "#FFF" : "#0f172a",
    subText: isDark ? "rgba(255,255,255,0.6)" : "rgba(15,23,42,0.7)",
    phoneFrame: isDark ? "#0D0D21" : "#ffffff",
    phoneBorder: isDark ? "#1E1E3F" : "#e2e8f0",
    messageBg: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
    activeMessageBg: "rgba(14,165,233,0.15)",
    cardBg: isDark 
      ? "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))" 
      : "linear-gradient(135deg, #ffffff, #f8fafc)",
    cardBorder: isDark ? "rgba(14,165,233,0.15)" : "rgba(14,165,233,0.2)",
    pillBg: isDark ? "rgba(255,255,255,0.02)" : "rgba(15,23,42,0.04)"
  };

  return (
    <section style={{
      padding: "100px 20px",
      background: colors.sectionBg,
      color: colors.mainText,
      fontFamily: "'Inter', sans-serif",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "background 0.5s ease"
    }}>
      
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: "15px" }}>Clinical Excellence Validated</h2>
        <p style={{ color: colors.subText, fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>
          Hear from the healthcare leaders who have transformed their operations using our advanced AI architecture.
        </p>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "380px 1fr", gap: "80px",
        maxWidth: "1350px", width: "100%", alignItems: "center"
      }}>
        
        {/* LEFT SIDE: PHONE FRAME */}
        <div 
          style={{
            background: colors.phoneFrame,
            borderRadius: "50px", padding: "12px",
            border: `12px solid ${colors.phoneBorder}`,
            height: "680px", position: "relative",
            overflow: "hidden",
            boxShadow: isDark ? "0 50px 100px rgba(0,0,0,0.7)" : "0 30px 60px rgba(0,0,0,0.08)"
          }}
        >
          <div style={{ 
            position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
            background: isDark ? "rgba(13, 13, 33, 0.95)" : "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            padding: "30px 25px 15px",
            borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`
          }}>
             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", opacity: 0.5, fontSize: "0.75rem", color: colors.mainText }}>
                <span>9:41</span>
                <div style={{ display: "flex", gap: "6px" }}>📶 🔋</div>
             </div>
             <h3 style={{ fontSize: "1.5rem", margin: 0, color: colors.mainText }}>Messages</h3>
          </div>

          <motion.div 
            animate={{ y: isPaused ? undefined : ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "110px", padding: "0 10px" }}
          >
            {doubleTestimonials.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => { setActiveTab(item); setIsPaused(true); }}
                style={{
                  display: "flex", gap: "15px", padding: "18px", borderRadius: "22px",
                  cursor: "pointer",
                  background: activeTab.id === item.id ? colors.activeMessageBg : colors.messageBg,
                  border: "1px solid",
                  borderColor: activeTab.id === item.id ? "rgba(14,165,233,0.4)" : "transparent",
                  transition: "all 0.3s ease"
                }}
              >
                <img src={item.image} alt="" style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }} />
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 700, fontSize: "1rem", color: colors.mainText }}>{item.name}</span>
                    <span style={{ fontSize: "0.7rem", opacity: 0.4, color: colors.mainText }}>{item.time}</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: colors.mainText, opacity: 0.5, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.shortText}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT SIDE: DETAILED VIEW */}
        <div style={{ minHeight: "600px", display: "flex", alignItems: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              whileHover={{ 
                borderColor: "rgba(14,165,233,0.3)",
                boxShadow: isDark ? "0 40px 100px rgba(14,165,233,0.15)" : "0 30px 80px rgba(0,0,0,0.05)"
              }}
              style={{
                width: "100%",
                background: colors.cardBg,
                padding: "60px",
                borderRadius: "40px",
                border: `1px solid ${colors.cardBorder}`,
                backdropFilter: "blur(20px)",
                position: "relative",
                boxShadow: isDark ? "0 30px 60px rgba(0,0,0,0.4)" : "0 20px 40px rgba(0,0,0,0.05)",
                overflow: "hidden",
                transition: "border 0.3s ease"
              }}
            >
              <div style={{
                position: "absolute", top: "30px", right: "30px",
                display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 20px",
                background: "rgba(14,165,233,0.1)",
                border: "1px solid rgba(14,165,233,0.3)",
                borderRadius: "50px",
                color: "#0ea5e9",
                fontSize: "1.1rem", fontWeight: 700
              }}>
                {"★".repeat(activeTab.rating)} 
                <span style={{color: colors.mainText, opacity: 0.6}}>
                  {activeTab.rating}.0 / 5
                </span>
              </div>

              <h3 style={{ fontSize: "2.8rem", fontWeight: 900, marginBottom: "50px", color: colors.mainText }}>
                {activeTab.name}
              </h3>
              
              <div style={{ position: "relative", marginBottom: "50px" }}>
                <span style={{ position: "absolute", top: "-50px", left: "-30px", fontSize: "7rem", opacity: 0.15, color: "#0ea5e9" }}>“</span>
                <p style={{ fontSize: "1.6rem", lineHeight: "1.8", color: isDark ? "#E2E8F0" : "#334155" }}>
                  {activeTab.fullText}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "15px", padding: "15px 25px",
                background: colors.pillBg,
                borderRadius: "50px", width: "fit-content",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`
              }}>
                <img src={activeTab.image} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "2px solid #0ea5e9" }} />
                <div>
                   <p style={{ fontWeight: 800, fontSize: "1.1rem", color: colors.mainText, margin: 0 }}>{activeTab.name}</p>
                   <p style={{ fontSize: "0.85rem", color: "#0ea5e9", fontWeight: 700, margin: 0 }}>{activeTab.role}</p>
                </div>
              </div>

              {/* Decorative Glow */}
              <motion.div 
                 initial={{ opacity: 0 }}
                 whileHover={{ opacity: 1 }}
                 style={{
                   position: "absolute", bottom: "-20%", right: "-10%",
                   width: "250px", height: "250px", background: "rgba(14,165,233,0.12)",
                   filter: "blur(60px)", borderRadius: "50%", zIndex: -1
                 }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
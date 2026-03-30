"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const testimonials = [
  { id: 1, name: "Dr. Sarah Williams", role: "Clinic Director, UK", image: "https://randomuser.me/api/portraits/women/1.jpg", shortText: "Reduced admin workload by 60%...", fullText: "The implementation of this AI system has been nothing short of revolutionary for our facility. We've seen a 60% reduction in administrative overhead, allowing our medical staff to redirect their focus entirely toward patient care. The predictive scheduling algorithms are incredibly accurate, and the support team's deep understanding of clinical workflows made the transition seamless and stress-free. It's a gold standard for modern healthcare.", rating: 5, time: "2m" },
  { id: 2, name: "Dr. Marco Rossi", role: "Healthcare Consultant, Germany", image: "https://randomuser.me/api/portraits/men/2.jpg", shortText: "Highly secure and efficient...", fullText: "Highly secure and efficient system. Perfectly aligned with GDPR standards. It processes complex diagnostic data while maintaining absolute patient anonymity. It's the most reliable AI tool we've used to date. The diagnostic precision has been a game-changer for our clinic.", rating: 5, time: "15m" },
  { id: 3, name: "Dr. Elena Novak", role: "Hospital Manager, Netherlands", image: "https://randomuser.me/api/portraits/women/3.jpg", shortText: "Exactly what we needed...", fullText: "The team delivered exactly what we needed. Smooth integration and excellent support throughout. Highly recommended for complex hospital workflows. Not only has it optimized our resource allocation, but the automated patient follow-up system has also significantly reduced readmission rates. The ROI was evident within the first quarter.", rating: 4, time: "1h" },
];

// Duplicate list for infinite scroll
const doubleTestimonials = [...testimonials, ...testimonials, ...testimonials];

export default function TestimonialChat() {
  const [activeTab, setActiveTab] = useState(testimonials[0]);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section style={{
      padding: "100px 20px",
      background: "#08081A",
      color: "#FFF",
      fontFamily: "'Inter', sans-serif",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: "15px" }}>Clinical Excellence Validated</h2>
        <p style={{ opacity: 0.6, fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>
          Hear from the healthcare leaders who have transformed their operations using our advanced AI architecture.
        </p>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "380px 1fr", gap: "80px",
        maxWidth: "1350px", width: "100%", alignItems: "center"
      }}>
        
        {/* LEFT SIDE: MOBILE SCREEN (Already optimized) */}
        <div 
          style={{
            background: "#0D0D21", borderRadius: "50px", padding: "12px",
            border: "12px solid #1E1E3F", height: "680px", position: "relative",
            overflow: "hidden", boxShadow: "0 50px 100px rgba(0,0,0,0.7)"
          }}
        >
          {/* FIXED APP BAR */}
          <div style={{ 
            position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
            background: "rgba(13, 13, 33, 0.95)", backdropFilter: "blur(10px)",
            padding: "30px 25px 15px", borderBottom: "1px solid rgba(255,255,255,0.1)"
          }}>
             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", opacity: 0.5, fontSize: "0.75rem" }}>
                <span>9:41</span>
                <div style={{ display: "flex", gap: "6px" }}>📶 🔋</div>
             </div>
             <h3 style={{ fontSize: "1.5rem", margin: 0 }}>Messages</h3>
          </div>

          <motion.div 
            animate={{ y: isPaused ? undefined : ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ 
              display: "flex", flexDirection: "column", gap: "10px", 
              marginTop: "110px", padding: "0 10px"
            }}
          >
            {doubleTestimonials.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => { setActiveTab(item); setIsPaused(true); }}
                style={{
                  display: "flex", gap: "15px", padding: "18px", borderRadius: "22px",
                  cursor: "pointer", background: activeTab.id === item.id ? "rgba(14,165,233,0.18)" : "rgba(255,255,255,0.03)",
                  border: "1px solid", borderColor: activeTab.id === item.id ? "rgba(14,165,233,0.4)" : "transparent",
                  transition: "all 0.3s ease"
                }}
              >
                <img src={item.image} alt="" style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }} />
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 700, fontSize: "1rem" }}>{item.name}</span>
                    <span style={{ fontSize: "0.7rem", opacity: 0.4 }}>{item.time}</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", opacity: 0.5, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.shortText}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT SIDE: ATTRACTIVE GLASS DETAIL CARD */}
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
                boxShadow: "0 40px 100px rgba(14,165,233,0.15)"
              }}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                padding: "60px",
                borderRadius: "40px",
                border: "1px solid rgba(14,165,233,0.15)",
                backdropFilter: "blur(20px)",
                position: "relative",
                boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
                overflow: "hidden",
                zIndex: 1
              }}
            >
              {/* Star Rating Corner UI */}
              <div style={{
                position: "absolute",
                top: "30px",
                right: "30px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 20px",
                background: "rgba(14,165,233,0.1)",
                border: "1px solid rgba(14,165,233,0.3)",
                borderRadius: "50px",
                color: "#0ea5e9",
                fontSize: "1.1rem",
                fontWeight: 700,
                boxShadow: "0 0 20px rgba(14,165,233,0.2)"
              }}>
                {"★".repeat(activeTab.rating)} <span style={{color: '#FFF', opacity: 0.6}}>{activeTab.rating}.0 / 5</span>
              </div>

              <h3 style={{ 
                fontSize: "2.8rem", 
                fontWeight: 900, 
                marginBottom: "50px", // More space before role
                lineHeight: "1.2",
                color: "#FFF",
              }}>
                {activeTab.name}
              </h3>
              
              <div style={{ position: "relative", marginBottom: "50px" }}>
                <span style={{ position: "absolute", top: "-50px", left: "-30px", fontSize: "7rem", opacity: 0.15, color: "#0ea5e9" }}>“</span>
                <p style={{ 
                  fontSize: "1.6rem", 
                  lineHeight: "1.8", 
                  color: "#E2E8F0", 
                  fontWeight: 300,
                  fontStyle: "normal",
                  position: "relative", zIndex: 2
                }}>
                  {activeTab.fullText}
                </p>
              </div>

              {/* Refined Author Signature */}
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "15px", 
                padding: "15px 25px", 
                background: "rgba(255,255,255,0.02)", 
                borderRadius: "50px", 
                width: "fit-content",
                border: "1px solid rgba(255,255,255,0.05)"
              }}>
                <img src={activeTab.image} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "2px solid #0ea5e9" }} />
                <div>
                   <p style={{ fontWeight: 800, fontSize: "1.1rem", color: "#FFF", margin: 0 }}>{activeTab.name}</p>
                   <p style={{ fontSize: "0.85rem", color: "#0ea5e9", fontWeight: 700, margin: 0 }}>{activeTab.role}</p>
                </div>
              </div>

              {/* Subtle Glowing Background effect on hover */}
              <motion.div 
                 initial={{ opacity: 0 }}
                 whileHover={{ opacity: 1 }}
                 style={{
                    position: "absolute", bottom: "-20%", right: "-10%",
                    width: "250px", height: "250px", background: "rgba(14,165,233,0.12)",
                    filter: "blur(60px)", borderRadius: "50%", zIndex: 0
                 }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
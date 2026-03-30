"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme/ThemeProvider";

// --- DATA: FAQ (8 Questions) ---
const faqs = [
  { id: "01", q: "Is your system compliant with European data regulations?", a: "Our architecture is built on 'Privacy-by-Design' engineering. We utilize end-to-end AES-256 encryption and strictly adhere to GDPR, HIPAA, and local EU health data sovereign laws. Every data packet is audited before it ever touches the cloud.", tag: "Compliance" },
  { id: "02", q: "Can your system integrate with our existing EMR?", a: "Seamlessly. We support HL7, FHIR, and custom RESTful API hooks. Whether you use Epic, Cerner, or a custom-built legacy system, our AI acts as an intelligent 'Bridge Layer'—syncing data in real-time.", tag: "Integration" },
  { id: "03", q: "How long does it take to develop a solution?", a: "We don't believe in long-drawn-out cycles. Using our pre-built AI modules, we can deploy a functional MVP (Minimum Viable Product) within 4-6 weeks. Full-scale clinical integration typically completes in 3 months.", tag: "Timeline" },
  { id: "04", q: "Do you provide ongoing support?", a: "Our partnership doesn't end at launch. We provide a 'Nervous System' support model—24/7 proactive monitoring where our AI flags potential infrastructure bottlenecks before they impact your medical staff.", tag: "Maintenance" },
  { id: "05", q: "What is the accuracy of your diagnostic AI?", a: "Our models achieve over 98% accuracy in specific clinical validations. We use multi-modal deep learning that cross-references imaging with patient history for high-fidelity verification.", tag: "Performance" },
  { id: "06", q: "Can the AI handle multi-language medical terms?", a: "Yes, our NLP engines are trained on medical datasets in 15+ languages, allowing them to understand complex clinical terminology and regional medical dialects accurately.", tag: "Technical" },
  { id: "07", q: "How do you handle model bias in healthcare?", a: "We implement 'Fairness-First' training protocols, using diverse global datasets to ensure our AI recommendations are equitable across different demographics and ethnicities.", tag: "Ethics" },
  { id: "08", q: "Is there a cloud-free 'On-Premise' option?", a: "For high-security facilities, we offer a dedicated 'Edge-Deployment' where the AI runs entirely on your local servers without requiring an external internet connection.", tag: "Infrastructure" }
];

export default function FAQSection() {
  const [selectedFaq, setSelectedFaq] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    bg: isDark ? "#02020A" : "#f8fafc",
    text: isDark ? "#FFF" : "#0f172a",
    subText: isDark ? "#94a3b8" : "#475569",
    faqItemBg: isDark ? "rgba(255,255,255,0.03)" : "rgba(15,23,42,0.03)",
    faqInactiveText: isDark ? "#334155" : "#cbd5e1",
    cardBg: isDark ? "rgba(10, 10, 30, 0.5)" : "#ffffff",
    cardBorder: isDark ? "rgba(14,165,233,0.15)" : "rgba(14,165,233,0.2)",
    watermark: isDark ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.04)"
  };

  const handleWhatsAppChat = () => {
    const phoneNumber = "923000335194"; 
    const message = "Hello! I am interested in your AI Healthcare solutions. Can we discuss?";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section style={{ 
      background: colors.bg, 
      color: colors.text, 
      fontFamily: "'Inter', sans-serif", 
      padding: "20px 20px 60px", // Top padding mazeed kam (20px) kar di hai
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      position: "relative",
      minHeight: "auto",
      transition: "background 0.5s ease"
    }}>
      
      {/* HEADER - Margins minimized */}
      <div style={{ textAlign: "left", width: "100%", maxWidth: "1200px", marginBottom: "30px", marginTop: "10px" }}>
        <p style={{ color: "#0ea5e9", fontWeight: 800, letterSpacing: "5px", textTransform: "uppercase", fontSize: "0.75rem", margin: 0 }}>Knowledge Base</p>
        <h2 style={{ fontSize: "3.2rem", fontWeight: 900, marginTop: "5px", marginBottom: 0 }}>The <span style={{ color: "#0ea5e9" }}>Intelligence</span> Hub</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "40px", maxWidth: "1200px", width: "100%", marginBottom: "40px" }}>
        
        {/* LEFT SIDE: FAQ LIST (Height limited for better scroll) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", maxHeight: "600px", overflowY: "auto", paddingRight: "10px" }}>
          {faqs.map((item, i) => (
            <div 
              key={i} 
              onMouseEnter={() => setSelectedFaq(i)} 
              style={{ 
                padding: "18px 25px", 
                borderRadius: "15px", 
                cursor: "pointer", 
                position: "relative", 
                background: selectedFaq === i ? colors.faqItemBg : "transparent", 
                transition: "0.2s" 
              }}
            >
              {selectedFaq === i && (
                <motion.div 
                  layoutId="faqBar" 
                  style={{ 
                    position: "absolute", left: "-5px", top: "20%", bottom: "20%", 
                    width: "3px", background: "#0ea5e9", borderRadius: "10px", 
                    boxShadow: "0 0 15px #0ea5e9" 
                  }} 
                />
              )}
              <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 900, color: selectedFaq === i ? "#0ea5e9" : colors.faqInactiveText }}>{item.id}</span>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: selectedFaq === i ? colors.text : colors.subText, margin: 0 }}>{item.q}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE: DYNAMIC ANSWER CARD */}
        <div style={{ position: "relative" }}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedFaq} 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.98 }} 
              style={{ 
                background: colors.cardBg, 
                padding: "40px", 
                borderRadius: "28px", 
                border: `1px solid ${colors.cardBorder}`, 
                position: "relative", 
                overflow: "hidden", 
                minHeight: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxShadow: isDark ? "0 25px 50px rgba(0,0,0,0.4)" : "0 15px 30px rgba(0,0,0,0.04)",
                backdropFilter: "blur(10px)"
              }}
            >
              <motion.div 
                animate={{ top: ["0%", "100%"] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
                style={{ position: "absolute", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #0ea5e9, transparent)", opacity: 0.2 }} 
              />
              
              <span style={{ color: "#0ea5e9", fontWeight: 800, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "2px" }}>{faqs[selectedFaq].tag}</span>
              <h3 style={{ fontSize: "1.9rem", fontWeight: 800, margin: "20px 0", lineHeight: "1.3", color: colors.text }}>{faqs[selectedFaq].q}</h3>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: colors.subText }}>{faqs[selectedFaq].a}</p>
              
              <span style={{ 
                fontSize: "8rem", fontWeight: 900, 
                position: "absolute", bottom: "-30px", right: "10px", 
                color: colors.watermark, pointerEvents: "none" 
              }}>
                {faqs[selectedFaq].id}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* FOOTER CTA */}
      <div style={{ width: "100%", maxWidth: "1200px", textAlign: "center", paddingTop: "30px", borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}` }}>
        <p style={{ fontSize: "1rem", color: colors.subText }}>
          Still have unanswered questions?{" "}
          <span 
            onClick={handleWhatsAppChat}
            style={{ 
              color: "#0ea5e9", 
              fontWeight: 700, 
              cursor: "pointer", 
              borderBottom: "1px solid rgba(14,165,233,0.4)", 
              transition: "0.3s" 
            }}
            onMouseOver={(e) => e.target.style.color = isDark ? "#FFF" : "#000"}
            onMouseOut={(e) => e.target.style.color = "#0ea5e9"}
          >
            Consult our AI experts →
          </span>
        </p>
      </div>
    </section>
  );
}
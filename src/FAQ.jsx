"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme/ThemeProvider";

// --- DATA: FAQ (SEO-Optimized Questions) ---
const faqs = [
  {
    id: "01",
    q: "Is your healthcare software GDPR compliant in Europe?",
    a: "Yes. EaseWorkflow is designed with full compliance for European healthcare regulations, including GDPR. We follow a strict Privacy-by-Design approach, use end-to-end AES-256 encryption, and apply role-based access control so only authorized staff can view patient data. Our infrastructure and policies are regularly reviewed to align with EU data protection, medical data sovereignty requirements, and other healthcare security standards.",
    tag: "Compliance",
  },
  {
    id: "02",
    q: "How secure is patient data in your AI healthcare automation platform?",
    a: "Patient data security is a core foundation of EaseWorkflow. All data in transit and at rest is encrypted using industry-standard protocols, and sensitive information is segmented in secure databases with limited access. We provide detailed audit logs, access tracking, and configurable permissions so clinic administrators can monitor exactly who accessed what data and when. Our goal is to help you meet and exceed hospital security guidelines without adding extra complexity to your daily workflows.",
    tag: "Compliance",
  },
  {
    id: "03",
    q: "Can EaseWorkflow integrate with my existing EMR or hospital software?",
    a: "Yes. EaseWorkflow is built to integrate with leading EMR and hospital information systems through standards like HL7 and FHIR, as well as secure REST APIs. Whether you are using Epic, Cerner, a regional EMR, or a custom system, our team works with your IT department to connect data flows for appointments, clinical notes, billing, and more. This lets you add AI-powered automation on top of your existing tools instead of replacing everything at once.",
    tag: "EMR Integration",
  },
  {
    id: "04",
    q: "Can I integrate this system with my existing clinic management software?",
    a: "In most cases, yes. If your current clinic management or practice management software exposes APIs, integration is straightforward. EaseWorkflow acts as a smart automation layer that reads and writes data—such as appointments, patient records, and status updates—so your staff can keep using familiar tools while benefiting from AI in the background. During onboarding, we assess your current stack and outline exactly how the integration will work.",
    tag: "Integration",
  },
  {
    id: "05",
    q: "How can I automate appointment scheduling in my clinic?",
    a: "EaseWorkflow includes an AI-powered appointment scheduling software module that automates bookings, reminders, and follow-ups. Patients can schedule visits online, while the system checks provider availability, visit type, and clinic rules in real time. Automated SMS or email reminders help reduce no-shows, and staff can view an optimized schedule that balances provider workload and patient flow. This makes your appointment scheduling process smarter and less dependent on manual phone calls and spreadsheets.",
    tag: "Appointment Scheduling",
  },
  {
    id: "06",
    q: "How does AI improve clinic management and patient workflows?",
    a: "AI in healthcare can significantly improve daily clinic management and patient workflows. EaseWorkflow analyzes patterns across appointments, waiting times, documentation, and resource usage to highlight bottlenecks and recommend improvements. Routine tasks—like sending reminders, updating EMR fields, routing forms, or flagging missing information—are automated so your team can focus on patient care. Over time, the system learns from your healthcare workflows to suggest better processes, helping you deliver a smoother, more predictable patient experience.",
    tag: "AI in Healthcare",
  },
  {
    id: "07",
    q: "Is EaseWorkflow suitable for small clinics as well as large hospitals?",
    a: "Yes. EaseWorkflow is designed to scale from small outpatient clinics to multi-site hospitals. Smaller practices typically start with healthcare automation features like appointment scheduling, patient intake, and basic EMR integration. Larger organizations often roll out additional modules for multi-department workflows, advanced analytics, and complex routing. Our pricing and deployment options are flexible, so you can start with what you need today and expand as your clinic or hospital grows.",
    tag: "Scalability",
  },
  {
    id: "08",
    q: "What is the best AI solution for healthcare workflow automation?",
    a: "The best AI solution for healthcare automation is one that fits your current systems and real-world clinical workflows. EaseWorkflow focuses specifically on automating everyday tasks such as scheduling, documentation, triage routing, and EMR updates, rather than being a generic AI tool. Our platform combines healthcare-specific AI models with deep EMR integration capabilities, so your team gets practical medical AI solutions that work in live clinical settings, not just in demos.",
    tag: "Healthcare Automation",
  },
  {
    id: "09",
    q: "How accurate is your medical AI for clinical decision support?",
    a: "Our medical AI models are trained and validated on healthcare datasets with strong clinical oversight. For specific use cases, they have achieved over 98% accuracy in internal tests and pilot programs. However, we position EaseWorkflow as a decision-support and workflow automation tool—not a replacement for medical professionals. Every recommendation is designed to support clinicians by surfacing the right information at the right time, keeping the final clinical decision in the hands of your medical staff.",
    tag: "Medical AI Solutions",
  },
  {
    id: "10",
    q: "Does your healthcare automation software support multiple languages?",
    a: "Yes. EaseWorkflow supports multi-language environments commonly found in international clinics and hospitals. Our natural language processing (NLP) components are trained on medical terminology across multiple languages, allowing the system to understand and process key clinical terms, patient notes, and templates. This is especially valuable for organizations that serve diverse populations or operate across regions with different primary languages.",
    tag: "Technical",
  },
  {
    id: "11",
    q: "How do you reduce bias in your AI healthcare workflows?",
    a: "We follow strict fairness and quality guidelines when developing AI in healthcare. Our models are trained on diverse datasets and regularly evaluated for potential bias across demographics such as age, gender, and ethnicity. We work with clinical partners to review outputs and tune models so recommendations remain equitable and clinically appropriate. In addition, we provide transparency around how AI suggestions are generated so clinicians can understand and trust the system.",
    tag: "Ethics",
  },
  {
    id: "12",
    q: "Can EaseWorkflow run on-premise without using the public cloud?",
    a: "Yes. For hospitals and clinics with strict data residency or security requirements, we offer an on-premise and private-cloud deployment option. In this model, the healthcare automation engine runs inside your own secure infrastructure or dedicated environment, so sensitive healthcare data never leaves your controlled network. Our team helps your IT staff plan the deployment, performance requirements, and ongoing updates while maintaining compliance with your internal policies.",
    tag: "Infrastructure",
  },
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
    <section
      className="faq-section"
      style={{
        background: colors.bg,
        color: colors.text,
        fontFamily: "'Inter', sans-serif",
        padding: "20px 20px 60px", // Top padding mazeed kam (20px) kar di hai
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        minHeight: "auto",
        transition: "background 0.5s ease",
      }}
    >
      
      {/* HEADER - Margins minimized */}
      <div
        className="faq-header"
        style={{
          textAlign: "left",
          width: "100%",
          maxWidth: "1200px",
          marginBottom: "30px",
          marginTop: "10px",
        }}
      >
        <p style={{ color: "#0ea5e9", fontWeight: 800, letterSpacing: "5px", textTransform: "uppercase", fontSize: "0.75rem", margin: 0 }}>Knowledge Base</p>
        <h2
          style={{
            fontSize: "clamp(2.2rem, 4.8vw, 3.2rem)",
            fontWeight: 900,
            marginTop: "5px",
            marginBottom: 0,
          }}
        >
          The <span style={{ color: "#0ea5e9" }}>Intelligence</span> Hub
        </h2>
      </div>

      <div
        className="faq-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: "40px",
          maxWidth: "1200px",
          width: "100%",
          marginBottom: "40px",
        }}
      >
        
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
              <h3
                style={{
                  fontSize: "clamp(1.4rem, 4vw, 1.9rem)",
                  fontWeight: 800,
                  margin: "20px 0",
                  lineHeight: "1.3",
                  color: colors.text,
                }}
              >
                {faqs[selectedFaq].q}
              </h3>
              <p
                style={{
                  fontSize: "clamp(0.98rem, 3.2vw, 1.1rem)",
                  lineHeight: "1.7",
                  color: colors.subText,
                }}
              >
                {faqs[selectedFaq].a}
              </p>
              
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
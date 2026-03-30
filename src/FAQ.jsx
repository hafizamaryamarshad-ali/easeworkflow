"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA: TESTIMONIALS ---
const testimonials = [
  { id: 1, name: "Dr. Sarah Williams", role: "Clinic Director, UK", image: "https://randomuser.me/api/portraits/women/1.jpg", shortText: "Revolutionary AI integration...", fullText: "The implementation of this AI system has been nothing short of revolutionary for our facility. We've seen a 60% reduction in administrative overhead, allowing our medical staff to redirect their focus entirely toward patient care. The predictive scheduling algorithms are incredibly accurate, and the support team's deep understanding of clinical workflows made the transition seamless.", rating: 5, time: "2m" },
  { id: 2, name: "Dr. Marco Rossi", role: "Consultant, Germany", image: "https://randomuser.me/api/portraits/men/2.jpg", shortText: "Unmatched security & GDPR...", fullText: "In the European healthcare sector, security isn't just a feature—it's a legal necessity. This platform is the first AI solution we've audited that perfectly aligns with GDPR and high-level encryption standards without sacrificing speed. Its ability to process complex diagnostic data while maintaining absolute patient anonymity is a feat of engineering.", rating: 5, time: "15m" },
  { id: 3, name: "Dr. Elena Novak", role: "Manager, Netherlands", image: "https://randomuser.me/api/portraits/women/3.jpg", shortText: "The future of hospital ROI...", fullText: "We were skeptical about AI integration in a hospital of our size, but the results speak for themselves. The ROI was evident within the first quarter. Not only has it optimized our resource allocation, but the automated patient follow-up system has also significantly reduced readmission rates. The interface is intuitive and highly customizable.", rating: 5, time: "1h" },
  { id: 4, name: "Prof. Jean Dupont", role: "Researcher, France", image: "https://randomuser.me/api/portraits/men/4.jpg", shortText: "Incredible diagnostic precision...", fullText: "As a researcher, I demand high-fidelity data and clinical validation. This AI system delivers both with remarkable precision. Its deep-learning models for image analysis have consistently outperformed our previous benchmarks, providing our radiologists with a secondary layer of verification that has already flagged numerous critical cases.", rating: 5, time: "3h" },
];

// --- DATA: FAQ ---
const faqs = [
  { id: "01", q: "Is your system compliant with European data regulations?", a: "Our architecture is built on 'Privacy-by-Design' engineering. We utilize end-to-end AES-256 encryption and strictly adhere to GDPR, HIPAA, and local EU health data sovereign laws. Every data packet is audited before it ever touches the cloud.", tag: "Compliance" },
  { id: "02", q: "Can your system integrate with our existing EMR?", a: "Seamlessly. We support HL7, FHIR, and custom RESTful API hooks. Whether you use Epic, Cerner, or a custom-built legacy system, our AI acts as an intelligent 'Bridge Layer'—syncing data in real-time without disrupting operations.", tag: "Integration" },
  { id: "03", q: "How long does it take to develop a solution?", a: "We don't believe in long-drawn-out cycles. Using our pre-built AI modules, we can deploy a functional MVP (Minimum Viable Product) within 4-6 weeks. Full-scale clinical integration typically completes in 3 months.", tag: "Timeline" },
  { id: "04", q: "Do you provide ongoing support?", a: "Our partnership doesn't end at launch. We provide a 'Nervous System' support model—24/7 proactive monitoring where our AI flags potential infrastructure bottlenecks before they impact your medical staff.", tag: "Maintenance" }
];

const doubleTestimonials = [...testimonials, ...testimonials, ...testimonials];

export default function CombinedPremiumSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0]);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(0);

  // WhatsApp Link Logic
  const handleWhatsAppChat = () => {
    const phoneNumber = "923000335194"; // <-- APNA NUMBER YAHAN LIKHEIN (Bina + ke)
    const message = "Hello! I am interested in your AI Healthcare solutions. Can we discuss?";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div style={{ background: "#02020A", color: "#FFF", fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>
      
      {/* --- SECTION 1: MOBILE TESTIMONIALS --- */}
      <section style={{ padding: "100px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "10px" }}>Client Conversations</h2>
          <p style={{ opacity: 0.5, fontSize: "1.1rem" }}>Hover to pause and explore success stories</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "400px 1fr", gap: "60px", maxWidth: "1300px", width: "100%", alignItems: "center" }}>
          
          {/* MOBILE PHONE UI */}
          <div style={{ background: "#0D0D21", borderRadius: "50px", border: "12px solid #1E1E3F", height: "680px", position: "relative", overflow: "hidden", boxShadow: "0 50px 100px rgba(0,0,0,0.7)" }}>
            {/* FIXED APP BAR */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, background: "rgba(13, 13, 33, 0.95)", backdropFilter: "blur(10px)", padding: "30px 25px 15px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
               <h3 style={{ fontSize: "1.5rem", margin: 0, fontWeight: 800 }}>Messages</h3>
            </div>

            {/* SCROLLING LIST */}
            <motion.div 
              animate={{ y: isPaused ? undefined : ["0%", "-50%"] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "110px", padding: "0 15px" }}
            >
              {doubleTestimonials.map((item, index) => (
                <div key={index} onMouseEnter={() => { setActiveTestimonial(item); setIsPaused(true); }} style={{ display: "flex", gap: "15px", padding: "18px", borderRadius: "22px", cursor: "pointer", background: activeTestimonial.id === item.id ? "rgba(14,165,233,0.18)" : "rgba(255,255,255,0.03)", border: "1px solid", borderColor: activeTestimonial.id === item.id ? "rgba(14,165,233,0.4)" : "transparent", transition: "0.3s" }}>
                  <img src={item.image} alt="" style={{ width: "48px", height: "48px", borderRadius: "50%", border: "2px solid #0ea5e9" }} />
                  <div style={{ flex: 1, overflow: "hidden" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontWeight: 700 }}>{item.name}</span><span style={{ fontSize: "0.7rem", opacity: 0.4 }}>{item.time}</span></div>
                    <p style={{ fontSize: "0.8rem", opacity: 0.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.shortText}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT SIDE: PREMIUM DETAIL CARD */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))", padding: "60px", borderRadius: "45px", border: "1px solid rgba(14,165,233,0.2)", backdropFilter: "blur(30px)", position: "relative" }}>
               <div style={{ color: "#0ea5e9", fontSize: "1.3rem", marginBottom: "30px" }}>{"★".repeat(activeTestimonial.rating)}</div>
               <h3 style={{ fontSize: "2.8rem", fontWeight: 900, marginBottom: "10px" }}>{activeTestimonial.name}</h3>
               <p style={{ color: "#0ea5e9", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "40px" }}>{activeTestimonial.role}</p>
               <p style={{ fontSize: "1.5rem", lineHeight: "1.7", color: "#cbd5e1", fontStyle: "italic" }}>“{activeTestimonial.fullText}”</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* --- SECTION 2: ARCHITECTURAL FAQ --- */}
      <section style={{ padding: "120px 20px", display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
        <div style={{ textAlign: "left", width: "100%", maxWidth: "1200px", marginBottom: "60px" }}>
          <p style={{ color: "#0ea5e9", fontWeight: 800, letterSpacing: "5px", textTransform: "uppercase", fontSize: "0.75rem" }}>Knowledge Base</p>
          <h2 style={{ fontSize: "3.5rem", fontWeight: 900, marginTop: "10px" }}>The <span style={{ color: "#0ea5e9" }}>Intelligence</span> Hub</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "50px", maxWidth: "1200px", width: "100%", marginBottom: "60px" }}>
          {/* FAQ LIST */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {faqs.map((item, i) => (
              <div key={i} onMouseEnter={() => setSelectedFaq(i)} style={{ padding: "24px 30px", borderRadius: "20px", cursor: "pointer", position: "relative", background: selectedFaq === i ? "rgba(255,255,255,0.03)" : "transparent", transition: "0.3s" }}>
                {selectedFaq === i && <motion.div layoutId="faqBar" style={{ position: "absolute", left: "-10px", top: "25%", bottom: "25%", width: "4px", background: "#0ea5e9", borderRadius: "10px", boxShadow: "0 0 20px #0ea5e9" }} />}
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 900, color: selectedFaq === i ? "#0ea5e9" : "#222" }}>{item.id}</span>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: selectedFaq === i ? "#FFF" : "#555" }}>{item.q}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* DYNAMIC ANSWER CARD */}
          <AnimatePresence mode="wait">
            <motion.div key={selectedFaq} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} style={{ background: "rgba(10, 10, 30, 0.5)", padding: "50px", borderRadius: "32px", border: "1px solid rgba(14,165,233,0.15)", position: "relative", overflow: "hidden", height: "fit-content", boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}>
              {/* Scanline Animation */}
              <motion.div animate={{ top: ["0%", "100%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} style={{ position: "absolute", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #0ea5e9, transparent)", opacity: 0.2 }} />
              
              <span style={{ color: "#0ea5e9", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px" }}>{faqs[selectedFaq].tag}</span>
              <h3 style={{ fontSize: "2rem", fontWeight: 800, margin: "25px 0", lineHeight: "1.3" }}>{faqs[selectedFaq].q}</h3>
              <p style={{ fontSize: "1.15rem", lineHeight: "1.8", color: "#94a3b8" }}>{faqs[selectedFaq].a}</p>
              
              {/* Background ID Watermark */}
              <span style={{ fontSize: "10rem", fontWeight: 900, position: "absolute", bottom: "-40px", right: "20px", color: "#FFF", opacity: 0.04, pointerEvents: "none" }}>{faqs[selectedFaq].id}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- FOOTER CTA SECTION --- */}
        <div style={{ width: "100%", maxWidth: "1200px", textAlign: "center", paddingTop: "50px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ fontSize: "1.15rem", color: "#64748b" }}>
            Still have unanswered questions?{" "}
            <span 
              onClick={handleWhatsAppChat}
              style={{ color: "#0ea5e9", fontWeight: 700, cursor: "pointer", borderBottom: "1px solid rgba(14,165,233,0.4)", transition: "0.3s" }}
              onMouseOver={(e) => e.target.style.color = "#FFF"}
              onMouseOut={(e) => e.target.style.color = "#0ea5e9"}
            >
              Consult our AI experts →
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
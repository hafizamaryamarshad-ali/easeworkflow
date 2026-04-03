"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "./theme/ThemeProvider";

const chats = [
  {
    id: 1,
    name: "Dr. Sarah Williams",
    role: "Clinic Director, UK",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    preview: "We reduced admin workload by nearly 60% in 3 months.",
    fullMessage:
      "We reduced admin workload by nearly 60% in 3 months. Before EaseWorkflow, our nurses were buried in repetitive data entry; now those tasks are automated, our documentation is more consistent, and our team can stay focused on patients.",
    rating: 5,
  },
  {
    id: 2,
    name: "Dr. Marco Rossi",
    role: "Healthcare Consultant, Germany",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    preview: "Security and compliance checks have finally stopped slowing us down.",
    fullMessage:
      "Security and compliance checks have finally stopped slowing us down. The platform bakes GDPR and audit requirements into every workflow, so our teams can move faster without cutting corners or worrying about data exposure.",
    rating: 5,
  },
  {
    id: 3,
    name: "Dr. Elena Novak",
    role: "Hospital Manager, Netherlands",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    preview: "We finally have end‑to‑end visibility on our clinical operations.",
    fullMessage:
      "We finally have end‑to‑end visibility on our clinical operations. From triage to discharge, every step is tracked and surfaced in real time, which has made weekly governance meetings shorter, sharper, and far more data‑driven.",
    rating: 4,
  },
  {
    id: 4,
    name: "Dr. James Patel",
    role: "Medical Director, US",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    preview: "Nurses report that the new workflow feels natural, not technical.",
    fullMessage:
      "Nurses report that the new workflow feels natural, not technical. The interface mirrors how they already think about patient journeys, so adoption was almost immediate and we avoided the usual training fatigue.",
    rating: 5,
  },
  {
    id: 5,
    name: "Dr. Amina Yusuf",
    role: "Head of Outpatient Services, UAE",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    preview: "Missed follow‑ups dropped dramatically within the first quarter.",
    fullMessage:
      "Missed follow‑ups dropped dramatically within the first quarter. Automated reminders, escalations, and clear task ownership mean no patient is left waiting for a callback or test result without someone accountable.",
    rating: 5,
  },
  {
    id: 6,
    name: "Dr. Lucas Meyer",
    role: "Chief Information Officer, Germany",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
    preview: "Integration with our legacy EMR was smoother than expected.",
    fullMessage:
      "Integration with our legacy EMR was smoother than expected. The engineering team mapped complex data structures without disrupting our clinicians, and we were able to roll out the new automation layer in controlled phases.",
    rating: 4,
  },
  {
    id: 7,
    name: "Dr. Isabella Conti",
    role: "Practice Owner, Italy",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    preview: "Our front desk now runs on three clicks instead of three forms.",
    fullMessage:
      "Our front desk now runs on three clicks instead of three forms. Check‑ins, insurance verification, and follow‑up scheduling are all orchestrated behind the scenes, which patients notice as shorter waiting times and fewer errors.",
    rating: 5,
  },
  {
    id: 8,
    name: "Dr. Henrik Olsen",
    role: "Operations Lead, Norway",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    preview: "We finally trust our operational data enough to act on it.",
    fullMessage:
      "We finally trust our operational data enough to act on it. Dashboards are no longer just reports; they trigger clear actions and ownership, making our improvement cycles much faster and more measurable.",
    rating: 4,
  },
  {
    id: 9,
    name: "Dr. Sofia Martins",
    role: "Clinical Lead, Portugal",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    preview: "Staff onboarding times for new clinics have been cut in half.",
    fullMessage:
      "Staff onboarding times for new clinics have been cut in half. Templates, playbooks, and guard‑rails are already in the system, so new teams can go live safely without weeks of back‑and‑forth with IT.",
    rating: 5,
  },
  {
    id: 10,
    name: "Dr. Oliver Grant",
    role: "Chief Medical Officer, US",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    preview: "Our clinicians see the AI as a teammate, not a black box.",
    fullMessage:
      "Our clinicians see the AI as a teammate, not a black box. Explanations are clear, overrides are easy, and every recommendation is logged, which has built a lot of confidence with both doctors and compliance.",
    rating: 5,
  },
  {
    id: 11,
    name: "Dr. Emma Laurent",
    role: "Quality Lead, France",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    preview: "Audit preparation has gone from stressful to almost trivial.",
    fullMessage:
      "Audit preparation has gone from stressful to almost trivial. Documentation, trails, and approvals are centralised and searchable, so we no longer scramble for evidence in the days before an inspection.",
    rating: 4,
  },
  {
    id: 12,
    name: "Dr. Noah Fischer",
    role: "Digital Health Lead, Switzerland",
    image: "https://randomuser.me/api/portraits/men/39.jpg",
    preview: "The platform gives us a safe way to experiment with automation.",
    fullMessage:
      "The platform gives us a safe way to experiment with automation. We can pilot new flows with a subset of clinics, observe the impact, and then promote the best patterns across the network with confidence.",
    rating: 5,
  },
];

const doubleChats = [...chats, ...chats, ...chats];

export default function TestimonialChat() {
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobilePaused, setIsMobilePaused] = useState(false);
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

  // Detect mobile viewport so auto-rotation only runs on small screens
  useEffect(() => {
    const checkIsMobile = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Auto-rotate detailed review on mobile only
  useEffect(() => {
    if (!isMobile || isMobilePaused) return;

    const interval = setInterval(() => {
      setActiveChat((prev) => {
        const currentIndex = chats.findIndex((c) => c.id === prev.id);
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % chats.length;
        return chats[nextIndex];
      });
    }, 4000); // 4 seconds between reviews

    return () => clearInterval(interval);
  }, [isMobile, isMobilePaused]);

  return (
    <section
      className="testimonials-section"
      style={{
        padding: "100px 20px",
        background: colors.sectionBg,
        color: colors.mainText,
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "background 0.5s ease",
      }}
    >
      
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2
          style={{
            fontSize: "clamp(2.1rem, 4.2vw, 2.8rem)",
            fontWeight: 800,
            marginBottom: "15px",
          }}
        >
          Clinical Excellence Validated
        </h2>
        <p
          style={{
            color: colors.subText,
            fontSize: "clamp(1rem, 2.6vw, 1.2rem)",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Hear from the healthcare leaders who have transformed their operations using our advanced AI architecture.
        </p>
      </div>

      <div
        className="testimonials-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "380px 1fr",
          gap: "80px",
          maxWidth: "1350px",
          width: "100%",
          alignItems: "center",
        }}
      >
        
        {/* LEFT SIDE: PHONE FRAME */}
        <div
          className="testimonials-phone"
          style={{
            background: colors.phoneFrame,
            borderRadius: "50px",
            padding: "12px",
            border: `12px solid ${colors.phoneBorder}`,
            height: "680px",
            position: "relative",
            overflow: "hidden",
            boxShadow: isDark
              ? "0 50px 100px rgba(0,0,0,0.7)"
              : "0 30px 60px rgba(0,0,0,0.08)",
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
             <h3 style={{ fontSize: "1.5rem", margin: 0, color: colors.mainText }}>Feedbacks</h3>
          </div>

          <motion.div 
            animate={{ y: isPaused ? undefined : ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "110px", padding: "0 10px" }}
          >
            {doubleChats.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => { setActiveChat(item); setIsPaused(true); }}
                onClick={() => { setActiveChat(item); setIsPaused(true); }}
                className={`review-card${activeChat.id === item.id ? " active" : ""}`}
                style={{
                  display: "flex", gap: "15px", padding: "18px", borderRadius: "22px",
                  cursor: "pointer",
                  background: activeChat.id === item.id ? colors.activeMessageBg : colors.messageBg,
                  border: "1px solid",
                  borderColor: activeChat.id === item.id ? "rgba(14,165,233,0.4)" : "transparent",
                  transition: "all 0.3s ease"
                }}
              >
                <img src={item.image} alt="" style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }} />
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 700, fontSize: "1rem", color: colors.mainText }}>{item.name}</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: colors.mainText, opacity: 0.5, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.preview}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT SIDE: DETAILED VIEW */}
        <div
          className="testimonials-detail-wrapper"
          style={{ minHeight: "600px", display: "flex", alignItems: "center" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChat.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              whileHover={{ 
                borderColor: "rgba(14,165,233,0.3)",
                boxShadow: isDark ? "0 40px 100px rgba(14,165,233,0.15)" : "0 30px 80px rgba(0,0,0,0.05)"
              }}
              onTouchStart={() => { if (isMobile) setIsMobilePaused(true); }}
              onTouchEnd={() => { if (isMobile) setIsMobilePaused(false); }}
              className="review-card-detail"
              style={{
                width: "100%",
                background: colors.cardBg,
                padding: "40px 36px",
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
                {"★".repeat(activeChat.rating)} 
                <span style={{color: colors.mainText, opacity: 0.6}}>
                  {activeChat.rating}.0 / 5
                </span>
              </div>

              <h3
                style={{
                  fontSize: "clamp(2.1rem, 4.5vw, 2.8rem)",
                  fontWeight: 900,
                  marginBottom: "40px",
                  color: colors.mainText,
                }}
              >
                {activeChat.name}
              </h3>
              
              <div style={{ position: "relative", marginBottom: "50px" }}>
                <span style={{ position: "absolute", top: "-50px", left: "-30px", fontSize: "7rem", opacity: 0.15, color: "#0ea5e9" }}>“</span>
                <p
                  style={{
                    fontSize: "clamp(1.2rem, 3.2vw, 1.6rem)",
                    lineHeight: "1.8",
                    color: isDark ? "#E2E8F0" : "#334155",
                  }}
                >
                  {activeChat.fullMessage}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "15px", padding: "15px 25px",
                background: colors.pillBg,
                borderRadius: "50px", width: "fit-content",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`
              }}>
                 <img src={activeChat.image} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "2px solid #0ea5e9" }} />
                <div>
                   <p style={{ fontWeight: 800, fontSize: "1.1rem", color: colors.mainText, margin: 0 }}>{activeChat.name}</p>
                   <p style={{ fontSize: "0.85rem", color: "#0ea5e9", fontWeight: 700, margin: 0 }}>{activeChat.role}</p>
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
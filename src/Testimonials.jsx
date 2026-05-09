"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "./theme/ThemeProvider";

const reviewMetrics = [
  { value: "45%", label: "conversion uplift" },
  { value: "72%", label: "performance boost" },
  { value: "3.2s", label: "faster TTI" },
  { value: "38%", label: "engagement lift" },
  { value: "28%", label: "bounce reduction" },
  { value: "60%", label: "dev time saved" },
  { value: "4x", label: "scalability gain" },
  { value: "95%", label: "accessibility score" },
  { value: "2w", label: "faster launch" },
  { value: "30%", label: "support load down" },
  { value: "18%", label: "seo uplift" },
  { value: "3", label: "smooth integrations" },
];

const chats = [
  {
    id: 1,
    name: "Maya Thompson",
    role: "Product Lead, Fintech SaaS",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    preview: "The dashboard is fast, intuitive, and our customer KPIs rose.",
    fullMessage:
      "The new dashboard reduced steps across key workflows and made data actionable at a glance. Responsive charts and smart filters cut decision time for our ops team, and customers regularly comment on how effortless the UI feels.",
    rating: 5,
  },
  {
    id: 2,
    name: "Liam Carter",
    role: "Head of Design, Marketplace Startup",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    preview: "Their UI polish and animations made the product feel premium.",
    fullMessage:
      "We hired the team to overhaul our frontend; the result is a clean, consistent design system with micro‑interactions that guide users. Page loads and perceived performance improved, and our NPS went up after the launch.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    role: "Marketing Director, Boutique Agency",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
    preview: "The new site increased conversion rates on our lead forms.",
    fullMessage:
      "Their branding refresh felt modern and confident—clear CTAs, faster pages, and an updated content structure that boosted organic traffic. We saw a measurable uplift in form submissions within weeks.",
    rating: 5,
  },
  {
    id: 4,
    name: "Daniel Kim",
    role: "CTO, Healthtech Platform",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    preview: "APIs and integrations were seamless — rollout was painless.",
    fullMessage:
      "They handled complex integrations with our legacy systems without downtime. Clear API contracts and automated tests meant we could iterate quickly and keep our SLAs intact during migration.",
    rating: 5,
  },
  {
    id: 5,
    name: "Priya Nair",
    role: "Founder, E‑commerce Brand",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    preview: "The shop feels premium, mobile‑first and it converts better.",
    fullMessage:
      "We had a tight window for a seasonal relaunch. The team delivered a responsive, accessible storefront with faster checkouts and clearer product pages — conversion and average order value both improved.",
    rating: 5,
  },
  {
    id: 6,
    name: "Oliver Grant",
    role: "Operations Manager, Logistics",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    preview: "Internal tools became reliable and noticeably faster for users.",
    fullMessage:
      "Our operations team went from clunky spreadsheets to a streamlined web app. Search, filters, and realtime updates reduced manual handoffs and increased throughput across the team.",
    rating: 4,
  },
  {
    id: 7,
    name: "Sofia Leone",
    role: "Brand Manager, B2B Services",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
    preview: "The visual identity is bold, modern, and on‑brand.",
    fullMessage:
      "They brought cohesion to our visual language and provided assets that make marketing campaigns effortless. The website now reflects our positioning and has helped close conversations with enterprise prospects.",
    rating: 5,
  },
  {
    id: 8,
    name: "Eero Laine",
    role: "Product Ops, Analytics Firm",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    preview: "The reporting tools are precise and scale with our data.",
    fullMessage:
      "We needed dashboards that could handle lots of data without slowing down. Their optimisations and pragmatic UI choices gave us fast, filterable reports that our analysts actually use daily.",
    rating: 5,
  },
  {
    id: 9,
    name: "Hannah Schultz",
    role: "CEO, Professional Services",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    preview: "Site refresh gave a more professional look and better leads.",
    fullMessage:
      "The redesign felt strategic, not just cosmetic. Better information hierarchy and clearer contact flows increased qualified enquiries and made follow‑ups far easier for our sales team.",
    rating: 5,
  },
  {
    id: 10,
    name: "Marcus Nguyen",
    role: "Lead Engineer, Enterprise App",
    image: "https://randomuser.me/api/portraits/men/27.jpg",
    preview: "Performance tuning cut load times and reduced support tickets.",
    fullMessage:
      "They identified hotspots, lazy‑loaded heavy assets, and improved caching. The result was a measurable drop in error rates and a smoother user experience for power users.",
    rating: 4,
  },
  {
    id: 11,
    name: "Lucie Moreau",
    role: "Content Lead, Publishing",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    preview: "CMS-driven pages are now faster to update and look great.",
    fullMessage:
      "Moving to a structured CMS workflow gave our editors confidence. Templates, previewing, and image handling are much improved — publishing quality is consistent and faster.",
    rating: 5,
  },
  {
    id: 12,
    name: "Kenji Sato",
    role: "Founder, SaaS Tooling",
    image: "https://randomuser.me/api/portraits/men/39.jpg",
    preview: "Cross‑platform experience feels cohesive and reliable.",
    fullMessage:
      "From desktop dashboards to mobile, the UX is coherent and dependable. The small usability wins — like persistent state and thoughtful defaults — add up to a much better product experience.",
    rating: 5,
  },
];

const chatsWithMetrics = chats.map((chat, index) => ({
  ...chat,
  metric: reviewMetrics[index] ?? reviewMetrics[0],
}));

const doubleChats = [...chatsWithMetrics, ...chatsWithMetrics, ...chatsWithMetrics];

export default function TestimonialChat() {
  const [activeChat, setActiveChat] = useState(chatsWithMetrics[0]);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobilePaused, setIsMobilePaused] = useState(false);
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const isSmallScreen = isMobile;

  // Dynamic Theme Colors
  const colors = {
    sectionBg: isDark ? "#08081A" : "#f1f5f9",
    mainText: isDark ? "#FFF" : "#0f172a",
    subText: isDark ? "rgba(255,255,255,0.6)" : "rgba(15,23,42,0.7)",
    phoneFrame: isDark ? "#0D0D21" : "#f9fafb",
    phoneBorder: isDark ? "#1E1E3F" : "#e2e8f0",
    messageBg: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
    activeMessageBg: "rgba(14,165,233,0.15)",
    cardBg: isDark 
      ? "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))" 
      : "linear-gradient(135deg, #f9fafb, #f8fafc)",
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
        const currentIndex = chatsWithMetrics.findIndex((c) => c.id === prev.id);
        const nextIndex =
          currentIndex === -1 ? 0 : (currentIndex + 1) % chatsWithMetrics.length;
        return chatsWithMetrics[nextIndex];
      });
    }, 4000); // 4 seconds between reviews

    return () => clearInterval(interval);
  }, [isMobile, isMobilePaused]);

  return (
    <section
      className="testimonials-section"
      style={{
        // Tighter top padding so it connects more closely to Privacy section
        padding: "52px 20px 72px",
        background: colors.sectionBg,
        color: colors.mainText,
        fontFamily: "'Inter', sans-serif",
        // Let content define height so we don't force large empty space
        minHeight: "auto",
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
                padding: isSmallScreen ? "22px 16px 20px" : "40px 36px",
                borderRadius: isSmallScreen ? "28px" : "40px",
                border: `1px solid ${colors.cardBorder}`,
                backdropFilter: "blur(20px)",
                position: "relative",
                boxShadow: isDark ? "0 30px 60px rgba(0,0,0,0.4)" : "0 20px 40px rgba(0,0,0,0.05)",
                overflow: "hidden",
                transition: "border 0.3s ease",
                minHeight: isSmallScreen ? "auto" : undefined,
              }}
            >
              <div style={{
                position: isSmallScreen ? "relative" : "absolute",
                top: isSmallScreen ? "auto" : "30px",
                right: isSmallScreen ? "auto" : "30px",
                display: "flex",
                flexDirection: "column",
                gap: isSmallScreen ? "8px" : "10px",
                padding: isSmallScreen ? "14px 16px" : "16px 22px",
                width: isSmallScreen ? "100%" : "auto",
                minWidth: isSmallScreen ? 0 : "240px",
                maxWidth: isSmallScreen ? "100%" : "none",
                marginBottom: isSmallScreen ? "18px" : 0,
                background: isDark
                  ? "linear-gradient(180deg, rgba(12, 18, 41, 0.92), rgba(8, 12, 28, 0.86))"
                  : "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(241,245,249,0.88))",
                border: `1px solid ${isDark ? "rgba(148, 163, 184, 0.18)" : "rgba(148, 163, 184, 0.28)"}`,
                borderRadius: isSmallScreen ? "24px" : "999px",
                color: "#0ea5e9",
                fontSize: isSmallScreen ? "0.95rem" : "1.05rem",
                fontWeight: 700,
                boxShadow: isDark
                  ? "0 16px 40px rgba(2, 8, 23, 0.45), inset 0 1px 0 rgba(255,255,255,0.06)"
                  : "0 14px 32px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
                backdropFilter: "blur(18px)",
                overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: isDark
                    ? "radial-gradient(circle at top left, rgba(14,165,233,0.14), transparent 42%)"
                    : "radial-gradient(circle at top left, rgba(14,165,233,0.12), transparent 44%)",
                  pointerEvents: "none",
                }} />
                <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
                  <div
                    style={{
                      display: isSmallScreen ? "grid" : "flex",
                      gridTemplateColumns: isSmallScreen ? "auto 1fr" : undefined,
                      alignItems: isSmallScreen ? "start" : "center",
                      justifyContent: isSmallScreen ? "start" : "space-between",
                      width: "100%",
                      gap: isSmallScreen ? "6px 12px" : "14px",
                    }}
                  >
                    <span style={{ letterSpacing: "-0.03em", fontSize: isSmallScreen ? "1rem" : "1.1rem", lineHeight: 1.1 }}>
                      {activeChat.metric.value}
                    </span>
                    <span style={{ color: colors.mainText, opacity: 0.72, fontSize: isSmallScreen ? "0.7rem" : "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", lineHeight: 1.2 }}>
                      {activeChat.metric.label}
                    </span>
                  </div>
                </div>
              </div>

              <h3
                style={{
                  fontSize: isSmallScreen ? "clamp(1.6rem, 7vw, 2.2rem)" : "clamp(2.1rem, 4.5vw, 2.8rem)",
                  fontWeight: 900,
                  marginBottom: isSmallScreen ? "24px" : "40px",
                  color: colors.mainText,
                }}
              >
                {activeChat.name}
              </h3>
              
              <div style={{ position: "relative", marginBottom: isSmallScreen ? "30px" : "50px" }}>
                <span style={{ position: "absolute", top: isSmallScreen ? "-28px" : "-50px", left: isSmallScreen ? "-8px" : "-30px", fontSize: isSmallScreen ? "4.5rem" : "7rem", opacity: 0.15, color: "#0ea5e9" }}>“</span>
                <p
                  style={{
                    fontSize: isSmallScreen ? "1rem" : "clamp(1.2rem, 3.2vw, 1.6rem)",
                    lineHeight: "1.8",
                    color: isDark ? "#E2E8F0" : "#334155",
                  }}
                >
                  {activeChat.fullMessage}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "15px", padding: isSmallScreen ? "12px 16px" : "15px 25px",
                background: colors.pillBg,
                borderRadius: "50px", width: isSmallScreen ? "100%" : "fit-content",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`
              }}>
                 <img src={activeChat.image} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "2px solid #0ea5e9" }} />
                <div>
                   <p style={{ fontWeight: 800, fontSize: isSmallScreen ? "1rem" : "1.1rem", color: colors.mainText, margin: 0 }}>{activeChat.name}</p>
                   <p style={{ fontSize: isSmallScreen ? "0.78rem" : "0.85rem", color: "#0ea5e9", fontWeight: 700, margin: 0 }}>{activeChat.role}</p>
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
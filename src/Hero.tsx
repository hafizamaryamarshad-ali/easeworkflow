"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserMd,
  FaHeart,
  FaStar,
  FaPhoneAlt,
  FaVideo,
  FaCommentDots,
  FaShieldAlt,
  FaCloud,
  FaCalendarAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useTheme } from "./theme/ThemeProvider";
import Chatbot from "./Chatbot";

function ComplianceModal({ onClose }: { onClose: () => void }) {
  const { theme } = useTheme();

  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(10);

  function closeCompliance() {
    try {
      if (dontShowAgain && typeof window !== "undefined") {
        window.localStorage.setItem("hideComplianceModal", "true");
      }
    } catch {
      // If localStorage is unavailable, silently ignore.
    }

    onClose();
  }

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timeout = setTimeout(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          closeCompliance();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [secondsLeft, closeCompliance]);

  const cardBackground =
    theme === "dark"
      ? "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(8,47,73,0.96))"
      : "linear-gradient(135deg,#ffffff,#eef2ff)";
  const cardBorder =
    theme === "dark"
      ? "1px solid rgba(148,163,184,0.55)"
      : "1px solid rgba(148,163,184,0.3)";
  const cardShadow =
    theme === "dark"
      ? "0 24px 60px rgba(15,23,42,0.9)"
      : "0 22px 45px rgba(15,23,42,0.16)";
  const headingColor = theme === "dark" ? "#e5e7eb" : "#0f172a";
  const bodyColor = theme === "dark" ? "#cbd5e1" : "#475569";
  const timerBg =
    theme === "dark" ? "rgba(15,23,42,0.85)" : "rgba(239,246,255,0.95)";
  const timerBorder =
    theme === "dark" ? "1px solid rgba(56,189,248,0.6)" : "1px solid rgba(59,130,246,0.55)";
  const timerText = theme === "dark" ? "#e0f2fe" : "#1d4ed8";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        position: "fixed",
        inset: 0,
        background: theme === "dark" ? "rgba(15,23,42,0.75)" : "rgba(15,23,42,0.4)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          position: "relative",
          width: "min(480px, 92vw)",
          borderRadius: 24,
          padding: "20px 22px 18px",
          background: cardBackground,
          border: cardBorder,
          boxShadow: cardShadow,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            gap: 12,
          }}
        >
          <div
            aria-label="Auto closing timer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 10px",
              borderRadius: 999,
              background: timerBg,
              border: timerBorder,
              color: timerText,
              fontSize: "0.78rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            <span>Closes in</span>
            <span
              style={{
                minWidth: 26,
                textAlign: "center",
              }}
            >
              {secondsLeft}s
            </span>
          </div>

          <button
            onClick={closeCompliance}
            aria-label="Skip data protection message"
            style={{
              borderRadius: 999,
              border: "1px solid rgba(148,163,184,0.6)",
              background: theme === "dark" ? "rgba(15,23,42,0.9)" : "rgba(248,250,252,0.9)",
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: theme === "dark" ? "#9ca3af" : "#6b7280",
              cursor: "pointer",
              padding: "5px 12px",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.18s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                theme === "dark" ? "rgba(15,23,42,1)" : "#eff6ff";
              e.currentTarget.style.color = theme === "dark" ? "#e5e7eb" : "#1d4ed8";
              e.currentTarget.style.borderColor =
                theme === "dark" ? "rgba(148,163,184,0.8)" : "rgba(59,130,246,0.8)";
              e.currentTarget.style.boxShadow =
                theme === "dark"
                  ? "0 0 14px rgba(56,189,248,0.45)"
                  : "0 0 16px rgba(59,130,246,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                theme === "dark" ? "rgba(15,23,42,0.9)" : "rgba(248,250,252,0.9)";
              e.currentTarget.style.color = theme === "dark" ? "#9ca3af" : "#6b7280";
              e.currentTarget.style.borderColor = "rgba(148,163,184,0.6)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Skip
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 14,
            marginTop: 8,
          }}
        >
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.9rem",
              fontWeight: 600,
              color: headingColor,
              cursor: "pointer",
              padding: "7px 12px",
              borderRadius: 999,
              background:
                theme === "dark"
                  ? "rgba(15,23,42,0.85)"
                  : "rgba(219,234,254,0.9)",
              border:
                theme === "dark"
                  ? "1px solid rgba(148,163,184,0.7)"
                  : "1px solid rgba(148,163,184,0.5)",
              boxShadow:
                theme === "dark"
                  ? "0 10px 25px rgba(15,23,42,0.9)"
                  : "0 8px 18px rgba(148,163,184,0.4)",
            }}
          >
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              style={{
                width: 16,
                height: 16,
                cursor: "pointer",
                accentColor: theme === "dark" ? "#38bdf8" : "#2563eb",
              }}
            />
            <span>Don&apos;t show again</span>
          </label>
        </div>

        <div style={{ paddingRight: 8 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  theme === "dark"
                    ? "radial-gradient(circle at 30% 0%, rgba(56,189,248,0.5), rgba(15,23,42,1))"
                    : "radial-gradient(circle at 30% 0%, rgba(59,130,246,0.15), #e5edff)",
                color: theme === "dark" ? "#e0f2fe" : "#1d4ed8",
                boxShadow:
                  theme === "dark"
                    ? "0 0 18px rgba(56,189,248,0.7)"
                    : "0 0 14px rgba(59,130,246,0.35)",
              }}
            >
              <FaShieldAlt size={16} />
            </div>

            <h3
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: headingColor,
              }}
            >
              DPA &amp; Data Protection
            </h3>
          </div>

          <p
            style={{
              fontSize: "0.92rem",
              lineHeight: 1.7,
              color: bodyColor,
            }}
          >
            Our platform is built with a strong commitment to data protection. We implement
            a HIPAA-aware architecture, secure data handling practices, and encrypted
            storage to ensure the highest level of privacy, security, and compliance. Your
            trust and data safety are our top priority.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function WorkflowDashboard() {
  const { theme } = useTheme();

  const stages = [
    { label: "Intake", value: "12 waiting", fill: "72%" },
    { label: "Triage", value: "8 in review", fill: "54%" },
    { label: "In consult", value: "6 in-room", fill: "38%" },
    { label: "Follow-up", value: "10 scheduled", fill: "64%" },
  ];

  const cardBackground =
    theme === "dark"
      ? "radial-gradient(circle at top left, rgba(15,23,42,0.98), rgba(15,23,42,0.96))"
      : "linear-gradient(135deg, #ffffff, #f1f5f9)";

  const cardShadow =
    theme === "dark"
      ? "0 18px 40px rgba(15,23,42,0.85)"
      : "0 14px 30px rgba(15,23,42,0.16)";

  const hoverShadow =
    theme === "dark"
      ? "0 26px 60px rgba(15,23,42,0.9)"
      : "0 24px 55px rgba(15,23,42,0.2)";

  const baseBorder =
    theme === "dark" ? "1px solid rgba(148,163,184,0.35)" : "1px solid rgba(148,163,184,0.45)";

  return (
    <motion.div
      className="workflow-dashboard"
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        rotateX: 3,
        rotateY: -3,
        boxShadow: hoverShadow,
      }}
      style={{
        transformPerspective: 1100,
        background: cardBackground,
        boxShadow: cardShadow,
        border: baseBorder,
        color: theme === "dark" ? "#e5e7eb" : "#0f172a",
      }}
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
      <div className="workflow-dashboard__header">
        <div>
          <p className="workflow-dashboard__eyebrow">Today&apos;s flow</p>
          <h3 className="workflow-dashboard__title">Workflow overview</h3>
        </div>
        <div className="workflow-dashboard__header-metric">
          <span className="workflow-dashboard__pill">24 active patients</span>
          <span className="workflow-dashboard__status-dot" />
          <span className="workflow-dashboard__status-label">SLA healthy</span>
        </div>
      </div>

      <div className="workflow-dashboard__grid">
        <motion.div
          className="workflow-panel workflow-panel--pipeline"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <div className="workflow-panel__header">
            <div className="workflow-panel__title-group">
              <span className="workflow-panel__icon">
                <FaCloud />
              </span>
              <div>
                <p className="workflow-panel__title">Live pipeline</p>
                <p className="workflow-panel__subtitle">Intake to follow-up</p>
              </div>
            </div>
            <span className="workflow-panel__metric">96% automated</span>
          </div>

          <div className="workflow-pipeline">
            {stages.map((stage) => (
              <div className="workflow-stage" key={stage.label}>
                <div className="workflow-stage__top">
                  <span className="workflow-stage__label">{stage.label}</span>
                  <span className="workflow-stage__value">{stage.value}</span>
                </div>
                <div className="workflow-stage__track">
                  <motion.div
                    className="workflow-stage__fill"
                    initial={{ width: 0 }}
                    animate={{ width: stage.fill }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="workflow-panel workflow-panel--stats"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <div className="workflow-panel__header">
            <div className="workflow-panel__title-group">
              <span className="workflow-panel__icon workflow-panel__icon--doctor">
                <FaUserMd />
              </span>
              <div>
                <p className="workflow-panel__title">Care team load</p>
                <p className="workflow-panel__subtitle">Across all providers</p>
              </div>
            </div>
          </div>

          <div className="workflow-metrics">
            <div className="workflow-metric">
              <p className="workflow-metric__label">Avg. handling time</p>
              <p className="workflow-metric__value">6.4 min</p>
              <p className="workflow-metric__trend workflow-metric__trend--positive">↓ 23% vs last week</p>
            </div>
            <div className="workflow-metric">
              <p className="workflow-metric__label">Tasks automated</p>
              <p className="workflow-metric__value">148 / day</p>
              <p className="workflow-metric__trend">Rules: intake, reminders, summaries</p>
            </div>
            <div className="workflow-metric">
              <p className="workflow-metric__label">No-show risk</p>
              <p className="workflow-metric__value">3.1%</p>
              <p className="workflow-metric__trend workflow-metric__trend--positive">
                Predictive reminders active
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="workflow-panel workflow-panel--timeline"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        >
          <div className="workflow-panel__header">
            <div className="workflow-panel__title-group">
              <span className="workflow-panel__icon workflow-panel__icon--calendar">
                <FaCalendarAlt />
              </span>
              <div>
                <p className="workflow-panel__title">Next 2 hours</p>
                <p className="workflow-panel__subtitle">Automation checkpoints</p>
              </div>
            </div>
          </div>

          <div className="workflow-timeline">
            <div className="workflow-timeline__item">
              <span className="workflow-timeline__dot workflow-timeline__dot--intake" />
              <div className="workflow-timeline__content">
                <p className="workflow-timeline__title">Pre-visit intake</p>
                <p className="workflow-timeline__meta">08:10 · 7 patients completing forms</p>
              </div>
            </div>
            <div className="workflow-timeline__item">
              <span className="workflow-timeline__dot workflow-timeline__dot--doctor" />
              <div className="workflow-timeline__content">
                <p className="workflow-timeline__title">AI draft notes</p>
                <p className="workflow-timeline__meta">09:05 · 3 consults in progress</p>
              </div>
            </div>
            <div className="workflow-timeline__item">
              <span className="workflow-timeline__dot workflow-timeline__dot--report" />
              <div className="workflow-timeline__content">
                <p className="workflow-timeline__title">Discharge summaries</p>
                <p className="workflow-timeline__meta">09:40 · 5 reports queued</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const [showCompliance, setShowCompliance] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { theme } = useTheme();

  const bgColors = {
    dark: "#020617",
    light: "#f3f7fb",
  };
  const textColors = {
    dark: "#f8fafc",
    light: "#0f172a",
  };
  const subTextColors = {
    dark: "#cbd5e1",
    light: "#1e293b",
  };
  const btnGradient = {
    dark: "linear-gradient(90deg,#0ea5e9,#3b82f6)",
    light: "linear-gradient(90deg,#3b82f6,#60a5fa)",
  };
  const btnOutlineColor = {
    dark: "#0ea5e9",
    light: "#3b82f6",
  };

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = window.localStorage.getItem("hideComplianceModal");
        if (stored === "true") {
          setShowCompliance(false);
        } else {
          setShowCompliance(true);
        }
      } else {
        setShowCompliance(true);
      }
    } catch {
      setShowCompliance(true);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {showCompliance && <ComplianceModal onClose={() => setShowCompliance(false)} />}
      </AnimatePresence>

      <section
        style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px 40px",
          minHeight: "100vh",
          background:
            theme === "dark"
              ? "radial-gradient(circle at top, #020617 0, #020617 40%, #0f172a 100%)"
              : "linear-gradient(135deg,#f9fbff,#e0f2ff)",
          color: textColors[theme],
          transition: "all 0.4s ease-out",
        }}
      >
        <div className="hero-bg-radial" />
        <div className="hero-bg-grid" />

        <div className="hero-layout">
          <div className="hero-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* Headline */}
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
  style={{
    margin: 0,
    fontSize: "clamp(2.4rem, 5.4vw, 3.4rem)",
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: "-0.03em",
    maxWidth: "28ch",
    zIndex: 2,
    display: "inline-block", // Isse spacing control behtar hoti hai
  }}
>
  Smart Clinic Automation for{" "}
  <span
    style={{
      color: theme === "dark" ? "#38bdf8" : "#38bdf8",
      display: "inline-block", // Padding/Margin apply karne ke liye
      marginLeft: "-2px", // Proper unit add kiya
    }}
  >
    Better Patient Care
  </span>
</motion.h1>
            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.22, ease: "easeOut" }}
              style={{
                fontSize: "clamp(1.02rem, 2.4vw, 1.18rem)",
                marginTop: "16px",
                maxWidth: "34ch",
                lineHeight: 1.6,
                color: subTextColors[theme],
                zIndex: 2,
              }}
            >
              EaseWorkflow streamlines scheduling, intake, and follow-ups so your team
              spends more time with patients instead of paperwork.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="hero-cta-row"
              style={{
                marginTop: "28px",
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                zIndex: 2,
              }}
            >
              <a
                href="/booking"
                style={{
                  padding: "14px 32px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderRadius: "999px",
                  background: btnGradient[theme],
                  color: textColors[theme],
                  textDecoration: "none",
                  boxShadow:
                    theme === "dark"
                      ? "0 16px 36px rgba(15,23,42,0.9)"
                      : "0 14px 32px rgba(148,163,184,0.55)",
                  transition: "all 0.2s ease-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    theme === "dark"
                      ? "0 20px 48px rgba(15,23,42,1)"
                      : "0 18px 40px rgba(148,163,184,0.75)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    theme === "dark"
                      ? "0 16px 36px rgba(15,23,42,0.9)"
                      : "0 14px 32px rgba(148,163,184,0.55)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Book Free Workflow Audit
              </a>

              <Link
                href="/projects"
                style={{
                  padding: "14px 22px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  borderRadius: "999px",
                  border: `1.5px solid ${btnOutlineColor[theme]}`,
                  background: theme === "dark" ? "rgba(15,23,42,0.7)" : "rgba(248,250,252,0.95)",
                  color: theme === "dark" ? "#e5f6ff" : "#1d4ed8",
                  textDecoration: "none",
                  transition: "all 0.2s ease-out",
                  backdropFilter: "blur(14px)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    theme === "dark" ? "rgba(15,23,42,0.9)" : "#e0edff";
                  e.currentTarget.style.color = theme === "dark" ? "#f9fafb" : "#1e3a8a";
                  e.currentTarget.style.boxShadow = theme === "dark"
                    ? "0 14px 32px rgba(15,23,42,1)"
                    : "0 14px 28px rgba(148,163,184,0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    theme === "dark" ? "rgba(15,23,42,0.7)" : "rgba(248,250,252,0.95)";
                  e.currentTarget.style.color = theme === "dark" ? "#e5f6ff" : "#1d4ed8";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                See Live Projects
              </Link>
            </motion.div>

            <motion.div
              className="hero-trust-row"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
            >
              <span className="hero-trust-label">Trusted by clinics and care teams worldwide</span>
              <span
                className="hero-trust-pill"
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                <FaStar size={14} style={{ color: "#facc15", marginRight: 6 }} />
                4.9 from 1,600+ verified patient reviews
              </span>
            </motion.div>
          </motion.div>
          </div>
          {/* Right visual column - Minimalist Version (No Review Cards) */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
            style={{
              zIndex: 2,
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
              position: "relative",
              width: "100%",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "600px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Soft Glowy Background Circles */}
              <div
                style={{
                  position: "absolute",
                  width: "120%",
                  height: "100%",
                  background:
                    theme === "dark"
                      ? "radial-gradient(circle, rgba(46,196,182,0.07) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
                  zIndex: -1,
                  top: "0%",
                }}
              />

              {/* Main Doctor Image - Centered and Large */}
              <div
                className="hero-image-shell"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  transform: "translateX(-10%)",
                }}
              >
                <img
                  src="/images/new hero.png"
                  alt="Healthcare Professional"
                  style={{
                    height: "100%",
                    width: "auto",
                    objectFit: "contain",
                    borderRadius: "24px",
                    filter: "drop-shadow(0 20px 40px rgba(8, 26, 47, 0.15))",
                    zIndex: 5,
                  }}
                />

                {/* Floating icons: desktop = absolute on image edge, mobile = row below via CSS */}
                <div className="hero-icon-row">
                  {/* Phone Icon */}
                  <Link href="/contact">
                    <motion.div
                      className="hero-signal-icon hero-signal-icon--call"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        position: "absolute",
                        top: "20%",
                        left: "-5%",
                        width: 55,
                        height: 55,
                        borderRadius: "50%",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                        color: "#081A2F",
                        zIndex: 10,
                        border: "1px solid rgba(226, 232, 240, 0.8)",
                        cursor: "pointer",
                      }}
                    >
                      <FaPhoneAlt size={22} />
                    </motion.div>
                  </Link>

                  {/* Video Icon (now navigates to Contact) */}
                  <Link href="/contact">
                    <motion.div
                      className="hero-signal-icon hero-signal-icon--video"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      animate={{ y: [0, 15, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      style={{
                        position: "absolute",
                        top: "70%",
                        left: "-5%",
                        width: 55,
                        height: 55,
                        borderRadius: "50%",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                        color: "#2EC4B6",
                        zIndex: 10,
                        border: "1px solid rgba(226, 232, 240, 0.8)",
                        cursor: "pointer",
                      }}
                    >
                      <FaVideo size={26} />
                    </motion.div>
                  </Link>

                  {/* Message/Chat Icon (now navigates to Contact instead of opening chat) */}
                  <Link href="/contact">
                    <motion.button
                      className="hero-signal-icon hero-signal-icon--message"
                      type="button"
                      animate={{ x: [0, 8, 0] }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                      style={{
                        position: "absolute",
                        top: "47%",
                        left: "-5%",
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                        color: "#081A2F",
                        zIndex: 12,
                        border: "1px solid rgba(226, 232, 240, 0.8)",
                        cursor: "pointer",
                        borderWidth: 0,
                      }}
                    >
                      <FaCommentDots size={22} />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </section>

      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
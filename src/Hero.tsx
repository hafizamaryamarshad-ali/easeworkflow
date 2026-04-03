"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStethoscope,
  FaPills,
  FaHeart,
  FaSyringe,
  FaUserMd,
  FaCloud,
  FaCalendarAlt,
  FaShieldAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useTheme } from "./theme/ThemeProvider";

function ComplianceModal({ onClose }: { onClose: () => void }) {
  const { theme } = useTheme();

  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timeout = setTimeout(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [secondsLeft, onClose]);

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
            onClick={onClose}
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
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; opacity: number }[]>([]);
  const [showCompliance, setShowCompliance] = useState(true);
  const { theme } = useTheme();

  // Generate floating particles
  useEffect(() => {
    const temp: typeof particles = [];
    for (let i = 0; i < 40; i++) {
      temp.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        opacity: 0.05 + Math.random() * 0.25,
      });
    }
    setParticles(temp);
  }, []);

  const floatingIcons = [
    { Icon: FaStethoscope, size: 68, top: "8%",  left: "6%",  speed: 11, opacity: 0.18 },
    { Icon: FaPills,       size: 46, top: "22%", left: "92%", speed: 8,  opacity: 0.13 },
    { Icon: FaHeart,       size: 75, top: "78%", left: "4%",  speed: 13, opacity: 0.16 },
    { Icon: FaSyringe,     size: 54, top: "85%", left: "88%", speed: 9,  opacity: 0.14 },
    { Icon: FaStethoscope, size: 42, top: "45%", left: "2%",  speed: 10, opacity: 0.11 },
    { Icon: FaPills,       size: 38, top: "60%", left: "94%", speed: 12, opacity: 0.12 },
    { Icon: FaHeart,       size: 50, top: "15%", left: "88%", speed: 14, opacity: 0.15 },
  ];

  const bgColors = {
    dark: "var(--bg-gradient-dark)",
    light: "#f5f7fa",
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

  return (
    <>
      <AnimatePresence>
        {showCompliance && (
          <ComplianceModal onClose={() => setShowCompliance(false)} />
        )}
      </AnimatePresence>

      <section
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "95vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 20px",
        backgroundColor: theme === "dark" ? "#0f172a" : bgColors.light,
        backgroundImage: theme === "dark" ? bgColors.dark : "none",
        backgroundSize: "600% 600%",
        color: textColors[theme],
        transition: "all 0.5s ease",
      }}
    >
      <div className="hero-bg-radial" />
      <div className="hero-bg-grid" />

      {/* Tech particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, x: 0 }}
          animate={{ y: ["0%", "-15%", "0%"], x: ["0%", "8%", "0%"] }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: `${p.y}%`,
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: theme === "dark" ? "#0ea5e9" : "#3b82f6",
            boxShadow:
              theme === "dark"
                ? "0 0 4px #0ea5e9, 0 0 12px #3b82f6"
                : "0 0 3px rgba(37,99,235,0.7)",
            opacity: p.opacity,
            pointerEvents: "none",
          }}
        />
      ))}

      <div className="hero-layout">
        <div className="hero-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.div
              className="hero-eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              <span
                className="hero-eyebrow-pill"
                style={
                  theme === "light"
                    ? {
                        background: "rgba(191,219,254,0.9)",
                        color: "#0f172a",
                        border: "1px solid rgba(148,163,184,0.7)",
                      }
                    : undefined
                }
              >
                AI-powered workflow OS
              </span>
              <span
                className="hero-eyebrow-text"
                style={
                  theme === "light"
                    ? {
                        color: "#475569",
                      }
                    : undefined
                }
              >
                For modern clinics & care teams
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              style={{
                fontSize: "clamp(2.4rem, 6vw, 4rem)",
                fontWeight: 900,
                lineHeight: "1.2",
                maxWidth: "900px",
                zIndex: 2,
              }}
            >
              Automate Your Clinic. Maximize Efficiency.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25 }}
              style={{
                fontSize: "clamp(1.05rem, 3.2vw, 1.25rem)",
                marginTop: "18px",
                maxWidth: "700px",
                lineHeight: "1.6",
                color: subTextColors[theme],
                zIndex: 2,
                textShadow: theme === "dark" ? "0 0 6px rgba(0,198,255,0.18)" : "none",
              }}
            >
              EaseWorkflow orchestrates intake, triage, documentation and follow-up in one
              unified automation layer—so your team spends more time with patients, not
              paperwork.
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
                href="/contact"
                style={{
                  padding: "14px 32px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderRadius: "999px",
                  background: btnGradient[theme],
                  color: textColors[theme],
                  textDecoration: "none",
                  boxShadow: theme === "dark" ? "0 14px 32px rgba(0,198,255,0.4)" : "0 14px 32px rgba(59,130,246,0.35)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = theme === "dark"
                    ? "0 0 22px #0ea5e9, 0 0 44px #3b82f6"
                    : "0 0 22px #3b82f6, 0 0 44px #60a5fa")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = theme === "dark"
                    ? "0 14px 32px rgba(0,198,255,0.4)"
                    : "0 14px 32px rgba(59,130,246,0.35)")
                }
              >
                Book Free Consultation
              </a>

              <Link
	            href="#services"
                style={{
                  padding: "14px 28px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  borderRadius: "999px",
                  border: `1.5px solid ${btnOutlineColor[theme]}`,
                  background: theme === "dark" ? "rgba(15,23,42,0.6)" : "rgba(248,250,252,0.85)",
                  color: theme === "dark" ? "#0ea5e9" : "#1d4ed8",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  backdropFilter: "blur(14px)",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById("services");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = theme === "dark" ? "rgba(8,47,73,0.95)" : "#3b82f6";
                  e.currentTarget.style.color = theme === "dark" ? "#f9fafb" : "#f9fafb";
                  e.currentTarget.style.boxShadow = theme === "dark"
                    ? "0 0 18px #0ea5e9, 0 0 34px #3b82f6"
                    : "0 0 18px #3b82f6, 0 0 34px #60a5fa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = theme === "dark" ? "rgba(15,23,42,0.6)" : "rgba(248,250,252,0.85)";
                  e.currentTarget.style.color = theme === "dark" ? "#0ea5e9" : "#1d4ed8";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Explore Services
              </Link>
            </motion.div>

            <motion.div
              className="hero-trust-row"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55 }}
            >
              <span className="hero-trust-label">Trusted by digital-first clinics worldwide</span>
              <span className="hero-trust-pill">Avg. 35% reduction in admin time</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Right visual column */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ zIndex: 2 }}
        >
          <WorkflowDashboard />
        </motion.div>
      </div>

      {/* Floating tech icons */}
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: ["0%", "-30%", "0%"] }}
          transition={{
            duration: icon.speed,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: icon.top,
            left: icon.left,
            fontSize: icon.size,
            opacity: icon.opacity,
            pointerEvents: "none",
            color: theme === "dark" ? "#0ea5e9" : "#3b82f6",
            textShadow: theme === "dark" ? "0 0 12px #0ea5e9, 0 0 24px #3b82f6" : "none",
          }}
        >
          <icon.Icon />
        </motion.div>
      ))}
      </section>
    </>
  );
}
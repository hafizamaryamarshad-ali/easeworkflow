"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShieldAlt,
  FaCalendarAlt,
  FaPlay,
  FaStar,
} from "react-icons/fa";
import { useTheme } from "./theme/ThemeProvider";
import Chatbot from "./Chatbot";

function ComplianceModal({ onClose }: { onClose: () => void }) {
  const { theme } = useTheme();
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [seconds, setSeconds] = useState(5);

  const closeCompliance = useCallback(() => {
    try {
      if (dontShowAgain && typeof window !== "undefined") {
        window.localStorage.setItem("hideComplianceModal", "true");
      }
    } catch {
      // Ignore localStorage errors
    }
    onClose();
  }, [dontShowAgain, onClose]);

  useEffect(() => {
    if (seconds <= 0) {
      closeCompliance();
      return;
    }
    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [seconds, closeCompliance]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        style={{
          width: "min(460px, 92vw)",
          borderRadius: 24,
          padding: "22px 26px",
          background: theme === "dark" ? "#0f172a" : "#ffffff",
          color: theme === "dark" ? "#f8fafc" : "#0f172a",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              padding: "3px 12px",
              borderRadius: 999,
              background: "rgba(37, 99, 235, 0.15)",
              color: "#2563eb",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            CLOSES IN {seconds}S
          </span>

          <button
            onClick={closeCompliance}
            style={{
              padding: "3px 12px",
              borderRadius: 999,
              border: "none",
              background: "transparent",
              color: theme === "dark" ? "#94a3b8" : "#64748b",
              cursor: "pointer",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            SKIP
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: "1.05rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#eff6ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2563eb",
              }}
            >
              <FaShieldAlt size={13} />
            </div>
            Data Protection & HIPAA
          </h3>

          <p
            style={{
              fontSize: "0.85rem",
              color: theme === "dark" ? "#94a3b8" : "#475569",
              marginTop: 8,
              lineHeight: 1.45,
            }}
          >
            EaseWorkflow implements strict data protection protocols, end-to-end encryption, and HIPAA-aware architecture to keep patient records secure.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 14, paddingTop: 10, borderTop: theme === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.8rem",
              fontWeight: 500,
              color: theme === "dark" ? "#94a3b8" : "#64748b",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              style={{ width: 13, height: 13, accentColor: "#2563eb", cursor: "pointer" }}
            />
            Don't show this again
          </label>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const [showCompliance, setShowCompliance] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { theme } = useTheme();
  const [centerHero, setCenterHero] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = window.localStorage.getItem("hideComplianceModal");
        setShowCompliance(stored !== "true");
      }
    } catch {
      setShowCompliance(true);
    }
  }, []);

  const isDark = theme === "dark";

  useEffect(() => {
    function updateCentering() {
      if (typeof window === "undefined") return;
      const h = window.innerHeight;
      const w = window.innerWidth;
      // Center hero vertically on tall viewports or very wide screens
      setCenterHero(h >= 760 || w >= 1400 || h / w > 0.6);
    }

    updateCentering();
    window.addEventListener("resize", updateCentering);
    return () => window.removeEventListener("resize", updateCentering);
  }, []);

  // Added `invertInDark` property specifically for the 1st (Practice Fusion) and 4th (Athenahealth) logos
  const floatingLogos = [
    { name: "Practice Fusion", src: "/images/logos/practice-fusion.png", customHeight: "76px", delay: 0, invertInDark: true },
    { name: "Availity", src: "/images/logos/availity.png", customHeight: "68px", delay: 0.5, invertInDark: false },
    { name: "Kareo", src: "/images/logos/kareo.png", customHeight: "110px", delay: 1, invertInDark: false },
    { name: "Athenahealth", src: "/images/logos/athenahealth.png", customHeight: "108px", delay: 1.5, invertInDark: true },
    { name: "Epic", src: "/images/logos/epic.png", customHeight: "60px", delay: 2, invertInDark: false },
  ];

  return (
    <>
      <AnimatePresence>
        {showCompliance && <ComplianceModal onClose={() => setShowCompliance(false)} />}
      </AnimatePresence>

      <section
        id="hero"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "calc(100vh - 70px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: centerHero ? "center" : "flex-start",
          padding: "clamp(20px, 6vh, 48px) clamp(16px, 5vw, 64px) 24px",
          background: isDark
            ? "radial-gradient(circle at 50% 0%, #1e1b4b 0%, #020617 100%)"
            : "radial-gradient(circle at 50% 0%, #e0e7ff 0%, #f8fafc 100%)",
          color: isDark ? "#f8fafc" : "#0f172a",
        }}
      >
        {/* Subtle Background Grid Lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: isDark
              ? "linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)"
              : "linear-gradient(to right, rgba(37, 99, 235, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(37, 99, 235, 0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            pointerEvents: "none",
          }}
        />

        {/* TOP CENTERED HEADER CONTENT */}
        <div
          style={{
            maxWidth: "min(1100px, 94%)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "clamp(14px, 2.5vh, 40px)",
            marginTop: "clamp(12px, 3vh, 48px)",
            transform: centerHero ? "translateY(6vh)" : "translateY(0)",
            position: "relative",
            zIndex: 2,
          }}
        >
          

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
              style={{
                fontSize: "clamp(2rem, 3.5vw, 5rem)",
                fontWeight: 800,
                lineHeight: 1.03,
                letterSpacing: "-0.035em",
                margin: 0,
                width: "100%",
              }}
          >
            Automate Your Clinic. <br />
            <span
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Focus on Your Patients.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={{
              fontSize: "clamp(0.95rem, 1.05vw, 1.28rem)",
              lineHeight: 1.6,
              color: isDark ? "#cbd5e1" : "#475569",
              maxWidth: "min(820px, 92%)",
              margin: 0,
              padding: "0 8px",
            }}
          >
            EaseWorkflow provides healthcare workflow automation for scheduling, patient intake, insurance verification, documentation, and follow-ups so your clinic spends less time on admin and more time on patient care.
          </motion.p>

          {/* ACTION BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(12px, 1.6vh, 28px)",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "clamp(10px, 2vh, 28px)",
              width: "100%",
            }}
          >
            <a
              href="/booking"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "clamp(10px, 1.6vh, 14px) clamp(20px, 2.6vw, 32px)",
                borderRadius: 999,
                background: "#2563eb",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "clamp(0.9rem, 0.9vw, 1.05rem)",
                textDecoration: "none",
                boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
                transition: "transform 0.2s ease, background-color 0.2s ease",
              }}
            >
              <FaCalendarAlt size={12} /> Book Free Demo
            </a>

            <a
              href="/case-studies"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "clamp(10px, 1.6vh, 14px) clamp(20px, 2.6vw, 32px)",
                borderRadius: 999,
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.04)",
                color: isDark ? "#f8fafc" : "#0f172a",
                fontWeight: 600,
                fontSize: "clamp(0.9rem, 0.9vw, 1.05rem)",
                textDecoration: "none",
                border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,23,42,0.12)",
                transition: "background-color 0.2s ease",
              }}
            >
              <FaPlay size={10} color="#2563eb" /> See Case Studies
            </a>
          </motion.div>

          {/* REVIEWS BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: "clamp(12px, 2.2vh, 26px)",
              fontSize: "0.84rem",
              fontWeight: 500,
              color: isDark ? "#94a3b8" : "#64748b",
            }}
          >
            <div style={{ display: "flex", gap: 3, color: "#f59e0b" }}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={12} />
              ))}
            </div>
            <span><strong style={{ color: isDark ? "#f8fafc" : "#0f172a" }}>4.9</strong> from 1,600+ verified reviews</span>
          </motion.div>
        </div>

        {/* BOTTOM FLOATING LOGOS SECTION */}
        <div
          style={{
            maxWidth: 1100,
            width: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "clamp(36px, 8vh, 120px)",
            height: "clamp(100px, 14vh, 220px)",
            zIndex: 2,
          }}
        >
          {/* RADIANT BACKDROP GLOW */}
          <div
            style={{
              position: "absolute",
              width: "min(750px, 90vw)",
              height: "180px",
              background: isDark
                ? "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.4) 0%, transparent 70%)"
                : "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.2) 0%, transparent 75%)",
              filter: "blur(35px)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(24px, 5vw, 60px)",
              position: "relative",
              zIndex: 2,
              width: "100%",
            }}
          >
            {floatingLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{
                  opacity: 1,
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: logo.delay },
                  y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: logo.delay }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px",
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  style={{
                    height: logo.customHeight,
                    width: "auto",
                    objectFit: "contain",
                    // If invertInDark is true and dark theme is active, apply brightness(0) invert(1) to make it pure white
                    filter: isDark
                      ? logo.invertInDark
                        ? "brightness(0) invert(1) drop-shadow(0 0 12px rgba(255,255,255,0.35))"
                        : "drop-shadow(0 0 12px rgba(255,255,255,0.25)) drop-shadow(0 4px 14px rgba(0,0,0,0.6))"
                      : "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
                    opacity: isDark ? 0.98 : 0.95,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}

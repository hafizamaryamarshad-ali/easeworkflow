"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShieldAlt,
  FaCalendarAlt,
  FaPlay,
  FaStar,
  FaNetworkWired,
  FaLock,
  FaHeadset,
} from "react-icons/fa";
import Link from "next/link";
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
          justifyContent: "flex-start",
          padding: "clamp(12px, 3vh, 24px) clamp(16px, 5vw, 64px) 24px",
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
            maxWidth: 880,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 12,
            position: "relative",
            zIndex: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 16px",
              borderRadius: 999,
              background: isDark ? "rgba(37,99,235,0.2)" : "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(147, 197, 253, 0.4)",
              backdropFilter: "blur(10px)",
              color: "#2563eb",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.02em",
              textAlign: "center",
            }}
          >
            <FaShieldAlt size={11} /> Trusted by Modern Healthcare Clinics
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            style={{
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              fontWeight: 800,
              lineHeight: 1.1,
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
              fontSize: "clamp(0.88rem, 1.15vw, 1.05rem)",
              lineHeight: 1.5,
              color: isDark ? "#cbd5e1" : "#475569",
              maxWidth: 700,
              margin: 0,
              padding: "0 8px",
            }}
          >
            EaseWorkflow automates scheduling, patient intake, insurance verification, documentation, and follow-ups so your team spends less time on admin and more time on what truly matters.
          </motion.p>

          {/* ACTION BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 2,
              width: "100%",
            }}
          >
            <a
              href="/demo"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "11px 26px",
                borderRadius: 999,
                background: "#2563eb",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.9rem",
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
                padding: "11px 26px",
                borderRadius: 999,
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.04)",
                color: isDark ? "#f8fafc" : "#0f172a",
                fontWeight: 600,
                fontSize: "0.9rem",
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
              marginTop: 2,
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

        {/* BOTTOM SECTION: Product Mockup with Radiant Glow & Responsive Floating Cards */}
        <div
          style={{
            maxWidth: 1050,
            width: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            marginTop: "20px",
            zIndex: 2,
          }}
        >
          {/* RADIANT BACKDROP GLOW BEHIND PRODUCT IMAGE */}
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(650px, 90vw)",
              height: "220px",
              background: isDark
                ? "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.35) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 75%)"
                : "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.22) 0%, rgba(96, 165, 250, 0.08) 55%, transparent 80%)",
              filter: "blur(30px)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 680,
              height: "clamp(220px, 28vh, 320px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              zIndex: 2,
            }}
          >
            <img
              src="/images/hero-doctors-group.png"
              alt="EaseWorkflow Dashboard Mockup"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "bottom center",
                display: "block",
              }}
            />

            {/* FLOATING CARD 1 (Top Left) - Hidden on very small screens via CSS/Inline media handling if needed, or compact style */}
            <div
              className="floating-card-desktop"
              style={{
                position: "absolute",
                top: "15%",
                left: "clamp(-4%, 1vw, 2%)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderRadius: 12,
                background: isDark ? "rgba(15, 23, 42, 0.92)" : "rgba(255, 255, 255, 0.96)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 14px 35px rgba(0,0,0,0.15)",
                border: "1px solid rgba(147, 197, 253, 0.3)",
                zIndex: 3,
              }}
            >
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(37, 99, 235, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb" }}>
                <FaShieldAlt size={11} />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a", whiteSpace: "nowrap" }}>
                HIPAA Compliant
              </span>
            </div>

            {/* FLOATING CARD 2 (Bottom Left) */}
            <div
              className="floating-card-desktop"
              style={{
                position: "absolute",
                bottom: "18%",
                left: "clamp(-6%, 0vw, 1%)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderRadius: 12,
                background: isDark ? "rgba(15, 23, 42, 0.92)" : "rgba(255, 255, 255, 0.96)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 14px 35px rgba(0,0,0,0.15)",
                border: "1px solid rgba(147, 197, 253, 0.3)",
                zIndex: 3,
              }}
            >
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(37, 99, 235, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb" }}>
                <FaNetworkWired size={11} />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a", whiteSpace: "nowrap" }}>
                Works with EMR
              </span>
            </div>

            {/* FLOATING CARD 3 (Top Right) */}
            <div
              className="floating-card-desktop"
              style={{
                position: "absolute",
                top: "15%",
                right: "clamp(-4%, 1vw, 2%)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderRadius: 12,
                background: isDark ? "rgba(15, 23, 42, 0.92)" : "rgba(255, 255, 255, 0.96)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 14px 35px rgba(0,0,0,0.15)",
                border: "1px solid rgba(147, 197, 253, 0.3)",
                zIndex: 3,
              }}
            >
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(37, 99, 235, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb" }}>
                <FaLock size={11} />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a", whiteSpace: "nowrap" }}>
                Secure & Encrypted
              </span>
            </div>

            {/* FLOATING CARD 4 (Bottom Right) */}
            <div
              className="floating-card-desktop"
              style={{
                position: "absolute",
                bottom: "18%",
                right: "clamp(-6%, 0vw, 1%)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderRadius: 12,
                background: isDark ? "rgba(15, 23, 42, 0.92)" : "rgba(255, 255, 255, 0.96)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 14px 35px rgba(0,0,0,0.15)",
                border: "1px solid rgba(147, 197, 253, 0.3)",
                zIndex: 3,
              }}
            >
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(37, 99, 235, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb" }}>
                <FaHeadset size={11} />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a", whiteSpace: "nowrap" }}>
                24/7 Support
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Optional CSS snippet to hide floating cards gracefully on extremely small mobile screens if needed */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .floating-card-desktop {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
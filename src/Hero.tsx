"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShieldAlt,
  FaCalendarAlt,
  FaPlay,
  FaStar,
  FaLink,
  FaLock,
  FaHeadset,
} from "react-icons/fa";
import Link from "next/link";
import { useTheme } from "./theme/ThemeProvider";
import Chatbot from "./Chatbot";

function ComplianceModal({ onClose }: { onClose: () => void }) {
  const { theme } = useTheme();
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);

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
    if (secondsLeft <= 0) {
      closeCompliance();
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, closeCompliance]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        style={{
          width: "min(520px, 92vw)",
          borderRadius: 28,
          padding: "28px 32px",
          background: theme === "dark" ? "#0f172a" : "#f0f5ff",
          color: theme === "dark" ? "#f8fafc" : "#0f172a",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          border: theme === "dark" ? "1px solid #1e293b" : "1px solid #dbeafe",
        }}
      >
        {/* Top Header Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              padding: "6px 16px",
              borderRadius: 999,
              border: "1px solid #3b82f6",
              color: "#2563eb",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              background: "transparent",
            }}
          >
            CLOSES IN {secondsLeft}S
          </span>

          <button
            onClick={closeCompliance}
            style={{
              padding: "6px 18px",
              borderRadius: 999,
              border: "1px solid #3b82f6",
              color: "#2563eb",
              background: "transparent",
              cursor: "pointer",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            SKIP
          </button>
        </div>

        {/* Don't Show Again Toggle Pill */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(219, 234, 254, 0.6)",
              border: "1px solid #bfdbfe",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#1e293b",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              style={{ width: 15, height: 15, accentColor: "#2563eb", cursor: "pointer" }}
            />
            Don't show again
          </label>
        </div>

        {/* Title Section */}
        <div style={{ marginTop: 16 }}>
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: "1.2rem",
              fontWeight: 700,
              margin: 0,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#dbeafe",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2563eb",
              }}
            >
              <FaShieldAlt size={18} />
            </div>
            DPA & Data Protection
          </h3>

          <p
            style={{
              fontSize: "0.95rem",
              color: theme === "dark" ? "#cbd5e1" : "#475569",
              marginTop: 18,
              lineHeight: 1.6,
            }}
          >
            Our platform is built with a strong commitment to data protection. We implement a HIPAA-aware architecture, secure data handling practices, and encrypted storage to ensure the highest level of privacy, security, and compliance. Your trust and data safety are our top priority.
          </p>
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
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 24px 32px 24px",
          background: isDark
            ? "radial-gradient(circle at top, #020617 0%, #0f172a 100%)"
            : "radial-gradient(circle at 10% 20%, #f0f7ff 0%, #f8fafc 90%)",
          color: isDark ? "#f8fafc" : "#0f172a",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
            gap: 32,
            alignItems: "center",
          }}
        >
          {/* LEFT COLUMN: Main Text Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 999,
                background: isDark ? "rgba(37,99,235,0.15)" : "#eff6ff",
                border: "1px solid #bfdbfe",
                color: "#2563eb",
                fontSize: "0.82rem",
                fontWeight: 600,
                width: "fit-content",
              }}
            >
              <FaShieldAlt /> Trusted by Modern Healthcare Clinics
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)",
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              Automate Your Clinic. <br />
              Focus on{" "}
              <span style={{ color: "#2563eb", display: "inline-block" }}>
                Your Patients.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: "1rem",
                lineHeight: 1.5,
                color: isDark ? "#cbd5e1" : "#475569",
                maxWidth: 500,
                margin: 0,
              }}
            >
              EaseWorkflow automates scheduling, patient intake, insurance verification, documentation, and follow-ups so your team spends less time on admin and more time on what truly matters.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", marginTop: 4 }}
            >
              <a
                href="/booking"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 24px",
                  borderRadius: 999,
                  background: "#2563eb",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  boxShadow: "0 10px 25px rgba(37,99,235,0.3)",
                  transition: "transform 0.2s, background-color 0.2s",
                }}
              >
                <FaCalendarAlt /> Book Free Demo
              </a>

              <Link
                href="/case-studies"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 24px",
                  borderRadius: 999,
                  border: "1.5px solid #2563eb",
                  background: "transparent",
                  color: "#2563eb",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                }}
              >
                <FaPlay size={10} /> See Case Studies
              </Link>
            </motion.div>

            {/* Rating Stars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 2 }}
            >
              <div style={{ display: "flex", gap: 3, color: "#f59e0b", fontSize: "0.85rem" }}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span style={{ fontSize: "0.88rem", fontWeight: 600, color: isDark ? "#94a3b8" : "#64748b" }}>
                4.9 from 1,600+ verified reviews
              </span>
            </motion.div>

            {/* Bottom Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                gap: 10,
                paddingTop: 16,
                borderTop: isDark ? "1px solid #1e293b" : "1px solid #e2e8f0",
                marginTop: 6,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", fontWeight: 600 }}>
                <FaShieldAlt style={{ color: "#2563eb" }} /> HIPAA Compliant
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", fontWeight: 600 }}>
                <FaLink style={{ color: "#2563eb" }} /> Works with EMR
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", fontWeight: 600 }}>
                <FaLock style={{ color: "#2563eb" }} /> Secure & Encrypted
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", fontWeight: 600 }}>
                <FaHeadset style={{ color: "#2563eb" }} /> 24/7 Support
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Clean Hero Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              position: "relative",
              width: "100%",
              height: 440,
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.12)",
              border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
              background: "#ffffff",
            }}
          >
            <img
              src="/images/new hero.png"
              alt="Clinic Automation Platform"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </motion.div>
        </div>
      </section>

      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
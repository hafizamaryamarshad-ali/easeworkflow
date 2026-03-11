"use client";

import { motion } from "framer-motion";
import { FiSmartphone, FiDatabase, FiBell } from "react-icons/fi";

export default function HealthcareAutomationPage() {
  const features = [
    {
      title: "AI Appointment Scheduling",
      description: "Automate scheduling with AI to reduce no-shows and free up staff time for patient care.",
      icon: <FiSmartphone size={28} />,
    },
    {
      title: "EMR Optimization",
      description: "Streamline your EMR workflows, reduce errors, and ensure accurate patient records.",
      icon: <FiDatabase size={28} />,
    },
    {
      title: "Patient Notifications",
      description: "Automated reminders and follow-ups to enhance patient engagement and retention.",
      icon: <FiBell size={28} />,
    },
  ];

  return (
    <section
      style={{
        position: "relative",
        padding: "80px 20px",
        minHeight: "100vh",
        textAlign: "center",
        color: "#fff",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0f1c2c, #1f2a48, #2a3a6e, #00c6ff)", // static gradient
        backgroundSize: "cover",
      }}
    >
      {/* Tech Particle Layer */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none",
      }}>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          position: "relative",
          fontSize: "3rem",
          fontWeight: 900,
          marginBottom: "40px",
          background: "linear-gradient(90deg, #00c6ff, #0072ff)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        Healthcare Automation
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          position: "relative",
          fontSize: "1.2rem",
          lineHeight: 1.7,
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        Automate your clinic’s appointment scheduling, EMR workflows, and patient follow-ups. AI-driven automation ensures your staff focuses on care, not paperwork.
      </motion.p>

      <motion.div
        style={{ position: "relative", marginTop: "60px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}
      >
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, boxShadow: "0 25px 60px rgba(0,198,255,0.45)" }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            style={{
              position: "relative",
              minWidth: "250px",
              maxWidth: "300px",
              padding: "32px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(25px)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
              color: "#fff",
              overflow: "hidden",
            }}
          >
            {/* Floating Icon */}
            <motion.div
              style={{
                marginBottom: "12px",
                display: "inline-flex",
                padding: "12px",
                borderRadius: "50%",
                background: "rgba(0,198,255,0.2)",
                color: "#00c6ff",
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2 + i, repeat: Infinity }}
            >
              {item.icon}
            </motion.div>

            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "12px" }}>{item.title}</h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.5 }}>{item.description}</p>

            {/* Neon Border Glow on Hover */}
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: "20px",
              border: "2px solid rgba(0,198,255,0.2)",
              pointerEvents: "none",
              transition: "all 0.3s ease",
            }} className="cardBorder"></div>
          </motion.div>
        ))}
      </motion.div>

      <style jsx>{`
        /* Floating particles */
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #00c6ff;
          border-radius: 50%;
          top: calc(10% + 80 * var(--i));
          left: calc(20% + 60 * var(--i));
          opacity: 0.3;
          animation: particleMove 12s linear infinite;
        }
        @keyframes particleMove {
          0% { transform: translate(0,0); }
          50% { transform: translate(20px, -10px); }
          100% { transform: translate(0,0); }
        }
        /* Card border glow */
        .cardBorder:hover {
          border-color: #00c6ff;
          box-shadow: 0 0 15px #00c6ff;
        }
      `}</style>
    </section>
  );
}
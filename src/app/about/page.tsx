// app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import { FiCpu, FiGlobe, FiShield } from "react-icons/fi";

export default function AboutPage() {
  const cards = [
    {
      title: "Our Mission",
      description: "Revolutionize healthcare workflows with intelligent automation, helping clinics optimize efficiency and enhance patient care.",
      icon: <FiCpu size={28} />,
    },
    {
      title: "Our Vision",
      description: "Become the leading global healthcare automation partner, enabling seamless operations and exceptional patient outcomes.",
      icon: <FiGlobe size={28} />,
    },
    {
      title: "Our Values",
      description: "Innovation, integrity, and excellence drive us. Patient-centric solutions and continuous improvement guide everything we do.",
      icon: <FiShield size={28} />,
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
        background: "linear-gradient(135deg, #0f1c2c, #1f2a48, #2a3a6e, #00c6ff)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 35s ease infinite",
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
        About EaseWorkflow
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
        EaseWorkflow is a premium healthcare automation agency combining AI-driven solutions, EMR optimization, and intelligent workflow management.
        We help clinics save time, reduce errors, and elevate patient care while increasing operational efficiency.
      </motion.p>

      <motion.div
        style={{ position: "relative", marginTop: "60px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}
      >
        {cards.map((item, i) => (
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
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
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
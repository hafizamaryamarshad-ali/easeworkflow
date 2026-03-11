// app/contact/page.tsx
"use client";

import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function ContactPage() {
  const contacts = [
    { label: "Email", value: "info@easeworkflow.com", icon: <FiMail size={22} /> },
    { label: "Phone", value: "+1 234 567 890", icon: <FiPhone size={22} /> },
    { label: "Address", value: "123 AI Street, Tech City", icon: <FiMapPin size={22} /> },
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
        background: "linear-gradient(135deg, #1a1f36, #2a3a6e, #00c6ff, #0072ff)",
        backgroundSize: "200% 200%",
        animation: "gradientBG 60s ease infinite",
      }}
    >
      {/* Tech Particles */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="particle" style={{ "--i": i } as React.CSSProperties}></div>
        ))}
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
        Contact Us
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
        Have questions or want a free consultation? Reach out to us and our team will get back to you promptly.
      </motion.p>

      <motion.div
        style={{
          position: "relative",
          marginTop: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {contacts.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, boxShadow: "0 15px 40px rgba(0,198,255,0.45)" }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "20px 30px",
              borderRadius: "15px",
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
              color: "#fff",
              minWidth: "250px",
              maxWidth: "400px",
            }}
          >
            <span style={{ color: "#00c6ff" }}>{item.icon}</span>
            <p style={{ fontSize: "1rem", margin: 0 }}>
              <strong>{item.label}:</strong> {item.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <style jsx>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #00c6ff;
          border-radius: 50%;
          top: calc(10% + 60 * var(--i));
          left: calc(15% + 70 * var(--i));
          opacity: 0.3;
          animation: particleMove 12s linear infinite;
        }
        @keyframes particleMove {
          0% { transform: translate(0,0); }
          50% { transform: translate(20px, -10px); }
          100% { transform: translate(0,0); }
        }
      `}</style>
    </section>
  );
}
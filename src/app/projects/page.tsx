"use client";

import { motion } from "framer-motion";
import { FiCpu, FiServer, FiClipboard } from "react-icons/fi";

export default function ProjectsPage() {
  const projects = [
    {
      title: "AI Appointment System",
      description:
        "Developed a fully AI-driven appointment scheduler for a US clinic, reducing no-shows by 35% and optimizing staff time.",
      icon: <FiCpu size={28} />,
    },
    {
      title: "EMR Optimization",
      description:
        "Implemented EMR workflow automation, minimizing manual entry errors and accelerating patient data processing by 50%.",
      icon: <FiServer size={28} />,
    },
    {
      title: "Patient Notification System",
      description:
        "Created automated patient reminders and follow-ups, enhancing engagement and overall satisfaction scores.",
      icon: <FiClipboard size={28} />,
    },
    {
      title: "Analytics Dashboard",
      description:
        "Built a real-time dashboard for clinic operations, tracking KPIs and helping management make data-driven decisions.",
      icon: <FiServer size={28} />,
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
        Our Projects
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
        Explore our completed projects in healthcare automation. Each project showcases our expertise in AI-driven solutions, EMR optimization, and patient workflow management.
      </motion.p>

      <motion.div
        style={{
          position: "relative",
          marginTop: "60px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        {projects.map((project, i) => (
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
              {project.icon}
            </motion.div>

            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "12px" }}>{project.title}</h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.5 }}>{project.description}</p>

            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "20px",
                border: "2px solid rgba(0,198,255,0.2)",
                pointerEvents: "none",
                transition: "all 0.3s ease",
              }}
              className="cardBorder"
            ></div>
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
        .cardBorder:hover {
          border-color: #00c6ff;
          box-shadow: 0 0 15px #00c6ff;
        }
      `}</style>
    </section>
  );
}
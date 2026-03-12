"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiCpu, FiActivity, FiTrendingUp } from "react-icons/fi";

export default function BlogPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Detect body background theme
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const bg = getComputedStyle(document.body).background;
      if (bg.includes("linear-gradient")) setTheme("dark");
      else setTheme("light");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  const sectionBg = { dark: "linear-gradient(135deg, #0f1c2c, #1f2a48, #2a3a6e, #00c6ff)", light: "#f5f7fa" };
  const textColor = { dark: "#f8fafc", light: "#111" };
  const cardBg = { dark: "rgba(255,255,255,0.08)", light: "#ffffff" };
  const cardTextColor = { dark: "#fff", light: "#111" };
  const iconBg = { dark: "rgba(0,198,255,0.2)", light: "rgba(59,130,246,0.2)" };
  const iconColor = { dark: "#00c6ff", light: "#3b82f6" };
  const boxShadow = { dark: "0 16px 40px rgba(0,0,0,0.25)", light: "0 12px 28px rgba(0,0,0,0.1)" };
  const borderColor = { dark: "rgba(0,198,255,0.2)", light: "rgba(59,130,246,0.2)" };
  const borderHoverColor = { dark: "#00c6ff", light: "#3b82f6" };

  const articles = [
    {
      title: "AI in Patient Scheduling",
      description:
        "Explore how AI-powered scheduling reduces missed appointments and optimizes clinic workflow efficiency.",
      icon: <FiCpu size={28} />,
    },
    {
      title: "Streamlining EMR Systems",
      description:
        "Learn how modern EMR automation improves record accuracy, reduces errors, and saves valuable staff time.",
      icon: <FiActivity size={28} />,
    },
    {
      title: "Boosting Clinic Revenue with Tech",
      description:
        "Case studies on how automation and AI analytics can increase revenue and enhance patient experience.",
      icon: <FiTrendingUp size={28} />,
    },
  ];

  return (
    <section
      style={{
        position: "relative",
        padding: "80px 20px",
        minHeight: "100vh",
        textAlign: "center",
        color: textColor[theme],
        overflow: "hidden",
        background: sectionBg[theme],
        backgroundSize: "400% 400%",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        transition: "all 0.5s ease",
      }}
    >
      {/* Tech Particle Layer */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="particle" style={{ "--i": i.toString(), background: iconColor[theme] } as React.CSSProperties}></div>
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
          fontFamily: "'Roboto', sans-serif",
          background: theme === "dark" ? "linear-gradient(90deg, #00c6ff, #0072ff)" : "none",
          WebkitBackgroundClip: theme === "dark" ? "text" : "unset",
          color: theme === "dark" ? "transparent" : "#111",
          transition: "all 0.5s ease",
        }}
      >
        Blog
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ position: "relative", fontSize: "1.2rem", lineHeight: 1.7, maxWidth: "800px", margin: "auto", color: textColor[theme] }}
      >
        Stay updated with the latest insights on healthcare automation, AI-driven clinic management, and workflow optimization.
      </motion.p>

      <motion.div style={{ position: "relative", marginTop: "60px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
        {articles.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              boxShadow: theme === "dark" ? "0 25px 60px rgba(0,198,255,0.45)" : "0 20px 50px rgba(59,130,246,0.35)",
            }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            style={{
              position: "relative",
              minWidth: "250px",
              maxWidth: "300px",
              padding: "32px",
              borderRadius: "20px",
              background: cardBg[theme],
              backdropFilter: theme === "dark" ? "blur(25px)" : "none",
              boxShadow: boxShadow[theme],
              color: cardTextColor[theme],
              overflow: "hidden",
              transition: "all 0.5s ease",
              cursor: "pointer",
            }}
          >
            <motion.div
              style={{
                marginBottom: "12px",
                display: "inline-flex",
                padding: "12px",
                borderRadius: "50%",
                background: iconBg[theme],
                color: iconColor[theme],
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2 + i, repeat: Infinity }}
            >
              {item.icon}
            </motion.div>

            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "12px", color: cardTextColor[theme] }}>
              {item.title}
            </h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.5, color: cardTextColor[theme] }}>{item.description}</p>

            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "20px",
                border: `2px solid ${borderColor[theme]}`,
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
          100% { background-position: 0 50%; }
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
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

        .cardBorder:hover {
          border-color: ${borderHoverColor[theme]};
          box-shadow: 0 0 15px ${borderHoverColor[theme]};
        }
      `}</style>
    </section>
  );
}
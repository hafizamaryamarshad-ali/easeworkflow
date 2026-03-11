"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStethoscope, FaPills, FaHeart, FaSyringe } from "react-icons/fa";

export default function Hero() {
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; opacity: number }[]>([]);

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
    { Icon: FaStethoscope, size: 60, top: "10%", left: "5%", speed: 10 },
    { Icon: FaPills, size: 50, top: "30%", left: "50%", speed: 7 },
    { Icon: FaHeart, size: 70, top: "70%", left: "10%", speed: 12 },
    { Icon: FaSyringe, size: 55, top: "50%", left: "80%", speed: 9 },
  ];

  return (
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
        textAlign: "center",

        backgroundImage: `linear-gradient(45deg, #0f172a, #1e293b, #334155)`, // Colors unchanged
        backgroundSize: "600% 600%",
        color: "#f8fafc",
      }}
    >
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
            background: "#0ea5e9",
            boxShadow: "0 0 4px #0ea5e9, 0 0 12px #3b82f6", // subtle tech glow
            opacity: p.opacity,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Headline */}
      <motion.h1
         initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  style={{
    fontSize: "3rem",
    fontWeight: 900,
    lineHeight: "1.2",
    maxWidth: "900px",
    zIndex: 2,
    // textShadow removed
  }}
>
        Automate Your Clinic. Maximize Efficiency.
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          fontSize: "1.25rem",
          marginTop: "20px",
          maxWidth: "700px",
          lineHeight: "1.5",
          color: "#cbd5e1",
          zIndex: 2,
          textShadow: "0 0 6px rgba(0,198,255,0.2)",
        }}
      >
        EaseWorkflow provides smart healthcare automation solutions that save
        time, reduce errors, and help your clinic scale internationally.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{
          marginTop: "40px",
          display: "flex",
          gap: "24px",
          flexWrap: "wrap",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <a
          href="/contact"
          style={{
            padding: "14px 32px",
            fontWeight: 700,
            fontSize: "1rem",
            borderRadius: "24px",
            background: "linear-gradient(90deg,#0ea5e9,#3b82f6)",
            color: "#f8fafc",
            textDecoration: "none",
            boxShadow: "0 12px 28px rgba(0,198,255,0.35)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 20px #0ea5e9, 0 0 40px #3b82f6")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,198,255,0.35)")
          }
        >
          Book Free Consultation
        </a>

        <a
          href="/services"
          style={{
            padding: "14px 32px",
            fontWeight: 700,
            fontSize: "1rem",
            borderRadius: "24px",
            border: "2px solid #0ea5e9",
            background: "transparent",
            color: "#0ea5e9",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#0ea5e9";
            e.currentTarget.style.color = "#f8fafc";
            e.currentTarget.style.boxShadow = "0 0 20px #0ea5e9, 0 0 40px #3b82f6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#0ea5e9";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Explore Services
        </a>
      </motion.div>

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
            opacity: 0.25,
            pointerEvents: "none",
            color: "#0ea5e9",
            textShadow: "0 0 12px #0ea5e9, 0 0 24px #3b82f6",
          }}
        >
          <icon.Icon />
        </motion.div>
      ))}
    </section>
  );
}
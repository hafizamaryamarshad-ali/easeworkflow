"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { FaStethoscope, FaPills, FaHeart, FaSyringe } from "react-icons/fa";
import Link from "next/link";

export default function CTA() {
  const [gradientPos, setGradientPos] = useState(0);
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; opacity: number }[]>([]);

  // Animate gradient
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPos((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Floating particles
  useEffect(() => {
    const temp: typeof particles = [];
    for (let i = 0; i < 30; i++) {
      temp.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        opacity: 0.1 + Math.random() * 0.2,
      });
    }
    setParticles(temp);
  }, []);

  const floatingIcons = [
    { Icon: FaStethoscope, size: 50, top: "15%", left: "10%", speed: 10 },
    { Icon: FaPills, size: 40, top: "40%", left: "60%", speed: 7 },
    { Icon: FaHeart, size: 60, top: "75%", left: "20%", speed: 12 },
    { Icon: FaSyringe, size: 45, top: "50%", left: "80%", speed: 9 },
  ];

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "60px 20px",
        color: "#ffffff",
        background: `linear-gradient(${gradientPos}deg,#0ea5e9,#3b82f6)`,
        transition: "background 0.5s linear",
      }}
    >
      {/* Background particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, x: 0 }}
          animate={{ y: ["0%", "-20%", "0%"], x: ["0%", "10%", "0%"] }}
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
            background: "#ffffff",
            opacity: p.opacity,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "clamp(2rem, 4.5vw, 2.8rem)",
          fontWeight: 900,
          marginBottom: "20px",
          maxWidth: "800px",
          color: "#ffffff",
          textShadow: "1px 1px 8px rgba(0,0,0,0.4)",
          zIndex: 2,
        }}
      >
        Ready to Transform Your Clinic?
      </motion.h2>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          fontSize: "clamp(1.05rem, 3.2vw, 1.25rem)",
          marginBottom: "40px",
          maxWidth: "700px",
          lineHeight: "1.5",
          color: "#e0f2fe",
          textShadow: "0.5px 0.5px 6px rgba(0,0,0,0.3)",
          zIndex: 2,
        }}
      >
        Join forward-thinking clinics using EaseWorkflow to save time, reduce errors, and scale internationally.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{
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
            padding: "16px 36px",
            fontWeight: 700,
            fontSize: "1rem",
            borderRadius: "24px",
            background: "#ffffff",
            color: "#0ea5e9",
            textDecoration: "none",
            boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 16px 36px rgba(0,0,0,0.5)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.35)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Book Free Consultation
        </a>

        <Link
          href="/projects"
          style={{
            padding: "16px 36px",
            fontWeight: 700,
            fontSize: "1rem",
            borderRadius: "24px",
            border: "2px solid #ffffff",
            background: "transparent",
            color: "#ffffff",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.color = "#0ea5e9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#ffffff";
          }}
        >
          See Live Projects
        </Link>
      </motion.div>

      {/* Floating doctor icons */}
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
            opacity: 0.15,
            pointerEvents: "none",
            color: "#ffffff",
          }}
        >
          <icon.Icon />
        </motion.div>
      ))}
    </section>
  );
}
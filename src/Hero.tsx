"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStethoscope, FaPills, FaHeart, FaSyringe } from "react-icons/fa";
import Link from "next/link";
import { useTheme } from "./theme/ThemeProvider";

export default function Hero() {
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; opacity: number }[]>([]);
  const { theme } = useTheme();

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
    { Icon: FaStethoscope, size: 68, top: "8%",  left: "6%",  speed: 11, opacity: 0.18 },
    { Icon: FaPills,       size: 46, top: "22%", left: "92%", speed: 8,  opacity: 0.13 },
    { Icon: FaHeart,       size: 75, top: "78%", left: "4%",  speed: 13, opacity: 0.16 },
    { Icon: FaSyringe,     size: 54, top: "85%", left: "88%", speed: 9,  opacity: 0.14 },
    { Icon: FaStethoscope, size: 42, top: "45%", left: "2%",  speed: 10, opacity: 0.11 },
    { Icon: FaPills,       size: 38, top: "60%", left: "94%", speed: 12, opacity: 0.12 },
    { Icon: FaHeart,       size: 50, top: "15%", left: "88%", speed: 14, opacity: 0.15 },
  ];

  const bgColors = {
    dark: "var(--bg-gradient-dark)",
    light: "#f5f7fa",
  };
  const textColors = {
    dark: "#f8fafc",
    light: "#0f172a",
  };
  const subTextColors = {
    dark: "#cbd5e1",
    light: "#1e293b",
  };
  const btnGradient = {
    dark: "linear-gradient(90deg,#0ea5e9,#3b82f6)",
    light: "linear-gradient(90deg,#3b82f6,#60a5fa)",
  };
  const btnOutlineColor = {
    dark: "#0ea5e9",
    light: "#3b82f6",
  };

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
        backgroundColor: theme === "dark" ? "#0f172a" : bgColors.light,
        backgroundImage: theme === "dark" ? bgColors.dark : "none",
        backgroundSize: "600% 600%",
        color: textColors[theme],
        transition: "all 0.5s ease",
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
            boxShadow: "0 0 4px #0ea5e9, 0 0 12px #3b82f6",
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
          fontSize: "clamp(2.4rem, 6vw, 4rem)",
          fontWeight: 900,
          lineHeight: "1.2",
          maxWidth: "900px",
          zIndex: 2,
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
          fontSize: "clamp(1.05rem, 3.2vw, 1.25rem)",
          marginTop: "20px",
          maxWidth: "700px",
          lineHeight: "1.5",
          color: subTextColors[theme],
          zIndex: 2,
          textShadow: theme === "dark" ? "0 0 6px rgba(0,198,255,0.2)" : "none",
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
            background: btnGradient[theme],
            color: textColors[theme],
            textDecoration: "none",
            boxShadow: theme === "dark" ? "0 12px 28px rgba(0,198,255,0.35)" : "0 12px 28px rgba(59,130,246,0.35)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = theme === "dark"
              ? "0 0 20px #0ea5e9, 0 0 40px #3b82f6"
              : "0 0 20px #3b82f6, 0 0 40px #60a5fa")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = theme === "dark"
              ? "0 12px 28px rgba(0,198,255,0.35)"
              : "0 12px 28px rgba(59,130,246,0.35)")
          }
        >
          Book Free Consultation
        </a>

        <Link
	      href="#services"
          style={{
            padding: "14px 32px",
            fontWeight: 700,
            fontSize: "1rem",
            borderRadius: "24px",
            border: `2px solid ${btnOutlineColor[theme]}`,
            background: "transparent",
            color: theme === "dark" ? "#0ea5e9" : "#3b82f6",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("services");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme === "dark" ? "#0ea5e9" : "#3b82f6";
            e.currentTarget.style.color = theme === "dark" ? "#f8fafc" : "#f9fafb";
            e.currentTarget.style.boxShadow = theme === "dark"
              ? "0 0 20px #0ea5e9, 0 0 40px #3b82f6"
              : "0 0 20px #3b82f6, 0 0 40px #60a5fa";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = theme === "dark" ? "#0ea5e9" : "#3b82f6";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Explore Services
        </Link>
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
            opacity: icon.opacity,
            pointerEvents: "none",
            color: theme === "dark" ? "#0ea5e9" : "#3b82f6",
            textShadow: theme === "dark" ? "0 0 12px #0ea5e9, 0 0 24px #3b82f6" : "none",
          }}
        >
          <icon.Icon />
        </motion.div>
      ))}
    </section>
  );
}
"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import {
  FaUserMd,
  FaHospital,
  FaClock,
  FaCheckCircle,
  FaEye,
  FaLinkedin,
  FaGithub,
  FaNetworkWired,
  FaShieldAlt,
  FaClinicMedical,
} from "react-icons/fa";

// --- COUNTER COMPONENT ---
type CounterProps = { value: string; duration?: number };
const Counter = ({ value, duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.replace(/[,+]/g, ""));
      if (start === end) return;
      let timer = setInterval(() => {
        start += Math.ceil(end / 60); 
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{value.includes("+") ? "+" : value.includes("%") ? "%" : ""}</span>;
};

export default function AboutPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const accentColor = isDark ? "#0ea5e9" : "#3b82f6";
  const colors = {
    bgImage: isDark ? "var(--bg-gradient-dark)" : "none",
    bgColor: isDark ? "#0f172a" : "#f5f7fa", 
    text: isDark ? "#f8fafc" : "#0f172a",
    subText: isDark ? "#cbd5e1" : "#1e293b",
    cardBg: isDark ? "rgba(255,255,255,0.03)" : "#f9fafb",
    cardBorder: isDark ? "rgba(14, 165, 233, 0.2)" : "rgba(59, 130, 246, 0.1)",
    glow: isDark ? "0 12px 28px rgba(0,198,255,0.25)" : "0 12px 28px rgba(59,130,246,0.15)"
  };

  const stats = [
    { label: "Years Experience", value: "10+", icon: <FaClock /> },
    { label: "Patients Served", value: "10,000+", icon: <FaUserMd /> },
    { label: "Satisfaction", value: "100%", icon: <FaCheckCircle /> },
  { label: "Clinics Integrated", value: "30+", icon: <FaHospital /> },
  ];

  const coreValues = [
    { title: "Innovation", desc: "Pushing technological boundaries to transform healthcare.", icon: "⚡" },
    { title: "Integrity", desc: "Transparency and ethical principles guide every line of code.", icon: "🛡️" },
    { title: "Collaboration", desc: "Working hand-in-hand with medical experts to co-create.", icon: "🤝" },
    { title: "Excellence", desc: "Setting industry benchmarks through superior engineering.", icon: "💎" },
    { title: "User-First", desc: "Built around the clinician's actual daily needs.", icon: "👤" },
    { title: "Security", desc: "Enterprise-grade protection for sensitive medical data.", icon: "🔒" }
  ];

  const cardStyle = {
    padding: "28px 26px",
    borderRadius: "30px",
    background: isDark
      ? "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.85))"
      : "linear-gradient(135deg, rgba(249,250,251,0.96), rgba(226,232,240,0.9))",
    border: `1px solid ${colors.cardBorder}`,
    boxShadow: colors.glow,
    display: "flex",
    flexDirection: "column" as const,
    height: "100%",
    position: "relative" as const,
    overflow: "hidden" as const,
    transition:
      "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease",
  };

  // Motion variants and parallax for the founder + vision block
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0 },
  };

  const founderRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: founderRef,
    offset: ["start 80%", "end 20%"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const textY = useTransform(scrollYProgress, [0, 1], [10, -30]);

  return (
    <div style={{ 
      backgroundColor: colors.bgColor, 
      backgroundImage: colors.bgImage,
      backgroundSize: "600% 600%",
      color: colors.text, 
      minHeight: "100vh", 
      fontFamily: "'Inter', sans-serif", 
      transition: "all 0.5s ease",
      paddingBottom: "100px"
    }}>
      
      {/* --- HERO SECTION --- */}
      <section style={{ padding: "100px 20px 60px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: accentColor, fontWeight: 800, letterSpacing: "5px", textTransform: "uppercase", fontSize: "0.75rem", marginBottom: "15px" }}>
          The Spirit of Innovation
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 900, lineHeight: "1.1", letterSpacing: "-2px" }}>
          Leading the <span style={{ color: accentColor, textShadow: isDark ? `0 0 20px ${accentColor}` : "none" }}>MedTech</span> Frontier
        </motion.h1>
      </section>

      {/* --- STATS BAR --- */}
      <section style={{ maxWidth: "1100px", margin: "0 auto 80px", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "25px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ 
              padding: "35px", background: colors.cardBg, borderRadius: "28px", border: `1px solid ${colors.cardBorder}`, 
              textAlign: "center", boxShadow: colors.glow, backdropFilter: "blur(10px)" 
            }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: colors.text }}><Counter value={s.value} /></div>
              <p style={{ color: colors.subText, fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700, marginTop: "8px", letterSpacing: "1px" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- ULTRA-PREMIUM CINEMATIC EXPERIENCE --- */}
      <section
        className="about-founder-section"
        style={{
          maxWidth: "1400px",
          margin: "180px auto",
          padding: "0 40px",
          position: "relative",
        }}
      >
        {/* 1. FOUNDER: THE CINEMATIC SILHOUETTE */}
        <motion.div
          ref={founderRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="about-founder-layout"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "60px",
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          {/* Floating Ambient Glows */}
          <motion.div
            className="about-founder-ambient"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{
              position: "absolute",
              width: "800px",
              height: "800px",
              background: `radial-gradient(circle, ${accentColor} 0%, transparent 60%)`,
              top: "-200px",
              left: "-200px",
              filter: "blur(120px)",
              zIndex: 0,
            }}
          />

          <motion.div
            variants={itemVariants}
            className="about-founder-image-col"
            style={{
              position: "relative",
              flex: "1 1 500px",
              zIndex: 2,
              y: imageY,
            }}
          >
            {/* Ambient Neon Halos behind the image */}
            <motion.div
              className="about-founder-halo about-founder-halo--primary"
              animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: "-15% -10%",
                background: `radial-gradient(circle at 30% 20%, ${accentColor}55 0%, transparent 60%)`,
                filter: "blur(100px)",
                zIndex: 0,
              }}
            />
            <motion.div
              className="about-founder-halo about-founder-halo--secondary"
              animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.25, 0.6, 0.25] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: "0 -20% 10% -20%",
                background: `radial-gradient(circle at 70% 80%, ${accentColor}66 0%, transparent 65%)`,
                filter: "blur(60px)",
                zIndex: 0,
              }}
            />

            {/* The "Masked" Founder Image */}
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              className="about-founder-image-shell"
              style={{
                width: "100%",
                maxWidth: "550px",
                height: "650px",
                borderRadius:
                  "60% 40% 70% 30% / 40% 50% 60% 70%",
                backgroundImage: "url(/images/profile12.png)",
                backgroundSize: "cover",
                backgroundPosition: "top",
                border: `1px solid ${accentColor}33`,
                boxShadow: `inset 0 0 50px ${accentColor}22, 0 40px 100px -20px rgba(0,0,0,0.8)` ,
                position: "relative",
                overflow: "hidden",
                zIndex: 1,
              }}
            >
              {/* Image fade into background at the bottom */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(to bottom, transparent 45%, ${colors.bgColor} 100%)`,
                }}
              />
            </motion.div>

            {/* Floating Meta Info */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                position: "absolute",
                bottom: "10%",
                right: "-30px",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                padding: "20px 30px",
                borderRadius: "24px",
                border: `1px solid ${accentColor}44`,
                boxShadow: `0 20px 40px rgba(0,0,0,0.4)`,
                zIndex: 3,
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  color: accentColor,
                  fontWeight: 800,
                  letterSpacing: "2px",
                }}
              >
                ENGINEERED BY
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                Innovation Hub
              </div>
            </motion.div>
          </motion.div>

          {/* Typography & Content */}
          <motion.div
            variants={itemVariants}
            className="about-founder-text-col"
            style={{ flex: "1 1 500px", zIndex: 3, y: textY }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              style={{
                fontSize: "clamp(4.6rem, 8vw, 6.8rem)",
                fontWeight: 950,
                lineHeight: 0.85,
                letterSpacing: "-4px",
                margin: 0,
                color: colors.text,
              }}
            >
              The
              {" "}
              <span
                style={{
                  color: "transparent",
                  WebkitTextStroke: `1px ${accentColor}88`,
                }}
              >
                Vision
              </span>
              <br />
              Behind <span style={{ color: accentColor }}>Ease</span>
            </motion.h2>

            <p
              style={{
                fontSize: "1.5rem",
                color: colors.subText,
                lineHeight: 1.6,
                marginTop: "40px",
                maxWidth: "500px",
                fontWeight: 300,
                letterSpacing: "-0.5px",
              }}
            >
              Muhammad Umer is building the
              {" "}
              <b style={{ color: colors.text }}>next generation</b>
              {" "}
              of healthcare automation—where technology feels invisible and
              care feels human.
            </p>

            <div
              className="about-founder-meta-stats"
              style={{ marginTop: "50px", display: "flex", gap: "40px" }}
            >
              {[
                { val: "10+", lab: "Patents" },
                { val: "50+", lab: "Systems" },
              ].map((stat, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: 900,
                      color: accentColor,
                    }}
                  >
                    {stat.val}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: colors.subText,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    {stat.lab}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* 2. VISION: THE MINIMALIST BENTO STRIP */}
        <div
          className="about-vision-grid"
          style={{
            marginTop: "150px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "26px",
            padding: "2px",
          }}
        >
          {[
            {
              t: "Connected",
              d: "Seamless API integrations",
              i: <FaNetworkWired />,
            },
            {
              t: "Predictable",
              d: "Zero-error workflows",
              i: <FaShieldAlt />,
            },
            {
              t: "Scalable",
              d: "Multi-clinic synchronization",
              i: <FaHospital />,
            },
          ].map((v, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                y: -6,
                background: `${accentColor}18`,
                boxShadow: `0 0 40px ${accentColor}33`,
              }}
              style={{
                padding: "42px 34px",
                textAlign: "center",
                transition: "0.45s ease",
                background: isDark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(15,23,42,0.03)",
                borderRadius: "32px",
                border: `1px solid ${accentColor}22`,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: 4 }}
                style={{
                  fontSize: "2.5rem",
                  color: accentColor,
                  marginBottom: "20px",
                  filter: `drop-shadow(0 0 20px ${accentColor}66)`,
                }}
              >
                {v.i}
              </motion.div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  marginBottom: "10px",
                }}
              >
                {v.t}
              </h3>
              <p
                style={{ color: colors.subText, fontSize: "1rem" }}
              >
                {v.d}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="about-values-section" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <h2
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3rem)",
            fontWeight: 900,
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          Core Values
        </h2>
        <div className="about-values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px" }}>
          {coreValues.map((v, i) => (
            <motion.div key={i} whileHover={{ y: -10, borderColor: accentColor, boxShadow: colors.glow }} style={{ 
              padding: "40px", borderRadius: "32px", background: colors.cardBg, border: `1px solid ${colors.cardBorder}`, 
              textAlign: "center", transition: "all 0.3s ease", backdropFilter: "blur(10px)"
            }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "20px" }}>{v.icon}</div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "12px" }}>{v.title}</h3>
              <p style={{ color: colors.subText, lineHeight: "1.7", fontSize: "0.95rem" }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
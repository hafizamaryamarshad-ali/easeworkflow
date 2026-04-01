"use client";

import { motion } from "framer-motion";
import { FaRobot, FaCalendarAlt, FaVideo, FaCogs } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const services = [
  {
    title: "EMR Integration",
    icon: <FaRobot />,
    img: "/images/1st card.png",
    desc: "Secure and centralized patient records with AI-powered insights for better decisions.",
  },
  {
    title: "Smart Scheduling",
    icon: <FaCalendarAlt />,
    img: "/images/2nd card.png",
    desc: "Automated bookings, reminders, and optimized patient flow management.",
  },
  {
    title: "Telemedicine",
    icon: <FaVideo />,
    img: "/images/3rd card.png",
    desc: "Seamless virtual consultations with secure and reliable communication.",
  },
  {
    title: "Workflow Automation",
    icon: <FaCogs />,
    img: "images/4th card.png",
    desc: "End-to-end automation to boost productivity and reduce human errors.",
  },
  {
    title: "AI Diagnostics",
    icon: <FaRobot />,
    img: "/images/5th card.png",
    desc: "AI-powered disease detection and early diagnosis support for doctors.",
  },
  {
    title: "Health Analytics",
    icon: <FaCogs />,
    img: "/images/6th card.png",
    desc: "Advanced data insights to track patient trends and improve care quality.",
  },
];

export default function ServicesDetails() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedCard, setSelectedCard] = useState(null);
    const router = useRouter(); // Added router for navigation

  const [count, setCount] = useState({
    exp: 0,
    patients: 0,
    sat: 0,
  });

  useEffect(() => {
    let start = 0;

    const interval = setInterval(() => {
      start += 1;

      setCount({
        exp: Math.min(10, start),
        patients: Math.min(10000, start * 400),
        sat: Math.min(99, start * 4),
      });

      if (start >= 25) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const technologies = [
    { name: "ReactJS", cat: "Frontend" },
    { name: "Next.js", cat: "Frontend" },
    { name: "Tailwind CSS", cat: "Frontend" },
    { name: "JavaScript", cat: "Frontend" },
    { name: "NodeJS", cat: "Backend" },
    { name: "Django", cat: "Backend" },
    { name: "Flask", cat: "Backend" },
    { name: "GraphQL", cat: "Backend" },
    { name: "Docker", cat: "DevOps" },
    { name: "Kubernetes", cat: "DevOps" },
    { name: "AWS", cat: "Cloud" },
    { name: "Firebase", cat: "Cloud" },
    { name: "Figma", cat: "Design" },
    { name: "Adobe XD", cat: "Design" },
    { name: "SEO", cat: "Marketing" },
    { name: "Google Analytics", cat: "Marketing" },
    { name: "IoT Platforms", cat: "IoT" },
  ];

  return (
    <section
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text-primary)",
        paddingTop: "60px",
      }}
    >
      {/* HERO */}
      <div style={{ textAlign: "center", padding: "80px 20px 60px" }}>
        <h1 style={{ fontSize: "3.2rem", fontWeight: 800 }}>
          Transforming Healthcare with AI
        </h1>

        <p style={{ opacity: 0.65, marginTop: "10px" }}>
          Powerful, scalable, and intelligent healthcare solutions.
        </p>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          flexWrap: "wrap",
          marginBottom: "70px",
        }}
      >
        {[
          { num: `${count.exp}+`, label: "Years Experience" },
          { num: `${count.patients.toLocaleString()}+`, label: "Patients Served" },
          { num: `${count.sat}%`, label: "Satisfaction" },
        ].map((item, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "2.3rem", color: "#0ea5e9" }}>
              {item.num}
            </h2>
            <p style={{ opacity: 0.6 }}>{item.label}</p>
          </div>
        ))}
      </div>

      {/* SERVICES CARDS (WOW STYLE) */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "30px",
          padding: "0 20px",
        }}
      >
        {services.map((item, i) => {
          const isActive = selectedCard === i;

          return (
            <motion.div
              key={i}
              onClick={() => setSelectedCard(i)}
              whileHover={{ y: -14, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              animate={{
                boxShadow: isActive
                  ? "0 0 30px rgba(14,165,233,0.6)"
                  : "0 25px 80px rgba(0,0,0,0.6)",
              }}
              style={{
                position: "relative",
                padding: "26px",
                borderRadius: "24px",
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(22px)",
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              {/* glow */}
              <div
                style={{
                  position: "absolute",
                  top: "-60px",
                  right: "-60px",
                  width: "160px",
                  height: "160px",
                  background:
                    "radial-gradient(circle, rgba(14,165,233,0.35), transparent 70%)",
                  filter: "blur(18px)",
                }}
              />

              {/* image */}
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  marginBottom: "14px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                }}
              />

              {/* icon */}
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(14,165,233,0.15)",
                  border: "1px solid rgba(14,165,233,0.4)",
                  color: "#0ea5e9",
                  fontSize: "22px",
                  marginBottom: "12px",
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 900,
                  marginBottom: "8px",
                }}
              >
                {item.title}
              </h3>

              <p style={{ opacity: 0.7, fontSize: "0.92rem", lineHeight: "1.6" }}>
                {item.desc}
              </p>

              <div
                style={{
                  marginTop: "16px",
                  width: "70px",
                  height: "4px",
                  borderRadius: "20px",
                  background: "linear-gradient(90deg, #0ea5e9, transparent)",
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* TECHNOLOGIES */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "100px auto",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h2 style={{ fontSize: "2.5rem", fontWeight: 800 }}>Technologies</h2>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {[
            "All",
            "Frontend",
            "Backend",
            "DevOps",
            "Cloud",
            "Design",
            "Marketing",
            "IoT",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                background: activeTab === tab ? "#0ea5e9" : "#222",
                color: "#fff",
                border: "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          {technologies
            .filter((t) => activeTab === "All" || t.cat === activeTab)
            .map((tech, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08 }}
                style={{
                  padding: "10px 20px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {tech.name}
              </motion.div>
            ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>
          Ready to Transform Your Healthcare System?
        </h2>
<motion.button
  whileHover={{ 
    scale: 1.05,
    boxShadow: "0 0 25px rgba(14, 165, 233, 0.6), 0 0 50px rgba(56, 189, 248, 0.3)" 
  }}
  whileTap={{ scale: 0.95 }}
    onClick={() => router.push("/contact")}
  style={{
    marginTop: "25px",
    padding: "16px 40px",
    background: "linear-gradient(90deg, #0ea5e9, #3b82f6)",
    borderRadius: "50px",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    fontSize: "1.1rem",
    fontWeight: 800,
    letterSpacing: "1px",
    textTransform: "uppercase",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 30px rgba(14, 165, 233, 0.3)",
  }}
>
  {/* Shine Animation Effect */}
  <motion.div
    initial={{ x: "-100%" }}
    animate={{ x: "200%" }}
    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "50%",
      height: "100%",
      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
      transform: "skewX(-25deg)",
    }}
  />

  <span style={{ position: "relative", zIndex: 1 }}>Initiate Transformation</span>
  
  {/* Small arrow icon for extra touch */}
  <motion.span 
    animate={{ x: [0, 5, 0] }} 
    transition={{ repeat: Infinity, duration: 1.5 }}
    style={{ fontSize: "1.2rem" }}
  >
    →
  </motion.span>
</motion.button>

      </div>
      {/* MODAL (YOUR EXACT FORM) */}
{open && (
  <div
    onClick={() => setOpen(false)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.65)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
      padding: "20px",
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "100%",
        maxWidth: "520px",
        maxHeight: "85vh",
        background: "#0f172a",
        borderRadius: "18px",
        padding: "26px",
        boxShadow: "0 30px 90px rgba(0,0,0,0.6)",
        position: "relative",
        overflowY: "auto",
        border: "1px solid rgba(56,189,248,0.3)",
      }}
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={() => setOpen(false)}
        style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          border: "none",
          background: "#38bdf8",
          color: "#000",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      {/* HEADING */}
      <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "6px" }}>
        Get in Touch
      </h2>

      <p style={{ fontSize: "0.9rem", opacity: 0.75 }}>
        Have an idea? Let’s turn it into a powerful solution.
      </p>

      {/* TAGS */}
      <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {[
          "Workflow Automation",
          "AI Process Automation",
          "Smart Scheduling",
          "Robotic Automation",
          "Healthcare Automation",
          "Data Automation",
          "System Integration",
          "End-to-End Automation",
        ].map((item, i) => (
          <span
            key={i}
            style={{
              padding: "6px 12px",
              borderRadius: "999px",
              border: "1px solid #38bdf8",
              fontSize: "0.78rem",
              color: "#38bdf8",
            }}
          >
            {item}
          </span>
        ))}
      </div>

      {/* FORM */}
      <form
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
        }}
      >
        <div style={{ gridColumn: "span 2" }}>
          <input
            placeholder="Name"
            style={{
              width: "100%",
              padding: "10px 0",
              border: "none",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              outline: "none",
              color: "#fff",
            }}
          />
        </div>

        <input
          placeholder="Email"
          style={{
            width: "100%",
            padding: "10px 0",
            border: "none",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
            outline: "none",
            color: "#fff",
          }}
        />

        <input
          placeholder="Phone"
          style={{
            width: "100%",
            padding: "10px 0",
            border: "none",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
            outline: "none",
            color: "#fff",
          }}
        />

        <div style={{ gridColumn: "span 2" }}>
          <textarea
            placeholder="Message"
            rows={4}
            style={{
              width: "100%",
              padding: "10px 0",
              border: "none",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              outline: "none",
              resize: "none",
              color: "#fff",
            }}
          />
        </div>

        <div style={{ gridColumn: "span 2" }}>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: "none",
              background: "#38bdf8",
              fontWeight: 700,
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Send Message
          </button>
        </div>
      </form>

      <p style={{ marginTop: "16px", fontSize: "0.85rem", opacity: 0.7 }}>
        We look forward to hearing from you!
      </p>
    </div>
  </div>
)}
      
    </section>
  );
}
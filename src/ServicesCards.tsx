"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRobot, FaCalendarAlt, FaVideo } from "react-icons/fa";
import { useRouter } from "next/navigation";

const services = [
  {
    title: "EMR Integration",
    description:
      "Centralize patient data with secure, real-time EMR integration for better clinical decisions and efficiency.",
    points: ["Real-time patient records", "Secure data sync", "AI-assisted insights"],
    image: "/images/our-services.png",
    icon: <FaRobot />,
  },
  {
    title: "Smart Scheduling",
    description:
      "Automated scheduling and follow-ups to reduce manual effort and optimize patient flow.",
    points: ["Auto reminders", "Smart booking", "Reduced no-shows"],
    image: "/images/schedulingg.png",
    icon: <FaCalendarAlt />,
  },
  {
    title: "Telemedicine",
    description:
      "Deliver seamless remote consultations with secure and reliable communication.",
    points: ["Video consultations", "Secure calls", "Instant access"],
    image: "/images/our-services.png",
    icon: <FaVideo />,
  },
];

export default function Services() {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      style={{
        padding: "110px 20px",
        background: "var(--color-bg)",
        color: "var(--color-text-primary)",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "70px" }}>
        <h2 style={{ fontSize: "3rem", fontWeight: 800 }}>Our Services</h2>
        <p style={{ opacity: 0.6, marginTop: "10px" }}>
          AI-powered healthcare solutions built for efficiency
        </p>
      </div>

      {/* CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
          gap: "30px",
          maxWidth: "1100px",
          margin: "0 auto 90px",
        }}
      >
        {services.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -12, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
            style={{
              position: "relative",
              padding: "32px",
              borderRadius: "26px",

              /* 🔥 NEW LIGHT BLUE GLOW STYLE */
              background:
                "linear-gradient(145deg, rgba(14,165,233,0.18), rgba(14,165,233,0.05))",

              border: "1px solid rgba(14,165,233,0.25)",

              backdropFilter: "blur(18px)",

              boxShadow:
                "0 10px 40px rgba(14,165,233,0.15), 0 20px 60px rgba(0,0,0,0.25)",

              overflow: "hidden",
              cursor: "pointer",
              textAlign: "left",
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
                  "radial-gradient(circle, rgba(14,165,233,0.4), transparent 70%)",
                filter: "blur(25px)",
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
                marginBottom: "16px",
              }}
            >
              {item.icon}
            </div>

            {/* title */}
            <h3 style={{ fontSize: "1.25rem", fontWeight: 900 }}>
              {item.title}
            </h3>

            {/* description */}
            <p style={{ fontSize: "0.92rem", opacity: 0.7, lineHeight: "1.6" }}>
              {item.description.slice(0, 110)}...
            </p>

            {/* line */}
            <div
              style={{
                marginTop: "18px",
                width: "70px",
                height: "4px",
                borderRadius: "20px",
                background: "linear-gradient(90deg, #0ea5e9, transparent)",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* MAIN SECTION */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "60px",
          alignItems: "center",
        }}
      >
        {/* IMAGE */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <motion.img
            src={services[1].image}
            whileHover={{ scale: 1.02 }}
            style={{
              width: "100%",
              height: "320px",
              objectFit: "cover",
              borderRadius: "18px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
            }}
          />

          <motion.img
            src={services[2].image}
            whileHover={{ scale: 1.02 }}
            style={{
              width: "100%",
              height: "320px",
              objectFit: "cover",
              borderRadius: "18px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
            }}
          />
        </div>

        {/* TEXT */}
        <div>
          <p style={{ color: "#0ea5e9", fontWeight: 600 }}>
            More than 25 Years of Experience
          </p>

          <h2 style={{ fontSize: "2.4rem", fontWeight: 800 }}>
            We are passionate about Healthcare
          </h2>

          <p style={{ opacity: 0.65 }}>{services[0].description}</p>

          <div style={{ marginTop: "22px" }}>
            {services[0].points.map((point, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#0ea5e9",
                  }}
                />
                {point}
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/services-details")}
            style={{
              marginTop: "25px",
              padding: "12px 26px",
              background: "#0ea5e9",
              border: "none",
              borderRadius: "25px",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(14,165,233,0.6)",
            }}
          >
            Discover More
          </motion.button>
        </div>
      </div>
    </section>
  );
}
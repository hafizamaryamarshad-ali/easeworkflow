"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./theme/ThemeProvider";

const services = [
  {
    title: "EMR Integration",
    description:
      "Connect all patient records, reports, and prescriptions into a unified digital EMR system that improves efficiency and reduces errors.",
    video: "/videos/emr.mp4",
  },
  {
    title: "Scheduling & Follow-ups",
    description:
      "Automated appointment scheduling and follow-up reminders help clinics manage patient flow effortlessly.",
    video: "/videos/scheduling.mp4",
  },
  {
    title: "Telemedicine & Remote Care",
    description:
      "Provide secure remote consultations and continuous care using modern telemedicine technology.",
    video: "/videos/telemedicine.mp4",
  },
  {
    title: "Any Clinical Workflow",
    description:
      "Digitize and automate any clinical workflow from patient intake to reporting and analytics.",
    video: "/videos/workflow.mp4",
  },
];

export default function Services() {
  const { theme } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState<number | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>(
    Array(services.length).fill(null)
  );

  const bg = { dark: "var(--color-bg)", light: "var(--color-text-primary)" };
  const text = { dark: "var(--color-text-primary)", light: "var(--color-text-primary)" };
  const sub = { dark: "var(--color-text-muted)", light: "var(--color-text-muted)" };

  return (
    <section
      id="services"
      style={{
        position: "relative",
        padding: "150px 20px",
        background: bg[theme],
        overflow: "hidden",
        color: text[theme],
      }}
    >
      {/* Background Glow */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -80, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "40.625rem",
          height: "40.625rem",
          background: "radial-gradient(circle,var(--color-secondary)55,transparent)",
          filter: "blur(160px)",
          top: "-200px",
          left: "-200px",
        }}
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 80, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "34.375rem",
          height: "34.375rem",
          background: "radial-gradient(circle,var(--color-primary),transparent)",
          filter: "blur(160px)",
          bottom: "-200px",
          right: "-200px",
        }}
      />

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          textAlign: "center",
          fontSize: "2.9rem",
          fontWeight: 900,
          marginBottom: "130px",
        }}
      >
        Our Services
      </motion.h2>

      {/* Services List */}
      <div
        style={{
          maxWidth: "71.875rem",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "130px",
        }}
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 90 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              display: "flex",
              flexDirection: i % 2 === 0 ? "row" : "row-reverse",
              alignItems: "center",
              gap: "70px",
              flexWrap: "wrap", // ensures responsiveness on smaller screens
            }}
          >
            {/* Video Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                flex: "1 1 300px",
                aspectRatio: "16 / 9",
                borderRadius: "26px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 35px 80px rgba(0,0,0,0.55)",
              }}
            >
              {/* Glow border */}
              <div
                style={{
                  position: "absolute",
                  inset: "-2px",
                  borderRadius: "26px",
                  background:
                    "linear-gradient(120deg,var(--color-primary),transparent,transparent)",
                  opacity: 0.4,
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              />

              {/* Video */}
              <video
                ref={(el) => {
                  if (el) videoRefs.current[i] = el;
                }}
                src={service.video}
                autoPlay
                loop
                muted={soundEnabled !== i}
                playsInline
                controls
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  zIndex: 1,
                  position: "relative",
                }}
              />

              {/* Sound button overlay */}
              <button
                onClick={() =>
                  setSoundEnabled(soundEnabled === i ? null : i)
                }
                style={{
                  position: "absolute",
                  bottom: "18px",
                  right: "10px",
                  zIndex: 3,
                  padding: "6px 12px",
                  fontSize: "0.85rem",
                  borderRadius: "8px",
                  border: "none",
                  background: "var(--color-primary)aa",
                  color: "var(--color-text-inverse)",
                  cursor: "pointer",
                  backdropFilter: "blur(6px)",
                }}
              >
                {soundEnabled === i ? "Mute" : "Play Sound"}
              </button>

              {/* Slider for scrubbing temporarily removed to fix syntax issues */}
            </motion.div>

            {/* Text Card */}
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                flex: "1 1 300px",
                padding: "45px",
                borderRadius: "24px",
                background:
                  "linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 30px 70px rgba(0,0,0,0.45)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  marginBottom: "15px",
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: "1.8",
                  color: sub[theme],
                }}
              >
                {service.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
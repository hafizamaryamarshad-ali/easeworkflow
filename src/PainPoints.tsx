"use client";

import { motion } from "framer-motion";
import { FaClock, FaUserMd, FaFileMedical, FaLaptopMedical } from "react-icons/fa";

const points = [
  {
    Icon: FaClock,
    title: "Missed Appointments",
    description: "Automate scheduling to reduce no-shows and save time for both staff and patients.",
  },
  {
    Icon: FaUserMd,
    title: "Staff Overload",
    description: "Let smart workflows handle repetitive tasks so your medical staff can focus on patients.",
  },
  {
    Icon: FaFileMedical,
    title: "EMR Inefficiencies",
    description: "Streamline Electronic Medical Records with smart data entry and retrieval.",
  },
  {
    Icon: FaLaptopMedical,
    title: "Manual Follow-ups",
    description: "Automated reminders keep patients informed and engaged without manual effort.",
  },
];

export default function PainPoints() {
  return (
    <section
      style={{
        minHeight: "80vh",
        padding: "clamp(40px, 8vw, 80px) 20px",
        background: "#0f172a",
        color: "#f8fafc",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 900, marginBottom: "60px" }}
      >
        Common Clinic Challenges
      </motion.h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {points.map((point, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            style={{
              background: "#1e293b",
              padding: "30px",
              borderRadius: "24px",
              boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <point.Icon style={{ fontSize: "48px", color: "#0ea5e9" }} />
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>{point.title}</h3>
            <p style={{ fontSize: "1rem", color: "#cbd5e1", lineHeight: "1.5" }}>
              {point.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
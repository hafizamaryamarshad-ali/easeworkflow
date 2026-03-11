"use client";

import { motion } from "framer-motion";
import { FaRobot, FaFileMedical, FaCalendarCheck, FaMobileAlt } from "react-icons/fa";

const services = [
  {
    Icon: FaRobot,
    title: "Automation & Workflow",
    description:
      "Streamline your clinic operations with smart automation for appointments, reminders, and EMR tasks.",
  },
  {
    Icon: FaFileMedical,
    title: "EMR Integration",
    description:
      "Connect all your patient records and reports in a secure, error-free digital system.",
  },
  {
    Icon: FaCalendarCheck,
    title: "Scheduling & Follow-ups",
    description:
      "Manage appointments, cancellations, and patient follow-ups efficiently and automatically.",
  },
  {
    Icon: FaMobileAlt,
    title: "Telemedicine & Remote Care",
    description:
      "Provide consultations remotely and keep patient care uninterrupted, even online.",
  },
];

export default function Services() {
  return (
    <section
      style={{
        minHeight: "80vh",
        padding: "80px 20px",
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
        transition={{ duration: 1 }}
        style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "60px" }}
      >
        Our Services
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
        {services.map((service, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
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
              cursor: "pointer",
            }}
          >
            <service.Icon style={{ fontSize: "2.5rem", color: "#0ea5e9" }} />
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>{service.title}</h3>
            <p style={{ fontSize: "1rem", color: "#cbd5e1", lineHeight: "1.5" }}>
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
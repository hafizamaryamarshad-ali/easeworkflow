"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export const projects = [
  {
    id: "p1",
    title: "AI Appointment System",
    shortDesc: "AI-driven appointment scheduler reducing no-shows by 35%.",
    longDesc: "Developed a fully AI-driven appointment scheduler for a US clinic, optimizing staff time and patient engagement.",
    video: "/videos/appointment.mp4",
    thumbnail: "/images/appointment.jpg",
    clientName: "City Clinic",
    industry: "Healthcare",
    technologies: ["AI", "React", "Node.js"],
    updated: "2026-03-10",
  },
  {
    id: "p2",
    title: "EMR Optimization",
    shortDesc: "Automated EMR workflow, minimizing manual errors.",
    longDesc: "Implemented EMR workflow automation, accelerating patient data processing by 50% and reducing manual entry errors.",
    video: "/videos/emr.mp4",
    thumbnail: "/images/emr.jpg",
    clientName: "HealthCare Inc.",
    industry: "Healthcare",
    technologies: ["Next.js", "MongoDB", "TailwindCSS"],
    updated: "2026-03-08",
  },
  {
    id: "p3",
    title: "Patient Notification System",
    shortDesc: "Automated reminders and follow-ups for patients.",
    longDesc: "Created automated patient reminders and follow-ups, enhancing engagement and overall satisfaction scores.",
    video: "/videos/notification.mp4",
    thumbnail: "/images/notification.jpg",
    clientName: "MediSoft",
    industry: "Healthcare",
    technologies: ["React", "Node.js", "Firebase"],
    updated: "2026-03-05",
  },
];

export default function FeaturedProjects() {
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const bg = getComputedStyle(document.body).background;
      setTheme(bg.includes("linear-gradient") ? "dark" : "light");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  const textColor = { dark: "#f8fafc", light: "#111" };
  const cardBg = { dark: "rgba(30,41,59,0.85)", light: "#fff" };
  const subTextColor = { dark: "#cbd5f5", light: "#475569" };

  return (
    <section style={{ padding: "40px 20px 80px", textAlign: "center", color: textColor[theme], position: "relative" }}>
      
      {/* Back Button top-left */}
      <button
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          background: theme === "dark" ? "#0f172a" : "#e0f2fe",
          color: theme === "dark" ? "#fff" : "#0f172a",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
      >
        <FiArrowLeft size={18} /> Back
      </button>

      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        Our Projects
      </motion.h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "25px", justifyContent: "center", marginTop: "40px" }}>
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => router.push(`/projects/${project.id}`)}
            style={{
              flex: "1 1 280px",
              maxWidth: "300px",
              background: cardBg[theme],
              padding: "20px",
              borderRadius: "16px",
              cursor: "pointer",
            }}
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              style={{ width: "100%", borderRadius: "12px", marginBottom: "12px" }}
            />
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px" }}>{project.title}</h3>
            <p style={{ fontSize: "0.95rem", color: subTextColor[theme] }}>{project.shortDesc}</p>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => router.push("/projects/list")}
        style={{
          marginTop: "40px",
          padding: "10px 30px",
          borderRadius: "8px",
          fontWeight: 700,
          background: "#0ea5e9",
          color: "#fff",
          cursor: "pointer",
          border: "none",
        }}
      >
        See More
      </button>
    </section>
  );
}
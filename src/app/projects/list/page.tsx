"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

// Featured projects import
import { projects as featuredProjects } from "../page";

// Old static projects
const oldProjects = [
  {
    id: "p1-old",
    title: "Smart Garbage Robot",
    shortDesc: "Autonomous robot for smart waste collection.",
    longDesc: "Full details about Smart Garbage Robot, design, AI, sensors...",
    video: "/videos/garbage-robot.mp4",
    thumbnail: "/images/garbage-robot.jpg",
    clientName: "CityTech",
    industry: "Smart City",
    technologies: ["AI", "Robotics", "IoT"],
    updated: "2026-03-10",
  },
  {
    id: "p2-old",
    title: "Telemedicine App",
    shortDesc: "Platform connecting doctors with patients remotely.",
    longDesc: "Full details about Telemedicine App including features, EMR integration...",
    video: "/videos/telemedicine.mp4",
    thumbnail: "/images/telemedicine.jpg",
    clientName: "HealthCare Inc.",
    industry: "Healthcare",
    technologies: ["React", "Node.js", "WebRTC"],
    updated: "2026-03-05",
  },
  {
    id: "p3-old",
    title: "Clinic Dashboard",
    shortDesc: "Data analytics dashboard for clinic operations.",
    longDesc: "Full details about Clinic Dashboard with analytics and reporting...",
    video: "/videos/dashboard.mp4",
    thumbnail: "/images/dashboard.jpg",
    clientName: "MediSoft",
    industry: "Healthcare",
    technologies: ["Next.js", "Chart.js", "TailwindCSS"],
    updated: "2026-03-08",
  },
];

export default function ProjectsList() {
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    const observer = new MutationObserver(() => {
      const bg = getComputedStyle(document.body).background;
      setTheme(bg.includes("linear-gradient") ? "dark" : "light");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  const bgColors = { dark: "#020617", light: "#f8fafc" };
  const textColors = { dark: "#f8fafc", light: "#0f172a" };
  const cardBg = { dark: "rgba(30,41,59,0.85)", light: "#ffffff" };
  const subTextColor = { dark: "#cbd5f5", light: "#475569" };
  const boxShadow = { dark: "0 25px 50px rgba(0,0,0,0.45)", light: "0 12px 28px rgba(59,130,246,0.15)" };

  const allProjects = [...featuredProjects, ...oldProjects];

  return (
    <section
      style={{
        padding: "50px 15px 80px",
        background: bgColors[theme],
        color: textColors[theme],
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Back Button top-left */}
      <button
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: "15px",
          left: "15px",
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

      <h1 style={{ fontSize: "2.2rem", fontWeight: 900, marginBottom: "40px" }}>
        All Projects
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {allProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.01 }}
            style={{
              display: "flex",
              flexDirection: windowWidth < 640 ? "column" : "row",
              width: "100%",
              maxWidth: "900px",
              background: cardBg[theme],
              borderRadius: "20px",
              boxShadow: boxShadow[theme],
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => router.push(`/projects/${project.id}`)}
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              style={{
                width: windowWidth < 640 ? "100%" : "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: windowWidth < 640 ? "20px 20px 0 0" : "0 0 0 20px",
              }}
            />
            <div style={{ padding: "15px 20px", textAlign: "left" }}>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 700, marginBottom: "8px" }}>
                {project.title}
              </h3>
              <p style={{ fontSize: "0.98rem", lineHeight: 1.6, color: subTextColor[theme], marginBottom: "8px" }}>
                {project.shortDesc}
              </p>
              <p style={{ fontSize: "0.9rem", color: subTextColor[theme] }}>
                Client: {project.clientName} <br />
                Industry: {project.industry} <br />
                Tech: {project.technologies.join(", ")} <br />
                Updated: {project.updated}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
"use client";

import { projects as featuredProjects } from "../../../FeaturedProjects"; // featured projects
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// old projects (same as list)
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

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId;

  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const bg = getComputedStyle(document.body).background;
      setTheme(bg.includes("linear-gradient") ? "dark" : "light");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  const bgColors = { dark: "#0a0f1e", light: "#f8fafc" };
  const textColors = { dark: "#f8fafc", light: "#0f172a" };
  const subTextColor = { dark: "#cbd5f5", light: "#475569" };

  // merge all projects
  const allProjects = [...featuredProjects, ...oldProjects];
  const project = allProjects.find((p) => p.id === projectId);

  if (!project)
    return (
      <div style={{ color: textColors[theme], textAlign: "center", padding: "50px" }}>
        Project not found
      </div>
    );

  return (
    <section
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "100px 20px",
        boxSizing: "border-box",
        background: bgColors[theme],
        color: textColors[theme],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "50px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Blobs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 30, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, #0ea5e955, transparent)",
          filter: "blur(200px)",
          top: "-200px",
          left: "-200px",
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 32, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, #2563eb55, transparent)",
          filter: "blur(200px)",
          bottom: "-200px",
          right: "-200px",
          zIndex: 0,
        }}
      />

      <div style={{ width: "100%", maxWidth: "1100px", zIndex: 1, display: "flex", flexDirection: "column", gap: "30px" }}>
        {/* Video */}
        <video
          src={project.video}
          controls
          style={{
            width: "100%",
            borderRadius: "20px",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
          }}
        />

        {/* Image */}
        <img
          src={project.thumbnail}
          alt={project.title}
          style={{
            width: "100%",
            borderRadius: "20px",
            objectFit: "cover",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
          }}
        />

        {/* Title */}
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 900,
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          {project.title}
        </h1>

        {/* Short & Long Desc */}
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: 600,
            color: subTextColor[theme],
            textAlign: "center",
            lineHeight: 1.8,
          }}
        >
          {project.shortDesc}
        </p>
        <p
          style={{
            fontSize: "1rem",
            color: subTextColor[theme],
            textAlign: "center",
            lineHeight: 1.7,
          }}
        >
          {project.longDesc}
        </p>

        {/* Additional Info */}
        <div
          style={{
            fontSize: "1rem",
            color: textColors[theme],
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <p><strong>Client Name:</strong> {project.clientName}</p>
          <p><strong>Industry:</strong> {project.industry}</p>
          <p><strong>Technologies Used:</strong> {project.technologies.join(", ")}</p>
          <p><strong>Last Updated:</strong> {project.updated}</p>
        </div>
      </div>
    </section>
  );
}
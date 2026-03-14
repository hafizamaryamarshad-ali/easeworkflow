"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Static project data
export const projects = [
  {
    id: "p1",
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
    id: "p2",
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
    id: "p3",
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

export default function FeaturedProjects() {
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

  return (
    <section
      style={{
        position: "relative",
        padding: "80px 15px",
        background: bgColors[theme],
        color: textColors[theme],
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "80px" }}
      >
        Our Projects
      </motion.h2>

      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "25px",
        }}
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -5, scale: 1.02 }}
            style={{
              flex: windowWidth < 640 ? "1 1 100%" : "1 1 280px",
              maxWidth: "320px",
              background: cardBg[theme],
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: boxShadow[theme],
              cursor: "pointer",
            }}
            onClick={() => router.push(`/projects/${project.id}`)}
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "18px", textAlign: "left" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "8px" }}>
                {project.title}
              </h3>
              <p style={{ fontSize: "1rem", color: subTextColor[theme], marginBottom: "6px" }}>
                {project.shortDesc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => router.push("/projects")}
        style={{
          marginTop: "50px",
          padding: "12px 35px",
          borderRadius: "10px",
          fontWeight: 700,
          background: "#0ea5e9",
          color: "#fff",
          cursor: "pointer",
          border: "none",
          width: windowWidth < 640 ? "90%" : "auto",
        }}
      >
        See More
      </button>
    </section>
  );
}
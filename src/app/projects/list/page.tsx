"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { fetchProjects } from "../../../lib/fetchProjects";
import { useTheme } from "../../../theme/ThemeProvider";

type ProjectCard = {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  video: string;
  thumbnail: string;
  clientName: string;
  industry: string;
  technologies: string[];
  updated: string;
};

export default function ProjectsList() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const { theme } = useTheme();
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        const fetchedProjects = await fetchProjects();

        if (!isMounted) {
          return;
        }

        const mappedProjects: ProjectCard[] = fetchedProjects.map((project) => ({
          id: project._id,
          title: project.title,
          shortDesc: project.shortDesc,
          longDesc: project.longDesc,
          video:
            project.videoUrl ??
            (typeof project.video === "string" ? project.video : project.video?.asset?.url ?? ""),
          thumbnail: project.thumbnailUrl ?? "",
          clientName: project.clientName,
          industry: project.industry,
          technologies: Array.isArray(project.technologies) ? project.technologies : [],
          updated: project.updated,
        }));

        setProjects(mappedProjects);
      } catch {
        if (isMounted) {
          setProjects([]);
        }
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
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
        padding: "50px 15px 80px",
        background: bgColors[theme],
        color: textColors[theme],
        textAlign: "center",
        position: "relative",
      }}
    >
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
        {projects.map((project, i) => (
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
            {project.thumbnail && (
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
            )}
            <div style={{ padding: "15px 20px", textAlign: "left" }}>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 700, marginBottom: "8px" }}>
                {project.title}
              </h3>
              <p style={{ fontSize: "0.98rem", lineHeight: 1.6, color: subTextColor[theme], marginBottom: "8px" }}>
                {project.shortDesc}
              </p>
              <p style={{ fontSize: "0.98rem", color: subTextColor[theme] }}>
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
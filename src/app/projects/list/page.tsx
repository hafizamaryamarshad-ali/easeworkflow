"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiCpu, FiGlobe, FiShield } from "react-icons/fi";
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

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        const fetchedProjects = await fetchProjects();

        if (!isMounted) return;

        const mappedProjects: ProjectCard[] = fetchedProjects.map((project) => ({
          id: project._id,
          title: project.title,
          shortDesc: project.shortDesc,
          longDesc: project.longDesc,
          video:
            project.videoUrl ??
            (typeof project.video === "string"
              ? project.video
              : project.video?.asset?.url ?? ""),
          thumbnail: project.thumbnailUrl ?? "",
          clientName: project.clientName,
          industry: project.industry,
          technologies: Array.isArray(project.technologies)
            ? project.technologies
            : [],
          updated: project.updated,
        }));

        setProjects(mappedProjects);
      } catch {
        if (isMounted) setProjects([]);
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const sectionBg = {
    dark: "var(--bg-gradient-dark)",
    light: "var(--color-bg-light)",
  };

  const textColor = {
    dark: "var(--color-text-primary)",
    light: "var(--color-text-dark)",
  };

  const subText = {
    dark: "var(--color-text-muted)",
    light: "var(--color-text-muted-light)",
  };

  // ✅ Card styles: subtle neutral shadow, more visible
  const cardBg = {
    dark: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(14,165,233,0.05))",
    light: "linear-gradient(145deg, #e0f2fe, #ffffff)",
  };

  const cardBorder = {
    dark: "1px solid rgba(255,255,255,0.15)",
    light: "1px solid rgba(14,165,233,0.18)",
  };

  const cardShadow = {
    dark: "0 8px 20px rgba(0,0,0,0.2)", // subtle dark shadow
    light: "0 8px 20px rgba(0,0,0,0.1)", // subtle light shadow
  };

  const floatingIcons = [
    { Icon: FiCpu, top: "16%", left: "12%", duration: 18 },
    { Icon: FiGlobe, top: "68%", left: "80%", duration: 24 },
    { Icon: FiShield, top: "42%", left: "88%", duration: 26 },
  ];

  return (
    <section
      style={{
        padding: "50px 15px 120px",
        backgroundColor:
          theme === "dark" ? "#0f172a" : "var(--color-bg-light)",
        backgroundImage: theme === "dark" ? sectionBg.dark : "none",
        backgroundSize: theme === "dark" ? "600% 600%" : "auto",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        color: textColor[theme],
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating decorative icons */}
      {floatingIcons.map(({ Icon, top, left, duration }, index) => (
        <motion.div
          key={index}
          initial={{ y: -8, opacity: theme === "dark" ? 0.22 : 0.1 }}
          animate={{ y: 8 }}
          transition={{ duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          style={{
            position: "absolute",
            top,
            left,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "999px",
              border:
                theme === "dark"
                  ? "1px solid rgba(148, 163, 184, 0.3)"
                  : "1px solid rgba(148, 163, 184, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                theme === "dark"
                  ? "radial-gradient(circle at top, rgba(56,189,248,0.18), rgba(15,23,42,0.1))"
                  : "radial-gradient(circle at top, rgba(59,130,246,0.12), rgba(248,250,252,0.1))",
              boxShadow:
                theme === "dark"
                  ? "0 20px 45px rgba(15,23,42,0.85)"
                  : "0 16px 40px rgba(15,23,42,0.12)",
            }}
          >
            <Icon
              style={{
                width: "54px",
                height: "54px",
                color: theme === "dark" ? "rgba(226, 232, 240, 0.85)" : "rgba(30, 64, 175, 0.9)",
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Back Button */}
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
          border:
            theme === "dark"
              ? "1px solid rgba(255,255,255,0.2)"
              : "1px solid rgba(0,0,0,0.15)",
          cursor: "pointer",
          fontWeight: 600,
          background:
            theme === "dark"
              ? "rgba(255,255,255,0.06)"
              : "rgba(0,0,0,0.04)",
          color: theme === "dark" ? "#ffffff" : "#111827",
        }}
      >
        <FiArrowLeft size={18} /> Back
      </button>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: 900,
            marginBottom: "40px",
            marginTop: "20px",
          }}
        >
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
            whileHover={{ y: -6, scale: 1.02 }}
            style={{
              display: "flex",
              flexDirection: windowWidth < 640 ? "column" : "row",
              width: "100%",
              maxWidth: "900px",

              background: cardBg[theme],
              borderRadius: "20px",
              boxShadow: cardShadow[theme], // visible shadow
              border: cardBorder[theme],
              backdropFilter: theme === "dark" ? "blur(16px)" : "none",
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
                  borderRadius:
                    windowWidth < 640 ? "20px 20px 0 0" : "0 0 0 20px",
                }}
              />
            )}

            <div style={{ padding: "15px 20px", textAlign: "left" }}>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 700 }}>
                {project.title}
              </h3>

              <p style={{ color: subText[theme], lineHeight: 1.6 }}>
                {project.shortDesc}
              </p>

              <p style={{ color: subText[theme] }}>
                Client: {project.clientName} <br />
                Industry: {project.industry} <br />
                Tech: {project.technologies.join(", ")} <br />
                Updated: {project.updated}
              </p>
            </div>
          </motion.div>
        ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}
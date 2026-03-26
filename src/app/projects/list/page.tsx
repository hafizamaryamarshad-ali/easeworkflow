"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { FaStethoscope, FaPills, FaHeart } from "react-icons/fa";
import { fetchProjects } from "../../../lib/fetchProjects";
import { useTheme } from "../../../theme/ThemeProvider";

type ProjectCard = {
  id: string;
  slug: string;
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
          slug: project.slug,
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

  // Card styles borrowed from Case Studies page
  const cardBg = {
    dark: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(14,165,233,0.08))",
    light: "linear-gradient(145deg, #ffffff, #e0f2fe)",
  };

  const cardBorder = {
    dark: "1px solid rgba(255,255,255,0.15)",
    light: "1px solid rgba(14,165,233,0.25)",
  };

  const cardShadow = {
    dark: "0 8px 25px rgba(0,0,0,0.25)", // subtle dark shadow
    light: "0 6px 20px rgba(0,0,0,0.12)", // subtle light shadow
  };

  const floatingIcons = [
    { Icon: FaStethoscope, top: "16%", left: "12%", duration: 18 },
    { Icon: FaPills, top: "68%", left: "80%", duration: 24 },
    { Icon: FaHeart, top: "42%", left: "88%", duration: 26 },
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
          initial={{ y: 0, opacity: theme === "dark" ? 0.22 : 0.1 }}
          animate={{ y: ["0%", "-18%", "0%"] }}
          transition={{ duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
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
                color: theme === "dark" ? "#0ea5e9" : "#3b82f6",
              }}
            />
          </div>
        </motion.div>
      ))}

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
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "30px",
          }}
        >
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{
              scale: 1.03,
              y: -6,
              boxShadow: cardShadow[theme],
            }}
            style={{
              width: windowWidth < 640 ? "100%" : "320px",
              borderRadius: "20px",
              background: cardBg[theme],
              backdropFilter: theme === "dark" ? "blur(20px)" : "none",
              border: cardBorder[theme],
              color: textColor[theme],
              overflow: "hidden",
              textAlign: "left",
              boxShadow: cardShadow[theme],
              cursor: "pointer",
            }}
            onClick={() => router.push(`/projects/${project.slug || project.id}`)}
          >
            {project.thumbnail && (
              <img
                src={project.thumbnail}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                }}
              />
            )}

            <div
              style={{
                padding: "22px 22px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                {project.title}
              </h3>

              <p
                style={{
                  color: subText[theme],
                  lineHeight: 1.6,
                  fontSize: "0.96rem",
                  margin: 0,
                }}
              >
                {project.shortDesc}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginTop: "4px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: subText[theme],
                    }}
                  >
                    Client
                  </span>
                  <span
                    style={{
                      fontSize: "0.92rem",
                      fontWeight: 400,
                      lineHeight: 1.4,
                    }}
                  >
                    {project.clientName || "—"}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: subText[theme],
                    }}
                  >
                    Industry
                  </span>
                  <span
                    style={{
                      fontSize: "0.92rem",
                      fontWeight: 400,
                      lineHeight: 1.4,
                    }}
                  >
                    {project.industry || "—"}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: subText[theme],
                    }}
                  >
                    Last Updated
                  </span>
                  <span
                    style={{
                      fontSize: "0.92rem",
                      fontWeight: 400,
                      lineHeight: 1.4,
                    }}
                  >
                    {project.updated || "—"}
                  </span>
                </div>
              </div>

              {project.technologies && project.technologies.length > 0 && (
                <div
                  style={{
                    marginTop: "14px",
                    paddingTop: "12px",
                    borderTop:
                      theme === "dark"
                        ? "1px solid rgba(148,163,184,0.35)"
                        : "1px solid rgba(148,163,184,0.25)",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: "0.8rem",
                        padding: "4px 10px",
                        borderRadius: "999px",
                        backgroundColor:
                          theme === "dark"
                            ? "rgba(15,23,42,0.9)"
                            : "rgba(191,219,254,0.8)",
                        color: theme === "dark" ? "#e5e7eb" : "#1e293b",
                        border:
                          theme === "dark"
                            ? "1px solid rgba(148,163,184,0.6)"
                            : "1px solid rgba(59,130,246,0.6)",
                        lineHeight: 1.3,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
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
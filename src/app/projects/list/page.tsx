"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaStethoscope, FaPills, FaHeart } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi"; // Arrow icon for button
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
  const [flashlightPos, setFlashlightPos] = useState<{ [key: string]: { x: number; y: number; active: boolean } }>({});

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
          longDesc:
            typeof project.longDesc === "string"
              ? project.longDesc
              : "",
          video: project.videoUrl ?? (typeof project.video === "string" ? project.video : project.video?.asset?.url ?? ""),
          thumbnail: project.thumbnailUrl ?? "",
          clientName: project.clientName,
          industry: project.industry,
          technologies: Array.isArray(project.technologies) ? project.technologies : [],
          updated: project.updated,
        }));

        setProjects(mappedProjects);
      } catch {
        if (isMounted) setProjects([]);
      }
    };
    loadProjects();
    return () => { isMounted = false; };
  }, []);

  const sectionBg = { dark: "var(--bg-gradient-dark)", light: "var(--color-bg-light)" };
  const textColor = { dark: "var(--color-text-primary)", light: "var(--color-text-dark)" };
  const subText = { dark: "var(--color-text-muted)", light: "var(--color-text-muted-light)" };
  const cardBg = { 
    dark: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(14,165,233,0.08))", 
    light: "linear-gradient(145deg, #f9fafb, #e0f2fe)" 
  };
  const cardBorder = { dark: "1px solid rgba(255,255,255,0.15)", light: "1px solid rgba(14,165,233,0.25)" };
  const cardShadow = { dark: "0 8px 25px rgba(0,0,0,0.25)", light: "0 6px 20px rgba(0,0,0,0.12)" };
  const accentColor = "#0ea5e9";

  const floatingIcons = [
    { Icon: FaStethoscope, top: "16%", left: "12%", duration: 18 },
    { Icon: FaPills, top: "68%", left: "80%", duration: 24 },
    { Icon: FaHeart, top: "42%", left: "88%", duration: 26 },
  ];

  const handleFlashlightMove = (projectId: string, event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setFlashlightPos(prev => ({
      ...prev,
      [projectId]: { x, y, active: true }
    }));
  };

  const handleFlashlightEnter = (projectId: string) => {
    setFlashlightPos(prev => ({
      ...prev,
      [projectId]: { ...prev[projectId], active: true }
    }));
  };

  const handleFlashlightLeave = (projectId: string) => {
    setFlashlightPos(prev => ({
      ...prev,
      [projectId]: { x: 0, y: 0, active: false }
    }));
  };

  return (
    <section
      style={{
        padding: "50px 15px 120px",
        backgroundColor: theme === "dark" ? "#0f172a" : "var(--color-bg-light)",
        backgroundImage: theme === "dark" ? sectionBg.dark : "none",
        backgroundSize: theme === "dark" ? "600% 600%" : "auto",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        color: textColor[theme],
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {floatingIcons.map(({ Icon, top, left, duration }, index) => (
        <motion.div
          key={index}
          initial={{ y: 0, opacity: theme === "dark" ? 0.22 : 0.1 }}
          animate={{ y: ["0%", "-18%", "0%"] }}
          transition={{ duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          style={{ position: "absolute", top, left, zIndex: 0, pointerEvents: "none" }}
        >
          <div style={{
            width: "120px", height: "120px", borderRadius: "999px",
            border: theme === "dark" ? "1px solid rgba(148, 163, 184, 0.3)" : "1px solid rgba(148, 163, 184, 0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: theme === "dark" ? "radial-gradient(circle at top, rgba(56,189,248,0.18), rgba(15,23,42,0.1))" : "radial-gradient(circle at top, rgba(59,130,246,0.12), rgba(248,250,252,0.1))",
            boxShadow: theme === "dark" ? "0 20px 45px rgba(15,23,42,0.85)" : "0 16px 40px rgba(15,23,42,0.12)",
          }}>
            <Icon style={{ width: "54px", height: "54px", color: theme === "dark" ? "#0ea5e9" : "#3b82f6" }} />
          </div>
        </motion.div>
      ))}

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 900, marginBottom: "40px", marginTop: "20px" }}>
          All Projects
        </h1>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
          {projects.map((project, i) => {
            const pos = flashlightPos[project.id] || { x: 0, y: 0, active: false };
            return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ boxShadow: cardShadow[theme] }}
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
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
              onMouseMove={(e) => handleFlashlightMove(project.id, e)}
              onMouseEnter={() => handleFlashlightEnter(project.id)}
              onMouseLeave={() => handleFlashlightLeave(project.id)}
              onClick={() => router.push(`/projects/${project.slug || project.id}`)}
            >
              <div
                className="flashlight-spotlight"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  zIndex: 0,
                  opacity: pos.active ? 1 : 0,
                  background: `radial-gradient(circle 80px at ${pos.x}px ${pos.y}px, rgba(56, 189, 248, 0.25) 0%, rgba(14, 165, 233, 0.12) 40%, rgba(14, 165, 233, 0) 70%)`,
                  transition: pos.active ? 'none' : 'opacity 300ms ease-out',
                }}
                aria-hidden="true"
              />
              {project.thumbnail && (
                <img src={project.thumbnail} alt={project.title} style={{ width: "100%", height: "145px", objectFit: "cover", position: "relative", zIndex: 1 }} />
              )}

              <div style={{ padding: "16px 18px 14px", flex: 1, display: "flex", flexDirection: "column", gap: "8px", position: "relative", zIndex: 1 }}>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    lineHeight: 1.25,
                    margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    color: subText[theme],
                    lineHeight: 1.5,
                    fontSize: "0.92rem",
                    margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {project.shortDesc}
                </p>

                {/* Tags + Read More footer block pinned to bottom for consistent alignment */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {/* Technologies as pill tags (reserve space even if empty) */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      minHeight: "24px",
                    }}
                  >
                    {project.technologies &&
                      project.technologies.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontSize: "0.74rem",
                            padding: "3px 8px",
                            borderRadius: "999px",
                            backgroundColor:
                              theme === "dark"
                                ? "rgba(15,23,42,0.9)"
                                : "rgba(219,234,254,0.95)",
                            color: theme === "dark" ? "#e5e7eb" : "#1e293b",
                            border:
                              theme === "dark"
                                ? "1px solid rgba(148,163,184,0.7)"
                                : "1px solid rgba(59,130,246,0.7)",
                            lineHeight: 1.3,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                  </div>

                  {/* READ MORE */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: accentColor,
                      fontSize: "0.95rem",
                      fontWeight: 700,
                    }}
                  >
                    Read More <FiChevronRight />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
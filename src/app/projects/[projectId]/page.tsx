"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaStethoscope, FaPills, FaHeart } from "react-icons/fa";
import { FiAlertTriangle, FiTool, FiAward } from "react-icons/fi";
import { fetchProjectBySlug, type Project } from "../../../lib/fetchProjects";
import { useTheme } from "../../../theme/ThemeProvider";
import MediaCarousel, { type MediaItem } from "../../../MediaCarousel";
import { PortableText } from "@portabletext/react";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const routeParam = params?.projectId as string | string[] | undefined;

  // We treat the dynamic segment as a slug for routing
  const projectSlug = useMemo(() => {
    if (Array.isArray(routeParam)) {
      return routeParam[0];
    }
    return routeParam;
  }, [routeParam]);

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    let isMounted = true;

    const loadProject = async () => {
      if (!projectSlug) {
        if (isMounted) {
          setProject(null);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        const found = await fetchProjectBySlug(projectSlug);

        if (isMounted) {
          setProject(found ?? null);
        }
      } catch {
        if (isMounted) {
          setProject(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProject();

    return () => {
      isMounted = false;
    };
  }, [projectSlug]);

  const bgColors = {
    light: "var(--color-bg-light)",
    dark: "#0f172a",
  } as const;

  const textColors = {
    light: "var(--color-text-dark)",
    dark: "var(--color-text-primary)",
  } as const;

  const subTextColor = {
    light: "var(--color-text-muted-light)",
    dark: "var(--color-text-muted)",
  } as const;

  const floatingIcons = [
    { Icon: FaStethoscope, top: "16%", left: "12%", duration: 18 },
    { Icon: FaPills, top: "68%", left: "80%", duration: 24 },
    { Icon: FaHeart, top: "42%", left: "88%", duration: 26 },
  ];

  const sectionTexts = useMemo(
    () => {
      if (!project) {
        return {
          overview: "",
          problem: "",
          solution: "",
          results: "",
        };
      }

      const baseOverview = project.shortDesc || project.longDesc || "";

      const longDescText =
        typeof (project as any).longDesc === "string" ? ((project as any).longDesc as string) : "";

      if (!longDescText) {
        return {
          overview: baseOverview,
          problem: "",
          solution: "",
          results: "",
        };
      }

      const sentences = longDescText
        .split(/(?<=[.!?])\s+/)
        .filter(Boolean);

      if (sentences.length < 4) {
        return {
          overview: baseOverview,
          problem: sentences.join(" "),
          solution: "",
          results: "",
        };
      }

      const third = Math.floor(sentences.length / 3);
      const twoThirds = Math.floor((2 * sentences.length) / 3);

      return {
        overview: baseOverview,
        problem: sentences.slice(0, third).join(" "),
        solution: sentences.slice(third, twoThirds).join(" "),
        results: sentences.slice(twoThirds).join(" "),
      };
    },
    [project],
  );

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          color: textColors[theme],
          textAlign: "center",
          padding: "50px",
          backgroundColor: theme === "dark" ? "#0f172a" : bgColors.light,
          backgroundImage: theme === "dark" ? "var(--bg-gradient-dark)" : "none",
          backgroundSize: theme === "dark" ? "600% 600%" : "auto",
          animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        }}
      >
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div
        style={{
          minHeight: "100vh",
          color: textColors[theme],
          textAlign: "center",
          padding: "50px",
          backgroundColor: theme === "dark" ? "#0f172a" : bgColors.light,
          backgroundImage: theme === "dark" ? "var(--bg-gradient-dark)" : "none",
          backgroundSize: theme === "dark" ? "600% 600%" : "auto",
          animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        }}
      >
        Project not found
      </div>
    );
  }

  const videoUrl =
    project.videoUrl ??
    (typeof project.video === "string"
      ? project.video
      : project.video?.asset?.url ?? null);

  const mediaItems: MediaItem[] = [];
  if (project.thumbnailUrl) {
    mediaItems.push({ type: "image", src: project.thumbnailUrl, alt: project.title });
  }
  if (Array.isArray((project as any).galleryImageUrls)) {
    (project as any).galleryImageUrls.forEach((url: string) => {
      if (url) mediaItems.push({ type: "image", src: url, alt: project.title });
    });
  }
  if (videoUrl) {
    mediaItems.push({ type: "video", src: videoUrl });
  }
  if (Array.isArray((project as any).extraVideoUrls)) {
    (project as any).extraVideoUrls.forEach((url: string) => {
      if (url) mediaItems.push({ type: "video", src: url });
    });
  }

  const hasTags = Array.isArray(project.tags) && project.tags.length > 0;

  const displayedResults = project.results || sectionTexts.results;

  return (
    <section
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "100px 20px",
        boxSizing: "border-box",
        backgroundColor: theme === "dark" ? "#0f172a" : bgColors.light,
        backgroundImage: theme === "dark" ? "var(--bg-gradient-dark)" : "none",
        backgroundSize: theme === "dark" ? "600% 600%" : "auto",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
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

      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 30, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          background: "var(--glow-primary-soft)",
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
          background: "var(--glow-secondary-soft)",
          filter: "blur(200px)",
          bottom: "-200px",
          right: "-200px",
          zIndex: 0,
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {mediaItems.length > 0 && (
          <div style={{ marginTop: "32px" }}>
            <MediaCarousel items={mediaItems} aspectRatio="16 / 9" />
          </div>
        )}

        <div
          style={{
            marginTop: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "flex-start",
          }}
        >
          <h1
            style={{
              fontSize: "2.6rem",
              fontWeight: 900,
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: 500,
              color: subTextColor[theme],
              maxWidth: "720px",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {sectionTexts.overview}
          </p>
        </div>

        <div
          style={{
            marginTop: "32px",
            display: "flex",
            flexWrap: "wrap",
            gap: "32px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              flex: "1 1 60%",
              minWidth: "260px",
              maxWidth: "760px",
              display: "flex",
              flexDirection: "column",
              gap: "28px",
            }}
          >
            {sectionTexts.problem && (
              <div
                style={{
                  padding: "20px 22px",
                  borderRadius: "18px",
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(15,23,42,0.9)"
                      : "rgba(241,245,249,0.95)",
                  border:
                    theme === "dark"
                      ? "1px solid rgba(148,163,184,0.45)"
                      : "1px solid rgba(148,163,184,0.55)",
                }}
              >
                <h2
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    margin: 0,
                    marginBottom: "8px",
                  }}
                >
                  <FiAlertTriangle size={18} /> Problem / Challenge
                </h2>
                <div
                  style={{
                    margin: 0,
                    marginTop: "6px",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    color: subTextColor[theme],
                  }}
                >
                  {Array.isArray((project as any).longDesc) && (project as any).longDesc.length > 0 ? (
                    <PortableText value={(project as any).longDesc} />
                  ) : (
                    <p style={{ margin: 0 }}>{sectionTexts.problem}</p>
                  )}
                </div>
              </div>
            )}

            {sectionTexts.solution && (
              <div
                style={{
                  padding: "20px 22px",
                  borderRadius: "18px",
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(15,23,42,0.9)"
                      : "rgba(241,245,249,0.95)",
                  border:
                    theme === "dark"
                      ? "1px solid rgba(56,189,248,0.6)"
                      : "1px solid rgba(59,130,246,0.5)",
                }}
              >
                <h2
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    margin: 0,
                    marginBottom: "8px",
                  }}
                >
                  <FiTool size={18} /> Solution / Implementation
                </h2>
                <p
                  style={{
                    margin: 0,
                    marginTop: "6px",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    color: subTextColor[theme],
                  }}
                >
                  {sectionTexts.solution}
                </p>
              </div>
            )}

            {displayedResults && (
              <div
                style={{
                  padding: "20px 22px",
                  borderRadius: "18px",
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(15,23,42,0.9)"
                      : "rgba(241,245,249,0.95)",
                  border:
                    theme === "dark"
                      ? "1px solid rgba(34,197,94,0.6)"
                      : "1px solid rgba(34,197,94,0.5)",
                }}
              >
                <h2
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    margin: 0,
                    marginBottom: "8px",
                  }}
                >
                  <FiAward size={18} /> Results / Outcome
                </h2>
                <p
                  style={{
                    margin: 0,
                    marginTop: "6px",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    color: subTextColor[theme],
                  }}
                >
                  {displayedResults}
                </p>
              </div>
            )}
          </div>

          <aside
            style={{
              flex: "1 1 280px",
              maxWidth: "360px",
              minWidth: "260px",
              position: "sticky",
              top: "100px",
              alignSelf: "flex-start",
              padding: "20px 22px",
              borderRadius: "20px",
              backgroundColor:
                theme === "dark" ? "rgba(15,23,42,0.95)" : "rgba(248,250,252,0.98)",
              border:
                theme === "dark"
                  ? "1px solid rgba(148,163,184,0.45)"
                  : "1px solid rgba(203,213,225,0.9)",
              boxShadow:
                theme === "dark"
                  ? "0 20px 45px rgba(15,23,42,0.9)"
                  : "0 16px 35px rgba(15,23,42,0.16)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                margin: 0,
                marginBottom: "4px",
              }}
            >
              Project Snapshot
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: subTextColor[theme],
                  }}
                >
                  Client
                </span>
                <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>
                  {project.clientName || "—"}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: subTextColor[theme],
                  }}
                >
                  Industry
                </span>
                <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>
                  {project.industry || "—"}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: subTextColor[theme],
                  }}
                >
                  Last Updated
                </span>
                <span style={{ fontSize: "0.95rem" }}>
                  {project.updated || "—"}
                </span>
              </div>
            </div>

            {project.technologies && project.technologies.length > 0 && (
              <div
                style={{
                  marginTop: "6px",
                  paddingTop: "10px",
                  borderTop:
                    theme === "dark"
                      ? "1px solid rgba(148,163,184,0.4)"
                      : "1px solid rgba(203,213,225,0.9)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: "0.78rem",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(15,23,42,0.95)"
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
            )}

            {hasTags && (
              <div
                style={{
                  marginTop: "8px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.78rem",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(15,23,42,0.95)"
                          : "rgba(240,253,250,0.95)",
                      color: theme === "dark" ? "#e5e7eb" : "#0f172a",
                      border:
                        theme === "dark"
                          ? "1px solid rgba(34,197,94,0.7)"
                          : "1px solid rgba(34,197,94,0.7)",
                      lineHeight: 1.3,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </aside>
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

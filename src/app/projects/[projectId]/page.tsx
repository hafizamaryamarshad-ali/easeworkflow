"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fetchProjects, type Project } from "../../../lib/fetchProjects";
import { useTheme } from "../../../theme/ThemeProvider";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const routeProjectId = params?.projectId;
  const projectId = useMemo(() => {
    if (Array.isArray(routeProjectId)) {
      return routeProjectId[0];
    }
    return routeProjectId;
  }, [routeProjectId]);

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    let isMounted = true;

    const loadProject = async () => {
      if (!projectId) {
        if (isMounted) {
          setProject(null);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        const allProjects = await fetchProjects();
        const found = allProjects.find((item) => item._id === projectId);

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
  }, [projectId]);

  const bgColors = { dark: "var(--color-bg)", light: "var(--color-bg-light)" };
  const textColors = { dark: "var(--color-text-primary)", light: "var(--color-text-dark)" };
  const subTextColor = { dark: "var(--color-text-muted)", light: "var(--color-text-muted-light)" };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          color: textColors[theme],
          textAlign: "center",
          padding: "50px",
          backgroundColor: bgColors[theme],
          backgroundImage: theme === "dark" ? "var(--color-page-gradient-dark)" : "none",
          backgroundSize: "400% 400%",
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
          backgroundColor: bgColors[theme],
          backgroundImage: theme === "dark" ? "var(--color-page-gradient-dark)" : "none",
          backgroundSize: "400% 400%",
          animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        }}
      >
        Project not found
      </div>
    );
  }

  const videoUrl =
    project.videoUrl ??
    (typeof project.video === "string" ? project.video : project.video?.asset?.url ?? null);

  const hasBothMedia = Boolean(videoUrl && project.thumbnailUrl);

  return (
    <section
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "100px 20px",
        boxSizing: "border-box",
        backgroundColor: bgColors[theme],
        backgroundImage: theme === "dark" ? "var(--color-page-gradient-dark)" : "none",
        backgroundSize: "400% 400%",
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
          gap: "30px",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            padding: "8px 14px",
            borderRadius: "10px",
            border:
              theme === "dark"
                ? "1px solid rgba(255,255,255,0.2)"
                : "1px solid rgba(0,0,0,0.15)",
            background:
              theme === "dark"
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.04)",
            backdropFilter: theme === "dark" ? "blur(10px)" : "none",
            color: theme === "dark" ? "#ffffff" : "#111827",
            cursor: "pointer",
            fontWeight: 600,
            boxShadow:
              theme === "dark"
                ? "0 4px 20px rgba(0,0,0,0.4)"
                : "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          
          ← Back
        </button>

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
          <p>
            <strong>Client Name:</strong> {project.clientName}
          </p>
          <p>
            <strong>Industry:</strong> {project.industry}
          </p>
          <p>
            <strong>Technologies Used:</strong> {project.technologies?.join(", ") || "-"}
          </p>
          <p>
            <strong>Last Updated:</strong> {project.updated}
          </p>
        </div>

        {(videoUrl || project.thumbnailUrl) && (
          <section style={{ marginTop: "40px" }}>
            <div
              className={`project-media-grid${hasBothMedia ? " project-media-grid--two" : ""}`}
            >
              {videoUrl && (
                <div
                  className="project-media-card"
                  style={{
                    borderColor:
                      theme === "dark"
                        ? "var(--color-border-dark)"
                        : "var(--color-border-light)",
                  }}
                >
                  <div className="project-media-wrapper">
                    <video
                      src={videoUrl}
                      controls
                      className="project-media-content"
                    />
                  </div>
                </div>
              )}

              {project.thumbnailUrl && (
                <div
                  className="project-media-card"
                  style={{
                    borderColor:
                      theme === "dark"
                        ? "var(--color-border-dark)"
                        : "var(--color-border-light)",
                  }}
                >
                  <div className="project-media-wrapper">
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="project-media-image"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
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

        .project-media-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
        }

        @media (min-width: 900px) {
          .project-media-grid.project-media-grid--two {
            grid-template-columns: 1fr 1fr;
          }
        }

        .project-media-card {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-media-dark);
          border: 1px solid;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(10px);
        }

        .project-media-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          background-color: #020617;
        }

        .project-media-content,
        .project-media-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `}</style>
    </section>
  );
}
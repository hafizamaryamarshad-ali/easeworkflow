"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fetchProjects, type Project } from "../../../lib/fetchProjects";
import { useTheme } from "../../../theme/ThemeProvider";

export default function ProjectDetailPage() {
  const params = useParams();
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
        {videoUrl && (
          <video
            src={videoUrl}
            controls
            style={{
              width: "100%",
              borderRadius: "20px",
              boxShadow: "var(--shadow-media-dark)",
              border: theme === "dark" ? "1px solid var(--color-border-dark)" : "1px solid var(--color-border-light)",
            }}
          />
        )}

        {project.thumbnailUrl && (
          <div
            style={{
              position: "relative",
              width: "100%",
              minHeight: "420px",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "var(--shadow-media-dark)",
              border: theme === "dark" ? "1px solid var(--color-border-dark)" : "1px solid var(--color-border-light)",
            }}
          >
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}

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
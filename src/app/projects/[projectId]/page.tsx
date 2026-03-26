"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaStethoscope, FaPills, FaHeart } from "react-icons/fa";
import { fetchProjects, type Project } from "../../../lib/fetchProjects";
import { useTheme } from "../../../theme/ThemeProvider";
import MediaCarousel, { type MediaItem } from "../../../MediaCarousel";

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

  const floatingIcons = [
    { Icon: FaStethoscope, top: "20%", left: "12%", duration: 18 },
    { Icon: FaPills, top: "75%", left: "78%", duration: 24 },
    { Icon: FaHeart, top: "45%", left: "88%", duration: 26 },
  ];

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
    (typeof project.video === "string" ? project.video : project.video?.asset?.url ?? null);

  const hasBothMedia = Boolean(videoUrl && project.thumbnailUrl);

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

        {mediaItems.length > 0 && (
          <div style={{ marginTop: "40px" }}>
            <MediaCarousel items={mediaItems} aspectRatio="16 / 9" />
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
    </section>
  );
}
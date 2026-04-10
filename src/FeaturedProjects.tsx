"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fetchProjects, type Project } from "./lib/fetchProjects";
import { useTheme } from "./theme/ThemeProvider";
import { useRouter } from "next/navigation";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const data = await fetchProjects();
      setProjects(data || []);
    };
    load();
  }, []);

  const isDark = theme === "dark";

  // Use the full project list in both rows so every project
  // is visible in each marquee, then duplicate for seamless loops.
  const allWithIndex = projects.map((project, index) => ({ project, index }));

  return (
    <section
      style={{
        padding: "30px 15px 50px",
        background: isDark ? "#020617" : "#f1f5f9",
        color: isDark ? "#fff" : "#0f172a",
        textAlign: "center",
      }}
    >
      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{
          fontSize: "clamp(2.2rem, 4.5vw, 3rem)",
          fontWeight: 900,
          marginBottom: "4px",
          marginTop: "0px",
          background: "linear-gradient(90deg,#38bdf8,#a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Featured Projects
      </motion.h2>

      <p style={{ opacity: 0.7, marginBottom: "20px" }}>
        Real-world applications built with modern technologies
      </p>

      {/* MARQUEE ROWS */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "30px auto 0",
          display: "flex",
          flexDirection: "column",
          gap: "26px",
          overflow: "hidden",
        }}
      >
        {allWithIndex.length > 0 && (
          <div className="featured-projects-row featured-projects-row--top">
            <div className="featured-projects-track">
              {[...allWithIndex, ...allWithIndex].map(({ project, index }, i) => (
                <TiltCard
                  key={`${project._id}-top-${i}`}
                  project={project}
                  gradientIndex={index}
                  onClick={() => router.push(`/projects/${project.slug || project._id}`)}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>
        )}

        {allWithIndex.length > 0 && (
          <div className="featured-projects-row featured-projects-row--bottom">
            <div className="featured-projects-track">
              {[...allWithIndex, ...allWithIndex].map(({ project, index }, i) => (
                <TiltCard
                  key={`${project._id}-bottom-${i}`}
                  project={project}
                  gradientIndex={index}
                  onClick={() => router.push(`/projects/${project.slug || project._id}`)}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/projects")}
        style={{
          marginTop: "30px",
          padding: "12px 36px",
          borderRadius: "999px",
          border: "none",
          background: "linear-gradient(90deg,#0ea5e9,#6366f1)",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(14,165,233,0.25)",
        }}
      >
        See All Projects →
      </motion.button>
    </section>
  );
}

/* ================= PREMIUM CARD ================= */

const lightGradients = [
  "linear-gradient(135deg, #0ea5e9, #6366f1)",
  "linear-gradient(135deg, #22c55e, #16a34a)",
  "linear-gradient(135deg, #f97316, #ec4899)",
  "linear-gradient(135deg, #a855f7, #3b82f6)",
  "linear-gradient(135deg, #facc15, #f97316)",
];

const darkGradients = [
  "linear-gradient(135deg, #1e293b, #0f172a)",
  "linear-gradient(135deg, #0f766e, #022c22)",
  "linear-gradient(135deg, #7e22ce, #312e81)",
  "linear-gradient(135deg, #b91c1c, #7f1d1d)",
  "linear-gradient(135deg, #0369a1, #020617)",
];

function TiltCard({
  project,
  onClick,
  isDark,
  gradientIndex,
}: {
  project: Project;
  onClick: () => void;
  isDark: boolean;
  gradientIndex: number;
}) {
  const palette = isDark ? darkGradients : lightGradients;
  const background = palette[gradientIndex % palette.length];

  return (
    <motion.div
      className="featured-project-card"
      onClick={onClick}
      whileHover={{
        scale: 1.03,
        boxShadow: isDark
          ? "0 30px 80px rgba(0,0,0,0.65)"
          : "0 24px 55px rgba(15,23,42,0.22)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{
        width: "380px",
        minWidth: "300px",
        maxWidth: "380px",
        borderRadius: "22px",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        background,
        border: isDark
          ? "1px solid rgba(56,189,248,0.25)"
          : "1px solid rgba(0,0,0,0.08)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
        boxShadow: isDark
          ? "0 24px 60px rgba(0,0,0,0.55)"
          : "0 18px 40px rgba(15,23,42,0.18)",
        transformOrigin: "center",
        willChange: "transform, box-shadow",
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          position: "relative",
          height: "180px",
          flexShrink: 0,
        }}
      >
        <Image
          src={project.thumbnailUrl || "/placeholder.png"}
          alt={project.title}
          fill
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
          }}
        />
      </div>

      {/* CONTENT */}
      <div
        style={{
          padding: "18px",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <span
          style={{
            fontSize: "11px",
            padding: "5px 12px",
            borderRadius: "999px",
            background: isDark
              ? "rgba(56,189,248,0.15)"
              : "rgba(56,189,248,0.12)",
            color: "#38bdf8",
            border: isDark
              ? "1px solid rgba(56,189,248,0.3)"
              : "1px solid rgba(56,189,248,0.4)",
            fontWeight: 600,
          }}
        >
          ✦ {project.industry || "Featured"}
        </span>

        <h3 style={{ marginTop: "10px", fontSize: "1.3rem", fontWeight: 800 }}>
          {project.title}
        </h3>

        <p
          style={{
            fontSize: "0.9rem",
            opacity: isDark ? 0.75 : 0.65,
            marginTop: "6px",
          }}
        >
          {project.shortDesc}
        </p>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "#22c55e" }}>
            ● Live Project
          </span>

          <span style={{ fontSize: "0.8rem", opacity: 0.6 }}>
            Click to view →
          </span>
        </div>
      </div>
    </motion.div>
  );
}
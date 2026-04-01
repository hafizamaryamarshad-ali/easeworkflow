"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fetchProjects, type Project } from "./lib/fetchProjects";
import { useTheme } from "./theme/ThemeProvider";
import { useRouter } from "next/navigation";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);
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
          fontSize: "3rem",
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

      {/* GRID */}
      <div
        className="featured-projects-grid"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "22px",
        }}
      >
        {projects.map((project) => (
          <TiltCard
            key={project._id}
            project={project}
            onClick={() => setSelected(project)}
            isDark={isDark}
          />
        ))}
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

      {/* MODAL */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: isDark ? "#0f172a" : "#ffffff",
              padding: "22px",
              borderRadius: "16px",
              maxWidth: "520px",
              width: "100%",
              color: isDark ? "#fff" : "#0f172a",
              boxShadow: isDark
                ? "none"
                : "0 20px 50px rgba(0,0,0,0.15)",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>
              {selected.title}
            </h2>

            <p style={{ opacity: 0.7, marginTop: "10px" }}>
              {selected.shortDesc}
            </p>

            <button
              onClick={() => setSelected(null)}
              style={{
                marginTop: "18px",
                padding: "10px 22px",
                borderRadius: "999px",
                border: "none",
                background: "#38bdf8",
                color: "#000",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ================= PREMIUM CARD ================= */

function TiltCard({
  project,
  onClick,
  isDark,
}: {
  project: Project;
  onClick: () => void;
  isDark: boolean;
}) {
  const [style, setStyle] = useState({
    transform: "perspective(1200px)",
    boxShadow: isDark
      ? "0 25px 60px rgba(0,0,0,0.5)"
      : "0 10px 30px rgba(14,165,233,0.12), 0 2px 10px rgba(0,0,0,0.05)",
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * -10;
    const rotateY = (x - 0.5) * 10;

    setStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
      boxShadow: isDark
        ? "0 25px 60px rgba(0,0,0,0.5)"
        : "0 20px 50px rgba(14,165,233,0.18), 0 4px 15px rgba(0,0,0,0.06)",
    });
  };

  return (
    <motion.div
      className="featured-project-card"
      onMouseMove={handleMove}
      onMouseLeave={() =>
        setStyle({
          transform: "perspective(1200px)",
          boxShadow: isDark
            ? "0 25px 60px rgba(0,0,0,0.5)"
            : "0 10px 30px rgba(14,165,233,0.12), 0 2px 10px rgba(0,0,0,0.05)",
        })
      }
      onClick={onClick}
      style={{
        width: "340px",
        borderRadius: "22px",
        overflow: "hidden",
        cursor: "pointer",
        background: isDark
          ? "linear-gradient(145deg, rgba(30,41,59,0.7), rgba(15,23,42,0.9))"
          : "linear-gradient(145deg, #ffffff, #f1f5f9)",
        border: isDark
          ? "1px solid rgba(56,189,248,0.25)"
          : "1px solid rgba(0,0,0,0.08)",
        transition: "0.3s",
        ...style,
      }}
    >
      {/* IMAGE */}
      <div style={{ position: "relative", height: "210px" }}>
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
      <div style={{ padding: "18px", textAlign: "left" }}>
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
            marginTop: "14px",
            display: "flex",
            justifyContent: "space-between",
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
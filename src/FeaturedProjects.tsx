"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchProjects, type Project } from "./lib/fetchProjects";

export default function FeaturedProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    const observer = new MutationObserver(() => {
      const bg = getComputedStyle(document.body).background;
      setTheme(bg.includes("linear-gradient") ? "dark" : "light");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    let isMounted = true;

    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProjects();
        if (isMounted) {
          setProjects(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load projects.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProjects();
    const intervalId = window.setInterval(loadProjects, 60000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
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
        position: "relative",
        padding: "80px 15px",
        background: bgColors[theme],
        color: textColors[theme],
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "80px" }}
      >
        Our Projects
      </motion.h2>

      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "25px",
        }}
      >
        {loading && (
          <p style={{ fontSize: "1rem", color: subTextColor[theme] }}>
            Loading projects...
          </p>
        )}

        {!loading && error && (
          <p style={{ fontSize: "1rem", color: "#ef4444" }}>{error}</p>
        )}

        {!loading && !error && projects.length === 0 && (
          <p style={{ fontSize: "1rem", color: subTextColor[theme] }}>No projects found.</p>
        )}

        {!loading &&
          !error &&
          projects.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -5, scale: 1.02 }}
              style={{
                flex: windowWidth < 640 ? "1 1 100%" : "1 1 280px",
                maxWidth: "320px",
                background: cardBg[theme],
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: boxShadow[theme],
                cursor: "pointer",
              }}
              onClick={() => router.push(`/projects/${project._id}`)}
            >
              {project.thumbnailUrl && (
                <div style={{ position: "relative", width: "100%", height: "200px" }}>
                  <Image
                    src={project.thumbnailUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <div style={{ padding: "18px", textAlign: "left" }}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "8px" }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: "1rem", color: subTextColor[theme], marginBottom: "6px" }}>
                  {project.shortDesc}
                </p>
              </div>
            </motion.div>
          ))}
      </div>

      <button
        onClick={() => router.push("/projects")}
        style={{
          marginTop: "50px",
          padding: "12px 35px",
          borderRadius: "10px",
          fontWeight: 700,
          background: "#0ea5e9",
          color: "#fff",
          cursor: "pointer",
          border: "none",
          width: windowWidth < 640 ? "90%" : "auto",
        }}
      >
        See More
      </button>
    </section>
  );
}
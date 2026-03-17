"use client";

import { useEffect, useState } from "react";
import { fetchProjects, type Project } from "../../lib/fetchProjects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProjects();
        if (isMounted) {
          setProjects(data);
          setCurrentIndex(0);
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

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "40px" }}>All Projects</h2>
        <p>Loading projects...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "40px" }}>All Projects</h2>
        <p>{error}</p>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "40px" }}>All Projects</h2>
        <p>No projects found.</p>
      </section>
    );
  }

  const project = projects[currentIndex];
  const videoUrl =
    project.videoUrl ??
    (typeof project.video === "string" ? project.video : project.video?.asset?.url ?? null);

  const nextProject = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <section style={{ padding: "80px 20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "40px" }}>All Projects</h2>

      <div style={{ maxWidth: "800px", margin: "auto" }}>
        {videoUrl && <video src={videoUrl} controls style={{ width: "100%", borderRadius: "20px" }} />}
        <h3 style={{ fontSize: "2rem", marginTop: "20px" }}>{project.title}</h3>
        <p style={{ fontSize: "1.1rem", color: "#475569" }}>{project.shortDesc}</p>
      </div>

      <div style={{ marginTop: "40px", display: "flex", justifyContent: "center", gap: "20px" }}>
        <button style={buttonStyle} onClick={prevProject}>Prev</button>
        <button style={buttonStyle} onClick={nextProject}>Next</button>
      </div>
    </section>
  );
}

const buttonStyle = {
  padding: "10px 25px",
  borderRadius: "8px",
  background: "#0ea5e9",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
};
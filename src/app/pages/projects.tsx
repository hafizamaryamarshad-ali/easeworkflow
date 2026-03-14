"use client";

import { useState } from "react";
import { projects } from "../../FeaturedProjects";

export default function ProjectsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const project = projects[currentIndex];

  const nextProject = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <section style={{ padding: "80px 20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "40px" }}>All Projects</h2>

      <div style={{ maxWidth: "800px", margin: "auto" }}>
        <video src={project.video} controls style={{ width: "100%", borderRadius: "20px" }} />
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
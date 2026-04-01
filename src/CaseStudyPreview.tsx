"use client";

import { motion } from "framer-motion";
import { useTheme } from "./theme/ThemeProvider";

const caseStudies = [
  {
    id: 1,
    title: "Hospital Workflow Automation System",
    industry: "Healthcare / Automation",
    summary:
      "A secure workflow automation platform built for European clinics to streamline patient admissions, approvals, and internal coordination while ensuring GDPR compliance.",
    result: "55% faster patient processing",
    image: "/images/story1.png",
  },
  {
    id: 2,
    title: "AI Medical Documentation Assistant",
    industry: "Healthcare AI / Web App",
    summary:
      "An AI-powered assistant that helps doctors generate clinical notes, prescriptions, and reports instantly with real-time editing and multilingual support tailored for European healthcare systems.",
    result: "3x faster documentation",
    image: "/images/story2.png",
  },
  {
    id: 3,
    title: "Smart CRM for Clinics & Patient Management",
    industry: "Healthcare / CRM System",
    summary:
      "A GDPR-ready CRM solution to manage patient records, automate follow-ups, and track treatment history with intelligent insights for modern clinics.",
    result: "40% improvement in patient retention",
    image: "/images/story3.png",
  },
];

export default function CaseStudy() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      style={{
        padding: "120px 20px",
        background: isDark ? "#020617" : "#f8fafc",
        color: isDark ? "#fff" : "#0f172a",
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "90px" }}>
        <h2 style={{ fontSize: "3rem", fontWeight: 900 }}>
          Healthcare Automation Solutions We Delivered
        </h2>
        <p style={{ opacity: 0.7, maxWidth: "650px", margin: "10px auto" }}>
          Real-world healthcare systems designed for European clinics — focused
          on automation, compliance, and better patient outcomes.
        </p>
      </div>

      {/* Sections */}
      <div style={{ maxWidth: "1100px", margin: "auto" }}>
        {caseStudies.map((item, i) => {
          const reverse = i % 2 !== 0;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: "flex",
                flexDirection: reverse ? "row-reverse" : "row",
                alignItems: "center",
                gap: "60px",
                marginBottom: "120px",
                flexWrap: "wrap",
              }}
            >
              {/* IMAGE */}
              <div style={{ flex: 1, minWidth: "300px" }}>
                <img
                  src={item.image}
                  style={{
                    width: "100%",
                    borderRadius: "20px",
                  }}
                  alt={item.title}
                />
              </div>

              {/* TEXT */}
              <div style={{ flex: 1, minWidth: "300px" }}>
                <h3 style={{ fontSize: "2rem", fontWeight: 800 }}>
                  {item.title}
                </h3>

                <p style={{ marginTop: "8px", opacity: 0.6 }}>
                  {item.industry}
                </p>

                <p style={{ marginTop: "12px", opacity: 0.85 }}>
                  {item.summary}
                </p>

                <p
                  style={{
                    marginTop: "15px",
                    color: "#38bdf8",
                    fontWeight: 700,
                  }}
                >
                  {item.result}
                </p>

                {/* UPDATED BADGE */}
                <div
                  style={{
                    marginTop: "20px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 14px",
                    borderRadius: "999px",
                    background: isDark
                      ? "rgba(56, 189, 248, 0.15)"
                      : "rgba(14, 165, 233, 0.1)",
                    border: "1px solid rgba(56, 189, 248, 0.4)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "#38bdf8",
                  }}
                >
                  <span>View Case Study</span>
                  <span style={{ fontSize: "1rem" }}>→</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
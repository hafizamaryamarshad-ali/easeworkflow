"use client";

import { motion } from "framer-motion";
import { useTheme } from "./theme/ThemeProvider";

const caseStudies = [
  {
    id: 1,
    title: "Business Process Automation System",
    industry: "Automation / SaaS",
    summary:
      "A web-based platform that automates repetitive workflows like approvals, task assignments, and notifications.",
    result: "60% reduction in manual work",
    image: "/images/story1.png",
  },
  {
    id: 2,
    title: "AI Content Generation Dashboard",
    industry: "AI / Web App",
    summary:
      "An advanced dashboard that generates blogs, ads, and social content using AI with live editing and previews.",
    result: "3x faster content creation",
    image: "/images/story2.png",
  },
  {
    id: 3,
    title: "CRM & Lead Management System",
    industry: "Business / Web App",
    summary:
      "A powerful CRM system to track leads, manage customer data, and automate follow-ups with smart insights.",
    result: "40% increase in conversions",
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
          Digital Solutions We Delivered
        </h2>
        <p style={{ opacity: 0.7, maxWidth: "600px", margin: "10px auto" }}>
          Powerful automation and web-based solutions that deliver real impact.
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

                {/* ⭐ NEW UNIQUE ELEMENT (instead of button) */}
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
                  🚀 Live Production Project
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#22c55e",
                      display: "inline-block",
                    }}
                  ></span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
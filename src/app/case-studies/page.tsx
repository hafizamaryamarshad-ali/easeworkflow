"use client";

import Link from "next/link";
import { caseStudies } from "../../data/caseStudies";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function CaseStudiesPage() {
  return (
    <section
      style={{
        padding: "80px 20px",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f1c2c, #1f2a48, #2a3a6e, #00c6ff)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 30s ease infinite",
        textAlign: "center",
      }}
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          fontSize: "3rem",
          fontWeight: 900,
          marginBottom: "60px",
          color: "#fff",
        }}
      >
        Case Studies
      </motion.h1>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        {caseStudies.map((study, i) => (
          <motion.div
            key={study.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 60px rgba(0,198,255,0.45)",
            }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            style={{
              width: "320px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              border: "2px solid rgba(0,198,255,0.2)",
              color: "#fff",
              overflow: "hidden",
              textAlign: "left",
            }}
          >
            {/* Featured Image */}
            {study.featuredImage && (
              <img
                src={study.featuredImage}
                alt={study.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                }}
              />
            )}

            <div style={{ padding: "25px" }}>
              {/* Title */}
              <h2
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  marginBottom: "10px",
                }}
              >
                {study.title}
              </h2>

              {/* Summary */}
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  opacity: 0.9,
                  marginBottom: "15px",
                }}
              >
                {study.summary}
              </p>

              {/* Tools */}
              <div style={{ marginBottom: "15px" }}>
                {study.tools?.map((tool, index) => (
                  <span
                    key={index}
                    style={{
                      display: "inline-block",
                      fontSize: "0.75rem",
                      padding: "4px 10px",
                      marginRight: "6px",
                      marginBottom: "6px",
                      borderRadius: "12px",
                      background: "rgba(0,198,255,0.2)",
                      color: "#00c6ff",
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Results Preview */}
              <div style={{ marginBottom: "20px" }}>
                {study.results?.slice(0, 2).map((result, index) => (
                  <p
                    key={index}
                    style={{
                      fontSize: "0.85rem",
                      opacity: 0.85,
                      marginBottom: "4px",
                    }}
                  >
                    • {result}
                  </p>
                ))}
              </div>

              {/* Link */}
              <Link
                href={`/case-studies/${study.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#00c6ff",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                View Case Study <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Animation */}
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
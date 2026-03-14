"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { caseStudies } from "../../../data/caseStudies";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

export default function CaseStudyDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) return notFound();

  return (
    <section
      style={{
        padding: "100px 20px",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f1c2c, #1f2a48, #2a3a6e, #00c6ff)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 30s ease infinite",
        color: "#fff",
        position: "relative",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 14px",
          borderRadius: "10px",
          border: "1px solid rgba(0,198,255,0.5)",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          color: "#00c6ff",
          cursor: "pointer",
          fontWeight: 600,
          transition: "0.3s ease",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.background = "rgba(0,198,255,0.2)")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
        }
      >
        <FiArrowLeft />
        Back
      </button>

      <div style={{ maxWidth: "900px", margin: "auto" }}>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: "2.8rem",
            fontWeight: 900,
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          {study.title}
        </motion.h1>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            padding: "40px",
            borderRadius: "20px",
            border: "2px solid rgba(0,198,255,0.2)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          }}
        >
          <p style={{ fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "30px" }}>
            {study.summary}
          </p>

          <h3 style={{ fontSize: "1.4rem", marginTop: "20px" }}>Client</h3>
          <p>{study.client}</p>

          <h3 style={{ fontSize: "1.4rem", marginTop: "20px" }}>Industry</h3>
          <p>{study.industry}</p>

          <h3 style={{ fontSize: "1.4rem", marginTop: "30px" }}>
            Problem
          </h3>
          <p style={{ lineHeight: 1.6 }}>{study.problem}</p>

          <h3 style={{ fontSize: "1.4rem", marginTop: "30px" }}>
            Solution
          </h3>
          <p style={{ lineHeight: 1.6 }}>{study.solution}</p>
        </motion.div>
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
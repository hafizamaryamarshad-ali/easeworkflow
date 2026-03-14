"use client";

import { motion } from "framer-motion";
import { FiCpu, FiGlobe, FiShield } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <section
      style={{
        position: "relative",
        padding: "100px 20px",
        minHeight: "100vh",
        color: "#f8fafc",
        background:
          "linear-gradient(135deg, #0f1c2c, #1f2a48, #2a3a6e, #00c6ff)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 35s ease infinite",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "8px 14px",
          borderRadius: "10px",
          border: "1px solid rgba(0,198,255,0.4)",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          color: "#00c6ff",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        ← Back
      </button>

      <div style={{ maxWidth: "1100px", margin: "auto" }}>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: "3rem",
            fontWeight: 900,
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          About EaseWorkflow
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: "1.15rem",
            lineHeight: 1.8,
            maxWidth: "850px",
            margin: "auto",
            textAlign: "center",
            opacity: 0.95,
          }}
        >
          EaseWorkflow is a premium healthcare automation agency delivering
          AI-driven solutions, workflow optimization, and digital transformation
          to modern healthcare institutions.
        </motion.p>

        {/* Images Row */}
        <div
          style={{
            marginTop: "90px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            alignItems: "center",
          }}
        >
          <motion.img
            src="images/about-illustration.png"
            alt="Healthcare Automation"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              width: "100%",
              borderRadius: "18px",
              boxShadow: "0 18px 50px rgba(0,0,0,0.3)",
            }}
          />

          <motion.img
            src="images/team-collaboration.png"
            alt="Team Collaboration"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              width: "100%",
              borderRadius: "18px",
              boxShadow: "0 18px 50px rgba(0,0,0,0.3)",
            }}
          />
        </div>

        {/* Cards */}
        <div
          style={{
            marginTop: "90px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
          }}
        >
          {[
            {
              title: "Our Mission",
              icon: <FiCpu size={26} />,
              desc: "Our mission is to transform healthcare operations through smart automation, AI-driven workflows, and digital innovation to reduce manual workload and improve efficiency.",
            },
            {
              title: "Our Vision",
              icon: <FiGlobe size={26} />,
              desc: "Our vision is to become a global leader in healthcare technology by delivering scalable, secure, and intelligent systems that empower medical institutions worldwide.",
            },
            {
              title: "Our Values",
              icon: <FiShield size={26} />,
              desc: "We value innovation, integrity, transparency, and excellence. Every solution is built with long-term reliability, security, and trust at its core.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              style={{
                padding: "32px",
                borderRadius: "20px",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                border: "2px solid rgba(0,198,255,0.2)",
                textAlign: "left",
              }}
            >
              <div style={{ color: "#00c6ff", marginBottom: "12px" }}>
                {item.icon}
              </div>

              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  marginBottom: "10px",
                }}
              >
                {item.title}
              </h3>

              <p style={{ lineHeight: 1.7, opacity: 0.95 }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
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
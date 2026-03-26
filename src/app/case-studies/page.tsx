"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { FaStethoscope, FaPills, FaHeart, FaSyringe } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { fetchCaseStudies, type CaseStudy } from "../../lib/fetchCaseStudies";
import { useTheme } from "../../theme/ThemeProvider";

export default function CaseStudiesPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  const sectionBg = {
    dark: "var(--bg-gradient-dark)",
    light: "#f5f7fa",
  };

  const textColor = { dark: "var(--color-text-primary)", light: "var(--color-text-dark)" };
  const subText = { dark: "var(--color-text-muted)", light: "var(--color-text-muted-light)" };
  const accent = { dark: "var(--color-primary)", light: "var(--color-secondary)" };

  // Card styling swapped to match the original Projects page look
  const cardBg = {
    dark: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(14,165,233,0.05))",
    light: "linear-gradient(145deg, #e0f2fe, #ffffff)",
  };
  const cardBorder = {
    dark: "1px solid rgba(255,255,255,0.15)",
    light: "1px solid rgba(14,165,233,0.18)",
  };
  const cardShadow = {
    dark: "0 8px 20px rgba(0,0,0,0.2)", // subtle dark shadow
    light: "0 8px 20px rgba(0,0,0,0.1)", // subtle light shadow
  };

  const floatingIcons = [
    { Icon: FaStethoscope, size: 50, top: "10%", left: "8%", speed: 18, opacity: 0.14 },
    { Icon: FaPills, size: 42, top: "25%", left: "88%", speed: 20, opacity: 0.12 },
    { Icon: FaHeart, size: 54, top: "78%", left: "6%", speed: 22, opacity: 0.13 },
    { Icon: FaStethoscope, size: 38, top: "42%", left: "4%", speed: 19, opacity: 0.1 },
    { Icon: FaPills, size: 36, top: "63%", left: "92%", speed: 21, opacity: 0.11 },
    { Icon: FaSyringe, size: 46, top: "16%", left: "80%", speed: 23, opacity: 0.12 },
  ];

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadCaseStudies = async () => {
      try {
        const data = await fetchCaseStudies();
        if (isMounted) setCaseStudies(data.filter((study) => Boolean(study.slug)));
      } catch {
        if (isMounted) setCaseStudies([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCaseStudies();
    return () => { isMounted = false; };
  }, []);

  return (
    <section
      style={{
        padding: "80px 20px",
        minHeight: "100vh",
        backgroundColor: theme === "dark" ? "#0f172a" : sectionBg.light,
        backgroundImage: theme === "dark" ? sectionBg.dark : "none",
        backgroundSize: "600% 600%",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        textAlign: "center",
        position: "relative",
      }}
    >
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: ["0%", "-18%", "0%"] }}
          transition={{
            duration: icon.speed,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: icon.top,
            left: icon.left,
            fontSize: icon.size,
            opacity: icon.opacity,
            pointerEvents: "none",
            zIndex: 0,
            color: theme === "dark" ? "#0ea5e9" : "#3b82f6",
            textShadow:
              theme === "dark"
                ? "0 0 12px rgba(14,165,233,0.5), 0 0 24px rgba(37,99,235,0.45)"
                : "none",
          }}
        >
          <icon.Icon />
        </motion.div>
      ))}
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          fontSize: "3rem",
          fontWeight: 900,
          marginBottom: "60px",
          color: textColor[theme],
        }}
      >
        Case Studies
      </motion.h1>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {loading && (
          <p style={{ color: subText[theme], fontSize: "1rem", opacity: 0.9 }}>
            Loading case studies...
          </p>
        )}

        {!loading && caseStudies.length === 0 && (
          <p style={{ color: subText[theme], fontSize: "1rem", opacity: 0.9 }}>
            No case studies found.
          </p>
        )}

        {!loading &&
          caseStudies.map((study, i) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              style={{
                width: "100%",
                maxWidth: "900px",
                textDecoration: "none",
                display: "block",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: "flex",
                  flexDirection: windowWidth < 640 ? "column" : "row",
                  width: "100%",
                  maxWidth: "900px",

                  background: cardBg[theme],
                  borderRadius: "20px",
                  boxShadow: cardShadow[theme],
                  border: cardBorder[theme],
                  backdropFilter: theme === "dark" ? "blur(16px)" : "none",
                  overflow: "hidden",
                  cursor: "pointer",
                  color: theme === "dark" ? "#ffffff" : "#0f172a",
                }}
              >
                {study.featuredImageUrl && (
                  <img
                    src={study.featuredImageUrl}
                    alt={study.title}
                    style={{
                      width: windowWidth < 640 ? "100%" : "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius:
                        windowWidth < 640 ? "20px 20px 0 0" : "0 0 0 20px",
                    }}
                  />
                )}

                <div style={{ padding: "15px 20px", textAlign: "left" }}>
                  <h2
                    style={{
                      fontSize: "1.45rem",
                      fontWeight: 700,
                      color:
                        theme === "dark"
                          ? "rgba(255,255,255,0.96)"
                          : "rgba(15,23,42,0.96)",
                    }}
                  >
                    {study.title}
                  </h2>

                  <p
                    style={{
                      lineHeight: 1.6,
                      color:
                        theme === "dark"
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(15,23,42,0.8)",
                    }}
                  >
                    {study.summary}
                  </p>

                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      color:
                        theme === "dark"
                          ? "rgba(255,255,255,0.92)"
                          : "rgba(15,23,42,0.92)",
                      fontWeight: 600,
                    }}
                  >
                    View Case Study <FiArrowRight />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
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
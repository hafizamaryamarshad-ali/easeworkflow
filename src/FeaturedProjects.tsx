"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { fetchProjects, type Project } from "./lib/fetchProjects";
import { useTheme } from "./theme/ThemeProvider";
import { useRouter } from "next/navigation";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
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
  const canSlide = projects.length > 1;

  // Use the full project list in both rows so every project
  // is visible in each marquee, then duplicate for seamless loops.
  const allWithIndex = projects.map((project, index) => ({ project, index }));

  return (
    <section
      className="featured-projects-section"
      style={{
        padding: "30px 15px 50px",
        background: isDark ? "#020617" : "#f1f5f9",
        color: isDark ? "#fff" : "#0f172a",
        textAlign: "center",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{
          fontSize: "clamp(2.2rem, 4.5vw, 3rem)",
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

      <div className="featured-projects-desktop" style={{ maxWidth: "1200px", margin: "30px auto 0", display: "flex", flexDirection: "column", gap: "26px", overflow: "hidden" }}>
        {allWithIndex.length > 0 && (
          <div className="featured-projects-row featured-projects-row--top">
            <div className="featured-projects-track">
              {[...allWithIndex, ...allWithIndex].map(({ project, index }, i) => (
                <TiltCard
                  key={`${project._id}-top-${i}`}
                  project={project}
                  gradientIndex={index}
                  onClick={() => router.push(`/projects/${project.slug || project._id}`)}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>
        )}

        {allWithIndex.length > 0 && (
          <div className="featured-projects-row featured-projects-row--bottom">
            <div className="featured-projects-track">
              {[...allWithIndex, ...allWithIndex].map(({ project, index }, i) => (
                <TiltCard
                  key={`${project._id}-bottom-${i}`}
                  project={project}
                  gradientIndex={index}
                  onClick={() => router.push(`/projects/${project.slug || project._id}`)}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="featured-projects-mobile">
        {projects.length > 0 && (
          <Swiper
            className="featured-projects-mobile-swiper"
            modules={[Autoplay, Navigation, Pagination]}
            loop={canSlide}
            watchOverflow
            grabCursor={canSlide}
            simulateTouch={canSlide}
            allowTouchMove={canSlide}
            centeredSlides={false}
            speed={900}
            autoplay={
              canSlide
                ? {
                    delay: 2200,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                  }
                : false
            }
            navigation={canSlide}
            pagination={{ clickable: true }}
            slidesPerView={1.08}
            spaceBetween={14}
          >
            {projects.map((project, index) => (
              <SwiperSlide key={project._id}>
                <TiltCard
                  project={project}
                  gradientIndex={index}
                  onClick={() => router.push(`/projects/${project.slug || project._id}`)}
                  isDark={isDark}
                  mobile
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "14px",
          flexWrap: "wrap",
        }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/projects")}
          style={{
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

        <a
          href="https://cloudworkflow.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "14px 22px",
            fontWeight: 700,
            fontSize: "0.96rem",
            borderRadius: "999px",
            border: isDark ? "1.5px solid rgba(56,189,248,0.55)" : "1.5px solid rgba(59,130,246,0.35)",
            background: isDark ? "rgba(15,23,42,0.78)" : "rgba(248,250,252,0.98)",
            color: isDark ? "#e5f6ff" : "#1d4ed8",
            textDecoration: "none",
            transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out, background 0.2s ease-out, color 0.2s ease-out",
            backdropFilter: "blur(14px)",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            boxShadow:
              isDark
                ? "0 12px 28px rgba(15,23,42,0.48)"
                : "0 12px 26px rgba(148,163,184,0.36)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              isDark ? "rgba(15,23,42,0.9)" : "#e0edff";
            e.currentTarget.style.color = isDark ? "#f9fafb" : "#1e3a8a";
            e.currentTarget.style.boxShadow = isDark
              ? "0 16px 36px rgba(15,23,42,0.72)"
              : "0 16px 34px rgba(148,163,184,0.56)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              isDark ? "rgba(15,23,42,0.78)" : "rgba(248,250,252,0.98)";
            e.currentTarget.style.color = isDark ? "#e5f6ff" : "#1d4ed8";
            e.currentTarget.style.boxShadow = isDark
              ? "0 12px 28px rgba(15,23,42,0.48)"
              : "0 12px 26px rgba(148,163,184,0.36)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Explore Other Services →
        </a>
      </div>

      <style jsx global>{`
        .featured-projects-mobile {
          display: none;
        }

        @media (max-width: 767px) {
          .featured-projects-desktop {
            display: none !important;
          }

          .featured-projects-mobile {
            display: block;
            width: 100vw;
            max-width: 100vw;
            margin: 24px auto 0;
            margin-left: calc(50% - 50vw);
            padding: 0 15px;
            box-sizing: border-box;
            overflow: hidden;
          }

          .featured-projects-section {
            padding-left: 0 !important;
            padding-right: 0 !important;
            overflow-x: clip;
          }

          .featured-projects-mobile-swiper {
            width: 100%;
            padding: 6px 0 34px;
            overflow: hidden;
          }

          .featured-projects-mobile-swiper .swiper-slide {
            height: auto;
            display: flex;
          }

          .featured-projects-mobile-swiper .swiper-pagination {
            bottom: 0 !important;
          }

          .featured-projects-mobile-swiper .swiper-pagination-bullet {
            background: ${isDark ? "rgba(255,255,255,0.35)" : "rgba(15,23,42,0.28)"};
            opacity: 1;
            width: 8px;
            height: 8px;
          }

          .featured-projects-mobile-swiper .swiper-pagination-bullet-active {
            background: ${isDark ? "#38bdf8" : "#2563eb"};
          }

          .featured-projects-mobile-swiper .swiper-button-next,
          .featured-projects-mobile-swiper .swiper-button-prev {
            width: 36px;
            height: 36px;
            border-radius: 999px;
            background: ${isDark ? "rgba(2,6,23,0.94)" : "rgba(255,255,255,0.96)"};
            border: ${isDark ? "1px solid rgba(56,189,248,0.3)" : "1px solid rgba(59,130,246,0.18)"};
            color: ${isDark ? "#e2e8f0" : "#0f172a"};
            box-shadow: ${isDark ? "0 14px 30px rgba(0,0,0,0.32)" : "0 10px 24px rgba(15,23,42,0.14)"};
            top: calc(50% - 16px);
          }

          .featured-projects-mobile-swiper .swiper-button-next::after,
          .featured-projects-mobile-swiper .swiper-button-prev::after {
            font-size: 14px;
            font-weight: 800;
          }

          .featured-projects-mobile-swiper .swiper-button-prev {
            left: 2px;
          }

          .featured-projects-mobile-swiper .swiper-button-next {
            right: 2px;
          }
        }

        @media (min-width: 768px) {
          .featured-projects-desktop {
            display: flex;
          }
        }
      `}</style>
    </section>
  );
}

/* ================= PREMIUM CARD ================= */

// Light theme uses soft but colorful SaaS-style gradients
// inspired by Tailwind shades (blue-50, indigo-50, purple-50, etc.).
// Goal: colorful yet gentle on a light background.
const lightGradients = [
  // from-blue-50 via-white to-purple-50
  "linear-gradient(135deg, #eff6ff 0%, #ffffff 48%, #faf5ff 100%)",
  // from-indigo-50 to-blue-100
  "linear-gradient(135deg, #eef2ff 0%, #dbeafe 100%)",
  // from-pink-50 to-purple-100
  "linear-gradient(135deg, #fdf2f8 0%, #e9d5ff 100%)",
  // soft teal / cyan accent
  "linear-gradient(135deg, #ecfeff 0%, #e0f2fe 100%)",
  // warm subtle amber / rose
  "linear-gradient(135deg, #fff7ed 0%, #fef2f2 100%)",
];

const darkGradients = [
  "linear-gradient(135deg, #1e293b, #0f172a)",
  "linear-gradient(135deg, #0f766e, #022c22)",
  "linear-gradient(135deg, #7e22ce, #312e81)",
  "linear-gradient(135deg, #b91c1c, #7f1d1d)",
  "linear-gradient(135deg, #0369a1, #020617)",
];

function TiltCard({
  project,
  onClick,
  isDark,
  gradientIndex,
  mobile = false,
}: {
  project: Project;
  onClick: () => void;
  isDark: boolean;
  gradientIndex: number;
  mobile?: boolean;
}) {
  const palette = isDark ? darkGradients : lightGradients;
  const background = palette[gradientIndex % palette.length];

  return (
    <motion.div
      className="featured-project-card"
      onClick={onClick}
      animate={mobile ? undefined : { y: [0, -6, 0] }}
      whileHover={{
        scale: 1.03,
        boxShadow: isDark
          ? "0 30px 80px rgba(0,0,0,0.65)"
          : "0 20px 50px rgba(15,23,42,0.2)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        ...(mobile
          ? {}
          : {
              y: {
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }),
        scale: { type: "spring", stiffness: 260, damping: 22 },
      }}
      style={{
        width: mobile ? "100%" : "380px",
        minWidth: mobile ? 0 : "300px",
        maxWidth: mobile ? "100%" : "380px",
        borderRadius: "22px",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        background,
        border: isDark
          ? "1px solid rgba(56,189,248,0.25)"
          : "1px solid rgba(191,219,254,0.9)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
        boxShadow: isDark
          ? "0 24px 60px rgba(0,0,0,0.55)"
          : "0 10px 30px rgba(148,163,184,0.25)",
        transformOrigin: "center",
        willChange: "transform, box-shadow",
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          position: "relative",
          height: mobile ? "clamp(160px, 44vw, 200px)" : "180px",
          flexShrink: 0,
        }}
      >
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
      <div
        style={{
          padding: "18px",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
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

        <h3
          style={{
            marginTop: "10px",
            fontSize: "1.3rem",
            fontWeight: 800,
            color: isDark ? "#e5e7eb" : "#111827",
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: "0.9rem",
            color: isDark ? "rgba(226,232,240,0.8)" : "#4b5563",
            marginTop: "6px",
          }}
        >
          {project.shortDesc}
        </p>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
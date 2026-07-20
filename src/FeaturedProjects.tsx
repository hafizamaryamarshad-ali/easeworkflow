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
        background: isDark ? "#020617" : "#f8fafc",
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

/* ================= PREMIUM SaaS GRADIENTS ================= */

const softLightGradients = [
  "linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)", 
  "linear-gradient(180deg, #f3e8ff 0%, #e9d5ff 100%)", 
  "linear-gradient(180deg, #ffedd5 0%, #fed7aa 100%)", 
  "linear-gradient(180deg, #ecfdf5 0%, #d1fae5 100%)", 
  "linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)", 
  "linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%)", 
  "linear-gradient(180deg, #fef2f2 0%, #fee2e2 100%)", 
  "linear-gradient(180deg, #f0fdfa 0%, #ccfbf1 100%)", 
  "linear-gradient(180deg, #fefce8 0%, #fef9c3 100%)", 
];

const softDarkGradients = [
  "radial-gradient(ellipse at bottom right, rgba(6, 182, 212, 0.15) 0%, #0b1329 80%)",  
  "radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.15) 0%, #0b1329 80%)", 
  "radial-gradient(ellipse at bottom right, rgba(249, 115, 22, 0.12) 0%, #0b1329 80%)",  
  "radial-gradient(ellipse at bottom right, rgba(5, 150, 105, 0.15) 0%, #0b1329 80%)",  
  "radial-gradient(ellipse at bottom right, rgba(100, 116, 139, 0.15) 0%, #0b1329 80%)", 
  "radial-gradient(ellipse at bottom right, rgba(37, 99, 213, 0.15) 0%, #0b1329 80%)",  
  "radial-gradient(ellipse at bottom right, rgba(220, 38, 38, 0.12) 0%, #0b1329 80%)",  
  "radial-gradient(ellipse at bottom right, rgba(13, 148, 136, 0.15) 0%, #0b1329 80%)",  
  "radial-gradient(ellipse at bottom right, rgba(234, 179, 8, 0.12) 0%, #0b1329 80%)",   
];

const darkBorderColors = [
  "rgba(6, 182, 212, 0.2)",
  "rgba(168, 85, 247, 0.2)",
  "rgba(249, 115, 22, 0.15)",
  "rgba(5, 150, 105, 0.2)",
  "rgba(100, 116, 139, 0.2)",
  "rgba(37, 99, 213, 0.2)",
  "rgba(220, 38, 38, 0.15)",
  "rgba(13, 148, 136, 0.2)",
  "rgba(234, 179, 8, 0.15)",
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
  const bottomPanelGradient = isDark 
    ? softDarkGradients[gradientIndex % softDarkGradients.length]
    : softLightGradients[gradientIndex % softLightGradients.length];

  const activeBorder = isDark 
    ? darkBorderColors[gradientIndex % darkBorderColors.length]
    : "rgba(15, 23, 42, 0.06)";

  return (
    <motion.div
      className="featured-project-card"
      onClick={onClick}
      animate={mobile ? undefined : { y: [0, -6, 0] }}
      whileHover={{
        scale: 1.03,
        boxShadow: isDark
          ? "0 40px 90px rgba(0,0,0,0.75)"
          : "0 25px 55px rgba(148,163,184,0.18)",
        borderColor: isDark 
          ? darkBorderColors[gradientIndex % darkBorderColors.length].replace("0.2", "0.4") 
          : "rgba(15, 23, 42, 0.12)",
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
        borderRadius: "24px",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        background: isDark ? "#0b1329" : "#ffffff", 
        border: `1px solid ${activeBorder}`,
        transition: "box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease",
        boxShadow: isDark
          ? "0 24px 50px rgba(0,0,0,0.55)"
          : "0 14px 38px rgba(148,163,184,0.08)",
        transformOrigin: "center",
        willChange: "transform, box-shadow, border-color",
      }}
    >
      {/* TOP CONTAINER FOR CLEAN IMAGES */}
      <div
        style={{
          position: "relative",
          height: mobile ? "160px" : "185px",
          background: isDark ? "#090d16" : "#f1f5f9",
          flexShrink: 0,
          overflow: "hidden"
        }}
      >
        {project.thumbnailUrl ? (
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            priority
            style={{ 
              objectFit: "cover",
              objectPosition: "top center"
            }}
          />
        ) : (
          <div style={{ fontSize: "2.5rem", opacity: 0.15, display: "flex", height: "100%", alignItems: "center", justifyContent: "center" }}>✦</div>
        )}
      </div>

      {/* BOTTOM CONTAINER WITH SOFT SAAS/AURORA BLENDS */}
      <div
        style={{
          padding: "24px 22px 22px",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          background: bottomPanelGradient,
        }}
      >
        <span
          style={{
            fontSize: "10px",
            alignSelf: "flex-start",
            padding: "4px 12px",
            borderRadius: "999px",
            background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.6)",
            color: isDark ? "#94a3b8" : "#475569",
            border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(15,23,42,0.06)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          ✦ {project.industry || "Automation"}
        </span>

        <h3
          style={{
            marginTop: "12px",
            fontSize: "1.25rem",
            fontWeight: 800,
            color: isDark ? "#f8fafc" : "#1e293b",
            lineHeight: "1.35",
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: "0.88rem",
            color: isDark ? "#94a3b8" : "#475569",
            marginTop: "8px",
            lineHeight: "1.55",
            flex: 1,
          }}
        >
          {project.shortDesc}
        </p>

        <div
          style={{
            marginTop: "20px",
            paddingTop: "14px",
            borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(15,23,42,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.78rem", color: "#10b981", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
            Live Project
          </span>

          <span style={{ fontSize: "0.8rem", color: isDark ? "#38bdf8" : "#4f46e5", fontWeight: 700 }}>
            Click to view →
          </span>
        </div>
      </div>
    </motion.div>
  );
}
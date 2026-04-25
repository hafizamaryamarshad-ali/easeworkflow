"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { fetchProjects, type Project } from "./lib/fetchProjects";
import { useTheme } from "./theme/ThemeProvider";

const lightGradients = [
  "linear-gradient(135deg, #eff6ff 0%, #ffffff 48%, #faf5ff 100%)",
  "linear-gradient(135deg, #eef2ff 0%, #dbeafe 100%)",
  "linear-gradient(135deg, #fdf2f8 0%, #e9d5ff 100%)",
  "linear-gradient(135deg, #ecfeff 0%, #e0f2fe 100%)",
  "linear-gradient(135deg, #fff7ed 0%, #fef2f2 100%)",
];

const darkGradients = [
  "linear-gradient(135deg, #1e293b, #0f172a)",
  "linear-gradient(135deg, #0f766e, #022c22)",
  "linear-gradient(135deg, #7e22ce, #312e81)",
  "linear-gradient(135deg, #b91c1c, #7f1d1d)",
  "linear-gradient(135deg, #0369a1, #020617)",
];

const swiperBreakpoints = {
  0: {
    slidesPerView: 1,
    spaceBetween: 14,
  },
  640: {
    slidesPerView: 1.15,
    spaceBetween: 16,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 24,
  },
  1280: {
    slidesPerView: 3,
    spaceBetween: 28,
  },
};

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

  return (
    <section
      style={{
        padding: "30px 15px 56px",
        background: isDark ? "#020617" : "#f1f5f9",
        color: isDark ? "#fff" : "#0f172a",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{
          fontSize: "clamp(2.2rem, 4.5vw, 3rem)",
          fontWeight: 900,
          marginBottom: "4px",
          marginTop: 0,
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

      <div
        style={{
          maxWidth: "1200px",
          margin: "28px auto 0",
          position: "relative",
          paddingBottom: "56px",
        }}
      >
        {projects.length > 0 && (
          <Swiper
            className="featured-projects-swiper"
            modules={[Autoplay, Navigation, Pagination]}
            loop={canSlide}
            watchOverflow
            grabCursor={canSlide}
            simulateTouch={canSlide}
            allowTouchMove={canSlide}
            centeredSlides={false}
            speed={850}
            autoplay={
              canSlide
                ? {
                    delay: 2600,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            navigation={canSlide}
            pagination={{ clickable: true }}
            breakpoints={swiperBreakpoints}
          >
            {projects.map((project, index) => (
              <SwiperSlide key={project._id}>
                <ProjectCard
                  project={project}
                  gradientIndex={index}
                  onClick={() => router.push(`/projects/${project.slug || project._id}`)}
                  isDark={isDark}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/projects")}
        style={{
          marginTop: "30px",
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

      <style jsx global>{`
        .featured-projects-swiper {
          padding: 6px 56px 22px;
          overflow: visible;
        }

        .featured-projects-swiper .swiper-wrapper {
          align-items: stretch;
        }

        .featured-projects-swiper .swiper-slide {
          height: auto;
          display: flex;
        }

        .featured-projects-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .featured-projects-swiper .swiper-pagination-bullet {
          background: ${isDark ? "rgba(255,255,255,0.35)" : "rgba(15,23,42,0.25)"};
          opacity: 1;
          width: 9px;
          height: 9px;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .featured-projects-swiper .swiper-pagination-bullet-active {
          background: ${isDark ? "#38bdf8" : "#2563eb"};
          transform: scale(1.15);
        }

        .featured-projects-swiper .swiper-button-next,
        .featured-projects-swiper .swiper-button-prev {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          background: ${isDark ? "rgba(2,6,23,0.92)" : "rgba(255,255,255,0.94)"};
          border: ${isDark ? "1px solid rgba(56,189,248,0.28)" : "1px solid rgba(59,130,246,0.16)"};
          color: ${isDark ? "#e2e8f0" : "#0f172a"};
          box-shadow: ${isDark ? "0 18px 40px rgba(0,0,0,0.35)" : "0 14px 30px rgba(15,23,42,0.16)"};
          backdrop-filter: blur(12px);
          top: calc(50% - 18px);
        }

        .featured-projects-swiper .swiper-button-next::after,
        .featured-projects-swiper .swiper-button-prev::after {
          font-size: 16px;
          font-weight: 800;
        }

        .featured-projects-swiper .swiper-button-prev {
          left: 8px;
        }

        .featured-projects-swiper .swiper-button-next {
          right: 8px;
        }

        @media (max-width: 767px) {
          .featured-projects-swiper {
            padding-inline: 42px;
          }

          .featured-projects-swiper .swiper-button-next,
          .featured-projects-swiper .swiper-button-prev {
            width: 38px;
            height: 38px;
          }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({
  project,
  onClick,
  isDark,
  gradientIndex,
}: {
  project: Project;
  onClick: () => void;
  isDark: boolean;
  gradientIndex: number;
}) {
  const palette = isDark ? darkGradients : lightGradients;
  const background = palette[gradientIndex % palette.length];

  return (
    <motion.div
      className="featured-project-card"
      onClick={onClick}
      whileHover={{
        scale: 1.03,
        boxShadow: isDark
          ? "0 30px 80px rgba(0,0,0,0.65)"
          : "0 20px 50px rgba(15,23,42,0.2)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        scale: { type: "spring", stiffness: 260, damping: 22 },
      }}
      style={{
        width: "100%",
        maxWidth: "390px",
        minWidth: 0,
        height: "100%",
        margin: "0 auto",
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
      <div
        style={{
          position: "relative",
          height: "clamp(180px, 24vw, 220px)",
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
            background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
          }}
        />
      </div>

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
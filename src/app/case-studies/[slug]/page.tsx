"use client";

import { useEffect, useMemo, useState } from "react";
import type React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";
import {
  FiCheck,
  FiUsers,
  FiShoppingBag,
  FiTag,
  FiArrowUpRight,
  FiLayers,
  FiMessageCircle,
  FiTrendingUp,
  FiCpu,
} from "react-icons/fi";
import { fetchCaseStudies, type CaseStudy } from "../../../lib/fetchCaseStudies";
import { useTheme } from "../../../theme/ThemeProvider";

// Inline SVG icons for Problem & Solution cards
const ProblemIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
  width={54}
  height={54}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 4.5l8.1 14a1 1 0 01-.87 1.5H4.77a1 1 0 01-.87-1.5L12 4.5z" />
    <path d="M12 10.5v4" />
    <path d="M12 16.5h.01" />
  </svg>
);

const SolutionIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
  width={54}
  height={54}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9.2 12.6l1.9 2 3.7-4.4" />
  </svg>
);

// Doctor illustration for Problem section hero icon
const ProblemDoctorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={200}
    height={200}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Soft circular background */}
    <circle cx="40" cy="40" r="32" fill="#DBEAFE" />

    {/* Body / coat */}
    <rect
      x="26"
      y="40"
      width="28"
      height="20"
      rx="6"
      fill="#FFFFFF"
    />
    <path
      d="M40 40c-4 6-5.5 9.5-6.4 13.5"
      stroke="#BFDBFE"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M40 40c4 6 5.5 9.5 6.4 13.5"
      stroke="#BFDBFE"
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    {/* Head */}
    <circle cx="40" cy="30" r="9.5" fill="#FBBF9E" />

    {/* Hair */}
    <path
      d="M32.5 29c0-4.3 3.2-7.5 7.8-7.5 3.6 0 6.4 1.9 7.4 4.9-.9-.4-1.9-.6-3-.6-3.5 0-5.6 1.8-6.7 3.7-1-.5-2.1-.7-3.5-.5z"
      fill="#1F2937"
    />

    {/* Eyes */}
    <circle cx="37" cy="30" r="0.9" fill="#111827" />
    <circle cx="43" cy="30" r="0.9" fill="#111827" />

    {/* Concerned eyebrows */}
    <path
      d="M35.3 28.2c.9-.7 1.9-1 3-1"
      stroke="#111827"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M41.7 27.2c1.1.1 2 .4 2.8.9"
      stroke="#111827"
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    {/* Mouth - subtle thinking expression */}
    <path
      d="M37.3 33.5c.7.6 1.5.9 2.7.9 1 0 1.8-.3 2.4-.8"
      stroke="#EA580C"
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    {/* Stethoscope */}
    <path
      d="M32.5 39.5v2.8c0 2.6 1.7 4.7 3.9 4.7 2.1 0 3.9-2.1 3.9-4.7V39"
      stroke="#0EA5E9"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle cx="32.5" cy="38.6" r="1.2" fill="#0EA5E9" />
    <circle cx="40.3" cy="39" r="1.3" fill="#0EA5E9" />

    {/* Clipboard in hand for "analysis" feel */}
    <rect
      x="46"
      y="41"
      width="8.2"
      height="10.5"
      rx="1.5"
      fill="#EFF6FF"
      stroke="#93C5FD"
      strokeWidth="1.2"
    />
    <path
      d="M47.6 44.5h5.1"
      stroke="#60A5FA"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
    <path
      d="M47.6 47h4.1"
      stroke="#60A5FA"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
  </svg>
);

export default function CaseStudyDetail() {
  const params = useParams();
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const slug = useMemo(
    () => (Array.isArray(params?.slug) ? params.slug[0] : params?.slug),
    [params?.slug]
  );
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchCaseStudies().then((all) => {
      setStudy(all.find((item) => item.slug === slug) ?? null);
      setLoading(false);
    });
  }, [slug]);

  // --- Auto-play Slider Logic ---
  useEffect(() => {
    if (!study) return;
    const images = [study.featuredImageUrl, ...(study.galleryImageUrls || [])].filter(Boolean);
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [study]);

  if (loading || !study) return null;

  const sliderImages = [study.featuredImageUrl, ...(study.galleryImageUrls || [])].filter(Boolean);
  const hasSliderImages = sliderImages.length > 0;

  const hasProblem = Array.isArray(study.problem) && study.problem.length > 0;
  const hasExplanation = Array.isArray(study.explanation) && study.explanation.length > 0;
  const hasSolution = Array.isArray(study.solution) && study.solution.length > 0;
  const hasSolutionContent = hasExplanation || hasSolution;
  const hasTools = Array.isArray(study.tools) && study.tools.length > 0;
  const hasResults = Array.isArray(study.results) && study.results.length > 0;
  const hasProblemCards = Array.isArray(study.problemCards) && study.problemCards.length > 0;
  const hasSolutionCards = Array.isArray(study.solutionCards) && study.solutionCards.length > 0;
  const hasKeyFeatures = Array.isArray(study.keyFeatures) && study.keyFeatures.length > 0;

  const colors = {
    bg: isDark ? "#0a0c10" : "#f5f7fb",
    card: isDark ? "rgba(255, 255, 255, 0.03)" : "#f9fafb",
    text: isDark ? "#f8fafc" : "#1e293b",
    subText: isDark ? "#94a3b8" : "#64748b",
    border: isDark ? "rgba(255, 255, 255, 0.08)" : "#f1f5f9",
    accent: "#4f46e5",
    secondary: "#00d1ff",
    line: isDark ? "rgba(79, 70, 229, 0.3)" : "rgba(79, 70, 229, 0.15)",
  };

  return (
    <div
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        minHeight: "100vh",
        transition: "0.4s ease",
      }}
    >
      {/* 1. HERO SECTION (With Slider) */}
      <section
        style={{
          width: "100%",
          padding: "80px 20px 0",
          background: isDark
            ? `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), ${colors.bg}`
            : "linear-gradient(135deg, #e0f2e9 0%, #f6fbff 100%)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            color: colors.accent,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontSize: "0.8rem",
            marginBottom: "15px",
          }}
        >
          {study.industry ? `${study.industry} Case Study` : "Case Study"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            maxWidth: "800px",
            margin: "0 auto 50px",
          }}
        >
          {study.title}
        </motion.h1>

        {/* Auto-Slider */}
        {hasSliderImages && (
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "850px",
              height: "480px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={sliderImages[currentSlide] as string}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8 }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "40px",
                  zIndex: 2,
                  marginBottom: "-40px",
                  boxShadow: "0 30px 70px rgba(0,0,0,0.3)",
                  border: `8px solid ${colors.card}`,
                }}
              />
            </AnimatePresence>

            <div
              style={{
                position: "absolute",
                bottom: "0",
                display: "flex",
                gap: "10px",
                zIndex: 10,
              }}
            >
              {sliderImages.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: currentSlide === i ? "30px" : "10px",
                    height: "10px",
                    borderRadius: "10px",
                    background:
                      currentSlide === i ? colors.accent : colors.subText,
                    transition:
                      "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 2. PROBLEM SECTION (Rocket Replaced with Teddy Bear 🐻) */}
      {hasProblemCards && (
        <section style={{ padding: "140px 20px 100px", position: "relative" }}>
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '80px' }}>
            {/* Problem doctor illustration icon */}
            <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>
              <ProblemDoctorIcon style={{ display: 'block', margin: '0 auto' }} />
            </div>
            <div style={{ background: colors.card, padding: '15px 50px', borderRadius: '20px', display: 'inline-block', border: `1px solid ${colors.border}`, boxShadow: '0 15px 35px rgba(0,0,0,0.05)' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: colors.accent, margin: 0 }}>The Problem</h2>
            </div>
            <div style={{ maxWidth: '700px', margin: '30px auto', color: colors.subText, fontSize: '1.2rem', lineHeight: 1.8 }}>
              <PortableText value={study.problem} />
            </div>
          </div>

          <svg style={{ position: 'absolute', top: '280px', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '1100px', height: '300px', zIndex: 1, pointerEvents: 'none', opacity: 0.5 }}>
            <path d="M550,0 C550,120 150,80 150,250" stroke={colors.line} fill="transparent" strokeWidth="2" strokeDasharray="6,6" />
            <path d="M550,0 C550,120 420,80 420,250" stroke={colors.line} fill="transparent" strokeWidth="2" strokeDasharray="6,6" />
            <path d="M550,0 C550,120 680,80 680,250" stroke={colors.line} fill="transparent" strokeWidth="2" strokeDasharray="6,6" />
            <path d="M550,0 C550,120 950,80 950,250" stroke={colors.line} fill="transparent" strokeWidth="2" strokeDasharray="6,6" />
          </svg>

          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "25px", position: 'relative', zIndex: 2 }}>
            {study.problemCards!.map((card, i) => {
              const icon = card.type === "solution" ? <SolutionIcon /> : <ProblemIcon />;

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  style={{
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(15,23,42,0.88))'
                      : 'linear-gradient(135deg, #ffffff, #e5edff)',
                    padding: '48px 38px',
                    borderRadius: '32px',
                    border: `1px solid ${isDark ? 'rgba(148,163,184,0.35)' : 'rgba(148,163,184,0.35)'}`,
                    textAlign: 'left',
                    boxShadow: isDark
                      ? '0 24px 60px rgba(15,23,42,0.85)'
                      : '0 20px 45px rgba(148,163,184,0.35)',
                    backdropFilter: 'blur(14px)',
                  }}
                >
                  <div style={{ fontSize: '1.8rem', color: colors.accent, marginBottom: '18px' }}>{icon}</div>
                  <h4 style={{ fontWeight: 800, marginBottom: '10px', fontSize: '1.15rem', color: colors.text }}>{card.title}</h4>
                  <div style={{ fontSize: '0.96rem', color: colors.subText, lineHeight: 1.7 }}>
                    <PortableText value={card.content} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. SOLUTION SECTION */}
      {(hasSolutionContent || hasSolutionCards) && (
        <section style={{ padding: "100px 20px", background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: 'center', marginBottom: '70px' }}>
                <h2 style={{ fontSize: '3.5rem', fontWeight: 900 }}>The Solution</h2>
                <div style={{ maxWidth: '750px', margin: '20px auto', color: colors.subText, fontSize: '1.1rem', lineHeight: 1.7 }}>
                  {hasExplanation ? (
                    <PortableText value={study.explanation} />
                  ) : (
                    <PortableText value={study.solution} />
                  )}
                </div>
            </div>
            {hasSolutionCards && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
                {study.solutionCards!.map((card, i) => {
                  const isProblem = card.type === "problem";
                  const icon = isProblem ? <ProblemIcon /> : <SolutionIcon />;
                  const bgColor = isProblem ? "#4b5563" : "#22c55e";

                  return (
                    <motion.div
                      key={i}
                      whileInView={{ opacity: 1, y: 0 }}
                      initial={{ opacity: 0, y: 20 }}
                      style={{
                        background: isDark
                          ? 'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(15,23,42,0.88))'
                          : 'linear-gradient(135deg, #ffffff, #e0f2ff)',
                        padding: '50px 40px',
                        borderRadius: '34px',
                        border: `1px solid ${isProblem ? 'rgba(239,68,68,0.45)' : 'rgba(34,197,94,0.4)'}`,
                        boxShadow: isDark
                          ? '0 24px 60px rgba(15,23,42,0.85)'
                          : '0 20px 45px rgba(148,163,184,0.3)',
                      }}
                    >
                      <div style={{ width: '65px', height: '65px', background: bgColor, color: '#fff', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '30px', boxShadow: `0 15px 30px ${bgColor}33` }}>
                        {icon}
                      </div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '15px' }}>{card.title}</h3>
                      <div style={{ color: colors.subText, lineHeight: 1.7, fontSize: '0.98rem' }}>
                        <PortableText value={card.content} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
            </div>
          </section>
          )}

      {/* 4. KEY FEATURES SECTION */}
      {hasKeyFeatures && (
        <section style={{ padding: "100px 20px", background: isDark ? "rgba(10,12,16,0.9)" : "#f9fafb" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: 'center', marginBottom: '70px' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>Key Features</h2>
              <p style={{ maxWidth: '700px', margin: '20px auto 0', color: colors.subText, fontSize: '1.05rem', lineHeight: 1.7 }}>
                These were the standout elements that made this solution effective.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', maxWidth: '820px', margin: '0 auto' }}>
              {study.keyFeatures!.map((feature, i) => (
                <motion.div
                  key={i}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    padding: '20px 22px',
                    borderRadius: '24px',
                    border: `1px solid ${colors.border}`,
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(15,23,42,0.85))'
                      : 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                    boxShadow: isDark
                      ? '0 18px 40px rgba(0,0,0,0.45)'
                      : '0 14px 30px rgba(148,163,184,0.25)',
                  }}
                >
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '999px',
                      background: 'rgba(34,197,94,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '3px',
                    }}
                  >
                    <FiCheck color="#22c55e" strokeWidth={3} />
                  </div>
                  <div style={{ color: colors.subText, fontSize: '0.98rem', lineHeight: 1.7 }}>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: colors.text, marginBottom: '4px' }}>
                      {feature.title}
                    </div>
                    <PortableText value={feature.content} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. TECH & RESULTS */}
      <section style={{ padding: "24px 20px 16px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
            {hasTools && (
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}><FiCpu color={colors.accent}/> Tech Stack</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 12px' }}>
                  {study.tools!.map((tool, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '999px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        letterSpacing: '0.03em',
                        textTransform: 'uppercase',
                        background: isDark
                          ? 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(37,99,235,0.35))'
                          : 'linear-gradient(135deg, #e0f2fe, #eef2ff)',
                        border: `1px solid ${isDark ? 'rgba(129,140,248,0.6)' : 'rgba(59,130,246,0.5)'}`,
                        color: isDark ? '#e5e7eb' : '#0f172a',
                        boxShadow: isDark
                          ? '0 12px 30px rgba(15,23,42,0.85)'
                          : '0 10px 26px rgba(148,163,184,0.35)',
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {hasResults && (
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '35px', display: 'flex', alignItems: 'center', gap: '15px' }}><FiCheck color="#22c55e"/> Key Outcomes</h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                  {study.results!.map((res, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'start',
                        gap: '15px',
                        background: colors.card,
                        padding: '20px',
                        borderRadius: '20px',
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <div style={{ marginTop: '3px' }}>
                        <FiCheck color="#22c55e" strokeWidth={3} />
                      </div>
                      <span style={{ fontWeight: 500, fontSize: '1rem' }}>
                        {/* Each result entry is a Portable Text block; render it properly */}
                        <PortableText value={[res as any]} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </section>

      {/* 5. FOOTER CTA */}
      <section style={{ padding: "32px 20px 72px", textAlign: 'center' }}>
        <motion.div whileInView={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.95 }} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#f1f5f9', padding: '80px 40px', borderRadius: '60px', border: `1px solid ${colors.border}` }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 950, marginBottom: '25px', letterSpacing: '-0.02em' }}>Let’s Build Your Idea!</h2>
            <p style={{ color: colors.subText, marginBottom: '45px', fontSize: '1.2rem' }}>Inspired by the success of {study.title}? Let's talk.</p>
            <motion.button 
              onClick={() => router.push("/contact")}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.98 }}
              style={{ 
                padding: '22px 65px', borderRadius: '100px', background: colors.secondary, 
                color: '#fff', border: 'none', fontWeight: 800, fontSize: '1.2rem', 
                cursor: 'pointer', boxShadow: '0 25px 50px rgba(0,209,255,0.4)', 
                display: 'inline-flex', alignItems: 'center', gap: '12px' 
              }}>
                Start a Project <FiArrowUpRight />
            </motion.button>
        </motion.div>
      </section>

    </div>
  );
}
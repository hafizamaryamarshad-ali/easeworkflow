"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { 
  FiCheck, FiUsers, FiShoppingBag, FiTag, 
  FiArrowUpRight, FiLock, FiLayers, FiMessageCircle, 
  FiTrendingUp, FiCpu, FiTarget 
} from "react-icons/fi";
import { fetchCaseStudies, type CaseStudy } from "../../../lib/fetchCaseStudies";
import { useTheme } from "../../../theme/ThemeProvider";

export default function CaseStudyDetail() {
  const params = useParams();
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const slug = useMemo(() => (Array.isArray(params?.slug) ? params.slug[0] : params?.slug), [params?.slug]);
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

  const colors = {
    bg: isDark ? "#0a0c10" : "#fbfdfd",
    card: isDark ? "rgba(255, 255, 255, 0.03)" : "#ffffff",
    text: isDark ? "#f8fafc" : "#1e293b",
    subText: isDark ? "#94a3b8" : "#64748b",
    border: isDark ? "rgba(255, 255, 255, 0.08)" : "#f1f5f9",
    accent: "#4f46e5",
    secondary: "#00d1ff",
    line: isDark ? "rgba(79, 70, 229, 0.3)" : "rgba(79, 70, 229, 0.15)"
  };

  return (
    <div style={{ backgroundColor: colors.bg, color: colors.text, minHeight: "100vh", transition: "0.4s ease" }}>
      
      {/* 1. HERO SECTION (With Slider) */}
      <section style={{ width: "100%", padding: "80px 20px 0", background: isDark ? `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), ${colors.bg}` : "linear-gradient(135deg, #e0f2e9 0%, #ffffff 100%)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ color: colors.accent, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', marginBottom: '15px' }}>
            {study.industry ? `${study.industry} Case Study` : "Case Study"}
        </motion.p>
        
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, maxWidth: "800px", margin: "0 auto 50px" }}>
            {study.title}
        </motion.h1>
        
        {/* Auto-Slider */}
        {hasSliderImages && (
          <div style={{ position: "relative", width: "100%", maxWidth: "850px", height: "480px", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentSlide}
                src={sliderImages[currentSlide] as string} 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8 }}
                style={{ 
                  width: "100%", height: "100%", objectFit: "cover", borderRadius: "40px", 
                  zIndex: 2, marginBottom: "-40px", boxShadow: "0 30px 70px rgba(0,0,0,0.3)", 
                  border: `8px solid ${colors.card}` 
                }} 
              />
            </AnimatePresence>
            
            <div style={{ position: 'absolute', bottom: '0', display: 'flex', gap: '10px', zIndex: 10 }}>
              {sliderImages.map((_, i) => (
                <div key={i} style={{ width: currentSlide === i ? '30px' : '10px', height: '10px', borderRadius: '10px', background: currentSlide === i ? colors.accent : colors.subText, transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 2. PROBLEM SECTION (Rocket Replaced with Teddy Bear 🐻) */}
      {hasProblem && (
        <section style={{ padding: "140px 20px 100px", position: "relative" }}>
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '80px' }}>
            {/* Rocky Remove Kiya, Teddy Bear Lagaya 🐻 */}
            <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>🐻</div>
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
            {[
              {t:"Integration Issues", i:<FiLock/>}, {t:"User Friction", i:<FiUsers/>}, 
              {t:"Inconsistency", i:<FiTag/>}, {t:"Performance", i:<FiShoppingBag/>}
            ].map((item, i) => (
                <motion.div key={i} whileHover={{ y: -10 }} style={{ background: colors.card, padding: '45px 35px', borderRadius: '35px', border: `1px solid ${colors.border}`, textAlign: 'center', backdropFilter: 'blur(10px)' }}>
                    <div style={{ fontSize: '1.8rem', color: colors.accent, marginBottom: '20px' }}>{item.i}</div>
                    <h4 style={{ fontWeight: 800, marginBottom: '12px', fontSize: '1.2rem' }}>{item.t}</h4>
                    <p style={{ fontSize: '0.95rem', color: colors.subText }}>Strategic resolution of {item.t.toLowerCase()} for the {study.title} ecosystem.</p>
                </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 3. SOLUTION SECTION */}
      {hasSolutionContent && (
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
                {[{t: "Scalability", i: <FiTarget />, c: "#4f46e5"}, {t: "Visual Design", i: <FiLayers />, c: "#00d1ff"}, {t: "Seamless Experience", i: <FiTrendingUp />, c: "#22c55e"}].map((sol, i) => (
                    <motion.div key={i} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} style={{ background: colors.card, padding: '50px 40px', borderRadius: '40px', border: `1px solid ${colors.border}` }}>
                        <div style={{ width: '65px', height: '65px', background: sol.c, color: '#fff', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '30px', boxShadow: `0 15px 30px ${sol.c}33` }}>{sol.i}</div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '15px' }}>{sol.t}</h3>
                        <p style={{ color: colors.subText, lineHeight: 1.6 }}>Our approach focused on {sol.t.toLowerCase()}, ensuring high-impact results and long-term viability.</p>
                    </motion.div>
                ))}
            </div>
            </div>
          </section>
          )}

      {/* 4. TECH & RESULTS */}
      <section style={{ padding: "120px 20px", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
            {hasTools && (
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '35px', display: 'flex', alignItems: 'center', gap: '15px' }}><FiCpu color={colors.accent}/> Tech Stack</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {study.tools!.map((tool, i) => (
                    <span key={i} style={{ background: colors.card, border: `1px solid ${colors.border}`, padding: '12px 25px', borderRadius: '100px', fontSize: '0.95rem', fontWeight: 700, color: colors.text }}>{tool}</span>
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
      <section style={{ padding: "120px 20px", textAlign: 'center' }}>
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
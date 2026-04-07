"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchCaseStudies, type CaseStudy } from "../../lib/fetchCaseStudies";
import { useTheme } from "../../theme/ThemeProvider";

const portableTextToPlain = (blocks: any[] | undefined): string => {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter((block) => block && block._type === "block" && Array.isArray(block.children))
    .map((block) =>
      block.children
        .map((child: any) => (typeof child.text === "string" ? child.text : ""))
        .join("")
    )
    .join(" ")
    .trim();
};

export default function CaseStudiesPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadCaseStudies = async () => {
      try {
        const data = await fetchCaseStudies();
        if (isMounted) {
          setCaseStudies(data.filter((study) => Boolean(study.slug)));
        }
      } catch {
        if (isMounted) setCaseStudies([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCaseStudies();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      style={{
        padding: "70px 20px 120px",
        background: isDark ? "#020617" : "#f8fafc",
        color: isDark ? "#fff" : "#0f172a",
      }}
    >
      {/* Heading (matched with CaseStudyPreview) */}
      <div style={{ textAlign: "center", marginBottom: "90px" }}>
        <h2 style={{ fontSize: "3rem", fontWeight: 900 }}>
          Healthcare Automation Solutions We Delivered
        </h2>
        <p style={{ opacity: 0.7, maxWidth: "650px", margin: "10px auto" }}>
          Real-world healthcare systems designed for European clinics — focused
          on automation, compliance, and better patient outcomes.
        </p>
      </div>

      {/* Loading / empty states */}
      {loading && (
        <p
          style={{
            textAlign: "center",
            opacity: 0.7,
            marginBottom: "40px",
          }}
        >
          Loading case studies...
        </p>
      )}

      {!loading && caseStudies.length === 0 && (
        <p
          style={{
            textAlign: "center",
            opacity: 0.7,
            marginBottom: "40px",
          }}
        >
          No case studies found.
        </p>
      )}

      {/* Sections (layout matched with CaseStudyPreview) */}
      {!loading && caseStudies.length > 0 && (
        <div style={{ maxWidth: "1100px", margin: "auto" }}>
          {caseStudies.map((study, i) => {
            const reverse = i % 2 !== 0;
            const mainResult = portableTextToPlain(study.results).split(". ")[0] ?? "";

            return (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <motion.div
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
                    cursor: "pointer",
                  }}
                >
                  {/* IMAGE */}
                  <div style={{ flex: 1, minWidth: "300px" }}>
                    {study.featuredImageUrl && (
                      <img
                        src={study.featuredImageUrl}
                        style={{
                          width: "100%",
                          borderRadius: "20px",
                        }}
                        alt={study.title}
                      />
                    )}
                  </div>

                  {/* TEXT */}
                  <div style={{ flex: 1, minWidth: "300px" }}>
                    <h3 style={{ fontSize: "2rem", fontWeight: 800 }}>
                      {study.title}
                    </h3>

                    <p style={{ marginTop: "8px", opacity: 0.6 }}>
                      {study.industry}
                    </p>

                    <p style={{ marginTop: "12px", opacity: 0.85 }}>
                      {portableTextToPlain(study.summary)}
                    </p>

                    {mainResult && (
                      <p
                        style={{
                          marginTop: "15px",
                          color: "#38bdf8",
                          fontWeight: 700,
                        }}
                      >
                        {mainResult}
                      </p>
                    )}

                    {/* CTA badge (matched with CaseStudyPreview) */}
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
                      <span>View Case Study</span>
                      <span style={{ fontSize: "1rem" }}>→</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
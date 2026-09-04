"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "./theme/ThemeProvider";

const studies = [
  {
    label: "Practice Fusion",
    title: "Patient Scheduling & Chart Intake",
    summary: "A queue-driven workflow for scheduling patients, updating charts, uploading forms, synchronizing backend status, and isolating patient-level failures.",
    capabilities: ["Patient queues", "Appointment workflows", "Document upload", "API status updates"],
  },
  {
    label: "Practice Fusion",
    title: "Clinical Workflow Automation",
    summary: "Structured SOAP entry, ICD validation, authentication recovery, operational logging, and controlled continuation when an individual record cannot be completed.",
    capabilities: ["Structured chart entry", "ICD safeguards", "Session recovery", "Traceability"],
  },
  {
    label: "Practice Fusion + Availity",
    title: "Insurance Eligibility Automation",
    summary: "A scheduled workflow that prepares appointment data, handles payer-specific portal steps and OTPs, generates consistent PDFs, and sends results to a backend API.",
    capabilities: ["Payer normalization", "OTP handling", "PDF output", "API delivery"],
  },
  {
    label: "Clinic Voice AI",
    title: "Appointment & Patient Query Voice Agent",
    summary: "A clinic voice agent that supports appointment booking and handles common patient questions over the phone, with escalation paths for staff assistance.",
    capabilities: ["Inbound calls", "Appointment booking", "Patient FAQs", "Human escalation"],
  },
];

export default function CaseStudyHighlights() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section style={{ padding: "90px 20px", background: isDark ? "#020617" : "#f8fafc", color: isDark ? "#f8fafc" : "#0f172a" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
          <p style={{ color: "#0ea5e9", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "0.78rem" }}>Healthcare automation case studies</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", margin: "8px 0 14px", fontWeight: 900 }}>Built for the workflows private clinics actually run</h2>
          <p style={{ color: isDark ? "#cbd5e1" : "#475569", lineHeight: 1.7 }}>Our work connects existing systems and removes repetitive operational steps while keeping exceptions, approvals, and clinical decisions visible to the team.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 22 }}>
          {studies.map((study, index) => (
            <motion.article key={study.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} style={{ padding: 26, borderRadius: 22, border: isDark ? "1px solid rgba(56,189,248,.22)" : "1px solid rgba(15,23,42,.1)", background: isDark ? "rgba(15,23,42,.82)" : "#ffffff", boxShadow: isDark ? "0 18px 45px rgba(0,0,0,.2)" : "0 18px 45px rgba(15,23,42,.08)" }}>
              <p style={{ color: "#0ea5e9", fontSize: ".76rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", margin: 0 }}>{study.label}</p>
              <h3 style={{ fontSize: "1.3rem", lineHeight: 1.3, margin: "12px 0" }}>{study.title}</h3>
              <p style={{ color: isDark ? "#cbd5e1" : "#475569", lineHeight: 1.65, fontSize: ".92rem" }}>{study.summary}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 18 }}>
                {study.capabilities.map((item) => <span key={item} style={{ padding: "6px 9px", borderRadius: 999, background: isDark ? "rgba(14,165,233,.12)" : "#e0f2fe", color: isDark ? "#7dd3fc" : "#075985", fontSize: ".74rem", fontWeight: 700 }}>{item}</span>)}
              </div>
            </motion.article>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 38 }}>
          <Link href="/case-studies" style={{ display: "inline-flex", padding: "13px 24px", borderRadius: 999, background: "#0ea5e9", color: "#fff", textDecoration: "none", fontWeight: 800 }}>Explore all case studies →</Link>
        </div>
      </div>
    </section>
  );
}

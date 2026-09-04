"use client";

import { useState } from "react";
import { useClient } from "sanity";
import { sourceDocumentCaseStudies } from "./caseStudyContent";

export default function CaseStudySyncTool() {
  const client = useClient({ apiVersion: "2026-09-04" });
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const syncCaseStudies = async () => {
    setStatus("saving");
    setMessage("Updating case studies…");

    try {
      let transaction = client.transaction();
      for (const study of sourceDocumentCaseStudies) {
        transaction = transaction.patch(study.id, (patch) => patch.set(study.content));
      }
      await transaction.commit();
      setStatus("done");
      setMessage(`Updated ${sourceDocumentCaseStudies.length} matching case studies. Existing slugs and media were preserved; unrelated case studies were not changed.`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "The case studies could not be updated.");
    }
  };

  return (
    <main style={{ minHeight: "100%", padding: "32px", background: "#f7f9fc", color: "#0f172a" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <p style={{ margin: 0, color: "#0284c7", fontSize: 12, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase" }}>Local content maintenance</p>
        <h1 style={{ margin: "10px 0 8px", fontSize: 32 }}>Case Study Content Sync</h1>
        <p style={{ margin: "0 0 24px", maxWidth: 720, color: "#475569", lineHeight: 1.65 }}>
          Update only the three case studies that directly match the supplied DOCX portfolio studies. The operation updates text fields only, preserves every existing slug, featured image, gallery, and video, and leaves all unrelated case studies unchanged.
        </p>

        <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
          {sourceDocumentCaseStudies.map((study) => (
            <article key={study.id} style={{ padding: 16, border: "1px solid #dbe4f0", borderRadius: 14, background: "#fff" }}>
              <strong>{study.content.title}</strong>
              <div style={{ marginTop: 5, color: "#64748b", fontSize: 13 }}>Source: {study.source}</div>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={syncCaseStudies}
          disabled={status === "saving"}
          style={{ border: 0, borderRadius: 999, padding: "13px 22px", background: status === "done" ? "#16a34a" : "#0284c7", color: "#fff", fontWeight: 800, cursor: status === "saving" ? "wait" : "pointer" }}
        >
          {status === "saving" ? "Updating…" : status === "done" ? "Case Studies Updated" : "Sync 3 Matching Case Studies"}
        </button>

        {message && (
          <p role="status" style={{ marginTop: 16, padding: 14, borderRadius: 12, background: status === "error" ? "#fee2e2" : status === "done" ? "#dcfce7" : "#e0f2fe", color: status === "error" ? "#991b1b" : status === "done" ? "#166534" : "#075985" }}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
}

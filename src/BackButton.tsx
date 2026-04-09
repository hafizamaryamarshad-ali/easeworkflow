"use client";

import { useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { useTheme } from "./theme/ThemeProvider";
import BackButtonWrapper from "./BackButtonWrapper";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const isRoot = pathname === "/";

  const handleClick = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  // Hide on the root landing page where a back button is less useful
  if (isRoot) {
    return null;
  }

  return (
    <BackButtonWrapper>
      <button
        onClick={handleClick}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 16px",
          borderRadius: 999,
          border:
            theme === "dark"
              ? "1px solid rgba(255,255,255,0.18)"
              : "1px solid rgba(15,23,42,0.16)",
          background:
            theme === "dark"
              ? "rgba(15,23,42,0.85)"
              : "rgba(255,255,255,0.9)",
          color: theme === "dark" ? "#f9fafb" : "#0f172a",
          boxShadow:
            theme === "dark"
              ? "0 10px 30px rgba(15,23,42,0.8)"
              : "0 8px 24px rgba(15,23,42,0.16)",
          backdropFilter: "blur(10px)",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "0.9rem",
          letterSpacing: "0.03em",
          textTransform: "uppercase",
          transition: "transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease",
        }}
        onMouseDown={(e) => {
          // Prevent focus outlines from staying after click on some browsers
          e.currentTarget.blur();
        }}
      >
        <FiArrowLeft size={16} />
        <span>Back</span>
      </button>
    </BackButtonWrapper>
  );
}

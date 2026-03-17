"use client";

import { useTheme } from "./theme/ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      style={{
        textAlign: "center",
        padding: "40px 20px",
        background: theme === "dark" ? "#111827" : "#e2e8f0",
        color: theme === "dark" ? "#f8fafc" : "#0f172a",
        fontSize: "0.9rem",
        transition: "all 0.35s ease",
      }}
    >
      © {new Date().getFullYear()} EaseWorkflow. All rights reserved.
    </footer>
  );
}

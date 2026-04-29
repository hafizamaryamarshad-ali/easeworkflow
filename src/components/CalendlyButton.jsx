"use client";

import { useState } from "react";

export default function CalendlyButton({ mainColor }) {
  const [isHovered, setIsHovered] = useState(false);

  const openCalendly = () => {
    window.open(
      "https://calendly.com/umer-easeworkflow/30min",
      "_blank"
    );
  };

  return (
    <div style={{ position: "relative", display: "inline-flex", overflow: "visible", zIndex: 30 }}>
      <div
        onClick={openCalendly}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "36px",
          height: "36px",
          fontSize: "0.9rem",
          fontWeight: 600,
          borderRadius: "50%",
          background: mainColor,
          color: "#fff",
          cursor: "pointer",
        }}
      >
        📅
      </div>

      <div
        style={{
          position: "absolute",
          top: "calc(100% + 10px)",
          right: 0,
          transform: isHovered ? "translateY(0)" : "translateY(-4px)",
          transformOrigin: "top right",
          opacity: isHovered ? 1 : 0,
          pointerEvents: "none",
          whiteSpace: "nowrap",
          padding: "7px 12px",
          borderRadius: "999px",
          background: "rgba(15, 23, 42, 0.95)",
          color: "#fff",
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
          boxShadow: "0 10px 24px rgba(15, 23, 42, 0.22)",
          transition: "opacity 0.18s ease, transform 0.18s ease",
          zIndex: 9999,
        }}
      >
        Book Free Consultation
      </div>
    </div>
  );
}
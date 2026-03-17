"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "./theme/ThemeProvider";

export default function ParallaxShapes() {
  const shapeRefs = useRef<HTMLDivElement[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      shapeRefs.current.forEach((el, i) => {
        const speed = 0.2 + i * 0.15;
        el.style.transform = `translateY(${scrollTop * speed}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shapeColors = {
    dark: "#0ea5e9",
    light: "#3b82f6",
  };

  return (
    <>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`shape shape${i + 1}`}
          ref={(el) => { if(el) shapeRefs.current[i] = el; }}
          style={{
            animation: "floatBasic 25s ease-in-out infinite",
            background: shapeColors[theme],
            boxShadow: theme === "dark"
              ? "0 0 12px #0ea5e9, 0 0 24px #3b82f6"
              : "0 0 12px #3b82f6, 0 0 24px #60a5fa",
          }}
        ></div>
      ))}
    </>
  );
}
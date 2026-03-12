"use client";
import { useEffect, useRef, useState } from "react";

export default function ParallaxShapes() {
  const shapeRefs = useRef<HTMLDivElement[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Track body background theme like Hero
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const bg = getComputedStyle(document.body).background;
      if (bg.includes("linear-gradient")) setTheme("dark");
      else setTheme("light");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

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
"use client";
import { useEffect, useRef } from "react";

export default function ParallaxShapes() {
  const shapeRefs = useRef<HTMLDivElement[]>([]);

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

  return (
    <>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`shape shape${i+1}`}
          ref={el => { if(el) shapeRefs.current[i] = el; }}
          style={{ animation: "floatBasic 25s ease-in-out infinite" }}
        ></div>
      ))}
    </>
  );
}
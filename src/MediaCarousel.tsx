"use client";

import { useEffect, useState, type PointerEvent } from "react";
import Image from "next/image";

export type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
};

type MediaCarouselProps = {
  items: MediaItem[];
  aspectRatio?: string; // e.g. "16 / 9"
};

export default function MediaCarousel({ items, aspectRatio = "16 / 9" }: MediaCarouselProps) {
  const [index, setIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  if (!items.length) return null;

  const current = items[Math.min(index, items.length - 1)];

  const goPrev = () => setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  const goNext = () => setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setDragStartX(event.clientX);
    setDragDelta(0);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX == null) return;
    setDragDelta(event.clientX - dragStartX);
  };

  const handlePointerUp = () => {
    if (dragStartX != null) {
      if (dragDelta > 60) {
        goPrev();
      } else if (dragDelta < -60) {
        goNext();
      }
    }
    setDragStartX(null);
    setDragDelta(0);
  };

  // Auto-play slider
  useEffect(() => {
    if (items.length <= 1 || isHovered || dragStartX !== null) return;

    const intervalId = window.setInterval(() => {
      setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 4500); // ~4.5 seconds

    return () => window.clearInterval(intervalId);
  }, [items.length, isHovered, dragStartX]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto 30px",
        borderRadius: "20px",
        overflow: "hidden",
        // Keep the frame clean on detail pages: no heavy drop shadow
        boxShadow: "none",
        background: "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio,
          backgroundColor: "#020617",
          touchAction: "pan-y",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {current.type === "image" ? (
          <Image
            src={current.src}
            alt={current.alt || "Media"}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <video
            src={current.src}
            controls
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              style={navButtonStyle("left")}
              aria-label="Previous media"
            >
              
              
              
              
              
              
              
              
              
              
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              style={navButtonStyle("right")}
              aria-label="Next media"
            >
              ›
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            padding: "10px 0 12px",
            background:
              "linear-gradient(to right, rgba(15,23,42,0.95), rgba(15,23,42,0.9))",
          }}
        >
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? 18 : 8,
                height: 8,
                borderRadius: 999,
                border: "none",
                padding: 0,
                cursor: "pointer",
                backgroundColor: i === index ? "#38bdf8" : "rgba(148,163,184,0.7)",
                transition: "all 0.2s ease",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function navButtonStyle(side: "left" | "right") {
  return {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    [side]: "12px",
    width: "34px",
    height: "34px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.6)",
    background: "rgba(15,23,42,0.75)",
    color: "#e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "1.4rem",
    lineHeight: 1,
    boxShadow: "0 10px 25px rgba(15,23,42,0.8)",
  } as const;
}

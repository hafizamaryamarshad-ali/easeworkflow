"use client";

import type { ReactNode, CSSProperties } from "react";

type BackButtonWrapperProps = {
  children: ReactNode;
};

const basePositionStyle: CSSProperties = {
  position: "absolute", // 🔥 fixed hatao
  top: 80,
  left: 24,
  zIndex: 10,
};

export default function BackButtonWrapper({ children }: BackButtonWrapperProps) {
  return <div style={basePositionStyle}>{children}</div>;
}
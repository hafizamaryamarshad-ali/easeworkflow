"use client";

import type { ReactNode, CSSProperties } from "react";

type BackButtonWrapperProps = {
  children: ReactNode;
};

const basePositionStyle: CSSProperties = {
  position: "fixed",
  top: 80,
  left: 24,
  zIndex: 900,
};

export default function BackButtonWrapper({ children }: BackButtonWrapperProps) {
  return <div style={basePositionStyle}>{children}</div>;
}

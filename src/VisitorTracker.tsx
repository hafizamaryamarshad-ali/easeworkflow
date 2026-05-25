"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastTrackedPath.current === pathname) {
      return;
    }

    lastTrackedPath.current = pathname;

    void fetch("http://localhost:5000/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: window.location.pathname,
        device: navigator.userAgent,
        browser: navigator.userAgent,
      }),
      keepalive: true,
    }).catch(() => undefined);
  }, [pathname]);

  return null;
}
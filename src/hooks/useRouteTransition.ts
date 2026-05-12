"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLoading } from "@/providers/LoadingContext";

/**
 * Hook to automatically manage loading state during route transitions
 * Should be used in the root layout or a high-level component
 *
 * This hook:
 * - Detects when the URL changes
 * - Shows loading screen for navigation
 * - Hides loading screen when content is ready
 * - Handles rapid navigation
 */
export function useRouteTransition() {
  const { startLoading, stopLoading } = useLoading();
  const pathname = usePathname();
  const router = useRouter();
  const previousPathname = useRef<string | null>(null);
  const navigationTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Detect when pathname changes (route transition occurred)
    if (previousPathname.current !== pathname) {
      // Clear any existing timeout
      if (navigationTimeout.current) {
        clearTimeout(navigationTimeout.current);
      }

      // Stop loading after content has time to render (300ms)
      navigationTimeout.current = setTimeout(() => {
        stopLoading();
      }, 300);

      previousPathname.current = pathname;
    }

    return () => {
      if (navigationTimeout.current) {
        clearTimeout(navigationTimeout.current);
      }
    };
  }, [pathname, stopLoading]);
}

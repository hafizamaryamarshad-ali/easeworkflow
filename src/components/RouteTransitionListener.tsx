"use client";

import { useRouteTransition } from "@/hooks/useRouteTransition";

/**
 * Component that listens for route transitions and manages loading state
 * Place this in your root layout after LoadingProvider
 *
 * This component:
 * - Automatically detects when users navigate between pages
 * - Shows the loading screen during transition
 * - Hides the loader when content is ready
 */
export function RouteTransitionListener() {
  useRouteTransition();
  return null; // This component is invisible (hook-based)
}

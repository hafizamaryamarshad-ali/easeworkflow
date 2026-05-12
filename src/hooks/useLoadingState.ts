"use client";

import { useEffect } from "react";
import { useLoading } from "@/providers/LoadingContext";

/**
 * Hook to automatically show loading screen while an async operation is in progress
 * Useful for manual control of loading state during API calls or data fetching
 *
 * @example
 * const { isLoading } = useLoadingState(true); // Start loading immediately
 *
 * @example
 * // Control loading state manually
 * const { setIsLoading } = useLoadingState(false);
 *
 * useEffect(() => {
 *   setIsLoading(true);
 *   fetchData().finally(() => setIsLoading(false));
 * }, []);
 */
export function useLoadingState(
  initialState: boolean = false,
  autoStopDelay?: number
) {
  const { isLoading, setIsLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (initialState) {
      startLoading();

      if (autoStopDelay) {
        const timer = setTimeout(stopLoading, autoStopDelay);
        return () => clearTimeout(timer);
      }
    }
  }, [initialState, autoStopDelay, startLoading, stopLoading]);

  return {
    isLoading,
    setIsLoading,
    startLoading,
    stopLoading,
  };
}

/**
 * Hook to wrap an async operation with automatic loading state management
 *
 * @example
 * const handleSubmit = useLoadingWrapper(async () => {
 *   await submitForm(data);
 * });
 *
 * return <button onClick={handleSubmit}>Submit</button>;
 */
export function useLoadingWrapper<T extends unknown[], R>(
  callback: (...args: T) => Promise<R>
) {
  const { startLoading, stopLoading } = useLoading();

  return async (...args: T): Promise<R> => {
    try {
      startLoading();
      const result = await callback(...args);
      return result;
    } finally {
      // Add small delay for better UX (prevent flickering)
      setTimeout(stopLoading, 300);
    }
  };
}

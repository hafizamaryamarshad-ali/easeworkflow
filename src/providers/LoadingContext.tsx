"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const router = useRouter();

  const startLoading = useCallback(() => {
    setIsLoading(true);
    // Auto-stop after 30 seconds (safety net)
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 30000);
    setLoadingTimeout(timeout);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      setLoadingTimeout(null);
    }
  }, [loadingTimeout]);

  // Listen for route changes
  useEffect(() => {
    const handleRouteChange = () => {
      startLoading();
    };

    // In Next.js 13+, we can use useTransition or manual route detection
    // This will be enhanced by the component wrapping pages
    const originalPush = router.push;
    router.push = ((url: string) => {
      startLoading();
      return originalPush(url);
    }) as typeof router.push;

    return () => {
      router.push = originalPush;
    };
  }, [router, startLoading]);

  const value: LoadingContextType = {
    isLoading,
    setIsLoading,
    startLoading,
    stopLoading,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/providers/LoadingContext";
import { useTheme } from "@/theme/ThemeProvider";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const { isLoading } = useLoading();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden pointer-events-none"
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(2, 6, 23, 0.95) 0%, rgba(15, 23, 42, 0.92) 50%, rgba(30, 41, 59, 0.88) 100%)"
              : "linear-gradient(135deg, rgba(245, 250, 255, 0.95) 0%, rgba(239, 242, 255, 0.92) 50%, rgba(225, 236, 255, 0.88) 100%)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Glassmorphism blur effect */}
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? "radial-gradient(circle at 30% 50%, rgba(14, 165, 233, 0.08) 0%, transparent 50%)"
                : "radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
            }}
          />

          {/* Premium gradient orb effect */}
          <motion.div
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: isDark
                ? "radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(59, 130, 246, 0.08) 35%, transparent 70%)"
                : "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(96, 165, 250, 0.06) 35%, transparent 70%)",
              filter: "blur(40px)",
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -20, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Content Container */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center gap-6"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Premium Animated Spinner */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32">
              {/* Outer rotating ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: `3px solid transparent`,
                  borderTopColor: "currentColor",
                  borderRightColor: "currentColor",
                  color: isDark ? "#0ea5e9" : "#3b82f6",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Inner rotating ring - opposite direction */}
              <motion.div
                className="absolute inset-2 rounded-full"
                style={{
                  border: `2px solid transparent`,
                  borderBottomColor: "currentColor",
                  borderLeftColor: "currentColor",
                  color: isDark ? "#60a5fa" : "#60a5fa",
                }}
                animate={{ rotate: -360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Pulsing center dot */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                  style={{
                    background: isDark
                      ? "linear-gradient(135deg, #0ea5e9, #3b82f6)"
                      : "linear-gradient(135deg, #3b82f6, #60a5fa)",
                    boxShadow: isDark
                      ? "0 0 20px #0ea5e9, 0 0 40px #3b82f6"
                      : "0 0 15px #3b82f6, 0 0 30px #60a5fa",
                  }}
                />
              </motion.div>
            </div>

            {/* Loading Text with fade animation */}
            <motion.div
              className="text-center mt-4 sm:mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <motion.p
                className="text-sm sm:text-base font-medium tracking-wide"
                style={{
                  color: isDark
                    ? "rgba(248, 250, 252, 0.8)"
                    : "rgba(15, 23, 42, 0.8)",
                }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Loading Experience
              </motion.p>

              {/* Animated dots */}
              <div className="flex gap-1 justify-center mt-2">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: isDark ? "#0ea5e9" : "#3b82f6",
                    }}
                    animate={{ y: [-4, 4, -4], opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Subtle bottom text */}
            <motion.p
              className="text-xs sm:text-sm"
              style={{
                color: isDark
                  ? "rgba(203, 213, 225, 0.5)"
                  : "rgba(71, 85, 105, 0.5)",
              }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Please wait...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "32px",
            right: "32px",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0ea5e9, #3b82f6)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(14, 165, 233, 0.4)",
            zIndex: 1000,
            color: "#fff",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <FiArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

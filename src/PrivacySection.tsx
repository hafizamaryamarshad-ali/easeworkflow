"use client";

import { motion } from "framer-motion";
import { FiShield, FiLock, FiUserCheck, FiServer, FiEye, FiCheckCircle, FiDownload } from "react-icons/fi"; // FiCheckCircle add kiya
import { useTheme } from "./theme/ThemeProvider";
import { useState, useEffect } from "react";

export default function PrivacySection() {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bg = {
    dark: "var(--color-bg)",
    light: "var(--color-bg-light)",
  };

  const headingColor = {
    dark: "var(--color-text-primary)",
    light: "var(--color-text-dark)",
  };

  const textColor = {
    dark: "var(--color-text-muted)",
    light: "var(--color-text-muted-light)",
  };

  const cardBg = {
    dark: "linear-gradient(145deg, rgba(15,23,42,0.95), rgba(15,23,42,0.85))",
    light: "linear-gradient(145deg, #f9fafb, #eef5ff)",
  };

  const cardBorder = {
    dark: "1px solid rgba(148,163,184,0.35)",
    light: "1px solid rgba(148,163,184,0.25)",
  };

  const rightGradient = {
    dark: "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.85))",
    light: "linear-gradient(135deg, #f9fafb, #eef5ff)",
  };

  const rightCardsTop = [
    {
      Icon: FiServer,
      title: "Encrypted Servers",
      body: "All data stored on encrypted servers with constant monitoring.",
    },
    {
      Icon: FiEye,
      title: "Access Control",
      body: "Strict access policies ensuring only authorized personnel can view data.",
    },
  ];

  const rightCardsBottom = [
    {
      Icon: FiLock,
      title: "End-to-End Security",
      body: "Data secured in transit and at rest with advanced encryption.",
    },
    {
      Icon: FiUserCheck,
      title: "User Verification",
      body: "Multi-factor authentication and audit logs for all activities.",
    },
  ];

  const handleDownloadAgreements = () => {
    const files = [
      "/assets/documents/DATA PROCESSING AGREEMENT.pdf",
      "/assets/documents/BUSINESS ASSOCIATE AGREEMENT.pdf",
      // Add more files here if needed, e.g. "/assets/documents/data-agreement-3.pdf",
    ];

    setIsDownloading(true);

    files.forEach((file) => {
      const link = document.createElement("a");
      link.href = file;
      link.download = file.split("/").pop() || "agreement.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    // Simple feedback reset; actual downloads continue in browser
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <section
      id="privacy"  
      style={{
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        overflow: "hidden",
        background: bg[theme],
      }}
    >
      {/* RIGHT THEME GRADIENT */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: isMobile ? "100%" : "58%",
          height: "100%",
          background: rightGradient[theme],
          borderTopLeftRadius: isMobile ? "0px" : "140px",
          borderBottomLeftRadius: isMobile ? "0px" : "140px",
          zIndex: 1,
        }}
      />

      {/* MAIN CONTAINER */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr",
          gap: isMobile ? "40px" : "60px",
          // Tighter bottom padding so the next section sits closer
          padding: isMobile ? "28px 20px 20px" : "56px 40px 36px",
          alignItems: "center",
        }}
      >
        {/* LEFT SIDE */}
        <div>
          {/* DPA HIGHLIGHT TAG */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 12px",
              borderRadius: "8px",
              background: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              color: "#22c55e",
              fontSize: "12px",
              fontWeight: "700",
              marginBottom: "16px",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}
          >
            <FiCheckCircle size={14} /> DPA Agreement Guaranteed
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              fontSize: isMobile ? "32px" : "44px",
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.5px",
              color: headingColor[theme],
              maxWidth: "480px",
            }}
          >
            Privacy & <br />
            Data Protection
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              marginTop: "18px",
              fontSize: isMobile ? "14px" : "15.5px",
              color: textColor[theme],
              maxWidth: "460px",
              lineHeight: 1.75,
            }}
          >
            We build systems where privacy is not an add-on — it’s the foundation. 
            <strong> We sign a formal Data Processing Agreement (DPA) </strong> 
            to guarantee that your sensitive medical data is handled with the highest legal and technical standards.
          </motion.p>

          {/* Download Agreements Button */}
          <motion.button
            type="button"
            onClick={handleDownloadAgreements}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            style={{
              marginTop: "20px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: isMobile ? "10px 16px" : "12px 20px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background:
                theme === "dark"
                  ? "linear-gradient(135deg, #0ea5e9, #22c55e)"
                  : "linear-gradient(135deg, #0ea5e9, #22c55e)",
              boxShadow:
                theme === "dark"
                  ? "0 14px 40px rgba(8,47,73,0.75)"
                  : "0 10px 30px rgba(56,189,248,0.45)",
              color: "#f9fafb",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              outline: "none",
            }}
          >
            <FiDownload size={16} />
            {isDownloading ? "Downloading..." : "Download the Data Agreements we do"}
          </motion.button>

          {/* LEFT CARDS */}
          <div
            style={{
              marginTop: "34px",
              display: "grid",
              gap: "16px",
              maxWidth: "500px",
            }}
          >
            {[{
              Icon: FiShield,
              title: "DPA & Data Protection",
              body:
                "Full DPA compliance with HIPAA-aware architecture and encrypted storage for total peace of mind.",
            }, {
              Icon: FiUserCheck,
              title: "User Privacy",
              body:
                "Minimal data collection with full user control and consent flows.",
            }, {
              Icon: FiLock,
              title: "Secure Handling",
              body:
                "Robust infrastructure with monitoring and secure integrations.",
            }].map(({ Icon, title, body }) => (
              <motion.div
                key={title}
                whileHover={{ x: isMobile ? 0 : 8, scale: isMobile ? 1 : 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{
                  display: "flex",
                  gap: "14px",
                  padding: "18px",
                  borderRadius: "18px",
                  background: cardBg[theme],
                  border: cardBorder[theme],
                  backdropFilter: "blur(14px)",
                  alignItems: "flex-start",
                  boxShadow:
                    theme === "dark"
                      ? "0 15px 40px rgba(0,0,0,0.5)"
                      : "0 10px 25px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    minWidth: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      theme === "dark"
                        ? "rgba(15,23,42,0.9)"
                        : "rgba(239,246,255,1)",
                    border:
                      theme === "dark"
                        ? "1px solid rgba(148,163,184,0.5)"
                        : "1px solid rgba(59,130,246,0.4)",
                  }}
                >
                  <Icon size={18} color="#0ea5e9" />
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: "15.5px",
                      fontWeight: 700,
                      marginBottom: "4px",
                      color: headingColor[theme],
                    }}
                  >
                    {title}
                  </h4>
                  <p
                    style={{
                      fontSize: "13.5px",
                      color: textColor[theme],
                      lineHeight: 1.65,
                    }}
                  >
                    {body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* TOP FLOATING CARDS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              marginBottom: "28px",
              zIndex: 2,
            }}
          >
            {rightCardsTop.map(({ Icon, title, body }) => (
              <motion.div
                key={title}
                whileHover={{ scale: 1.02 }}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "14px",
                  borderRadius: "16px",
                  background: cardBg[theme],
                  border: cardBorder[theme],
                  backdropFilter: "blur(12px)",
                  alignItems: "center",
                  boxShadow:
                    theme === "dark"
                      ? "0 10px 30px rgba(0,0,0,0.45)"
                      : "0 6px 20px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    minWidth: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      theme === "dark"
                        ? "rgba(15,23,42,0.9)"
                        : "rgba(239,246,255,1)",
                    border:
                      theme === "dark"
                        ? "1px solid rgba(148,163,184,0.4)"
                        : "1px solid rgba(59,130,246,0.3)",
                  }}
                >
                  <Icon size={18} color="#22c55e" />
                </div>
                <div>
                  <h5
                    style={{
                      fontSize: "14.5px",
                      fontWeight: 700,
                      color: headingColor[theme],
                      marginBottom: "2px",
                    }}
                  >
                    {title}
                  </h5>
                  <p
                    style={{
                      fontSize: "13px",
                      color: textColor[theme],
                      lineHeight: 1.5,
                    }}
                  >
                    {body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CENTER IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: "460px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="images/security-illustration.png"
              alt="security"
              style={{
                width: "100%",
                objectFit: "contain",
              }}
            />
          </motion.div>

          {/* BOTTOM FLOATING CARDS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              marginTop: "28px",
              zIndex: 2,
            }}
          >
            {rightCardsBottom.map(({ Icon, title, body }) => (
              <motion.div
                key={title}
                whileHover={{ scale: 1.02 }}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "14px",
                  borderRadius: "16px",
                  background: cardBg[theme],
                  border: cardBorder[theme],
                  backdropFilter: "blur(12px)",
                  alignItems: "center",
                  boxShadow:
                    theme === "dark"
                      ? "0 10px 30px rgba(0,0,0,0.45)"
                      : "0 6px 20px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    minWidth: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      theme === "dark"
                        ? "rgba(15,23,42,0.9)"
                        : "rgba(239,246,255,1)",
                    border:
                      theme === "dark"
                        ? "1px solid rgba(148,163,184,0.4)"
                        : "1px solid rgba(59,130,246,0.3)",
                  }}
                >
                  <Icon size={18} color="#0ea5e9" />
                </div>
                <div>
                  <h5
                    style={{
                      fontSize: "14.5px",
                      fontWeight: 700,
                      color: headingColor[theme],
                      marginBottom: "2px",
                    }}
                  >
                    {title}
                  </h5>
                  <p
                    style={{
                      fontSize: "13px",
                      color: textColor[theme],
                      lineHeight: 1.5,
                    }}
                  >
                    {body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
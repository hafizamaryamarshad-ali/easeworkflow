"use client";

import type { CSSProperties, FormEvent } from "react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiTwitter, FiLinkedin, FiCheckCircle } from "react-icons/fi";
import { useTheme } from "../../theme/ThemeProvider";

export default function ContactPage() {
  const { theme } = useTheme();
  const primaryColor = "#0ea5e9";

  const [budgetOpen, setBudgetOpen] = useState(false);
  const [budgetLabel, setBudgetLabel] = useState("Estimated budget");
  const budgetSelectRef = useRef<HTMLSelectElement | null>(null);

  const [contactOpen, setContactOpen] = useState(false);
  const [contactLabel, setContactLabel] = useState("Preferred contact method");
  const contactSelectRef = useRef<HTMLSelectElement | null>(null);

  const [showSuccess, setShowSuccess] = useState(false);

  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "14px",
    border: `1px solid ${primaryColor}`, // permanent focus color
    outline: "none",
    background: theme === "dark" ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.9)",
    color: theme === "dark" ? "#e2e8f0" : "#0f172a",
    fontSize: "0.9rem",
    boxSizing: "border-box",
    transition: "border 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
  };

  const cardStyle: CSSProperties = {
    padding: "14px 16px",
    borderRadius: "16px",
    background:
      theme === "dark"
        ? "linear-gradient(145deg, rgba(15,23,42,0.95), rgba(15,23,42,0.85))"
        : "linear-gradient(135deg,#3b82f6,#60a5fa)", // matches form button gradient
    border:
      theme === "dark"
        ? "2px solid #0ea5e9"
        : "2px solid #3b82f6", // thick border like Send button
    boxShadow:
      theme === "dark"
        ? "0 16px 40px rgba(15,23,42,0.95)"
        : "0 16px 40px rgba(15,23,42,0.18)",
    backdropFilter: "blur(16px)",
    color: "#f9fafb",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    cursor: "pointer",
  };

  const floatingIcons = [
    { Icon: FiMail, top: "10%", left: "6%", size: 44, duration: 22, opacity: 0.12 },
    { Icon: FiPhone, top: "22%", left: "88%", size: 38, duration: 26, opacity: 0.1 },
    { Icon: FiMapPin, top: "78%", left: "8%", size: 40, duration: 24, opacity: 0.1 },
    { Icon: FiTwitter, top: "70%", left: "92%", size: 34, duration: 28, opacity: 0.08 },
    { Icon: FiLinkedin, top: "40%", left: "4%", size: 36, duration: 30, opacity: 0.09 },
  ];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    const estimatedBudgetRaw = String(formData.get("estimatedBudget") ?? "");
    const preferredContactRaw = String(formData.get("preferredContactMethod") ?? "");

    const name = String(formData.get("yourName") ?? "").trim();
    const email = String(formData.get("workEmail") ?? "").trim();
    const phone = String(formData.get("phoneNumber") ?? "").trim();
    const shortMessage = String(formData.get("introMessage") ?? "").trim();
    const company = String(formData.get("companyName") ?? "").trim();
    const timeline = String(formData.get("timeline") ?? "").trim();
    const projectDescription = String(formData.get("projectDescription") ?? "").trim();

    const estimatedBudgetForApi = (() => {
      switch (estimatedBudgetRaw) {
        case "1k-5k":
          return "$1k-$5k";
        case "5k-10k":
          return "$5k-$10k";
        case "10k-15k":
          return "$10k-$15k";
        case "15k-20k":
          return "$15k-$20k";
        default:
          return estimatedBudgetRaw;
      }
    })();

    const preferredContactForApi = (() => {
      switch (preferredContactRaw) {
        case "email":
          return "Email";
        case "whatsapp":
          return "WhatsApp";
        default:
          return preferredContactRaw;
      }
    })();

    const basePayload: Record<string, string> = {
      name,
      email,
      short_message: shortMessage,
      estimated_budget: estimatedBudgetForApi,
      project_description: projectDescription,
      preferred_contact_method: preferredContactForApi,
      phone,
      company,
      timeline,
    };

    const payload = Object.fromEntries(
      Object.entries(basePayload).filter(([key, value]) => {
        if (["phone", "company", "timeline"].includes(key)) {
          return value !== "";
        }
        return true;
      })
    );

    console.log("Contact form payload:", payload);

    const apiUrl = "https://api.easeworkflow.com/api/contact";
    console.log("Submitting contact form to:", apiUrl);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const rawText = await response.text();
      let responseBody: unknown = null;

      try {
        responseBody = rawText ? JSON.parse(rawText) : null;
      } catch {
        responseBody = rawText;
      }

      console.log("Contact form API response:", response.status, responseBody);

      if (!response.ok) {
        const apiErrorMessage =
          (responseBody &&
            typeof responseBody === "object" &&
            responseBody !== null &&
            // @ts-expect-error - runtime shape from API
            (responseBody.message || responseBody.error || responseBody.details)) ||
          (typeof responseBody === "string" && responseBody) ||
          `Request failed with status ${response.status}`;

        console.warn("Contact form API error:", apiErrorMessage);
        alert(String(apiErrorMessage));
        return;
      }

      setShowSuccess(true);
      window.setTimeout(() => setShowSuccess(false), 3500);
      form.reset();
      setBudgetLabel("Estimated budget");
      setContactLabel("Preferred contact method");
      setBudgetOpen(false);
      setContactOpen(false);
    } catch (error) {
      console.error("Contact form submission error", error);
      const isNetworkError = error instanceof TypeError && error.message === "Failed to fetch";

      const message = isNetworkError
        ? "Unable to reach the contact service. Please check your connection and try again."
        : (error instanceof Error && error.message) ||
          "Something went wrong while sending your message. Please try again.";

      alert(String(message));
    }
  };

  const budgetOptions = [
    { label: "Estimated budget", value: "", disabled: true },
    { label: "$1,000 – $5,000", value: "1k-5k" },
    { label: "$5,000 – $10,000", value: "5k-10k" },
    { label: "$10,000 – $15,000", value: "10k-15k" },
    { label: "$15,000 – $20,000", value: "15k-20k" },
  ];

  const contactOptions = [
    { label: "Preferred contact method", value: "", disabled: true },
    { label: "Email", value: "email" },
    { label: "WhatsApp", value: "whatsapp" },
  ];

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "80px 16px 72px",
        background:
          theme === "dark"
            ? "radial-gradient(circle at top, #020617, #020617 30%, #0f172a 70%)"
            : "radial-gradient(circle at top, #eef2ff, #f8fafc 55%, #e2e8f0 95%)",
      }}
    >
      {/* Floating background icons */}
      {floatingIcons.map(({ Icon, top, left, size, duration, opacity }, index) => (
        <motion.div
          key={index}
          initial={{ y: 0 }}
          animate={{ y: ["0%", "-18%", "0%"] }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top,
            left,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: size + 42,
              height: size + 42,
              borderRadius: 999,
              border:
                theme === "dark"
                  ? "1px solid rgba(148,163,184,0.25)"
                  : "1px solid rgba(148,163,184,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                theme === "dark"
                  ? "radial-gradient(circle at top, rgba(56,189,248,0.18), rgba(15,23,42,0.1))"
                  : "radial-gradient(circle at top, rgba(59,130,246,0.12), rgba(248,250,252,0.1))",
              boxShadow:
                theme === "dark"
                  ? "0 20px 45px rgba(15,23,42,0.8)"
                  : "0 16px 40px rgba(15,23,42,0.14)",
              filter: "blur(1px)",
              opacity,
            }}
          >
            <Icon
              size={size}
              style={{
                color: theme === "dark" ? "#0ea5e9" : "#3b82f6",
              }}
            />
          </div>
        </motion.div>
      ))}

      <div style={{ maxWidth: "1080px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              fontSize: "2.4rem",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: theme === "dark" ? "#e5f4ff" : "#0f172a",
            }}
          >
            Let’s talk about your workflow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{
              maxWidth: "560px",
              margin: "10px auto 0",
              fontSize: "0.98rem",
              lineHeight: 1.7,
              color: theme === "dark" ? "#94a3b8" : "#475569",
            }}
          >
            Share a bit about your clinic and we’ll follow up with a tailored
            automation plan within one business day.
          </motion.p>
        </div>

        {/* MAIN LAYOUT */}
        <div
          style={{
            display: "flex",
            gap: "26px",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            style={{ flex: "1 1 420px" }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                padding: "24px 24px 22px",
                borderRadius: "22px",
                background:
                  theme === "dark"
                    ? "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(15,23,42,0.88))"
                    : "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(241,245,249,0.96))",
                border:
                  theme === "dark"
                    ? "1px solid rgba(148,163,184,0.35)"
                    : "1px solid rgba(148,163,184,0.25)",
                boxShadow:
                  theme === "dark"
                    ? "0 24px 60px rgba(15,23,42,0.9)"
                    : "0 20px 50px rgba(15,23,42,0.12)",
                backdropFilter: "blur(20px)",
                position: "relative",
                zIndex: 10,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  type="text"
                  name="yourName"
                  placeholder="Your Name"
                  required
                  style={inputStyle}
                />

                <input
                  type="email"
                  name="workEmail"
                  placeholder="Work Email"
                  required
                  style={inputStyle}
                />

                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number (optional)"
                  style={inputStyle}
                />

                <textarea
                  name="introMessage"
                  placeholder="Tell us briefly what you’d like to improve."
                  rows={4}
                  style={{ ...inputStyle, resize: "none" }}
                />

                <input
                  type="text"
                  name="companyName"
                  placeholder="Company / Business Name (optional)"
                  style={inputStyle}
                />

                {/* Estimated Budget Dropdown */}
                <div style={{ position: "relative", zIndex: 50 }}>
                  <select
                    ref={budgetSelectRef}
                    required
                    name="estimatedBudget"
                    defaultValue=""
                    style={{
                      ...inputStyle,
                      paddingRight: "40px",
                      color: "transparent",
                      textShadow: "0 0 0 transparent",
                    }}
                  >
                    {budgetOptions.map((opt) => (
                      <option key={opt.value || "placeholder"} value={opt.value} disabled={opt.disabled}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div
                    onClick={() => setBudgetOpen((o) => !o)}
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0 14px",
                      borderRadius: inputStyle.borderRadius,
                      cursor: "pointer",
                      color: theme === "dark" ? "#e2e8f0" : "#0f172a",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      background: "transparent",
                    }}
                  >
                    <span style={{ opacity: budgetLabel === "Estimated budget" ? 0.7 : 1 }}>
                      {budgetLabel}
                    </span>
                    <span style={{ fontSize: "0.8rem" }}>▼</span>
                  </div>
                  {budgetOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: 0,
                        width: "100%",
                        background: "#050b1a",
                        borderRadius: 12,
                        overflow: "hidden",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                        border: "1px solid rgba(0, 209, 255, 0.3)",
                        zIndex: 999,
                      }}
                    >
                      <div style={{ maxHeight: 260, overflowY: "auto", borderRight: "4px solid #00d1ff" }}>
                        {budgetOptions
                          .filter((opt) => !opt.disabled)
                          .map((opt) => (
                            <div
                              key={opt.value}
                              onClick={() => {
                                if (budgetSelectRef.current) {
                                  budgetSelectRef.current.value = opt.value;
                                }
                                setBudgetLabel(opt.label);
                                setBudgetOpen(false);
                              }}
                              style={{
                                padding: "12px 18px",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                color: "#fff",
                                fontWeight: 500,
                                borderBottom: "1px solid rgba(255,255,255,0.05)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(0, 209, 255, 0.1)";
                                e.currentTarget.style.color = "#00d1ff";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "#fff";
                              }}
                            >
                              {opt.label}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  name="timeline"
                  placeholder="Timeline (optional)"
                  style={inputStyle}
                />

                <textarea
                  name="projectDescription"
                  placeholder="Project description (goals, scope, current tools)."
                  rows={5}
                  required
                  style={{ ...inputStyle, resize: "none" }}
                />

                {/* Preferred Contact Method Dropdown */}
                <div style={{ position: "relative", zIndex: 50 }}>
                  <select
                    ref={contactSelectRef}
                    required
                    name="preferredContactMethod"
                    defaultValue=""
                    style={{
                      ...inputStyle,
                      paddingRight: "40px",
                      color: "transparent",
                      textShadow: "0 0 0 transparent",
                    }}
                  >
                    {contactOptions.map((opt) => (
                      <option key={opt.value || "placeholder"} value={opt.value} disabled={opt.disabled}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div
                    onClick={() => setContactOpen((o) => !o)}
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0 14px",
                      borderRadius: inputStyle.borderRadius,
                      cursor: "pointer",
                      color: theme === "dark" ? "#e2e8f0" : "#0f172a",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      background: "transparent",
                    }}
                  >
                    <span style={{ opacity: contactLabel === "Preferred contact method" ? 0.7 : 1 }}>
                      {contactLabel}
                    </span>
                    <span style={{ fontSize: "0.8rem" }}>▼</span>
                  </div>
                  {contactOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: 0,
                        width: "100%",
                        background: "#050b1a",
                        borderRadius: 12,
                        overflow: "hidden",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                        border: "1px solid rgba(0, 209, 255, 0.3)",
                        zIndex: 999,
                      }}
                    >
                      <div style={{ maxHeight: 260, overflowY: "auto", borderRight: "4px solid #00d1ff" }}>
                        {contactOptions
                          .filter((opt) => !opt.disabled)
                          .map((opt) => (
                            <div
                              key={opt.value}
                              onClick={() => {
                                if (contactSelectRef.current) {
                                  contactSelectRef.current.value = opt.value;
                                }
                                setContactLabel(opt.label);
                                setContactOpen(false);
                              }}
                              style={{
                                padding: "12px 18px",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                color: "#fff",
                                fontWeight: 500,
                                borderBottom: "1px solid rgba(255,255,255,0.05)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(0, 209, 255, 0.1)";
                                e.currentTarget.style.color = "#00d1ff";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "#fff";
                              }}
                            >
                              {opt.label}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: "16px",
                  width: "100%",
                  padding: "13px 18px",
                  borderRadius: "999px",
                  border: "none",
                  background:
                    theme === "dark"
                      ? "linear-gradient(90deg,#0ea5e9,#3b82f6)"
                      : "linear-gradient(90deg,#3b82f6,#60a5fa)",
                  color: "#f9fafb",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  boxShadow:
                    theme === "dark"
                      ? "0 16px 34px rgba(8,47,73,0.9)"
                      : "0 16px 34px rgba(59,130,246,0.35)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    theme === "dark"
                      ? "0 0 25px rgba(14,165,233,0.6)"
                      : "0 0 25px rgba(59,130,246,0.55)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    theme === "dark"
                      ? "0 16px 34px rgba(8,47,73,0.9)"
                      : "0 16px 34px rgba(59,130,246,0.35)";
                }}
              >
                Send message
              </button>
            </form>

            {/* CONTACT INFO CARDS under the form */}
            <div
              style={{
                display: "flex",
                gap: "14px",
                marginTop: "18px",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {[
                {
                  icon: <FiMail size={18} />,
                  title: "Primary Email",
                  lines: ["hi@easeworkflow.com"],
                },
                {
                  icon: <FiPhone size={18} />,
                  title: "Phone",
                  lines: ["+92 3000335194"],
                },
                {
                  icon: <FiMapPin size={18} />,
                  title: "Location",
                  lines: ["Faisalabad, Pakistan"],
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  style={{
                    ...cardStyle,
                    flex: "1 1 calc(33.333% - 10px)",
                    minWidth: "210px",
                    position: "relative",
                    zIndex: 0,
                  }}
                  onClick={
                    item.title === "Phone"
                      ? () => window.open("https://wa.me/923000335194", "_blank")
                      : item.title === "Primary Email"
                      ? () => {
                          window.location.href = "mailto:hi@easeworkflow.com";
                        }
                      : undefined
                  }
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 999,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        theme === "dark"
                          ? "rgba(15,23,42,0.2)"
                          : "rgba(15,23,42,0.1)",
                      marginBottom: 6,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h4 style={{ margin: 0, fontWeight: 600, fontSize: "0.9rem" }}>
                    {item.title}
                  </h4>
                  {item.lines.map((line, idx) => (
                    <p
                      key={idx}
                      style={{
                        fontSize: item.title === "Primary Email" ? "0.95rem" : "0.8rem",
                        fontWeight: item.title === "Primary Email" ? 700 : 400,
                        color: item.title === "Primary Email" ? "#e0f2fe" : "inherit",
                        opacity: 0.96,
                        margin: idx === 0 ? "4px 0 0" : "2px 0 0",
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ILLUSTRATION PANEL remains unchanged */}
             {/* ILLUSTRATION / VISUAL PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            style={{ flex: "1 1 380px", display: "flex", alignItems: "flex-start" }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: "24px",
                padding: "24px 24px 22px",
                width: "100%",
                background:
                  theme === "dark"
                    ? "radial-gradient(circle at top left, rgba(59,130,246,0.25), rgba(15,23,42,0.96))"
                    : "radial-gradient(circle at top left, rgba(191,219,254,0.9), rgba(248,250,252,0.98))",
                border:
                  theme === "dark"
                    ? "1px solid rgba(148,163,184,0.4)"
                    : "1px solid rgba(148,163,184,0.3)",
                boxShadow:
                  theme === "dark"
                    ? "0 24px 70px rgba(15,23,42,0.95)"
                    : "0 20px 60px rgba(15,23,42,0.12)",
                backdropFilter: "blur(22px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 20,
              }}
            >
              {/* Top: image + label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: theme === "dark" ? "#bae6fd" : "#1d4ed8",
                      margin: 0,
                    }}
                  >
                    Concierge onboarding
                  </p>
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: theme === "dark" ? "#e5f4ff" : "#0f172a",
                      margin: 0,
                    }}
                  >
                    A dedicated team for your clinic rollout.
                  </h3>
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: "0.88rem",
                      lineHeight: 1.6,
                      maxWidth: "320px",
                      color: theme === "dark" ? "#cbd5e1" : "#475569",
                    }}
                  >
                    Available for quick, hands-on support from first call to full automation.
                  </p>
                </div>

                <div
                  style={{
                    flexShrink: 0,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: -8,
                      borderRadius: 24,
                      background:
                        theme === "dark"
                          ? "radial-gradient(circle at top, rgba(59,130,246,0.5), transparent)"
                          : "radial-gradient(circle at top, rgba(96,165,250,0.6), transparent)",
                      opacity: 0.7,
                      filter: "blur(6px)",
                    }}
                  />
                  <img
                    src="/contact-illustration.png"
                    alt="EaseWorkflow contact illustration"
                    style={{
                      position: "relative",
                      width: 160,
                      height: "auto",
                      borderRadius: 24,
                      boxShadow:
                        theme === "dark"
                          ? "0 18px 40px rgba(15,23,42,0.95)"
                          : "0 16px 32px rgba(15,23,42,0.2)",
                    }}
                  />
                </div>
              </div>

              {/* Feature chips */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2,minmax(0,1fr))",
                  gap: 10,
                  marginTop: 8,
                }}
              >
                {["HIPAA-aware setup", "Training included", "US-based clinics", "Secure by design"].map(
                  (label) => (
                    <div
                      key={label}
                      style={{
                        padding: "9px 11px",
                        borderRadius: 14,
                        background:
                          theme === "dark"
                            ? "rgba(15,23,42,0.9)"
                            : "rgba(255,255,255,0.96)",
                        border:
                          theme === "dark"
                            ? "1px solid rgba(148,163,184,0.45)"
                            : "1px solid rgba(148,163,184,0.35)",
                        fontSize: "0.78rem",
                        color: theme === "dark" ? "#e5e7eb" : "#1f2933",
                      }}
                    >
                      {label}
                    </div>
                  )
                )}
              </div>

              {/* Stats row */}
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "0.8rem",
                    color: theme === "dark" ? "#cbd5e1" : "#475569",
                  }}
                >
                  <span style={{ opacity: 0.9 }}>Average first reply time</span>
                  <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>under 4 hours</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: "0.82rem",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "999px",
                      background:
                        theme === "dark"
                          ? "linear-gradient(135deg,#0ea5e9,#3b82f6)"
                          : "linear-gradient(135deg,#3b82f6,#60a5fa)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#f9fafb",
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      boxShadow:
                        theme === "dark"
                          ? "0 10px 22px rgba(8,47,73,0.9)"
                          : "0 10px 22px rgba(59,130,246,0.35)",
                    }}
                  >
                    24/7
                  </div>
                  <div style={{ color: theme === "dark" ? "#cbd5e1" : "#475569" }}>
                    <div>Priority support for US clinics</div>
                  </div>
                </div>
              </div>

              {/* Booking CTA Button */}
              <a
                href="/booking"
                style={{
                  marginTop: 16,
                  alignSelf: "flex-start",
                  padding: "14px 30px",
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: "1rem",
                  textDecoration: "none",
                  background:
                    theme === "dark"
                      ? "linear-gradient(90deg,#0ea5e9,#3b82f6)"
                      : "linear-gradient(90deg,#3b82f6,#60a5fa)",
                  color: "#f9fafb",
                  boxShadow:
                    theme === "dark"
                      ? "0 16px 36px rgba(15,23,42,0.9)"
                      : "0 16px 34px rgba(59,130,246,0.35)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    theme === "dark"
                      ? "0 20px 48px rgba(15,23,42,1)"
                      : "0 20px 40px rgba(59,130,246,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    theme === "dark"
                      ? "0 16px 36px rgba(15,23,42,0.9)"
                      : "0 16px 34px rgba(59,130,246,0.35)";
                }}
              >
                Book Free Workflow Audit
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {showSuccess && (
        <div
          onClick={() => setShowSuccess(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15,23,42,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              width: "100%",
              maxWidth: 420,
              borderRadius: 24,
              padding: "24px 22px 20px",
              background:
                theme === "dark"
                  ? "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(15,23,42,0.94))"
                  : "linear-gradient(145deg,#f9fafb,#e2e8f0)",
              boxShadow:
                theme === "dark"
                  ? "0 24px 60px rgba(15,23,42,0.95)"
                  : "0 22px 50px rgba(15,23,42,0.3)",
              border:
                theme === "dark"
                  ? "1px solid rgba(34,197,94,0.5)"
                  : "1px solid rgba(34,197,94,0.4)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  theme === "dark"
                    ? "rgba(22,163,74,0.16)"
                    : "rgba(22,163,74,0.12)",
                boxShadow:
                  theme === "dark"
                    ? "0 0 0 1px rgba(22,163,74,0.45)"
                    : "0 0 0 1px rgba(22,163,74,0.35)",
                marginBottom: 4,
              }}
            >
              <FiCheckCircle
                size={30}
                color="#22c55e"
                style={{ strokeWidth: 2.4 }}
              />
            </div>

            <h3
              style={{
                margin: 0,
                fontSize: "1.3rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: theme === "dark" ? "#e5f4ff" : "#064e3b",
                textAlign: "center",
              }}
            >
              Message Sent Successfully
            </h3>
            <p
              style={{
                margin: "6px 0 14px",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                textAlign: "center",
                color: theme === "dark" ? "#9ca3af" : "#4b5563",
              }}
            >
              Thank you! We will get back to you soon.
            </p>

            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              style={{
                marginTop: 4,
                padding: "9px 22px",
                borderRadius: 999,
                border: "none",
                background:
                  theme === "dark"
                    ? "linear-gradient(90deg,#22c55e,#16a34a)"
                    : "linear-gradient(90deg,#22c55e,#16a34a)",
                color: "#f9fafb",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
                boxShadow:
                  theme === "dark"
                    ? "0 14px 32px rgba(22,163,74,0.5)"
                    : "0 14px 30px rgba(22,163,74,0.4)",
              }}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
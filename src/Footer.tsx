"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "./theme/ThemeProvider";
// Social icons
import { FiLinkedin, FiInstagram, FiGithub } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Updated Social Links as per client request
  const socialLinks = [
    { 
      icon: <FiLinkedin size={18} />, 
      href: "http://linkedin.com/company/easeworkflow", 
      label: "EaseWorkflow LinkedIn", 
      isPrimary: true 
    },
    { 
      icon: <FiInstagram size={18} />, 
      href: "https://www.instagram.com/easeworkflow/", 
      label: "Instagram" 
    },
    { 
      icon: <FaYoutube size={18} />, 
      href: "https://www.youtube.com/@easeworkflow", 
      label: "YouTube" 
    },
    // { 
    //   icon: <FiLinkedin size={18} />, 
    //   href: "https://www.linkedin.com/in/itsmuhammadumer", 
    //   label: "Personal LinkedIn" 
    // },
    // { 
    //   icon: <FiGithub size={18} />, 
    //   href: "https://github.com/am-muhammadumer", 
    //   label: "GitHub" 
    // },
  ];

  return (
    <>
      <footer
        id="site-footer"
        style={{
          position: "relative",
          padding: "80px 20px 40px",
          background:
            theme === "dark"
              ? "linear-gradient(180deg, #020617, #020617)"
              : "linear-gradient(180deg, #f9fafb, #e2e8f0)",
          color: theme === "dark" ? "#e2e8f0" : "#0f172a",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "700px",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.35), transparent)",
            filter: "blur(140px)",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "50px",
            }}
          >
            {/* BRAND & SOCIALS */}
            <div>
              <h2 style={{ fontSize: "2rem", fontWeight: 900 }}>
                Ease<span style={{ color: "#38bdf8" }}>Workflow</span>
              </h2>
              <p style={{ marginTop: "15px", opacity: 0.7, fontSize: "0.9rem" }}>
                Smart automation systems, AI integrations, and modern web solutions built for scale and performance.
              </p>

              {/* SOCIAL ICONS ROW */}
              <div style={{ display: "flex", gap: "10px", marginTop: "25px", flexWrap: "wrap" }}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background: social.isPrimary ? "rgba(56, 189, 248, 0.2)" : "rgba(255,255,255,0.05)",
                      border: social.isPrimary ? "1px solid rgba(56, 189, 248, 0.4)" : "1px solid rgba(255,255,255,0.1)",
                      color: social.isPrimary ? "#38bdf8" : "inherit",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#38bdf8";
                      e.currentTarget.style.color = "#000";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = social.isPrimary ? "rgba(56, 189, 248, 0.2)" : "rgba(255,255,255,0.05)";
                      e.currentTarget.style.color = social.isPrimary ? "#38bdf8" : "inherit";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* LINKS */}
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: "15px" }}>Company</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { href: "/", label: "Home" },
                  { href: "/projects", label: "Projects" },
                  { href: "/contact", label: "Contact" },
                  { href: "/#privacy", label: "Privacy" },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "10px",
                      background: "rgba(56, 189, 248, 0.15)",
                      color: "#38bdf8",
                      textDecoration: "none",
                      fontWeight: 600,
                      border: "1px solid rgba(56, 189, 248, 0.3)",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* SERVICES */}
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: "15px" }}>Services</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", opacity: 0.8 }}>
                <span>Custom Dashboards</span>
                <span>AI Integration</span>
                <span>Automation Systems</span>
                <span>Stats and Analytics</span>
              </div>
            </div>

            {/* CTA */}
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: "15px" }}>Let’s Build Something</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                Turn your idea into a powerful product with modern tech.
              </p>
              <button
                onClick={() => router.push("/contact")}
                style={{
                  marginTop: "15px",
                  padding: "12px 22px",
                  borderRadius: "999px",
                  background: "#38bdf8",
                  color: "#000",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Start Project →
              </button>
            </div>

          </div>

          <div
            style={{
              marginTop: "60px",
              borderTop: theme === "dark" ? "1px solid rgba(148,163,184,0.15)" : "1px solid rgba(15,23,42,0.1)",
            }}
          />

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              fontSize: "0.85rem",
              opacity: 0.7,
            }}
          >
            <p>© {new Date().getFullYear()} EaseWorkflow</p>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }} />
          </div>
        </div>
      </footer>

      {/* MODAL (UNCHANGED) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "520px",
              maxHeight: "85vh",
              background: theme === "dark" ? "#0f172a" : "#f9fafb",
              borderRadius: "18px",
              padding: "26px",
              boxShadow: "0 30px 90px rgba(0,0,0,0.6)",
              position: "relative",
              overflowY: "auto",
              border: "1px solid rgba(56,189,248,0.3)",
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                border: "none",
                background: "#38bdf8",
                color: "#000",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "6px" }}>Get in Touch</h2>
            <p style={{ fontSize: "0.9rem", opacity: 0.75 }}>Have an idea? Let’s turn it into a powerful solution.</p>

            <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {[
                "Workflow Automation", "AI Process Automation", "Smart Scheduling", "Robotic Automation", 
                "Healthcare Automation", "Data Automation", "System Integration", "End-to-End Automation"
              ].map((item, i) => (
                <span
                  key={i}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "999px",
                    border: "1px solid #38bdf8",
                    fontSize: "0.78rem",
                    color: "#38bdf8",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            <form style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ gridColumn: "span 2" }}>
                <input placeholder="Name" style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", background: "transparent", outline: "none", color: theme === "dark" ? "#fff" : "#000" }} />
              </div>
              <input placeholder="Email" style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", background: "transparent", outline: "none", color: theme === "dark" ? "#fff" : "#000" }} />
              <input placeholder="Phone" style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", background: "transparent", outline: "none", color: theme === "dark" ? "#fff" : "#000" }} />
              <div style={{ gridColumn: "span 2" }}>
                <textarea placeholder="Message" rows={4} style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", background: "transparent", outline: "none", resize: "none", color: theme === "dark" ? "#fff" : "#000" }} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <button type="submit" style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "none", background: "#38bdf8", fontWeight: 700, cursor: "pointer", marginTop: "10px" }}>Send Message</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiHome, FiInfo, FiActivity, FiTool, FiHexagon, FiPenTool, FiMail, FiPhone, FiSun, FiMoon } from "react-icons/fi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("/");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Apply body background dynamically
    if (theme === "light") {
      document.body.style.background = "#f5f7fa";
      document.body.style.color = "#0f172a";
    } else {
      document.body.style.background = "linear-gradient(145deg, #0a0f2b, #0f172a, #1e40af, #22d3ee)";
      document.body.style.color = "#fff";
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const navLinks = [
    { name: "Home", href: "/", icon: <FiHome size={14} /> },
    { name: "About", href: "/about", icon: <FiInfo size={14} /> },
    { name: "Healthcare", href: "/healthcare-automation", icon: <FiActivity size={14} /> },
    { name: "Projects", href: "/projects", icon: <FiHexagon size={14} /> },
    { name: "Case Studies", href: "/case-studies", icon: <FiTool size={14} /> },
    { name: "Blog", href: "/blog", icon: <FiPenTool size={14} /> },
    { name: "Contact", href: "/contact", icon: <FiMail size={14} /> },
  ];

  const mainColor = theme === "dark" ? "#00c6ff" : "#3b82f6";
  const navTextColor = theme === "dark" ? "#fff" : "#0f172a";
  const navBg = scrolled
    ? theme === "dark"
      ? "rgba(15,15,15,0.85)"
      : "rgba(255,255,255,0.85)"
    : theme === "dark"
    ? "rgba(15,15,15,0.6)"
    : "rgba(255,255,255,0.6)";

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 24px",
        background: navBg,
        backdropFilter: "blur(16px)",
        borderRadius: "12px",
        maxWidth: "1400px",
        margin: "0 auto",
        transition: "all 0.4s ease",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <FiHexagon size={24} color={mainColor} />
        <Link
          href="/"
          onClick={() => setActive("/")}
          key={theme} // forces re-render on theme change
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            background: theme === "dark"
              ? "linear-gradient(270deg, #00c6ff, #0072ff)"
              : "linear-gradient(270deg, #3b82f6, #2563eb)",
            backgroundSize: "400% 400%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            textDecoration: "none",
          }}
        >
          EaseWorkflow
        </Link>
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setActive(link.href)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              position: "relative",
              color: active === link.href ? mainColor : navTextColor,
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              padding: "4px 6px",
              borderRadius: "6px",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = mainColor; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = active === link.href ? mainColor : navTextColor; }}
          >
            {link.icon} {link.name}
            <span
              style={{
                position: "absolute",
                bottom: -2,
                left: 0,
                width: active === link.href ? "100%" : "0%",
                height: "2px",
                background: mainColor,
                borderRadius: "2px",
                transition: "width 0.25s ease",
              }}
            />
          </Link>
        ))}
      </div>

      {/* Right Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            padding: "6px 12px",
            borderRadius: "12px",
            background: theme === "dark" ? "#fff" : mainColor,
            color: theme === "dark" ? "#0f172a" : "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.8rem",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {theme === "dark" ? <FiSun /> : <FiMoon />}
          {theme === "dark" ? "Light" : "Dark"}
        </button>

        {/* Consultation */}
        <Link
          href="/contact"
          onClick={() => setActive("/contact")}
          style={{
            padding: "8px 20px",
            fontSize: "0.88rem",
            fontWeight: 600,
            borderRadius: "16px",
            background: mainColor,
            color: "#fff",
            textDecoration: "none",
            transition: "all 0.25s ease",
          }}
        >
          Book Consultation
        </Link>

        {/* Call */}
        <Link
          href="tel:+1234567890"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            fontSize: "0.85rem",
            fontWeight: 600,
            borderRadius: "50%",
            background: mainColor,
            color: "#fff",
            textDecoration: "none",
          }}
        >
          <FiPhone size={16} />
        </Link>
      </div>
    </nav>
  );
}
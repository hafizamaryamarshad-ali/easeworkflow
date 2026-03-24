"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome, FiInfo, FiTool, FiHexagon, FiPenTool,
  FiMail, FiPhone, FiSun, FiMoon, FiMenu, FiX
} from "react-icons/fi";
import { useTheme } from "./theme/ThemeProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isLinkActive = (href: string) => {
    if (!pathname) return href === "/";
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navLinks = [
    { name: "Home", href: "/", icon: <FiHome size={14} /> },
    { name: "About", href: "/about", icon: <FiInfo size={14} /> },
    { name: "Projects", href: "/projects", icon: <FiHexagon size={14} /> },
    { name: "Case Studies", href: "/case-studies", icon: <FiTool size={14} /> },
    { name: "Blog", href: "/blog", icon: <FiPenTool size={14} /> },
    { name: "Contact", href: "/contact", icon: <FiMail size={14} /> },
  ];

  const mainColor = theme === "dark" ? "#00c6ff" : "#3b82f6";
  const navTextColor = theme === "dark" ? "#fff" : "#0f172a";

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        width: "100%", // FIX
        background: "transparent", // FIX (important)
        backdropFilter: "blur(16px)",
      }}
    >
      {/* INNER CONTAINER (keeps same size as before) */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 24px",
          flexWrap: "wrap",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flexShrink: 0,
          }}
        >
          <FiHexagon size={24} color={mainColor} />
          <Link
            href="/"
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: mainColor,
              textDecoration: "none",
            }}
          >
            EaseWorkflow
          </Link>
        </div>

        {/* Desktop Nav Links */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  position: "relative",
                  color: isLinkActive(link.href) ? mainColor : navTextColor,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  padding: "4px 6px",
                }}
              >
                {link.icon} {link.name}
              </Link>
            ))}
          </div>
        )}

        {/* Desktop Buttons */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
              {theme === "dark" ? "Light" : "Dark"}
            </button>

            <Link
              href="/contact"
              style={{
                padding: "8px 20px",
                fontSize: "0.88rem",
                fontWeight: 600,
                background: mainColor,
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Book Consultation
            </Link>

            <Link
              href="tel:+1234567890"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: mainColor,
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <FiPhone size={16} />
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: mainColor,
            }}
          >
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: theme === "dark"
              ? "rgba(10,15,43,0.97)"
              : "rgba(255,255,255,0.97)",
            backdropFilter: "blur(16px)",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: navTextColor,
                textDecoration: "none",
                padding: "10px 8px",
              }}
            >
              {link.icon} {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
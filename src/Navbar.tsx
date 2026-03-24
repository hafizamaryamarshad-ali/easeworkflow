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
        maxWidth: "1400px",
        margin: "0 auto",
        transition: "all 0.4s ease",
        flexWrap: "wrap",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          position: "relative",
          zIndex: 1,
          flexShrink: 0,
        }}
      >
        <FiHexagon size={24} color={mainColor} />
        <Link
          href="/"
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            fontSize: "1.5rem",
            fontWeight: 700,
            backgroundImage: theme === "dark"
              ? "linear-gradient(270deg, #00c6ff, #0072ff)"
              : "linear-gradient(270deg, #3b82f6, #2563eb)",
            backgroundSize: "400% 400%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: mainColor,
            textDecoration: "none",
            textShadow: theme === "dark" ? "0 0 10px rgba(0,198,255,0.2)" : "none",
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
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = mainColor; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = isLinkActive(link.href) ? mainColor : navTextColor; }}
            >
              {link.icon} {link.name}
              <span
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: 0,
                  width: isLinkActive(link.href) ? "100%" : "0%",
                  height: "2px",
                  background: mainColor,
                  transition: "width 0.25s ease",
                }}
              />
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
              borderRadius: "12px", // keep rounded
              background: theme === "dark" ? "#fff" : mainColor,
              color: theme === "dark" ? "#0f172a" : "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.3s ease",
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
              textAlign: "center",
              transition: "all 0.25s ease",
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
              fontSize: "0.85rem",
              fontWeight: 600,
              borderRadius: "50%", // keep icon rounded
              background: mainColor,
              color: "#fff",
              textDecoration: "none",
            }}
          >
            <FiPhone size={16} />
          </Link>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobile && (
        <>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: mainColor,
              display: "flex",
              alignItems: "center",
              padding: "4px",
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>

          {menuOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: theme === "dark" ? "rgba(10,15,43,0.97)" : "rgba(255,255,255,0.97)",
                backdropFilter: "blur(16px)",
                padding: "16px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                zIndex: 998,
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
                    color: isLinkActive(link.href) ? mainColor : navTextColor,
                    fontWeight: 600,
                    fontSize: "1rem",
                    textDecoration: "none",
                    padding: "10px 8px",
                    borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`
                  }}
                >
                  {link.icon} {link.name}
                </Link>
              ))}

              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "12px" }}>
                <button
                  onClick={toggleTheme}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    borderRadius: "12px", // keep rounded
                    background: theme === "dark" ? "#fff" : mainColor,
                    color: theme === "dark" ? "#0f172a" : "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  {theme === "dark" ? <FiSun /> : <FiMoon />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>

                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    flex: 2,
                    padding: "8px 16px",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    background: mainColor,
                    color: "#fff",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </nav>
  );
}
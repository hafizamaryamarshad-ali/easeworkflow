"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiInfo, FiActivity, FiTool, FiHexagon, FiPenTool, FiMail, FiPhone, FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("/");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
        flexWrap: "wrap",
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

      {/* Nav Links — desktop only */}
      {!isMobile && (
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setActive(link.href)}
            aria-current={active === link.href ? "page" : undefined}
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
      )}

      {/* Right Buttons — desktop only */}
      {!isMobile && (
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
      )}

      {/* Burger button — mobile only */}
      {isMobile && (
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
      )}

      {/* Mobile menu with backdrop and animation */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(4px)",
                zIndex: 997,
              }}
            />
            
            {/* Mobile dropdown menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: theme === "dark" ? "rgba(10,15,43,0.97)" : "rgba(255,255,255,0.97)",
                backdropFilter: "blur(16px)",
                borderRadius: "0 0 12px 12px",
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
                  onClick={() => { setActive(link.href); setMenuOpen(false); }}
                  aria-current={active === link.href ? "page" : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: active === link.href ? mainColor : navTextColor,
                    fontWeight: 600,
                    fontSize: "1rem",
                    textDecoration: "none",
                    padding: "10px 8px",
                    borderRadius: "8px",
                    borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
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
                    borderRadius: "12px",
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
                  onClick={() => { setActive("/contact"); setMenuOpen(false); }}
                  style={{
                    flex: 2,
                    padding: "8px 16px",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    borderRadius: "12px",
                    background: mainColor,
                    color: "#fff",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  Book Consultation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
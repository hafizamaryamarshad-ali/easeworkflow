"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiInfo,
  FiTool,
  FiHexagon,
  FiPenTool,
  FiMail,
  FiPhone,
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiLock,
  FiCalendar,
} from "react-icons/fi";
import { useTheme } from "./theme/ThemeProvider";
import Image from "next/image";
import CalendlyButton from "./components/CalendlyButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      setIsMobile(width <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const openCalendly = () => {
    window.open("https://calendly.com/iamumershaheen/30min", "_blank");
  };

  const isLinkActive = (href: string) => {
    // Ignore pure hash links for active state
    if (href.startsWith("#")) return false;

    const baseHref = href.split("#")[0] || "/";

    if (!pathname) return baseHref === "/";
    if (baseHref === "/") return pathname === "/";
    return pathname === baseHref || pathname.startsWith(`${baseHref}/`);
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Special handling for Privacy section: navigate home then scroll
    if (href === "/#privacy") {
      event.preventDefault();

      if (pathname === "/") {
        const el = document.getElementById("privacy");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        router.push("/#privacy");
      }
      return;
    }

    // Other same-page hash links
    if (href.startsWith("#")) {
      event.preventDefault();
      const targetId = href.slice(1);
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
  };

  const navLinks = [
    { name: "Home", href: "/", icon: <FiHome size={14} /> },
   
    { name: "Projects", href: "/projects", icon: <FiHexagon size={14} /> },
    { name: "Case Studies", href: "/case-studies", icon: <FiTool size={14} /> },
    { name: "Blog", href: "/blog", icon: <FiPenTool size={14} /> },
    { name: "Contact", href: "/contact", icon: <FiMail size={14} /> },
    { name: "About", href: "/about", icon: <FiInfo size={14} /> },
  ];

  // Match the hero section's blue accent and glassy gradient feel
  const mainColor = theme === "dark" ? "#0ea5e9" : "#3b82f6";
  const navTextColor = theme === "dark" ? "#e5f4ff" : "#0f172a";

  const navBg = theme === "dark"
    ? scrolled
      ? "linear-gradient(120deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))"
      : "linear-gradient(120deg, rgba(15,23,42,0.9), rgba(15,23,42,0.82))"
    : scrolled
    ? "rgba(255,255,255,0.96)"
    : "rgba(255,255,255,0.9)";

  const navBorder = theme === "dark"
    ? "1px solid rgba(148,163,184,0.45)"
    : "1px solid rgba(148,163,184,0.25)";

  const navShadow = theme === "dark"
    ? "0 18px 45px rgba(15,23,42,0.9)"
    : "0 10px 30px rgba(15,23,42,0.12)";

  const isTabletMid =
    viewportWidth !== null && viewportWidth > 768 && viewportWidth <= 1024;

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: isMobile ? "8px 16px" : isTabletMid ? "8px 24px" : "10px 40px",
        background: navBg,
        backdropFilter: "blur(16px)",
        border: navBorder,
        boxShadow: navShadow,
        borderRadius: "0 0 12px 12px",
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
        boxSizing: "border-box",
        transition: "all 0.4s ease",
        flexWrap: isTabletMid ? "nowrap" : "wrap",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          flexShrink: 0,
          textDecoration: "none",
        }}
      >
        <Image
          src="/logo19.png"
          alt="EaseWorkflow logo"
          width={45}
          height={38}
          priority
          style={{
            transform: "scale(1.8)",
            objectFit: "contain",
          }}
        />
      </Link>

      {/* Desktop Nav Links */}
      {!isMobile && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isTabletMid ? "12px" : "16px",
            flex: isTabletMid ? 1 : undefined,
            justifyContent: isTabletMid ? "center" : undefined,
            minWidth: 0,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                position: "relative",
                color: isLinkActive(link.href) ? mainColor : navTextColor,
                fontWeight: 600,
                fontSize: isTabletMid ? "0.82rem" : "0.9rem",
                textDecoration: "none",
                padding: isTabletMid ? "2px 4px" : "4px 6px",
                borderRadius: "6px",
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
                  borderRadius: "2px",
                  transition: "width 0.25s ease",
                }}
              />
            </Link>
          ))}
        </div>
      )}

      {/* Desktop Buttons */}
      {!isMobile && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isTabletMid ? "8px" : "12px",
            flexShrink: 0,
          }}
        >
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              padding: isTabletMid ? "4px 10px" : "6px 12px",
              borderRadius: "12px",
              background: theme === "dark" ? "#fff" : mainColor,
              color: theme === "dark" ? "#0f172a" : "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: isTabletMid ? "0.75rem" : "0.8rem",
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
            style={{
              padding: isTabletMid ? "6px 16px" : "8px 20px",
              fontSize: isTabletMid ? "0.8rem" : "0.88rem",
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

         {/* Calendly Button */}
<CalendlyButton mainColor={mainColor} />
        </div>
      )}

      {/* Mobile menu */}
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
                borderRadius: "0 0 12px 12px",
                padding: "16px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                alignItems: "center",
                zIndex: 1000,
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setMenuOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    justifyContent: "center",
                    color: isLinkActive(link.href) ? mainColor : navTextColor,
                    fontWeight: 600,
                    fontSize: "1rem",
                    textDecoration: "none",
                    padding: "10px 8px",
                    borderRadius: "8px",
                    width: "100%",
                    textAlign: "center",
                    borderBottom: `1px solid ${
                      theme === "dark"
                        ? "rgba(255,255,255,0.07)"
                        : "rgba(0,0,0,0.07)"
                    }`,
                  }}
                >
                  {link.icon} {link.name}
                </Link>
              ))}

              <button
                type="button"
                onClick={() => {
                  openCalendly();
                  setMenuOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  justifyContent: "center",
                  color: navTextColor,
                  fontWeight: 600,
                  fontSize: "1rem",
                  textDecoration: "none",
                  padding: "10px 8px",
                  borderRadius: "8px",
                  width: "100%",
                  textAlign: "center",
                  borderBottom:
                    theme === "dark"
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "1px solid rgba(0,0,0,0.07)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "2px",
                }}
              >
                <FiCalendar size={14} /> Schedule Your Free Consultation
              </button>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "12px",
                  width: "100%",
                }}
              >
                <button
                  onClick={toggleTheme}
                  style={{
                    flex: 1,
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: theme === "dark" ? "#fff" : mainColor,
                    color: theme === "dark" ? "#0f172a" : "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "0.9rem",
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
                    padding: "10px 14px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    borderRadius: "12px",
                    background: mainColor,
                    color: "#fff",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  Start a Project
                </Link>
              </div>

              {/* Mobile Calendly button inside menu for calendar visibility */}
              <div
                style={{
                  marginTop: "10px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* Calendly button is handled as a menu item on mobile */}
              </div>
            </div>
          )}
        </>
      )}
    </nav>
  );
}
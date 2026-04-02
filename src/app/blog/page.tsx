"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiClock, FiSearch } from "react-icons/fi";
import { fetchBlogs, type BlogPost } from "../../lib/fetchBlogs";
import { useTheme } from "../../theme/ThemeProvider";

export default function BlogPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9); 
  const [searchQuery, setSearchQuery] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const colors = {
    bg: isDark ? "#0f172a" : "#fbfdfd",
    text: isDark ? "#f8fafc" : "#1e293b",
    accent: "#00d1ff", 
    cardBg: isDark ? "rgba(30, 41, 59, 0.5)" : "#ffffff",
    cardBorder: isDark ? "rgba(0, 209, 255, 0.2)" : "rgba(0, 209, 255, 0.1)",
    inputBg: isDark ? "rgba(255, 255, 255, 0.05)" : "#f1f5f9",
    dropdownBg: "#050b1a",
  };

  useEffect(() => {
    fetchBlogs().then(setBlogs).finally(() => setLoading(false));

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectFromList = (title: string) => {
    setSearchQuery(title === "All Blogs" ? "" : title);
    setShowDropdown(false);
  };

  if (loading) return null;

  return (
    <div style={{ 
      backgroundColor: colors.bg, 
      color: colors.text, 
      minHeight: "100vh", 
      padding: "40px 20px 80px", // 120px se kam karke 40px kar diya
      position: "relative", 
      overflowX: "hidden" 
    }}>
      
      {/* 1. CENTERED HEADING */}
      <header style={{ textAlign: 'center', marginBottom: '30px' }}> {/* Margin kam kiya */}
        <motion.h1 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          style={{ 
            fontSize: "clamp(2rem, 5vw, 3.5rem)", // Thora compact size
            fontWeight: 950, 
            lineHeight: 1.1, 
            marginBottom: "10px", // Margin kam kiya
            marginTop: "0px" // Top margin zero
          }}
        >
          Our Blogs
        </motion.h1>
        <p style={{ maxWidth: "700px", margin: "0 auto", opacity: 0.7, fontSize: "1.05rem" }}>
          Step into our centre of insights, where intricate technical subjects & dynamic industry news are simplified perfectly for every learner.
        </p>
      </header>

      {/* 2. SEARCH & DROPDOWN */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '15px', 
        maxWidth: '800px', 
        margin: '0 auto 50px', // Margin 80px se 50px kiya
        position: 'relative' 
      }}>
        
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <div 
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ 
              background: colors.accent, padding: '10px 22px', borderRadius: '50px', 
              fontWeight: 700, color: '#000', cursor: 'pointer', fontSize: '0.85rem',
              display: 'flex', alignItems: 'center', gap: '30px', boxShadow: `0 4px 15px ${colors.accent}44`
            }}
          >
            All Blogs <FiChevronDown style={{ transform: showDropdown ? 'rotate(180deg)' : 'none', transition: '0.3s', strokeWidth: 3 }} />
          </div>

          <AnimatePresence>
            {showDropdown && (
              <motion.div 
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0 }}
                style={{ 
                  position: 'absolute', top: '50px', left: '0', width: '300px', 
                  background: colors.dropdownBg, borderRadius: '12px', overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 100,
                  border: '1px solid rgba(0, 209, 255, 0.3)', transformOrigin: 'top'
                }}
              >
                <div style={{ maxHeight: '350px', overflowY: 'auto', borderRight: `4px solid ${colors.accent}` }}>
                  {["All Blogs", ...blogs.map(b => b.title)].map((item, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => handleSelectFromList(item)}
                      style={{ 
                        padding: '12px 18px', cursor: 'pointer', fontSize: '0.9rem',
                        color: '#fff', fontWeight: 500, transition: '0.2s',
                        borderBottom: '1px solid rgba(255,255,255,0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 209, 255, 0.1)';
                        e.currentTarget.style.color = colors.accent;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#fff';
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ position: 'relative', flex: 1 }}>
          <FiSearch style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
          <input 
            type="text" 
            placeholder="Search Blogs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', padding: '12px 20px 12px 50px', borderRadius: '50px', 
              background: colors.inputBg, border: `1px solid ${colors.cardBorder}`, 
              color: colors.text, outline: 'none' 
            }}
          />
        </div>
      </div>

      {/* 3. GRID LAYOUT */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "30px", maxWidth: "1200px", margin: "0 auto" }}>
        {blogs.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, visibleCount).map((blog) => (
          <motion.div key={blog._id} whileHover={{ y: -8 }} style={{ background: colors.cardBg, borderRadius: "24px", overflow: "hidden", border: `1px solid ${colors.cardBorder}`, display: "flex", flexDirection: "column" }}>
            <div style={{ position: 'relative', height: '180px' }}>
              <Image src={blog.thumbnailUrl || '/placeholder.jpg'} alt={blog.title} fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px' }}>{blog.title}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '20px' }}>{blog.excerpt}</p>
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ border: `1.5px solid ${colors.accent}`, color: colors.accent, padding: '6px 20px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700 }}>Read more</div>
                </Link>
                <span style={{ fontSize: '0.8rem', opacity: 0.5 }}><FiClock /> 3 min read</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4. VIEW MORE BUTTON */}
      {blogs.length > visibleCount && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <button 
            onClick={() => setVisibleCount(v => v + 6)} 
            style={{ background: 'transparent', border: `2px solid ${colors.accent}`, color: colors.text, padding: '10px 35px', borderRadius: '50px', cursor: 'pointer', fontWeight: 700 }}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
}   

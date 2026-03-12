"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiCpu, FiActivity, FiTrendingUp } from "react-icons/fi";

interface BlogCardProps {
  posts: {
    title: string;
    slug: string;
    description: string;
  }[];
  theme?: "light" | "dark"; // theme prop
}

export default function BlogCardsClient({ posts, theme = "dark" }: BlogCardProps) {
  const icons = [<FiCpu size={28} />, <FiActivity size={28} />, <FiTrendingUp size={28} />];

  if (!posts.length) 
    return <p style={{ color: theme === "dark" ? "#fff" : "#111" }}>No blog posts found</p>;

  const cardBg = theme === "dark" ? "rgba(255,255,255,0.08)" : "#f9fafb";
  const cardText = theme === "dark" ? "#fff" : "#111";
  const subText = theme === "dark" ? "#cbd5e1" : "#334155";
  const iconColor = theme === "dark" ? "#00c6ff" : "#3b82f6";
  const boxShadow = theme === "dark" ? "0 16px 40px rgba(0,0,0,0.25)" : "0 16px 40px rgba(0,0,0,0.05)";
  const hoverShadow = theme === "dark"
    ? "0 25px 60px rgba(0,198,255,0.45)"
    : "0 25px 60px rgba(59,130,246,0.2)";
  const iconBg = theme === "dark" ? "rgba(0,198,255,0.2)" : "rgba(59,130,246,0.15)";

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
      {posts.map((post, i) => (
        <Link key={i} href={`/blog/${post.slug}`}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, boxShadow: hoverShadow }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            style={{
              position: "relative",
              minWidth: "250px",
              maxWidth: "300px",
              padding: "32px",
              borderRadius: "20px",
              background: cardBg,
              backdropFilter: theme === "dark" ? "blur(25px)" : "none",
              boxShadow,
              color: cardText,
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            <motion.div
              style={{
                marginBottom: "12px",
                display: "inline-flex",
                padding: "12px",
                borderRadius: "50%",
                background: iconBg,
                color: iconColor,
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2 + i, repeat: Infinity }}
            >
              {icons[i % icons.length]}
            </motion.div>

            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "12px" }}>
              {post.title}
            </h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.5, color: subText }}>
              {post.description}...
            </p>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
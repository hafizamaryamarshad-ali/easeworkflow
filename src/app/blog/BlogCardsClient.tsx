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
    return <p style={{ color: theme === "dark" ? "var(--color-text-primary)" : "var(--color-text-dark)" }}>No blog posts found</p>;

  const cardBg = theme === "dark" ? "var(--color-card-dark)" : "var(--color-card-light)";
  const cardText = theme === "dark" ? "var(--color-text-primary)" : "var(--color-text-dark)";
  const subText = theme === "dark" ? "var(--color-text-muted)" : "var(--color-text-muted-light)";
  const iconColor = theme === "dark" ? "var(--color-primary)" : "var(--color-secondary)";
  const cardBorder = theme === "dark" ? "1px solid var(--color-border-dark)" : "1px solid var(--color-border-light)";
  const iconBg = theme === "dark" ? "var(--icon-bg-dark)" : "var(--icon-bg-light)";

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
      {posts.map((post, i) => (
        <Link key={i} href={`/blog/${post.slug}`}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            style={{
              position: "relative",
              minWidth: "250px",
              maxWidth: "300px",
              padding: "32px",
              borderRadius: "20px",
              background: cardBg,
              backdropFilter: theme === "dark" ? "blur(20px)" : "none",
              border: cardBorder,
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
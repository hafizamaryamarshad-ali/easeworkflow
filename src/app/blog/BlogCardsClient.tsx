// app/blog/BlogCardsClient.tsx
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
}

export default function BlogCardsClient({ posts }: BlogCardProps) {
  const icons = [<FiCpu size={28} />, <FiActivity size={28} />, <FiTrendingUp size={28} />];

  if (!posts.length) return <p>No blog posts found</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
      {posts.map((post, i) => (
        <Link key={i} href={`/blog/${post.slug}`}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, boxShadow: "0 25px 60px rgba(0,198,255,0.45)" }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            style={{
              position: "relative",
              minWidth: "250px",
              maxWidth: "300px",
              padding: "32px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(25px)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
              color: "#fff",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{ marginBottom: "12px", display: "inline-flex", padding: "12px", borderRadius: "50%", background: "rgba(0,198,255,0.2)", color: "#00c6ff" }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2 + i, repeat: Infinity }}
            >
              {icons[i % icons.length]}
            </motion.div>

            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "12px" }}>{post.title}</h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.5 }}>{post.description}...</p>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
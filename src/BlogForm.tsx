"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BlogForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    authorName: "",
    authorBio: "",
    publishDate: "",
    metaTitle: "",
    metaDescription: "",
    focusKeyword: "",
    canonicalUrl: "",
    featured: false,
    published: false,
    allowComments: true,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    const existing = localStorage.getItem("blogs");
    const blogs = existing ? JSON.parse(existing) : [];

    blogs.push(form);
    localStorage.setItem("blogs", JSON.stringify(blogs));

    router.push("/blog");
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "60px 40px",
        position: "relative", // ✅ IMPORTANT
      }}
    >
      {/* 🔙 TOP LEFT BACK BUTTON */}
      <div style={{ position: "absolute", top: "20px", left: "20px" }}>
        <Link href="/blog">
          <button style={backButtonStyle}>
            ← Back
          </button>
        </Link>
      </div>

      <h2>Basic Information</h2>

      <input name="title" placeholder="Title" onChange={handleChange} style={inputStyle} />
      <input name="slug" placeholder="Slug" onChange={handleChange} style={inputStyle} />
      <textarea name="excerpt" placeholder="Excerpt" onChange={handleChange} style={textareaStyle} />
      <textarea name="content" placeholder="Content" onChange={handleChange} style={textareaStyle} />

      <h2>Classification</h2>

      <input name="category" placeholder="Category" onChange={handleChange} style={inputStyle} />
      <input name="tags" placeholder="Tags" onChange={handleChange} style={inputStyle} />

      <h2>SEO</h2>

      <input name="metaTitle" placeholder="Meta Title" onChange={handleChange} style={inputStyle} />
      <textarea name="metaDescription" placeholder="Meta Description" onChange={handleChange} style={textareaStyle} />

      <button onClick={handleSave} style={buttonStyle}>
        Save Blog
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "8px",
  border: "1px solid #ccc",
  minHeight: "80px",
};

const buttonStyle = {
  marginTop: "25px",
  padding: "14px 24px",
  borderRadius: "8px",
  border: "none",
  background: "#0072ff",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};

const backButtonStyle = {
  padding: "8px 16px",
  borderRadius: "20px",
  border: "1px solid #0072ff",
  background: "#fff",
  color: "#0072ff",
  fontWeight: 600,
  cursor: "pointer",
};
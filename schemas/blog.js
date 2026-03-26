export default {
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } },
    { name: "excerpt", title: "Excerpt", type: "text" },
    // Existing single video upload (kept for backward compatibility)
    { name: "video", title: "Video", type: "file", options: { accept: "video/*" }, readOnly: false, hidden: false },
    // New multiple videos field
    {
      name: "videos",
      title: "Additional Videos",
      type: "array",
      of: [{ type: "file", options: { accept: "video/*" } }],
      readOnly: false,
      hidden: false,
    },
    { name: "content", title: "Content", type: "text" },
    // Existing single thumbnail image (kept)
    { name: "thumbnail", title: "Thumbnail Image", type: "image", options: { hotspot: true }, readOnly: false, hidden: false },
    // New multiple images field
    {
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      readOnly: false,
      hidden: false,
    },
    { name: "category", title: "Category", type: "string" },
    { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] },
    { name: "authorName", title: "Author Name", type: "string" },
    { name: "authorBio", title: "Author Bio", type: "text" },
    { name: "publishDate", title: "Publish Date", type: "datetime" },
    { name: "metaTitle", title: "Meta Title", type: "string" },
    { name: "metaDescription", title: "Meta Description", type: "text" },
    { name: "focusKeyword", title: "Focus Keyword", type: "string" },
    { name: "canonicalUrl", title: "Canonical URL", type: "url" },
    { name: "featured", title: "Featured", type: "boolean" },
    { name: "published", title: "Published", type: "boolean" },
    { name: "allowComments", title: "Allow Comments", type: "boolean" }
  ]
};

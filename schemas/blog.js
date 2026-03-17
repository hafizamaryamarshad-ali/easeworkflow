export default {
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } },
    { name: "excerpt", title: "Excerpt", type: "text" },
    { name: "content", title: "Content", type: "text" },
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

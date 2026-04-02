export default {
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },

    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } },

    { name: "excerpt", title: "Excerpt", type: "text" },

    { name: "video", title: "Video", type: "file", options: { accept: "video/*" } },

    {
      name: "videos",
      title: "Additional Videos",
      type: "array",
      of: [{ type: "file", options: { accept: "video/*" } }],
    },

    // ✅ FIXED (rich text)
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                  {
                    name: "openInNewTab",
                    type: "boolean",
                    title: "Open in new tab",
                  },
                ],
              },
            ],
          },
        },
      ],
    },

    { name: "thumbnail", title: "Thumbnail Image", type: "image", options: { hotspot: true } },

    {
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
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

    { name: "allowComments", title: "Allow Comments", type: "boolean" },
  ],
};
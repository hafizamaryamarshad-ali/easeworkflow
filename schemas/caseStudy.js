export default {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  readOnly: false,
  fields: [
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } },
    { name: "title", title: "Title", type: "string" },
    { name: "summary", title: "Summary", type: "text" },
    { name: "metaTitle", title: "Meta Title", type: "string" },
    { name: "metaDescription", title: "Meta Description", type: "text" },

    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },

    { name: "featuredImage", title: "Featured Image", type: "image", options: { hotspot: true } },

    {
      name: "galleryImages",
      title: "Additional Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },

    {
      name: "videos",
      title: "Videos",
      type: "array",
      of: [{ type: "file", options: { accept: "video/*" } }],
    },

    { name: "client", title: "Client", type: "string" },
    { name: "industry", title: "Industry", type: "string" },

    { name: "problem", title: "Problem", type: "text" },
    { name: "solution", title: "Solution", type: "text" },

    {
      name: "explanation",
      title: "Explanation",
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
            ],
          },
        },
      ],
    },

    { name: "tools", title: "Tools", type: "array", of: [{ type: "string" }] },
    { name: "results", title: "Results", type: "array", of: [{ type: "string" }] },
  ],
};
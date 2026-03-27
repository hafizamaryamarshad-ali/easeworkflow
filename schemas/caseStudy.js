export default {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  readOnly: false,
  fields: [
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, readOnly: false, hidden: false },
    { name: "title", title: "Title", type: "string", readOnly: false, hidden: false },
    { name: "summary", title: "Summary", type: "text", readOnly: false, hidden: false },
    { name: "metaTitle", title: "Meta Title", type: "string", readOnly: false, hidden: false },
    { name: "metaDescription", title: "Meta Description", type: "text", readOnly: false, hidden: false },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      readOnly: false,
      hidden: false,
    },
    { name: "featuredImage", title: "Featured Image", type: "image", options: { hotspot: true }, readOnly: false, hidden: false },
    {
      name: "galleryImages",
      title: "Additional Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      readOnly: false,
      hidden: false,
    },
    {
      name: "videos",
      title: "Videos",
      type: "array",
      of: [{ type: "file", options: { accept: "video/*" } }],
      readOnly: false,
      hidden: false,
    },
    { name: "client", title: "Client", type: "string", readOnly: false, hidden: false },
    { name: "industry", title: "Industry", type: "string", readOnly: false, hidden: false },
    { name: "problem", title: "Problem", type: "text", readOnly: false, hidden: false },
    { name: "solution", title: "Solution", type: "text", readOnly: false, hidden: false },
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
      readOnly: false,
      hidden: false,
    },
    { name: "tools", title: "Tools", type: "array", of: [{ type: "string" }], readOnly: false, hidden: false },
    { name: "results", title: "Results", type: "array", of: [{ type: "string" }], readOnly: false, hidden: false }
  ]
};

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
    { name: "tools", title: "Tools", type: "array", of: [{ type: "string" }], readOnly: false, hidden: false },
    { name: "results", title: "Results", type: "array", of: [{ type: "string" }], readOnly: false, hidden: false }
  ]
};

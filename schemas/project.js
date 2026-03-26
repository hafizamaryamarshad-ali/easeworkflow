export default {
  name: "project",
  title: "Project",
  type: "document",
  readOnly: false,
  fields: [
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      readOnly: false,
      hidden: false,
    },
    { name: "title", title: "Title", type: "string", readOnly: false, hidden: false },
    { name: "shortDesc", title: "Short Description", type: "string", readOnly: false, hidden: false },
    { name: "longDesc", title: "Long Description", type: "text", readOnly: false, hidden: false },
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
    // Existing single video field (kept)
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
    // Existing single thumbnail (kept)
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
    { name: "clientName", title: "Client Name", type: "string", readOnly: false, hidden: false },
    { name: "industry", title: "Industry", type: "string", readOnly: false, hidden: false },
    { name: "results", title: "Results", type: "text", readOnly: false, hidden: false },
    { name: "technologies", title: "Technologies", type: "array", of: [{ type: "string" }], readOnly: false, hidden: false },
    { name: "updated", title: "Updated Date", type: "datetime", readOnly: false, hidden: false }
  ]
};
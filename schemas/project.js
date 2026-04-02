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
    },
    { name: "title", title: "Title", type: "string" },
    { name: "shortDesc", title: "Short Description", type: "string" },

    // ✅ FIXED (rich text)
    {
      name: "longDesc",
      title: "Long Description",
      type: "array",
      of: [{ type: "block" }],
    },

    { name: "metaTitle", title: "Meta Title", type: "string" },
    { name: "metaDescription", title: "Meta Description", type: "text" },

    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },

    { name: "video", title: "Video", type: "file", options: { accept: "video/*" } },

    {
      name: "videos",
      title: "Additional Videos",
      type: "array",
      of: [{ type: "file", options: { accept: "video/*" } }],
    },

    { name: "thumbnail", title: "Thumbnail Image", type: "image", options: { hotspot: true } },

    {
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },

    { name: "clientName", title: "Client Name", type: "string" },
    { name: "industry", title: "Industry", type: "string" },

    { name: "results", title: "Results", type: "text" },

    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
    },

    { name: "updated", title: "Updated Date", type: "datetime" },
  ],
};
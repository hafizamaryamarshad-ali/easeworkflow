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

    {
      name: "results",
      title: "Results",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
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

    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
    },

    { name: "updated", title: "Updated Date", type: "datetime" },
  ],
};
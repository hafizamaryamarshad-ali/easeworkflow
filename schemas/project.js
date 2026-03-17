export default {
  name: "project",
  title: "Project",
  type: "document",
  readOnly: false,
  fields: [
    { name: "title", title: "Title", type: "string", readOnly: false, hidden: false },
    { name: "shortDesc", title: "Short Description", type: "string", readOnly: false, hidden: false },
    { name: "longDesc", title: "Long Description", type: "text", readOnly: false, hidden: false },
    { name: "video", title: "Video ", type: "file", options: { accept: "video/*" }, readOnly: false, hidden: false },
    { name: "thumbnail", title: "Thumbnail Image", type: "image", options: { hotspot: true }, readOnly: false, hidden: false },
    { name: "clientName", title: "Client Name", type: "string", readOnly: false, hidden: false },
    { name: "industry", title: "Industry", type: "string", readOnly: false, hidden: false },
    { name: "technologies", title: "Technologies", type: "array", of: [{ type: "string" }], readOnly: false, hidden: false },
    { name: "updated", title: "Updated Date", type: "datetime", readOnly: false, hidden: false }
  ]
};
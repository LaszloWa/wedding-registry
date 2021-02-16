export default {
  title: "Website",
  type: "document",
  name: "website",
  fields: [
    {
      type: "string",
      name: "title",
      title: "Title",
    },
    {
      title: "Header image",
      type: "image",
      name: "headerImage",
      options: {
        hotspot: true,
      },
    },
  ],
}

export default {
  name: "hotel",
  title: "Hotel",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "url",
      title: "Website",
      type: "url",
    },
    {
      name: "price",
      title: "price",
      type: "string",
      options: {
        layout: "radio",
        list: ["$", "$$", "$$$"],
      },
    },
  ],
}

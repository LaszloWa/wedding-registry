export default {
  title: "Gift",
  name: "gift",
  type: "document",
  liveEdit: true,
  fields: [
    { title: "Hide on website", name: "isHidden", type: "boolean" },
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    {
      title: "Manufacturer",
      name: "manufacturer",
      type: "string",
    },
    {
      title: "Price category",
      type: "number",
      name: "priceCategory",
      options: {
        list: [
          { title: "$", value: 1 },
          { title: "$$", value: 2 },
          { title: "$$$", value: 3 },
        ],
      },
    },
    {
      title: "Links",
      type: "array",
      name: "links",
      of: [
        {
          type: "object",
          title: "Link",
          fields: [
            { type: "string", name: "label", title: "Label" },
            { type: "url", name: "href", title: "URL" },
            { type: "string", name: "country", title: "Country code" },
          ],
        },
      ],
    },
    {
      title: "Image",
      name: "image",
      type: "image",
      fields: [
        {
          name: "caption",
          title: "Caption",
          type: "string",
        },
      ],
      options: {
        hotspot: true,
      },
    },
    {
      title: "Reserved",
      name: "isReserved",
      type: "boolean",
    },
    {
      title: "Reserved by",
      name: "reservedBy",
      type: "reference",
      to: [{ type: "person" }],
    },
    {
      title: "Reserved at",
      name: "reservedAt",
      type: "datetime",
    },
  ],
  initialValue: {
    isReserved: false,
    isHidden: true,
  },
}

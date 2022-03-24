export default {
  name: "rsvp",
  title: "Guest RSVP",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "guest",
      title: "Accompanied by",
      type: "string",
    },
    {
      name: "dietaryRestrictions",
      title: "Dietary restrictions",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Lactose intolerant", value: "lactose-free" },
          { title: "Celiac disease", value: "gluten-free" },
          { title: "Vegan", value: "vegan" },
          { title: "Vegetarian", value: "vegetarian" },
          { title: "Nut allergy", value: "nut-allergy" },
          { title: "Other (please contact us)", value: "other" },
        ],
      },
    },
    {
      name: "notes",
      title: "Notes",
      type: "text",
    },
  ],
}

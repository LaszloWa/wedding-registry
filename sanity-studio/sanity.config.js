// sanity.config.js
import { createConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { schemaTypes } from "./schemas/schema"
import { structure } from "./structure"

export default createConfig({
  name: "viclas",
  title: "Victoria & Laszlo",
  projectId: "njixj14y",
  dataset: "production",
  plugins: [
    deskTool({
      structure,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})

import { studioTheme } from "@sanity/ui"

const headingFont = {
  ...studioTheme.fonts.heading,
  fontFamily: "Cormorant Garamond",
  family: "Cormorant Garamond, serif",
}

const textFont = {
  ...studioTheme.fonts.text,
  fontFamily: "Cormorant Garamond",
  family: "Cormorant Garamond, serif",
  weights: {
    regular: 100,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
}

export const weddingTheme = {
  ...studioTheme,
  fonts: {
    ...studioTheme.fonts,
    text: textFont,
    heading: headingFont,
  },
}

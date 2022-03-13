import { studioTheme, ThemeFont } from "@sanity/ui"

const headingFont: ThemeFont = {
  ...studioTheme.fonts.heading,
  fontFamily: "Cormorant Garamond",
  family: "Cormorant Garamond, serif",
}

const textFont: ThemeFont = {
  ...studioTheme.fonts.text,
  fontFamily: "Cormorant Garamond",
  family: "Cormorant Garamond, serif",
}

export const weddingTheme = {
  ...studioTheme,
  fonts: {
    ...studioTheme.fonts,
    text: textFont,
    heading: headingFont,
  },
}

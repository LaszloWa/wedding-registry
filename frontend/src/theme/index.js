import { studioTheme } from "@sanity/ui";

const headingFont = {
	...studioTheme.fonts.heading,
	fontFamily: "Cormorant Garamond",
	family: "Cormorant Garamond, serif",
};

const textFont = {
	...studioTheme.fonts.text,
	fontFamily: "Cormorant Garamond",
	family: "Cormorant Garamond, serif",
};

export const weddingTheme = {
	...studioTheme,
	fonts: {
		...studioTheme.fonts,
		text: textFont,
		heading: headingFont,
	},
};

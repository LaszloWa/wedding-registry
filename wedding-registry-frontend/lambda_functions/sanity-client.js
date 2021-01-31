require("dotenv").config();
const sanityClient = require("@sanity/client");

export const client = sanityClient({
	projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
	dataset: "production",
	token: process.env.REACT_APP_SANITY_TOKEN, // or leave blank to be anonymous user
	useCdn: true, // `false` if you want to ensure fresh data
});

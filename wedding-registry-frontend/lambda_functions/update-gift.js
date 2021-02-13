require("dotenv").config();
const sanityClient = require("@sanity/client");
const fetch = require("node-fetch");


const client = sanityClient({
	projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
	dataset: "production",
	token: process.env.REACT_APP_SANITY_TOKEN, // or leave blank to be anonymous user
	useCdn: false, // `false` if you want to ensure fresh data
});

exports.handler = async (event, handler, callback) => {
	const { name, id } = JSON.parse(event.body);
	console.log(`Updating gift ${name}!`);

	return client
		.patch(id) // Document ID to patch
		.set({ isPurchased: true }) // Shallow merge
		.commit() // Perform the patch and return a promise
		.then((response) => {
			return {
				statusCode: 200,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(`Gift ${response.name} successfully updated!`),
			};
		})
		.catch((err) => {
			return {
				statusCode: err.statusCode,
				body: JSON.stringify({ msg: err.message }),
			};
		});
};

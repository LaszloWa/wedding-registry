require("dotenv").config();
const fetch = require("node-fetch");
const sanityClient = require("@sanity/client");
const { URL } = process.env;

const client = sanityClient({
	projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
	dataset: "production",
	token: process.env.REACT_APP_SANITY_TOKEN, // or leave blank to be anonymous user
	useCdn: false, // `false` if you want to ensure fresh data
});

exports.handler = async (event, handler, callback) => {
	const { name, id } = JSON.parse(event.body);
	console.log(`Updating gift ${name}!`);

	const authenticate = await fetch(`${URL}/.netlify/functions/authenticate`);

	if (authenticate.status !== 200) {
		console.log("Unauthorized request!");
		return {
			statusCode: 401,
			body: JSON.stringify({ msg: "You are not authorized to change gifts!" }),
		};
	}

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

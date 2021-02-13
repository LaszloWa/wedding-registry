require("dotenv").config();
const sanityClient = require("@sanity/client");

const client = sanityClient({
	projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
	dataset: "production",
	token: process.env.REACT_APP_SANITY_TOKEN, // or leave blank to be anonymous user
	useCdn: false, // `false` if you want to ensure fresh data
});

exports.handler = async (event, handler, callback) => {

	const authenticate = await fetch(`${URL}/.netlify/functions/authenticate`, {
		method: "POST",
		headers: {
			...event.headers,
		},
	});

	if (authenticate.status !== 200) {
		console.log("Unauthorized request!");
		return {
			statusCode: 401,
			body: JSON.stringify({
				msg:
					"You are not authorized to change gifts! Please try logging in again.",
			}),
		};
	}

	const user = await authenticate.json();

	return client
		.patch(id) // Document ID to patch
		.ifRevisionId(revisionId)
		.set({ isReserved: true, reservedBy: user.username }) // Shallow merge
		.commit() // Perform the patch and return a promise
		.then((response) => {
			return {
				statusCode: 200,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(`Gift ${response.name} successfully reserved!`),
			};
		})
		.catch((err) => {
			if (err.statusCode === 409) {
				return {
					statusCode: 409,
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(
						`Your data seems to be outdated! Gift ${name} has already been reserved! Please refresh the page!`,
					),
				};
			}

			return {
				statusCode: err.statusCode,
				body: JSON.stringify({ msg: err.message }),
			};
		});
};

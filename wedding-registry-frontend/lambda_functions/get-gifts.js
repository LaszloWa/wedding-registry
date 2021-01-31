require("dotenv").config();
const sanityClient = require("@sanity/client");

const client = sanityClient({
	projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
	dataset: "production",
	token: process.env.REACT_APP_SANITY_TOKEN, // or leave blank to be anonymous user
	useCdn: false, // `false` if you want to ensure fresh data
});

const query = '*[_type == "gift"]';

exports.handler = (event, context, callback) => {
	console.log("Fetching all gifts!");

	return client
		.fetch(query)
		.then((res) => {
			return callback(null, {
				statusCode: 200,
				body: JSON.stringify(res),
			});
		})
		.catch((error) => {
			console.log("error", error);
			return callback(null, {
				statusCode: 400,
				body: JSON.stringify(error),
			});
		});
};

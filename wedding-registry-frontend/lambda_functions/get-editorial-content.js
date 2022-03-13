require("dotenv").config();
const sanityClient = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");

const client = sanityClient({
	projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
	dataset: "production",
	token: process.env.REACT_APP_SANITY_TOKEN,
	useCdn: false,
});

const builder = imageUrlBuilder(client);

const imageUrl = (source) => builder.image(source);

const query = '*[_type == "page" && !(_id in path("drafts.**"))]';

exports.handler = async (event, handler, callback) => {
	console.log("Fetching all editorial content!");

	return client
		.fetch(query)
		.then((res) =>
			res.map((page) => ({
				...page,
				image: {
					...page.image,
					src: imageUrl(page.image).height(800).url(),
				},
			})),
		)
		.then((pages) => {
			return callback(null, {
				statusCode: 200,
				body: JSON.stringify(pages),
			});
		})
		.catch((error) => {
			return callback(null, {
				statusCode: 400,
				body: JSON.stringify(error),
			});
		});
};
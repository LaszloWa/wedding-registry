require("dotenv").config();
const sanityClient = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");

const client = sanityClient({
	projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
	dataset: "production",
	token: process.env.REACT_APP_SANITY_TOKEN, // or leave blank to be anonymous user
	useCdn: false, // `false` if you want to ensure fresh data
});

const builder = imageUrlBuilder(client);

const imageUrl = (source) => builder.image(source);

const query = '*[_type == "gift"]';

exports.handler = async (callback) => {
	console.log("Fetching all gifts!");

	return client
		.fetch(query)
		.then((res) =>
			res.map((gift) => ({
				...gift,
				image: {
					...gift.image,
					src: imageUrl(gift.image).height(200).url(),
				},
			})),
		)
		.then((gifts) => {
			return callback(null, {
				statusCode: 200,
				body: JSON.stringify(gifts),
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

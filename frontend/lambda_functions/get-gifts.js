import "dotenv/config";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
	projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
	dataset: "production",
	token: process.env.REACT_APP_SANITY_TOKEN, // or leave blank to be anonymous user
	useCdn: false, // `false` if you want to ensure fresh data
});

const builder = imageUrlBuilder(client);

const imageUrl = (source) => builder.image(source);

const query = '*[_type == "gift" && !isHidden]';

exports.handler = async (event, handler, callback) => {
	console.log("Fetching all gifts!");

	return client
		.fetch(query)
		.then((res) =>
			res.map((gift) => ({
				...gift,
				image: {
					...gift.image,
					src: imageUrl(gift.image).height(800).url(),
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
			return callback(null, {
				statusCode: 400,
				body: JSON.stringify(error),
			});
		});
};

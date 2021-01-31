import { client } from "./sanity-client";

const query = '*[_type == "gift"]';

exports.handler = (event, context, callback) => {
	console.log("Fetching all gifts!");

	return client
		.fetch(query)
		.then((res) => {
			console.log(res);
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

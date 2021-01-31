import { client } from "./sanity-client";

const query = '*[_type == "gift"]';

export const getGifts = async () =>
	await client.fetch(query).then((gifts) => {
		return gifts;
	});

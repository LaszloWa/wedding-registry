export default {
	title: "Gift",
	name: "gift",
	type: "document",
	fields: [
		{
			title: "Name",
			name: "name",
			type: "string",
		},
		{
			title: "Manufacturer",
			name: "manufacturer",
			type: "string",
		},
		{
			title: "Link",
			name: "link",
			type: "string",
		},
		{
			title: "Image",
			name: "image",
			type: "image",
			fields: [
				{
					name: "caption",
					title: "Caption",
					type: "string",
				},
			],
		},
		{
			title: "Purchased",
			name: "isPurchased",
			type: "boolean",
		},
	],
	initialValue: {
		isPurchased: false,
	},
};

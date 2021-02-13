export default {
	title: "Gift",
	name: "gift",
	type: "document",
	liveEdit: true,
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
			title: "Price category",
			type: "number",
			name: "priceCategory",
			options: {
				list: [
					{ title: "$", value: 1 },
					{ title: "$$", value: 2 },
					{ title: "$$$", value: 3 },
				],
			},
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
			title: "Reserved",
			name: "isReserved",
			type: "boolean",
		},
		{
			title: "Reserved by",
			name: "reservedBy",
			type: "string",
		},
	],
	initialValue: {
		isPurchased: false,
	},
};

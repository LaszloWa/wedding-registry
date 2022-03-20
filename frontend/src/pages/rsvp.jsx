import React, { useState } from "react";
import { Box, Button, Checkbox, TextInput } from "@sanity/ui";
import sendRequest from "../api-helper";

export const Rsvp = () => {
	const [message, setMessage] = useState(undefined);

	const handleFormSubmission = (event) => {
		event.preventDefault();

		const theElements = event.target.elements;
		console.log("the event", theElements);

		const dietaryRestrictions = Array.from(theElements["dietaryRestrictions[]"])
			.map((item) => {
				if (item.checked) {
					return item.value;
				}
			})
			.filter((item) => item);

		const body = {
			name: theElements["name"].value,
			guest: theElements["guest"].value,
			dietaryRestrictions,
		};

		sendRequest(
			"rsvp",
			body,
			setMessage("Awesome, looking forward to celebrating with you!"),
			setMessage(
				"Something went wrong, please try again or contact us directly.",
			),
		);
	};

	return (
		<div>
			<Box>RSVP content</Box>
			{message && <div>{message}</div>}
			<form onSubmit={handleFormSubmission}>
				<TextInput label="Your name" id="name" required />
				<TextInput label="Your +1" id="guest" />
				<Checkbox
					label="Lactose intolerant"
					name="dietaryRestrictions[]"
					value="lactose-free"
					id="lactose-free"
				/>
				<Checkbox
					label="Celiac disease"
					name="dietaryRestrictions[]"
					value="gluten-free"
					id="gluten-free"
				/>
				<Checkbox
					label="Vegan"
					name="dietaryRestrictions[]"
					value="vegan"
					id="vegan"
				/>
				<Checkbox
					label="Nut allergy"
					name="dietaryRestrictions[]"
					value="nut-allergy"
					id="nut-allergy"
				/>
				<Checkbox
					label="Other (please contact us)"
					name="dietaryRestrictions[]"
					value="other"
					id="other"
				/>
				<Button type="submit">Submit</Button>
			</form>
		</div>
	);
};

async function sendRequest(endpoint, body, callback) {
	const response = await fetch(`/.netlify/functions/${endpoint}`, {
		method: "POST",
		headers: {
			["Content-Type"]: "application/json",
		},
		body: body ? JSON.stringify(body) : undefined,
	});

	if (!response.ok && callback.push) {
		const statusCode = response.status;
		switch (statusCode) {
			case 401:
			case 409:
				return callback.push({
					title: "Invalid password",
					description: "Please double check the password you entered.",
					status: "error",
				});
			default:
				return callback.push({
					title: "Oops! Something went wrong!",
					description: "Please try again or reload the page.",
					status: "error",
				});
		}
	}

	if (response.ok) {
		switch (endpoint) {
			case "update-gift":
				return callback.push({
					title: "Gift successfully reserved!",
					status: "success",
				});
			case "rsvp":
				return callback.push({
					title: "We look forward to seeing you!",
					status: "success",
				});
			case "logout":
				return;
			case "login":
				return callback({});
			case "authenticate":
				return callback({});
		}
	}
}

export default sendRequest;

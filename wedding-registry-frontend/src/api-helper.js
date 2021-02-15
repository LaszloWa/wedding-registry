async function sendRequest(endpoint, body, successCallback, errorCallback) {
	const requestOptions = {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
	};

	if (body) {
		requestOptions.headers["Content-Type"] = "application/json";
		requestOptions.body = JSON.stringify(body);
	}

	const response = await fetch(
		`/.netlify/functions/${endpoint}`,
		requestOptions,
	);

	if (!response.ok && errorCallback) {
		const statusCode = response.status;
		switch (statusCode) {
			case 401:
			case 409:
				return errorCallback({
					title: "Invalid password",
					description: "Please double check the password you entered.",
					status: "error",
				});
			default:
				return errorCallback({
					title: "Oops! Something went wrong!",
					description: "Please try again or reload the page.",
					status: "error",
				});
		}
	}

	if (response.ok && successCallback) {
		return successCallback({
			title: "Welcome!",
			status: "success",
		});
	}
}

export default sendRequest;

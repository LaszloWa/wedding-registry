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

	if (response.ok && successCallback) {
		const responseBody = await response.json();
		successCallback(responseBody);
	}

	if (!response.ok && errorCallback) {
		const statusCode = response.status;
		const responseBody = await response.json();
		switch (statusCode) {
			case 401:
			case 409:
				return errorCallback(responseBody);
			default:
				return errorCallback(
					"An unexpected error occurred. Please reload the page and try again!",
				);
		}
	}
}

export default sendRequest;

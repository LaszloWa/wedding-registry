async function sendRequest(endpoint, body, successCallback) {
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
}

export default sendRequest;

require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const sanityClient = require("@sanity/client");

const client = sanityClient({
	projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
	dataset: "production",
	token: process.env.REACT_APP_SANITY_TOKEN, // or leave blank to be anonymous user
	useCdn: false, // `false` if you want to ensure fresh data
});

const createJwtCookie = (username) => {
	const secretKey =
		"-----BEGIN RSA PRIVATE KEY-----\n" +
		process.env.JWT_SECRET_KEY +
		"\n-----END RSA PRIVATE KEY-----";

	const token = jwt.sign({ username }, secretKey, {
		algorithm: "RS256",
		expiresIn: "7 days",
	});

	const jwtCookie = cookie.serialize("jwt", token, {
		secure: process.env.NETLIFY_DEV !== "true",
		httpOnly: true,
		path: "/",
	});

	return jwtCookie;
};

exports.handler = async (event) => {
	let errorStatusCode = 500;
	const appPassword = process.env.APP_PASSWORD;

	const { username, password } = JSON.parse(event.body);

	try {
		const matches = appPassword.toLowerCase() === password.toLowerCase();

		if (!matches) {
			errorStatusCode = 401;
			throw new Error(`Invalid password`);
		}

		const personDocument = {
			_id: `person_${username.split(" ").join("-").toLowerCase()}`,
			_type: "person",
			name: username,
		};

		await client
			.createIfNotExists(personDocument)
			.then((res) => {
				console.log("Welcome 🎉");
			})
			.catch((result) => {
				console.log("something went wrong", result);
			});

		// 5. Create a JWT and serialize as a secure http-only cookie
		const jwtCookie = createJwtCookie(username);

		// 6. Return the user id and a Set-Cookie header with the JWT cookie
		return {
			statusCode: 200,
			headers: {
				"Set-Cookie": jwtCookie,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: username }),
		};
	} catch (err) {
		return {
			statusCode: errorStatusCode,
			body: JSON.stringify(err.message),
		};
	}
};

require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const createJwtCookie = async (username) => {
	const secretKey =
		"-----BEGIN RSA PRIVATE KEY-----\n" +
		process.env.JWT_SECRET_KEY +
		"\n-----END RSA PRIVATE KEY-----";

	const token = jwt.sign({ username }, secretKey, {
		algorithm: "RS256",
		expiresIn: "100 days",
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
		const matches = appPassword === password;

		if (!matches) {
			errorStatusCode = 401;
			throw new Error(`Invalid password`);
		}

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
			body: JSON.stringify({ msg: err.message }),
		};
	}
};

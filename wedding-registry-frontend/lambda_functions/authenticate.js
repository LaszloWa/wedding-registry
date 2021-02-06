const cookie = require("cookie");
const jwt = require("jsonwebtoken");

const publicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAzzyleFzgQJhO3Q2LEv2U
v0VneIecCs+ggZq+UrG4c1KqhNUlaE7J0fiexBfbEonkKgj54bF8og71QrjbPkzW
1lUsamDY0D4d0fgOQJMjepBWKbicZyuqYHcfX4wXq0hR29gqCtqWoYMtLE9qLQ1G
G1tPswZYZ0DVVj0j8rNXzKlm/ID3Ip24Np17IA28pFWpUQHlKR1g9xDVokT697wc
50zpyMiiCMtYsJQ0jcawb2QA+w4Atcno9XirEgV8ZvAPnhWLswDgaMZGuYuFOR7j
He9jwexRZL2grxAL6FVwrt/kg6R/SvNCKxLQfy0dJHT1Twv/82ewgn8UaDSmYlXk
+JFbY2FOmBxLa/ppSgFugJReSVUgv3U4yGRMM0BHm+d5CusttDEM6C/kboWtOe0v
8TZFaINhuPy5PpkNK3QEJtGKhAv86F4JXZLDZOU82q3y4tI+ljFolqnvRCwigDSj
PfZh8xOHG11kG323V+206GmvaQUBxL7dCrMvh3JNDjacGCl8/sv7grdG6kKMl/iA
Sjw+hQop7FiiNnGrnZe0pnii8n34ZBPz35dK+USRa4tPX7qKIpNUN0s8jP7xLP2B
rMbu85U1AAG5hPO3ufAWep3Ys9SzAMEoXKEl5wDF4APUpkUazXg3B5ti43TYrCLN
1M9j/NEu1n0C/6b2ohg3wzUCAwEAAQ==
-----END PUBLIC KEY-----`;

exports.handler = (event) => {
	const cookies = event.headers.cookie && cookie.parse(event.headers.cookie);

	if (!cookies || !cookies.jwt) {
		return {
			statusCode: 401,
			body: JSON.stringify({
				msg: "There is no jwt cookie, so the request is unauthorized",
			}),
		};
	}

	try {
		// verify throws an error if it can't verify the jwt.
		// By default it also checks the exp claim, which is
		// where our expiry information is.
		// If the token is successfully verified,
		// it returns the payload.
		const payload = jwt.verify(cookies.jwt, publicKey);
		return {
			statusCode: 200,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: payload.username }),
		};
	} catch (err) {
		return {
			statusCode: 401,
			body: JSON.stringify({ msg: err.message }),
		};
	}
};

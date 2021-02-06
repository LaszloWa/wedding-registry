import React from "react";
import { useAuth } from "../../providers/auth-provider";

const LogInPage = () => {
	const { login } = useAuth();

	const handleLogin = (event) => {
		event.preventDefault();

		const requestBody = {
			username: event.target.username.value,
			password: event.target.password.value,
		};

		login(requestBody);
	};

	return (
		<div className="gift-list-page">
			<h1>Please log in</h1>
			<form onSubmit={handleLogin}>
				<div className="username">
					<label htmlFor="username">Username</label>
					<input type="text" id="username" required={true} />
				</div>
				<div className="password">
					<label htmlFor="password">Password</label>
					<input type="password" id="password" required={true} />
				</div>
				<button className="submit-form">Submit</button>
			</form>
		</div>
	);
};

export default LogInPage;
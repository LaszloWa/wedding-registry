import React from "react";

const LogInPage = () => {
	const handleLogin = (event) => {
		event.preventDefault();

		const username = event.target.username.value;
		const password = event.target.password.value;

		console.log("submitting: ", username, password);
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

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

function AuthProvider({ children }) {
	const [user, setUser] = useState(undefined);

	const saveUser = (user) => {
		setUser(user);
	};

	const deleteUser = () => {
		setUser(null);
	};

	const login = (user) => sendRequest("login", user, saveUser);
	const logout = () => sendRequest("logout", undefined, deleteUser);

	const authenticate = () => sendRequest("authenticate", undefined, saveUser);

	return (
		<AuthContext.Provider value={{ user, authenticate, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

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

	if (response.ok) {
		const responseBody = await response.json();
		successCallback(responseBody);
	}
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

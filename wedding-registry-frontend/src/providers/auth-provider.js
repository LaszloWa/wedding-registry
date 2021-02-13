import React, { createContext, useContext, useState } from "react";
import sendRequest from "../api-helper";

const AuthContext = createContext({});

function AuthProvider({ children }) {
	const [user, setUser] = useState(undefined);

	const saveUser = (user) => {
		setUser(user);
	};

	const deleteUser = () => {
		setUser(null);
	};

	const login = (user, errorCallback) =>
		sendRequest("login", user, saveUser, errorCallback);
	const logout = () => sendRequest("logout", undefined, deleteUser);

	const authenticate = () => sendRequest("authenticate", undefined, saveUser);

	return (
		<AuthContext.Provider value={{ user, authenticate, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

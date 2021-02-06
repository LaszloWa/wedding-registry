import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth } from "providers/auth-provider";

import GiftListPage from "pages/gift-list-page/gift-list-page";
import LogInPage from "pages/log-in-page/log-in-page";

import "./App.scss";

const App = () => {
	const { user, authenticate } = useAuth();

	useEffect(() => {
		authenticate();
	}, []);

	return user ? (
		<Router>
			<Switch>
				<Route path="/">
					<GiftListPage />
				</Route>
			</Switch>
		</Router>
	) : (
		<Router>
			<Switch>
				<Route page="/">
					<LogInPage />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
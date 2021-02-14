import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth } from "./providers/auth-provider";

import GiftListPage from "./pages/gift-list-page/gift-list-page";
import LogInPage from "./pages/log-in-page/log-in-page";
import Header from "./components/header/header";

const App = () => {
	const { user, authenticate } = useAuth();

	useEffect(() => {
		authenticate();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return user ? (
		<div className="main">
			<Header />
			<Router>
				<Switch>
					<Route path="/">
						<GiftListPage />
					</Route>
				</Switch>
			</Router>
		</div>
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

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GiftListPage from "pages/gift-list-page/gift-list-page";
import LogInPage from "pages/log-in-page/log-in-page";

import "./App.scss";

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/gift-ideas">
					<GiftListPage />
				</Route>
				<Route page="/">
					<LogInPage />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;

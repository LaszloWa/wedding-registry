import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useAuth } from "./providers/auth-provider";
import { LoginPage, Home, Details, Travel, Registry, Rsvp } from "./pages";
import { DefaultLayout } from "./layout";
import { useContent } from "./providers/content-provider";

const App = () => {
	const { user, authenticate } = useAuth();
	const { getContent } = useContent();

	useEffect(() => {
		authenticate();
		getContent();
	}, []);

	if (!user) {
		return (
			<DefaultLayout user={user}>
				<LoginPage />
			</DefaultLayout>
		);
	}

	return (
		<Router>
			<DefaultLayout user={user || {}}>
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/details" element={<Details />} />
					<Route path="/travel" element={<Travel />} />
					<Route path="/registry" element={<Registry />} />
					<Route path="/rsvp" element={<Rsvp />} />
				</Routes>
			</DefaultLayout>
		</Router>
	);
};

export default App;

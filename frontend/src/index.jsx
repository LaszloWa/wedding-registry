import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./providers/auth-provider";
import { ContentProvider } from "./providers/content-provider";

ReactDOM.render(
	<React.StrictMode>
		<ContentProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</ContentProvider>
	</React.StrictMode>,
	document.getElementById("root"),
);

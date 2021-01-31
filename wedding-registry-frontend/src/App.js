import React, { useEffect, useState } from "react";
import "./App.scss";
// import { getGifts } from "../lambda_functions/get-gifts.js.js";

const App = () => {
	const [gifts] = useState([]);

	useEffect(() => {
		fetch("/.netlify/lambda_functions/get-gifts").then((res) =>
			console.log(res),
		);
	}, []);

	return (
		<div className="app">
			<h1>Stay tuned for something amazing!</h1>
			<ul className="app__gifts">
				{gifts.map(({ name, link }) => (
					<a href={link}>{name}</a>
				))}
			</ul>
		</div>
	);
};

export default App;

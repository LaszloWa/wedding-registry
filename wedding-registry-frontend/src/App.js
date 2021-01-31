import React, { useEffect, useState } from "react";
import "./App.scss";
// import { getGifts } from "../lambda_functions/get-gifts.js.js";

const App = () => {
	const [gifts, setGifts] = useState([]);

	useEffect(() => {
		fetch("/.netlify/functions/get-gifts")
			.then((res) => res.json())
			.then((data) => setGifts(data));
	}, []);

	console.log(gifts);

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

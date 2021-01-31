import React, { useEffect, useState } from "react";
import "./App.scss";

const App = () => {
	const [gifts, setGifts] = useState([]);

	useEffect(() => {
		fetch("/.netlify/functions/get-gifts")
			.then((res) => res.json())
			.then((data) => setGifts(data));
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

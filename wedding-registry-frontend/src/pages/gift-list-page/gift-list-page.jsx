import React, { useEffect, useState } from "react";

const GiftListPage = () => {
	const [gifts, setGifts] = useState([]);

	useEffect(() => {
		fetch("/.netlify/functions/get-gifts")
			.then((res) => res.json())
			.then((data) => setGifts(data));
	}, []);

	return (
		<div className="gift-list-page">
			<h1>Stay tuned for something amazing!</h1>
			<ul className="gift-list-page__gifts">
				{gifts.map(({ name, link, image }) => (
					<li key={image.src}>
						<img src={image.src} alt={name} />
						<a href={link}>{name}</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default GiftListPage;

import React, { useEffect, useState } from "react";
import sendRequest from "../../api-helper";

const GiftListPage = () => {
	const [gifts, setGifts] = useState([]);

	useEffect(() => {
		fetch("/.netlify/functions/get-gifts")
			.then((res) => res.json())
			.then((data) => setGifts(data));
	}, []);

	const handleReserveGift = (e) => {
		const requestBody = {
			name: e.target.name,
			id: e.target.value,
		};
		sendRequest("update-gift", requestBody);
	};

	return (
		<div className="gift-list-page">
			<h1>Stay tuned for something amazing!</h1>
			<ul className="gift-list-page__gifts">
				{gifts.map(({ _id, name, link, image }) => (
					<li key={_id}>
						<img src={image.src} alt={name} />
						<a href={link}>{name}</a>
						<div className="gift-list-page__is-bought">
							<label htmlFor="remove-gift">Buy this gift</label>
							<input
								id="remove-gift"
								type="checkbox"
								value={_id}
								name={name}
								onClick={handleReserveGift}
							/>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default GiftListPage;

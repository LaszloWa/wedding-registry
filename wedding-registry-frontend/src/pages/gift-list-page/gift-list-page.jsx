import React, { useEffect, useState } from "react";
import sendRequest from "../../api-helper";
import { useAuth } from "../../providers/auth-provider";

const GiftListPage = () => {
	const { user } = useAuth();
	const [gifts, setGifts] = useState([]);
	const [successMessage, setSuccessMessage] = useState(undefined);
	const [errorMessage, setErrorMessage] = useState(undefined);

	useEffect(() => {
		fetch("/.netlify/functions/get-gifts")
			.then((res) => res.json())
			.then((data) => setGifts(data));
	}, []);

	const handleReserveGift = (e) => {
		setSuccessMessage(undefined);
		setErrorMessage(undefined);

		const requestBody = {
			name: e.target.name,
			id: e.target.value,
			revisionId: e.target.getAttribute("data-revision-id"),
		};

		sendRequest("update-gift", requestBody, setSuccessMessage, setErrorMessage);
	};

	console.log(user);

	const welcomeMessage = user
		? user.username === ("Yannek" || "Piwi")
			? "Hallo kleiner Piwi!"
			: `Welcome ${user.username}! We are looking forward to having you at our wedding and hope you enjoy the site!`
		: "Welcome to our wedding registry!";

	return (
		<div className="gift-list-page">
			<h2>{welcomeMessage}</h2>
			{successMessage && <p className="success-message">{successMessage}</p>}
			{errorMessage && <p className="error-message">{errorMessage}</p>}
			<ul className="gift-list-page__gifts">
				{gifts.map(({ _id, image, link, name, _rev }) => (
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
								data-revision-id={_rev}
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

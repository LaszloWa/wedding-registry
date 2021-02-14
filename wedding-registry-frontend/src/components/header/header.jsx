import React from "react";
import { useAuth } from "../../providers/auth-provider";

import "./header.scss";

const Header = () => {
	const { logout } = useAuth();

	return (
		<div className="header">
			<h1 className="title">Victoria & Laszlo's Wedding Registry</h1>
			<div className="header__logout">
				<button
					type="button"
					className="header__logout-button"
					onClick={logout}
				>
					Log out
				</button>
			</div>
		</div>
	);
};

export default Header;

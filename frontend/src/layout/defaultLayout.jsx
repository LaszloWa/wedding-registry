import React from "react";
import {
	Stack,
	Flex,
	Text,
	ThemeProvider,
	Card,
	Container,
	ToastProvider,
	Button,
} from "@sanity/ui";
import { weddingTheme } from "../theme";
import { Navigation } from "./navigation";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { LeaveIcon } from "@sanity/icons";
import { useAuth } from "../providers/auth-provider";

const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
}

*,
*::before,
*::after {
    box-sizing: inherit;
}
`;

const BackgroundImage = styled.img`
	position: absolute;
	bottom: -20px;
	width: calc(100% - 2px);
	object-fit: cover;
	min-height: 200px;
`;

export const DefaultLayout = ({ user, children }) => {
	const { logout } = useAuth();

	return (
		<>
			<GlobalStyle />
			<BackgroundImage src="/background.png" />
			<ThemeProvider theme={weddingTheme}>
				<ToastProvider>
					<Card
						paddingBottom={4}
						style={{ minHeight: "100vh", width: "100%" }}
						height="fill"
					>
						<Container height="fill">
							<Stack space={4} padding={2}>
								{user && (
									<Flex justify="center">
										<Navigation user={user} />
									</Flex>
								)}
								<Flex justify="center" height="fill">
									{children}
								</Flex>
								<Stack space={3}>
									{user && (
										<Flex justify="center">
											<Button
												mode="bleed"
												text="Log out"
												icon={LeaveIcon}
												onClick={logout}
											/>
										</Flex>
									)}
									<Text muted size={2} style={{ textAlign: "center" }}>
										Having issues? Please reach out to us :)
									</Text>
								</Stack>
							</Stack>
						</Container>
					</Card>
				</ToastProvider>
			</ThemeProvider>
		</>
	);
};

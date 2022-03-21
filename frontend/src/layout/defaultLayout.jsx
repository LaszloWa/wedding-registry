import React from "react"
import {
  Stack,
  Flex,
  Text,
  ThemeProvider,
  Card,
  Container,
  ToastProvider,
  Button,
} from "@sanity/ui"
import { weddingTheme } from "../theme"
import { Navigation } from "./navigation"
import { BrowserRouter as Router, Routes } from "react-router-dom"
import styled, { createGlobalStyle } from "styled-components"
import { LeaveIcon } from "@sanity/icons"
import { useAuth } from "../providers/auth-provider"

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
body, html {
	height: 100%;
}

#root {
	text-align: center;
}

a {
	--card-link-color: #506e3a;
	font-weight: 400;
}

`

const BackgroundImage = styled.img`
  position: fixed;
  bottom: -20px;
  width: 100%;
  object-fit: cover;
  min-height: 150px;
  left: 0;
  z-index: 1;
`

const Navbar = styled(Flex)`
  text-align: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 100;
`

export const DefaultLayout = ({ user, children }) => {
  const { logout } = useAuth()

  return (
    <ThemeProvider theme={weddingTheme}>
      <ToastProvider>
        <GlobalStyle />
        {user && (
          <Navbar justify="center" paddingTop={3}>
            <Navigation user={user} />
          </Navbar>
        )}
        <Card
          paddingX={[3, 3, 4]}
          height="stretch"
          style={{ overflowY: "auto", paddingBottom: "150px" }}
        >
          <Container height="fill">
            <Flex justify="center" height="fill">
              <Stack space={[2, 2, 4]} flex={1}>
                {children}
              </Stack>
            </Flex>
          </Container>
          <div>
            <BackgroundImage src="/background.png" />
            {/* {user && (
              <Flex
                justify="center"
                // marginBottom={[2, 2, 4]}
                style={{ zIndex: 2 }}
              >
                <Button text="Log out" icon={LeaveIcon} onClick={logout} />
              </Flex>
            )} */}
          </div>
        </Card>
      </ToastProvider>
    </ThemeProvider>
  )
}

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
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { createGlobalStyle } from "styled-components"
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

`

export const DefaultLayout = ({ user, children }) => {
  const { logout } = useAuth()

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={weddingTheme}>
        <ToastProvider>
          <Router>
            <Switch>
              <Card
                paddingBottom={4}
                style={{ minHeight: "100vh", width: "100%" }}
              >
                <Container>
                  <Stack space={5}>
                    <Navigation user={user} />
                    {children}
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
                      <Text muted size={1} style={{ textAlign: "center" }}>
                        Questions or problems? Get in touch with us!
                      </Text>
                    </Stack>
                  </Stack>
                </Container>
              </Card>
            </Switch>
          </Router>
        </ToastProvider>
      </ThemeProvider>
    </>
  )
}

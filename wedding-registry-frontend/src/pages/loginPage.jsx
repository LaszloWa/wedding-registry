import {
  Button,
  Box,
  Card,
  Container,
  Stack,
  Text,
  TextInput,
  Tooltip,
  useToast,
} from "@sanity/ui"
import React, { useState } from "react"
import { useAuth } from "../providers/auth-provider"
import { EyeOpenIcon, EyeClosedIcon, RocketIcon } from "@sanity/icons"

export const LoginPage = () => {
  const { login } = useAuth()
  const [visiblePassword, setVisiblePassword] = useState(false)

  const toast = useToast()

  const sendResponseToast = (response) => {
    toast.push(response)
  }

  const handleLogin = (event) => {
    const username = event.target.username.value
    const password = event.target.password.value

    event.preventDefault()

    const requestBody = {
      username,
      password,
    }

    login(requestBody, sendResponseToast)
  }

  return (
    <Container style={{ maxWidth: "400px" }}>
      <Card height="fill">
        <Stack space={5}>
          <Stack space={5} as="form" onSubmit={handleLogin}>
            <Stack space={3}>
              <Text weight="semibold" as="label" htmlFor="username">
                Your name
              </Text>
              <TextInput padding={3} id="username" />
            </Stack>
            <Stack space={3}>
              <Text weight="semibold" htmlFor="password">
                Entry code
              </Text>
              <Text size={1} muted>
                Hint: where will the ceremony take place?
              </Text>
              <TextInput
                id="password"
                padding={3}
                type={visiblePassword ? undefined : "password"}
                suffix={
                  <Tooltip
                    content={
                      <Box padding={3}>
                        <Text muted size={1}>
                          Toggle password visibility
                        </Text>
                      </Box>
                    }
                  >
                    <Box padding={1}>
                      <Button
                        padding={2}
                        mode="bleed"
                        icon={visiblePassword ? EyeOpenIcon : EyeClosedIcon}
                        onClick={() => setVisiblePassword(!visiblePassword)}
                      />
                    </Box>
                  </Tooltip>
                }
              />
            </Stack>
            <Button
              type="submit"
              text="Log in"
              tone="primary"
              icon={RocketIcon}
            />
          </Stack>
        </Stack>
      </Card>
    </Container>
  )
}

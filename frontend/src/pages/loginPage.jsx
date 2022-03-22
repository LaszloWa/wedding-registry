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
  Heading,
} from "@sanity/ui"
import React, { useState } from "react"
import { useAuth } from "../providers/auth-provider"
import { EyeOpenIcon, EyeClosedIcon } from "@sanity/icons"
import styled from "styled-components"
import { AccentImage } from "../components"

const StyledButton = styled(Button)`
  width: 100%;
  pointer-events: auto;
  --card-bg-color: #719269;
  @media (hover: hover) {
    &:not([data-disabled="true"]):hover {
      --card-bg-color: #506e3a;
    }
  }
`

export const LoginPage = () => {
  const { login } = useAuth()
  const [visiblePassword, setVisiblePassword] = useState(false)

  const toast = useToast()

  const handleLogin = (event) => {
    const username = event.target.username.value
    const password = event.target.password.value

    event.preventDefault()

    const requestBody = {
      username,
      password,
    }

    login(requestBody, toast)
  }

  return (
    <Stack space={[2, 2, 4]} style={{ maxWidth: 550, margin: "auto" }}>
      <AccentImage src="/login.png" width={100} />
      <Stack space={4}>
        <Heading as="h1" size={[1, 1, 2]}>
          Dear friends & family,
        </Heading>
        <Text as="p" size={[2, 2, 3]}>
          You are hereby invited to our wedding. Please enter your name and the
          password we have given you to see your wedding invitation.
        </Text>
      </Stack>
      <Stack
        space={4}
        as="form"
        onSubmit={handleLogin}
        style={{ maxWidth: 550, textAlign: "left" }}
      >
        <Stack space={3}>
          <Text size={[2, 2, 3]} as="label" htmlFor="username">
            Name
          </Text>
          <TextInput padding={3} fontSize={[2, 2, 3]} id="username" />
        </Stack>
        <Stack space={3}>
          <Text size={[2, 2, 3]} htmlFor="password">
            Password
          </Text>
          <TextInput
            id="password"
            padding={3}
            fontSize={[2, 2, 3]}
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
        <StyledButton type="submit" text="Enter" />
      </Stack>
      <Stack space={4} paddingTop={4}>
        <Text size={[1, 1, 2]} muted>
          Made with ♥ by Laszlo & Victoria
        </Text>
        <Text size={[1, 1, 2]} muted>
          If you are having issues logging in, please reach out to us!
        </Text>
      </Stack>
    </Stack>
  )
}

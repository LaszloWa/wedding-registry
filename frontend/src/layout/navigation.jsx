import React from "react"
import { Box, Stack, Flex, Text } from "@sanity/ui"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

const routes = [
  { title: "Home", path: "/" },
  { title: "Details", path: "/details" },
  { title: "Travel & Accommodation", path: "/travel" },
  { title: "Registry", path: "/registry" },
  { title: "RSVP", path: "/rsvp" },
]

const Link = styled(NavLink)`
  font-size: 18px;
  text-decoration: none;
  text-transform: capitalize;
  color: inherit;

  &.active [data-ui="Text"] {
    border-bottom: 1px solid #719269;
  }
`

export const Navigation = () => {
  return (
    <Stack space={[2, 2, 4]}>
      <Flex justify="center" wrap="wrap">
        {routes.map((route) => (
          <Box key={route.path} paddingX={[2, 2, 4]} paddingY={[3, 3, 4]}>
            <Link to={route.path}>
              <Text size={2}>{route.title}</Text>
            </Link>
          </Box>
        ))}
      </Flex>
    </Stack>
  )
}

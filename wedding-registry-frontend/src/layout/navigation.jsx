import React from "react"
import { Text, Stack, Flex } from "@sanity/ui"
// import { Link } from "react-router-dom"
// import styled from "styled-components"

// const routes = [
//   { title: "Home", path: "/" },
//   { title: "Gifts", path: "/gifts" },
// ]

// const NavLink = styled(Link)`
//   text-decoration: none;
//   text-transform: uppercase;
// `

export const Navigation = () => {
  return (
    <Stack paddingTop={5} space={4} style={{ textAlign: "center" }}>
      <Flex justify="center">
        <Stack space={3}>
          <Text weight="regular" as="h1" size={3}>
            Wedding registry
          </Text>
          <Text muted size={1}>
            Created with ❤ by Victoria & Laszlo
          </Text>
        </Stack>
      </Flex>
      {/* <Flex justify="center">
        {routes.map((route) => (
          <Box key={route.path} paddingX={3}>
            <NavLink to={route.path}>{route.title}</NavLink>
          </Box>
        ))}
      </Flex> */}
    </Stack>
  )
}

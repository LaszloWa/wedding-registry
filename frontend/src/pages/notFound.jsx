import React from "react"
import { Heading, Text } from "@sanity/ui"
import { AccentImage } from "../components"
import { NavLink } from "react-router-dom"

export const NotFound = () => {
  return (
    <>
      <AccentImage src="/login.png" width={100} />
      <Heading size={[1, 1, 2]}>Oops, page not found!</Heading>
      <Text size={[2, 2, 3]}>
        Looks like you tried to access a page that does not exist.
      </Text>
    </>
  )
}

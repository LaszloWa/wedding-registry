import { Flex, Box } from "@sanity/ui"
import React from "react"
import styled from "styled-components"

const Image = styled.img`
  width: 4.5em;
`

export const AccentImage = ({ src }) => {
  return (
    <Flex justify="center">
      <Box padding={[2, 2, 3]}>
        <Image src={src} />
      </Box>
    </Flex>
  )
}

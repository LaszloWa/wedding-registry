import { Flex, Box } from "@sanity/ui"
import React from "react"
import styled from "styled-components"

export const AccentImage = ({ src, width = "4.5em" }) => {
  return (
    <Flex justify="center" style={{ minHeight: 120 }}>
      <Box padding={[2, 2, 3]}>
        <img src={src} style={{ width: width }} />
      </Box>
    </Flex>
  )
}

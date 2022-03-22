import React from "react"
import { PortableText } from "@portabletext/react"
import { Stack, Text, Heading, Box } from "@sanity/ui"

const components = {
  block: {
    normal: ({ children }) => (
      <Text as="p" size={[2, 2, 3]}>
        {children}
      </Text>
    ),
    h2: ({ children }) => (
      <Box marginTop={[2, 2, 4]}>
        <Heading as="h2" size={[1, 1, 2]}>
          {children}
        </Heading>
      </Box>
    ),
  },
  marks: {
    link: ({ value, text }) => {
      return (
        <a href={value.href} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      )
    },
  },
}

export const PortableTextContent = ({ value }) => {
  return (
    <Stack space={[3, 3, 4]} style={{ maxWidth: 550, margin: "auto" }}>
      <PortableText value={value} components={components} />
    </Stack>
  )
}

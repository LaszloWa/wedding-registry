import React from "react"
import { PortableText } from "@portabletext/react"
import { Stack, Text, Heading, Box } from "@sanity/ui"

const components = {
  types: {
    break: ({ children }) => {
      return <hr style={{ border: 0 }}>{children}</hr>
    },
  },
  block: {
    normal: ({ children }) => (
      <Box paddingTop={1}>
        <Text as="p" size={[2, 2, 3]}>
          {children}
        </Text>
      </Box>
    ),
    h2: ({ children }) => (
      <Box marginTop={[2, 2, 4]} style={{ marginBottom: "-10px" }}>
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
    <Stack space={4} style={{ maxWidth: 550, margin: "auto" }}>
      <PortableText value={value} components={components} />
    </Stack>
  )
}

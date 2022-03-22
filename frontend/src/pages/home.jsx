import React from "react"
import { Box } from "@sanity/ui"
import { AccentImage, PortableTextContent } from "../components"
import { useContent } from "../providers/content-provider"

export const Home = () => {
  const { content } = useContent()
  return (
    <>
      <AccentImage src="/accent.png" />
      <PortableTextContent value={content?.home?.content} />
    </>
  )
}

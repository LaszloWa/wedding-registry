import React from "react"
import { Box, Stack } from "@sanity/ui"
import { AccentImage, PortableTextContent } from "../components"
import { useContent } from "../providers/content-provider"

export const Home = () => {
  const { content } = useContent()
  return (
    <>
      <AccentImage src={content?.home.image.src} />
      <PortableTextContent value={content?.home?.content} />
    </>
  )
}

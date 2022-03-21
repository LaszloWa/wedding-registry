import React from "react"
import { Stack } from "@sanity/ui"
import { useContent } from "../providers/content-provider"
import { PortableTextContent, AccentImage } from "../components"

export const Travel = () => {
  const { content } = useContent()
  return (
    <>
      <AccentImage src={content?.travel.image.src} />
      <PortableTextContent value={content?.travel?.content} />
    </>
  )
}

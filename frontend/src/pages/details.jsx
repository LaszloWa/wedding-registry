import React from "react"
import { Stack } from "@sanity/ui"
import { useContent } from "../providers/content-provider"
import { PortableTextContent, AccentImage } from "../components"

export const Details = () => {
  const { content } = useContent()
  return (
    <>
      <AccentImage src={content?.details.image.src} />
      <PortableTextContent value={content?.details?.content} />
    </>
  )
}

import React from "react"
import { useContent } from "../providers/content-provider"
import { PortableTextContent, AccentImage } from "../components"

export const Details = () => {
  const { content } = useContent()
  return (
    <>
      <AccentImage src="/accent.png" />
      <PortableTextContent value={content?.details?.content} />
    </>
  )
}

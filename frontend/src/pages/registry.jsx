import React from "react"
import { Box } from "@sanity/ui"
import { GiftPage } from "."
import { useContent } from "../providers/content-provider"
import { PortableTextContent, AccentImage } from "../components"

export const Registry = () => {
  const { content } = useContent()
  return (
    <>
      <AccentImage src="/accent.png" />
      {content?.registry?.content && (
        <PortableTextContent value={content?.registry?.content} />
      )}
      <GiftPage />
    </>
  )
}

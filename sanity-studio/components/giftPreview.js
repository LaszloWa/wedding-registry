import React from "react"
import { GiftItem } from "../../wedding-registry-frontend/src/components/giftItem"
import imageUrlBuilder from "@sanity/image-url"
import client from "part:@sanity/base/client"
import { Flex, Box, Text } from "@sanity/ui"

const builder = imageUrlBuilder(client)
const imageUrl = (source) => builder.image(source)

export const GiftPreview = ({ document }) => {
  const { published: gift } = document
  if (!gift) {
    return <Text>No gift found...</Text>
  }
  return (
    <Flex justify="center">
      <Box padding={2} style={{ maxWidth: 400 }}>
        <GiftItem
          gift={{
            ...gift,
            image: {
              ...gift.image,
              src: imageUrl(gift.image).height(800).url(),
            },
          }}
        />
      </Box>
    </Flex>
  )
}

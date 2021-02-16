import React, { useState, useEffect } from "react"
import { GiftItem } from "../../wedding-registry-frontend/src/components/giftItem"
import imageUrlBuilder from "@sanity/image-url"
import client from "part:@sanity/base/client"
import { IntentLink } from "part:@sanity/base/router"
import {
  Stack,
  Text,
  Flex,
  Box,
  Grid,
  Heading,
  Button,
  useToast,
} from "@sanity/ui"
import { ArrowRightIcon } from "@sanity/icons"

const builder = imageUrlBuilder(client)
const imageUrl = (source) => builder.image(source)

export const PersonPreview = ({ document }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [reservedGifts, setReservedGifts] = useState([])
  const { published: person } = document

  const toast = useToast()

  useEffect(() => {
    setIsLoading(true)
    if (person) {
      client
        .fetch(`*[_type == 'gift' && references($documentId)]`, {
          documentId: person._id,
        })
        .then((data) => {
          console.log(data)
          setReservedGifts(data)
          setIsLoading(false)
        })
        .catch((result) => {
          setIsLoading(false)
          toast.push({
            title: "Oops! Something went wrong.",
            description: result.response.body.error.description,
            status: "error",
          })
        })
    }
  }, [])

  return (
    <Stack space={4} padding={4}>
      <Stack space={3}>
        <Heading>Reserved gifts</Heading>
        {person?.name && (
          <Text>
            {person.name} has reserved {reservedGifts.length}{" "}
            {`${reservedGifts.length === 1 ? "gift" : "gifts"}`}
          </Text>
        )}
      </Stack>
      <div
        style={{
          display: "grid",
          "grid-template-columns": "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1em",
        }}
      >
        {reservedGifts.length > 0 &&
          reservedGifts.map((gift) => (
            <div key={gift._id} style={{ maxWidth: 400, position: "relative" }}>
              <GiftItem
                gift={{
                  ...gift,
                  image: {
                    ...gift.image,
                    src: imageUrl(gift.image).height(800).url(),
                  },
                }}
              />
              <Button
                style={{
                  marginTop: "0.75em",
                  position: "absolute",
                  top: 0,
                  right: "1em",
                }}
                iconRight={ArrowRightIcon}
                mode="ghost"
                text={
                  <IntentLink
                    intent="edit"
                    params={{ id: gift._id, type: gift._type }}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    View
                  </IntentLink>
                }
              />
            </div>
          ))}
      </div>
    </Stack>
  )
}

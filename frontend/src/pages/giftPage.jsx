import { GiftItem, Prompt } from "../components"
import React, { useEffect, useState } from "react"
import sendRequest from "../api-helper"
import styled from "styled-components"
import {
  Stack,
  Text,
  Flex,
  Box,
  Radio,
  Inline,
  useToast,
  Spinner,
} from "@sanity/ui"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1em;
  overflow: hidden;
`

const priceRanges = [
  { label: "All gifts", value: "all" },
  { label: "$", value: "1" },
  { label: "$$", value: "2" },
  { label: "$$$", value: "3" },
]

export const GiftPage = () => {
  const [gifts, setGifts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [activePriceFilter, setActivePriceFilter] = useState("all") // all, 1, 2, 3

  const handleSelectPrice = (e) => {
    setActivePriceFilter(e.target.value)
  }

  const toast = useToast()

  useEffect(() => {
    setIsLoading(true)
    fetch("/.netlify/functions/get-gifts")
      .then((res) => res.json())
      .then((data) => {
        setGifts(data)
        setIsLoading(false)
      })
      .catch((e) => setIsLoading(false))
  }, [])

  const sendResponseToast = (response) => {
    toast.push(response)
  }

  const handleReserveGift = (gift, isReserved) => {
    const requestBody = {
      name: gift.name,
      id: gift._id,
      revisionId: gift._rev,
      isReserved,
    }

    sendRequest(
      "update-gift",
      requestBody,
      sendResponseToast,
      sendResponseToast
    )
  }

  return (
    <Stack space={4} paddingTop={4}>
      <Flex justify="center">
        <Text>Text here</Text>
      </Flex>
      <Grid columns={[1, 1, 4]} gap={3}>
        <Flex align="center" justify={"center"} style={{ gridColumn: "1/-1" }}>
          {isLoading && (
            <Stack space={3} style={{ minHeight: "40vh" }} paddingTop={2}>
              <Flex justify="center">
                <Spinner muted />
              </Flex>
              <Text muted align="center">
                Loading gifts...
              </Text>
            </Stack>
          )}
          {!isLoading && gifts.length !== 0 && (
            <>
              <Inline space={3}>
                {priceRanges.map((price) => (
                  <Flex align="center" key={price.value}>
                    <Box paddingRight={2}>
                      <Radio
                        value={price.value}
                        name="price"
                        checked={activePriceFilter === price.value}
                        onChange={handleSelectPrice}
                      />
                    </Box>
                    <Text muted>{price.label}</Text>
                  </Flex>
                ))}
              </Inline>
            </>
          )}
        </Flex>
        {!isLoading &&
          gifts
            .filter((gift) => {
              return (
                activePriceFilter === "all" ||
                gift.priceCategory === +activePriceFilter
              )
            })
            .map((gift) => (
              <GiftItem
                key={gift._id}
                gift={gift}
                onClick={(isReserved) => handleReserveGift(gift, isReserved)}
              />
            ))}
      </Grid>
      {gifts.length === 0 && (
        <Box padding={5} style={{ minHeight: "40vh" }}>
          <Text muted align="center">
            No gifts found...
          </Text>
        </Box>
      )}
    </Stack>
  )
}
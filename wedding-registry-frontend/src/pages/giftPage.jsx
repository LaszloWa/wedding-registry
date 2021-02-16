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
    <>
      <Flex justify="center">
        <Prompt
          title="Please don't feel obliged to get us a gift, your presence at our wedding is more than enough."
          margin={2}
          tone="positive"
        />
      </Flex>
      <Grid columns={[1, 1, 4]} gap={3}>
        <Flex align="center" justify={"center"} style={{ gridColumn: "1/-1" }}>
          {isLoading ? (
            <Stack space={3} style={{ minHeight: "40vh" }} paddingTop={2}>
              <Flex justify="center">
                <Spinner muted size={1} />
              </Flex>
              <Text size={1} muted align="center">
                Loading gifts...
              </Text>
            </Stack>
          ) : (
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
                  <Text size={1} muted>
                    {price.label}
                  </Text>
                </Flex>
              ))}
            </Inline>
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
        <Box padding={3} style={{ minHeight: "40vh" }}>
          <Text size={1} muted align="center">
            No gifts found...
          </Text>
        </Box>
      )}
    </>
  )
}

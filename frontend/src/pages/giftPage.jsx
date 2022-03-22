import { GiftItem } from "../components"
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
  Grid,
} from "@sanity/ui"

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

  const honeymoonFund = gifts?.find(
    (g) => g.name === "Donation to Honeymoon Fund"
  )

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

    sendRequest("update-gift", requestBody)
  }

  return (
    <>
      <Grid columns={[2, 2, 3]} gap={4} paddingY={2}>
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
            <Box paddingY={[2, 2, 4]}>
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
            </Box>
          )}
        </Flex>
        {!isLoading && honeymoonFund && (
          <GiftItem
            key={honeymoonFund._id}
            gift={honeymoonFund}
            isHoneymoonFund
          />
        )}
        {!isLoading &&
          gifts
            .filter((gift) => {
              return (
                activePriceFilter === "all" ||
                gift.priceCategory === +activePriceFilter
              )
            })
            .filter((g) => g.name !== "Donation to Honeymoon Fund")
            .map((gift) => (
              <GiftItem
                key={gift._id}
                gift={gift}
                onClick={(isReserved) => handleReserveGift(gift, isReserved)}
              />
            ))}
      </Grid>
      {gifts.length === 0 && !isLoading && (
        <Box padding={5} style={{ minHeight: "40vh" }}>
          <Text muted align="center">
            No gifts found...
          </Text>
        </Box>
      )}
    </>
  )
}

import { GiftItem } from "../components"
import React, { useEffect, useState } from "react"
import sendRequest from "../api-helper"
import styled from "styled-components"
import { Text, Flex, Box, Radio, Inline, useToast } from "@sanity/ui"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.75em;
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
  const [activePriceFilter, setActivePriceFilter] = useState("all") // all, 1, 2, 3

  const handleSelectPrice = (e) => {
    setActivePriceFilter(e.target.value)
  }

  const toast = useToast()

  useEffect(() => {
    fetch("/.netlify/functions/get-gifts")
      .then((res) => res.json())
      .then((data) => setGifts(data))
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
    <Box>
      <Grid columns={[1, 1, 4]} gap={3}>
        <Flex align="center" justify={"center"} style={{ gridColumn: "1/-1" }}>
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
        </Flex>
        {gifts
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
    </Box>
  )
}

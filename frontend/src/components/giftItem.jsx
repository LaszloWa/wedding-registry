import React, { useState } from "react"
import {
  Box,
  Card,
  Stack,
  Label,
  Text,
  Flex,
  Button,
  MenuButton,
  Menu,
  MenuItem,
  Tooltip,
  Inline,
} from "@sanity/ui"
import { LinkIcon } from "@sanity/icons"
import styled from "styled-components"
import { ConfirmReservationButton } from "./confirmReservationButton"

const ImageWrapper = styled.div`
  display: flex;
  height: 150px;
  width: 150px;
  overflow: hidden;
  border-radius: 50%;
  flex-shrink: 0;
`

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  /* background: var(--card-border-color); */
  position: relative;

  &::after {
    content: "Image not found :(";
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.sanity.color.muted.default.enabled.fg};
    background-color: ${({ theme }) =>
      theme.sanity.color.muted.default.enabled.bg};
    font-size: ${({ theme }) =>
      `${theme.sanity.fonts.text.sizes[1].fontSize}px`};
  }
`

export const GiftItem = ({ gift, onClick, children, isHoneymoonFund }) => {
  const { name, links = [], image, priceCategory, manufacturer } = gift
  const [isReserved, setIsReserved] = useState(gift.isReserved || false)
  const price = (value) => {
    return new Array(value).fill("$").map((p) => p)
  }

  const handleConfirm = () => {
    setIsReserved(!isReserved)
    if (onClick) {
      onClick(!isReserved)
    }
  }

  return (
    <Stack space={2}>
      <Flex justify="center">
        <ImageWrapper>
          <Image src={image.src} alt={name} />
        </ImageWrapper>
      </Flex>
      <Box padding={[0, 0, 3]} paddingTop={2}>
        <Stack space={3} style={{ maxWidth: 200, margin: "auto" }}>
          <Text size={2} muted>
            {price(priceCategory)}
          </Text>
          <Text size={[2, 2, 3]}>
            {manufacturer ? `${manufacturer} - ` : ""}
            {name}
          </Text>
          <Flex>
            <ConfirmReservationButton
              gift={gift}
              onConfirm={handleConfirm}
              isReserved={isReserved}
              isHoneymoonFund={isHoneymoonFund}
            />
          </Flex>
          {children}
        </Stack>
      </Box>
    </Stack>
  )
}

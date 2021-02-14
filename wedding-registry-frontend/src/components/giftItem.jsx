import React, { useState } from "react"
import { Box, Card, Stack, Label, Text, Flex } from "@sanity/ui"
import { Icon } from "@sanity/icons"
import styled from "styled-components"
import { ConfirmReservationButton } from "./confirmReservationButton"

const ImageWrapper = styled.div`
  display: flex;
  max-height: 230px;
  min-height: 230px;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`

const Link = styled(Text)`
  --card-link-color: ${({ theme }) => theme.sanity.color.base.fg};
  text-decoration: none;
  display: flex;
  align-items: center;
`

export const GiftItem = ({ gift, onClick }) => {
  const { name, link, image, priceCategory } = gift
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
    <Card radius={2} border={1} margin={2}>
      <ImageWrapper>
        <Image src={image.src} alt={name} />
      </ImageWrapper>
      <Box padding={3}>
        <Stack space={3}>
          <Label size={1} muted>
            Title
          </Label>
          <Text size={3}>
            <Link href={link} as="a" target="_blank">
              {name}
              <Box paddingLeft={3} as="span">
                <Text size={2}>
                  <Icon symbol="link" />
                </Text>
              </Box>
            </Link>
          </Text>
          <Text size={1} muted>
            {price(priceCategory)}
          </Text>
          <Flex>
            <ConfirmReservationButton
              giftName={name}
              onConfirm={handleConfirm}
              isReserved={isReserved}
            />
          </Flex>
        </Stack>
      </Box>
    </Card>
  )
}

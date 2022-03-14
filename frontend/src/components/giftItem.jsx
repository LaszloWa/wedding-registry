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
  max-height: 230px;
  min-height: 230px;
  min-width: 230px;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  background: var(--card-border-color);
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

const Link = styled(Text)`
  --card-link-color: ${({ theme }) => theme.sanity.color.base.fg};
  text-decoration: none;
  display: flex;
  align-items: center;
`

const priceLabels = ["", "Low", "Medium", "High"]

const StyledButton = styled(Button)`
  --card-fg-color: ${({ theme }) => theme.sanity.color.base.fg};

  & [data-ui="Text"] {
    font-weight: 400;
  }

  &:not([data-disabled="true"]):hover,
  :not([data-disabled="true"]):active,
  :not([data-disabled="true"])[data-selected] {
    --card-fg-color: ${({ theme }) => theme.sanity.color.base.fg};
    --card-bg-color: ${({ theme }) => theme.sanity.color.base.bg};
    --card-border-color: ${({ theme }) => theme.sanity.color.base.bg};
  }
`

const StyledMenuItem = styled(MenuItem)`
  &[data-as="button"]:not(:disabled):focus {
    --card-bg-color: #d4d8d1;
    --card-border-color: #d4d8d1;
    --card-fg-color: ${({ theme }) => theme.sanity.color.base.fg};
    --card-muted-fg-color: ${({ theme }) => theme.sanity.color.base.fg};
  }
  &[data-as="button"]:not(:disabled):hover {
    --card-bg-color: #d4d8d1;
    --card-border-color: #d4d8d1;
    --card-fg-color: ${({ theme }) => theme.sanity.color.base.fg};
    --card-muted-fg-color: ${({ theme }) => theme.sanity.color.base.fg};
  }
`

const GiftLink = ({ href, label, country }) => (
  <Link as="a" href={href} target="_blank">
    <Flex
      style={{ width: "100%", minWidth: "150px" }}
      align="center"
      justify="space-between"
    >
      <Text>{label}</Text>
      {country && (
        <Box paddingLeft={3}>
          <Text muted size={1} align="left">
            {country}
          </Text>
        </Box>
      )}
    </Flex>
  </Link>
)

export const GiftItem = ({ gift, onClick, children }) => {
  const { name, links = [], image, priceCategory } = gift
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
    <Card radius={2} border={1}>
      <ImageWrapper>
        <Image src={image.src} alt={name} />
      </ImageWrapper>
      <Box padding={3} paddingTop={4}>
        <Stack space={3}>
          <Label size={1} muted>
            {gift.manufacturer || "Title"}
          </Label>
          <Text size={3}>
            <Flex align="center">
              <MenuButton
                portal
                placement="bottom-end"
                button={
                  <StyledButton
                    label="Purchase"
                    text={name}
                    iconRight={LinkIcon}
                    mode="bleed"
                    paddingY={2}
                    paddingX={0}
                    fontSize={3}
                  />
                }
                menu={
                  <Menu>
                    <Box padding={3} paddingX={2}>
                      <Stack space={2}>
                        <Label size={1} muted>
                          Stores
                        </Label>

                        {links.length > 0 ? (
                          links.map((link) => (
                            <StyledMenuItem padding={0} key={link.label}>
                              <Box padding={3}>
                                <GiftLink {...link} />
                              </Box>
                            </StyledMenuItem>
                          ))
                        ) : (
                          <Box paddingY={2}>
                            <Flex>
                              <Text size={1} muted>
                                No stores found...
                              </Text>
                            </Flex>
                          </Box>
                        )}
                      </Stack>
                    </Box>
                  </Menu>
                }
              />
            </Flex>
          </Text>

          <Inline>
            <Tooltip
              portal
              content={
                <Box padding={3} style={{ maxWidth: "180px" }}>
                  <Text size={1} muted>
                    {priceLabels[priceCategory]} price
                  </Text>
                </Box>
              }
            >
              <Text size={1} muted>
                {price(priceCategory)}
              </Text>
            </Tooltip>
          </Inline>

          <Flex>
            <ConfirmReservationButton
              gift={gift}
              onConfirm={handleConfirm}
              isReserved={isReserved}
            />
          </Flex>
          {children}
        </Stack>
      </Box>
    </Card>
  )
}
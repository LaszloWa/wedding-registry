import {
  Stack,
  Dialog,
  Grid,
  Button,
  Text,
  Tooltip,
  Box,
  Inline,
  Flex,
} from "@sanity/ui"
import React, { useState } from "react"
import { HeartIcon } from "@sanity/icons"
import styled from "styled-components"
import { Prompt } from "."

const ReserveButton = styled.button`
  pointer-events: auto;
  padding: 5px 1em;
  background: none;
  border: none;
  box-shadow: 0;
  margin: auto;
  border-radius: 5px;

  &:hover {
    background: #7192691f;
  }

  &:hover [data-sanity-icon] {
    color: #719269;
  }

  &:disabled [data-sanity-icon] {
    color: #719269;
    fill: #719269;
  }
`

const StyledButton = styled(Button)`
	--card-bg-color: #719269;
	@media (hover: hover) {
		&:not([data-disabled='true']):hover {
			--card-bg-color: #506e3a;
			}
		}	
  }
`

export const ConfirmReservationButton = ({
  gift,
  isReserved,
  onConfirm,
  isHoneymoonFund,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleCloseDialog = () => {
    setIsOpen(false)
  }

  const handleOpenDialog = () => {
    setIsOpen(true)
  }

  const handleConfirm = () => {
    onConfirm()
    handleCloseDialog()
  }

  const headerText = isHoneymoonFund ? (
    "Donate to our honeymoon fund"
  ) : (
    <>
      Are you sure you want to reserve{" "}
      <strong>
        {gift?.manufacturer ? `${gift?.manufacturer} - ` : ""}
        {gift?.name}
      </strong>
      ?
    </>
  )

  return (
    <>
      {isOpen && (
        <Dialog
          width={1}
          header={headerText}
          onClose={handleCloseDialog}
          footer={
            <Box paddingX={4} paddingY={2}>
              <Grid columns={[1, 1, 2]} gap={2}>
                <Button
                  text={isHoneymoonFund ? "Close" : "Cancel"}
                  mode="bleed"
                  onClick={handleCloseDialog}
                  fontSize={3}
                />
                <StyledButton
                  data-confirm="true"
                  text="Confirm"
                  onClick={isHoneymoonFund ? handleCloseDialog : handleConfirm}
                  fontSize={3}
                />
              </Grid>
            </Box>
          }
        >
          <Box padding={4}>
            <Stack space={4}>
              {isHoneymoonFund && (
                <>
                  <Text size={3}>
                    Donating to our honeymoon fund can be done using Vipps or
                    PayPal, depending on your location.
                  </Text>
                  <Stack
                    as="ul"
                    style={{ listStyleType: "disc" }}
                    marginLeft={5}
                    space={3}
                  >
                    {gift.links &&
                      gift.links.map((link) => (
                        <Text
                          size={3}
                          style={{ display: "list-item" }}
                          key={link.label}
                        >
                          {link.country}:{" "}
                          {link?.href ? (
                            <a href={link.href}>{link.label}</a>
                          ) : (
                            link.label
                          )}
                        </Text>
                      ))}
                  </Stack>
                  <Text size={2} muted>
                    If you need help donating, please reach out to Gabriella on{" "}
                    <a href="https://www.facebook.com/gabriella.halvorsen">
                      Facebook
                    </a>{" "}
                    or by phone (+47 958 09 261).
                  </Text>
                </>
              )}
              {!isHoneymoonFund && (gift?.links || []).length > 0 && (
                <>
                  <Text size={3}>
                    This item is available from the following stores:
                  </Text>
                  <Stack
                    as="ul"
                    style={{ listStyleType: "disc" }}
                    marginLeft={5}
                    space={3}
                  >
                    {gift.links.map((link) => (
                      <Text
                        size={3}
                        style={{ display: "list-item" }}
                        key={link.label}
                      >
                        <a href={link.href}>{link.label}</a>
                      </Text>
                    ))}
                  </Stack>
                </>
              )}
              {!isHoneymoonFund && (
                <Text size={2} muted>
                  If you need help ordering this item, please reach out to
                  Gabriella on{" "}
                  <a href="https://www.facebook.com/gabriella.halvorsen">
                    Facebook
                  </a>{" "}
                  or by phone (+47 958 09 261). Reserved gifts will be
                  unavailable to others.
                </Text>
              )}
            </Stack>
          </Box>
        </Dialog>
      )}
      {isReserved ? (
        <Text muted style={{ margin: "auto" }}>
          Already reserved
        </Text>
      ) : (
        <ReserveButton onClick={handleOpenDialog}>
          <Inline space={2}>
            <Text size={1} muted>
              <HeartIcon />
            </Text>
            {isHoneymoonFund ? (
              <Text muted>Donate</Text>
            ) : (
              <Text muted>Reserve</Text>
            )}
          </Inline>
        </ReserveButton>
      )}
    </>
  )
}

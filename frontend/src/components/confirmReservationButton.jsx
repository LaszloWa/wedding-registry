import {
  Stack,
  Dialog,
  Grid,
  Button,
  Text,
  Tooltip,
  Box,
  Inline,
} from "@sanity/ui"
import React, { useState } from "react"
import { HeartIcon } from "@sanity/icons"
import styled from "styled-components"
import { Prompt } from "."

const ReserveButton = styled.button`
  pointer-events: auto;
  padding: 2px 1em;
  background: none;
  border: none;
  box-shadow: 0;
  margin: auto;

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

export const ConfirmReservationButton = ({ gift, isReserved, onConfirm }) => {
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

  return (
    <>
      {isOpen && (
        <Dialog
          width={1}
          header={
            <>
              Are you sure you want to reserve{" "}
              <strong>
                {gift?.manufacturer ? `${gift?.manufacturer} - ` : ""}
                {gift?.name}
              </strong>
              ?
            </>
          }
          onClose={handleCloseDialog}
          footer={
            <Box paddingX={4} paddingY={2}>
              <Grid columns={[1, 1, 2]} gap={2}>
                <Button
                  text="Cancel"
                  mode="bleed"
                  onClick={handleCloseDialog}
                  fontSize={3}
                />
                <StyledButton
                  data-confirm="true"
                  text="Confirm"
                  onClick={handleConfirm}
                  fontSize={3}
                />
              </Grid>
            </Box>
          }
        >
          <Box padding={4}>
            <Stack space={4}>
              {(gift?.links || []).length > 0 && (
                <>
                  <Text size={3}>
                    This item is available from the following stores:
                  </Text>
                  <Stack
                    as="ul"
                    style={{ listStyleType: "disc" }}
                    marginLeft={5}
                  >
                    {gift.links.map((link) => (
                      <Text size={3} style={{ display: "list-item" }}>
                        <a href={link.href}>{link.label}</a>
                      </Text>
                    ))}
                  </Stack>
                </>
              )}
              <Text size={2} muted>
                If you need help ordering this item, please reach out to
                Gabriella on{" "}
                <a href="https://www.facebook.com/gabriella.halvorsen">
                  Facebook
                </a>{" "}
                or by phone (+47 958 09 261). Reserved gifts will be unavailable
                to others.
              </Text>
            </Stack>
          </Box>
        </Dialog>
      )}
      <ReserveButton onClick={handleOpenDialog} disabled={isReserved}>
        <Inline space={2}>
          <Text size={1}>
            <HeartIcon />
          </Text>
          <Text>{isReserved ? "Reserved" : "Reserve"}</Text>
        </Inline>
      </ReserveButton>
    </>
  )
}

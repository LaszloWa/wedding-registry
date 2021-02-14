import {
  Flex,
  Card,
  Stack,
  Dialog,
  Grid,
  Button,
  Text,
  Tooltip,
  Box,
} from "@sanity/ui"
import React, { useState } from "react"
import { Icon, HeartIcon } from "@sanity/icons"
import styled from "styled-components"

const StyledButton = styled(Button)`
  width: 100%;
  pointer-events: auto;

  &:not([data-disabled="true"]):hover {
    --card-bg-color: #73896a;
    --card-border-color: #73896a;
    --card-fg-color: #fff;
  }

  &[data-confirm="true"] {
    --card-fg-color: #fff;
    --card-bg-color: #73896a;
    --card-border-color: #73896a;
    &:not([data-disabled="true"]):hover {
      --card-bg-color: #536348;
      --card-border-color: #536348;
    }
  }
`

export const ConfirmReservationButton = ({
  giftName,
  isReserved,
  onConfirm,
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

  return (
    <>
      {isOpen && (
        <Dialog
          width={1}
          header="Confirm reservation"
          onClose={handleCloseDialog}
          footer={
            <Box paddingX={4} paddingY={2}>
              <Grid columns={[1, 1, 2]} gap={2}>
                <Button
                  text="Cancel"
                  mode="bleed"
                  onClick={handleCloseDialog}
                />
                <StyledButton
                  data-confirm="true"
                  text="Confirm"
                  mode="ghost"
                  onClick={handleConfirm}
                />
              </Grid>
            </Box>
          }
        >
          <Box padding={4}>
            <Stack space={4}>
              <Text as="p">
                Are you sure you want to reserve <strong>{giftName}</strong>?
              </Text>
              <Card tone="caution" padding={4} radius={2} border>
                <Flex align="center">
                  <Box paddingRight={4}>
                    <Text style={{ color: "#73896a" }}>
                      <Icon symbol="warning-outline" />
                    </Text>
                  </Box>
                  <Text as="p">
                    Reserved gifts will be unavailable to others.
                  </Text>
                </Flex>
              </Card>
            </Stack>
          </Box>
        </Dialog>
      )}
      <Tooltip
        disabled={!isReserved}
        content={
          <Box padding={3} style={{ maxWidth: "230px" }}>
            <Text size={1} muted>
              This gift has already been reserved.
            </Text>
          </Box>
        }
      >
        <StyledButton
          // as={isReserved ? "span" : "button"}
          tone="brand"
          mode="ghost"
          text={isReserved ? "Reserved" : "Reserve gift"}
          icon={HeartIcon}
          onClick={handleOpenDialog}
          disabled={isReserved}
        />
      </Tooltip>
    </>
  )
}

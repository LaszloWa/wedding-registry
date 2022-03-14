import { Stack, Dialog, Grid, Button, Text, Tooltip, Box } from "@sanity/ui";
import React, { useState } from "react";
import { HeartIcon } from "@sanity/icons";
import styled from "styled-components";
import { Prompt } from ".";

const StyledButton = styled(Button)`
	width: 100%;
	pointer-events: auto;

	&:not([data-disabled="true"]):hover {
		--card-bg-color: #6b8a55;
		--card-border-color: #6b8a55;
		--card-fg-color: #fff;
	}

	&[data-confirm="true"] {
		--card-fg-color: #fff;
		--card-bg-color: #6b8a55;
		--card-border-color: #6b8a55;
		&:not([data-disabled="true"]):hover {
			--card-bg-color: #5e794a;
			--card-border-color: #5e794a;
		}
	}
`;

export const ConfirmReservationButton = ({ gift, isReserved, onConfirm }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleCloseDialog = () => {
		setIsOpen(false);
	};

	const handleOpenDialog = () => {
		setIsOpen(true);
	};

	const handleConfirm = () => {
		onConfirm();
		handleCloseDialog();
	};

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
								Are you sure you want to reserve <strong>{gift?.name}</strong>{" "}
								from <strong>{gift?.manufacturer}</strong>?
							</Text>
							<Prompt
								title="Reserved gifts will be unavailable to others."
								tone="caution"
								icon="warning-outline"
							/>
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
				<div style={{ width: "100%" }}>
					<StyledButton
						tone="brand"
						mode="ghost"
						text={isReserved ? "Reserved" : "Reserve"}
						icon={HeartIcon}
						onClick={handleOpenDialog}
						disabled={isReserved}
					/>
				</div>
			</Tooltip>
		</>
	);
};

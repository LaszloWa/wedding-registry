import { Flex, Card, Text, Box } from "@sanity/ui"
import { Icon } from "@sanity/icons"
import styled from "styled-components"

const StyledCard = styled(Card)`
  --card-bg-color: #ecf0ea;
  --card-border-color: #ecf0ea;
`

export const Prompt = ({ tone = "default", title, icon, margin = 0 }) => (
  <StyledCard
    tone={tone}
    padding={4}
    radius={2}
    border
    margin={margin}
    style={{ maxWidth: 600 }}
  >
    <Flex align="center">
      <Box paddingRight={icon ? 4 : 0}>
        {icon && (
          <Text>
            <Icon symbol={icon} />
          </Text>
        )}
      </Box>
      <Text as="p" size={1}>
        {title}
      </Text>
    </Flex>
  </StyledCard>
)

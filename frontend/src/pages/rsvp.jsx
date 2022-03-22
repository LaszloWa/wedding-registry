import React, { useState } from "react"
import {
  Button,
  Checkbox,
  TextInput,
  Stack,
  Text,
  Grid,
  Inline,
  Flex,
  useToast,
} from "@sanity/ui"
import sendRequest from "../api-helper"
import { AccentImage, PortableTextContent } from "../components"
import { useContent } from "../providers/content-provider"
import styled from "styled-components"

const StyledButton = styled(Button)`
  --card-bg-color: #719269;
  @media (hover: hover) {
    &:not([data-disabled="true"]):hover {
      --card-bg-color: #506e3a;
    }
  }
`

const dietaryRestrictions = [
  {
    title: "Lactose intolerant",
    value: "lactose-free",
  },
  {
    title: "Celiac disease",
    value: "gluten-free",
  },
  {
    title: "Vegan",
    value: "vegan",
  },
  {
    title: "Vegetarian",
    value: "vegetarian",
  },
  {
    title: "Nut allergy",
    value: "nut-allergy",
  },
  {
    title: "Other (please contact us)",
    value: "other",
  },
]

export const Rsvp = () => {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { content } = useContent()
  const toast = useToast()

  const handleFormSubmission = async (event) => {
    event.preventDefault()
    setLoading(true)

    const theElements = event.target.elements

    const dietaryRestrictions = Array.from(theElements["dietaryRestrictions[]"])
      .map((item) => {
        if (item.checked) {
          return item.value
        }
      })
      .filter((item) => item)

    const body = {
      name: theElements["name"].value,
      guest: theElements["guest"].value,
      dietaryRestrictions,
    }

    await sendRequest("rsvp", body, toast)
    setLoading(false)
  }

  return (
    <>
      <AccentImage src="/accent.png" />
      {content?.rsvp?.content && (
        <PortableTextContent value={content?.rsvp?.content} />
      )}

      <Flex justify="center" paddingTop={4}>
        <Stack
          space={4}
          as="form"
          onSubmit={handleFormSubmission}
          style={{ textAlign: "left", maxWidth: 450 }}
          flex={1}
        >
          <Stack space={3}>
            <Text as="label" weight="medium" size={[2, 2, 3]}>
              Name*
            </Text>
            <Text size={2} muted>
              Your first name
            </Text>
            <TextInput
              label="Your name"
              id="name"
              fontSize={[2, 2, 3]}
              disabled={loading}
              required
            />
          </Stack>
          <Stack space={3}>
            <Text as="label" weight="medium" size={[2, 2, 3]}>
              Accompanied by
            </Text>
            <Text size={2} muted>
              Name of your partner or +1
            </Text>
            <TextInput
              label="Your +1"
              id="guest"
              fontSize={[2, 2, 3]}
              disabled={loading}
            />
          </Stack>

          <Stack space={3}>
            <Text as="label" weight="medium" size={[2, 2, 3]}>
              Dietary restrictions
            </Text>
            <Text size={2} muted>
              Let us know if there is any food you cannot eat
            </Text>
            <Grid columns={[1, 1, 2]} gap={3}>
              {dietaryRestrictions.map((option, i) => (
                <Inline as="label" space={2} key={i}>
                  <Checkbox
                    label={option.title}
                    name="dietaryRestrictions[]"
                    value={option.value}
                    id={option.value}
                    fontSize={[2, 2, 3]}
                    disabled={loading}
                  />
                  <Text size={[2, 2, 3]}>{option.title}</Text>
                </Inline>
              ))}
            </Grid>
          </Stack>
          <Stack marginTop={2} space={3}>
            <StyledButton
              type="submit"
              text="Submit"
              fontSize={[2, 2, 3]}
              disabled={loading}
              loading={loading}
            />
          </Stack>
        </Stack>
      </Flex>
    </>
  )
}

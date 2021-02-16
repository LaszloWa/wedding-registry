require("dotenv").config()
const sanityClient = require("@sanity/client")
const fetch = require("node-fetch")
const { URL } = process.env

const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  token: process.env.REACT_APP_SANITY_TOKEN, // or leave blank to be anonymous user
  useCdn: false, // `false` if you want to ensure fresh data
})

exports.handler = async (event, handler, callback) => {
  const { name, id, revisionId, isReserved } = JSON.parse(event.body)

  const authenticate = await fetch(`${URL}/.netlify/functions/authenticate`, {
    method: "POST",
    headers: {
      ...event.headers,
    },
  })

  if (authenticate.status !== 200) {
    console.error("Unauthorized request!")
    return {
      statusCode: 401,
      body: JSON.stringify({
        title: "Oops! Something went wrong.",
        description:
          "You are not authorized to change gifts! Please try logging in again.",
        status: "error",
      }),
    }
  }

  const user = await authenticate.json()
  const today = new Date().toISOString()
  return client
    .patch(id) // Document ID to patch
    .ifRevisionId(revisionId)
    .set({
      isReserved: isReserved,
      reservedBy: isReserved
        ? { _type: "reference", _ref: `person-${user.username.toLowerCase()}` }
        : { _type: "reference", _ref: "" },
      reservedAt: isReserved ? today : "",
    }) // Shallow merge
    .commit() // Perform the patch and return a promise
    .then((response) => {
      const giftName = response.name
      const reservedMessage = JSON.stringify({
        title: `${giftName} successfully reserved!`,
        status: "success",
      })
      const unreservedMessage = JSON.stringify({
        title: `${giftName} was unreserved.`,
        description: `It is now available for others to reserve.`,
        status: "warning",
      })
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: isReserved ? reservedMessage : unreservedMessage,
      }
    })
    .catch((err) => {
      if (err.statusCode === 409) {
        return {
          statusCode: 409,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Oops! Something went wrong.",
            description: `Your data seems to be outdated. ${name} has already been reserved. Please refresh the page!`,
            status: "warning",
          }),
        }
      }

      return {
        statusCode: err.statusCode,
        body: JSON.stringify({
          title: "Oops! Something went wrong",
          description: err.message,
          status: "error",
        }),
      }
    })
}

import fetch from "node-fetch"
import "dotenv/config"
import sanityClient from "@sanity/client"
const { URL } = process.env

const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2022-03-18",
  token: process.env.REACT_APP_SANITY_TOKEN, // or leave blank to be anonymous user
  useCdn: false, // `false` if you want to ensure fresh data
})

exports.handler = async (event, handler, callback) => {
  const { name, guest, dietaryRestrictions } = JSON.parse(event.body)

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

  console.log("HURRAY I AM RSVPing", JSON.parse(event.body))

  try {
    const rsvpDocument = {
      _id: `rsvp_${name.split(" ").join("-").toLowerCase()}`,
      _type: "rsvp",
      name,
      guest,
      dietaryRestrictions,
    }

    await client
      .createIfNotExists(rsvpDocument)
      .then((res) => {
        console.log("Yay, it worked!")
      })
      .catch((result) => {
        console.log("something went wrong", result)
      })

    return {
      statusCode: 200,
    }
  } catch {
    return {
      statusCode: err.statusCode,
      body: JSON.stringify({
        title: "Oops! Something went wrong",
        description: err.message,
        status: "error",
      }),
    }
  }
}

async function sendRequest(endpoint, body, callback) {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  }

  if (body) {
    requestOptions.headers["Content-Type"] = "application/json"
    requestOptions.body = JSON.stringify(body)
  }

  const response = await fetch(
    `/.netlify/functions/${endpoint}`,
    requestOptions
  )

  if (!response.ok && callback) {
    const statusCode = response.status
    const responseBody = await response.json()
    console.log(responseBody)
    switch (statusCode) {
      case 401:
      case 409:
        return callback({
          title: "Invalid password",
          description: "Please double check the password you entered.",
          status: "error",
        })
      default:
        return callback({
          title: "Oops! Something went wrong!",
          description: "Please try again or reload the page.",
          status: "error",
        })
    }
  }

  if (response.ok && callback) {
    const responseBody = await response.json()
    console.log(responseBody)
    return callback({
      title: "Welcome!",
      status: "success",
    })
  }
}

export default sendRequest

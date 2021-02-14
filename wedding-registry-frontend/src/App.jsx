import React, { useEffect } from "react"
import { Route } from "react-router-dom"
import { useAuth } from "./providers/auth-provider"
import { LoginPage, GiftPage } from "./pages"
import { DefaultLayout } from "./layout"
const App = () => {
  const { user, authenticate } = useAuth()

  useEffect(() => {
    authenticate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) {
    return (
      <DefaultLayout user={user}>
        <LoginPage />
      </DefaultLayout>
    )
  }

  return (
    <DefaultLayout user={user}>
      <Route page="/">
        <GiftPage />
      </Route>
      {/* <Route path="/">
        <LandingPage />
      </Route> */}
    </DefaultLayout>
  )
}

export default App

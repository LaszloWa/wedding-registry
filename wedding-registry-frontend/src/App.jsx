import React, { useEffect } from "react"
import { Route } from "react-router-dom"
import { useAuth } from "./providers/auth-provider"
import { LoginPage, Home, Details, Travel, Registry, Rsvp } from "./pages"
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
    <DefaultLayout user={user || {}}>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/details">
        <Details />
      </Route>
      <Route path="/travel">
        <Travel />
      </Route>
      <Route path="/registry">
        <Registry />
      </Route>
      <Route path="/rsvp">
        <Rsvp />
      </Route>
    </DefaultLayout>
  )
}

export default App

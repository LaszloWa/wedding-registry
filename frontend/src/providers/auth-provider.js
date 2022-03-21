import React, { createContext, useContext, useState } from "react"
import sendRequest from "../api-helper"
import { useContent } from "./content-provider"

const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined)
  const { getContent, deleteContent } = useContent()

  const saveUser = (user) => {
    setUser(user)
  }

  const deleteUser = () => {
    setUser(undefined)
    deleteContent()
  }

  const handleSuccessfulLogin = (user) => {
    saveUser(user)
    getContent()
  }

  const login = (user, callback) =>
    sendRequest("login", user, handleSuccessfulLogin)

  const logout = () => sendRequest("logout", undefined, deleteUser)

  const authenticate = () => sendRequest("authenticate", undefined, saveUser)

  return (
    <AuthContext.Provider value={{ user, authenticate, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }

import React, { createContext, useContext, useState } from "react"

const ContentContext = createContext({})

function ContentProvider({ children }) {
  const [content, setContent] = useState(undefined)

  const getContent = (content) =>
    fetch("/.netlify/functions/get-editorial-content")
      .then((res) => res.json())
      .then((data) => {
        setContent(
          data?.reduce((acc, page) => {
            if (page.slug?.current === "/") {
              return { ...acc, home: page }
            } else {
              return { ...acc, [page.slug?.current]: page }
            }
          }, {})
        )
      })
  const deleteContent = () => setContent(undefined)
  return (
    <ContentContext.Provider value={{ content, getContent, deleteContent }}>
      {children}
    </ContentContext.Provider>
  )
}

const useContent = () => useContext(ContentContext)

export { useContent, ContentProvider }

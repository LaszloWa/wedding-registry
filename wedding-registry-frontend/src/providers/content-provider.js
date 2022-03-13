import React, { createContext, useContext, useState } from 'react';

const ContentContext = createContext({});

function ContentProvider(children) {
  const [content, setContent] = useState(undefined);

  const getContent = () =>
    fetch('/.netlify/functions/get-editorial-content')
      .then(res => res.json())
      .then(data => {
        setContent(data);
      });

  const deleteContent = () => setContent(undefined);

  return (
    <ContentContext.Provider value={{ content, getContent, deleteContent }}>
      {children}
    </ContentContext.Provider>
  );
}

const useContent = () => useContext(ContentContext);

export { useContent, ContentProvider };

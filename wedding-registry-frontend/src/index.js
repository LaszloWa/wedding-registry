import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './providers/auth-provider';
import { ContentProvider } from './providers/content-provider';

import './index.css';

// eslint-disable-next-line
require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <ContentProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ContentProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

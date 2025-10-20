import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App'
import './index.css'
import { UserDetailsProvider } from './providers/userDetailsProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserDetailsProvider>
        <App />
      </UserDetailsProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
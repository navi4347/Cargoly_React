import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <GoogleOAuthProvider clientId="556403120176-00stpvlv9kfjfph7kji6h0g5dp90nrm4.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider> 
     </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Toaster position='bottom-right' reverseOrder={false} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </>,
)

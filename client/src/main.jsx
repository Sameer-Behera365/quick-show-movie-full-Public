// import { StrictMode } from 'react'  as we are not using stict mode
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

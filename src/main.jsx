import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// aqui é onde o react começa a rodar, pega a div #root do index.html e coloca o app dentro
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
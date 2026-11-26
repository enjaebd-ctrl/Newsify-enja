import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './scss/main.scss'
import App from './App.jsx'

// Her starter hele appen
// Vi finder <div id="root"> i index.html og lader React tegne App inde i den
// main.scss importeres her, så Vite samler al vores styling
// StrictMode hjælper med at finde fejl, mens vi udvikler (det ændrer ikke noget for brugeren)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
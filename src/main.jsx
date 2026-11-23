import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './scss/main.scss'

// App sættes ind i div'en med id "root"
createRoot(document.getElementById('root')).render(<App />)
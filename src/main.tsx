import { createRoot } from 'react-dom/client'
import "../src/App.css"
import { StrictMode } from 'react'
import App from './App'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>
)
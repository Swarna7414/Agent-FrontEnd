import { createRoot } from 'react-dom/client'
import "../src/App.css"
import { StrictMode } from 'react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename="/Agent-FrontEnd">
            <App/>
        </BrowserRouter>
    </StrictMode>
)
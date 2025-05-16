import MainProvider from './providers/MainProvider.jsx';
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.jsx'
import './index.css'
import './i18n';
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MainProvider>
            <App />
        </MainProvider>
    </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import "./reset.css"
import "./index.css"


import App from './App.tsx'
import AppProviders from './context/AppProviders.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AppProviders>
    <App />
    </AppProviders>
    </BrowserRouter>
  </StrictMode>,
)

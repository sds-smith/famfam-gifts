import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ColorModeScript } from '@chakra-ui/react'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'
import theme from './lib/theme.js'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ColorModeScript } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'
import theme from './lib/theme.js'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>,
)

// Render the App component into the root element
import React from 'react'
import App from './App.js'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(<App />)

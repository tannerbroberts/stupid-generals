// Typical react app with socket.io
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DebugView from './utils/DebugView'
import SocketProvider from './utils/SocketsProvider'
import Login from './Login/Login'
import Aether from './Aether/Aether'
import Incarnation from './Incarnation/Incarnation'
import UtilityProvider from './utils/UtilityProvider'

export default function App() {

  return (
    <UtilityProvider>
      <SocketProvider>
        <DebugView />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<p>Hello World!</p>} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </UtilityProvider>
  )
}
// Typical react app with socket.io
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Lobby from './Lobby.js'
import SocketUpdateProvider from './SocketUpdateProvider.js'

const AppContext = React.createContext()
export const useAppContext = () => {
  const context = React.useContext(AppContext)
  if (!context) {
    throw new Error(`AppContext must be used within an AppProvider`)
  }
  return context
}
export default function App() {
  const [signedIn, setSignedIn] = React.useState(false)
  return (
    <AppContext.Provider value={{ signedIn, setSignedIn }}>
      <SocketUpdateProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Lobby />} />
          </Routes>
        </BrowserRouter>
      </SocketUpdateProvider>
    </AppContext.Provider>
  )
}

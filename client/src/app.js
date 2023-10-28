// Typical react app with socket.io
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<p>Hello World!</p>} />
      </Routes>
    </BrowserRouter>
  )
}

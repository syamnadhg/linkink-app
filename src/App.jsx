import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import DatingSection from './components/DatingSection'
import GamesSection from './components/GamesSection'
import Navigation from './components/Navigation'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/dating" replace />} />
          <Route path="/dating" element={<DatingSection />} />
          <Route path="/games" element={<GamesSection />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App


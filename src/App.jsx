import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import DatingSection from './components/DatingSection'
import GamesSection from './components/GamesSection'
import Navigation from './components/Navigation'
import ChatSpace from './components/ChatSpace'
import FloatingChatButton from './components/FloatingChatButton'
import Settings from './components/Settings'

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [matches, setMatches] = useState([])
  const [chats, setChats] = useState([])
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [userProfile, setUserProfile] = useState({
    name: 'You',
    age: 25,
    bio: 'Looking for meaningful connections',
    interests: ['Long-term'],
    gender: 'Male',
    location: 'New York'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleMatch = (user) => {
    if (!matches.find(m => m.id === user.id)) {
      setMatches([...matches, user])
    }
  }

  const handleStartChat = (user) => {
    const existingChat = chats.find(c => c.userId === user.id)
    if (!existingChat) {
      setChats([...chats, {
        id: Date.now(),
        userId: user.id,
        userName: user.name,
        userImage: user.image,
        messages: []
      }])
    }
    setIsChatOpen(true)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation onOpenSettings={() => setIsSettingsOpen(true)} />
        <Routes>
          <Route path="/" element={<Navigate to="/dating" replace />} />
          <Route 
            path="/dating" 
            element={
              <DatingSection 
                onMatch={handleMatch}
                onStartChat={handleStartChat}
                matches={matches}
              />
            } 
          />
          <Route 
            path="/games" 
            element={
              <GamesSection 
                matches={matches}
              />
            } 
          />
        </Routes>
        
        <FloatingChatButton 
          onClick={() => setIsChatOpen(true)}
          unreadCount={chats.filter(c => c.unread).length}
        />
        
        <ChatSpace
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          matches={matches}
          chats={chats}
          onStartChat={handleStartChat}
        />

        <Settings
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          theme={theme}
          onToggleTheme={toggleTheme}
          userProfile={userProfile}
          onUpdateProfile={setUserProfile}
        />
      </div>
    </Router>
  )
}

export default App


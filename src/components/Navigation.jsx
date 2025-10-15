import { Link, useLocation } from 'react-router-dom'
import { Heart, Gamepad2 } from 'lucide-react'

export default function Navigation() {
  const location = useLocation()
  
  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              Connect
            </h1>
          </div>
          <div className="flex space-x-2">
            <Link
              to="/dating"
              className={`flex items-center px-4 py-2 rounded-lg transition-smooth ${
                location.pathname === '/dating'
                  ? 'gradient-purple text-white shadow-lg'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <Heart className="w-5 h-5 mr-2" />
              Dating
            </Link>
            <Link
              to="/games"
              className={`flex items-center px-4 py-2 rounded-lg transition-smooth ${
                location.pathname === '/games'
                  ? 'gradient-purple text-white shadow-lg'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <Gamepad2 className="w-5 h-5 mr-2" />
              Games
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}


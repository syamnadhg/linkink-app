import { Link, useLocation } from 'react-router-dom'
import { Heart, Gamepad2 } from 'lucide-react'

export default function Navigation() {
  const location = useLocation()
  
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">Connect</h1>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/dating"
              className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/dating'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <Heart className="w-5 h-5 mr-2" />
              Dating
            </Link>
            <Link
              to="/games"
              className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/games'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'text-white hover:bg-white/20'
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


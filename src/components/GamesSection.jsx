import { useState } from 'react'
import { Gamepad2, Users, Bot } from 'lucide-react'
import GamesList from './games/GamesList'
import TicTacToe from './games/TicTacToe'
import RockPaperScissors from './games/RockPaperScissors'
import MemoryMatch from './games/MemoryMatch'

export default function GamesSection() {
  const [selectedGame, setSelectedGame] = useState(null)
  const [gameMode, setGameMode] = useState(null) // 'ai' or 'friend'

  const games = [
    {
      id: 'tictactoe',
      name: 'Tic Tac Toe',
      description: 'Classic strategy game',
      icon: '⭕',
      component: TicTacToe
    },
    {
      id: 'rps',
      name: 'Rock Paper Scissors',
      description: 'Best of 5 rounds',
      icon: '✊',
      component: RockPaperScissors
    },
    {
      id: 'memory',
      name: 'Memory Match',
      description: 'Find matching pairs',
      icon: '🎴',
      component: MemoryMatch
    }
  ]

  const handleSelectGame = (game) => {
    setSelectedGame(game)
    setGameMode(null)
  }

  const handleSelectMode = (mode) => {
    setGameMode(mode)
  }

  const handleBackToGames = () => {
    setSelectedGame(null)
    setGameMode(null)
  }

  const GameComponent = selectedGame?.component

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        {!selectedGame ? (
          <GamesList games={games} onSelectGame={handleSelectGame} />
        ) : !gameMode ? (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">{selectedGame.name}</h2>
            <p className="text-white/80 text-lg mb-8">{selectedGame.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <button
                onClick={() => handleSelectMode('ai')}
                className="bg-white/20 hover:bg-white/30 rounded-xl p-8 transition-all group"
              >
                <Bot className="w-16 h-16 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Play vs AI</h3>
                <p className="text-white/70">Practice against computer</p>
              </button>
              
              <button
                onClick={() => handleSelectMode('friend')}
                className="bg-white/20 hover:bg-white/30 rounded-xl p-8 transition-all group"
              >
                <Users className="w-16 h-16 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Play vs Friend</h3>
                <p className="text-white/70">Challenge your matches</p>
              </button>
            </div>

            <button
              onClick={handleBackToGames}
              className="mt-8 text-white/80 hover:text-white underline"
            >
              ← Back to Games
            </button>
          </div>
        ) : (
          <div>
            <GameComponent mode={gameMode} onBack={handleBackToGames} />
          </div>
        )}
      </div>
    </div>
  )
}


import { useState } from 'react'
import { Gamepad2, Users, Bot, ArrowLeft, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Filters from './dating/Filters'
import TicTacToe from './games/TicTacToe'
import RockPaperScissors from './games/RockPaperScissors'
import MemoryMatch from './games/MemoryMatch'
import ConnectFour from './games/ConnectFour'
import WordGuess from './games/WordGuess'
import QuickMath from './games/QuickMath'

export default function GamesSection({ matches }) {
  const [selectedGame, setSelectedGame] = useState(null)
  const [gameMode, setGameMode] = useState(null) // 'ai', 'friend', or 'online'
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [showFriendSelector, setShowFriendSelector] = useState(false)
  const [filters, setFilters] = useState({
    distance: 'all',
    gender: 'all',
    interests: 'all'
  })

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
    },
    {
      id: 'connect4',
      name: 'Connect Four',
      description: 'Connect 4 in a row',
      icon: '🔴',
      component: ConnectFour
    },
    {
      id: 'wordguess',
      name: 'Word Guess',
      description: 'Guess the word',
      icon: '📝',
      component: WordGuess
    },
    {
      id: 'quickmath',
      name: 'Quick Math',
      description: 'Speed calculation',
      icon: '🧮',
      component: QuickMath
    }
  ]

  const handleSelectGame = (game) => {
    setSelectedGame(game)
    setGameMode(null)
    setShowFriendSelector(false)
  }

  const handleSelectMode = (mode) => {
    if (mode === 'friend') {
      if (matches.length === 0) {
        alert('You need to match with someone first!')
        return
      }
      const onlineFriends = matches.filter(m => m.isOnline)
      if (onlineFriends.length === 0) {
        if (window.confirm('No friends online. Connect with other players?')) {
          setGameMode('online')
        }
        return
      }
      setShowFriendSelector(true)
    } else {
      setGameMode(mode)
    }
  }

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend)
    setGameMode('friend')
    setShowFriendSelector(false)
    alert(`Game request sent to ${friend.name}!`)
  }

  const handleBackToGames = () => {
    setSelectedGame(null)
    setGameMode(null)
    setShowFriendSelector(false)
    setSelectedFriend(null)
  }

  const GameComponent = selectedGame?.component

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {gameMode === 'online' && (
        <div className="mb-4">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
      )}
      
      <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
        {!selectedGame ? (
          /* Games List */
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Choose a Game
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => handleSelectGame(game)}
                  className="bg-muted hover:bg-muted/80 rounded-xl p-6 transition-smooth hover-lift group"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-smooth">
                    {game.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{game.name}</h3>
                  <p className="text-sm text-muted-foreground">{game.description}</p>
                </button>
              ))}
            </div>
          </div>
        ) : showFriendSelector ? (
          /* Friend Selector */
          <div>
            <div className="flex items-center mb-6">
              <button
                onClick={() => setShowFriendSelector(false)}
                className="p-2 hover:bg-muted rounded-lg transition-smooth mr-3"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                Select a Friend
              </h2>
            </div>
            
            <div className="space-y-3">
              {matches.filter(m => m.isOnline).map((friend) => (
                <button
                  key={friend.id}
                  onClick={() => handleSelectFriend(friend)}
                  className="w-full bg-muted hover:bg-muted/80 rounded-xl p-4 transition-smooth flex items-center space-x-4"
                >
                  <img
                    src={friend.image}
                    alt={friend.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-foreground">{friend.name}</p>
                    <p className="text-sm text-muted-foreground">Online</p>
                  </div>
                  <Send className="w-5 h-5 text-primary" />
                </button>
              ))}
            </div>
          </div>
        ) : !gameMode ? (
          /* Mode Selection */
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center mb-6">
              <button
                onClick={handleBackToGames}
                className="absolute left-8 p-2 hover:bg-muted rounded-lg transition-smooth"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                {selectedGame.name}
              </h2>
            </div>
            <p className="text-muted-foreground text-lg mb-8">{selectedGame.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <button
                onClick={() => handleSelectMode('ai')}
                className="bg-muted hover:bg-muted/80 rounded-xl p-8 transition-smooth hover-lift group"
              >
                <Bot className="w-16 h-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-smooth" />
                <h3 className="text-xl font-bold text-foreground mb-2">Play vs AI</h3>
                <p className="text-muted-foreground">Practice against computer</p>
              </button>
              
              <button
                onClick={() => handleSelectMode('friend')}
                className="bg-muted hover:bg-muted/80 rounded-xl p-8 transition-smooth hover-lift group"
              >
                <Users className="w-16 h-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-smooth" />
                <h3 className="text-xl font-bold text-foreground mb-2">Play vs Friend</h3>
                <p className="text-muted-foreground">Challenge your matches</p>
              </button>
              
              <button
                onClick={() => handleSelectMode('online')}
                className="bg-muted hover:bg-muted/80 rounded-xl p-8 transition-smooth hover-lift group"
              >
                <Gamepad2 className="w-16 h-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-smooth" />
                <h3 className="text-xl font-bold text-foreground mb-2">Play Online</h3>
                <p className="text-muted-foreground">Match with other players</p>
              </button>
            </div>
          </div>
        ) : (
          /* Game Play */
          <div>
            <GameComponent 
              mode={gameMode} 
              onBack={handleBackToGames}
              opponent={selectedFriend}
              filters={filters}
            />
          </div>
        )}
      </div>
    </div>
  )
}


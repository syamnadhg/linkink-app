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
import AirHockey from './games/AirHockey'
import Pool from './games/Pool'
import RacingCars from './games/RacingCars'
import Chess from './games/Chess'
import PenaltyKicks from './games/PenaltyKicks'

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
      id: 'airhockey',
      name: 'Air Hockey',
      description: 'Fast-paced puck action',
      icon: '🏒',
      component: AirHockey
    },
    {
      id: 'pool',
      name: 'Pool',
      description: 'Classic billiards',
      icon: '🎱',
      component: Pool
    },
    {
      id: 'racing',
      name: 'Racing Cars',
      description: 'Speed to the finish',
      icon: '🏎️',
      component: RacingCars
    },
    {
      id: 'chess',
      name: 'Chess',
      description: 'Strategic board game',
      icon: '♟️',
      component: Chess
    },
    {
      id: 'penalty',
      name: 'Penalty Kicks',
      description: 'Score or save',
      icon: '⚽',
      component: PenaltyKicks
    },
    {
      id: 'connect4',
      name: 'Connect Four',
      description: 'Connect 4 in a row',
      icon: '🔴',
      component: ConnectFour
    },
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
        alert('None of your matches are online. Try playing with online players instead!')
        return
      }
      setShowFriendSelector(true)
    } else if (mode === 'online') {
      // For online mode, we'd use filters
      setGameMode('online')
    } else {
      setGameMode(mode)
    }
  }

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend)
    setGameMode('friend')
    setShowFriendSelector(false)
    // In a real app, send game request to friend
    alert(`Game request sent to ${friend.name}!`)
  }

  const handleBack = () => {
    setSelectedGame(null)
    setGameMode(null)
    setSelectedFriend(null)
    setShowFriendSelector(false)
  }

  // Render game component
  if (selectedGame && gameMode) {
    const GameComponent = selectedGame.component
    return (
      <GameComponent
        mode={gameMode}
        opponent={selectedFriend?.name || 'Opponent'}
        onBack={handleBack}
      />
    )
  }

  // Friend selector
  if (showFriendSelector) {
    const onlineFriends = matches.filter(m => m.isOnline)
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-card rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Button onClick={() => setShowFriendSelector(false)} variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h2 className="text-2xl font-bold text-foreground ml-4">Select a Friend</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {onlineFriends.map((friend) => (
              <div
                key={friend.id}
                className="bg-muted rounded-xl p-4 flex items-center space-x-4 hover-lift transition-smooth cursor-pointer"
                onClick={() => handleSelectFriend(friend)}
              >
                <img
                  src={friend.image}
                  alt={friend.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{friend.name}</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Online
                  </p>
                </div>
                <Button size="sm" className="gradient-purple text-white">
                  <Send className="w-4 h-4 mr-1" />
                  Invite
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Mode selector
  if (selectedGame && !gameMode) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-card rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Button onClick={handleBack} variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h2 className="text-2xl font-bold text-foreground ml-4">{selectedGame.name}</h2>
          </div>

          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{selectedGame.icon}</div>
            <p className="text-muted-foreground">{selectedGame.description}</p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => handleSelectMode('ai')}
              className="w-full py-6 text-lg bg-primary hover:bg-primary/90 text-white"
            >
              <Bot className="w-6 h-6 mr-3" />
              Play vs AI
            </Button>
            <Button
              onClick={() => handleSelectMode('friend')}
              className="w-full py-6 text-lg gradient-purple text-white"
            >
              <Users className="w-6 h-6 mr-3" />
              Play vs Friend
            </Button>
            <Button
              onClick={() => handleSelectMode('online')}
              className="w-full py-6 text-lg bg-green-600 hover:bg-green-700 text-white"
            >
              <Gamepad2 className="w-6 h-6 mr-3" />
              Play vs Online Player
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Game selection grid
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Choose a Game</h2>
        <Filters filters={filters} setFilters={setFilters} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => handleSelectGame(game)}
            className="bg-card rounded-xl p-6 shadow-md border border-border hover-lift transition-smooth cursor-pointer text-center"
          >
            <div className="text-5xl mb-3">{game.icon}</div>
            <h3 className="font-semibold text-foreground mb-1">{game.name}</h3>
            <p className="text-sm text-muted-foreground">{game.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-muted rounded-xl p-5">
        <h3 className="text-sm font-bold text-foreground mb-3">How to Play</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Choose a game from the grid above</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Select your play mode: vs AI, vs Friend, or vs Online Player</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>If playing vs Friend, select from your online matches</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Use filters to find online players with specific preferences</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Chat or voice chat while gaming to bond with your match!</span>
          </li>
        </ul>
      </div>
    </div>
  )
}


import { useState } from 'react'
import { MessageCircle, Mic, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function RockPaperScissors({ mode, onBack }) {
  const [playerChoice, setPlayerChoice] = useState(null)
  const [opponentChoice, setOpponentChoice] = useState(null)
  const [result, setResult] = useState(null)
  const [scores, setScores] = useState({ player: 0, opponent: 0 })
  const [round, setRound] = useState(1)
  const [chatOpen, setChatOpen] = useState(false)

  const choices = [
    { id: 'rock', emoji: '✊', name: 'Rock' },
    { id: 'paper', emoji: '✋', name: 'Paper' },
    { id: 'scissors', emoji: '✌️', name: 'Scissors' }
  ]

  const handleChoice = (choice) => {
    setPlayerChoice(choice)
    
    // Opponent makes choice
    const opponentPick = choices[Math.floor(Math.random() * choices.length)]
    setOpponentChoice(opponentPick)
    
    // Determine winner
    const gameResult = determineWinner(choice, opponentPick)
    setResult(gameResult)
    
    // Update scores
    if (gameResult === 'win') {
      setScores({ ...scores, player: scores.player + 1 })
    } else if (gameResult === 'lose') {
      setScores({ ...scores, opponent: scores.opponent + 1 })
    }
  }

  const determineWinner = (player, opponent) => {
    if (player.id === opponent.id) return 'draw'
    
    if (
      (player.id === 'rock' && opponent.id === 'scissors') ||
      (player.id === 'paper' && opponent.id === 'rock') ||
      (player.id === 'scissors' && opponent.id === 'paper')
    ) {
      return 'win'
    }
    
    return 'lose'
  }

  const nextRound = () => {
    setPlayerChoice(null)
    setOpponentChoice(null)
    setResult(null)
    setRound(round + 1)
  }

  const resetGame = () => {
    setPlayerChoice(null)
    setOpponentChoice(null)
    setResult(null)
    setScores({ player: 0, opponent: 0 })
    setRound(1)
  }

  const isGameOver = round > 5

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onBack}
          className="bg-white/20 text-white hover:bg-white/30"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold text-white">
          Rock Paper Scissors {mode === 'ai' ? '(vs AI)' : '(vs Friend)'}
        </h2>
        <div className="flex space-x-2">
          <Button
            onClick={() => setChatOpen(!chatOpen)}
            className="bg-white/20 text-white hover:bg-white/30"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat
          </Button>
          <Button
            className="bg-white/20 text-white hover:bg-white/30"
          >
            <Mic className="w-4 h-4 mr-2" />
            Voice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Game Area */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl p-8">
            {/* Scoreboard */}
            <div className="flex justify-around mb-8">
              <div className="text-center">
                <p className="text-gray-600 mb-2">You</p>
                <p className="text-4xl font-bold text-purple-600">{scores.player}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 mb-2">Round</p>
                <p className="text-2xl font-bold text-gray-800">{Math.min(round, 5)}/5</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 mb-2">Opponent</p>
                <p className="text-4xl font-bold text-pink-600">{scores.opponent}</p>
              </div>
            </div>

            {isGameOver ? (
              <div className="text-center space-y-4">
                <p className="text-3xl font-bold text-gray-800">
                  {scores.player > scores.opponent ? '🎉 You Win!' : 
                   scores.player < scores.opponent ? '😔 You Lose!' : 
                   "🤝 It's a Tie!"}
                </p>
                <Button onClick={resetGame} className="bg-purple-600 text-white">
                  Play Again
                </Button>
              </div>
            ) : result ? (
              <div className="text-center space-y-6">
                <div className="flex justify-around items-center">
                  <div className="text-center">
                    <p className="text-6xl mb-2">{playerChoice.emoji}</p>
                    <p className="text-lg text-gray-700">{playerChoice.name}</p>
                  </div>
                  <div className="text-4xl">VS</div>
                  <div className="text-center">
                    <p className="text-6xl mb-2">{opponentChoice.emoji}</p>
                    <p className="text-lg text-gray-700">{opponentChoice.name}</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {result === 'win' ? '🎉 You Win!' : 
                   result === 'lose' ? '😔 You Lose!' : 
                   "🤝 It's a Draw!"}
                </p>
                <Button onClick={nextRound} className="bg-purple-600 text-white">
                  Next Round
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-center text-xl font-semibold text-gray-700 mb-6">
                  Choose your move
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => handleChoice(choice)}
                      className="bg-gray-100 hover:bg-purple-100 rounded-xl p-8 transition-all group"
                    >
                      <div className="text-6xl mb-2 group-hover:scale-110 transition-transform">
                        {choice.emoji}
                      </div>
                      <p className="text-lg font-semibold text-gray-700">{choice.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Panel */}
        {chatOpen && (
          <div className="bg-white rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4">Chat</h3>
            <div className="bg-gray-100 rounded-lg p-4 h-64 mb-4 overflow-y-auto">
              <p className="text-gray-500 text-sm">Start chatting while you play...</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
              />
              <Button size="sm">Send</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


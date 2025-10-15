import { useState, useEffect } from 'react'
import { MessageCircle, Mic, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function MemoryMatch({ mode, onBack }) {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [chatOpen, setChatOpen] = useState(false)

  const emojis = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎺', '🎻']

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, flipped: false }))
    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
  }

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return
    }

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      const [first, second] = newFlipped
      
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second])
        setFlipped([])
      } else {
        setTimeout(() => {
          setFlipped([])
        }, 1000)
      }
    }
  }

  const isGameComplete = matched.length === cards.length

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
          Memory Match {mode === 'ai' ? '(vs AI)' : '(vs Friend)'}
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
            {/* Stats */}
            <div className="flex justify-around mb-6">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Moves</p>
                <p className="text-3xl font-bold text-purple-600">{moves}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 mb-2">Matched</p>
                <p className="text-3xl font-bold text-pink-600">{matched.length / 2}/{emojis.length}</p>
              </div>
            </div>

            {isGameComplete ? (
              <div className="text-center space-y-4">
                <p className="text-3xl font-bold text-gray-800">🎉 Congratulations!</p>
                <p className="text-xl text-gray-600">You completed the game in {moves} moves!</p>
                <Button onClick={initializeGame} className="bg-purple-600 text-white">
                  Play Again
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {cards.map((card, index) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(index)}
                    className={`aspect-square rounded-lg text-4xl font-bold transition-all ${
                      flipped.includes(index) || matched.includes(index)
                        ? 'bg-purple-100'
                        : 'bg-gradient-to-br from-pink-500 to-purple-600'
                    }`}
                  >
                    {flipped.includes(index) || matched.includes(index) ? card.emoji : '?'}
                  </button>
                ))}
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


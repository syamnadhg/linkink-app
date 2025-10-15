import { useState, useEffect } from 'react'
import { MessageCircle, Mic, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TicTacToe({ mode, onBack }) {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState(null)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    const gameWinner = calculateWinner(board)
    if (gameWinner) {
      setWinner(gameWinner)
    } else if (board.every(cell => cell !== null)) {
      setWinner('draw')
    }
  }, [board])

  useEffect(() => {
    if (mode === 'ai' && !isXNext && !winner) {
      // AI makes a move
      setTimeout(() => {
        makeAIMove()
      }, 500)
    }
  }, [isXNext, winner, mode])

  const handleClick = (index) => {
    if (board[index] || winner) return
    if (mode === 'ai' && !isXNext) return // Prevent clicking during AI turn

    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    setIsXNext(!isXNext)
  }

  const makeAIMove = () => {
    const emptyIndices = board.reduce((acc, cell, index) => {
      if (cell === null) acc.push(index)
      return acc
    }, [])
    
    if (emptyIndices.length > 0) {
      const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
      const newBoard = [...board]
      newBoard[randomIndex] = 'O'
      setBoard(newBoard)
      setIsXNext(true)
    }
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ]
    
    for (let line of lines) {
      const [a, b, c] = line
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
  }

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
          Tic Tac Toe {mode === 'ai' ? '(vs AI)' : '(vs Friend)'}
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
        {/* Game Board */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl p-8">
            <div className="text-center mb-6">
              {winner ? (
                <div className="space-y-4">
                  <p className="text-2xl font-bold text-gray-800">
                    {winner === 'draw' ? "It's a Draw!" : `${winner} Wins!`}
                  </p>
                  <Button onClick={resetGame} className="bg-purple-600 text-white">
                    Play Again
                  </Button>
                </div>
              ) : (
                <p className="text-xl font-semibold text-gray-700">
                  {isXNext ? "X's Turn" : "O's Turn"}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className="aspect-square bg-gray-100 hover:bg-gray-200 rounded-lg text-4xl font-bold transition-all disabled:opacity-50"
                  disabled={!!winner || !!cell}
                >
                  {cell}
                </button>
              ))}
            </div>
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


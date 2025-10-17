import { useState } from 'react'
import { Button } from '@/components/ui/button'

const initialBoard = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
]

export default function Chess({ mode, opponent, onBack }) {
  const [board, setBoard] = useState(initialBoard)
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState('white')
  const [gameStatus, setGameStatus] = useState('playing')

  const whitePieces = ['♔', '♕', '♖', '♗', '♘', '♙']
  const blackPieces = ['♚', '♛', '♜', '♝', '♞', '♟']

  const isWhitePiece = (piece) => whitePieces.includes(piece)
  const isBlackPiece = (piece) => blackPieces.includes(piece)

  const handleSquareClick = (row, col) => {
    const piece = board[row][col]

    if (selectedSquare) {
      // Try to move
      const [selectedRow, selectedCol] = selectedSquare
      const selectedPiece = board[selectedRow][selectedCol]

      // Check if it's a valid move (simplified - just check if target is empty or enemy)
      const isValidMove = 
        (piece === '') || 
        (currentPlayer === 'white' && isBlackPiece(piece)) ||
        (currentPlayer === 'black' && isWhitePiece(piece))

      if (isValidMove) {
        const newBoard = board.map(row => [...row])
        newBoard[row][col] = selectedPiece
        newBoard[selectedRow][selectedCol] = ''
        setBoard(newBoard)
        setSelectedSquare(null)
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white')

        // Check for king capture (simplified win condition)
        if (piece === '♚' || piece === '♔') {
          setGameStatus(`${currentPlayer} wins!`)
        }
      } else {
        setSelectedSquare(null)
      }
    } else {
      // Select piece
      if (piece !== '') {
        const isPieceOwnedByCurrentPlayer = 
          (currentPlayer === 'white' && isWhitePiece(piece)) ||
          (currentPlayer === 'black' && isBlackPiece(piece))

        if (isPieceOwnedByCurrentPlayer) {
          setSelectedSquare([row, col])
        }
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <Button onClick={onBack} variant="outline" size="sm">← Back</Button>
          <h2 className="text-xl font-bold text-foreground">Chess</h2>
          <div className="text-sm text-muted-foreground">{mode === 'ai' ? 'vs AI' : `vs ${opponent}`}</div>
        </div>

        <div className="text-center mb-4">
          <p className="text-lg font-semibold text-foreground">
            {gameStatus === 'playing' 
              ? `${currentPlayer === 'white' ? 'White' : 'Black'}'s Turn`
              : gameStatus
            }
          </p>
        </div>

        <div className="inline-block mx-auto">
          <div className="grid grid-cols-8 gap-0 border-4 border-[#8b4513]">
            {board.map((row, rowIndex) => (
              row.map((piece, colIndex) => {
                const isLight = (rowIndex + colIndex) % 2 === 0
                const isSelected = selectedSquare && selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex

                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                    className={`w-16 h-16 flex items-center justify-center text-4xl transition-all ${
                      isLight ? 'bg-[#f0d9b5]' : 'bg-[#b58863]'
                    } ${isSelected ? 'ring-4 ring-primary' : ''} hover:opacity-80`}
                    disabled={gameStatus !== 'playing'}
                  >
                    {piece}
                  </button>
                )
              })
            ))}
          </div>
        </div>

        {gameStatus !== 'playing' && (
          <div className="mt-4 text-center">
            <Button 
              onClick={() => {
                setBoard(initialBoard)
                setCurrentPlayer('white')
                setGameStatus('playing')
                setSelectedSquare(null)
              }} 
              className="gradient-purple text-white"
            >
              Play Again
            </Button>
          </div>
        )}

        <p className="text-sm text-muted-foreground text-center mt-4">
          Click a piece to select it, then click a square to move. Simplified rules - capture the king to win!
        </p>
      </div>
    </div>
  )
}


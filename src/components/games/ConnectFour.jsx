import { useState } from 'react'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ROWS = 6
const COLS = 7

export default function ConnectFour({ mode, onBack, opponent }) {
  const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)))
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [winner, setWinner] = useState(null)
  const [winningCells, setWinningCells] = useState([])

  const checkWinner = (board, row, col, player) => {
    const directions = [
      [0, 1],   // horizontal
      [1, 0],   // vertical
      [1, 1],   // diagonal down-right
      [1, -1]   // diagonal down-left
    ]

    for (let [dr, dc] of directions) {
      let count = 1
      let cells = [[row, col]]
      
      // Check positive direction
      for (let i = 1; i < 4; i++) {
        const r = row + dr * i
        const c = col + dc * i
        if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
          count++
          cells.push([r, c])
        } else break
      }
      
      // Check negative direction
      for (let i = 1; i < 4; i++) {
        const r = row - dr * i
        const c = col - dc * i
        if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
          count++
          cells.push([r, c])
        } else break
      }
      
      if (count >= 4) {
        setWinningCells(cells)
        return true
      }
    }
    return false
  }

  const handleColumnClick = (col) => {
    if (winner) return
    
    // Find the lowest empty row in this column
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!board[row][col]) {
        const newBoard = board.map(r => [...r])
        newBoard[row][col] = currentPlayer
        setBoard(newBoard)
        
        if (checkWinner(newBoard, row, col, currentPlayer)) {
          setWinner(currentPlayer)
        } else {
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
          
          // AI move
          if (mode === 'ai' && currentPlayer === 1) {
            setTimeout(() => makeAIMove(newBoard), 500)
          }
        }
        break
      }
    }
  }

  const makeAIMove = (currentBoard) => {
    // Simple AI: find first available column
    for (let col = 0; col < COLS; col++) {
      for (let row = ROWS - 1; row >= 0; row--) {
        if (!currentBoard[row][col]) {
          const newBoard = currentBoard.map(r => [...r])
          newBoard[row][col] = 2
          setBoard(newBoard)
          
          if (checkWinner(newBoard, row, col, 2)) {
            setWinner(2)
          } else {
            setCurrentPlayer(1)
          }
          return
        }
      }
    }
  }

  const handleReset = () => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)))
    setCurrentPlayer(1)
    setWinner(null)
    setWinningCells([])
  }

  const isWinningCell = (row, col) => {
    return winningCells.some(([r, c]) => r === row && c === col)
  }

  return (
    <div className="text-center">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold text-foreground">Connect Four</h2>
        <Button onClick={handleReset} variant="outline" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {winner && (
        <div className="mb-4 p-4 gradient-purple rounded-xl text-white">
          <p className="text-xl font-bold">
            {winner === 1 ? 'You Win! 🎉' : mode === 'ai' ? 'AI Wins!' : `${opponent?.name || 'Player 2'} Wins!`}
          </p>
        </div>
      )}

      {!winner && (
        <div className="mb-4 p-3 bg-muted rounded-xl">
          <p className="text-foreground font-semibold">
            {currentPlayer === 1 ? 'Your Turn' : mode === 'ai' ? 'AI\'s Turn' : `${opponent?.name || 'Player 2'}\'s Turn`}
          </p>
        </div>
      )}

      <div className="inline-block bg-primary/10 p-4 rounded-2xl">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleColumnClick(colIndex)}
                disabled={winner || (mode === 'ai' && currentPlayer === 2)}
                className={`w-12 h-12 rounded-full transition-smooth ${
                  cell === 1
                    ? isWinningCell(rowIndex, colIndex)
                      ? 'bg-yellow-400 ring-4 ring-yellow-600'
                      : 'bg-red-500'
                    : cell === 2
                    ? isWinningCell(rowIndex, colIndex)
                      ? 'bg-yellow-400 ring-4 ring-yellow-600'
                      : 'bg-blue-500'
                    : 'bg-white hover:bg-gray-200'
                } ${!winner && !cell ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}


import { useState } from 'react'
import { RotateCcw, Volume2, VolumeX } from 'lucide-react'

export default function SpinnerWar({ onBack, playMode, selectedFriend }) {
  const [gameState, setGameState] = useState('setup')
  const [player1Position, setPlayer1Position] = useState({ x: 25, y: 50 })
  const [player2Position, setPlayer2Position] = useState({ x: 75, y: 50 })
  const [currentTurn, setCurrentTurn] = useState(1)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [gameLog, setGameLog] = useState([])

  const arenaWidth = 100
  const arenaHeight = 100
  const playerSize = 8
  const moveDistance = 15

  const startGame = () => {
    setGameState('playing')
    setPlayer1Position({ x: 25, y: 50 })
    setPlayer2Position({ x: 75, y: 50 })
    setCurrentTurn(1)
    setGameLog(['🎮 Game Started! Push your opponent out of the arena!'])
  }

  const movePlayer = (direction) => {
    let newPos = { ...player1Position }

    if (currentTurn === 1) {
      newPos = { ...player1Position }
      if (direction === 'left') newPos.x = Math.max(0, newPos.x - moveDistance)
      if (direction === 'right') newPos.x = Math.min(arenaWidth - playerSize, newPos.x + moveDistance)
      if (direction === 'up') newPos.y = Math.max(0, newPos.y - moveDistance)
      if (direction === 'down') newPos.y = Math.min(arenaHeight - playerSize, newPos.y + moveDistance)

      // Check collision with player 2
      if (checkCollision(newPos, player2Position)) {
        // Push player 2
        let p2NewPos = { ...player2Position }
        if (direction === 'left') p2NewPos.x = Math.min(arenaWidth - playerSize, p2NewPos.x + moveDistance)
        if (direction === 'right') p2NewPos.x = Math.max(0, p2NewPos.x - moveDistance)
        if (direction === 'up') p2NewPos.y = Math.min(arenaHeight - playerSize, p2NewPos.y + moveDistance)
        if (direction === 'down') p2NewPos.y = Math.max(0, p2NewPos.y - moveDistance)

        setPlayer2Position(p2NewPos)
        setGameLog([...gameLog, '💥 Player 1 pushed Player 2!'])

        // Check if player 2 is out
        if (p2NewPos.x < 0 || p2NewPos.x > arenaWidth - playerSize || p2NewPos.y < 0 || p2NewPos.y > arenaHeight - playerSize) {
          setGameState('finished')
          setGameLog([...gameLog, '🎉 Player 1 Wins! Player 2 is out of the arena!'])
          return
        }
      }

      setPlayer1Position(newPos)
    } else {
      newPos = { ...player2Position }
      if (direction === 'left') newPos.x = Math.max(0, newPos.x - moveDistance)
      if (direction === 'right') newPos.x = Math.min(arenaWidth - playerSize, newPos.x + moveDistance)
      if (direction === 'up') newPos.y = Math.max(0, newPos.y - moveDistance)
      if (direction === 'down') newPos.y = Math.min(arenaHeight - playerSize, newPos.y + moveDistance)

      // Check collision with player 1
      if (checkCollision(newPos, player1Position)) {
        // Push player 1
        let p1NewPos = { ...player1Position }
        if (direction === 'left') p1NewPos.x = Math.min(arenaWidth - playerSize, p1NewPos.x + moveDistance)
        if (direction === 'right') p1NewPos.x = Math.max(0, p1NewPos.x - moveDistance)
        if (direction === 'up') p1NewPos.y = Math.min(arenaHeight - playerSize, p1NewPos.y + moveDistance)
        if (direction === 'down') p1NewPos.y = Math.max(0, p1NewPos.y - moveDistance)

        setPlayer1Position(p1NewPos)
        setGameLog([...gameLog, '💥 Player 2 pushed Player 1!'])

        // Check if player 1 is out
        if (p1NewPos.x < 0 || p1NewPos.x > arenaWidth - playerSize || p1NewPos.y < 0 || p1NewPos.y > arenaHeight - playerSize) {
          setGameState('finished')
          setGameLog([...gameLog, '🎉 Player 2 Wins! Player 1 is out of the arena!'])
          return
        }
      }

      setPlayer2Position(newPos)
    }

    setCurrentTurn(currentTurn === 1 ? 2 : 1)
  }

  const checkCollision = (pos1, pos2) => {
    return (
      pos1.x < pos2.x + playerSize &&
      pos1.x + playerSize > pos2.x &&
      pos1.y < pos2.y + playerSize &&
      pos1.y + playerSize > pos2.y
    )
  }

  const resetGame = () => {
    setGameState('setup')
    setPlayer1Position({ x: 25, y: 50 })
    setPlayer2Position({ x: 75, y: 50 })
    setCurrentTurn(1)
    setGameLog([])
  }

  if (gameState === 'setup') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background to-muted">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl">🌪️</div>
          <h1 className="text-4xl font-bold text-foreground">Spinner War</h1>
          <p className="text-muted-foreground text-lg">
            {playMode === 'ai' ? 'Battle against AI' : playMode === 'friend' ? `Battle with ${selectedFriend?.name}` : 'Battle with online players'}
          </p>
          <p className="text-sm text-muted-foreground">
            Push your opponent out of the arena! Move strategically and use collision to your advantage.
          </p>
          <button
            onClick={startGame}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Start Battle
          </button>
          <button
            onClick={onBack}
            className="w-full py-3 px-4 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all"
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'playing') {
    return (
      <div className="w-full h-full flex flex-col bg-gradient-to-br from-background to-muted p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-center flex-1">
            <p className="text-2xl font-bold text-foreground">🌪️ Spinner War</p>
            <p className="text-sm text-muted-foreground">{currentTurn === 1 ? 'Player 1' : 'Player 2'}'s Turn</p>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* Arena */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <div
            className="relative bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 border-4 border-primary rounded-xl overflow-hidden"
            style={{ width: '300px', height: '300px' }}
          >
            {/* Player 1 */}
            <div
              className="absolute bg-gradient-to-br from-red-500 to-red-600 rounded-lg transition-all duration-200"
              style={{
                width: `${playerSize * 3}px`,
                height: `${playerSize * 3}px`,
                left: `${(player1Position.x / arenaWidth) * 300}px`,
                top: `${(player1Position.y / arenaHeight) * 300}px`,
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-white font-bold">P1</div>
            </div>

            {/* Player 2 */}
            <div
              className="absolute bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg transition-all duration-200"
              style={{
                width: `${playerSize * 3}px`,
                height: `${playerSize * 3}px`,
                left: `${(player2Position.x / arenaWidth) * 300}px`,
                top: `${(player2Position.y / arenaHeight) * 300}px`,
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-white font-bold">P2</div>
            </div>
          </div>
        </div>

        {/* Game Log */}
        <div className="bg-muted rounded-xl p-4 mb-6 max-h-24 overflow-y-auto">
          {gameLog.map((log, idx) => (
            <p key={idx} className="text-sm text-foreground">{log}</p>
          ))}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div />
          <button
            onClick={() => movePlayer('up')}
            className="py-3 px-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition-all"
          >
            ⬆️
          </button>
          <div />
          <button
            onClick={() => movePlayer('left')}
            className="py-3 px-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition-all"
          >
            ⬅️
          </button>
          <button
            onClick={() => movePlayer('down')}
            className="py-3 px-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition-all"
          >
            ⬇️
          </button>
          <button
            onClick={() => movePlayer('right')}
            className="py-3 px-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition-all"
          >
            ➡️
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'finished') {
    const winner = player1Position.x > 0 && player1Position.x < arenaWidth - playerSize && player1Position.y > 0 && player1Position.y < arenaHeight - playerSize ? 'Player 1' : 'Player 2'

    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background to-muted">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl">🏆</div>
          <h1 className="text-4xl font-bold text-foreground">Game Over!</h1>
          <div className="space-y-4 bg-muted rounded-xl p-6">
            <p className="text-2xl font-bold text-primary">{winner} Wins!</p>
            <p className="text-sm text-muted-foreground">Your opponent was pushed out of the arena!</p>
          </div>
          <button
            onClick={resetGame}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again
          </button>
          <button
            onClick={onBack}
            className="w-full py-3 px-4 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all"
          >
            Back to Games
          </button>
        </div>
      </div>
    )
  }
}


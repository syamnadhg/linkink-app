import { useState } from 'react'
import { RotateCcw, Volume2, VolumeX } from 'lucide-react'

export default function Minigolf({ onBack, playMode, selectedFriend }) {
  const [gameState, setGameState] = useState('setup')
  const [player1Holes, setPlayer1Holes] = useState({})
  const [player2Holes, setPlayer2Holes] = useState({})
  const [currentHole, setCurrentHole] = useState(1)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const totalHoles = 9
  const maxStrokes = 6

  const startGame = () => {
    setGameState('playing')
    setCurrentHole(1)
    setCurrentPlayer(1)
  }

  const recordStroke = (strokes) => {
    if (currentPlayer === 1) {
      setPlayer1Holes({ ...player1Holes, [currentHole]: strokes })
    } else {
      setPlayer2Holes({ ...player2Holes, [currentHole]: strokes })
    }

    if (currentPlayer === 1) {
      setCurrentPlayer(2)
    } else {
      if (currentHole === totalHoles) {
        setGameState('finished')
      } else {
        setCurrentHole(currentHole + 1)
        setCurrentPlayer(1)
      }
    }
  }

  const getPlayer1Score = () => Object.values(player1Holes).reduce((a, b) => a + b, 0)
  const getPlayer2Score = () => Object.values(player2Holes).reduce((a, b) => a + b, 0)

  const resetGame = () => {
    setGameState('setup')
    setPlayer1Holes({})
    setPlayer2Holes({})
    setCurrentHole(1)
    setCurrentPlayer(1)
  }

  if (gameState === 'setup') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background to-muted">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl">⛳</div>
          <h1 className="text-4xl font-bold text-foreground">Mini Golf</h1>
          <p className="text-muted-foreground text-lg">
            {playMode === 'ai' ? 'Play against AI' : playMode === 'friend' ? `Play with ${selectedFriend?.name}` : 'Play with online players'}
          </p>
          <p className="text-sm text-muted-foreground">
            Complete 9 holes in the fewest strokes. Each hole allows up to {maxStrokes} strokes.
          </p>
          <button
            onClick={startGame}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Start Game
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
            <p className="text-sm text-muted-foreground">Hole {currentHole}/{totalHoles}</p>
            <p className="text-2xl font-bold text-foreground">⛳ Mini Golf</p>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* Game Area */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 mb-6">
          <div className="bg-gradient-to-b from-green-100 to-green-50 dark:from-green-900 dark:to-green-800 rounded-2xl p-8 w-full max-w-md aspect-square flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl">⛳</div>
              <p className="text-lg font-semibold text-foreground">Hole {currentHole}</p>
              <p className="text-sm text-muted-foreground">
                {currentPlayer === 1 ? 'Player 1' : 'Player 2'}'s turn
              </p>
            </div>
          </div>

          {/* Stroke Selection */}
          <div className="w-full max-w-md">
            <p className="text-sm text-muted-foreground mb-3 text-center">Select strokes:</p>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((strokes) => (
                <button
                  key={strokes}
                  onClick={() => recordStroke(strokes)}
                  className="py-2 px-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition-all"
                >
                  {strokes}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Score Board */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-muted rounded-xl p-4 text-center">
            <p className="text-sm text-muted-foreground">Player 1</p>
            <p className="text-3xl font-bold text-foreground">{getPlayer1Score()}</p>
          </div>
          <div className="bg-muted rounded-xl p-4 text-center">
            <p className="text-sm text-muted-foreground">Player 2</p>
            <p className="text-3xl font-bold text-foreground">{getPlayer2Score()}</p>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === 'finished') {
    const player1Score = getPlayer1Score()
    const player2Score = getPlayer2Score()
    const winner = player1Score < player2Score ? 'Player 1' : player1Score > player2Score ? 'Player 2' : 'Tie'

    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background to-muted">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl">🏆</div>
          <h1 className="text-4xl font-bold text-foreground">Game Over!</h1>
          <div className="space-y-4 bg-muted rounded-xl p-6">
            <div>
              <p className="text-sm text-muted-foreground">Player 1 Score</p>
              <p className="text-3xl font-bold text-foreground">{player1Score}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Player 2 Score</p>
              <p className="text-3xl font-bold text-foreground">{player2Score}</p>
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-lg font-semibold text-primary">{winner} Wins! 🎉</p>
            </div>
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


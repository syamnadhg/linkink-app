import { useState, useEffect } from 'react'
import { RotateCcw, Volume2, VolumeX, Zap } from 'lucide-react'

export default function SwordDuels({ onBack, playMode, selectedFriend }) {
  const [gameState, setGameState] = useState('setup')
  const [player1Health, setPlayer1Health] = useState(100)
  const [player2Health, setPlayer2Health] = useState(100)
  const [currentTurn, setCurrentTurn] = useState(1)
  const [battleLog, setBattleLog] = useState([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [round, setRound] = useState(1)

  const startGame = () => {
    setGameState('playing')
    setPlayer1Health(100)
    setPlayer2Health(100)
    setCurrentTurn(1)
    setBattleLog(['⚔️ Battle Started!'])
    setRound(1)
  }

  const attack = (power) => {
    const damage = Math.floor(Math.random() * (power * 20 - power * 10 + 1)) + power * 10
    const isCrit = Math.random() > 0.7
    const finalDamage = isCrit ? Math.floor(damage * 1.5) : damage

    let newLog = [...battleLog]
    const attacker = currentTurn === 1 ? 'Player 1' : 'Player 2'
    const critText = isCrit ? ' 💥 CRITICAL HIT!' : ''
    newLog.push(`${attacker} attacks for ${finalDamage} damage${critText}`)

    if (currentTurn === 1) {
      const newHealth = Math.max(0, player2Health - finalDamage)
      setPlayer2Health(newHealth)
      if (newHealth <= 0) {
        setGameState('finished')
        newLog.push('⚔️ Player 1 Wins!')
        setBattleLog(newLog)
        return
      }
    } else {
      const newHealth = Math.max(0, player1Health - finalDamage)
      setPlayer1Health(newHealth)
      if (newHealth <= 0) {
        setGameState('finished')
        newLog.push('⚔️ Player 2 Wins!')
        setBattleLog(newLog)
        return
      }
    }

    setBattleLog(newLog)
    setCurrentTurn(currentTurn === 1 ? 2 : 1)
  }

  const defend = () => {
    const heal = Math.floor(Math.random() * 15) + 10
    let newLog = [...battleLog]
    const defender = currentTurn === 1 ? 'Player 1' : 'Player 2'
    newLog.push(`${defender} defends and heals ${heal} HP`)

    if (currentTurn === 1) {
      setPlayer1Health(Math.min(100, player1Health + heal))
    } else {
      setPlayer2Health(Math.min(100, player2Health + heal))
    }

    setBattleLog(newLog)
    setCurrentTurn(currentTurn === 1 ? 2 : 1)
  }

  const resetGame = () => {
    setGameState('setup')
    setPlayer1Health(100)
    setPlayer2Health(100)
    setCurrentTurn(1)
    setBattleLog([])
    setRound(1)
  }

  if (gameState === 'setup') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background to-muted">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl">⚔️</div>
          <h1 className="text-4xl font-bold text-foreground">Sword Duels</h1>
          <p className="text-muted-foreground text-lg">
            {playMode === 'ai' ? 'Duel against AI' : playMode === 'friend' ? `Duel with ${selectedFriend?.name}` : 'Duel with online players'}
          </p>
          <p className="text-sm text-muted-foreground">
            Battle your opponent to 0 HP. Choose to attack or defend each turn!
          </p>
          <button
            onClick={startGame}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Start Duel
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
            <p className="text-sm text-muted-foreground">Round {round}</p>
            <p className="text-2xl font-bold text-foreground">⚔️ Sword Duels</p>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* Health Bars */}
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex justify-between mb-2">
              <p className="font-semibold text-foreground">Player 1</p>
              <p className="text-sm text-muted-foreground">{player1Health} HP</p>
            </div>
            <div className="w-full bg-muted rounded-full h-6 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-500 to-red-600 h-full transition-all duration-300"
                style={{ width: `${player1Health}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <p className="font-semibold text-foreground">Player 2</p>
              <p className="text-sm text-muted-foreground">{player2Health} HP</p>
            </div>
            <div className="w-full bg-muted rounded-full h-6 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-300"
                style={{ width: `${player2Health}%` }}
              />
            </div>
          </div>
        </div>

        {/* Battle Log */}
        <div className="flex-1 bg-muted rounded-xl p-4 mb-6 overflow-y-auto">
          <div className="space-y-2">
            {battleLog.map((log, idx) => (
              <p key={idx} className="text-sm text-foreground">{log}</p>
            ))}
          </div>
        </div>

        {/* Current Turn */}
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-primary">
            {currentTurn === 1 ? 'Player 1' : 'Player 2'}'s Turn
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => attack(1)}
            className="py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            ⚔️ Light Attack
          </button>
          <button
            onClick={() => attack(2)}
            className="py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            💥 Heavy Attack
          </button>
          <button
            onClick={defend}
            className="py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all col-span-2"
          >
            🛡️ Defend
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'finished') {
    const winner = player1Health > 0 ? 'Player 1' : 'Player 2'

    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background to-muted">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl">👑</div>
          <h1 className="text-4xl font-bold text-foreground">Victory!</h1>
          <div className="space-y-4 bg-muted rounded-xl p-6">
            <p className="text-2xl font-bold text-primary">{winner} Wins!</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Player 1</p>
                <p className="text-2xl font-bold text-foreground">{player1Health} HP</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Player 2</p>
                <p className="text-2xl font-bold text-foreground">{player2Health} HP</p>
              </div>
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


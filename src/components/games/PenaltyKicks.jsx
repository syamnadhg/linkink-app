import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function PenaltyKicks({ mode, opponent, onBack }) {
  const [phase, setPhase] = useState('shoot') // 'shoot' or 'save'
  const [score, setScore] = useState({ player1: 0, player2: 0 })
  const [round, setRound] = useState(1)
  const [shootDirection, setShootDirection] = useState(null)
  const [saveDirection, setSaveDirection] = useState(null)
  const [result, setResult] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleShoot = (direction) => {
    if (isAnimating) return
    setShootDirection(direction)
    setIsAnimating(true)

    // AI goalkeeper
    setTimeout(() => {
      const aiSave = ['left', 'center', 'right'][Math.floor(Math.random() * 3)]
      setSaveDirection(aiSave)

      if (direction === aiSave) {
        setResult('saved')
      } else {
        setResult('goal')
        setScore(prev => ({ ...prev, player1: prev.player1 + 1 }))
      }

      setTimeout(() => {
        setPhase('save')
        setShootDirection(null)
        setSaveDirection(null)
        setResult(null)
        setIsAnimating(false)
      }, 2000)
    }, 500)
  }

  const handleSave = (direction) => {
    if (isAnimating) return
    setSaveDirection(direction)
    setIsAnimating(true)

    // AI shooter
    setTimeout(() => {
      const aiShoot = ['left', 'center', 'right'][Math.floor(Math.random() * 3)]
      setShootDirection(aiShoot)

      if (direction === aiShoot) {
        setResult('saved')
      } else {
        setResult('goal')
        setScore(prev => ({ ...prev, player2: prev.player2 + 1 }))
      }

      setTimeout(() => {
        if (round >= 5) {
          setPhase('finished')
        } else {
          setRound(round + 1)
          setPhase('shoot')
        }
        setShootDirection(null)
        setSaveDirection(null)
        setResult(null)
        setIsAnimating(false)
      }, 2000)
    }, 500)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <Button onClick={onBack} variant="outline" size="sm">← Back</Button>
          <h2 className="text-xl font-bold text-foreground">Penalty Kicks</h2>
          <div className="text-sm text-muted-foreground">{mode === 'ai' ? 'vs AI' : `vs ${opponent}`}</div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">You</p>
            <p className="text-3xl font-bold text-primary">{score.player1}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Round {round}/5</p>
            <p className="text-lg font-semibold text-foreground">
              {phase === 'shoot' ? 'Your Turn to Shoot' : 'Your Turn to Save'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{mode === 'ai' ? 'AI' : opponent}</p>
            <p className="text-3xl font-bold text-destructive">{score.player2}</p>
          </div>
        </div>

        {/* Goal Visualization */}
        <div className="relative bg-gradient-to-b from-green-600 to-green-700 rounded-lg p-8 mb-6 h-64">
          {/* Goal */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-64 h-32 border-4 border-white rounded-t-lg">
            {/* Net */}
            <div className="w-full h-full grid grid-cols-8 grid-rows-4">
              {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} className="border border-white/30" />
              ))}
            </div>

            {/* Ball */}
            {shootDirection && (
              <div 
                className={`absolute w-8 h-8 bg-white rounded-full shadow-lg transition-all duration-500 ${
                  result === 'goal' ? 'animate-bounce' : ''
                }`}
                style={{
                  left: shootDirection === 'left' ? '10%' : shootDirection === 'right' ? '80%' : '45%',
                  top: result === 'goal' ? '40%' : '70%'
                }}
              >
                ⚽
              </div>
            )}

            {/* Goalkeeper */}
            {saveDirection && (
              <div 
                className="absolute bottom-0 w-12 h-16 bg-yellow-400 rounded-t-lg transition-all duration-500 flex items-center justify-center text-2xl"
                style={{
                  left: saveDirection === 'left' ? '10%' : saveDirection === 'right' ? '80%' : '45%'
                }}
              >
                🧤
              </div>
            )}
          </div>

          {/* Result Message */}
          {result && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white animate-pulse">
              {result === 'goal' ? '⚽ GOAL!' : '🧤 SAVED!'}
            </div>
          )}
        </div>

        {/* Controls */}
        {phase === 'shoot' && !isAnimating && (
          <div className="space-y-3">
            <p className="text-center text-sm text-muted-foreground mb-2">Choose where to shoot:</p>
            <div className="grid grid-cols-3 gap-3">
              <Button onClick={() => handleShoot('left')} className="gradient-purple text-white py-6">
                ← Left
              </Button>
              <Button onClick={() => handleShoot('center')} className="gradient-purple text-white py-6">
                Center
              </Button>
              <Button onClick={() => handleShoot('right')} className="gradient-purple text-white py-6">
                Right →
              </Button>
            </div>
          </div>
        )}

        {phase === 'save' && !isAnimating && (
          <div className="space-y-3">
            <p className="text-center text-sm text-muted-foreground mb-2">Choose where to dive:</p>
            <div className="grid grid-cols-3 gap-3">
              <Button onClick={() => handleSave('left')} className="bg-yellow-500 hover:bg-yellow-600 text-white py-6">
                ← Dive Left
              </Button>
              <Button onClick={() => handleSave('center')} className="bg-yellow-500 hover:bg-yellow-600 text-white py-6">
                Stay Center
              </Button>
              <Button onClick={() => handleSave('right')} className="bg-yellow-500 hover:bg-yellow-600 text-white py-6">
                Dive Right →
              </Button>
            </div>
          </div>
        )}

        {phase === 'finished' && (
          <div className="text-center space-y-4">
            <p className="text-3xl font-bold text-foreground">
              {score.player1 > score.player2 ? 'You Win! 🏆' : score.player1 < score.player2 ? 'You Lose! 😢' : "It's a Tie! 🤝"}
            </p>
            <Button 
              onClick={() => {
                setScore({ player1: 0, player2: 0 })
                setRound(1)
                setPhase('shoot')
              }} 
              className="gradient-purple text-white"
            >
              Play Again
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}


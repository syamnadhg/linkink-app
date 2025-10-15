import { useState, useEffect } from 'react'
import { ArrowLeft, RotateCcw, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function QuickMath({ mode, onBack, opponent }) {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [question, setQuestion] = useState(null)
  const [answer, setAnswer] = useState('')
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameOver(true)
      setGameStarted(false)
    }
  }, [gameStarted, timeLeft])

  const generateQuestion = () => {
    const operations = ['+', '-', '×']
    const operation = operations[Math.floor(Math.random() * operations.length)]
    let num1, num2, correctAnswer
    
    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 50) + 1
        num2 = Math.floor(Math.random() * 50) + 1
        correctAnswer = num1 + num2
        break
      case '-':
        num1 = Math.floor(Math.random() * 50) + 20
        num2 = Math.floor(Math.random() * 20) + 1
        correctAnswer = num1 - num2
        break
      case '×':
        num1 = Math.floor(Math.random() * 12) + 1
        num2 = Math.floor(Math.random() * 12) + 1
        correctAnswer = num1 * num2
        break
    }
    
    return { num1, num2, operation, correctAnswer }
  }

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setTimeLeft(60)
    setStreak(0)
    setAnswer('')
    setQuestion(generateQuestion())
  }

  const handleSubmit = () => {
    if (!answer) return
    
    const userAnswer = parseInt(answer)
    if (userAnswer === question.correctAnswer) {
      const points = streak >= 5 ? 15 : streak >= 3 ? 12 : 10
      setScore(score + points)
      setStreak(streak + 1)
    } else {
      setStreak(0)
    }
    
    setAnswer('')
    setQuestion(generateQuestion())
  }

  return (
    <div className="text-center max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold text-foreground">Quick Math</h2>
        <Button onClick={startGame} variant="outline" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          {gameStarted ? 'Restart' : 'Start'}
        </Button>
      </div>

      {!gameStarted && !gameOver && (
        <div className="space-y-6 py-8">
          <div className="w-32 h-32 mx-auto gradient-purple rounded-full flex items-center justify-center">
            <span className="text-6xl">🧮</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Ready to test your math skills?</h3>
            <p className="text-muted-foreground">Solve as many problems as you can in 60 seconds!</p>
          </div>
          <Button onClick={startGame} size="lg" className="gradient-purple text-white">
            Start Game
          </Button>
        </div>
      )}

      {gameStarted && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-muted rounded-xl p-4">
            <div>
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-2xl font-bold text-foreground">{score}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="text-2xl font-bold text-primary flex items-center">
                <Clock className="w-5 h-5 mr-1" />
                {timeLeft}s
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Streak</p>
              <p className="text-2xl font-bold text-foreground">{streak} 🔥</p>
            </div>
          </div>

          {question && (
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <p className="text-5xl font-bold text-foreground mb-6">
                {question.num1} {question.operation} {question.num2} = ?
              </p>
              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Your answer"
                autoFocus
                className="w-full px-6 py-4 bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-center text-3xl font-bold"
              />
              <Button
                onClick={handleSubmit}
                className="w-full mt-4 gradient-purple text-white text-lg py-6"
              >
                Submit
              </Button>
            </div>
          )}

          {streak >= 3 && (
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-3">
              <p className="text-yellow-800 font-semibold">
                🔥 {streak} streak! Bonus points active!
              </p>
            </div>
          )}
        </div>
      )}

      {gameOver && (
        <div className="space-y-6 py-8">
          <div className="gradient-purple rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Game Over!</h3>
            <p className="text-5xl font-bold mb-2">{score}</p>
            <p className="text-lg">Final Score</p>
          </div>
          <Button onClick={startGame} size="lg" className="w-full gradient-purple text-white">
            Play Again
          </Button>
        </div>
      )}
    </div>
  )
}


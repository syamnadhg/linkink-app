import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function RacingCars({ mode, opponent, onBack }) {
  const canvasRef = useRef(null)
  const [raceFinished, setRaceFinished] = useState(false)
  const [winner, setWinner] = useState(null)
  const [countdown, setCountdown] = useState(3)
  const [raceStarted, setRaceStarted] = useState(false)
  
  const gameRef = useRef({
    car1: { x: 100, y: 300, speed: 0, lane: 1 },
    car2: { x: 100, y: 200, speed: 0, lane: 0 },
    keys: {},
    obstacles: [],
    finishLine: 3000
  })

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setRaceStarted(true)
          clearInterval(countdownTimer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(countdownTimer)
  }, [])

  useEffect(() => {
    if (!raceStarted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const game = gameRef.current

    const handleKeyDown = (e) => {
      game.keys[e.key] = true
    }

    const handleKeyUp = (e) => {
      game.keys[e.key] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Generate obstacles
    for (let i = 0; i < 10; i++) {
      game.obstacles.push({
        x: 500 + i * 400,
        lane: Math.floor(Math.random() * 3)
      })
    }

    const gameLoop = setInterval(() => {
      // Player 1 controls (Arrow keys)
      if (game.keys['ArrowUp']) {
        game.car1.speed = Math.min(game.car1.speed + 0.5, 8)
      } else {
        game.car1.speed = Math.max(game.car1.speed - 0.3, 0)
      }

      if (game.keys['ArrowLeft'] && game.car1.lane > 0) {
        game.car1.lane--
        game.keys['ArrowLeft'] = false
      }
      if (game.keys['ArrowRight'] && game.car1.lane < 2) {
        game.car1.lane++
        game.keys['ArrowRight'] = false
      }

      // Player 2 / AI controls (WASD)
      if (mode === 'ai') {
        // Simple AI
        game.car2.speed = 6 + Math.random()
        
        // Avoid obstacles
        const nearestObstacle = game.obstacles.find(obs => 
          obs.x > game.car2.x && obs.x < game.car2.x + 200
        )
        if (nearestObstacle && nearestObstacle.lane === game.car2.lane) {
          if (game.car2.lane > 0 && Math.random() > 0.5) {
            game.car2.lane--
          } else if (game.car2.lane < 2) {
            game.car2.lane++
          }
        }
      } else {
        if (game.keys['w']) {
          game.car2.speed = Math.min(game.car2.speed + 0.5, 8)
        } else {
          game.car2.speed = Math.max(game.car2.speed - 0.3, 0)
        }

        if (game.keys['a'] && game.car2.lane > 0) {
          game.car2.lane--
          game.keys['a'] = false
        }
        if (game.keys['d'] && game.car2.lane < 2) {
          game.car2.lane++
          game.keys['d'] = false
        }
      }

      // Update positions
      game.car1.x += game.car1.speed
      game.car2.x += game.car2.speed

      // Smooth lane transitions
      const targetY1 = 100 + game.car1.lane * 100
      const targetY2 = 100 + game.car2.lane * 100
      game.car1.y += (targetY1 - game.car1.y) * 0.2
      game.car2.y += (targetY2 - game.car2.y) * 0.2

      // Check collisions with obstacles
      game.obstacles.forEach(obs => {
        if (Math.abs(obs.x - game.car1.x) < 50 && obs.lane === Math.round((game.car1.y - 100) / 100)) {
          game.car1.speed *= 0.5
        }
        if (Math.abs(obs.x - game.car2.x) < 50 && obs.lane === Math.round((game.car2.y - 100) / 100)) {
          game.car2.speed *= 0.5
        }
      })

      // Check finish
      if (game.car1.x >= game.finishLine && !raceFinished) {
        setRaceFinished(true)
        setWinner('Player 1')
      }
      if (game.car2.x >= game.finishLine && !raceFinished) {
        setRaceFinished(true)
        setWinner(mode === 'ai' ? 'AI' : 'Player 2')
      }

      draw(ctx)
    }, 1000 / 60)

    function draw(ctx) {
      // Sky
      ctx.fillStyle = '#87CEEB'
      ctx.fillRect(0, 0, 600, 400)

      // Road
      ctx.fillStyle = '#444'
      ctx.fillRect(0, 50, 600, 300)

      // Lane lines
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 3
      ctx.setLineDash([20, 20])
      ctx.beginPath()
      ctx.moveTo(0, 150)
      ctx.lineTo(600, 150)
      ctx.moveTo(0, 250)
      ctx.lineTo(600, 250)
      ctx.stroke()
      ctx.setLineDash([])

      // Grass
      ctx.fillStyle = '#228B22'
      ctx.fillRect(0, 0, 600, 50)
      ctx.fillRect(0, 350, 600, 50)

      // Obstacles (relative to camera)
      const camera1X = game.car1.x - 150
      const camera2X = game.car2.x - 150

      game.obstacles.forEach(obs => {
        const screenX1 = obs.x - camera1X
        const screenX2 = obs.x - camera2X
        const y = 100 + obs.lane * 100

        if (screenX1 > -50 && screenX1 < 650) {
          ctx.fillStyle = '#ff6b6b'
          ctx.fillRect(screenX1, y - 15, 40, 30)
        }
      })

      // Finish line
      const finishX1 = game.finishLine - camera1X
      if (finishX1 > -50 && finishX1 < 650) {
        ctx.fillStyle = '#000'
        ctx.fillRect(finishX1, 50, 10, 300)
        ctx.fillStyle = '#fff'
        for (let i = 0; i < 6; i++) {
          ctx.fillRect(finishX1, 50 + i * 100, 10, 50)
        }
      }

      // Car 1 (Player 1)
      ctx.fillStyle = '#4ecdc4'
      ctx.fillRect(145, game.car1.y - 15, 50, 30)
      ctx.fillStyle = '#fff'
      ctx.fillRect(150, game.car1.y - 10, 15, 20)

      // Car 2 (Player 2 / AI)
      ctx.fillStyle = '#ff6b6b'
      ctx.fillRect(145, game.car2.y - 15, 50, 30)
      ctx.fillStyle = '#fff'
      ctx.fillRect(150, game.car2.y - 10, 15, 20)

      // Progress bar
      const progress1 = (game.car1.x / game.finishLine) * 100
      const progress2 = (game.car2.x / game.finishLine) * 100

      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(10, 10, 200, 30)
      ctx.fillStyle = '#4ecdc4'
      ctx.fillRect(10, 10, progress1 * 2, 15)
      ctx.fillStyle = '#ff6b6b'
      ctx.fillRect(10, 25, progress2 * 2, 15)
    }

    return () => {
      clearInterval(gameLoop)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [raceStarted, raceFinished, mode])

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <Button onClick={onBack} variant="outline" size="sm">← Back</Button>
          <h2 className="text-xl font-bold text-foreground">Racing Cars</h2>
          <div className="text-sm text-muted-foreground">{mode === 'ai' ? 'vs AI' : `vs ${opponent}`}</div>
        </div>

        {countdown > 0 && (
          <div className="text-center mb-4">
            <p className="text-6xl font-bold text-primary animate-pulse">{countdown}</p>
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="w-full border-2 border-border rounded-lg"
        />

        {raceFinished && (
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-foreground mb-2">
              {winner} Wins! 🏁
            </p>
            <Button onClick={() => window.location.reload()} className="gradient-purple text-white">
              Race Again
            </Button>
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="bg-muted rounded-lg p-3">
            <p className="font-semibold text-foreground mb-2">Player 1 (Cyan)</p>
            <p className="text-muted-foreground">↑ Accelerate</p>
            <p className="text-muted-foreground">← → Change Lane</p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <p className="font-semibold text-foreground mb-2">Player 2 (Red)</p>
            <p className="text-muted-foreground">W Accelerate</p>
            <p className="text-muted-foreground">A D Change Lane</p>
          </div>
        </div>
      </div>
    </div>
  )
}


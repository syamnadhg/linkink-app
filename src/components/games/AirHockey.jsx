import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'

export default function AirHockey({ mode, opponent, onBack }) {
  const canvasRef = useRef(null)
  const [score, setScore] = useState({ player1: 0, player2: 0 })
  const [gameState, setGameState] = useState('playing')
  const gameRef = useRef({
    puck: { x: 300, y: 200, vx: 3, vy: 2, radius: 12 },
    paddle1: { x: 300, y: 350, radius: 25 },
    paddle2: { x: 300, y: 50, radius: 25 },
    mousePos: { x: 300, y: 350 }
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const game = gameRef.current

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      game.mousePos.x = e.clientX - rect.left
      game.mousePos.y = e.clientY - rect.top
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      game.mousePos.x = touch.clientX - rect.left
      game.mousePos.y = touch.clientY - rect.top
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })

    const gameLoop = setInterval(() => {
      // Update paddle position
      const dx = game.mousePos.x - game.paddle1.x
      const dy = game.mousePos.y - game.paddle1.y
      game.paddle1.x += dx * 0.15
      game.paddle1.y += dy * 0.15

      // Keep paddle in bottom half
      if (game.paddle1.y < 220) game.paddle1.y = 220
      if (game.paddle1.x < game.paddle1.radius) game.paddle1.x = game.paddle1.radius
      if (game.paddle1.x > 600 - game.paddle1.radius) game.paddle1.x = 600 - game.paddle1.radius

      // AI or Player 2 paddle
      if (mode === 'ai') {
        const targetX = game.puck.x
        game.paddle2.x += (targetX - game.paddle2.x) * 0.08
        if (game.paddle2.y > 180) game.paddle2.y = 180
      }

      // Keep paddle2 in top half
      if (game.paddle2.y > 180) game.paddle2.y = 180
      if (game.paddle2.x < game.paddle2.radius) game.paddle2.x = game.paddle2.radius
      if (game.paddle2.x > 600 - game.paddle2.radius) game.paddle2.x = 600 - game.paddle2.radius

      // Update puck position
      game.puck.x += game.puck.vx
      game.puck.y += game.puck.vy

      // Wall collisions
      if (game.puck.x - game.puck.radius < 0 || game.puck.x + game.puck.radius > 600) {
        game.puck.vx *= -1
      }

      // Goal detection
      if (game.puck.y - game.puck.radius < 0) {
        setScore(prev => ({ ...prev, player1: prev.player1 + 1 }))
        resetPuck()
      }
      if (game.puck.y + game.puck.radius > 400) {
        setScore(prev => ({ ...prev, player2: prev.player2 + 1 }))
        resetPuck()
      }

      // Paddle collisions
      checkPaddleCollision(game.paddle1)
      checkPaddleCollision(game.paddle2)

      // Draw
      draw(ctx)
    }, 1000 / 60)

    function resetPuck() {
      game.puck.x = 300
      game.puck.y = 200
      game.puck.vx = (Math.random() - 0.5) * 4
      game.puck.vy = (Math.random() - 0.5) * 4
    }

    function checkPaddleCollision(paddle) {
      const dx = game.puck.x - paddle.x
      const dy = game.puck.y - paddle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < game.puck.radius + paddle.radius) {
        const angle = Math.atan2(dy, dx)
        const speed = Math.sqrt(game.puck.vx * game.puck.vx + game.puck.vy * game.puck.vy)
        game.puck.vx = Math.cos(angle) * speed * 1.1
        game.puck.vy = Math.sin(angle) * speed * 1.1

        // Prevent puck from getting stuck
        const overlap = game.puck.radius + paddle.radius - distance
        game.puck.x += Math.cos(angle) * overlap
        game.puck.y += Math.sin(angle) * overlap
      }
    }

    function draw(ctx) {
      // Clear canvas
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(0, 0, 600, 400)

      // Center line
      ctx.strokeStyle = '#444'
      ctx.lineWidth = 2
      ctx.setLineDash([10, 10])
      ctx.beginPath()
      ctx.moveTo(0, 200)
      ctx.lineTo(600, 200)
      ctx.stroke()
      ctx.setLineDash([])

      // Goals
      ctx.fillStyle = '#ff6b6b'
      ctx.fillRect(250, 0, 100, 5)
      ctx.fillStyle = '#4ecdc4'
      ctx.fillRect(250, 395, 100, 5)

      // Center circle
      ctx.strokeStyle = '#444'
      ctx.beginPath()
      ctx.arc(300, 200, 50, 0, Math.PI * 2)
      ctx.stroke()

      // Puck
      ctx.fillStyle = '#ffd93d'
      ctx.beginPath()
      ctx.arc(game.puck.x, game.puck.y, game.puck.radius, 0, Math.PI * 2)
      ctx.fill()

      // Paddles
      ctx.fillStyle = '#4ecdc4'
      ctx.beginPath()
      ctx.arc(game.paddle1.x, game.paddle1.y, game.paddle1.radius, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#ff6b6b'
      ctx.beginPath()
      ctx.arc(game.paddle2.x, game.paddle2.y, game.paddle2.radius, 0, Math.PI * 2)
      ctx.fill()
    }

    return () => {
      clearInterval(gameLoop)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleTouchMove)
    }
  }, [mode])

  useEffect(() => {
    if (score.player1 >= 7 || score.player2 >= 7) {
      setGameState('finished')
    }
  }, [score])

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <Button onClick={onBack} variant="outline" size="sm">← Back</Button>
          <h2 className="text-xl font-bold text-foreground">Air Hockey</h2>
          <div className="text-sm text-muted-foreground">{mode === 'ai' ? 'vs AI' : `vs ${opponent}`}</div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">You</p>
            <p className="text-3xl font-bold text-primary">{score.player1}</p>
          </div>
          <div className="text-2xl font-bold text-muted-foreground">-</div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{mode === 'ai' ? 'AI' : opponent}</p>
            <p className="text-3xl font-bold text-destructive">{score.player2}</p>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="w-full border-2 border-border rounded-lg cursor-none"
        />

        {gameState === 'finished' && (
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-foreground mb-2">
              {score.player1 > score.player2 ? 'You Win! 🎉' : 'You Lose! 😢'}
            </p>
            <Button onClick={() => {
              setScore({ player1: 0, player2: 0 })
              setGameState('playing')
            }} className="gradient-purple text-white">
              Play Again
            </Button>
          </div>
        )}

        <p className="text-sm text-muted-foreground text-center mt-4">
          Move your mouse/finger to control the paddle. First to 7 wins!
        </p>
      </div>
    </div>
  )
}


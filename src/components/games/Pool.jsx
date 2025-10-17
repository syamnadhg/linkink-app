import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'

export default function Pool({ mode, opponent, onBack }) {
  const canvasRef = useRef(null)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [score, setScore] = useState({ player1: 0, player2: 0 })
  const [gameState, setGameState] = useState('aiming')
  const [power, setPower] = useState(0)
  const [angle, setAngle] = useState(0)
  
  const gameRef = useRef({
    balls: [
      { x: 200, y: 200, vx: 0, vy: 0, radius: 10, color: '#fff', type: 'cue' },
      { x: 400, y: 200, vx: 0, vy: 0, radius: 10, color: '#ff6b6b', type: 'solid', id: 1 },
      { x: 420, y: 190, vx: 0, vy: 0, radius: 10, color: '#4ecdc4', type: 'solid', id: 2 },
      { x: 420, y: 210, vx: 0, vy: 0, radius: 10, color: '#ffd93d', type: 'solid', id: 3 },
      { x: 440, y: 180, vx: 0, vy: 0, radius: 10, color: '#a8e6cf', type: 'solid', id: 4 },
      { x: 440, y: 200, vx: 0, vy: 0, radius: 10, color: '#ff8b94', type: 'solid', id: 5 },
      { x: 440, y: 220, vx: 0, vy: 0, radius: 10, color: '#c7ceea', type: 'solid', id: 6 },
    ],
    pockets: [
      { x: 20, y: 20 }, { x: 300, y: 20 }, { x: 580, y: 20 },
      { x: 20, y: 380 }, { x: 300, y: 380 }, { x: 580, y: 380 }
    ],
    mousePos: { x: 0, y: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 }
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

      if (gameState === 'aiming') {
        const cueBall = game.balls[0]
        const dx = game.mousePos.x - cueBall.x
        const dy = game.mousePos.y - cueBall.y
        setAngle(Math.atan2(dy, dx))
      }
    }

    const handleMouseDown = (e) => {
      if (gameState === 'aiming') {
        const rect = canvas.getBoundingClientRect()
        game.dragStart.x = e.clientX - rect.left
        game.dragStart.y = e.clientY - rect.top
        game.isDragging = true
      }
    }

    const handleMouseUp = (e) => {
      if (game.isDragging && gameState === 'aiming') {
        const rect = canvas.getBoundingClientRect()
        const endX = e.clientX - rect.left
        const endY = e.clientY - rect.top
        const dx = game.dragStart.x - endX
        const dy = game.dragStart.y - endY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const shootPower = Math.min(distance / 5, 15)
        
        shootBall(shootPower)
        game.isDragging = false
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)

    const gameLoop = setInterval(() => {
      updatePhysics()
      draw(ctx)
    }, 1000 / 60)

    function shootBall(shootPower) {
      const cueBall = game.balls[0]
      cueBall.vx = Math.cos(angle) * shootPower
      cueBall.vy = Math.sin(angle) * shootPower
      setGameState('shooting')
    }

    function updatePhysics() {
      let allStopped = true

      game.balls.forEach((ball, i) => {
        if (ball.vx !== 0 || ball.vy !== 0) {
          allStopped = false

          // Update position
          ball.x += ball.vx
          ball.y += ball.vy

          // Friction
          ball.vx *= 0.98
          ball.vy *= 0.98

          // Stop if very slow
          if (Math.abs(ball.vx) < 0.1) ball.vx = 0
          if (Math.abs(ball.vy) < 0.1) ball.vy = 0

          // Wall collisions
          if (ball.x - ball.radius < 20 || ball.x + ball.radius > 580) {
            ball.vx *= -0.8
            ball.x = ball.x < 300 ? 20 + ball.radius : 580 - ball.radius
          }
          if (ball.y - ball.radius < 20 || ball.y + ball.radius > 380) {
            ball.vy *= -0.8
            ball.y = ball.y < 200 ? 20 + ball.radius : 380 - ball.radius
          }

          // Check pockets
          game.pockets.forEach(pocket => {
            const dx = ball.x - pocket.x
            const dy = ball.y - pocket.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 20 && ball.type !== 'cue') {
              // Ball pocketed
              ball.x = -100
              ball.y = -100
              ball.vx = 0
              ball.vy = 0
              
              if (currentPlayer === 1) {
                setScore(prev => ({ ...prev, player1: prev.player1 + 1 }))
              } else {
                setScore(prev => ({ ...prev, player2: prev.player2 + 1 }))
              }
            }
          })
        }

        // Ball collisions
        game.balls.forEach((other, j) => {
          if (i !== j && ball.x > 0 && other.x > 0) {
            const dx = other.x - ball.x
            const dy = other.y - ball.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < ball.radius + other.radius) {
              const angle = Math.atan2(dy, dx)
              const sin = Math.sin(angle)
              const cos = Math.cos(angle)

              // Rotate velocities
              const vx1 = ball.vx * cos + ball.vy * sin
              const vy1 = ball.vy * cos - ball.vx * sin
              const vx2 = other.vx * cos + other.vy * sin
              const vy2 = other.vy * cos - other.vx * sin

              // Collision response
              const tempVx1 = vx2
              const tempVx2 = vx1

              // Rotate back
              ball.vx = tempVx1 * cos - vy1 * sin
              ball.vy = vy1 * cos + tempVx1 * sin
              other.vx = tempVx2 * cos - vy2 * sin
              other.vy = vy2 * cos + tempVx2 * sin

              // Separate balls
              const overlap = ball.radius + other.radius - distance
              ball.x -= Math.cos(angle) * overlap / 2
              ball.y -= Math.sin(angle) * overlap / 2
              other.x += Math.cos(angle) * overlap / 2
              other.y += Math.sin(angle) * overlap / 2
            }
          }
        })
      })

      if (allStopped && gameState === 'shooting') {
        setGameState('aiming')
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
      }
    }

    function draw(ctx) {
      // Table
      ctx.fillStyle = '#2a5934'
      ctx.fillRect(0, 0, 600, 400)

      // Rails
      ctx.fillStyle = '#8b4513'
      ctx.fillRect(0, 0, 600, 20)
      ctx.fillRect(0, 380, 600, 20)
      ctx.fillRect(0, 0, 20, 400)
      ctx.fillRect(580, 0, 20, 400)

      // Pockets
      ctx.fillStyle = '#000'
      game.pockets.forEach(pocket => {
        ctx.beginPath()
        ctx.arc(pocket.x, pocket.y, 15, 0, Math.PI * 2)
        ctx.fill()
      })

      // Balls
      game.balls.forEach(ball => {
        if (ball.x > 0) {
          ctx.fillStyle = ball.color
          ctx.beginPath()
          ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
          ctx.fill()
          ctx.strokeStyle = '#000'
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })

      // Aiming line
      if (gameState === 'aiming') {
        const cueBall = game.balls[0]
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(cueBall.x, cueBall.y)
        ctx.lineTo(
          cueBall.x + Math.cos(angle) * 100,
          cueBall.y + Math.sin(angle) * 100
        )
        ctx.stroke()
        ctx.setLineDash([])
      }
    }

    return () => {
      clearInterval(gameLoop)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseup', handleMouseUp)
    }
  }, [gameState, angle, currentPlayer, mode])

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <Button onClick={onBack} variant="outline" size="sm">← Back</Button>
          <h2 className="text-xl font-bold text-foreground">Pool</h2>
          <div className="text-sm text-muted-foreground">{mode === 'ai' ? 'vs AI' : `vs ${opponent}`}</div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className={`text-center p-3 rounded-lg ${currentPlayer === 1 ? 'bg-primary/20' : 'bg-muted'}`}>
            <p className="text-sm text-muted-foreground">Player 1</p>
            <p className="text-2xl font-bold text-primary">{score.player1}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            {gameState === 'aiming' ? `Player ${currentPlayer}'s turn` : 'Shooting...'}
          </div>
          <div className={`text-center p-3 rounded-lg ${currentPlayer === 2 ? 'bg-destructive/20' : 'bg-muted'}`}>
            <p className="text-sm text-muted-foreground">Player 2</p>
            <p className="text-2xl font-bold text-destructive">{score.player2}</p>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="w-full border-4 border-[#8b4513] rounded-lg"
        />

        <p className="text-sm text-muted-foreground text-center mt-4">
          Aim with your mouse, click and drag to shoot. Pot all the balls!
        </p>
      </div>
    </div>
  )
}


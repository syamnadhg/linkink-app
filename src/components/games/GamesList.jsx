import { Gamepad2 } from 'lucide-react'

export default function GamesList({ games, onSelectGame }) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Choose a Game</h2>
        <p className="text-white/80 text-lg">
          Play with your matches or practice against AI
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => onSelectGame(game)}
            className="bg-white/20 hover:bg-white/30 rounded-xl p-8 transition-all group"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
              {game.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
            <p className="text-white/70">{game.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-8 bg-white/20 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center">
          <Gamepad2 className="w-5 h-5 mr-2" />
          Features
        </h3>
        <ul className="space-y-2 text-white/80">
          <li>• Play against AI to practice</li>
          <li>• Challenge your matches and friends</li>
          <li>• Chat while playing to bond</li>
          <li>• Voice chat available during games</li>
        </ul>
      </div>
    </div>
  )
}


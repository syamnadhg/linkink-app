import { useState } from 'react'
import { Heart, X, MessageCircle, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DirectMatching({ filters }) {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Alex",
      age: 25,
      bio: "Coffee enthusiast, bookworm, and adventure seeker. Looking for meaningful connections.",
      interests: "long-term",
      location: "New York",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Jordan",
      age: 28,
      bio: "Fitness lover, foodie, and travel addict. Let's explore the world together!",
      interests: "casual",
      location: "Los Angeles",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Sam",
      age: 26,
      bio: "Artist by day, gamer by night. Looking for someone to share creative moments with.",
      interests: "friendship",
      location: "Chicago",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    }
  ])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState([])

  const handleLike = () => {
    const likedProfile = profiles[currentIndex]
    setMatches([...matches, likedProfile])
    alert(`It's a match with ${likedProfile.name}! 🎉`)
    nextProfile()
  }

  const handlePass = () => {
    nextProfile()
  }

  const nextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const currentProfile = profiles[currentIndex]

  return (
    <div className="max-w-2xl mx-auto">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative h-96">
          <img
            src={currentProfile.image}
            alt={currentProfile.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h2 className="text-3xl font-bold text-white">
              {currentProfile.name}, {currentProfile.age}
            </h2>
            <div className="flex items-center text-white/80 mt-2">
              <MapPin className="w-4 h-4 mr-1" />
              {currentProfile.location}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700 text-lg mb-4">{currentProfile.bio}</p>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
              {currentProfile.interests}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 p-6 bg-gray-50">
          <Button
            onClick={handlePass}
            size="lg"
            className="bg-white border-2 border-gray-300 text-gray-600 hover:bg-gray-100 rounded-full w-16 h-16"
          >
            <X className="w-8 h-8" />
          </Button>
          <Button
            onClick={handleLike}
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 rounded-full w-16 h-16"
          >
            <Heart className="w-8 h-8" />
          </Button>
        </div>
      </div>

      {/* Matches Section */}
      {matches.length > 0 && (
        <div className="mt-8 bg-white/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Your Matches ({matches.length})</h3>
          <div className="grid grid-cols-3 gap-4">
            {matches.map((match) => (
              <div key={match.id} className="relative group cursor-pointer">
                <img
                  src={match.image}
                  alt={match.name}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


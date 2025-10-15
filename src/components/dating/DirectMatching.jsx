import { useState } from 'react'
import { Heart, X, MapPin, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockUsers, filterUsers } from '../../data/users'

export default function DirectMatching({ filters, onMatch }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showInfo, setShowInfo] = useState(false)

  const filteredUsers = filterUsers(mockUsers, filters)
  const currentProfile = filteredUsers[currentIndex]

  const handleLike = () => {
    if (currentProfile) {
      onMatch(currentProfile)
      alert(`It's a match with ${currentProfile.name}! 🎉 Check your chat space to start talking.`)
    }
    nextProfile()
  }

  const handlePass = () => {
    nextProfile()
  }

  const nextProfile = () => {
    if (currentIndex < filteredUsers.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
    setShowInfo(false)
  }

  if (!currentProfile) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No profiles match your filters</p>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your preferences</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Profile Card */}
      <div className="bg-card rounded-3xl shadow-2xl overflow-hidden transition-smooth hover-scale">
        {/* Profile Image */}
        <div className="relative h-[500px]">
          <img
            src={currentProfile.image}
            alt={currentProfile.name}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Info Button */}
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-smooth hover:bg-white/30"
          >
            <Info className="w-5 h-5 text-white" />
          </button>

          {/* Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {currentProfile.name}, {currentProfile.age}
            </h2>
            <div className="flex items-center text-white/90 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{currentProfile.location}</span>
              <span className="mx-2">•</span>
              <span className="text-sm">{currentProfile.distance < 100 ? `${currentProfile.distance} miles away` : 'Far away'}</span>
            </div>
            
            {showInfo && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4 transition-smooth">
                <p className="text-white/90 text-sm leading-relaxed">{currentProfile.bio}</p>
                <div className="flex items-center mt-3 space-x-2">
                  <span className="px-3 py-1 bg-primary/20 backdrop-blur-sm text-white rounded-full text-xs font-medium">
                    {currentProfile.interests}
                  </span>
                  {currentProfile.isOnline && (
                    <span className="px-3 py-1 bg-green-500/20 backdrop-blur-sm text-white rounded-full text-xs font-medium flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></span>
                      Online
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 p-6 bg-card">
          <Button
            onClick={handlePass}
            size="lg"
            variant="outline"
            className="rounded-full w-16 h-16 border-2 hover-scale transition-smooth"
          >
            <X className="w-8 h-8" />
          </Button>
          <Button
            onClick={handleLike}
            size="lg"
            className="gradient-purple rounded-full w-16 h-16 hover-scale transition-smooth"
          >
            <Heart className="w-8 h-8" />
          </Button>
        </div>
      </div>

      {/* Profile Counter */}
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          {currentIndex + 1} of {filteredUsers.length} profiles
        </p>
      </div>
    </div>
  )
}


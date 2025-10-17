import { useState } from 'react'
import { Heart, X, MapPin, Info, ChevronLeft, ChevronRight, Zap, Briefcase, GraduationCap, Ruler } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockUsers, filterUsers } from '../../data/users'

export default function DirectMatching({ filters, onMatch }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

  const handleInstantChat = () => {
    alert(`Instant Chat with ${currentProfile.name} activated! 💬\n\nThis is a premium feature that allows you to chat immediately without matching.\n\nPrice: $4.99`)
  }

  const nextProfile = () => {
    if (currentIndex < filteredUsers.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
    setIsExpanded(false)
    setCurrentImageIndex(0)
  }

  const prevProfile = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(filteredUsers.length - 1)
    }
    setIsExpanded(false)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (currentImageIndex < currentProfile.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
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
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-center mb-4">
        <p className="text-sm text-muted-foreground">
          {currentIndex + 1} of {filteredUsers.length} profiles
        </p>
      </div>

      {/* Profile Card Container */}
      <div className={`transition-all duration-500 ${isExpanded ? 'max-w-6xl' : 'max-w-md'} mx-auto`}>
        <div className="bg-card rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex">
            {/* Main Profile Section */}
            <div className={`transition-all duration-500 ${isExpanded ? 'w-1/2' : 'w-full'}`}>
              {/* Profile Image */}
              <div className="relative h-[600px]">
                <img
                  src={currentProfile.images[currentImageIndex]}
                  alt={currentProfile.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {currentProfile.images.length > 1 && (
                  <>
                    {currentImageIndex > 0 && (
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-smooth hover:bg-white/40"
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                    )}
                    {currentImageIndex < currentProfile.images.length - 1 && (
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-smooth hover:bg-white/40"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    )}
                    {/* Image Indicators */}
                    <div className="absolute top-4 left-0 right-0 flex justify-center space-x-1 px-4">
                      {currentProfile.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            idx === currentImageIndex ? 'bg-white' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Expand Button */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-smooth hover:bg-white/30"
                >
                  <Info className="w-5 h-5 text-white" />
                </button>

                {/* Profile Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {currentProfile.name}, {currentProfile.age}
                  </h2>
                  <div className="flex items-center text-white/90 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{currentProfile.location}</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm">{currentProfile.distance < 100 ? `${currentProfile.distance} miles away` : 'Far away'}</span>
                  </div>
                  
                  {!isExpanded && (
                    <p className="text-white/90 text-sm leading-relaxed line-clamp-2">{currentProfile.bio}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 flex items-center justify-center space-x-4">
                <Button
                  onClick={handlePass}
                  size="lg"
                  variant="outline"
                  className="w-16 h-16 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-white"
                >
                  <X className="w-8 h-8" />
                </Button>
                
                <Button
                  onClick={handleInstantChat}
                  size="lg"
                  className="w-16 h-16 rounded-full gradient-purple text-white shadow-lg hover-scale"
                >
                  <Zap className="w-6 h-6" />
                </Button>
                
                <Button
                  onClick={handleLike}
                  size="lg"
                  className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover-scale"
                >
                  <Heart className="w-8 h-8" />
                </Button>
              </div>
            </div>

            {/* Expanded Details Section */}
            {isExpanded && (
              <div className="w-1/2 p-6 overflow-y-auto max-h-[700px] bg-muted/30">
                <h3 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  About {currentProfile.name}
                </h3>

                {/* Bio */}
                <div className="mb-6">
                  <p className="text-foreground leading-relaxed">{currentProfile.bio}</p>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-card rounded-lg p-3">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span className="text-xs font-medium">Occupation</span>
                    </div>
                    <p className="text-sm text-foreground font-semibold">{currentProfile.occupation}</p>
                  </div>
                  <div className="bg-card rounded-lg p-3">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span className="text-xs font-medium">Education</span>
                    </div>
                    <p className="text-sm text-foreground font-semibold">{currentProfile.education}</p>
                  </div>
                  <div className="bg-card rounded-lg p-3">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <Ruler className="w-4 h-4 mr-2" />
                      <span className="text-xs font-medium">Height</span>
                    </div>
                    <p className="text-sm text-foreground font-semibold">{currentProfile.height}</p>
                  </div>
                  <div className="bg-card rounded-lg p-3">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <Heart className="w-4 h-4 mr-2" />
                      <span className="text-xs font-medium">Looking For</span>
                    </div>
                    <p className="text-sm text-foreground font-semibold capitalize">{currentProfile.interests}</p>
                  </div>
                </div>

                {/* Prompts */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Get to Know Me</h4>
                  {currentProfile.prompts.map((prompt, idx) => (
                    <div key={idx} className="bg-card rounded-xl p-4 border border-border">
                      <p className="text-sm font-medium text-primary mb-2">{prompt.question}</p>
                      <p className="text-foreground">{prompt.answer}</p>
                    </div>
                  ))}
                </div>

                {/* Additional Images */}
                {currentProfile.images.length > 1 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-foreground mb-3">More Photos</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {currentProfile.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${currentProfile.name} ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-smooth"
                          onClick={() => setCurrentImageIndex(idx)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Navigation */}
      <div className="flex items-center justify-center mt-6 space-x-4">
        <Button
          onClick={prevProfile}
          variant="outline"
          size="sm"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>
        <Button
          onClick={nextProfile}
          variant="outline"
          size="sm"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}


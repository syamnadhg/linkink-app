import { useState } from 'react'
import { Heart, X, MapPin, Zap, Briefcase, GraduationCap, Ruler, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockUsers, filterUsers } from '../../data/users'

export default function DirectMatching({ filters, onMatch }) {
  const [expandedUserId, setExpandedUserId] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState({})
  const [instantChatOpen, setInstantChatOpen] = useState(null)

  const filteredUsers = filterUsers(mockUsers, filters)

  const handleLike = (user) => {
    onMatch(user)
    alert(`It's a match with ${user.name}! 🎉 Check your chat space to start talking.`)
  }

  const handleInstantChat = (user) => {
    setInstantChatOpen(user.id)
  }

  const handleSendInstantMessage = (user, message) => {
    if (!message.trim()) return
    alert(`Message sent to ${user.name}! 💬\n\n"${message}"\n\nThey'll see your message and can reply if interested.`)
    setInstantChatOpen(null)
  }

  const nextImage = (userId) => {
    const user = filteredUsers.find(u => u.id === userId)
    const currentIdx = currentImageIndex[userId] || 0
    if (currentIdx < user.images.length - 1) {
      setCurrentImageIndex(prev => ({ ...prev, [userId]: currentIdx + 1 }))
    }
  }

  const prevImage = (userId) => {
    const currentIdx = currentImageIndex[userId] || 0
    if (currentIdx > 0) {
      setCurrentImageIndex(prev => ({ ...prev, [userId]: currentIdx - 1 }))
    }
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No profiles match your filters</p>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your preferences</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <p className="text-sm text-muted-foreground mb-4 text-center">
        Showing {filteredUsers.length} profiles • Sorted by last seen
      </p>

      {/* Scrollable Profiles List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => {
          const isExpanded = expandedUserId === user.id
          const imageIdx = currentImageIndex[user.id] || 0

          return (
            <div key={user.id} className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border hover-lift transition-smooth">
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="relative w-full md:w-80 h-80 md:h-auto flex-shrink-0 bg-muted">
                  <img
                    src={user.images[imageIdx]}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Image Counter */}
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm">
                    {imageIdx + 1} / {user.images.length}
                  </div>

                  {/* Image Navigation */}
                  {user.images.length > 1 && (
                    <>
                      <button
                        onClick={() => prevImage(user.id)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-smooth hover:bg-white/40"
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => nextImage(user.id)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-smooth hover:bg-white/40"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </>
                  )}

                  {/* Swipe Indicator */}
                  <div className="absolute bottom-4 left-4 right-4 flex space-x-1">
                    {user.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1 flex-1 rounded-full transition-smooth ${
                          idx === imageIdx ? 'bg-primary' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Profile Info Section */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  {/* Basic Info */}
                  <div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                      <span className="text-lg text-muted-foreground">{user.age}</span>
                    </div>

                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{user.location} • {user.distance} miles away</span>
                    </div>

                    <p className="text-foreground mb-4 leading-relaxed">{user.bio}</p>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Occupation</p>
                        <p className="text-sm font-semibold text-foreground flex items-center">
                          <Briefcase className="w-4 h-4 mr-2" />
                          {user.occupation}
                        </p>
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Education</p>
                        <p className="text-sm font-semibold text-foreground flex items-center">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          {user.education}
                        </p>
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Height</p>
                        <p className="text-sm font-semibold text-foreground flex items-center">
                          <Ruler className="w-4 h-4 mr-2" />
                          {user.height}
                        </p>
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Looking For</p>
                        <p className="text-sm font-semibold text-foreground">{user.lookingFor}</p>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    {isExpanded && (
                      <div className="space-y-3 mb-4 animate-in fade-in-50 duration-300">
                        <div className="bg-muted rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-2">Get to Know Me</h4>
                          {user.prompts && user.prompts.map((prompt, idx) => (
                            <div key={idx} className="mb-3 pb-3 border-b border-border last:border-b-0">
                              <p className="text-sm font-semibold text-primary mb-1">{prompt.question}</p>
                              <p className="text-sm text-foreground">{prompt.answer}</p>
                            </div>
                          ))}
                        </div>

                        <div className="bg-muted rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-2">Sexual Orientation</h4>
                          <p className="text-sm text-foreground">{user.orientation || 'Not specified'}</p>
                        </div>

                        <div className="bg-muted rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-2">Relationship Type</h4>
                          <p className="text-sm text-foreground">{user.relationshipType || 'Open to anything'}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Button
                      onClick={() => setExpandedUserId(isExpanded ? null : user.id)}
                      variant="outline"
                      className="flex-1"
                    >
                      {isExpanded ? 'Show Less' : 'Show More'}
                    </Button>
                    <Button
                      onClick={() => handleInstantChat(user)}
                      variant="outline"
                      size="sm"
                      className="px-3"
                      title="Instant Chat (Premium)"
                    >
                      <Zap className="w-4 h-4 text-yellow-500" />
                    </Button>
                    <Button
                      onClick={() => handleLike(user)}
                      className="flex-1 gradient-purple text-white"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Like
                    </Button>
                  </div>
                </div>
              </div>

              {/* Instant Chat Modal */}
              {instantChatOpen === user.id && (
                <div className="border-t border-border p-4 bg-muted/50">
                  <div className="max-w-md">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                      Instant Chat - Premium Feature
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Send a message to {user.name} without matching first. They can reply if interested!
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Say something nice..."
                        className="flex-1 bg-background text-foreground rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSendInstantMessage(user, e.target.value)
                            e.target.value = ''
                          }
                        }}
                      />
                      <Button
                        onClick={(e) => {
                          const input = e.target.previousElementSibling
                          handleSendInstantMessage(user, input.value)
                          input.value = ''
                        }}
                        className="gradient-purple text-white"
                        size="sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => setInstantChatOpen(null)}
                        variant="outline"
                        size="sm"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">💳 $4.99 per message</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}


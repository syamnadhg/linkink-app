import { useState, useEffect } from 'react'
import { Phone, PhoneOff, Mic, MicOff, UserPlus, Volume2, Video, VideoOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function VoiceSection({ filters, onMatch }) {
  const [isInCall, setIsInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)
  const [videoRequested, setVideoRequested] = useState(false)
  const [videoRequestReceived, setVideoRequestReceived] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isSearching, setIsSearching] = useState(false)
  const [matchSent, setMatchSent] = useState(false)
  const [currentCaller, setCurrentCaller] = useState(null)

  useEffect(() => {
    let interval
    if (isInCall) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isInCall])

  const handleStartCall = () => {
    setIsSearching(true)
    // Simulate finding a match
    setTimeout(() => {
      setIsSearching(false)
      setIsInCall(true)
      setCurrentCaller({
        name: 'Anonymous',
        location: 'Unknown',
        interests: filters.interests !== 'all' ? filters.interests : 'casual'
      })
    }, 2000)
  }

  const handleEndCall = () => {
    setIsInCall(false)
    setCallDuration(0)
    setIsMuted(false)
    setIsVideoEnabled(false)
    setVideoRequested(false)
    setVideoRequestReceived(false)
    setMatchSent(false)
    setCurrentCaller(null)
  }

  const handleSendMatchRequest = () => {
    setMatchSent(true)
    alert('Match request sent! If they accept, you can continue chatting in your chat space.')
  }

  const handleRequestVideo = () => {
    setVideoRequested(true)
    // Simulate video request being sent
    setTimeout(() => {
      // Simulate random acceptance (50% chance)
      const accepted = Math.random() > 0.5
      if (accepted) {
        setIsVideoEnabled(true)
        setVideoRequested(false)
        alert('Video request accepted! 📹')
      } else {
        setVideoRequested(false)
        alert('Video request declined.')
      }
    }, 2000)
  }

  const handleVideoRequestResponse = (accepted) => {
    setVideoRequestReceived(false)
    if (accepted) {
      setIsVideoEnabled(true)
      alert('Video enabled! 📹')
    } else {
      alert('Video request declined.')
    }
  }

  const handleToggleVideo = () => {
    if (!isVideoEnabled) {
      handleRequestVideo()
    } else {
      setIsVideoEnabled(false)
    }
  }

  // Simulate receiving a video request
  useEffect(() => {
    if (isInCall && !isVideoEnabled && !videoRequested && !videoRequestReceived) {
      const timer = setTimeout(() => {
        if (Math.random() > 0.7) {
          setVideoRequestReceived(true)
        }
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [isInCall, isVideoEnabled, videoRequested, videoRequestReceived])

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-card rounded-3xl shadow-2xl p-8">
        <div className="text-center">
          {!isInCall && !isSearching && (
            <div className="space-y-6">
              <div className="w-32 h-32 mx-auto gradient-purple rounded-full flex items-center justify-center shadow-xl">
                <Phone className="w-16 h-16 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Voice & Video Matching
                </h2>
                <p className="text-muted-foreground">
                  Connect through voice and optionally video
                </p>
              </div>
              <Button
                onClick={handleStartCall}
                size="lg"
                className="gradient-purple text-white px-8 py-6 text-lg hover-scale transition-smooth"
              >
                <Phone className="w-6 h-6 mr-2" />
                Start Call
              </Button>
              <p className="text-sm text-muted-foreground">
                You'll be matched based on your filters
              </p>
            </div>
          )}

          {isSearching && (
            <div className="space-y-6 py-8">
              <div className="w-32 h-32 mx-auto gradient-purple rounded-full flex items-center justify-center animate-pulse shadow-xl">
                <Phone className="w-16 h-16 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Finding someone...</h3>
                <p className="text-muted-foreground">This won't take long</p>
              </div>
            </div>
          )}

          {isInCall && (
            <div className="space-y-6 py-4">
              {/* Video Request Notification */}
              {videoRequestReceived && (
                <div className="bg-primary/10 border border-primary rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-foreground mb-3">
                    {currentCaller?.name} wants to enable video
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleVideoRequestResponse(true)}
                      size="sm"
                      className="flex-1 gradient-purple text-white"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleVideoRequestResponse(false)}
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              )}

              {/* Caller Info / Video Display */}
              <div className={`rounded-2xl overflow-hidden ${isVideoEnabled ? 'bg-black' : 'bg-muted'} ${isVideoEnabled ? 'p-0' : 'p-6'}`}>
                {isVideoEnabled ? (
                  <div className="relative aspect-video bg-gradient-to-br from-purple-900 to-indigo-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Video className="w-16 h-16 mx-auto mb-3 opacity-50" />
                        <p className="text-sm opacity-75">Video call active</p>
                        <p className="text-xs opacity-50 mt-1">(Simulated video feed)</p>
                      </div>
                    </div>
                    {/* Small self-view */}
                    <div className="absolute top-4 right-4 w-24 h-32 bg-gray-800 rounded-lg border-2 border-white/20 flex items-center justify-center">
                      <p className="text-white text-xs">You</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-24 h-24 mx-auto gradient-purple-soft rounded-full flex items-center justify-center mb-4">
                      <Volume2 className={`w-12 h-12 text-primary ${!isMuted && 'animate-pulse'}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {currentCaller?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {currentCaller?.location} • {currentCaller?.interests}
                    </p>
                  </>
                )}
                <p className="text-2xl font-bold text-primary text-center py-2">
                  {formatDuration(callDuration)}
                </p>
              </div>

              {/* Call Controls */}
              <div className="flex justify-center space-x-3">
                <Button
                  onClick={() => setIsMuted(!isMuted)}
                  size="lg"
                  variant="outline"
                  className="rounded-full w-14 h-14 hover-scale transition-smooth"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </Button>
                
                <Button
                  onClick={handleToggleVideo}
                  size="lg"
                  variant="outline"
                  className={`rounded-full w-14 h-14 hover-scale transition-smooth ${
                    isVideoEnabled ? 'bg-primary text-white' : ''
                  } ${videoRequested ? 'animate-pulse' : ''}`}
                  disabled={videoRequested}
                  title={isVideoEnabled ? "Disable Video" : "Request Video"}
                >
                  {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                </Button>
                
                <Button
                  onClick={handleEndCall}
                  size="lg"
                  className="bg-destructive hover:bg-destructive/90 rounded-full w-14 h-14 hover-scale transition-smooth"
                  title="End Call"
                >
                  <PhoneOff className="w-6 h-6" />
                </Button>
                
                {!matchSent ? (
                  <Button
                    onClick={handleSendMatchRequest}
                    size="lg"
                    className="gradient-purple rounded-full w-14 h-14 hover-scale transition-smooth"
                    title="Send Match Request"
                  >
                    <UserPlus className="w-6 h-6" />
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    disabled
                    className="bg-muted rounded-full w-14 h-14"
                    title="Match Request Sent"
                  >
                    <UserPlus className="w-6 h-6 text-muted-foreground" />
                  </Button>
                )}
              </div>

              <div className="space-y-1 text-sm">
                {videoRequested && (
                  <p className="text-primary">Requesting video...</p>
                )}
                {matchSent && (
                  <p className="text-green-600">Match request sent! ✓</p>
                )}
                {!matchSent && !videoRequested && (
                  <p className="text-muted-foreground">
                    Enjoying the call? Send a match request!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-muted rounded-xl p-5">
        <h3 className="text-sm font-bold text-foreground mb-3">How it works</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Click "Start Call" to join the call pool</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>You'll be matched with someone based on your filters</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Have a voice conversation and see if you connect</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Request video during the call if both parties want to see each other</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Send a match request during the call if you want to stay connected</span>
          </li>
        </ul>
      </div>
    </div>
  )
}


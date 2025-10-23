import { useState, useEffect } from 'react'
import { Phone, PhoneOff, Mic, MicOff, UserPlus, Volume2, Video, VideoOff, Dice5, Heart } from 'lucide-react'
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

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartCall = () => {
    setIsSearching(true)
    // Simulate finding a match
    setTimeout(() => {
      setIsSearching(false)
      setIsInCall(true)
      setCurrentCaller({
        name: 'Mystery Caller',
        location: 'Nearby',
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

  if (isSearching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          <div className="flex items-center justify-center w-full h-full">
            <Dice5 className="w-10 h-10 text-primary animate-bounce" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Rolling the Dice...</h3>
        <p className="text-muted-foreground text-center">Finding your perfect match</p>
      </div>
    )
  }

  if (!isInCall) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-12 text-center border border-primary/20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6">
            <Dice5 className="w-10 h-10 text-primary" />
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-2">Roll the Dice</h2>
          <p className="text-muted-foreground mb-8">
            Connect through voice and optionally video with someone special. Let fate decide your next conversation!
          </p>

          <Button
            onClick={handleStartCall}
            size="lg"
            className="gradient-purple text-white mb-8 px-12"
          >
            <Dice5 className="w-5 h-5 mr-2" />
            Roll the Dice
          </Button>

          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">How It Works</h3>
            <ul className="text-left space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold mr-3 flex-shrink-0">1</span>
                <span>Click "Roll the Dice" to join the call pool</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold mr-3 flex-shrink-0">2</span>
                <span>Get matched with someone based on your filters</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold mr-3 flex-shrink-0">3</span>
                <span>Have a voice conversation and get to know them</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold mr-3 flex-shrink-0">4</span>
                <span>Request video if you want to see them (optional)</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold mr-3 flex-shrink-0">5</span>
                <span>Send a match request to continue chatting</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Call Interface */}
      <div className="bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
        {/* Video Area */}
        <div className="relative bg-gradient-to-br from-primary/20 to-primary/10 h-96 flex items-center justify-center overflow-hidden">
          {isVideoEnabled ? (
            <div className="w-full h-full relative">
              {/* Remote Video */}
              <div className="w-full h-full bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/30 flex items-center justify-center mx-auto mb-4">
                    <Video className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-white font-semibold">{currentCaller?.name}</p>
                </div>
              </div>
              {/* Self Video (PiP) */}
              <div className="absolute bottom-4 right-4 w-24 h-32 bg-black/70 rounded-lg border-2 border-primary flex items-center justify-center">
                <p className="text-white text-xs">You</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-primary/30 flex items-center justify-center mx-auto mb-6">
                <Volume2 className="w-16 h-16 text-primary animate-pulse" />
              </div>
              <p className="text-foreground font-semibold text-lg mb-2">{currentCaller?.name}</p>
              <p className="text-muted-foreground text-sm">{currentCaller?.location}</p>
            </div>
          )}

          {/* Call Duration */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white font-semibold">
            {formatDuration(callDuration)}
          </div>

          {/* Video Request Indicator */}
          {videoRequestReceived && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center">
              <div className="bg-card rounded-2xl p-6 text-center">
                <Video className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="font-semibold text-foreground mb-4">Video Request</p>
                <p className="text-sm text-muted-foreground mb-4">{currentCaller?.name} wants to enable video</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleVideoRequestResponse(true)}
                    className="flex-1 gradient-purple text-white"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleVideoRequestResponse(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Decline
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 bg-muted/50">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant={isMuted ? 'default' : 'outline'}
              size="lg"
              className="rounded-full w-14 h-14 p-0"
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>

            <Button
              onClick={handleToggleVideo}
              variant={isVideoEnabled ? 'default' : 'outline'}
              size="lg"
              className="rounded-full w-14 h-14 p-0"
              disabled={videoRequested}
            >
              {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </Button>

            <Button
              onClick={handleEndCall}
              size="lg"
              className="rounded-full w-14 h-14 p-0 bg-red-500 hover:bg-red-600 text-white"
            >
              <PhoneOff className="w-6 h-6" />
            </Button>

            <Button
              onClick={handleSendMatchRequest}
              variant={matchSent ? 'default' : 'outline'}
              size="lg"
              className="rounded-full w-14 h-14 p-0"
              disabled={matchSent}
            >
              <Heart className="w-6 h-6" />
            </Button>
          </div>

          {videoRequested && (
            <p className="text-center text-sm text-muted-foreground mb-4">Waiting for video request response...</p>
          )}

          {matchSent && (
            <p className="text-center text-sm text-primary font-semibold">Match request sent! ✓</p>
          )}
        </div>
      </div>
    </div>
  )
}


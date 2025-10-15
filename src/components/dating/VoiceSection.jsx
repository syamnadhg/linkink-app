import { useState } from 'react'
import { Phone, PhoneOff, Mic, MicOff, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function VoiceSection({ filters }) {
  const [isInCall, setIsInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isSearching, setIsSearching] = useState(false)

  const handleStartCall = () => {
    setIsSearching(true)
    // Simulate finding a match
    setTimeout(() => {
      setIsSearching(false)
      setIsInCall(true)
      // Start call duration timer
      const interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }, 2000)
  }

  const handleEndCall = () => {
    setIsInCall(false)
    setCallDuration(0)
    setIsMuted(false)
  }

  const handleMatch = () => {
    alert('Matched! You can now chat and connect outside of voice calls.')
    handleEndCall()
  }

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Voice Matching</h2>
          <p className="text-gray-600 mb-8">
            Connect with someone through voice. Have a conversation and match if you click!
          </p>

          {!isInCall && !isSearching && (
            <div className="space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Phone className="w-16 h-16 text-white" />
              </div>
              <Button
                onClick={handleStartCall}
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 px-8 py-6 text-lg"
              >
                <Phone className="w-6 h-6 mr-2" />
                Start Voice Call
              </Button>
              <p className="text-sm text-gray-500">
                You'll be matched with someone based on your filters
              </p>
            </div>
          )}

          {isSearching && (
            <div className="space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                <Phone className="w-16 h-16 text-white" />
              </div>
              <p className="text-xl text-gray-700">Finding someone for you...</p>
            </div>
          )}

          {isInCall && (
            <div className="space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Mic className={`w-16 h-16 text-white ${isMuted ? 'opacity-50' : ''}`} />
              </div>
              
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-800">In Call</p>
                <p className="text-xl text-gray-600">{formatDuration(callDuration)}</p>
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => setIsMuted(!isMuted)}
                  size="lg"
                  className={`rounded-full w-16 h-16 ${
                    isMuted
                      ? 'bg-gray-400 hover:bg-gray-500'
                      : 'bg-white border-2 border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </Button>
                
                <Button
                  onClick={handleEndCall}
                  size="lg"
                  className="bg-red-500 text-white hover:bg-red-600 rounded-full w-16 h-16"
                >
                  <PhoneOff className="w-6 h-6" />
                </Button>
                
                <Button
                  onClick={handleMatch}
                  size="lg"
                  className="bg-green-500 text-white hover:bg-green-600 rounded-full w-16 h-16"
                >
                  <UserPlus className="w-6 h-6" />
                </Button>
              </div>

              <p className="text-sm text-gray-500">
                Enjoying the conversation? Click the + button to match!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-white/20 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-3">How it works</h3>
        <ul className="space-y-2 text-white/80">
          <li>• Click "Start Voice Call" to join the call pool</li>
          <li>• You'll be matched with someone based on your filters</li>
          <li>• Have a conversation and see if you connect</li>
          <li>• If you both want to match, you can become friends</li>
        </ul>
      </div>
    </div>
  )
}


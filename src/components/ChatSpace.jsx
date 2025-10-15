import { useState } from 'react'
import { X, Send, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ChatSpace({ isOpen, onClose, matches, chats, onStartChat }) {
  const [selectedChat, setSelectedChat] = useState(null)
  const [messageInput, setMessageInput] = useState('')

  if (!isOpen) return null

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return
    // In a real app, this would send the message to the backend
    setMessageInput('')
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full md:w-96 bg-card shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {selectedChat ? (
            <>
              <button
                onClick={() => setSelectedChat(null)}
                className="p-2 hover:bg-muted rounded-lg transition-smooth"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold">{selectedChat.userName}</h2>
              <div className="w-9" />
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold">Messages</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-smooth"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Content */}
        {selectedChat ? (
          /* Chat View */
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedChat.messages.length === 0 ? (
                <div className="text-center text-muted-foreground mt-8">
                  <p>Start a conversation!</p>
                </div>
              ) : (
                selectedChat.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        msg.isOwn
                          ? 'gradient-purple text-white'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-muted rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="gradient-purple rounded-full w-10 h-10"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Matches List */
          <div className="flex-1 overflow-y-auto">
            {matches.length === 0 ? (
              <div className="text-center text-muted-foreground mt-8 px-4">
                <p>No matches yet</p>
                <p className="text-sm mt-2">Start matching to begin conversations!</p>
              </div>
            ) : (
              <div className="p-2">
                {matches.map((match) => {
                  const chat = chats.find(c => c.userId === match.id)
                  return (
                    <button
                      key={match.id}
                      onClick={() => {
                        if (chat) {
                          setSelectedChat(chat)
                        } else {
                          onStartChat(match)
                        }
                      }}
                      className="w-full p-3 hover:bg-muted rounded-xl transition-smooth flex items-center space-x-3"
                    >
                      <img
                        src={match.image}
                        alt={match.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 text-left">
                        <p className="font-semibold">{match.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {chat?.messages[chat.messages.length - 1]?.text || 'Start chatting'}
                        </p>
                      </div>
                      {chat?.unread && (
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}


import { MessageCircle } from 'lucide-react'

export default function FloatingChatButton({ onClick, unreadCount = 0 }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 gradient-purple rounded-full shadow-2xl flex items-center justify-center transition-smooth hover-scale hover:shadow-purple-500/50"
    >
      <MessageCircle className="w-6 h-6 text-white" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs font-bold rounded-full flex items-center justify-center">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}


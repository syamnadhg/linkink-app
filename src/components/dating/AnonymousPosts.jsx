import { useState } from 'react'
import { MessageCircle, Send, Heart, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AnonymousPosts({ filters }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "Just moved to the city and looking to meet new people. Anyone want to grab coffee? ☕",
      replies: 12,
      likes: 24,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      content: "Love hiking and outdoor adventures. Would be great to find someone who shares the same passion! 🏔️",
      replies: 8,
      likes: 15,
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      content: "Looking for someone to binge-watch shows with and have deep conversations about life 🎬",
      replies: 20,
      likes: 35,
      timestamp: "6 hours ago"
    }
  ])
  const [newPost, setNewPost] = useState('')
  const [selectedPost, setSelectedPost] = useState(null)
  const [chatMessage, setChatMessage] = useState('')

  const handleCreatePost = () => {
    if (newPost.trim()) {
      setPosts([
        {
          id: posts.length + 1,
          content: newPost,
          replies: 0,
          likes: 0,
          timestamp: "Just now"
        },
        ...posts
      ])
      setNewPost('')
    }
  }

  const handleStartChat = (post) => {
    setSelectedPost(post)
  }

  const handleMatch = (post) => {
    alert(`Matched with user from post #${post.id}! You can now chat openly.`)
  }

  return (
    <div className="space-y-6">
      {/* Create New Post */}
      <div className="bg-white/20 rounded-xl p-4">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share something anonymously..."
          className="w-full bg-white/30 text-white placeholder-white/60 border border-white/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[100px]"
        />
        <div className="flex justify-end mt-2">
          <Button
            onClick={handleCreatePost}
            className="bg-white text-purple-600 hover:bg-white/90"
          >
            <Send className="w-4 h-4 mr-2" />
            Post Anonymously
          </Button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white/20 rounded-xl p-6 hover:bg-white/30 transition-all"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1">
                <p className="text-white text-lg mb-3">{post.content}</p>
                <div className="flex items-center space-x-4 text-white/70 text-sm">
                  <span>{post.timestamp}</span>
                  <span className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {post.replies} replies
                  </span>
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {post.likes} likes
                  </span>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button
                    onClick={() => handleStartChat(post)}
                    size="sm"
                    className="bg-white/20 text-white hover:bg-white/30"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                  <Button
                    onClick={() => handleMatch(post)}
                    size="sm"
                    className="bg-white/20 text-white hover:bg-white/30"
                  >
                    <UserPlus className="w-4 h-4 mr-1" />
                    Match
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Modal (simplified) */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Anonymous Chat</h3>
            <div className="bg-gray-100 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
              <p className="text-gray-600 text-sm">Start chatting anonymously...</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <Button onClick={() => setChatMessage('')}>Send</Button>
            </div>
            <Button
              onClick={() => setSelectedPost(null)}
              className="w-full mt-4"
              variant="outline"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}


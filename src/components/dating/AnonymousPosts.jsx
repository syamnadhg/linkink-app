import { useState } from 'react'
import { Send, MessageCircle, Heart, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockPosts, filterPosts } from '../../data/users'

export default function AnonymousPosts({ filters, onMatch, onStartChat }) {
  const [newPost, setNewPost] = useState('')
  const [posts, setPosts] = useState(mockPosts)
  const [selectedPost, setSelectedPost] = useState(null)
  const [replyText, setReplyText] = useState('')

  const filteredPosts = filterPosts(posts, filters)

  const handleCreatePost = () => {
    if (!newPost.trim()) return
    
    const post = {
      id: Date.now(),
      userId: 'me',
      text: newPost,
      timestamp: 'Just now',
      replies: 0,
      likes: 0,
      location: 'Your location',
      gender: 'your-gender',
      interests: 'your-interests'
    }
    
    setPosts([post, ...posts])
    setNewPost('')
  }

  const handleSendMatchRequest = (post) => {
    // In real app, this would send a match request
    alert(`Match request sent! Waiting for acceptance...`)
  }

  const handleReply = (post) => {
    setSelectedPost(post)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Create Post */}
      <div className="bg-muted rounded-xl p-4 mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share something anonymously..."
          className="w-full bg-background text-foreground rounded-lg p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
        <div className="flex justify-end mt-3">
          <Button
            onClick={handleCreatePost}
            className="gradient-purple text-white"
          >
            <Send className="w-4 h-4 mr-2" />
            Post Anonymously
          </Button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-card rounded-xl p-5 shadow-md border border-border hover-lift transition-smooth cursor-pointer"
          >
            {/* Anonymous Avatar */}
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full gradient-purple-soft flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-semibold text-foreground">Anonymous</p>
                <p className="text-xs text-muted-foreground">{post.timestamp}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-foreground mb-4 leading-relaxed">{post.text}</p>

            {/* Post Stats */}
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <MessageCircle className="w-4 h-4 mr-1" />
              <span className="mr-4">{post.replies} replies</span>
              <Heart className="w-4 h-4 mr-1" />
              <span>{post.likes} likes</span>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Button
                onClick={() => handleReply(post)}
                size="sm"
                variant="outline"
                className="flex-1"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
              <Button
                onClick={() => handleSendMatchRequest(post)}
                size="sm"
                className="flex-1 gradient-purple text-white"
              >
                <Heart className="w-4 h-4 mr-2" />
                Match
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Modal (simplified) */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Reply Anonymously</h3>
            <p className="text-sm text-muted-foreground mb-4">{selectedPost.text}</p>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply..."
              className="w-full bg-muted rounded-lg p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary resize-none mb-4"
            />
            <div className="flex space-x-2">
              <Button
                onClick={() => setSelectedPost(null)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setReplyText('')
                  setSelectedPost(null)
                  alert('Reply sent!')
                }}
                className="flex-1 gradient-purple text-white"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


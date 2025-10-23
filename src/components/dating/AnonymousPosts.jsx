import { useState } from 'react'
import { Send, MessageCircle, Heart, User, Image as ImageIcon, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockPosts, filterPosts } from '../../data/users'

export default function AnonymousPosts({ filters, onMatch, onStartChat }) {
  const [newPost, setNewPost] = useState('')
  const [posts, setPosts] = useState(mockPosts)
  const [expandedPostId, setExpandedPostId] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [comments, setComments] = useState({})
  const [newComments, setNewComments] = useState({})
  const [chatOpen, setChatOpen] = useState({})
  const [chatMessages, setChatMessages] = useState({})
  const [newChatMessage, setNewChatMessage] = useState({})

  const filteredPosts = filterPosts(posts, filters)

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
  }

  const handleCreatePost = () => {
    if (!newPost.trim() && !selectedImage) return
    
    const post = {
      id: Date.now(),
      userId: 'me',
      anonymousId: `Anon-${Math.random().toString(36).substr(2, 9)}`,
      text: newPost,
      image: imagePreview,
      timestamp: 'Just now',
      comments: [],
      likes: 0,
      location: 'Your location',
      gender: 'your-gender',
      interests: 'your-interests'
    }
    
    setPosts([post, ...posts])
    setNewPost('')
    setSelectedImage(null)
    setImagePreview(null)
  }

  const handleAddComment = (postId) => {
    const commentText = newComments[postId]?.trim()
    if (!commentText) return

    const newComment = {
      id: Date.now(),
      anonymousId: `Anon-${Math.random().toString(36).substr(2, 9)}`,
      text: commentText,
      timestamp: 'Just now'
    }

    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }))

    setNewComments(prev => ({
      ...prev,
      [postId]: ''
    }))
  }

  const handleOpenChat = (postId) => {
    setChatOpen(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  const handleSendChatMessage = (postId) => {
    const messageText = newChatMessage[postId]?.trim()
    if (!messageText) return

    const message = {
      id: Date.now(),
      senderAnonymousId: `Anon-${Math.random().toString(36).substr(2, 9)}`,
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMatchRequest: false
    }

    setChatMessages(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), message]
    }))

    setNewChatMessage(prev => ({
      ...prev,
      [postId]: ''
    }))
  }

  const handleSendMatchRequest = (postId) => {
    const matchRequestMessage = {
      id: Date.now(),
      senderAnonymousId: `Anon-${Math.random().toString(36).substr(2, 9)}`,
      text: '📌 Sent a match request!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMatchRequest: true
    }

    setChatMessages(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), matchRequestMessage]
    }))

    alert('Match request sent! If they accept, you can reveal your profile.')
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
        
        {/* Image Preview */}
        {imagePreview && (
          <div className="relative mt-3 inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-48 rounded-lg object-cover"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full transition-smooth"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-3">
          <label className="cursor-pointer p-2 hover:bg-background rounded-lg transition-smooth">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <ImageIcon className="w-5 h-5 text-primary" />
          </label>
          <Button
            onClick={handleCreatePost}
            className="gradient-purple text-white"
            disabled={!newPost.trim() && !selectedImage}
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
            className="bg-card rounded-xl p-5 shadow-md border border-border hover-lift transition-smooth"
          >
            {/* Anonymous Avatar */}
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full gradient-purple-soft flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-semibold text-foreground">{post.anonymousId}</p>
                <p className="text-xs text-muted-foreground">{post.timestamp}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-foreground mb-3 leading-relaxed">{post.text}</p>

            {/* Post Image */}
            {post.image && (
              <img
                src={post.image}
                alt="Post content"
                className="w-full rounded-lg mb-3 object-cover max-h-64"
              />
            )}

            {/* Engagement Stats */}
            <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
              <span className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {(comments[post.id] || []).length} comments
              </span>
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {post.likes} likes
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mb-4">
              <Button
                onClick={() => handleOpenChat(post.id)}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Chat
              </Button>
              <Button
                onClick={() => handleSendMatchRequest(post.id)}
                size="sm"
                className="flex-1 gradient-purple text-white"
              >
                <Heart className="w-4 h-4 mr-1" />
                Match Request
              </Button>
            </div>

            {/* Comments Section */}
            <div className="border-t border-border pt-3 mb-3">
              <button
                onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                className="text-sm text-primary hover:text-primary/80 flex items-center mb-2"
              >
                {expandedPostId === post.id ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
                {(comments[post.id] || []).length > 0 ? `View ${(comments[post.id] || []).length} comments` : 'Add comment'}
              </button>

              {expandedPostId === post.id && (
                <div className="space-y-3 mb-3 max-h-48 overflow-y-auto">
                  {(comments[post.id] || []).map((comment) => (
                    <div key={comment.id} className="bg-muted rounded-lg p-2">
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full gradient-purple-soft flex items-center justify-center flex-shrink-0">
                          <User className="w-3 h-3 text-primary" />
                        </div>
                        <div className="ml-2 flex-1">
                          <p className="text-xs font-semibold text-foreground">{comment.anonymousId}</p>
                          <p className="text-sm text-foreground">{comment.text}</p>
                          <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {expandedPostId === post.id && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newComments[post.id] || ''}
                    onChange={(e) => setNewComments(prev => ({ ...prev, [post.id]: e.target.value }))}
                    placeholder="Add a comment..."
                    className="flex-1 bg-muted text-foreground rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button
                    onClick={() => handleAddComment(post.id)}
                    size="sm"
                    className="gradient-purple text-white"
                    disabled={!newComments[post.id]?.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Chat Section */}
            {chatOpen[post.id] && (
              <div className="border-t border-border pt-3 bg-muted rounded-lg p-3">
                <div className="max-h-48 overflow-y-auto space-y-2 mb-3">
                  {(chatMessages[post.id] || []).map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isMatchRequest ? 'justify-center' : 'justify-start'}`}>
                      <div className={`max-w-xs rounded-lg px-3 py-2 ${msg.isMatchRequest ? 'bg-primary/20 text-primary text-center text-xs' : 'bg-primary text-white text-sm'}`}>
                        {msg.text}
                        {!msg.isMatchRequest && <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newChatMessage[post.id] || ''}
                    onChange={(e) => setNewChatMessage(prev => ({ ...prev, [post.id]: e.target.value }))}
                    placeholder="Send a message..."
                    className="flex-1 bg-background text-foreground rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button
                    onClick={() => handleSendChatMessage(post.id)}
                    size="sm"
                    className="gradient-purple text-white"
                    disabled={!newChatMessage[post.id]?.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}


import { useState } from 'react'
import { Send, MessageCircle, Heart, User, Image as ImageIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockPosts, filterPosts } from '../../data/users'

export default function AnonymousPosts({ filters, onMatch, onStartChat }) {
  const [newPost, setNewPost] = useState('')
  const [posts, setPosts] = useState(mockPosts)
  const [selectedPost, setSelectedPost] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

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
      text: newPost,
      image: imagePreview,
      timestamp: 'Just now',
      replies: 0,
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

  const handleSendMatchRequest = (post) => {
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
                <p className="text-sm font-semibold text-foreground">Anonymous</p>
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
                {post.replies} replies
              </span>
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {post.likes} likes
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                onClick={() => handleReply(post)}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Chat
              </Button>
              <Button
                onClick={() => handleSendMatchRequest(post)}
                size="sm"
                className="flex-1 gradient-purple text-white"
              >
                <Heart className="w-4 h-4 mr-1" />
                Match
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


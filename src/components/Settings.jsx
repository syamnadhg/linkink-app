import { useState } from 'react'
import { X, Moon, Sun, User, Mail, MapPin, Heart, Edit2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Settings({ isOpen, onClose, theme, onToggleTheme, userProfile, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(userProfile)

  if (!isOpen) return null

  const handleSave = () => {
    onUpdateProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(userProfile)
    setIsEditing(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 border border-border">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Theme Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              {theme === 'light' ? <Sun className="w-5 h-5 mr-2" /> : <Moon className="w-5 h-5 mr-2" />}
              Appearance
            </h3>
            <div className="bg-muted rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Theme</p>
                  <p className="text-sm text-muted-foreground">
                    {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                  </p>
                </div>
                <button
                  onClick={onToggleTheme}
                  className="relative inline-flex h-10 w-20 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  style={{ backgroundColor: theme === 'dark' ? '#8b7bb8' : '#d4c5e8' }}
                >
                  <span
                    className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform ${
                      theme === 'dark' ? 'translate-x-11' : 'translate-x-1'
                    }`}
                  >
                    {theme === 'light' ? (
                      <Sun className="w-5 h-5 m-1.5 text-yellow-500" />
                    ) : (
                      <Moon className="w-5 h-5 m-1.5 text-indigo-600" />
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile
              </h3>
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    size="sm"
                    className="gradient-purple text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>

            <div className="bg-muted rounded-xl p-4 space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="w-full px-3 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p className="text-foreground font-medium">{userProfile.name}</p>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProfile.age}
                    onChange={(e) => setEditedProfile({ ...editedProfile, age: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p className="text-foreground font-medium">{userProfile.age}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Gender</label>
                {isEditing ? (
                  <select
                    value={editedProfile.gender}
                    onChange={(e) => setEditedProfile({ ...editedProfile, gender: e.target.value })}
                    className="w-full px-3 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                  </select>
                ) : (
                  <p className="text-foreground font-medium">{userProfile.gender}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                    className="w-full px-3 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p className="text-foreground font-medium">{userProfile.location}</p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Bio</label>
                {isEditing ? (
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                ) : (
                  <p className="text-foreground">{userProfile.bio}</p>
                )}
              </div>

              {/* Interests */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  Looking For
                </label>
                {isEditing ? (
                  <select
                    value={editedProfile.interests[0]}
                    onChange={(e) => setEditedProfile({ ...editedProfile, interests: [e.target.value] })}
                    className="w-full px-3 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Long-term">Long-term Relationship</option>
                    <option value="Casual">Casual Dating</option>
                    <option value="Friendship">Friendship</option>
                  </select>
                ) : (
                  <p className="text-foreground font-medium">{userProfile.interests.join(', ')}</p>
                )}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">About Linkink</h3>
            <div className="bg-muted rounded-xl p-4 space-y-2">
              <p className="text-sm text-muted-foreground">Version 2.0.0</p>
              <p className="text-sm text-muted-foreground">© 2025 Linkink. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


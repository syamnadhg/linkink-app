import { useState } from 'react'
import { X, Moon, Sun, User, Mail, MapPin, Heart, Edit2, Save, CreditCard, HelpCircle, Lock, Bell, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Settings({ isOpen, onClose, theme, onToggleTheme, userProfile, onUpdateProfile }) {
  const [activeTab, setActiveTab] = useState('appearance')
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(userProfile)
  const [matchmakerEnabled, setMatchmakerEnabled] = useState(true)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    matches: true,
    messages: true,
    likes: true
  })
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Visa', last4: '4242', default: true }
  ])
  const [showNewPayment, setShowNewPayment] = useState(false)

  if (!isOpen) return null

  const handleSave = () => {
    onUpdateProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(userProfile)
    setIsEditing(false)
  }

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Sun },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'contact', label: 'Contact & Help', icon: HelpCircle }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden m-4 border border-border flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Tab Navigation */}
          <div className="w-48 border-r border-border bg-muted/30 overflow-y-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 transition-smooth border-l-4 ${
                    activeTab === tab.id
                      ? 'bg-primary/10 border-primary text-primary font-semibold'
                      : 'border-transparent text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Appearance Settings</h3>
                
                <div className="bg-muted rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium text-foreground">Theme</p>
                      <p className="text-sm text-muted-foreground">
                        {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                      </p>
                    </div>
                    <button
                      onClick={onToggleTheme}
                      className="relative inline-flex h-10 w-20 items-center rounded-full transition-colors"
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

                <div className="bg-muted rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Accent Color</p>
                      <p className="text-sm text-muted-foreground">Customize your app colors</p>
                    </div>
                    <div className="flex gap-2">
                      {['purple', 'pink', 'blue', 'green'].map((color) => (
                        <div
                          key={color}
                          className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-transform hover:scale-110 ${
                            color === 'purple' ? 'border-primary' : 'border-transparent'
                          }`}
                          style={{
                            backgroundColor: {
                              purple: '#8b7bb8',
                              pink: '#e91e63',
                              blue: '#2196f3',
                              green: '#4caf50'
                            }[color]
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>
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
                  {/* Alias Name */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1 block">
                      Alias Name (for posts & calls)
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.alias || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, alias: e.target.value })}
                        placeholder="e.g., SkyDreamer, MoonWalker"
                        className="w-full px-3 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      />
                    ) : (
                      <p className="text-foreground font-medium">{editedProfile.alias || 'Not set'}</p>
                    )}
                  </div>

                  {/* Name */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1 block">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                        className="w-full px-3 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      />
                    ) : (
                      <p className="text-foreground font-medium">{editedProfile.name}</p>
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
                        className="w-full px-3 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      />
                    ) : (
                      <p className="text-foreground font-medium">{editedProfile.age}</p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1 block">Gender</label>
                    {isEditing ? (
                      <select
                        value={editedProfile.gender}
                        onChange={(e) => setEditedProfile({ ...editedProfile, gender: e.target.value })}
                        className="w-full px-3 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-Binary">Non-Binary</option>
                      </select>
                    ) : (
                      <p className="text-foreground font-medium">{editedProfile.gender}</p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1 block">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                        className="w-full px-3 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      />
                    ) : (
                      <p className="text-foreground font-medium">{editedProfile.location}</p>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1 block">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={editedProfile.bio}
                        onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                        className="w-full px-3 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                        rows="3"
                      />
                    ) : (
                      <p className="text-foreground">{editedProfile.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Privacy & Safety</h3>

                <div className="bg-muted rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium text-foreground">Matchmaker Status</p>
                      <p className="text-sm text-muted-foreground">
                        {matchmakerEnabled ? 'Visible to others' : 'Hidden (Ghost Mode)'}
                      </p>
                    </div>
                    <button
                      onClick={() => setMatchmakerEnabled(!matchmakerEnabled)}
                      className="relative inline-flex h-10 w-20 items-center rounded-full transition-colors"
                      style={{ backgroundColor: matchmakerEnabled ? '#8b7bb8' : '#ccc' }}
                    >
                      <span
                        className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform ${
                          matchmakerEnabled ? 'translate-x-11' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    When turned off, you won't be visible in the Matches section and can't send/receive match requests
                  </p>
                </div>

                <div className="bg-muted rounded-xl p-4 space-y-3">
                  <p className="font-medium text-foreground mb-3">Privacy Policies</p>
                  <Button variant="outline" className="w-full justify-start">
                    <Lock className="w-4 h-4 mr-2" />
                    Privacy Policy
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Cookie Policy
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    Privacy Preferences
                  </Button>
                </div>
              </div>
            )}

            {/* Payment Tab */}
            {activeTab === 'payment' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Payment Methods</h3>

                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="bg-muted rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{method.type} •••• {method.last4}</p>
                          {method.default && <p className="text-xs text-muted-foreground">Default</p>}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => setShowNewPayment(!showNewPayment)}
                  className="w-full gradient-purple text-white"
                >
                  + Add Payment Method
                </Button>

                {showNewPayment && (
                  <div className="bg-muted rounded-xl p-4 space-y-3">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full px-3 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="px-3 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="px-3 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      />
                    </div>
                    <Button className="w-full gradient-purple text-white">Add Card</Button>
                  </div>
                )}

                <div className="bg-muted rounded-xl p-4">
                  <p className="font-medium text-foreground mb-2">Purchase History</p>
                  <p className="text-sm text-muted-foreground">No purchases yet</p>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>

                <div className="bg-muted rounded-xl p-4 space-y-4">
                  {[
                    { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                    { key: 'push', label: 'Push Notifications', desc: 'Receive alerts on your device' },
                    { key: 'matches', label: 'Match Alerts', desc: 'Notify when you get a match' },
                    { key: 'messages', label: 'Message Alerts', desc: 'Notify when you receive messages' },
                    { key: 'likes', label: 'Like Alerts', desc: 'Notify when someone likes you' }
                  ].map((notif) => (
                    <div key={notif.key} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{notif.label}</p>
                        <p className="text-sm text-muted-foreground">{notif.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, [notif.key]: !notifications[notif.key] })}
                        className="relative inline-flex h-8 w-16 items-center rounded-full transition-colors"
                        style={{ backgroundColor: notifications[notif.key] ? '#8b7bb8' : '#ccc' }}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                            notifications[notif.key] ? 'translate-x-9' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact & Help Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Help & Support</h3>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help Center
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Us
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Report a Problem
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Community Guidelines
                  </Button>
                </div>

                <div className="bg-muted rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Contact Information:</strong>
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    📧 Email: support@linkink.app
                  </p>
                  <p className="text-sm text-muted-foreground">
                    🌐 Website: www.linkink.app
                  </p>
                </div>

                <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                  <p className="text-sm text-foreground">
                    <strong>Version:</strong> 1.0.0
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}




import { useState } from 'react'
import { MessageSquare, Users, Phone } from 'lucide-react'
import AnonymousPosts from './dating/AnonymousPosts'
import DirectMatching from './dating/DirectMatching'
import VoiceSection from './dating/VoiceSection'
import Filters from './dating/Filters'

export default function DatingSection({ onMatch, onStartChat, matches }) {
  const [activeTab, setActiveTab] = useState('posts')
  const [filters, setFilters] = useState({
    distance: 'all',
    gender: 'all',
    interests: 'all'
  })

  const tabs = [
    { id: 'posts', label: 'Posts', icon: MessageSquare },
    { id: 'matches', label: 'Matches', icon: Users },
    { id: 'voice', label: 'Voice', icon: Phone }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4">
        <Filters filters={filters} setFilters={setFilters} />
      </div>
      
      <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
        {/* Tab Navigation */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center px-6 py-4 transition-smooth ${
                  activeTab === tab.id
                    ? 'gradient-purple text-white shadow-lg'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'posts' && (
            <AnonymousPosts 
              filters={filters} 
              onMatch={onMatch}
              onStartChat={onStartChat}
            />
          )}
          {activeTab === 'matches' && (
            <DirectMatching 
              filters={filters}
              onMatch={onMatch}
            />
          )}
          {activeTab === 'voice' && (
            <VoiceSection 
              filters={filters}
              onMatch={onMatch}
            />
          )}
        </div>
      </div>
    </div>
  )
}


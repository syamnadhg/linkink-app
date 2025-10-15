import { useState } from 'react'
import { MessageSquare, Users, Phone } from 'lucide-react'
import AnonymousPosts from './dating/AnonymousPosts'
import DirectMatching from './dating/DirectMatching'
import VoiceSection from './dating/VoiceSection'
import Filters from './dating/Filters'

export default function DatingSection() {
  const [activeTab, setActiveTab] = useState('posts')
  const [filters, setFilters] = useState({
    location: '',
    gender: 'all',
    interests: 'all'
  })

  const tabs = [
    { id: 'posts', label: 'Posts', icon: MessageSquare },
    { id: 'ads', label: 'Matches', icon: Users },
    { id: 'voice', label: 'Voice', icon: Phone }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Filters filters={filters} setFilters={setFilters} />
      </div>
      
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-white/20">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center px-6 py-4 transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
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
          {activeTab === 'posts' && <AnonymousPosts filters={filters} />}
          {activeTab === 'ads' && <DirectMatching filters={filters} />}
          {activeTab === 'voice' && <VoiceSection filters={filters} />}
        </div>
      </div>
    </div>
  )
}


import { MapPin, Users, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Filters({ filters, setFilters }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Location Filter */}
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-white" />
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="flex-1 bg-white/20 text-white border border-white/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value="">All Locations</option>
            <option value="nearby">Nearby (10 miles)</option>
            <option value="city">Same City</option>
            <option value="state">Same State</option>
            <option value="country">Same Country</option>
          </select>
        </div>

        {/* Gender Filter */}
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-white" />
          <select
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
            className="flex-1 bg-white/20 text-white border border-white/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
          </select>
        </div>

        {/* Interests Filter */}
        <div className="flex items-center space-x-2">
          <Heart className="w-5 h-5 text-white" />
          <select
            value={filters.interests}
            onChange={(e) => setFilters({ ...filters, interests: e.target.value })}
            className="flex-1 bg-white/20 text-white border border-white/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value="all">All Interests</option>
            <option value="long-term">Long-term</option>
            <option value="casual">Casual</option>
            <option value="friendship">Friendship</option>
          </select>
        </div>
      </div>
    </div>
  )
}


import { useState } from 'react'
import { MapPin, Users, Heart, SlidersHorizontal, X } from 'lucide-react'

export default function Filters({ filters, setFilters }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const hasActiveFilters = filters.distance !== 'all' || filters.gender !== 'all' || filters.interests !== 'all'

  const clearFilters = () => {
    setFilters({
      distance: 'all',
      gender: 'all',
      interests: 'all'
    })
  }

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
          hasActiveFilters
            ? 'gradient-purple text-white shadow-lg'
            : 'bg-muted text-foreground hover:bg-muted/80'
        }`}
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span className="text-sm font-medium">Filters</span>
        {hasActiveFilters && (
          <span className="bg-white text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {[filters.distance, filters.gender, filters.interests].filter(f => f !== 'all').length}
          </span>
        )}
      </button>

      {/* Expanded Filter Panel */}
      {isExpanded && (
        <div className="absolute top-full left-0 mt-2 bg-card rounded-xl shadow-2xl border border-border p-4 z-50 min-w-[320px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Filter Options</h3>
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-primary hover:text-primary/80 transition-smooth"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-muted rounded transition-smooth"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {/* Distance Filter */}
            <div>
              <label className="flex items-center text-sm font-medium text-muted-foreground mb-1.5">
                <MapPin className="w-3.5 h-3.5 mr-1.5" />
                Distance
              </label>
              <select
                value={filters.distance}
                onChange={(e) => setFilters({ ...filters, distance: e.target.value })}
                className="w-full bg-background text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Distances</option>
                <option value="10">Within 10 miles</option>
                <option value="25">Within 25 miles</option>
                <option value="50">Within 50 miles</option>
                <option value="100">Within 100 miles</option>
                <option value="500">Within 500 miles</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="flex items-center text-sm font-medium text-muted-foreground mb-1.5">
                <Users className="w-3.5 h-3.5 mr-1.5" />
                Gender
              </label>
              <select
                value={filters.gender}
                onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                className="w-full bg-background text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-Binary</option>
              </select>
            </div>

            {/* Interests Filter */}
            <div>
              <label className="flex items-center text-sm font-medium text-muted-foreground mb-1.5">
                <Heart className="w-3.5 h-3.5 mr-1.5" />
                Looking For
              </label>
              <select
                value={filters.interests}
                onChange={(e) => setFilters({ ...filters, interests: e.target.value })}
                className="w-full bg-background text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Interests</option>
                <option value="long-term">Long-term</option>
                <option value="casual">Casual</option>
                <option value="friendship">Friendship</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


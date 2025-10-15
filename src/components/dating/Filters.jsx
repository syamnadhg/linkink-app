import { MapPin, Users, Heart } from 'lucide-react'

export default function Filters({ filters, setFilters }) {
  return (
    <div className="bg-card rounded-xl p-3 shadow-sm border border-border">
      <div className="flex flex-wrap gap-2">
        {/* Distance Filter */}
        <div className="flex items-center space-x-2 flex-1 min-w-[150px]">
          <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <select
            value={filters.distance}
            onChange={(e) => setFilters({ ...filters, distance: e.target.value })}
            className="flex-1 bg-background text-foreground border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
        <div className="flex items-center space-x-2 flex-1 min-w-[150px]">
          <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <select
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
            className="flex-1 bg-background text-foreground border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
          </select>
        </div>

        {/* Interests Filter */}
        <div className="flex items-center space-x-2 flex-1 min-w-[150px]">
          <Heart className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <select
            value={filters.interests}
            onChange={(e) => setFilters({ ...filters, interests: e.target.value })}
            className="flex-1 bg-background text-foreground border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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


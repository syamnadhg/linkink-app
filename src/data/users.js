// Mock user data with filter values
export const mockUsers = [
  {
    id: 1,
    name: "Alex",
    age: 25,
    bio: "Coffee enthusiast, bookworm, and adventure seeker. Looking for meaningful connections.",
    interests: "long-term",
    gender: "female",
    location: "New York",
    distance: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    isOnline: true
  },
  {
    id: 2,
    name: "Jordan",
    age: 28,
    bio: "Fitness lover, foodie, and travel addict. Let's explore the world together!",
    interests: "casual",
    gender: "male",
    location: "Los Angeles",
    distance: 2800,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    isOnline: false
  },
  {
    id: 3,
    name: "Sam",
    age: 26,
    bio: "Artist by day, gamer by night. Looking for someone to share creative moments with.",
    interests: "friendship",
    gender: "non-binary",
    location: "Chicago",
    distance: 800,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    isOnline: true
  },
  {
    id: 4,
    name: "Taylor",
    age: 24,
    bio: "Music producer and vinyl collector. Let's vibe to some good tunes.",
    interests: "casual",
    gender: "male",
    location: "Austin",
    distance: 1500,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    isOnline: true
  },
  {
    id: 5,
    name: "Morgan",
    age: 27,
    bio: "Yoga instructor and wellness coach. Seeking balance and genuine connection.",
    interests: "long-term",
    gender: "female",
    location: "San Francisco",
    distance: 2900,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    isOnline: false
  },
  {
    id: 6,
    name: "Casey",
    age: 29,
    bio: "Software engineer who loves hiking and photography. Adventure awaits!",
    interests: "friendship",
    gender: "male",
    location: "Seattle",
    distance: 2800,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    isOnline: true
  },
  {
    id: 7,
    name: "Riley",
    age: 23,
    bio: "Fashion designer with a passion for sustainable living and good conversations.",
    interests: "casual",
    gender: "female",
    location: "Miami",
    distance: 1300,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
    isOnline: true
  },
  {
    id: 8,
    name: "Avery",
    age: 30,
    bio: "Chef and food blogger. Let's cook up something special together.",
    interests: "long-term",
    gender: "non-binary",
    location: "Portland",
    distance: 2800,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
    isOnline: false
  },
  {
    id: 9,
    name: "Quinn",
    age: 26,
    bio: "Graphic designer and dog lover. Looking for someone who appreciates art and cuddles.",
    interests: "friendship",
    gender: "female",
    location: "Denver",
    distance: 1800,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    isOnline: true
  },
  {
    id: 10,
    name: "Blake",
    age: 31,
    bio: "Entrepreneur and thrill-seeker. Life's too short for boring dates!",
    interests: "casual",
    gender: "male",
    location: "Boston",
    distance: 220,
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
    isOnline: true
  },
  {
    id: 11,
    name: "Drew",
    age: 25,
    bio: "Marine biologist passionate about ocean conservation. Let's make waves together.",
    interests: "long-term",
    gender: "female",
    location: "San Diego",
    distance: 2800,
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
    isOnline: false
  },
  {
    id: 12,
    name: "Skylar",
    age: 27,
    bio: "Musician and songwriter. Looking for someone to harmonize with in life.",
    interests: "friendship",
    gender: "non-binary",
    location: "Nashville",
    distance: 900,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    isOnline: true
  }
]

// Mock anonymous posts
export const mockPosts = [
  {
    id: 1,
    userId: 1,
    text: "Just moved to the city and looking to meet new people. Anyone want to grab coffee? ☕",
    timestamp: "2 hours ago",
    replies: 12,
    likes: 24,
    location: "New York",
    gender: "female",
    interests: "friendship"
  },
  {
    id: 2,
    userId: 4,
    text: "Love hiking and outdoor adventures. Would be great to find someone who shares the same passion! 🏔️",
    timestamp: "4 hours ago",
    replies: 8,
    likes: 15,
    location: "Austin",
    gender: "male",
    interests: "casual"
  },
  {
    id: 3,
    userId: 7,
    text: "Looking for someone to binge-watch shows with and have deep conversations about life 🎬",
    timestamp: "6 hours ago",
    replies: 20,
    likes: 35,
    location: "Miami",
    gender: "female",
    interests: "long-term"
  },
  {
    id: 4,
    userId: 10,
    text: "Foodie alert! Who wants to explore new restaurants and try exotic cuisines? 🍜",
    timestamp: "8 hours ago",
    replies: 15,
    likes: 28,
    location: "Boston",
    gender: "male",
    interests: "casual"
  },
  {
    id: 5,
    userId: 3,
    text: "Artist looking for creative souls to collaborate with. Let's make something beautiful! 🎨",
    timestamp: "10 hours ago",
    replies: 10,
    likes: 22,
    location: "Chicago",
    gender: "non-binary",
    interests: "friendship"
  },
  {
    id: 6,
    userId: 9,
    text: "Dog parent seeking fellow dog lovers for park dates and puppy playdates 🐕",
    timestamp: "12 hours ago",
    replies: 18,
    likes: 40,
    location: "Denver",
    gender: "female",
    interests: "friendship"
  }
]

export function filterUsers(users, filters) {
  return users.filter(user => {
    // Distance filter
    if (filters.distance !== 'all') {
      const maxDistance = parseInt(filters.distance)
      if (user.distance > maxDistance) return false
    }
    
    // Gender filter
    if (filters.gender !== 'all' && user.gender !== filters.gender) {
      return false
    }
    
    // Interests filter
    if (filters.interests !== 'all' && user.interests !== filters.interests) {
      return false
    }
    
    return true
  })
}

export function filterPosts(posts, filters) {
  return posts.filter(post => {
    // Gender filter
    if (filters.gender !== 'all' && post.gender !== filters.gender) {
      return false
    }
    
    // Interests filter
    if (filters.interests !== 'all' && post.interests !== filters.interests) {
      return false
    }
    
    return true
  })
}


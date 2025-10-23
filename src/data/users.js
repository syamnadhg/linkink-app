export const mockUsers = [
  {
    id: 1,
    name: "Alex",
    alias: "BookLover",
    age: 25,
    bio: "Coffee enthusiast, bookworm, and adventure seeker. Looking for meaningful connections.",
    interests: "long-term",
    gender: "female",
    sexualOrientation: "straight",
    relationshipType: "monogamous",
    location: "New York",
    distance: 5,
    images: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "My perfect Sunday", answer: "Brunch, a good book, and a long walk in Central Park" },
      { question: "I'm looking for", answer: "Someone who can make me laugh and loves deep conversations" },
      { question: "My ideal date", answer: "Exploring a new coffee shop and getting lost in conversation" }
    ],
    height: "5'6\"",
    occupation: "Marketing Manager",
    education: "NYU",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
  },
  {
    id: 2,
    name: "Jordan",
    alias: "TravelBug",
    age: 28,
    bio: "Fitness lover, foodie, and travel addict. Let's explore the world together!",
    interests: "casual",
    gender: "male",
    sexualOrientation: "straight",
    relationshipType: "monogamous",
    location: "Los Angeles",
    distance: 2800,
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "Best travel story", answer: "Backpacked through Southeast Asia for 3 months" },
      { question: "My go-to karaoke song", answer: "Don't Stop Believin' - Journey" },
      { question: "I'm weirdly attracted to", answer: "People who can cook amazing food" }
    ],
    height: "6'1\"",
    occupation: "Personal Trainer",
    education: "UCLA",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
  },
  {
    id: 3,
    name: "Sam",
    alias: "ArtisticSoul",
    age: 26,
    bio: "Artist by day, gamer by night. Looking for someone to share creative moments with.",
    interests: "friendship",
    gender: "non-binary",
    sexualOrientation: "pansexual",
    relationshipType: "open to anything",
    location: "Chicago",
    distance: 800,
    images: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "My creative outlet", answer: "Digital illustration and watercolor painting" },
      { question: "Favorite game", answer: "Currently obsessed with Baldur's Gate 3" },
      { question: "Perfect weekend", answer: "Art gallery hopping followed by a gaming marathon" }
    ],
    height: "5'8\"",
    occupation: "Graphic Designer",
    education: "School of the Art Institute",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
  },
  {
    id: 4,
    name: "Taylor",
    alias: "MusicMogul",
    age: 24,
    bio: "Music producer and vinyl collector. Let's vibe to some good tunes.",
    interests: "casual",
    gender: "male",
    sexualOrientation: "bisexual",
    relationshipType: "non-monogamous",
    location: "Austin",
    distance: 1500,
    images: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "My music taste", answer: "Everything from jazz to indie rock to lo-fi hip hop" },
      { question: "Hidden talent", answer: "I can play 5 instruments (badly)" },
      { question: "Dream collaboration", answer: "Would love to produce a track with Anderson .Paak" }
    ],
    height: "5'10\"",
    occupation: "Music Producer",
    education: "Berklee College of Music",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  },
  {
    id: 5,
    name: "Morgan",
    alias: "ZenSeeker",
    age: 27,
    bio: "Yoga instructor and wellness coach. Seeking balance and genuine connection.",
    interests: "long-term",
    gender: "female",
    sexualOrientation: "straight",
    relationshipType: "monogamous",
    location: "San Francisco",
    distance: 2900,
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "My morning routine", answer: "Meditation, yoga, and a matcha latte" },
      { question: "I value", answer: "Authenticity, mindfulness, and deep conversations" },
      { question: "Let's connect over", answer: "A sunset hike or a cozy tea ceremony" }
    ],
    height: "5'7\"",
    occupation: "Yoga Instructor",
    education: "UC Berkeley",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) // 3 days ago
  },
  {
    id: 6,
    name: "Casey",
    alias: "CodeExplorer",
    age: 29,
    bio: "Software engineer who loves hiking and photography. Adventure awaits!",
    interests: "friendship",
    gender: "male",
    sexualOrientation: "straight",
    relationshipType: "monogamous",
    location: "Seattle",
    distance: 2800,
    images: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "Best photo I've taken", answer: "Sunrise at Mt. Rainier - still gives me chills" },
      { question: "Coding philosophy", answer: "Write code that humans can read" },
      { question: "Weekend plans", answer: "Hiking the Pacific Crest Trail one section at a time" }
    ],
    height: "6'0\"",
    occupation: "Software Engineer",
    education: "University of Washington",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 10) // 10 minutes ago
  },
  {
    id: 7,
    name: "Riley",
    alias: "EcoChic",
    age: 23,
    bio: "Fashion designer with a passion for sustainable living and good conversations.",
    interests: "casual",
    gender: "female",
    sexualOrientation: "bisexual",
    relationshipType: "monogamous",
    location: "Miami",
    distance: 1300,
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "My design philosophy", answer: "Fashion should be beautiful AND sustainable" },
      { question: "Guilty pleasure", answer: "Thrifting vintage clothes every weekend" },
      { question: "Dream project", answer: "Launch my own eco-friendly clothing line" }
    ],
    height: "5'5\"",
    occupation: "Fashion Designer",
    education: "Parsons School of Design",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 45) // 45 minutes ago
  },
  {
    id: 8,
    name: "Avery",
    alias: "GourmetChef",
    age: 30,
    bio: "Chef and food blogger. Let's cook up something special together.",
    interests: "long-term",
    gender: "non-binary",
    sexualOrientation: "gay",
    relationshipType: "monogamous",
    location: "Portland",
    distance: 2800,
    images: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "Signature dish", answer: "Homemade pasta with truffle cream sauce" },
      { question: "Food philosophy", answer: "Local, seasonal, and made with love" },
      { question: "Let's bond over", answer: "Cooking a meal together from scratch" }
    ],
    height: "5'9\"",
    occupation: "Chef & Food Blogger",
    education: "Culinary Institute of America",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) // 5 days ago
  },
  {
    id: 9,
    name: "Quinn",
    alias: "DogWhisperer",
    age: 26,
    bio: "Graphic designer and dog lover. Looking for someone who appreciates art and cuddles.",
    interests: "friendship",
    gender: "female",
    sexualOrientation: "straight",
    relationshipType: "monogamous",
    location: "Denver",
    distance: 1800,
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "My best friend", answer: "My golden retriever, Charlie (he's on my profile!)" },
      { question: "Design inspiration", answer: "Nature, architecture, and random Pinterest binges" },
      { question: "Perfect date", answer: "Dog park, coffee, and browsing an art museum" }
    ],
    height: "5'4\"",
    occupation: "Graphic Designer",
    education: "Rhode Island School of Design",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 20) // 20 minutes ago
  },
  {
    id: 10,
    name: "Blake",
    alias: "ThrillSeeker",
    age: 31,
    bio: "Entrepreneur and thrill-seeker. Life's too short for boring dates!",
    interests: "casual",
    gender: "male",
    sexualOrientation: "straight",
    relationshipType: "non-monogamous",
    location: "Boston",
    distance: 220,
    images: [
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "Biggest risk I've taken", answer: "Quit my corporate job to start my own company" },
      { question: "Adrenaline fix", answer: "Skydiving, rock climbing, or trying new restaurants" },
      { question: "Looking for", answer: "Someone spontaneous who's down for last-minute adventures" }
    ],
    height: "6'2\"",
    occupation: "Entrepreneur",
    education: "Harvard Business School",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 50) // 50 minutes ago
  },
  {
    id: 11,
    name: "Drew",
    alias: "OceanGuard",
    age: 25,
    bio: "Marine biologist passionate about ocean conservation. Let's make waves together.",
    interests: "long-term",
    gender: "female",
    sexualOrientation: "straight",
    relationshipType: "monogamous",
    location: "San Diego",
    distance: 2800,
    images: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "My biggest passion", answer: "Protecting our oceans and marine life" },
      { question: "Favorite sea creature", answer: "Octopus - they're so intelligent and mysterious" },
      { question: "Let's explore", answer: "A hidden beach or go snorkeling together" }
    ],
    height: "5'5\"",
    occupation: "Marine Biologist",
    education: "Scripps Institution of Oceanography",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
  },
  {
    id: 12,
    name: "Chris",
    alias: "TechGuru",
    age: 32,
    bio: "Tech entrepreneur and avid hiker. Looking for someone to conquer mountains and startups with.",
    interests: "long-term",
    gender: "male",
    sexualOrientation: "straight",
    relationshipType: "monogamous",
    location: "San Jose",
    distance: 2900,
    images: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "My latest obsession", answer: "AI ethics and its future impact" },
      { question: "Favorite way to unwind", answer: "A challenging hike with breathtaking views" },
      { question: "I'm a pro at", answer: "Turning ideas into reality (and making a great cup of coffee)" }
    ],
    height: "6'0\"",
    occupation: "Tech Entrepreneur",
    education: "Stanford University",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 25) // 25 minutes ago
  },
  {
    id: 13,
    name: "Pat",
    alias: "FilmBuff",
    age: 28,
    bio: "Filmmaker and storyteller. Looking for someone to share cinematic experiences and create new ones.",
    interests: "casual",
    gender: "non-binary",
    sexualOrientation: "queer",
    relationshipType: "open to anything",
    location: "New Orleans",
    distance: 1900,
    images: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "My favorite movie genre", answer: "Indie dramas and psychological thrillers" },
      { question: "A skill I'm learning", answer: "Screenwriting for my next big project" },
      { question: "Let's talk about", answer: "The hidden meanings in your favorite films" }
    ],
    height: "5'7\"",
    occupation: "Filmmaker",
    education: "NYU Film School",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 35) // 35 minutes ago
  },
  {
    id: 14,
    name: "Jamie",
    alias: "FoodieExplorer",
    age: 29,
    bio: "Gourmand and cultural explorer. Seeking someone to discover new flavors and experiences with.",
    interests: "long-term",
    gender: "female",
    sexualOrientation: "straight",
    relationshipType: "monogamous",
    location: "Charleston",
    distance: 900,
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "My ideal meal", answer: "A multi-course tasting menu with wine pairings" },
      { question: "Favorite cuisine", answer: "Thai street food and authentic Italian" },
      { question: "Let's try", answer: "That new fusion restaurant everyone's talking about" }
    ],
    height: "5'6\"",
    occupation: "Food Critic",
    education: "Culinary Institute of Charleston",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
  },
  {
    id: 15,
    name: "Dakota",
    alias: "NatureLover",
    age: 27,
    bio: "Environmental scientist and outdoor enthusiast. Looking for someone to explore the wild with.",
    interests: "friendship",
    gender: "non-binary",
    sexualOrientation: "asexual",
    relationshipType: "open to anything",
    location: "Boise",
    distance: 2000,
    images: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "My happy place", answer: "Deep in the forest, surrounded by trees" },
      { question: "A cause I support", answer: "Wildlife conservation and climate action" },
      { question: "Let's go", answer: "Camping under the stars or whitewater rafting" }
    ],
    height: "5'8\"",
    occupation: "Environmental Scientist",
    education: "University of Idaho",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 10) // 10 minutes ago
  },
  {
    id: 16,
    name: "Rowan",
    alias: "Bookworm",
    age: 24,
    bio: "Librarian and aspiring writer. Looking for someone to get lost in stories with.",
    interests: "long-term",
    gender: "female",
    sexualOrientation: "straight",
    relationshipType: "monogamous",
    location: "Philadelphia",
    distance: 100,
    images: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "My favorite book", answer: "'One Hundred Years of Solitude' - a masterpiece!" },
      { question: "A story I'm writing", answer: "A fantasy novel about a lost kingdom" },
      { question: "Let's discuss", answer: "The meaning of life over a cup of tea" }
    ],
    height: "5'4\"",
    occupation: "Librarian",
    education: "University of Pennsylvania",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
  },
  {
    id: 17,
    name: "Kai",
    alias: "GamerPro",
    age: 29,
    bio: "Professional gamer and streamer. Seeking a player two for life's adventures.",
    interests: "casual",
    gender: "male",
    sexualOrientation: "straight",
    relationshipType: "monogamous",
    location: "Los Angeles",
    distance: 2800,
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "My main in Apex Legends", answer: "Wraith - gotta go fast!" },
      { question: "Favorite gaming snack", answer: "Doritos and Mountain Dew, classic combo" },
      { question: "Let's queue up for", answer: "Some ranked Apex or a chill Stardew Valley session" }
    ],
    height: "5'11\"",
    occupation: "Professional Gamer",
    education: "Full Sail University",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 20) // 20 minutes ago
  },
  {
    id: 18,
    name: "Sage",
    alias: "Wanderlust",
    age: 26,
    bio: "Travel blogger and photographer. My passport has more stamps than a post office.",
    interests: "friendship",
    gender: "non-binary",
    sexualOrientation: "bisexual",
    relationshipType: "open to anything",
    location: "Bali",
    distance: 9000,
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "My next adventure", answer: "Hiking the Himalayas and exploring Bhutan" },
      { question: "Favorite travel memory", answer: "Swimming with whale sharks in the Philippines" },
      { question: "Let's plan", answer: "A spontaneous trip to somewhere we've never been" }
    ],
    height: "5'6\"",
    occupation: "Travel Blogger",
    education: "University of Cambridge",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
  },
  {
    id: 19,
    name: "Morgana",
    alias: "MysticMaven",
    age: 30,
    bio: "Astrologer and spiritual guide. Seeking cosmic connections and deep conversations.",
    interests: "long-term",
    gender: "female",
    sexualOrientation: "straight",
    relationshipType: "monogamous",
    location: "Sedona",
    distance: 2500,
    images: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "My zodiac sign", answer: "Scorpio - intense and passionate!" },
      { question: "A spiritual practice I love", answer: "Moon rituals and crystal healing" },
      { question: "Let's explore", answer: "Our birth charts and cosmic compatibility" }
    ],
    height: "5'7\"",
    occupation: "Astrologer",
    education: "Online Certifications",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  },
  {
    id: 20,
    name: "Zane",
    alias: "AdrenalineJunkie",
    age: 27,
    bio: "Extreme sports enthusiast and videographer. Always chasing the next thrill.",
    interests: "casual",
    gender: "male",
    sexualOrientation: "straight",
    relationshipType: "non-monogamous",
    location: "Salt Lake City",
    distance: 2300,
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
    ],
    prompts: [
      { question: "My craziest adventure", answer: "Base jumping off a cliff in Norway" },
      { question: "Next big challenge", answer: "Climbing K2 (maybe)" },
      { question: "Let's get wild with", answer: "Skiing, snowboarding, or mountain biking" }
    ],
    height: "6'1\"",
    occupation: "Videographer",
    education: "University of Utah",
    isOnline: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 10) // 10 minutes ago
  }
];



// Mock posts data for the Posts section
export const mockPosts = [
  {
    id: 1,
    userId: 1,
    anonymousId: 'Anon-xyz123',
    alias: 'BookLover',
    text: 'Looking for someone to discuss philosophy with over coffee ☕📚',
    image: null,
    timestamp: '2 hours ago',
    comments: [],
    likes: 5,
    location: 'New York',
    gender: 'female',
    distance: 5,
    interests: 'long-term'
  },
  {
    id: 2,
    userId: 2,
    anonymousId: 'Anon-abc456',
    alias: 'TravelBug',
    text: 'Just got back from an amazing hiking trip! Who wants to explore new trails with me? 🏔️',
    image: null,
    timestamp: '4 hours ago',
    comments: [],
    likes: 12,
    location: 'Los Angeles',
    gender: 'male',
    distance: 2800,
    interests: 'casual'
  },
  {
    id: 3,
    userId: 3,
    anonymousId: 'Anon-def789',
    alias: 'ArtisticSoul',
    text: 'Creating art and looking for creative minds to collaborate with 🎨✨',
    image: null,
    timestamp: '6 hours ago',
    comments: [],
    likes: 8,
    location: 'Chicago',
    gender: 'non-binary',
    distance: 800,
    interests: 'friendship'
  }
]

// Filter posts based on filters
export const filterPosts = (posts, filters) => {
  return posts.filter(post => {
    if (filters.distance && filters.distance !== 'all') {
      const maxDistance = parseInt(filters.distance)
      if (post.distance > maxDistance) return false
    }
    if (filters.gender && filters.gender !== 'all' && post.gender !== filters.gender) return false
    if (filters.interests && filters.interests !== 'all' && post.interests !== filters.interests) return false
    return true
  })
}



// Filter users based on filters
export const filterUsers = (users, filters) => {
  return users.filter(user => {
    if (filters.distance && filters.distance !== 'all') {
      const maxDistance = parseInt(filters.distance)
      if (user.distance > maxDistance) return false
    }
    if (filters.gender && filters.gender !== 'all' && user.gender !== filters.gender) return false
    if (filters.interests && filters.interests !== 'all' && user.interests !== filters.interests) return false
    return true
  })
}


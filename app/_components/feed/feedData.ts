
// Generate more realistic mock data
const beadImages = [
  'https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg',
  'https://images.pexels.com/photos/1097930/pexels-photo-1097930.jpeg',
  'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
  'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg',
  'https://images.pexels.com/photos/1366942/pexels-photo-1366942.jpeg',
  'https://images.pexels.com/photos/1366944/pexels-photo-1366944.jpeg',
  'https://images.pexels.com/photos/1366945/pexels-photo-1366945.jpeg',
  'https://images.pexels.com/photos/1366946/pexels-photo-1366946.jpeg',
];

const userAvatars = [
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
  'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg',
  'https://images.pexels.com/photos/1222273/pexels-photo-1222273.jpeg',
];

const locations = [
  { lat: 40.7128, lng: -74.0060, address: 'New York, NY' },
  { lat: 34.0522, lng: -118.2437, address: 'Los Angeles, CA' },
  { lat: 25.7617, lng: -80.1918, address: 'Miami, FL' },
  { lat: 41.8781, lng: -87.6298, address: 'Chicago, IL' },
  { lat: 37.7749, lng: -122.4194, address: 'San Francisco, CA' },
  { lat: 47.6062, lng: -122.3321, address: 'Seattle, WA' },
  { lat: 39.7392, lng: -104.9903, address: 'Denver, CO' },
  { lat: 30.2672, lng: -97.7431, address: 'Austin, TX' },
];

const beadNames = [
  'Mystic Journey Bead', 'Ocean Dreams Bead', 'Forest Whisper Bead', 'Desert Rose Bead',
  'Mountain Echo Bead', 'River Flow Bead', 'Sunset Glow Bead', 'Moonlight Bead',
  'Crystal Vision Bead', 'Golden Path Bead', 'Silver Moon Bead', 'Ruby Heart Bead',
  'Emerald Forest Bead', 'Sapphire Sky Bead', 'Diamond Star Bead', 'Pearl Wisdom Bead',
  'Amber Light Bead', 'Jade Harmony Bead', 'Opal Magic Bead', 'Turquoise Peace Bead'
];

const beadDescriptions = [
  'A beautiful handcrafted bead that carries the essence of wanderlust and connection.',
  'Crafted with sea glass and blessed by ocean waves, this bead carries the serenity of the sea.',
  'Made from ancient wood and forest herbs, this bead connects you to nature\'s wisdom.',
  'Formed in the desert sands, this bead holds the power of transformation and resilience.',
  'Carved from mountain stone, this bead embodies strength and perseverance.',
  'Shaped by flowing waters, this bead represents adaptability and grace.',
  'Infused with sunset colors, this bead brings warmth and hope to all who hold it.',
  'Blessed under the full moon, this bead carries lunar energy and intuition.',
];

const userNames = [
  'Alex Rivera', 'Jordan Smith', 'Casey Johnson', 'Morgan Davis', 'Taylor Wilson',
  'Riley Brown', 'Avery Jones', 'Quinn Garcia', 'Sage Miller', 'River Martinez'
];

const messages = [
  'Starting this bead\'s journey with love and intention!',
  'Found this beautiful bead today! The energy it carries is incredible.',
  'Adding my own story to this amazing journey.',
  'This bead has traveled so far and touched so many hearts.',
  'Grateful to be part of this bead\'s continuing story.',
  'The connection I feel to this bead is profound.',
  'Sending this bead forward with blessings and good wishes.',
  'What an incredible journey this bead has had!',
  'Adding my chapter to this beautiful story.',
  'The magic of this bead continues to amaze me.',
];

// Generate 100+ beads
export const mockBeads: any[] = Array.from({ length: 120 }, (_, index) => {
  const beadId = (index + 1).toString();
  const createdDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Last 30 days
  const threadLength = Math.floor(Math.random() * 8) + 1; // 1-8 entries per bead
  
  const thread = Array.from({ length: threadLength }, (_, threadIndex) => {
    const userId = Math.floor(Math.random() * 10) + 1;
    const userName = userNames[userId % userNames.length];
    const entryDate = new Date(createdDate.getTime() + threadIndex * 24 * 60 * 60 * 1000);
    
    return {
      id: `t${beadId}_${threadIndex + 1}`,
      userId: userId.toString(),
      userInitials: userName.split(' ').map(n => n[0]).join(''),
      userName,
      userAvatar: userAvatars[userId % userAvatars.length],
      location: Math.random() > 0.3 ? locations[Math.floor(Math.random() * locations.length)] : undefined,
      message: messages[Math.floor(Math.random() * messages.length)],
      media: [],
      timestamp: entryDate,
      likes: Array.from({ length: Math.floor(Math.random() * 15) }, (_, likeIndex) => ({
        id: `like_${beadId}_${threadIndex}_${likeIndex}`,
        userId: (Math.floor(Math.random() * 10) + 1).toString(),
        userName: userNames[Math.floor(Math.random() * userNames.length)],
        timestamp: new Date(entryDate.getTime() + Math.random() * 60 * 60 * 1000),
      })),
      comments: Array.from({ length: Math.floor(Math.random() * 5) }, (_, commentIndex) => ({
        id: `comment_${beadId}_${threadIndex}_${commentIndex}`,
        userId: (Math.floor(Math.random() * 10) + 1).toString(),
        userName: userNames[Math.floor(Math.random() * userNames.length)],
        userAvatar: userAvatars[Math.floor(Math.random() * userAvatars.length)],
        message: `This is such a beautiful bead! Love the journey it's on.`,
        timestamp: new Date(entryDate.getTime() + Math.random() * 60 * 60 * 1000),
      })),
    };
  });

  return {
    id: beadId,
    name: beadNames[index % beadNames.length] + ` #${index + 1}`,
    description: beadDescriptions[index % beadDescriptions.length],
    qrCode: `QR_${beadNames[index % beadNames.length].replace(/\s+/g, '').toUpperCase()}_${String(index + 1).padStart(3, '0')}`,
    createdAt: createdDate,
    currentOwnerId: thread[thread.length - 1].userId,
    thread,
    image: beadImages[index % beadImages.length],
    likes: Array.from({ length: Math.floor(Math.random() * 25) }, (_, likeIndex) => ({
      id: `bead_like_${beadId}_${likeIndex}`,
      userId: (Math.floor(Math.random() * 10) + 1).toString(),
      userName: userNames[Math.floor(Math.random() * userNames.length)],
      timestamp: new Date(createdDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000),
    })),
    comments: Array.from({ length: Math.floor(Math.random() * 8) }, (_, commentIndex) => ({
      id: `bead_comment_${beadId}_${commentIndex}`,
      userId: (Math.floor(Math.random() * 10) + 1).toString(),
      userName: userNames[Math.floor(Math.random() * userNames.length)],
      userAvatar: userAvatars[Math.floor(Math.random() * userAvatars.length)],
      message: `Amazing bead! Love following its journey.`,
      timestamp: new Date(createdDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000),
    })),
  };
});

// Generate feed posts from bead activities
export const generateFeedPosts = (): any[] => {
  const posts: any[] = [];
  
  mockBeads.forEach(bead => {
    // Add bead creation post
    posts.push({
      id: `post_create_${bead.id}`,
      type: 'bead_created',
      beadId: bead.id,
      beadName: bead.name,
      beadImage: bead.image,
      userId: bead.thread[0].userId,
      userName: bead.thread[0].userName,
      userAvatar: bead.thread[0].userAvatar,
      content: `Created a new bead: "${bead.name}" - ${bead.description}`,
      location: bead.thread[0].location,
      timestamp: bead.createdAt,
      likes: bead.likes.slice(0, Math.floor(Math.random() * 10)),
      comments: bead.comments.slice(0, Math.floor(Math.random() * 3)),
    });

    // Add ownership transfer posts
    bead.thread.slice(1).forEach((entry : any, index: any) => {
      posts.push({
        id: `post_transfer_${bead.id}_${index}`,
        type: 'ownership_transfer',
        beadId: bead.id,
        beadName: bead.name,
        beadImage: bead.image,
        userId: entry.userId,
        userName: entry.userName,
        userAvatar: entry.userAvatar,
        content: entry.message || `Received "${bead.name}" and continuing its journey!`,
        location: entry.location,
        timestamp: entry.timestamp,
        likes: entry.likes.slice(0, Math.floor(Math.random() * 8)),
        comments: entry.comments.slice(0, Math.floor(Math.random() * 2)),
      });
    });
  });

  return posts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const addBead = (bead: any): void => {
  mockBeads.push(bead);
};

export const findBeadByQR = (qrCode: string): any | undefined => {
  return mockBeads.find(bead => bead.qrCode === qrCode);
};

export const getBeadById = (id: string): any | undefined => {
  return mockBeads.find(bead => bead.id === id);
};

export const getRecentBeads = (limit: number = 10): any[] => {
  return mockBeads
    .sort((a, b) => {
      const aLatest = Math.max(...a.thread.map((t: any) => t.timestamp.getTime()));
      const bLatest = Math.max(...b.thread.map((t: any) => t.timestamp.getTime()));
      return bLatest - aLatest;
    })
    .slice(0, limit);
};
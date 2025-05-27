import { Bead, BeadType, Thread, User } from '../types/mock';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Zephyr Nova',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Cosmic collector and traveler of the digital realm',
    location: { lat: 37.7749, lng: -122.4194, name: 'San Francisco' },
    badges: [
      {
        id: 'b1',
        name: 'Master Collector',
        description: 'Collected over 100 unique beads',
        icon: 'award',
        acquiredAt: '2024-08-15T12:00:00Z',
      },
      {
        id: 'b2',
        name: 'Storyteller',
        description: 'Shared over 50 stories',
        icon: 'book-open',
        acquiredAt: '2024-07-20T15:30:00Z',
      },
    ],
    ownedBeads: ['bead1', 'bead3', 'bead5'],
    joinedThreads: ['thread1', 'thread2'],
    stories: [],
    meetingHistory: [],
  },
  {
    id: 'u2',
    name: 'Lyra Quantum',
    avatar: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Seeking the rarest artifacts across the galaxies',
    location: { lat: 51.5074, lng: -0.1278, name: 'London' },
    badges: [
      {
        id: 'b3',
        name: 'Traveler',
        description: 'Exchanged beads in 10 different locations',
        icon: 'globe',
        acquiredAt: '2024-09-05T14:20:00Z',
      },
    ],
    ownedBeads: ['bead2', 'bead4'],
    joinedThreads: ['thread1'],
    stories: [],
    meetingHistory: [],
  },
];

export const mockBeads: Bead[] = [
  {
    id: 'bead1',
    name: 'Celestial Amethyst',
    type: BeadType.CRYSTAL,
    description: 'A rare crystal from the Andromeda Galaxy, vibrating with cosmic energy',
    value: 5000,
    originStory: 'Discovered in the ruins of an ancient alien civilization, this crystal is said to hold the memories of a dying star.',
    image: 'https://images.pexels.com/photos/616849/pexels-photo-616849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=bead1&size=200x200',
    threadId: 'thread1',
    currentOwnerId: 'u1',
    ownershipHistory: [
      {
        id: 'oh1',
        userId: 'u2',
        userName: 'Lyra Quantum',
        userAvatar: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        acquiredAt: '2024-06-10T09:00:00Z',
        location: { lat: 40.7128, lng: -74.0060, name: 'New York' },
        previousOwnerId: null,
      },
      {
        id: 'oh2',
        userId: 'u1',
        userName: 'Zephyr Nova',
        userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        acquiredAt: '2024-07-15T16:30:00Z',
        location: { lat: 37.7749, lng: -122.4194, name: 'San Francisco' },
        previousOwnerId: 'u2',
      },
    ],
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'Zephyr Nova',
        userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: 'The energy from this crystal has transformed my meditation practice. I can feel the cosmic vibrations!',
        rating: 5,
        createdAt: '2024-07-20T12:00:00Z',
      },
    ],
    stories: [
      {
        id: 's1',
        userId: 'u1',
        userName: 'Zephyr Nova',
        userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        title: 'Dreams of Andromeda',
        content: 'Since acquiring the Celestial Amethyst, I have been having vivid dreams of alien landscapes and strange beings. Last night, I dreamt I was floating through a nebula, surrounded by stars being born...',
        createdAt: '2024-07-25T08:45:00Z',
        likes: 42,
        shares: 12,
      },
    ],
    createdAt: '2024-06-10T09:00:00Z',
  },
  {
    id: 'bead2',
    name: 'Quantum Diamond',
    type: BeadType.DIAMOND,
    description: 'A diamond that exists in multiple dimensions simultaneously',
    value: 12000,
    originStory: 'Created in a particle accelerator where quantum fluctuations were captured in crystalline form.',
    image: 'https://images.pexels.com/photos/1303929/pexels-photo-1303929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=bead2&size=200x200',
    threadId: 'thread1',
    currentOwnerId: 'u2',
    ownershipHistory: [
      {
        id: 'oh3',
        userId: 'u1',
        userName: 'Zephyr Nova',
        userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        acquiredAt: '2024-05-20T14:15:00Z',
        location: { lat: 34.0522, lng: -118.2437, name: 'Los Angeles' },
        previousOwnerId: null,
      },
      {
        id: 'oh4',
        userId: 'u2',
        userName: 'Lyra Quantum',
        userAvatar: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        acquiredAt: '2024-06-05T11:20:00Z',
        location: { lat: 51.5074, lng: -0.1278, name: 'London' },
        previousOwnerId: 'u1',
      },
    ],
    reviews: [],
    stories: [],
    createdAt: '2024-05-20T14:15:00Z',
  },
  {
    id: 'bead3',
    name: 'Chrono Stone',
    type: BeadType.STONE,
    description: 'A stone that occasionally glitches out of our timeline',
    value: 8000,
    originStory: 'Found near a temporal anomaly in the Bermuda Triangle. Scientists believe it may be affected by microscopic wormholes.',
    image: 'https://images.pexels.com/photos/1573236/pexels-photo-1573236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=bead3&size=200x200',
    threadId: 'thread2',
    currentOwnerId: 'u1',
    ownershipHistory: [
      {
        id: 'oh5',
        userId: 'u1',
        userName: 'Zephyr Nova',
        userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        acquiredAt: '2024-04-15T09:30:00Z',
        location: { lat: 25.7617, lng: -80.1918, name: 'Miami' },
        previousOwnerId: null,
      },
    ],
    reviews: [],
    stories: [],
    createdAt: '2024-04-15T09:30:00Z',
  },
];

export const mockThreads: Thread[] = [
  {
    id: 'thread1',
    name: 'Galactic Treasures',
    description: 'A collection of the rarest cosmic artifacts from across the universe',
    ownerId: 'u1',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=thread1&size=200x200',
    createdAt: '2024-05-01T10:00:00Z',
    beads: mockBeads.filter(bead => bead.threadId === 'thread1'),
    members: mockUsers,
  },
  {
    id: 'thread2',
    name: 'Temporal Anomalies',
    description: 'Items affected by time distortions and quantum fluctuations',
    ownerId: 'u1',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=thread2&size=200x200',
    createdAt: '2024-04-10T15:45:00Z',
    beads: mockBeads.filter(bead => bead.threadId === 'thread2'),
    members: [mockUsers[0]],
  },
];

// Add references to the thread objects in the bead objects
export const enrichedMockBeads = mockBeads.map(bead => {
  const thread = mockThreads.find(t => t.id === bead.threadId);
  return { ...bead, thread };
});
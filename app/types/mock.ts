export interface Thread {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  qrCode: string;
  createdAt: string;
  beads: Bead[];
  members: User[];
}

export interface Bead {
  id: string;
  name: string;
  type: BeadType;
  description: string;
  value: number;
  originStory: string;
  image: string;
  qrCode: string;
  threadId: string;
  currentOwnerId: string;
  ownershipHistory: OwnershipRecord[];
  reviews: Review[];
  stories: Story[];
  createdAt: string;
}

export enum BeadType {
  CRYSTAL = 'crystal',
  DIAMOND = 'diamond',
  STONE = 'stone',
  ARTIFACT = 'artifact',
}

export interface OwnershipRecord {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  acquiredAt: string;
  location: Location;
  previousOwnerId: string | null;
}

export interface Location {
  lat: number;
  lng: number;
  name: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  shares: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: Location;
  badges: Badge[];
  ownedBeads: string[];
  joinedThreads: string[];
  stories: Story[];
  meetingHistory: Meeting[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  acquiredAt: string;
}

export interface Meeting {
  id: string;
  location: Location;
  participants: {
    userId: string;
    userName: string;
  }[];
  beadsExchanged: {
    beadId: string;
    beadName: string;
    fromUserId: string;
    toUserId: string;
  }[];
  date: string;
}

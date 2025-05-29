// export interface Thread {
//   id: string;
//   threadName: string;
//   description: string;
//   ownerId: string;
//   qrCode: string;
//   createdAt: string;
//   visibility: "Public" | "rivate";
//   beads: Bead[];
//   members: User[];
// }

export interface ThreadCreate {
  threadName: string;
  description?: string;
  ownerId?: string;
  visibility?: 'Public' | 'Private';
}

interface Owner {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  // Add any other fields related to the owner if necessary
}

export interface Thread {
  _id: string;
  threadName: string;
  description: string;
  ownerId: string;
  owner: string;
  qrCode: string;
  created_at: string;
  updated_at: string;
  is_activated: boolean;
  is_deleted: boolean;
  memberCount: number;
  members: string[];
  beads: any[];
  visibility: 'Public' | 'Private';
  __v: number;
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

export interface BeadCreate {
  beadName: string;
  threadId: string;
  ownerId: string;
  visibility: 'Public' | 'Private';
  beadType: string;
  material: string;
  color: string;
  size: number;
  shape: string;
  weight: number;
  finish: string;
  productCode: string;
  description: string;
  quantity: number;
  supplier: string;
  pricePerUnit: number;
}

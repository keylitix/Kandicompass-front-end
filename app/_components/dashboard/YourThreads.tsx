'use client';
import React from 'react';
import { ThreadCard } from './ThreadCards';
import { Bead, BeadType, Thread, User } from '@/app/types/common';
import { Plus } from 'lucide-react';
import userImg from '@/public/User.svg';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/app/hook/useReduxApp';
import AddThread from '../modal/AddThread';

// export const mockUsers: User[] = [
//   {
//     id: 'u1',
//     name: 'Zephyr Nova',
//     avatar: userImg,
//     bio: 'Cosmic collector and traveler of the digital realm',
//     location: { lat: 37.7749, lng: -122.4194, name: 'San Francisco' },
//     badges: [
//       {
//         id: 'b1',
//         name: 'Master Collector',
//         description: 'Collected over 100 unique beads',
//         icon: 'award',
//         acquiredAt: '2024-08-15T12:00:00Z',
//       },
//       {
//         id: 'b2',
//         name: 'Storyteller',
//         description: 'Shared over 50 stories',
//         icon: 'book-open',
//         acquiredAt: '2024-07-20T15:30:00Z',
//       },
//     ],
//     ownedBeads: ['bead1', 'bead3', 'bead5'],
//     joinedThreads: ['thread1', 'thread2'],
//     stories: [],
//     meetingHistory: [],
//   },
//   {
//     id: 'u2',
//     name: 'Lyra Quantum',
//     avatar: userImg,
//     bio: 'Seeking the rarest artifacts across the galaxies',
//     location: { lat: 51.5074, lng: -0.1278, name: 'London' },
//     badges: [
//       {
//         id: 'b3',
//         name: 'Traveler',
//         description: 'Exchanged beads in 10 different locations',
//         icon: 'globe',
//         acquiredAt: '2024-09-05T14:20:00Z',
//       },
//     ],
//     ownedBeads: ['bead2', 'bead4'],
//     joinedThreads: ['thread1'],
//     stories: [],
//     meetingHistory: [],
//   },
// ];

// export const mockBeads: Bead[] = [
//   {
//     id: 'bead1',
//     name: 'Celestial Amethyst',
//     type: BeadType.CRYSTAL,
//     description:
//       'A rare crystal from the Andromeda Galaxy, vibrating with cosmic energy',
//     value: 5000,
//     originStory:
//       'Discovered in the ruins of an ancient alien civilization, this crystal is said to hold the memories of a dying star.',
//     image:
//       'https://images.pexels.com/photos/616849/pexels-photo-616849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     qrCode:
//       'https://api.qrserver.com/v1/create-qr-code/?data=bead1&size=200x200',
//     threadId: 'thread1',
//     currentOwnerId: 'u1',
//     ownershipHistory: [
//       {
//         id: 'oh1',
//         userId: 'u2',
//         userName: 'Lyra Quantum',
//         userAvatar:
//           'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//         acquiredAt: '2024-06-10T09:00:00Z',
//         location: { lat: 40.7128, lng: -74.006, name: 'New York' },
//         previousOwnerId: null,
//       },
//       {
//         id: 'oh2',
//         userId: 'u1',
//         userName: 'Zephyr Nova',
//         userAvatar:
//           'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//         acquiredAt: '2024-07-15T16:30:00Z',
//         location: { lat: 37.7749, lng: -122.4194, name: 'San Francisco' },
//         previousOwnerId: 'u2',
//       },
//     ],
//     reviews: [
//       {
//         id: 'r1',
//         userId: 'u1',
//         userName: 'Zephyr Nova',
//         userAvatar:
//           'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//         content:
//           'The energy from this crystal has transformed my meditation practice. I can feel the cosmic vibrations!',
//         rating: 5,
//         createdAt: '2024-07-20T12:00:00Z',
//       },
//     ],
//     stories: [
//       {
//         id: 's1',
//         userId: 'u1',
//         userName: 'Zephyr Nova',
//         userAvatar:
//           'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//         title: 'Dreams of Andromeda',
//         content:
//           'Since acquiring the Celestial Amethyst, I have been having vivid dreams of alien landscapes and strange beings. Last night, I dreamt I was floating through a nebula, surrounded by stars being born...',
//         createdAt: '2024-07-25T08:45:00Z',
//         likes: 42,
//         shares: 12,
//       },
//     ],
//     createdAt: '2024-06-10T09:00:00Z',
//   },
//   {
//     id: 'bead2',
//     name: 'Quantum Diamond',
//     type: BeadType.DIAMOND,
//     description: 'A diamond that exists in multiple dimensions simultaneously',
//     value: 12000,
//     originStory:
//       'Created in a particle accelerator where quantum fluctuations were captured in crystalline form.',
//     image:
//       'https://images.pexels.com/photos/1303929/pexels-photo-1303929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     qrCode:
//       'https://api.qrserver.com/v1/create-qr-code/?data=bead2&size=200x200',
//     threadId: 'thread1',
//     currentOwnerId: 'u2',
//     ownershipHistory: [
//       {
//         id: 'oh3',
//         userId: 'u1',
//         userName: 'Zephyr Nova',
//         userAvatar:
//           'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//         acquiredAt: '2024-05-20T14:15:00Z',
//         location: { lat: 34.0522, lng: -118.2437, name: 'Los Angeles' },
//         previousOwnerId: null,
//       },
//       {
//         id: 'oh4',
//         userId: 'u2',
//         userName: 'Lyra Quantum',
//         userAvatar:
//           'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//         acquiredAt: '2024-06-05T11:20:00Z',
//         location: { lat: 51.5074, lng: -0.1278, name: 'London' },
//         previousOwnerId: 'u1',
//       },
//     ],
//     reviews: [],
//     stories: [],
//     createdAt: '2024-05-20T14:15:00Z',
//   },
//   {
//     id: 'bead3',
//     name: 'Chrono Stone',
//     type: BeadType.STONE,
//     description: 'A stone that occasionally glitches out of our timeline',
//     value: 8000,
//     originStory:
//       'Found near a temporal anomaly in the Bermuda Triangle. Scientists believe it may be affected by microscopic wormholes.',
//     image:
//       'https://images.pexels.com/photos/1573236/pexels-photo-1573236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     qrCode:
//       'https://api.qrserver.com/v1/create-qr-code/?data=bead3&size=200x200',
//     threadId: 'thread2',
//     currentOwnerId: 'u1',
//     ownershipHistory: [
//       {
//         id: 'oh5',
//         userId: 'u1',
//         userName: 'Zephyr Nova',
//         userAvatar:
//           'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//         acquiredAt: '2024-04-15T09:30:00Z',
//         location: { lat: 25.7617, lng: -80.1918, name: 'Miami' },
//         previousOwnerId: null,
//       },
//     ],
//     reviews: [],
//     stories: [],
//     createdAt: '2024-04-15T09:30:00Z',
//   },
// ];

// export const mockThreads: Thread[] = [
  // {
  //   id: 'thread1',
  //   name: 'Galactic Treasures',
  //   description:
  //     'A collection of the rarest cosmic artifacts from across the universe',
  //   ownerId: 'u1',
  //   qrCode:
  //     'https://api.qrserver.com/v1/create-qr-code/?data=thread1&size=200x200',
  //   createdAt: '2024-05-01T10:00:00Z',
  //   beads: mockBeads.filter((bead) => bead.threadId === 'thread1'),

  // },
  // {
  //   id: 'thread2',
  //   name: 'Temporal Anomalies',
  //   description: 'Items affected by time distortions and quantum fluctuations',
  //   ownerId: 'u1',
  //   qrCode:
  //     'https://api.qrserver.com/v1/create-qr-code/?data=thread2&size=200x200',
  //   createdAt: '2024-04-10T15:45:00Z',
  //   beads: mockBeads.filter((bead) => bead.threadId === 'thread2'),
  //   members: [mockUsers[0]],
  // },
// ];

interface YourThreadsProps {
  threads: any;
  refetchThreads: () => void;
  isFetchingThreads: boolean;
}

export const YourThreads: React.FC<YourThreadsProps> = ({ threads, refetchThreads, isFetchingThreads }) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [openThread, setOpenThread] = React.useState(false);
  console.log('Threads:==============', threads);
  const ownedThreads = user
    ? threads?.data?.filter((thread: any) => thread.ownerId[0]._id === user?.id)
    : [];
  const joinedThreads = user
    ? threads?.data?.filter((thread: any) => thread.ownerId[0]._id !== user?.id)
    : [];

  return (
    <section>
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent">
          Your Threads
        </h2>
        <button
          className="text-sm text-[#FF005D] hover:text-[#00D1FF] transition-colors"
          type="button"
        >
          View All
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {ownedThreads &&
          ownedThreads
            .slice(0, 2)
            .map((thread: any) => <ThreadCard key={thread._id} thread={thread} />)}

        <div
          role="button"
          tabIndex={0}
          className="bg-[#1c102b] rounded-xl border-2 border-dashed border-[#3f2e6a] border-opacity-60
                     p-6 flex flex-col items-center justify-center min-h-[200px]
                     cursor-pointer transition-colors hover:border-gradient-to-r hover:from-[#FF005D] hover:to-[#00D1FF]"
          onClick={() => setOpenThread(true)}
        >
          <div className="w-14 h-14 rounded-full bg-[#1c102b] bg-opacity-50 flex items-center justify-center mb-4">
            <Plus
              size={24}
              className="text-gradient"
              style={{ color: '#00D1FF' }}
            />
          </div>
          <h3 className="text-lg font-semibold bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent mb-1">
            Create New Thread
          </h3>
          <p className="text-[#8a86a0] text-sm text-center">
            Start a new collection for your cosmic artifacts
          </p>
        </div>
      </div>

      {joinedThreads && joinedThreads.length > 0 && (
        <>
          <header className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent">
              Joined Threads
            </h2>
            <button
              className="text-sm text-[#FF005D] hover:text-[#00D1FF] transition-colors"
              type="button"
            >
              View All
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedThreads.slice(0, 2).map((thread: any) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
          </div>
        </>
      )}
       <AddThread
        isOpen={openThread}
        onClose={() => setOpenThread(false)}
        refetchThreads={refetchThreads}
        isFetchingThreads={isFetchingThreads}
      />
    </section>
  );
};

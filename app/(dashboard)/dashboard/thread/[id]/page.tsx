// 'use client';
// import React, { useEffect, useState } from 'react';
// import { Users, QrCode, Share2, Calendar, Plus } from 'lucide-react';
// import { Thread } from '@/app/types/common';
// import { useParams } from 'next/navigation';
// import { mockThreads } from '@/app/_components/dashboard/YourThreads';
// import { BeadCard } from '@/app/_components/beads/BeadCard';
// import { GradientButton } from '@/app/_components/custom-ui/GradientButton';
// import Image from 'next/image';
// import { Metadata } from 'next';
// import { META } from '@/lib/meta';

// const ThreadDetailPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [thread, setThread] = useState<Thread | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [showQrCode, setShowQrCode] = useState(false);

//   useEffect(() => {
//     // Simulate API call
//     const fetchThread = async () => {
//       setLoading(true);
//       try {
//         // In a real app, this would be an API call
//         const foundThread = mockThreads.find(t => t.id === id);

//         // Simulate network delay
//         await new Promise(resolve => setTimeout(resolve, 500));

//         if (foundThread) {
//           setThread(foundThread);
//         }
//       } catch (error) {
//         console.error('Error fetching thread:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchThread();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="animate-pulse-slow text-[#00D1FF]">
//           <div className="w-16 h-16 border-4 border-[#00D1FF] border-t-transparent rounded-full animate-rotate-slow"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!thread) {
//     return (
//       <div className="bg-[#1c102b] backdrop-blur-md rounded-xl overflow-hidden border border-[#3f2e6a] border-opacity-20 p-8 text-center">
//         <h2 className="text-xl font-semibold text-[#FF005D] mb-2">Thread Not Found</h2>
//         <p className=" mb-4">The thread you're looking for does not exist or has been moved to another dimension.</p>
//         <button
//           onClick={() => window.history.back()}
//           className="bg-[#FF005D] text-white px-4 py-2 rounded-lg hover:bg-[#00D1FF] transition-colors"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 space-y-6">
//       <div className="bg-[#1c102b] backdrop-blur-md rounded-xl overflow-hidden border border-[#3f2e6a] border-opacity-20">
//         <div className="p-6">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <h1 className="text-2xl font-bold text-[#00D1FF]">{thread.name}</h1>
//               <div className="flex items-center mt-1 text-sm ">
//                 <Calendar size={16} className="mr-1" />
//                 <span>Created {new Date(thread.createdAt).toLocaleDateString()}</span>
//               </div>
//             </div>

//             <div className="flex items-center space-x-2">
//               <GradientButton
//                 variant="fill"
//                 icon={Plus}
//                 onClick={() => setShowQrCode(!showQrCode)}
//               >
//                 QR Code
//               </GradientButton>
//                <GradientButton
//                 variant="outline"
//                 icon={Plus}
//                 onClick={() => setShowQrCode(!showQrCode)}
//               >
//                 Share
//               </GradientButton>
//             </div>
//           </div>

//           <p className=" mb-6">
//             {thread.description}
//           </p>

//           <div className="mb-6">
//             <h3 className="text-sm font-medium  mb-2">Members</h3>
//             <div className="flex items-center -space-x-2">
//               {thread.members.map((member, index) => (
//                 <div
//                   key={member.id}
//                   className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#2a1a3d]"
//                   style={{ zIndex: 10 - index }}
//                 >
//                   <Image src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
//                 </div>
//               ))}

//               <button className="w-10 h-10 rounded-full bg-[#2a1a3d] bg-opacity-50 flex items-center justify-center ml-2 border-2 border-[#00D1FF] border-dashed hover:bg-[#00D1FF] transition-colors">
//                 <Plus size={16} className="" />
//               </button>
//             </div>
//           </div>

//           {showQrCode && (
//             <div className="flex justify-center items-center py-4 animate-float">
//               <div className="bg-white p-2 rounded-lg">
//                 <Image
//                   src={thread.qrCode}
//                   alt="Thread QR Code"
//                   width={200}
//                   height={200}
//                   className="max-w-full h-auto"
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Beads in this thread */}
//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-[#00D1FF]">Thread Beads</h2>
//           <button className="flex items-center text-[#FF005D] hover:text-[#00D1FF] transition-colors">
//             <Plus size={18} className="mr-1" />
//             Add Bead
//           </button>
//         </div>

//         {thread.beads.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {thread.beads.map(bead => (
//               <BeadCard key={bead.id} bead={bead} />
//             ))}
//           </div>
//         ) : (
//           <div className="bg-[#1c102b] backdrop-blur-md rounded-xl overflow-hidden border border-[#3f2e6a] border-opacity-20 border-dashed p-8 text-center">
//             <h3 className="text-lg font-semibold text-[#00D1FF] mb-2">No Beads Yet</h3>
//             <p className=" mb-4">This thread doesn't have any beads. Add your first bead to start the collection!</p>
//             <button className="bg-[#00D1FF] text-white px-4 py-2 rounded-lg hover:bg-[#FF005D] transition-colors">
//               <Plus size={18} className="inline-block mr-1" />
//               Add First Bead
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ThreadDetailPage;

'use client';
import React, { useEffect, useState } from 'react';
import {
  Users,
  QrCode,
  Share2,
  Calendar,
  Plus,
  Share2Icon,
} from 'lucide-react';
import { Thread } from '@/app/types/common';
import { useParams } from 'next/navigation';
import { BeadCard } from '@/app/_components/beads/BeadCard';
import { GradientButton } from '@/app/_components/custom-ui/GradientButton';
import Image from 'next/image';
import { useGetThreadByIdQuery } from '@/redux/api/thredApi';
import AddBead from '@/app/_components/modal/AddBead';
import { useGetBeadByThreadIdQuery } from '@/redux/api/beadApi';

const ThreadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const [thread, setThread] = useState<Thread | null>(null);
  const [showQrCode, setShowQrCode] = useState(false);
  const { data, isLoading: isThreadLoading } = useGetThreadByIdQuery(id);
  const {
    data: beadData,
    isLoading: isBeadsLoading,
    refetch: refetchBeads,
    isFetching: isFetchingBeads,
  } = useGetBeadByThreadIdQuery({
    threadId: id ?? '',
    page_number: 1,
    page_size: 50,
  });
  const thread = data?.data[0] ?? null;
  const [openBeadModal, setOpenBeadModal] = useState(false);

  // useEffect(() => {
  //   // Simulate API call
  //   const fetchThread = async () => {
  //     setLoading(true);
  //     try {
  //       // In a real app, this would be an API call
  //       const foundThread = mockThreads.find(t => t.id === id);

  //       // Simulate network delay
  //       await new Promise(resolve => setTimeout(resolve, 500));

  //       if (foundThread) {
  //         setThread(foundThread);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching thread:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchThread();
  // }, [id]);

  if (isThreadLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-slow text-[#00D1FF]">
          <div className="w-16 h-16 border-4 border-[#00D1FF] border-t-transparent rounded-full animate-rotate-slow"></div>
        </div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="bg-[#1c102b] flex flex-col justify-center items-center backdrop-blur-md rounded-xl overflow-hidden border border-[#3f2e6a] border-opacity-20 p-8 text-center">
        <h2 className="text-xl font-semibold text-[#FF005D] mb-2">
          Thread Not Found
        </h2>
        <p className=" mb-4">
          The thread you're looking for does not exist or has been moved to
          another dimension.
        </p>
        <GradientButton onClick={() => window.history.back()}>
          Go Back
        </GradientButton>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="bg-[#1c102b] backdrop-blur-md rounded-xl overflow-hidden border border-[#3f2e6a] border-opacity-20">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#00D1FF]">
                {thread.threadName}
              </h1>
              <div className="flex items-center mt-1 text-sm ">
                <Calendar size={16} className="mr-1" />
                <span>
                  Created {new Date(thread.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <GradientButton
                variant="fill"
                icon={QrCode}
                onClick={() => setShowQrCode(!showQrCode)}
              >
                QR Code
              </GradientButton>
              <GradientButton
                variant="outline"
                icon={Share2Icon}
                onClick={() => setShowQrCode(!showQrCode)}
              >
                Share
              </GradientButton>
            </div>
          </div>

          <p className=" mb-6">{thread?.description}</p>

          <div className="mb-6">
            <h3 className="text-sm font-medium  mb-2">Members</h3>
            <div className="flex items-center -space-x-2">
              {thread?.members?.map((member: any, index: any) => (
                <div
                  key={member.id}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#2a1a3d]"
                  style={{ zIndex: 10 - index }}
                >
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              <button className="w-10 h-10 rounded-full bg-[#2a1a3d] bg-opacity-50 flex items-center justify-center ml-2 border-2 border-[#00D1FF] border-dashed hover:bg-[#00D1FF] transition-colors">
                <Plus size={16} className="" />
              </button>
            </div>
          </div>

          {showQrCode && (
            <div className="flex justify-center items-center py-4 animate-float">
              <div className="bg-white p-2 rounded-lg">
                <Image
                  src={thread?.qrCode}
                  alt="Thread QR Code"
                  width={200}
                  height={200}
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Beads in this thread */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#00D1FF]">Thread Beads</h2>
          <button
            className="flex items-center text-[#FF005D] hover:text-[#00D1FF] transition-colors"
            onClick={() => setOpenBeadModal(true)}
          >
            <Plus size={18} className="mr-1" />
            Add Bead
          </button>
        </div>

        {beadData && beadData?.data?.data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beadData?.data?.data?.map((bead: any) => (
              <BeadCard key={bead?._id} bead={bead} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center bg-[#1c102b] backdrop-blur-md rounded-xl overflow-hidden border border-[#3f2e6a] border-opacity-20 border-dashed p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">No Beads Yet</h3>
            <p className=" mb-4">
              This thread doesn't have any beads. Add your first bead to start
              the collection!
            </p>
            <GradientButton icon={Plus} onClick={() => setOpenBeadModal(true)}>
              Add First Bead
            </GradientButton>
          </div>
        )}
      </div>
      <AddBead
        isOpen={openBeadModal}
        onClose={() => setOpenBeadModal(false)}
        threadId={id}
        refetchBeads={refetchBeads}
        isFetchingBeads={isFetchingBeads}
      />
    </div>
  );
};

export default ThreadDetailPage;

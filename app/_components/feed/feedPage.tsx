// import React, { useState, useEffect } from 'react';
// import { RecentActivity } from './recentActivity';
// import { generateFeedPosts, getRecentBeads } from './feedData';
// import { FeedPost } from './feedPost';
// import { useGetBeadFeedsQuery } from '@/redux/api/beadApi';

// interface FeedPageProps {
//   onViewBead: (beadId: string) => void;
// }

// export function FeedPage({ onViewBead }: FeedPageProps) {
//   // const [feedPosts, setFeedPosts] = useState<any[]>([]);
//   const [recentBeads, setRecentBeads] = useState(getRecentBeads(15));
//   // const [loading, setLoading] = useState(true);
//   const { data: posts, isLoading } = useGetBeadFeedsQuery({
//     page_number: 1,
//     page_size: 10,
//   });

//   const feedPosts = Array.isArray(posts?.data?.data) ? posts.data.data : [];

//   console.log('posts============', posts);
//   console.log('feedPosts============', feedPosts);

//   useEffect(() => {
//     // Simulate loading feed data
//     const timer = setTimeout(() => {
//       // setFeedPosts(generateFeedPosts().slice(0, 50)); // Show first 50 posts
//       // setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const handleLike = (postId: string) => {
//     // setFeedPosts(posts =>
//     //   posts.map(post => {
//     //     if (post.id === postId) {
//     //       const isLiked = post.likes.some((like: any) => like.userId === "");
//     //       if (isLiked) {
//     //         return {
//     //           ...post,
//     //           likes: post.likes.filter((like: any) => like.userId !== "")
//     //         };
//     //       } else {
//     //         return {
//     //           ...post,
//     //           likes: [...post.likes, {
//     //             id: `like_${postId}_${Date.now()}`,
//     //             userId: "",
//     //             userName: "",
//     //             timestamp: new Date()
//     //           }]
//     //         };
//     //       }
//     //     }
//     //     return post;
//     //   })
//     // );
//   };

//   const handleComment = (postId: string, comment: string) => {
//     // setFeedPosts(posts =>
//     //   posts.map(post => {
//     //     if (post.id === postId) {
//     //       return {
//     //         ...post,
//     //         comments: [...post.comments, {
//     //           id: `comment_${postId}_${Date.now()}`,
//     //           userId: "",
//     //           userName: "",
//     //           userAvatar: undefined,
//     //           message: comment,
//     //           timestamp: new Date()
//     //         }]
//     //       };
//     //     }
//     //     return post;
//     //   })
//     // );
//   };

//   if (isLoading) {
//     return (
//       <div className="max-w-7xl mx-auto p-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 space-y-6">
//             {Array.from({ length: 5 }).map((_, index) => (
//               <div
//                 key={index}
//                 className="glass-card border-white/20 p-6 animate-pulse"
//               >
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-white/10 rounded-full"></div>
//                   <div className="space-y-2">
//                     <div className="w-32 h-4 bg-white/10 rounded"></div>
//                     <div className="w-24 h-3 bg-white/10 rounded"></div>
//                   </div>
//                 </div>
//                 <div className="w-full h-64 bg-white/10 rounded-lg mb-4"></div>
//                 <div className="space-y-2">
//                   <div className="w-3/4 h-4 bg-white/10 rounded"></div>
//                   <div className="w-1/2 h-4 bg-white/10 rounded"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="space-y-6">
//             <div className="glass-card border-white/20 p-6 animate-pulse">
//               <div className="w-32 h-6 bg-white/10 rounded mb-4"></div>
//               {Array.from({ length: 8 }).map((_, index) => (
//                 <div key={index} className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-white/10 rounded-full"></div>
//                   <div className="space-y-2 flex-1">
//                     <div className="w-24 h-4 bg-white/10 rounded"></div>
//                     <div className="w-32 h-3 bg-white/10 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Main Feed */}
//         <div className="lg:col-span-2">
//           <div className="mb-6">
//             <h1 className="text-3xl font-bold mb-2">Bead Journey Feed</h1>
//             <p className="text-white/70">
//               Discover the latest bead journeys and stories from around the
//               world
//             </p>
//           </div>

//           <div className="space-y-6">
//             {feedPosts.map((post) => (
//               <FeedPost
//                 key={post._id}
//                 post={post}
//                 onLike={handleLike}
//                 onComment={handleComment}
//                 onViewBead={(beadId: string) =>
//                   onViewBead(beadId || post.beadId?._id)
//                 }
//               />
//             ))}
//           </div>

//           {feedPosts.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-white/60">
//                 No posts to show yet. Start creating beads to see activity!
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           <RecentActivity recentBeads={recentBeads} onViewBead={onViewBead} />
//         </div>
//       </div>
//     </div>
//   );
// }












// import React, { useState, useEffect } from 'react';
// import { RecentActivity } from './recentActivity';
// import { FeedPost } from './feedPost';
// import { useGetBeadFeedsQuery } from '@/redux/api/beadApi';
// import { getRecentBeads } from './feedData';
// import { useAppSelector } from '@/app/hook/useReduxApp';

// interface FeedPageProps {
//   onViewBead: (beadId: string) => void;
// }

// export function FeedPage({ onViewBead }: FeedPageProps) {
//   const PAGE_SIZE = 10;
//   const { user } = useAppSelector((state) => state.auth);
//   const [recentBeads, setRecentBeads] = useState(getRecentBeads(15));
//   const [feedPosts, setFeedPosts] = useState<any[]>([]);
//   const [newPosts, setNewPosts] = useState<any[]>([]);
//   const [showNewPostsBanner, setShowNewPostsBanner] = useState(false);

//   // Initial fetch & RTK Query hook
//   const { data: latestData, refetch, isFetching } = useGetBeadFeedsQuery({
//     page_number: 1,
//     page_size: PAGE_SIZE,
//   });

//   // Populate feedPosts initially
//   useEffect(() => {
//     if (latestData?.data?.data) {
//       setFeedPosts(latestData.data.data);
//     }
//   }, [latestData]);

//   // Poll for new posts every 30 seconds using refetch()
//   useEffect(() => {
//     const interval = setInterval(() => {
//       refetch();
//     }, 30000);

//     return () => clearInterval(interval);
//   }, [refetch]);

//   // When latestData updates, check for new posts
//   useEffect(() => {
//     if (!latestData?.data?.data || feedPosts.length === 0) return;

//     // Find newest post's createdAt in current feedPosts
//     const newestCreatedAt = new Date(feedPosts[0].createdAt).getTime();

//     // Filter posts that are strictly newer (createdAt greater) than newestCreatedAt
//     const newerPosts = latestData.data.data.filter(
//       (post) => new Date(post.createdAt).getTime() > newestCreatedAt,
//     );

//     if (newerPosts.length > 0) {
//       setNewPosts(newerPosts);
//       setShowNewPostsBanner(true);
//     }
//   }, [latestData, feedPosts]);

//   // User clicks "Show new posts"
//   const handleShowNewPosts = () => {
//     setFeedPosts((prev) => [...newPosts, ...prev]);
//     setNewPosts([]);
//     setShowNewPostsBanner(false);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       {/* New posts banner */}
//       <div className="flex justify-center items-center">
//         {showNewPostsBanner && (
//           <div
//             onClick={handleShowNewPosts}
//             className="cursor-pointer bg-gradient-to-r from-pink-600 to-cyan-600 text-white text-center py-2 rounded mb-4 font-semibold shadow-md"
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' || e.key === ' ') handleShowNewPosts();
//             }}
//             aria-label={`Show ${newPosts.length} new posts`}
//           >
//             {newPosts.length} new {newPosts.length > 1 ? 'posts' : 'post'} - Click to view
//           </div>
//         )}
//       </div>

//       <div className="grid grid-cols-12 gap-6">
//         <main className="col-span-12 md:col-span-7 lg:col-span-8 space-y-6">
//           {isFetching && feedPosts.length === 0 && (
//             <p className="text-center text-white/60">Loading feed...</p>
//           )}
//           {feedPosts.length === 0 && !isFetching && (
//             <p className="text-center text-white/60">No posts available.</p>
//           )}
//           {feedPosts.map((post) => (
//             <FeedPost key={post._id} post={post} onViewBead={onViewBead} />
//           ))}
//         </main>

//         <aside className="hidden lg:block col-span-4 sticky top-6">
//           <RecentActivity recentBeads={recentBeads} onViewBead={onViewBead} />
//         </aside>
//       </div>
//     </div>
//   );
// }








'use client';

import React, { useState, useEffect } from 'react';
import { RecentActivity } from './recentActivity';
import { FeedPost } from './feedPost';
import { useGetBeadFeedsQuery } from '@/redux/api/beadApi';
import { getRecentBeads } from './feedData';
import { useAppSelector } from '@/app/hook/useReduxApp';
import { motion, AnimatePresence } from 'framer-motion';

interface FeedPageProps {
  onViewBead: (beadId: string) => void;
}

export function FeedPage({ onViewBead }: FeedPageProps) {
  const PAGE_SIZE = 10;
  const { user } = useAppSelector((state) => state.auth);
  const [recentBeads, setRecentBeads] = useState(getRecentBeads(15));
  const [feedPosts, setFeedPosts] = useState<any[]>([]);
  const [newPosts, setNewPosts] = useState<any[]>([]);
  const [showNewPostsBanner, setShowNewPostsBanner] = useState(false);

  // Initial fetch & RTK Query hook
  const { data: latestData, refetch, isFetching } = useGetBeadFeedsQuery({
    page_number: 1,
    page_size: PAGE_SIZE,
  });

  // Populate feedPosts initially
  useEffect(() => {
    if (latestData?.data?.data) {
      setFeedPosts(latestData.data.data);
    }
  }, [latestData]);

  // Poll for new posts every 30 seconds using refetch()
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  // When latestData updates, check for new posts
  useEffect(() => {
    if (!latestData?.data?.data || feedPosts.length === 0) return;

    // Find newest post's createdAt in current feedPosts
    const newestCreatedAt = new Date(feedPosts[0].createdAt).getTime();

    // Filter posts that are strictly newer (createdAt greater) than newestCreatedAt
    const newerPosts = latestData.data.data.filter(
      (post) => new Date(post.createdAt).getTime() > newestCreatedAt,
    );

    if (newerPosts.length > 0) {
      setNewPosts(newerPosts);
      setShowNewPostsBanner(true);
    }
  }, [latestData, feedPosts]);

  // User clicks "Show new posts"
  const handleShowNewPosts = () => {
    setFeedPosts((prev) => [...newPosts, ...prev]);
    setNewPosts([]);
    setShowNewPostsBanner(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* New posts banner */}
      <AnimatePresence>
        {showNewPostsBanner && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex justify-center items-center"
          >
            <div
              onClick={handleShowNewPosts}
              className="cursor-pointer bg-gradient-to-r from-pink-600 to-cyan-600 text-white text-center py-2 px-4 rounded mb-4 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleShowNewPosts();
              }}
              aria-label={`Show ${newPosts.length} new posts`}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.5 
                }}
              >
                {newPosts.length} new {newPosts.length > 1 ? 'posts' : 'post'} - Click to view
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-12 gap-6">
        <main className="col-span-12 md:col-span-7 lg:col-span-8 space-y-6">
          {isFetching && feedPosts.length === 0 && (
            <motion.p 
              className="text-center text-white/60"
              animate={{ 
                opacity: [0.5, 1, 0.5] 
              }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5 
              }}
            >
              Loading feed...
            </motion.p>
          )}
          
          {feedPosts.length === 0 && !isFetching && (
            <p className="text-center text-white/60">No posts available.</p>
          )}
          
          <AnimatePresence>
            {feedPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.05 
                }}
              >
                <FeedPost post={post} onViewBead={onViewBead} />
              </motion.div>
            ))}
          </AnimatePresence>
        </main>

        <aside className="hidden lg:block col-span-4 sticky top-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <RecentActivity recentBeads={recentBeads} onViewBead={onViewBead} />
          </motion.div>
        </aside>
      </div>
    </div>
  );
}

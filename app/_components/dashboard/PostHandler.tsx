// "use client";

// import Image from "next/image";
// import { useState, useEffect, useRef } from "react";
// import { useInView } from "react-intersection-observer";
// import { Globe, Heart, MessageSquareText, Send, Loader2 } from 'lucide-react';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// import avatar from "@/public/User.svg";
// import threadURL from "@/public/thred.svg";

// interface Comment {
//     id: number;
//     text: string;
//     liked: boolean;
// }

// interface Post {
//     id: number;
//     name: string;
//     privacy: "public" | "private" | "friends";
//     avatar: string;
//     caption: string;
//     threadImage: string;
//     isLiked: boolean;
//     comments: Comment[];
//     showComments: boolean;
// }

// export default function PostHandler() {
//     const [posts, setPosts] = useState<Post[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [initialLoad, setInitialLoad] = useState(true);
//     const { ref, inView } = useInView();
//     const commentBoxRef = useRef<any>(null);
//     const [newComment, setNewComment] = useState("");

//     const generatePosts = (startId: number, count: number): Post[] => {
//         return Array.from({ length: count }, (_, i) => {
//             const id = startId + i;
//             return {
//                 id,
//                 name: `User ${id}`,
//                 privacy: ["public", "private", "friends"][id % 3] as Post["privacy"],
//                 avatar: avatar.src,
//                 caption: `This is post number ${id}`,
//                 threadImage: threadURL.src,
//                 isLiked: Math.random() < 0.5,
//                 comments: [],
//                 showComments: false,
//             };
//         });
//     };

//     const loadMorePosts = () => {
//         setLoading(true);
//         setTimeout(() => {
//             const newPosts = generatePosts(posts.length + 1, 2);
//             setPosts((prev) => [...prev, ...newPosts]);
//             setLoading(false);
//             if (initialLoad) setInitialLoad(false);
//         }, 1000);
//     };

//     useEffect(() => {
//         loadMorePosts();
//     }, []);

//     useEffect(() => {
//         if (inView && !loading) {
//             loadMorePosts();
//         }
//     }, [inView]);

//     const toggleLike = (postId: number) => {
//         setPosts((prev) =>
//             prev.map((post) =>
//                 post.id === postId ? { ...post, isLiked: !post.isLiked } : post
//             )
//         );
//     };

//     const toggleComments = (postId: number) => {
//         setPosts((prev) =>
//             prev.map((post) =>
//                 post.id === postId ? { ...post, showComments: !post.showComments } : post
//             )
//         );

//         setTimeout(() => {
//             commentBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//         }, 100);
//     };

//     const addComment = (postId: number, commentText: string) => {
//         if (!commentText.trim()) return;

//         setPosts((prev) =>
//             prev.map((post) =>
//                 post.id === postId
//                     ? {
//                         ...post,
//                         comments: [
//                             ...post.comments,
//                             { id: Date.now(), text: commentText.trim(), liked: false },
//                         ],
//                     }
//                     : post
//             )
//         );
//         setNewComment("");
//     };

//     const toggleCommentLike = (postId: number, commentId: number) => {
//         setPosts((prev) =>
//             prev.map((post) =>
//                 post.id === postId
//                     ? {
//                         ...post,
//                         comments: post.comments.map((comment) =>
//                             comment.id === commentId
//                                 ? { ...comment, liked: !comment.liked }
//                                 : comment
//                         ),
//                     }
//                     : post
//             )
//         );
//     };

//     if (initialLoad && posts.length === 0) {
//         return (
//             <div className="w-full flex flex-col space-y-8">
//                 {Array.from({ length: 2 }).map((_, index) => (
//                     <div key={index} className="pt-2 bg-white/5 space-y-2 rounded-md">
//                         <div className="flex w-full gap-2 items-center px-4 py-3">
//                             <Skeleton circle width={30} height={30} enableAnimation baseColor="#ffffff20" highlightColor="#ffffff30" />
//                             <div className="flex flex-col gap-1">
//                                 <Skeleton width={100} height={10} enableAnimation baseColor="#ffffff20" highlightColor="#ffffff30" />
//                                 <Skeleton width={50} height={10} enableAnimation baseColor="#ffffff20" highlightColor="#ffffff30" />
//                             </div>
//                         </div>

//                         <div className="px-4">
//                             <Skeleton count={2} enableAnimation baseColor="#ffffff20" highlightColor="#ffffff30" />
//                         </div>

//                         <div className="w-full mx-auto h-80">
//                             <Skeleton height="100%" enableAnimation baseColor="#ffffff20" highlightColor="#ffffff30" />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         );
//     }

//     return (
//         <div className="w-full flex flex-col space-y-8">
//             {posts.length === 0 && !initialLoad ? (
//                 <div className="flex flex-col items-center justify-center h-[50vh] text-white/70 p-4 text-center bg-white/5 rounded-md">
//                     <MessageSquareText className="w-16 h-16 mb-4 opacity-50" />
//                     <h3 className="text-xl font-medium">No posts yet</h3>
//                     <p className="mt-2">Be the first to share something with the community</p>
//                     <button className="mt-6 px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
//                         Create Post
//                     </button>
//                 </div>
//             ) : (
//                 <>
//                     {posts.map((post) => (
//                         <div key={post.id} className="pt-2 bg-white/5 space-y-2 rounded-md overflow-hidden shadow-sm">
//                             <div className="flex w-full gap-3 items-center px-4 py-3">
//                                 <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0 bg-white/10">
//                                     <Image
//                                         src={post.avatar || "/placeholder.svg"}
//                                         width={40}
//                                         height={40}
//                                         alt={`${post.name}'s avatar`}
//                                         className="object-cover"
//                                     />
//                                 </div>
//                                 <div className="text-white flex flex-col">
//                                     <p className="font-medium">{post.name}</p>
//                                     <small className="flex text-xs font-sans gap-1 items-center text-white/70">
//                                         5h <Globe size={10} />
//                                     </small>
//                                 </div>
//                             </div>

//                             <p className="font-sans text-sm px-4 text-white">{post.caption}</p>

//                             <div className="w-full relative overflow-hidden h-64 sm:h-80 md:h-96 ">
//                                 <Image
//                                     src={post.threadImage || "/placeholder.svg"}
//                                     alt="Post Image"
//                                     fill
//                                     className="object-contain transition-transform duration-300"
//                                 />
//                             </div>

//                             <div className="bg-white/20 py-3 flex justify-around items-center font-sans text-sm text-white">
//                                 <button
//                                     className="flex flex-col gap-1 justify-center items-center transition-transform hover:scale-110"
//                                     onClick={() => toggleLike(post.id)}
//                                 >
//                                     {post.isLiked
//                                         ? <Heart fill="red" color="red" size={22} className="cursor-pointer" />
//                                         : <Heart size={22} className="cursor-pointer" />}
//                                     <span>Like</span>
//                                 </button>

//                                 <button
//                                     className="flex flex-col gap-1 justify-center items-center transition-transform hover:scale-110"
//                                     onClick={() => toggleComments(post.id)}
//                                 >
//                                     <MessageSquareText size={22} className="scale-x-[-1] cursor-pointer" />
//                                     <span>Comment</span>
//                                 </button>

//                                 <button className="flex flex-col gap-1 justify-center items-center transition-transform hover:scale-110">
//                                     <Send size={22} className="cursor-pointer" />
//                                     <span>Share</span>
//                                 </button>
//                             </div>

//                             {/* Comment Section */}
//                             {post.showComments && (
//                                 <div ref={commentBoxRef} className="p-4 bg-white/10 text-white space-y-4">
//                                     <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scroll">
//                                         {post.comments.length === 0 && (
//                                             <p className="text-sm italic text-white/70 text-center py-4">No comments yet. Be the first to comment!</p>
//                                         )}
//                                         {post.comments.map((comment) => (
//                                             <div key={comment.id} className="flex justify-between items-start text-sm bg-white/5 p-3 rounded-md">
//                                                 <p>{comment.text}</p>
//                                                 <Heart
//                                                     size={16}
//                                                     color={comment.liked ? "red" : "white"}
//                                                     fill={comment.liked ? "red" : "none"}
//                                                     onClick={() => toggleCommentLike(post.id, comment.id)}
//                                                     className="cursor-pointer mt-1 transition-transform hover:scale-125"
//                                                 />
//                                             </div>
//                                         ))}
//                                     </div>

//                                     <form
//                                         onSubmit={(e) => {
//                                             e.preventDefault();
//                                             addComment(post.id, newComment);
//                                         }}
//                                         className="flex gap-2"
//                                     >
//                                         <input
//                                             type="text"
//                                             value={newComment}
//                                             onChange={(e) => setNewComment(e.target.value)}
//                                             placeholder="Write a comment..."
//                                             className="flex-1 p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                         <button
//                                             type="submit"
//                                             className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700 transition-colors"
//                                         >
//                                             Post
//                                         </button>
//                                     </form>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </>
//             )}

//             {/* Loading indicator for infinite scroll */}
//             {loading && !initialLoad && (
//                 <div className="flex justify-center items-center py-4">
//                     <Loader2 className="w-8 h-8 animate-spin text-white/70" />
//                 </div>
//             )}

//             <div ref={ref} className="h-10" />
//         </div>
//     );
// }

'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import { Globe, Heart, MessageSquareText, Send, Loader2 } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import avatar from '@/public/User.svg';
import threadURL from '@/public/thred.svg';
import { useGetBeadsQuery } from '@/redux/api/beadApi';

interface Comment {
  id: number;
  text: string;
  liked: boolean;
}

interface Post {
  id: number;
  name: string;
  privacy: 'public' | 'private' | 'friends';
  avatar: string;
  caption: string;
  threadImage: string;
  isLiked: boolean;
  comments: Comment[];
  showComments: boolean;
  beadId: string;
}

export default function PostHandler() {
  const [page, setPage] = useState(1);
  const pageSize = 2;
  const { data, isLoading, isFetching } = useGetBeadsQuery({
    page_number: page,
    page_size: pageSize,
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const { ref, inView } = useInView();
  const commentBoxRef = useRef<any>(null);
  const [newComment, setNewComment] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (data?.data) {
      const newPosts = data.data.map((bead: any, index: number) => ({
        id: bead._id || Date.now() + index,
        beadId: bead._id,
        name: bead.beadName || `Bead ${index + 1}`,
        privacy: ['public', 'private', 'friends'][index % 3] as Post['privacy'],
        avatar: avatar.src,
        caption: bead.description || `Check out this ${bead.beadName}`,
        threadImage: bead.imageUrl || threadURL.src,
        isLiked: Math.random() < 0.5,
        comments: [],
        showComments: false,
      }));

      if (page === 1) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }
    }
  }, [data, page]);

  useEffect(() => {
    if (inView && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [inView, isFetching]);

  const toggleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, isLiked: !post.isLiked } : post,
      ),
    );
  };

  const toggleComments = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, showComments: !post.showComments }
          : post,
      ),
    );

    setTimeout(() => {
      commentBoxRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  const addComment = (postId: number, commentText: string) => {
    if (!commentText.trim()) return;

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { id: Date.now(), text: commentText.trim(), liked: false },
              ],
            }
          : post,
      ),
    );
    setNewComment('');
  };

  const toggleCommentLike = (postId: number, commentId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, liked: !comment.liked }
                  : comment,
              ),
            }
          : post,
      ),
    );
  };

  const navigateToDetail = (id: string) => {
    router.push(`/dashboard/charms/${id}`);
  };

  if (isLoading && posts.length === 0) {
    return (
      <div className="w-full flex flex-col space-y-8">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="pt-2 bg-white/5 space-y-2 rounded-md">
            <div className="flex w-full gap-2 items-center px-4 py-3">
              <Skeleton circle width={30} height={30} />
              <div className="flex flex-col gap-1">
                <Skeleton width={100} height={10} />
                <Skeleton width={50} height={10} />
              </div>
            </div>
            <div className="px-4">
              <Skeleton count={2} />
            </div>
            <div className="w-full mx-auto h-80">
              <Skeleton height="100%" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-8">
      {posts.map((post) => (
        <div
          key={post.id}
          className="pt-2 bg-white/5 space-y-2 rounded-md overflow-hidden shadow-sm"
        >
          <div className="flex w-full gap-3 items-center px-4 py-3">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0 bg-white/10">
              <Image
                src={post.avatar || '/placeholder.svg'}
                width={40}
                height={40}
                alt={`${post.name}'s avatar`}
                className="object-cover"
              />
            </div>
            <div className="text-white flex flex-col">
              <p className="font-medium">{post.name}</p>
              <small className="flex text-xs font-sans gap-1 items-center text-white/70">
                5h <Globe size={10} />
              </small>
            </div>
          </div>

          <p className="font-sans text-sm px-4 text-white">{post.caption}</p>

          <div
            onClick={() => navigateToDetail(post.beadId)}
            className="w-full relative overflow-hidden h-64 sm:h-80 md:h-96 cursor-pointer"
          >
            <Image
              src={post.threadImage || '/placeholder.svg'}
              alt="Post Image"
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="bg-white/20 py-3 flex justify-around items-center font-sans text-sm text-white">
            <button
              onClick={() => toggleLike(post.id)}
              className="flex flex-col gap-1 justify-center items-center transition-transform hover:scale-110"
            >
              {post.isLiked ? (
                <Heart
                  fill="red"
                  color="red"
                  size={22}
                  className="cursor-pointer"
                />
              ) : (
                <Heart size={22} className="cursor-pointer" />
              )}
              <span>Like</span>
            </button>

            <button
              onClick={() => toggleComments(post.id)}
              className="flex flex-col gap-1 justify-center items-center transition-transform hover:scale-110"
            >
              <MessageSquareText
                size={22}
                className="scale-x-[-1] cursor-pointer"
              />
              <span>Comment</span>
            </button>

            <button className="flex flex-col gap-1 justify-center items-center transition-transform hover:scale-110">
              <Send size={22} className="cursor-pointer" />
              <span>Share</span>
            </button>
          </div>

          {post.showComments && (
            <div
              ref={commentBoxRef}
              className="p-4 bg-white/10 text-white space-y-4"
            >
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scroll">
                {post.comments.length === 0 && (
                  <p className="text-sm italic text-white/70 text-center py-4">
                    No comments yet. Be the first to comment!
                  </p>
                )}
                {post.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex justify-between items-start text-sm bg-white/5 p-3 rounded-md"
                  >
                    <p>{comment.text}</p>
                    <Heart
                      size={16}
                      color={comment.liked ? 'red' : 'white'}
                      fill={comment.liked ? 'red' : 'none'}
                      onClick={() => toggleCommentLike(post.id, comment.id)}
                      className="cursor-pointer mt-1 transition-transform hover:scale-125"
                    />
                  </div>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addComment(post.id, newComment);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 p-2 rounded-md text-black"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700"
                >
                  Post
                </button>
              </form>
            </div>
          )}
        </div>
      ))}

      {isFetching && (
        <div className="flex justify-center items-center py-4">
          <Loader2 className="w-8 h-8 animate-spin text-white/70" />
        </div>
      )}
      <div ref={ref} className="h-10" />
    </div>
  );
}

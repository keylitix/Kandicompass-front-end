// import React, { useState, useCallback, useEffect } from 'react';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import {
//   Heart,
//   MessageCircle,
//   Share2,
//   MapPin,
//   Clock,
//   MoreHorizontal,
// } from 'lucide-react';
// import { CORE_BACKEND_URL } from '@/helper/path';
// import { DEFAULT_PROFILE_PICTURE } from '@/lib/variables';
// import { useAppSelector } from '@/app/hook/useReduxApp';

// interface FeedPostProps {
//   post: any;
//   onLike: (postId: string) => void;
//   onComment: (postId: string, comment: string) => void;
//   onViewBead: (beadId: string) => void;
// }

// export function FeedPost({
//   post,
//   onLike,
//   onComment,
//   onViewBead,
// }: FeedPostProps) {
//   const { user } = useAppSelector((state) => state.auth);
//   // const [showComments, setShowComments] = useState(false);
//   const [newComment, setNewComment] = useState('');

//   const [isLiked, setIsLiked] = useState(false);
//   const [isLiking, setIsLiking] = useState(false);

//   useEffect(() => {
//     // Check if current user liked this post on mount or when post.likes changes
//     const liked = post.likes.some((like: any) => like.userId === user.id);
//     setIsLiked(liked);
//   }, [post.likes, user.id]);

//   const handleLikeClick = useCallback(async () => {
//     if (isLiking) return; // prevent spam clicking

//     setIsLiking(true);

//     try {
//       // Optimistically toggle UI immediately
//       setIsLiked((prev) => !prev);

//       // Call parent handler
//       await onLike(post._id);

//       // onLike triggers refetch, so feedPosts will update with new data
//     } catch (error) {
//       // On error, revert like state
//       setIsLiked((prev) => !prev);
//       console.error('Failed to like post:', error);
//     } finally {
//       setIsLiking(false);
//     }
//   }, [isLiking, onLike, post._id]);

//   // Extract text content safely
//   const textContent = Array.isArray(post.content)
//     ? post.content
//         .filter((c: any) => c.type === 'text')
//         .map((c: any) => c.content)
//         .join('\n')
//     : '';

//   const fullName = post.userId?.fullName || 'Unknown User';
//   const userAvatar = post.userId?.avatar
//     ? CORE_BACKEND_URL + post.userId.avatar
//     : DEFAULT_PROFILE_PICTURE;

//   const beadImage = post.beadId?.images?.[0]
//     ? CORE_BACKEND_URL + post.beadId.images[0]
//     : null;

//   const beadName = post.beadName || post.beadId?.beadName || '';

//   const likes = post.likes || [];
//   const comments = post.comments || [];

//   const formatTimeAgo = (dateString: string | Date) => {
//     const date =
//       typeof dateString === 'string' ? new Date(dateString) : dateString;
//     const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
//     if (seconds < 60) return 'just now';
//     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
//     return `${Math.floor(seconds / 86400)}d ago`;
//   };

//   return (
//     <Card className="bg-[#1c102b] border-[#3f2e6a] mb-6">
//       <CardHeader className="pb-3 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <Avatar className="w-10 h-10">
//             {userAvatar ? (
//               <AvatarImage src={userAvatar} alt={fullName} />
//             ) : (
//               <AvatarFallback className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold">
//                 {fullName
//                   .split(' ')
//                   .map((n: string) => n[0])
//                   .join('')}
//               </AvatarFallback>
//             )}
//           </Avatar>
//           <div>
//             <div className="flex items-center gap-2 text-white font-semibold">
//               {fullName}
//             </div>
//             <div className="text-xs text-white/50 flex items-center gap-2">
//               <Clock className="w-3 h-3" />
//               <span>{formatTimeAgo(post.createdAt)}</span>
//               {post.location?.address && (
//                 <>
//                   <MapPin className="w-3 h-3" />
//                   <span>{post.location.address}</span>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//         <Button
//           variant="ghost"
//           size="sm"
//           className="text-white/60 hover:text-white"
//         >
//           <MoreHorizontal className="w-4 h-4" />
//         </Button>
//       </CardHeader>

//       <CardContent className="space-y-4 text-white/90">
//         <p className="whitespace-pre-line">{textContent}</p>

//         {beadImage && (
//           <div
//             className="relative rounded-lg overflow-hidden cursor-pointer group"
//             onClick={() => onViewBead(post.beadId?._id)}
//           >
//             <img
//               src={beadImage}
//               alt={beadName}
//               className="w-full h-75 object-cover rounded-lg"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
//             <Badge className="absolute bottom-4 left-4 bg-white/20 text-white backdrop-blur-sm">
//               {beadName}
//             </Badge>
//           </div>
//         )}

//         <div className="flex items-center justify-between pt-2 border-t border-white/10">
//           <div className="flex items-center gap-4">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={handleLikeClick}
//               className={`text-white/70 hover:text-white hover:bg-gradient-to-r from-pink-600 to-cyan-600 ${
//                 isLiked ? 'text-red-400' : ''
//               }`}
//             >
//               <Heart
//                 className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`}
//               />
//               {likes.length}
//             </Button>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setShowComments((show) => !show)}
//               className="text-white/70 hover:text-white hover:bg-gradient-to-r from-pink-600 to-cyan-600"
//             >
//               <MessageCircle className="w-4 h-4 mr-1" />
//               {comments.length}
//             </Button>
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-white/70 hover:text-white hover:bg-gradient-to-r from-pink-600 to-cyan-600"
//             >
//               <Share2 className="w-4 h-4 mr-1" />
//               Share
//             </Button>
//           </div>
//           <Button
//             size="sm"
//             onClick={() => onViewBead(post.beadId?._id)}
//             className="bg-gradient-to-r from-pink-600 to-cyan-600 hover:from-pink-700 hover:to-cyan-700"
//           >
//             View Bead QR
//           </Button>
//         </div>

//         {showComments && (
//           <section className="space-y-3 pt-3 border-t border-white/10">
//             {comments.map((comment: any) => (
//               <div key={comment.id} className="flex items-start gap-2">
//                 <Avatar className="w-6 h-6">
//                   {comment.userAvatar ? (
//                     <AvatarImage
//                       src={comment.userAvatar}
//                       alt={comment.userName}
//                     />
//                   ) : (
//                     <AvatarFallback className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white text-xs">
//                       {comment.userName
//                         .split(' ')
//                         .map((n: string) => n[0])
//                         .join('')}
//                     </AvatarFallback>
//                   )}
//                 </Avatar>
//                 <div className="flex-1">
//                   <div className="bg-white/5 rounded-lg px-3 py-2">
//                     <span className="font-semibold text-white text-sm">
//                       {comment.userName}
//                     </span>
//                     <p className="text-white/80 text-sm">{comment.message}</p>
//                   </div>
//                   <span className="text-xs text-white/50 ml-3">
//                     {formatTimeAgo(comment.timestamp)}
//                   </span>
//                 </div>
//               </div>
//             ))}

//             <form
//               onSubmit={handleCommentSubmit}
//               className="flex items-center gap-2 mt-3"
//             >
//               <Avatar className="w-6 h-6">
//                 <AvatarFallback className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white text-xs">
//                   SA
//                 </AvatarFallback>
//               </Avatar>
//               <Input
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 placeholder="Write a comment..."
//                 className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
//               />
//               <Button
//                 type="submit"
//                 size="sm"
//                 disabled={!newComment.trim()}
//                 className="bg-gradient-to-r from-pink-600 to-cyan-600 hover:from-pink-700 hover:to-cyan-700"
//               >
//                 Post
//               </Button>
//             </form>
//           </section>
//         )}
//       </CardContent>
//     </Card>
//   );
// }






// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import {
//   Heart,
//   MessageCircle,
//   Share2,
//   MapPin,
//   Clock,
//   MoreHorizontal,
// } from 'lucide-react';
// import { CORE_BACKEND_URL } from '@/helper/path';
// import { DEFAULT_PROFILE_PICTURE } from '@/lib/variables';
// import { useAppSelector } from '@/app/hook/useReduxApp';
// import {
//   useLikePostMutation,
//   useUnlikePostMutation,
//   useCommentPostMutation,
//   useGetLikesQuery,
//   useGetCommentsQuery,
// } from '@/redux/api/feedApi';

// interface PostContentItem {
//   type: string;
//   content: string;
// }

// interface User {
//   id: string;
//   fullName?: string;
//   avatar?: string;
// }

// interface Bead {
//   _id: string;
//   images?: string[];
//   beadName?: string;
// }

// interface PostType {
//   _id: string;
//   userId: User;
//   beadId?: Bead;
//   beadName?: string;
//   content?: PostContentItem[] | any;
//   createdAt: string;
//   location?: {
//     address?: string;
//   };
// }

// interface LikeType {
//   userId: string;
// }

// interface CommentType {
//   _id: string;
//   userName: string;
//   userAvatar: string;  // added avatar here
//   message: string;
// }

// interface FeedPostProps {
//   post: PostType;
//   onViewBead: (beadId: string) => void;
// }

// export function FeedPost({ post, onViewBead }: FeedPostProps) {
//   const { user } = useAppSelector((state) => state.auth);

//   const [likePost] = useLikePostMutation();
//   const [unlikePost] = useUnlikePostMutation();
//   const [commentPost] = useCommentPostMutation();

//   const { data: likeData } = useGetLikesQuery({ postId: post._id });
//   const { data: commentsData } = useGetCommentsQuery({ postId: post._id });

//   // Map API comments to UI-friendly shape
//   const apiComments: CommentType[] = useMemo(() => {
//     return (
//       commentsData?.data?.comments.map((comment: any) => ({
//         _id: comment._id,
//         userName: comment.userId?.fullName || 'Unknown User',
//         userAvatar:
//           !comment.userId?.profilePicture && comment.userId.profilePicture !== ''
//             ? CORE_BACKEND_URL + comment.userId.profilePicture
//             : DEFAULT_PROFILE_PICTURE,
//         message: comment.text,
//       })) || []
//     );
//   }, [commentsData]);

//   // Use local comments state to update instantly on new comment
//   const [localComments, setLocalComments] = useState<CommentType[]>([]);

//   // Sync local comments when apiComments changes
//   useEffect(() => {
//     setLocalComments(apiComments);
//   }, [apiComments]);

//   const likes = likeData?.data || [];

//   const [isLiked, setIsLiked] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [newComment, setNewComment] = useState('');
//   const [isLiking, setIsLiking] = useState(false);
//   const [isCommenting, setIsCommenting] = useState(false);

//   useEffect(() => {
//     if (likes && likes.likes && Array.isArray(likes.likes)) {
//       const liked = likes.likes.some(
//         (like: { userId: { _id: string } }) => like.userId._id === user.id,
//       );
//       setIsLiked(liked);
//     } else {
//       setIsLiked(false);
//     }
//   }, [likes, user.id]);

//   const handleLikeClick = useCallback(async () => {
//     if (isLiking) return;
//     setIsLiking(true);
//     try {
//       if (isLiked) {
//         await unlikePost({ postId: post._id, userId: user.id }).unwrap();
//       } else {
//         await likePost({ postId: post._id, userId: user.id }).unwrap();
//       }
//     } catch (error) {
//       console.error('Failed to toggle like:', error);
//     } finally {
//       setIsLiking(false);
//     }
//   }, [isLiked, isLiking, likePost, unlikePost, post._id, user.id]);

//   const handleCommentSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newComment.trim() || isCommenting) return;
//     setIsCommenting(true);
//     try {
//       const res = await commentPost({
//         postId: post._id,
//         userId: user.id,
//         text: newComment.trim(),
//       }).unwrap();

//       // Add new comment to local comments immediately
//       const newCommentObj: CommentType = {
//         _id: res.data._id || 'temp-' + Date.now(),
//         userName: user.fullName || 'You',
//         userAvatar:
//           user.avatar && user.avatar !== ''
//             ? CORE_BACKEND_URL + user.avatar
//             : DEFAULT_PROFILE_PICTURE,
//         message: newComment.trim(),
//       };

//       setLocalComments((prev) => [...prev, newCommentObj]);
//       setNewComment('');
//     } catch (error) {
//       console.error('Failed to post comment:', error);
//     } finally {
//       setIsCommenting(false);
//     }
//   };

//   const textContent = useMemo(() => {
//     if (!Array.isArray(post.content)) return '';
//     return post.content
//       .filter((c: PostContentItem) => c.type === 'text')
//       .map((c: PostContentItem) => c.content)
//       .join('\n');
//   }, [post.content]);

//   const fullName = post.userId?.fullName || 'Unknown User';
//   const userAvatar =
//     post.userId?.avatar && post.userId.avatar !== ''
//       ? CORE_BACKEND_URL + post.userId.avatar
//       : DEFAULT_PROFILE_PICTURE;

//   const beadImage =
//     post.beadId?.images && post.beadId.images.length > 0
//       ? CORE_BACKEND_URL + post.beadId.images[0]
//       : null;

//   const beadName = post.beadName || post.beadId?.beadName || '';

//   const formatTimeAgo = (dateString: string | Date) => {
//     const date =
//       typeof dateString === 'string' ? new Date(dateString) : dateString;
//     const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
//     if (seconds < 60) return 'just now';
//     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
//     return `${Math.floor(seconds / 86400)}d ago`;
//   };

//   return (
//     <Card className="bg-[#1c102b] border-[#3f2e6a] mb-6">
//       <CardHeader className="pb-3 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <Avatar className="w-10 h-10">
//             {userAvatar ? (
//               <AvatarImage src={userAvatar} alt={fullName} />
//             ) : (
//               <AvatarFallback className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold">
//                 {fullName
//                   .split(' ')
//                   .map((n: string) => n[0])
//                   .join('')}
//               </AvatarFallback>
//             )}
//           </Avatar>
//           <div>
//             <div className="flex items-center gap-2 text-white font-semibold">
//               {fullName}
//             </div>
//             <div className="text-xs text-white/50 flex items-center gap-2">
//               <Clock className="w-3 h-3" />
//               <span>{formatTimeAgo(post.createdAt)}</span>
//               {post.location?.address && (
//                 <>
//                   <MapPin className="w-3 h-3" />
//                   <span>{post.location.address}</span>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//         <Button
//           variant="ghost"
//           size="sm"
//           className="text-white/60 hover:text-white"
//         >
//           <MoreHorizontal className="w-4 h-4" />
//         </Button>
//       </CardHeader>

//       <CardContent className="space-y-4 text-white/90">
//         <p className="whitespace-pre-line">{textContent}</p>

//         {beadImage && (
//           <div
//             className="relative rounded-lg overflow-hidden cursor-pointer group"
//             onClick={() => onViewBead(post.beadId?._id ?? '')}
//           >
//             <img
//               src={beadImage}
//               alt={beadName}
//               className="w-full h-75 object-cover rounded-lg"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
//             <Badge className="absolute bottom-4 left-4 bg-white/20 text-white backdrop-blur-sm">
//               {beadName}
//             </Badge>
//           </div>
//         )}

//         <div className="flex items-center justify-between pt-2 border-t border-white/10">
//           <div className="flex items-center gap-4">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={handleLikeClick}
//               className={`text-white/70 hover:text-white hover:bg-gradient-to-r from-pink-600 to-cyan-400 ${
//                 isLiked ? 'bg-gradient-to-r from-pink-600 to-cyan-400 text-white' : ''
//               }`}
//               disabled={isLiking}
//             >
//               <Heart className="w-4 h-4" />
//               <span className="ml-1">{likes?.likes?.length || 0}</span>
//             </Button>

//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setShowComments((prev) => !prev)}
//               className="text-white/70 hover:text-white hover:bg-gradient-to-r from-pink-600 to-cyan-400"
//             >
//               <MessageCircle className="w-4 h-4" />
//               <span className="ml-1">{localComments.length}</span>
//             </Button>

//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-white/70 hover:text-white hover:bg-gradient-to-r from-pink-600 to-cyan-400"
//               onClick={() => alert('Share feature coming soon!')}
//             >
//               <Share2 className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>

//         {showComments && (
//           <div className="pt-4 border-t border-white/20 space-y-3 max-h-80 overflow-y-auto">
//             {localComments.length === 0 && (
//               <p className="text-sm text-white/50">No comments yet.</p>
//             )}
//             {localComments.map((comment) => (
//               <div
//                 key={comment._id}
//                 className="flex items-start gap-3 text-white/90"
//               >
//                 <Avatar className="w-8 h-8">
//                   {comment.userAvatar ? (
//                     <AvatarImage src={comment.userAvatar} alt={comment.userName} />
//                   ) : (
//                     <AvatarFallback className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold">
//                       {comment.userName
//                         .split(' ')
//                         .map((n) => n[0])
//                         .join('')
//                         .toUpperCase()}
//                     </AvatarFallback>
//                   )}
//                 </Avatar>
//                 <div>
//                   <strong>{comment.userName}</strong>: <span>{comment.message}</span>
//                 </div>
//               </div>
//             ))}

//             <form onSubmit={handleCommentSubmit} className="pt-3 flex gap-2">
//               <input
//                 type="text"
//                 className="flex-1 rounded-md bg-white/10 border border-white/30 px-3 py-1.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                 placeholder="Write a comment..."
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 disabled={isCommenting}
//               />
//               <Button type="submit" disabled={isCommenting || newComment.trim() === ''}>
//                 {isCommenting ? 'Posting...' : 'Post'}
//               </Button>
//             </form>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }








"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, MapPin, Clock, MoreHorizontal } from "lucide-react"
import { CORE_BACKEND_URL } from "@/helper/path"
import { DEFAULT_PROFILE_PICTURE } from "@/lib/variables"
import { useAppSelector } from "@/app/hook/useReduxApp"
import {
  useLikePostMutation,
  useUnlikePostMutation,
  useCommentPostMutation,
  useGetLikesQuery,
  useGetCommentsQuery,
} from "@/redux/api/feedApi"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface PostContentItem {
  type: string
  content: string
}

interface User {
  id: string
  fullName?: string
  avatar?: string
}

interface Bead {
  _id: string
  images?: string[]
  beadName?: string
}

interface PostType {
  _id: string
  userId: User
  beadId?: Bead
  beadName?: string
  content?: PostContentItem[] | any
  createdAt: string
  location?: {
    address?: string
  }
}

interface LikeType {
  userId: string
}

interface CommentType {
  _id: string
  userName: string
  userAvatar: string
  message: string
}

interface FeedPostProps {
  post: PostType
  onViewBead: (beadId: string) => void
}

export function FeedPost({ post, onViewBead }: FeedPostProps) {
  const { user } = useAppSelector((state) => state.auth)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [likePost] = useLikePostMutation()
  const [unlikePost] = useUnlikePostMutation()
  const [commentPost] = useCommentPostMutation()

  const { data: likeData } = useGetLikesQuery({ postId: post._id })
  const { data: commentsData } = useGetCommentsQuery({ postId: post._id })

  // Map API comments to UI-friendly shape
  const apiComments = useMemo(() => {
    return (
      commentsData?.data?.comments.map((comment: any) => ({
        _id: comment._id,
        userName: comment.userId?.fullName || "Unknown User",
        userAvatar:
          !comment.userId?.profilePicture && comment.userId.profilePicture !== ""
            ? CORE_BACKEND_URL + comment.userId.profilePicture
            : DEFAULT_PROFILE_PICTURE,
        message: comment.text,
      })) || []
    )
  }, [commentsData])

  // Use local comments state to update instantly on new comment
  const [localComments, setLocalComments] = useState<CommentType[]>([])
  const [showLikeAnimation, setShowLikeAnimation] = useState(false)

  // Sync local comments when apiComments changes
  useEffect(() => {
    setLocalComments(apiComments)
  }, [apiComments])

  const likes = likeData?.data || []

  const [isLiked, setIsLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [isLiking, setIsLiking] = useState(false)
  const [isCommenting, setIsCommenting] = useState(false)

  useEffect(() => {
    if (likes && likes.likes && Array.isArray(likes.likes)) {
      const liked = likes.likes.some((like: { userId: { _id: string } }) => like.userId._id === user.id)
      setIsLiked(liked)
    } else {
      setIsLiked(false)
    }
  }, [likes, user.id])

  const handleLikeClick = useCallback(async () => {
    if (isLiking) return
    setIsLiking(true)

    // Show like animation
    if (!isLiked) {
      setShowLikeAnimation(true)
      setTimeout(() => setShowLikeAnimation(false), 1000)
    }

    try {
      if (isLiked) {
        await unlikePost({ postId: post._id, userId: user.id }).unwrap()
      } else {
        await likePost({ postId: post._id, userId: user.id }).unwrap()
      }
    } catch (error) {
      console.error("Failed to toggle like:", error)
    } finally {
      setIsLiking(false)
    }
  }, [isLiked, isLiking, likePost, unlikePost, post._id, user.id])

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || isCommenting) return
    setIsCommenting(true)
    try {
      const res = await commentPost({
        postId: post._id,
        userId: user.id,
        text: newComment.trim(),
      }).unwrap()

      // Add new comment to local comments immediately
      const newCommentObj = {
        _id: res.data._id || "temp-" + Date.now(),
        userName: user.fullName || "You",
        userAvatar: user.avatar && user.avatar !== "" ? CORE_BACKEND_URL + user.avatar : DEFAULT_PROFILE_PICTURE,
        message: newComment.trim(),
      }

      setLocalComments((prev) => [...prev, newCommentObj])
      setNewComment("")
    } catch (error) {
      console.error("Failed to post comment:", error)
    } finally {
      setIsCommenting(false)
    }
  }

  const textContent = useMemo(() => {
    if (!Array.isArray(post.content)) return ""
    return post.content
      .filter((c: PostContentItem) => c.type === "text")
      .map((c: PostContentItem) => c.content)
      .join("\n")
  }, [post.content])

  const fullName = post.userId?.fullName || "Unknown User"
  const userAvatar =
    post.userId?.avatar && post.userId.avatar !== "" ? CORE_BACKEND_URL + post.userId.avatar : DEFAULT_PROFILE_PICTURE

  const beadImage =
    post.beadId?.images && post.beadId.images.length > 0 ? CORE_BACKEND_URL + post.beadId.images[0] : null

  const beadName = post.beadName || post.beadId?.beadName || ""

  const formatTimeAgo = (dateString: string | Date) => {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return "just now"
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-[#1c102b] border-[#3f2e6a] mb-6 relative overflow-hidden">
        {/* Like animation overlay */}
        <AnimatePresence>
          {showLikeAnimation && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.5 }}
              exit={{ opacity: 0, scale: 2 }}
              transition={{ duration: 0.5 }}
            >
              <Heart className="w-20 h-20 text-pink-500 fill-pink-500" />
            </motion.div>
          )}
        </AnimatePresence>

        <CardHeader className="pb-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              {userAvatar ? (
                <AvatarImage src={userAvatar || "/placeholder.svg"} alt={fullName} />
              ) : (
                <AvatarFallback className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold">
                  {fullName
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <div className="flex items-center gap-2 text-white font-semibold">{fullName}</div>
              <div className="text-xs text-white/50 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(post.createdAt)}</span>
                {post.location?.address && (
                  <>
                    <MapPin className="w-3 h-3" />
                    <span>{post.location.address}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4 text-white/90">
          <p className="whitespace-pre-line">{textContent}</p>

          {beadImage && (
            <motion.div
              className="relative rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => onViewBead(post.beadId?._id ?? "")}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img
                src={beadImage || "/placeholder.svg"}
                alt={beadName}
                className="w-full h-75 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
              <Badge className="absolute bottom-4 left-4 bg-white/20 text-white backdrop-blur-sm">{beadName}</Badge>
            </motion.div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div className="flex items-center gap-4">
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLikeClick}
                  className={`text-white/70 hover:text-white hover:bg-gradient-to-r from-pink-600 to-cyan-400 ${
                    isLiked ? "bg-gradient-to-r from-pink-600 to-cyan-400 text-white" : ""
                  }`}
                  disabled={isLiking}
                >
                  <motion.div
                    animate={
                      isLiked
                        ? {
                            scale: [1, 1.3, 1],
                            rotate: [0, 15, -15, 0],
                          }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                  </motion.div>
                  <motion.span
                    className="ml-1"
                    key={likes?.likes?.length || 0}
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {likes?.likes?.length || 0}
                  </motion.span>
                </Button>
              </motion.div>

              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowComments((prev) => !prev)}
                  className="text-white/70 hover:text-white hover:bg-gradient-to-r from-pink-600 to-cyan-400"
                >
                  <MessageCircle className="w-4 h-4" />
                  <motion.span
                    className="ml-1"
                    key={localComments.length}
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {localComments.length}
                  </motion.span>
                </Button>
              </motion.div>

              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white hover:bg-gradient-to-r from-pink-600 to-cyan-400"
                  onClick={() => alert("Share feature coming soon!")}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>

          <AnimatePresence>
            {showComments && (
              <motion.div
                className="pt-4 border-t border-white/20 space-y-3 max-h-80 overflow-y-auto"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {localComments.length === 0 && <p className="text-sm text-white/50">No comments yet.</p>}

                <AnimatePresence>
                  {localComments.map((comment, index) => (
                    <motion.div
                      key={comment._id}
                      className="flex items-start gap-3 text-white/90"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    >
                      <Avatar className="w-8 h-8">
                        {comment.userAvatar ? (
                          <AvatarImage src={comment.userAvatar || "/placeholder.svg"} alt={comment.userName} />
                        ) : (
                          <AvatarFallback className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold">
                            {comment.userName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <strong>{comment.userName}</strong>: <span>{comment.message}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <motion.form
                  onSubmit={handleCommentSubmit}
                  className="pt-3 flex gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <input
                    type="text"
                    className="flex-1 rounded-md bg-white/10 border border-white/30 px-3 py-1.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={isCommenting}
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      disabled={isCommenting || newComment.trim() === ""}
                      className="bg-gradient-to-r from-pink-600 to-cyan-600 hover:from-pink-700 hover:to-cyan-700"
                    >
                      {isCommenting ? "Posting..." : "Post"}
                    </Button>
                  </motion.div>
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}

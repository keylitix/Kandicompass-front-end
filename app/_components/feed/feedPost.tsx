import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Heart, MessageCircle, Share2, MapPin, Clock, MoreHorizontal } from 'lucide-react';
import { CORE_BACKEND_URL } from '@/helper/path';
import { DEFAULT_PROFILE_PICTURE } from '@/lib/variables';

interface FeedPostProps {
  post: any;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onViewBead: (beadId: string) => void;
}

export function FeedPost({ post, onLike, onComment, onViewBead }: FeedPostProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(() => {
    // Assuming you can check if current user liked it
    // For now, false by default
    return false;
  });

  // Extract text content safely
  const textContent = Array.isArray(post.content)
    ? post.content
        .filter((c: any) => c.type === 'text')
        .map((c: any) => c.content)
        .join('\n')
    : '';

  const fullName = post.userId?.fullName || 'Unknown User';
  const userAvatar = post.userId?.avatar
    ? CORE_BACKEND_URL + post.userId.avatar
    : DEFAULT_PROFILE_PICTURE;

  const beadImage = post.beadId?.images?.[0]
    ? CORE_BACKEND_URL + post.beadId.images[0]
    : null;

  const beadName = post.beadName || post.beadId?.beadName || '';

  const likes = post.likes || [];
  const comments = post.comments || [];

  const formatTimeAgo = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const handleLikeClick = useCallback(() => {
    setIsLiked((liked) => !liked);
    onLike(post._id);
  }, [post._id, onLike]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onComment(post._id, newComment.trim());
    setNewComment('');
  };

  return (
    <Card className="bg-[#1c102b] border-[#3f2e6a] mb-6">
      <CardHeader className="pb-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            {userAvatar ? (
              <AvatarImage src={userAvatar} alt={fullName} />
            ) : (
              <AvatarFallback className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold">
                {fullName
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="flex items-center gap-2 text-white font-semibold">
              {fullName}
            </div>
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
          <div
            className="relative rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => onViewBead(post.beadId?._id)}
          >
            <img src={beadImage} alt={beadName} className="w-full h-75 object-cover rounded-lg" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
            <Badge className="absolute bottom-4 left-4 bg-white/20 text-white backdrop-blur-sm">
              {beadName}
            </Badge>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLikeClick}
              className={`text-white/70 hover:text-white hover:bg-gradient-to-r from-pink-600 to-cyan-600 ${
                isLiked ? 'text-red-400' : ''
              }`}
            >
              <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              {likes.length}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments((show) => !show)}
              className="text-white/70 hover:text-white hover:bg-gradient-to-r from-pink-600 to-cyan-600"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              {comments.length}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-gradient-to-r from-pink-600 to-cyan-600"
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
          <Button
            size="sm"
            onClick={() => onViewBead(post.beadId?._id)}
            className="bg-gradient-to-r from-pink-600 to-cyan-600 hover:from-pink-700 hover:to-cyan-700"
          >
            View Bead QR
          </Button>
        </div>

        {showComments && (
          <section className="space-y-3 pt-3 border-t border-white/10">
            {comments.map((comment: any) => (
              <div key={comment.id} className="flex items-start gap-2">
                <Avatar className="w-6 h-6">
                  {comment.userAvatar ? (
                    <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white text-xs">
                      {comment.userName
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1">
                  <div className="bg-white/5 rounded-lg px-3 py-2">
                    <span className="font-semibold text-white text-sm">{comment.userName}</span>
                    <p className="text-white/80 text-sm">{comment.message}</p>
                  </div>
                  <span className="text-xs text-white/50 ml-3">
                    {formatTimeAgo(comment.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 mt-3">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white text-xs">
                  SA
                </AvatarFallback>
              </Avatar>
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
              />
              <Button
                type="submit"
                size="sm"
                disabled={!newComment.trim()}
                className="bg-gradient-to-r from-pink-600 to-cyan-600 hover:from-pink-700 hover:to-cyan-700"
              >
                Post
              </Button>
            </form>
          </section>
        )}
      </CardContent>
    </Card>
  );
}

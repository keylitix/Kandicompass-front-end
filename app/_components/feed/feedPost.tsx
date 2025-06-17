'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Heart, MessageCircle, Share2, MapPin, Clock, MoreHorizontal } from 'lucide-react';

interface FeedPostProps {
  post: any;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onViewBead: (beadId: string) => void;
}

export function FeedPost({ post, onLike, onComment, onViewBead }: FeedPostProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(
    true ? post.likes.some((like: any) => like.userId === "") : false
  );

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(post.id);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(post.id, newComment.trim());
      setNewComment('');
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const getPostTypeIcon = () => {
    switch (post.type) {
      case 'bead_created':
        return '✨';
      case 'ownership_transfer':
        return '🔄';
      case 'location_update':
        return '📍';
      default:
        return '💬';
    }
  };

  const getPostTypeText = () => {
    switch (post.type) {
      case 'bead_created':
        return 'created a new bead';
      case 'ownership_transfer':
        return 'received a bead';
      case 'location_update':
        return 'updated location';
      default:
        return 'commented';
    }
  };

  return (
    <Card className="bg-[#1c102b] border-[#3f2e6a] mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.userAvatar} alt={post.userName} />
              <AvatarFallback className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white">
                {post.userName.split(' ').map((n: any) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{post.userName}</span>
                <span className="text-white/60 text-sm">
                  {getPostTypeIcon()} {getPostTypeText()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(post.timestamp)}</span>
                {post.location && (
                  <>
                    <MapPin className="w-3 h-3 ml-2" />
                    <span>{post.location.address}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-white/90">{post.content}</p>

        {post.beadImage && (
          <div 
            className="relative rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => onViewBead(post.beadId)}
          >
            <img
              src={post.beadImage}
              alt={post.beadName}
              className="w-full h-75 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-white/20 text-white backdrop-blur-sm">
                {post.beadName}
              </Badge>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`text-white/70 hover:text-white hover:bg-gradient-to-r from-pink-600 to-cyan-600 ${isLiked ? 'text-red-400' : ''}`}
            >
              <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              {post.likes.length}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="text-white/70 hover:text-white hover:bg-gradient-to-r from-pink-600 to-cyan-600"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              {post.comments.length}
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
            onClick={() => onViewBead(post.beadId)}
            className="bg-gradient-to-r from-pink-600 to-cyan-600 hover:from-pink-700 hover:to-cyan-700"
          >
            View Bead QR
          </Button>
        </div>

        {showComments && (
          <div className="space-y-3 pt-3 border-t border-white/10">
            {post.comments.map((comment: any) => (
              <div key={comment.id} className="flex items-start gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                  <AvatarFallback className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white text-xs">
                    {comment.userName.split(' ').map((n: any) => n[0]).join('')}
                  </AvatarFallback>
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

              <form onSubmit={handleComment} className="flex items-center gap-2 mt-3">
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}
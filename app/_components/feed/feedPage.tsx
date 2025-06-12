import React, { useState, useEffect } from 'react';
import { RecentActivity } from './recentActivity';
import { generateFeedPosts, getRecentBeads } from './feedData';
import { FeedPost } from './feedPost';

interface FeedPageProps {
  onViewBead: (beadId: string) => void;
}

export function FeedPage({ onViewBead }: FeedPageProps) {
  const [feedPosts, setFeedPosts] = useState<any[]>([]);
  const [recentBeads, setRecentBeads] = useState(getRecentBeads(15));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading feed data
    const timer = setTimeout(() => {
      setFeedPosts(generateFeedPosts().slice(0, 50)); // Show first 50 posts
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLike = (postId: string) => {
    setFeedPosts(posts => 
      posts.map(post => {
        if (post.id === postId) {
          const isLiked = post.likes.some((like: any) => like.userId === "");
          if (isLiked) {
            return {
              ...post,
              likes: post.likes.filter((like: any) => like.userId !== "")
            };
          } else {
            return {
              ...post,
              likes: [...post.likes, {
                id: `like_${postId}_${Date.now()}`,
                userId: "",
                userName: "",
                timestamp: new Date()
              }]
            };
          }
        }
        return post;
      })
    );
  };

  const handleComment = (postId: string, comment: string) => {
    
    setFeedPosts(posts =>
      posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, {
              id: `comment_${postId}_${Date.now()}`,
              userId: "",
              userName: "",
              userAvatar: undefined,
              message: comment,
              timestamp: new Date()
            }]
          };
        }
        return post;
      })
    );
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="glass-card border-white/20 p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-white/10 rounded"></div>
                    <div className="w-24 h-3 bg-white/10 rounded"></div>
                  </div>
                </div>
                <div className="w-full h-64 bg-white/10 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="w-3/4 h-4 bg-white/10 rounded"></div>
                  <div className="w-1/2 h-4 bg-white/10 rounded"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div className="glass-card border-white/20 p-6 animate-pulse">
              <div className="w-32 h-6 bg-white/10 rounded mb-4"></div>
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full"></div>
                  <div className="space-y-2 flex-1">
                    <div className="w-24 h-4 bg-white/10 rounded"></div>
                    <div className="w-32 h-3 bg-white/10 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Bead Journey Feed</h1>
            <p className="text-white/70">Discover the latest bead journeys and stories from around the world</p>
          </div>
          
          <div className="space-y-6">
            {feedPosts.map(post => (
              <FeedPost
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onViewBead={onViewBead}
              />
            ))}
          </div>
          
          {feedPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60">No posts to show yet. Start creating beads to see activity!</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <RecentActivity
            recentBeads={recentBeads}
            onViewBead={onViewBead}
          />
        </div>
      </div>
    </div>
  );
}
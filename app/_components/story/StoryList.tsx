import React from 'react';
import { Heart, Share2, Clock } from 'lucide-react';
import { Story } from '@/app/types/common';

interface StoryListProps {
  stories: Story[];
}

export const StoryList: React.FC<StoryListProps> = ({ stories }) => {
  const sortedStories = [...stories].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      {sortedStories.map(story => (
        <div 
          key={story.id} 
          className="bg-cosmic-background bg-opacity-30 rounded-lg p-5 transition-transform hover:scale-[1.01]"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-cosmic-glow mr-3">
              <img src={story.userAvatar} alt={story.userName} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-medium text-cosmic-text-primary">{story.userName}</div>
              <div className="flex items-center text-xs text-cosmic-text-secondary">
                <Clock size={12} className="mr-1" />
                <span>{new Date(story.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-cosmic-highlight mb-2">{story.title}</h3>
          
          <div className="text-cosmic-text-primary mb-4">
            {story.content}
          </div>
          
          <div className="flex items-center justify-between">
            {/* Likes and shares */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-cosmic-text-secondary hover:text-cosmic-accent transition-colors">
                <Heart size={18} className="mr-1" />
                <span>{story.likes}</span>
              </button>
              <button className="flex items-center text-cosmic-text-secondary hover:text-cosmic-accent transition-colors">
                <Share2 size={18} className="mr-1" />
                <span>{story.shares}</span>
              </button>
            </div>
            
            {/* Read more */}
            <button className="text-sm text-cosmic-accent hover:text-cosmic-glow transition-colors">
              Read full story
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
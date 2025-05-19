import { Bead } from '@/app/types/common';
import { MapPin, Star, MessageCircle, History, Share2, ChevronDown, ChevronUp, User, Clock, Globe, Share2Icon, QrCode } from 'lucide-react';
import { useState } from 'react';
import { OwnershipTimeline } from './OwnershipTimeline';
import { StoryList } from '../story/StoryList';
import { GradientButton } from '../custom-ui/GradientButton';

interface BeadDetailProps {
  bead: Bead;
}

export const BeadDetail: React.FC<BeadDetailProps> = ({ bead }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'stories' | 'reviews'>('info');
  const [isRotating, setIsRotating] = useState(true);

  // Calculate the average rating
  const averageRating = bead.reviews.length
    ? bead.reviews.reduce((sum, review) => sum + review.rating, 0) / bead.reviews.length
    : 0;

  // Get the current owner
  const currentOwner = bead.ownershipHistory.length > 0
    ? bead.ownershipHistory[bead.ownershipHistory.length - 1]
    : null;

  return (
    <div className="max-w-6xl mx-auto bg-[#1c102b] backdrop-blur-md rounded-xl overflow-hidden border border-[#3f2e6a] border-opacity-20 shadow-lg">
      {/* Hero section with bead image and basic info */}
      <div className="relative md:flex">
        {/* Bead 3D visualization */}
        <div className="relative w-full md:w-2/5 h-64 md:h-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-[#00D1FF] opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`relative w-40 h-40 rounded-full overflow-hidden 
                        ${isRotating ? 'animate-rotate-slow' : ''} border-2 border-[#00D1FF] shadow-lg`}
              onClick={() => setIsRotating(!isRotating)}
            >
              <img
                src={bead.image}
                alt={bead.name}
                className="w-full h-full object-cover"
              />

              {/* Energy aura effect */}
              <div className="absolute inset-0 border-4 border-[#00D1FF] rounded-full opacity-30 animate-pulse-slow"></div>
            </div>
          </div>

          {/* Rotation control button */}
          <button
            className="absolute bottom-4 right-4 bg-[#1c102b] bg-opacity-60 p-2 rounded-full text-[#00D1FF] 
                     hover:bg-[#00D1FF] hover:text-white transition-colors"
            onClick={() => setIsRotating(!isRotating)}
          >
            {isRotating ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        </div>

        {/* Bead information */}
        <div className="p-6 md:w-3/5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold">{bead.name}</h1>
              <div className="flex items-center mt-1 text-sm">
                <Clock size={16} className="mr-1" />
                <span>Created {new Date(bead.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Type badge */}
            <span className="text-sm bg-[#00D1FF] bg-opacity-20 px-3 py-1 rounded-full text-[#2a1a3d]">
              {bead.type}
            </span>
          </div>

          <p className="text-[#8a86a0] mb-6">
            {bead.description}
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {/* Value */}
            <div className="bg-[#2a1a3d] bg-opacity-40 rounded-lg p-3 text-center">
              <div className="text-[#00D1FF] text-xl font-semibold">${bead.value}</div>
              <div className="text-xs text-[#8a86a0] mt-1">Current Value</div>
            </div>

            {/* Rating */}
            <div className="bg-[#2a1a3d] bg-opacity-40 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center text-[#FF005D] text-xl font-semibold">
                {averageRating ? averageRating.toFixed(1) : '—'}
                <Star size={16} className="ml-1" />
              </div>
              <div className="text-xs text-[#8a86a0] mt-1">Rating</div>
            </div>

            {/* Owners */}
            <div className="bg-[#2a1a3d] bg-opacity-40 rounded-lg p-3 text-center">
              <div className="text-[#00D1FF] text-xl font-semibold">{bead.ownershipHistory.length}</div>
              <div className="text-xs text-[#8a86a0] mt-1">Owners</div>
            </div>

            {/* Stories */}
            <div className="bg-[#2a1a3d] bg-opacity-40 rounded-lg p-3 text-center">
              <div className="text-[#00D1FF] text-xl font-semibold">{bead.stories.length}</div>
              <div className="text-xs text-[#8a86a0] mt-1">Stories</div>
            </div>
          </div>

          {/* Current owner */}
          {currentOwner && (
            <div className="flex items-center mb-6">
              <div className="mr-3 w-10 h-10 rounded-full overflow-hidden border border-[#00D1FF]">
                <img src={currentOwner.userAvatar} alt={currentOwner.userName} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-sm text-[#8a86a0]">Current Owner</div>
                <div className="text-[#00D1FF] font-medium">{currentOwner.userName}</div>
              </div>
              <div className="ml-auto flex items-center text-sm text-[#FF005D]">
                <MapPin size={16} className="mr-1 text-[#00D1FF]" />
                <span>{currentOwner.location.name}</span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <GradientButton
              icon={Share2Icon}
            >
              Share Bead
            </GradientButton>

            <GradientButton
            variant='outline'
              icon={QrCode}
            >
              Show QR Code
            </GradientButton>

          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="px-6 border-b border-[#3f2e6a] border-opacity-20">
        <div className="flex overflow-x-auto scrollbar-none">
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'info' ? 'border-[#00D1FF] text-[#00D1FF]' : 'border-transparent text-[#FF005D]'}`}
            onClick={() => setActiveTab('info')}
          >
            Origin Story
          </button>
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'history' ? 'border-[#00D1FF] text-[#00D1FF]' : 'border-transparent text-[#FF005D]'}`}
            onClick={() => setActiveTab('history')}
          >
            Ownership History
          </button>
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'stories' ? 'border-[#00D1FF] text-[#00D1FF]' : 'border-transparent text-[#FF005D]'}`}
            onClick={() => setActiveTab('stories')}
          >
            Stories
          </button>
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-[#00D1FF] text-[#00D1FF]' : 'border-transparent text-[#FF005D]'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'info' && (
          <div className="prose prose-lg prose-invert max-w-none">
            <h3 className="text-xl font-semibold text-[#00D1FF] mb-4">Origin Story</h3>
            <p>{bead.originStory}</p>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h3 className="text-xl font-semibold text-[#00D1FF] mb-4">Ownership Timeline</h3>
            <OwnershipTimeline ownershipHistory={bead.ownershipHistory} />
          </div>
        )}

        {activeTab === 'stories' && (
          <div>
            <h3 className="text-xl font-semibold text-[#00D1FF] mb-4">Bead Stories</h3>
            {bead.stories.length > 0 ? (
              <StoryList stories={bead.stories} />
            ) : (
              <p className="text-[#8a86a0] italic">No stories have been shared about this bead yet.</p>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h3 className="text-xl font-semibold text-[#00D1FF] mb-4">Bead Reviews</h3>
            {bead.reviews.length > 0 ? (
              <div className="space-y-4">
                {bead.reviews.map(review => (
                  <div key={review.id} className="bg-[#2a1a3d] bg-opacity-30 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-[#00D1FF] mr-3">
                        <img src={review.userAvatar} alt={review.userName} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-[#00D1FF]">{review.userName}</div>
                        <div className="text-xs text-[#FF005D]">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="ml-auto flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < review.rating ? 'text-[#FF005D]' : 'text-[#FF005D] opacity-30'}
                              fill={i < review.rating ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-[#00D1FF]">{review.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#8a86a0] italic">No reviews yet. Be the first to review this bead!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

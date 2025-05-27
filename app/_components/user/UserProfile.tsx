'use client';
import React, { useState } from 'react';
import { MapPin, Award, Sparkles, BookOpen, Users, Calendar } from 'lucide-react';
import { User, } from '@/app/types/mock';
import { mockBeads } from '@/app/data/mockdata';
import { BeadCard } from '../beads/BeadCard';

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'beads' | 'stories' | 'badges' | 'meetings'>('beads');
  
  // Filter beads owned by this user
  const userBeads = mockBeads.filter((bead) => bead.currentOwnerId === user.id);
  
  return (
    <div className="max-w-6xl mx-auto mt-8">
      {/* Hero section with user info */}
      <div className="bg-[#1c102b] backdrop-blur-md rounded-xl overflow-hidden border border-[#3f2e6a] border-opacity-20 shadow-neon-sm mb-6">
        <div className="md:flex">
          {/* Avatar section */}
          <div className="relative p-6 md:w-1/3 flex flex-col items-center justify-center">
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-cosmic-accent shadow-neon mb-4">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              
              {/* Energy aura effect */}
              <div className="absolute inset-0 border-4 border-[#3f2e6a] rounded-full opacity-30 animate-pulse-slow"></div>
            </div>
            
            <h1 className="text-2xl font-bold text-cosmic-accent text-center">{user.name}</h1>
            
            <div className="flex items-center mt-2 text-sm text-[#8a86a0]">
              <MapPin size={16} className="mr-1 text-cosmic-highlight" />
              <span>{user.location.name}</span>
            </div>
          </div>
          
          {/* User stats */}
          <div className="p-6 md:w-2/3 border-t md:border-t-0 md:border-l border-[#3f2e6a] border-opacity-20">
            <p className="text-[#ffff] mb-6">
              {user.bio}
            </p>
            
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {/* Beads */}
              <div className="bg-cosmic-background bg-opacity-40 rounded-lg p-3 text-center">
                <div className="text-cosmic-accent text-xl font-semibold">{user.ownedBeads.length}</div>
                <div className="text-xs text-[#8a86a0] mt-1">Beads Owned</div>
              </div>
              
              {/* Threads */}
              <div className="bg-cosmic-background bg-opacity-40 rounded-lg p-3 text-center">
                <div className="text-cosmic-highlight text-xl font-semibold">{user.joinedThreads.length}</div>
                <div className="text-xs text-[#8a86a0] mt-1">Threads Joined</div>
              </div>
              
              {/* Stories */}
              <div className="bg-cosmic-background bg-opacity-40 rounded-lg p-3 text-center">
                <div className="text-cosmic-glow text-xl font-semibold">{user.stories.length}</div>
                <div className="text-xs text-[#8a86a0] mt-1">Stories Shared</div>
              </div>
              
              {/* Badges */}
              <div className="bg-cosmic-background bg-opacity-40 rounded-lg p-3 text-center">
                <div className="text-cosmic-warning text-xl font-semibold">{user.badges.length}</div>
                <div className="text-xs text-[#8a86a0] mt-1">Badges Earned</div>
              </div>
            </div>
            
            {/* Badges showcase */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-[#8a86a0] mb-2">Top Badges</h3>
              <div className="flex flex-wrap gap-2">
                {user.badges.map(badge => (
                  <Badge key={badge.id} badge={badge} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="bg-cosmic-card backdrop-blur-md rounded-xl overflow-hidden border border-[#3f2e6a] border-opacity-20 shadow-neon-sm">
        <div className="px-6 border-b border-[#3f2e6a] border-opacity-20">
          <div className="flex overflow-x-auto scrollbar-none">
            <button 
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'beads' 
                  ? 'border-[#00D1FF] text-[#00D1FF]' 
                  : 'border-transparent text-[#FF005D] hover:text-cosmic-text-primary'
              }`}
              onClick={() => setActiveTab('beads')}
            >
              <div className="flex items-center">
                <Sparkles size={16} className="mr-2" />
                Beads Collection
              </div>
            </button>
            <button 
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'stories' 
                  ? 'border-[#00D1FF] text-[#00D1FF]' 
                  : 'border-transparent text-[#FF005D] hover:text-cosmic-text-primary'
              }`}
              onClick={() => setActiveTab('stories')}
            >
              <div className="flex items-center">
                <BookOpen size={16} className="mr-2" />
                Stories
              </div>
            </button>
            <button 
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'badges' 
                  ? 'border-[#00D1FF] text-[#00D1FF]' 
                  : 'border-transparent text-[#FF005D] hover:text-cosmic-text-primary'
              }`}
              onClick={() => setActiveTab('badges')}
            >
              <div className="flex items-center">
                <Award size={16} className="mr-2" />
                Badges
              </div>
            </button>
            <button 
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'meetings' 
                  ? 'border-[#00D1FF] text-[#00D1FF]' 
                  : 'border-transparent text-[#FF005D] hover:text-cosmic-text-primary'
              }`}
              onClick={() => setActiveTab('meetings')}
            >
              <div className="flex items-center">
                <Users size={16} className="mr-2" />
                Meetings
              </div>
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="p-6">
          {activeTab === 'beads' && (
            <div>
              <h3 className="text-xl font-semibold text-cosmic-highlight mb-4">Beads Collection</h3>
              {userBeads.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userBeads.map(bead => (
                    <BeadCard key={bead.id} bead={bead} />
                  ))}
                </div>
              ) : (
                <p className="text-[#8a86a0] italic">This user doesn't own any beads yet.</p>
              )}
            </div>
          )}
          
          {activeTab === 'stories' && (
            <div>
              <h3 className="text-xl font-semibold text-cosmic-highlight mb-4">Shared Stories</h3>
              {user.stories.length > 0 ? (
                <div>
                  {/* Stories content here */}
                </div>
              ) : (
                <p className="text-[#8a86a0] italic">This user hasn't shared any stories yet.</p>
              )}
            </div>
          )}
          
          {activeTab === 'badges' && (
            <div>
              <h3 className="text-xl font-semibold text-cosmic-highlight mb-4">Earned Badges</h3>
              {user.badges.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {user.badges.map(badge => (
                    <div key={badge.id} className="bg-cosmic-background bg-opacity-30 rounded-lg p-4 text-center">
                      <div className="w-16 h-16 flex items-center justify-center mx-auto mb-3 rounded-full bg-cosmic-glow bg-opacity-20 border border-[#3f2e6a] border-opacity-30">
                        <Award size={32} className="text-cosmic-warning" />
                      </div>
                      <h4 className="font-medium text-cosmic-accent">{badge.name}</h4>
                      <p className="text-sm text-[#8a86a0] mt-1">{badge.description}</p>
                      <div className="text-xs text-[#8a86a0] mt-2 flex items-center justify-center">
                        <Calendar size={12} className="mr-1" />
                        <span>{new Date(badge.acquiredAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#8a86a0] italic">This user hasn't earned any badges yet.</p>
              )}
            </div>
          )}
          
          {activeTab === 'meetings' && (
            <div>
              <h3 className="text-xl font-semibold text-cosmic-highlight mb-4">Meeting History</h3>
              {user.meetingHistory.length > 0 ? (
                <div>
                  {/* Meeting history content here */}
                </div>
              ) : (
                <p className="text-[#8a86a0] italic">No meeting history available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface BadgeProps {
  badge: any;
}

const Badge: React.FC<BadgeProps> = ({ badge }) => {
  return (
    <div className="flex items-center bg-cosmic-background bg-opacity-40 rounded-full px-3 py-1">
      <Award size={14} className="text-cosmic-warning mr-1" />
      <span className="text-xs font-medium text-cosmic-text-primary">{badge.name}</span>
    </div>
  );
};
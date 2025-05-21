'use client';
import React, { useState } from 'react';
import { MapPin, Star, MessageCircle, History } from 'lucide-react';
import { Bead } from '@/app/types/common';
import { useRouter } from 'next/navigation';

interface BeadCardProps {
  bead: any;
}

export const BeadCard: React.FC<BeadCardProps> = ({ bead }) => {
  const route = useRouter();
  const [isHovered, setIsHovered] = useState(false);
console.log('bead==========', bead)
  const handleClick = () => {
    route.push(`/dashboard/beads/${bead.id}`);
  };

  // Calculate the average rating
  const averageRating = bead.reviews.length
    ? bead.reviews.reduce((sum: any, review: any) => sum + review.rating, 0) /
      bead.reviews.length
    : 0;

  // Get the most recent location
  const latestLocation = bead.ownershipHistory.length
    ? bead.ownershipHistory[bead.ownershipHistory.length - 1].location.name
    : 'Unknown';

  return (
    <div
      className="relative bg-[#1c102b] backdrop-blur-md rounded-xl overflow-hidden border border-[#3f2e6a] border-opacity-20 
                transition-all duration-300 hover:shadow-[0_0_20px_rgb(255,0,93)] cursor-pointer group"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Bead Image with rotating effect */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={bead.image}
          alt={bead.name}
          className={`w-full h-full object-cover transition-transform duration-7000 ease-in-out
                     ${isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r from-[#FF005D] to-[#00D1FF] opacity-30 transition-opacity duration-500 
                        ${isHovered ? 'opacity-50' : 'opacity-30'}`}
        ></div>

        <div
          className={`absolute inset-0 border-2 border-[#00D1FF] rounded-lg opacity-0 
                        transition-all duration-700 shadow-[0_0_20px_rgb(255,0,93)]
                        ${isHovered ? 'opacity-70 scale-95' : 'opacity-0 scale-100'}`}
        ></div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent group-hover:text-[#00D1FF] transition-colors">
            {bead.beadName}
          </h3>

         {bead.type && <span className="text-xs bg-[#00D1FF] bg-opacity-20 px-2 py-1 rounded-full text-[#8a86a0]">
            {bead.type}
          </span>} 
        </div>

        <p className="text-[#8a86a0] text-sm mb-3 line-clamp-2">
          {bead.description}
        </p>

        <div className="flex items-center justify-between text-xs text-[#8a86a0]">
          <div className="flex items-center space-x-1">
            <MapPin size={14} className="text-[#00D1FF]" />
            <span>{latestLocation}</span>
          </div>

          <div className="flex items-center space-x-1">
            <Star size={14} className="text-[#FF005D]" />
            <span>
              {averageRating ? averageRating.toFixed(1) : 'No ratings'}
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <MessageCircle size={14} className="text-[#00D1FF]" />
            <span>{bead.stories.length}</span>
          </div>

          <div className="flex items-center space-x-1">
            <History size={14} className="text-[#FF005D]" />
            <span>{bead.ownershipHistory.length}</span>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#FF005D] via-[#00D1FF] to-[#00D1FF] opacity-70 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

import React from 'react';
import { MapPin, ArrowDown } from 'lucide-react';
import { OwnershipRecord } from '@/app/types/common';
import { CORE_BACKEND_URL } from '@/helper/path';

interface OwnershipTimelineProps {
  ownershipHistory: OwnershipRecord[];
}

export const OwnershipTimeline: React.FC<OwnershipTimelineProps> = ({
  ownershipHistory,
}) => {
  const sortedHistory = [...ownershipHistory, ...ownershipHistory, ...ownershipHistory, ...ownershipHistory, ...ownershipHistory, ...ownershipHistory].sort(
    (a, b) =>
      new Date(a.acquiredAt).getTime() - new Date(b.acquiredAt).getTime(),
  );

  console.log('ownershipHistory', ownershipHistory)

  return (
    <div className="relative">
      {/* Line connecting timeline points */}
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-cosmic-glow bg-opacity-30"></div>

      {sortedHistory.map((record, index) => (
        <div key={record.id} className="relative mb-8 ml-2">
          {/* Timeline dot */}
          <div className="absolute left-3 -translate-x-1/2 top-0 w-4 h-4 rounded-full bg-[#ff005d] border-2 border-cosmic-background"></div>

          {/* Arrow connecting points */}
          {index < sortedHistory.length - 1 && (
            <div className="absolute left-3 -translate-x-1/2 top-10 flex justify-center animate-bounce">
              <ArrowDown size={16} className="text-[#ff005d] opacity-70" />
            </div>
          )}

          {/* Content */}
          <div className="ml-8 bg-cosmic-background bg-opacity-30 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-cosmic-glow mr-3">
                <img
                  src={  CORE_BACKEND_URL + record.avatar}
                  alt={record.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-medium">
                  {record.fullName}
                </h2>
                <div className="text-xs text-white/60">
                  {new Date(record.acquiredAt).toLocaleDateString()} at{' '}
                  {new Date(record.acquiredAt).toLocaleTimeString()}
                </div>
              </div>
            </div>

            <div className="flex items-center text-sm text-cosmic-text-secondary">
              <MapPin size={16} className="mr-1 text-[#ff005d]" />
              <span className="text-white/60">{`${record.location.city}, ${record.location.country}`}</span>
            </div>

            {index === 0 && (
              <div className="mt-2 text-sm text-[#00D1FF] font-medium">
                Original Owner
              </div>
            )}

            {index === sortedHistory.length - 1 && (
              <div className="mt-2 text-sm text-[#00D1FF] font-medium">
                Current Owner
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

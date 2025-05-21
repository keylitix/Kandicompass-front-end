'use client';
import React from 'react';
import { Plus, Sparkle, QrCode, Users } from 'lucide-react';
import { GradientButton } from '../custom-ui/GradientButton';
import AddThread from '../modal/AddThread';

interface WelcomeCollectorsProps {
  refetchThreads?: () => void;
  isFetchingThreads?: boolean;
}

export const WelcomeCollectors: React.FC<WelcomeCollectorsProps> = ({
  refetchThreads,
  isFetchingThreads,
}) => {
  const [openThread, setOpenThread] = React.useState(false);
  const [openQrCode, setOpenQrCode] = React.useState(false);
  const [openShare, setOpenShare] = React.useState(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-span-2 bg-[#1c102b]  rounded-xl overflow-hidden border border-[#3f2e6a] p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent mb-2">
          Welcome, Collector
        </h1>
        <p className="mb-4">
          Explore your collection and connect with other collectors.
        </p>

        <div className="flex flex-wrap gap-3">
          <GradientButton
            variant="fill"
            icon={Plus}
            onClick={() => setOpenThread(true)}
          >
            Create Thread
          </GradientButton>

          <GradientButton
            variant="outline"
            icon={QrCode}
            onClick={() => console.log('QR Shared')}
          >
            Share QR Code
          </GradientButton>
        </div>
      </div>

      <div className="bg-[#1c102b]  border border-[#3f2e6a] rounded-xl p-5">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF005D] to-[#00D1FF] flex items-center justify-center mr-3">
            <Sparkle size={20} className="text-white" />
          </div>
          <div>
            <div className="text-sm">Owned Threads</div>
            <div className="text-2xl font-bold text-[#FF005D]">5</div>
          </div>
        </div>
        <div className="text-xs">
          <span className="text-green-500">+2</span> new acquisitions in Beads
          this month
        </div>
      </div>

      <div className="bg-[#1c102b]  border border-[#3f2e6a] rounded-xl p-5">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF005D] to-[#00D1FF] flex items-center justify-center mr-3">
            <Users size={20} className="text-white" />
          </div>
          <div>
            <div className="text-sm ">Active Threads</div>
            <div className="text-2xl font-bold text-[#00D1FF]">2</div>
          </div>
        </div>
        <div className="text-xs">
          <span className="text-green-500">8</span> members across all threads
        </div>
      </div>
      <AddThread
        isOpen={openThread}
        onClose={() => setOpenThread(false)}
        refetchThreads={refetchThreads}
        isFetchingThreads={isFetchingThreads}
      />
    </div>
  );
};

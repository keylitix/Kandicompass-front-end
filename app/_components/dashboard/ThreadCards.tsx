'use client';
import React from 'react';
import { Users, Sparkles, QrCode } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ViewQrCodeModal from '../modal/view-qr-code';
import { Thread } from '@/app/types/common';

interface ThreadCardProps {
  thread: Thread;
}

export const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
  const [openQrCode, setOpenQrCode] = React.useState(false);
  const [qrCode, setQrCode] = React.useState<{
    qrCode: string | null;
    name: string;
  }>({ qrCode: null, name: '' });
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('svg')) {
      return;
    }
    if (thread && thread?._id) {
      router.push(`/dashboard/thread/${thread._id}`);
    }
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      className="bg-[#1c102b] rounded-xl overflow-hidden border border-[#3f2e6a] border-opacity-70
                 transition-all duration-500 hover:shadow-[0_0_20px_rgb(255,0,93)] hover:border-opacity-100
                 group cursor-pointer relative"
    >
      <div className="relative p-5">
        <div className="flex justify-between items-start mb-4">
          <h3
            className="text-lg font-semibold bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent
                         group-hover:brightness-125 transition-all"
          >
            {thread?.threadName}
          </h3>
          <div className="flex items-center space-x-2 text-[#8a86a0] text-sm">
            <Users size={16} className="text-[#00D1FF]" />
            <span>{thread?.members.length}</span>
          </div>
        </div>

        <p className="text-[#8a86a0] text-sm mb-5 line-clamp-2">
          {thread.description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <Sparkles size={16} className="text-[#FF005D]" />
            <span className="text-sm font-medium text-white">
              {thread.beads.length} Beads
            </span>
          </div>

          <button
            className="bg-[#1c102b] bg-opacity-50 p-1.5 rounded-lg text-white 
       hover:bg-gradient-to-r hover:from-[#FF005D] hover:to-[#00D1FF] hover:text-white
       transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setQrCode({ qrCode: thread.qrCode, name: thread.threadName });
              setOpenQrCode(true);
            }}
            aria-label="Show QR code"
          >
            <QrCode size={18} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1c102b] to-transparent pointer-events-none"></div>
      </div>

      <div className="flex justify-start p-4 space-x-2 overflow-x-auto scrollbar-none">
        {thread.beads.length > 0 ? (
          thread.beads.map((bead) => (
            <div
              key={bead.id}
              className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border border-[#FF005D] border-opacity-60"
            >
              <img
                src={bead.image}
                alt={bead.name || 'Bead image'}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))
        ) : (
          <div className="text-[#8a86a0] text-xs italic">No beads yet</div>
        )}
      </div>

      <div
        className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#FF005D] via-[#00D1FF] to-[#00FFE7]
                      opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none"
      ></div>

      <ViewQrCodeModal
        isOpen={openQrCode}
        onClose={() => setOpenQrCode(false)}
        qrURL={qrCode.qrCode ?? ''}
        title={qrCode.name}
      />
    </div>
  );
};

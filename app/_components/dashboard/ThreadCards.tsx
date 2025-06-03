'use client';
import React from 'react';
import {
  Users,
  Sparkles,
  QrCode,
  Pencil,
  Trash,
  Globe,
  Lock,
  Globe2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import ViewQrCodeModal from '../modal/view-qr-code';
import { Thread } from '@/app/types/common';
import { useAppSelector } from '@/app/hook/useReduxApp';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useDeleteThreadMutation } from '@/redux/api/thredApi';
import { toast } from 'sonner';
import { CORE_BACKEND_URL } from '@/helper/path';
import { DEFAULT_PROFILE_PICTURE } from '@/lib/variables';

interface ThreadCardProps {
  thread: Thread;
  refetchThreads?: () => void;
  isFetchingThreads?: boolean;
}

export const ThreadCard: React.FC<ThreadCardProps> = ({
  thread,
  refetchThreads,
  isFetchingThreads,
}) => {
  const [deleteThread, { isLoading: isDeletingThread }] =
    useDeleteThreadMutation();
  const [openQrCode, setOpenQrCode] = React.useState(false);
  const [qrCode, setQrCode] = React.useState<{
    qrCode: string | null;
    name: string;
  }>({ qrCode: null, name: '' });
  const router = useRouter();
  const shouldIgnoreNextClick = React.useRef(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const isOwner = thread?.ownerId === user?.id;
  const handleCardClick = (e: React.MouseEvent) => {
    if (shouldIgnoreNextClick.current) {
      return;
    }
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('svg')) {
      return;
    }

    if (thread && thread?._id && shouldIgnoreNextClick.current === false) {
      router.push(`/dashboard/thread/${thread._id}`);
    }
  };
  console.log('refetchThreads, isFetchingThreads', thread);

  const handleDeleteThread = async (id: string) => {
    shouldIgnoreNextClick.current = true;
    const res = await deleteThread(id).unwrap();
    if (res?.isSuccess) {
      refetchThreads && refetchThreads();
      if (isFetchingThreads) {
        toast.success('Thread deleted successfully!');
        setOpenDeleteModal(false);
      }
    }
  };

  return (
    <div
      tabIndex={0}
      onClick={handleCardClick}
      className="relative bg-[#1c102b] rounded-xl overflow-hidden border border-[#3f2e6a] border-opacity-70
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
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2 text-[#8a86a0] text-sm">
              {thread?.visibility === 'Public' ? (
                <>
                  <Globe2 className="text-[#00D1FF]" size={16} />
                  <span>Public</span>
                </>
              ) : (
                <>
                  <Lock className="text-[#00D1FF]" size={16} />
                  <span>Private</span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2 text-[#8a86a0] text-sm">
              <Users size={16} className="text-[#00D1FF]" />
              <span>{thread?.members.length}</span>
            </div>
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
                src={
                  bead.image
                    ? CORE_BACKEND_URL + bead.image
                    : DEFAULT_PROFILE_PICTURE
                }
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

      {isOwner && (
        <div className="absolute bottom-0 right-0 w-full flex items-center justify-end p-4 gap-2">
          <button
            onClick={() => {
              shouldIgnoreNextClick.current = true;
            }}
            disabled
            className="bg-[#FF005D]/50 hover:bg-[#FF005D]/80 cursor-pointer w-7 h-7 flex items-center justify-center rounded-full text-white"
          >
            <Pencil size={12} />
          </button>

          <button
            onClick={() => {
              setOpenDeleteModal(true), (shouldIgnoreNextClick.current = true);
            }}
            className="bg-[#FF005D]/50 hover:bg-[#FF005D]/80  cursor-pointer w-7 h-7 flex items-center justify-center rounded-full text-white"
          >
            <Trash size={12} />
          </button>
        </div>
      )}

      <AlertDialog open={openDeleteModal}>
        <AlertDialogContent className="bg-[#1c102b] border border-[#3f2e6a] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              thread.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setOpenDeleteModal(false)}
              className="text-[#8a86a0] hover:text-[#FF005D] outline-none focus:outline-none border-0 focus:ring-0"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteThread(thread._id)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeletingThread ? 'Deleting...' : ' Yes, delete it'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ViewQrCodeModal
        isOpen={openQrCode}
        onClose={() => {
          setOpenQrCode(false), (shouldIgnoreNextClick.current = false);
        }}
        qrURL={qrCode.qrCode ?? ''}
        title={qrCode.name ?? ''}
      />
    </div>
  );
};

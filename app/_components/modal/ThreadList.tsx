'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CORE_BACKEND_URL } from '@/helper/path';
import Image from 'next/image';
import { GradientButton } from '../custom-ui/GradientButton';
import { QrCode, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ThreadsListProps {
  isOpen: boolean;
  onClose: () => void;
  threads: any[];
  setOpenQrCode?: (open: boolean) => void;
  setQrCode?: (qrCode: { qrCode: string | null; name: string }) => void;
}

const ThreadsList: React.FC<ThreadsListProps> = ({
  isOpen,
  onClose,
  threads,
  setOpenQrCode,
  setQrCode,
}) => {
  const router = useRouter();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="max-w-lg md:max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-2xl font-bold">Threads You're a Member Of</h2>
            <p className="text-sm text-gray-400 mt-1">
              Select a thread to share or view its QR code.
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-5 max-h-[60vh] overflow-y-auto pr-2">
          {threads.length > 0 ? (
            threads.map((thread) => (
              <div
                key={thread._id}
                className="p-4 rounded-xl shadow-sm border border-[#3f2e6a] transition"
              >
                <h4 className="text-base font-semibold text-white truncate">
                  {thread.threadName}
                </h4>
                <p className="text-xs text-[#b0acc3] mt-1 truncate max-w-full">
                  {thread.description}
                </p>

                {thread.qrCode ? (
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <Image
                      src={CORE_BACKEND_URL + thread.qrCode}
                      alt={`${thread.threadName} QR Code`}
                      width={80}
                      height={80}
                      className="rounded border border-gray-700 shrink-0"
                    />

                    <div className="flex flex-wrap justify-start sm:justify-end gap-2">
                      <GradientButton
                        variant="outline"
                        icon={Share2}
                        onClick={() =>
                          router.push(
                            `/social-share/thread/${thread._id}?from=${encodeURIComponent(window.location.href)}`,
                          )
                        }
                      >
                        Share QR Code
                      </GradientButton>
                      <GradientButton
                        variant="outline"
                        icon={QrCode}
                        onClick={() => {
                          if (setOpenQrCode && setQrCode) {
                            setQrCode({
                              qrCode: thread.qrCode,
                              name: thread.threadName,
                            });
                            setOpenQrCode(true);
                          }
                        }}
                      >
                        View QR Code
                      </GradientButton>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic mt-3">
                    QR code not available.
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-[#8a86a0] italic">
              You are not a member of any threads yet.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThreadsList;

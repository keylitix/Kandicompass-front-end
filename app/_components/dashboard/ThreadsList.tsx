'use client';

import { useGetAllThreadsQuery } from '@/redux/api/thredApi';
import Image from 'next/image';
import { MessageSquareText } from 'lucide-react';
import threadURL from '@/public/thred.svg';
import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import Skeleton from 'react-loading-skeleton';
import ViewQrCodeModal from '../modal/view-qr-code';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';
import { CORE_BACKEND_URL } from '@/helper/path';
import { DEFAULT_IMAGE } from '@/lib/variables';

export default function ThreadsList() {
  const router = useRouter();

  const [threads, setThreads] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState<any>(null);

  const { ref, inView } = useInView();

  const {
    data: tData,
    isLoading,
    isError,
    isFetching,
  } = useGetAllThreadsQuery(
    { page_number: page, page_size: 10 },
    { skip: !hasMore },
  );

  const threadsResponse = tData?.data ?? [];

  // Handle new data
  useEffect(() => {
    if (threadsResponse.length > 0) {
      setThreads((prev) => {
        const seen = new Set(prev.map((t) => t._id));
        const newThreads = threadsResponse.filter((t: any) => !seen.has(t._id));
        return [...prev, ...newThreads];
      });
      setLoadingMore(false);
    } else if (!isFetching) {
      setHasMore(false);
      setLoadingMore(false);
    }
  }, [tData, isFetching]);

  // Load more when scrolled to bottom
  useEffect(() => {
    if (inView && !isLoading && !isFetching && hasMore && !loadingMore) {
      loadMore();
    }
  }, [inView, isLoading, isFetching, hasMore, loadingMore]);

  const loadMore = useCallback(
    debounce(() => {
      setLoadingMore(true);
      setPage((prev) => prev + 1);
    }, 300),
    [],
  );

  const handleQrCodeClick = (thread: any) => {
    setSelectedThread(thread);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedThread(null);
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white/7 h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] rounded-md overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-white text-lg font-medium">Logged Threads</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                enableAnimation
                baseColor="#ffffff20"
                highlightColor="#ffffff30"
                className="bg-white/10 animate-pulse h-14 rounded-md"
              />
            ))}

          {isError && (
            <div className="flex flex-col items-center justify-center h-full text-white/70 p-4 text-center">
              <p>Failed to load threads</p>
              <button
                onClick={() => setPage(1)}
                className="mt-2 px-4 py-2 bg-white/10 rounded-md hover:bg-white/20 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {!isLoading && !isError && threads.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-white/70 p-4 text-center">
              <MessageSquareText className="w-12 h-12 mb-2 opacity-50" />
              <p className="text-lg font-medium">No threads yet</p>
              <p className="text-sm">Start a conversation or join a thread</p>
            </div>
          )}

          {threads.map((thread) => (
            <div
              key={thread._id}
              className="bg-white/10 rounded-md p-3 flex justify-between hover:bg-white/15 transition-colors cursor-pointer"
              onClick={() =>
                !isModalOpen && router.push(`/dashboard/charms/thred-charm`)
              }
            >
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 relative bg-white/12 rounded-md flex-shrink-0 overflow-hidden">
                  <Image
                    src={
                      thread.avatar
                        ? `${CORE_BACKEND_URL}${thread.avatar}`
                        : threadURL.src
                    }
                    fill
                    alt={`${thread.threadName} image`}
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-md text-white font-medium truncate">
                    {thread.threadName || 'Unnamed Thread'}
                  </span>
                  <span className="text-xs text-white/60 truncate">
                    {thread.totalMember || 'No member yet'}
                  </span>
                </div>
              </div>

              {thread.qrCode && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="w-10 h-10 relative bg-white rounded-md flex-shrink-0 overflow-hidden">
                        <Image
                          src={
                            thread.qrCode
                              ? `${CORE_BACKEND_URL}${thread.qrCode}`
                              : ''
                          }
                          fill
                          alt="QR Code"
                          className="object-cover rounded-md"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQrCodeClick(thread);
                          }}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to see QR Code</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          ))}

          {loadingMore && (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={i}
                  enableAnimation
                  baseColor="#ffffff20"
                  highlightColor="#ffffff30"
                  className="bg-white/10 animate-pulse h-14 rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        <div ref={ref} className="h-10" />
      </div>

      {selectedThread && (
        <ViewQrCodeModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedThread?.threadName}
          qrURL={selectedThread?.qrCode}
        />
      )}
    </div>
  );
}

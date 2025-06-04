'use client';
import React from 'react';
import { ThreadCard } from './ThreadCards';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AddThread from '../modal/AddThread';
import Link from 'next/link';

interface YourThreadsProps {
  threads: any;
  refetchThreads: () => void;
  isFetchingThreads: boolean;
  memberThreads: any;
  isLoadingMembersThreads: boolean;
  isFetchingMembersThreads: boolean;
}

export const YourThreads: React.FC<YourThreadsProps> = ({
  threads,
  refetchThreads,
  isFetchingThreads,
  memberThreads,
  isLoadingMembersThreads,
  isFetchingMembersThreads,
}) => {
  const router = useRouter();
  const [openThread, setOpenThread] = React.useState(false);
  const ownedThreads = threads ?? [];
  const joinedThreads = memberThreads ?? [];

  const [editData, setEditData] = React.useState<any>({});
  return (
    <section>
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent">
          Your Threads
        </h2>
        <Link
          href="/dashboard/thread"
          className="text-sm text-[#FF005D] hover:text-[#00D1FF] transition-colors"
          type="button"
        >
          View All
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {ownedThreads &&
          ownedThreads
            .slice(0, 2)
            .map((thread: any) => (
              <ThreadCard
                key={thread._id}
                thread={thread}
                refetchThreads={refetchThreads}
                isFetchingThreads={isFetchingThreads}
                setEditData={setEditData}
                setOpenThread={setOpenThread}
              />
            ))}

        <div
          role="button"
          tabIndex={0}
          className="bg-[#1c102b] rounded-xl border-2 border-dashed border-[#3f2e6a] border-opacity-60
                     p-6 flex flex-col items-center justify-center min-h-[200px]
                     cursor-pointer transition-colors hover:border-gradient-to-r hover:from-[#FF005D] hover:to-[#00D1FF]"
          onClick={() => setOpenThread(true)}
        >
          <div className="w-14 h-14 rounded-full bg-[#1c102b] bg-opacity-50 flex items-center justify-center mb-4">
            <Plus
              size={24}
              className="text-gradient"
              style={{ color: '#00D1FF' }}
            />
          </div>
          <h3 className="text-lg font-semibold bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent mb-1">
            Create New Thread
          </h3>
          <p className="text-[#8a86a0] text-sm text-center">
            Start a new collection for your cosmic artifacts
          </p>
        </div>
      </div>

      {joinedThreads && joinedThreads.length > 0 && (
        <>
          <header className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent">
              Joined Threads
            </h2>
            {joinedThreads.length > 3 && (
              <Link
                href="/dashboard/thread"
                className="text-sm text-[#FF005D] hover:text-[#00D1FF] transition-colors"
                type="button"
              >
                View All
              </Link>
            )}
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedThreads.slice(0, 3).map((thread: any) => (
              <ThreadCard
                key={thread.id}
                thread={thread}
                refetchThreads={refetchThreads}
                isFetchingThreads={isFetchingThreads}
                setEditData={setEditData}
                setOpenThread={setOpenThread}
              />
            ))}
          </div>
        </>
      )}
      <AddThread
        isOpen={openThread}
        onClose={() => setOpenThread(false)}
        refetchThreads={refetchThreads}
        isFetchingThreads={isFetchingThreads}
        editData={editData}
      />
    </section>
  );
};

'use client';
import { Metadata } from 'next';
import { META } from '@/lib/meta';
import PostHandler from '@/app/_components/dashboard/PostHandler';
import ThreadsList from '@/app/_components/dashboard/ThreadsList';
import LoggedThread from './_thred/page';
import Link from 'next/link';
import { WelcomeCollectors } from '@/app/_components/dashboard/WelcomeCollectors';
import { RecentActivity } from '@/app/_components/dashboard/RecentActivity';
import { YourThreads } from '@/app/_components/dashboard/YourThreads';
import {
  useGetAllThreadsQuery,
  useGetThreadsByMemberQuery,
  useGetThreadsByOwnerQuery,
} from '@/redux/api/thredApi';
import { useAppSelector } from '@/app/hook/useReduxApp';

// export const metadata: Metadata = META.HOME;

const DashboardPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const {
    data: threads,
    isLoading: isLoadingThreads,
    refetch: refetchThreads,
    isFetching: isFetchingThreads,
  } = useGetThreadsByOwnerQuery(
    { id: user?.id ?? '', page_number: 1, page_size: 10 },
    { refetchOnMountOrArgChange: true },
  );
  const {
    data: memberThreads,
    isLoading: isLoadingMembersThreads,
    isFetching: isFetchingMembersThreads,
  } = useGetThreadsByMemberQuery(
    { id: user?.id ?? '', page_number: 1, page_size: 10 },
    { refetchOnMountOrArgChange: true },
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-8">
        <WelcomeCollectors
          refetchThreads={refetchThreads}
          isFetchingThreads={isFetchingThreads}
          ownedThreads={threads?.data?.length ?? 0}
        />
        <RecentActivity />
        <YourThreads
          threads={threads?.data}
          refetchThreads={refetchThreads}
          isFetchingThreads={isFetchingThreads}
          memberThreads={memberThreads?.data}
          isLoadingMembersThreads={isLoadingMembersThreads}
          isFetchingMembersThreads={isFetchingMembersThreads}
        />
        <div></div>
      </div>
      {/* <div className="flex justify-end mb-4">
                <Link href="/dashboard/charms/charms-upload" className="border px-6 py-2">UPLOAD</Link>
            </div> */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/5 order-2 lg:order-1">
          {/* <PostHandler /> */}
        </div>

        <div className="w-full lg:w-2/5 order-1 lg:order-2 lg:sticky lg:top-0 lg:self-start">
          <ThreadsList />
        </div>

        {/* <LoggedThread /> */}
      </div>
    </div>
  );
};

export default DashboardPage;

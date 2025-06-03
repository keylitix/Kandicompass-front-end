'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '@/app/hook/useReduxApp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useGetThreadsByMemberQuery,
  useGetThreadsByOwnerQuery,
} from '@/redux/api/thredApi';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ThreadCard } from '@/app/_components/dashboard/ThreadCards';
import { Plus } from 'lucide-react';
import AddThread from '@/app/_components/modal/AddThread';
import { GradientButton } from '@/app/_components/custom-ui/GradientButton';

const ThreadsPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<'my' | 'joined'>('my');
  const [openThread, setOpenThread] = useState(false);

  const [ownerPage, setOwnerPage] = useState(1);
  const [joinedPage, setJoinedPage] = useState(1);

  const [ownedThreads, setOwnedThreads] = useState<any[]>([]);
  const [joinedThreads, setJoinedThreads] = useState<any[]>([]);

  const {
    data: threadsData,
    isLoading: isLoadingThreads,
    isFetching: isFetchingThreads,
    refetch: refetchThreads,
  } = useGetThreadsByOwnerQuery(
    { id: user?.id ?? '', page_number: ownerPage, page_size: 10 },
    { refetchOnMountOrArgChange: true },
  );

  const {
    data: memberThreadsData,
    isLoading: isLoadingMembersThreads,
    isFetching: isFetchingMembersThreads,
  } = useGetThreadsByMemberQuery(
    { id: user?.id ?? '', page_number: joinedPage, page_size: 10 },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    if (threadsData?.data) {
      if (ownerPage === 1) {
        setOwnedThreads(threadsData.data);
      } else {
        setOwnedThreads((prev) => [...prev, ...threadsData.data]);
      }
    }
  }, [threadsData, ownerPage]);

  useEffect(() => {
    if (memberThreadsData?.data) {
      if (joinedPage === 1) {
        setJoinedThreads(memberThreadsData.data);
      } else {
        setJoinedThreads((prev) => [...prev, ...memberThreadsData.data]);
      }
    }
  }, [memberThreadsData, joinedPage]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (activeTab === 'my') {
            if (threadsData?.data.length === 10) {
              setOwnerPage((prev) => prev + 1);
            }
          } else {
            if (memberThreadsData?.data.length === 10) {
              setJoinedPage((prev) => prev + 1);
            }
          }
        }
      },
      { threshold: 1.0 },
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, [activeTab, threadsData, memberThreadsData]);

  useEffect(() => {
    if (activeTab === 'my') {
      setOwnerPage(1);
      setOwnedThreads([]);
    } else {
      setJoinedPage(1);
      setJoinedThreads([]);
    }
  }, [activeTab]);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">
          Welcome to Your Threads
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm">
          Here you can manage the threads you've created or joined. Threads help
          you organize discussions, projects, or communities.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Featured Threads</h2>
        <p className="text-gray-400 text-sm">
          These are some of your most active or recently created threads.
        </p>

        {ownedThreads.length > 0 ? (
          <Carousel className="w-full">
            <CarouselContent className="gap-4">
              {ownedThreads.slice(0, 5).map((thread: any) => (
                <CarouselItem key={thread.id} className="basis-full">
                  <ThreadCard thread={thread} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <p className="text-gray-400 italic">
            No featured threads available. Start by creating your first thread!
          </p>
        )}
      </div>

      <Tabs
        defaultValue="my"
        onValueChange={(value) => setActiveTab(value as 'my' | 'joined')}
        className="w-full"
      >
        <div className="flex justify-between items-center flex-wrap gap-4">
          <TabsList className="bg-[#1c102b] text-white flex gap-2 px-2 h-12 rounded-lg overflow-x-auto">
            <TabsTrigger
              value="my"
              className="
                px-4 py-2 rounded-lg font-semibold text-sm transition
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF005D] data-[state=active]:to-[#00D1FF]
                data-[state=active]:text-white
                data-[state=inactive]:border data-[state=inactive]:border-[#FF005D] data-[state=inactive]:text-white
              "
            >
              My Threads
            </TabsTrigger>
            <TabsTrigger
              value="joined"
              className="
                px-4 py-2 rounded-lg font-semibold text-sm transition
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF005D] data-[state=active]:to-[#00D1FF]
                data-[state=active]:text-white
                data-[state=inactive]:border data-[state=inactive]:border-[#00D1FF] data-[state=inactive]:text-white
              "
            >
              Joined Threads
            </TabsTrigger>
          </TabsList>

          {activeTab === 'my' && (
            <GradientButton
              variant="fill"
              icon={Plus}
              onClick={() => setOpenThread(true)}
            >
              Create Thread
            </GradientButton>
          )}
        </div>

        <TabsContent
          value="my"
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {ownedThreads.length > 0 ? (
            ownedThreads.map((thread: any) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              You haven’t created any threads yet. Click "Create Thread" to get
              started and invite others.
            </p>
          )}
          <div ref={bottomRef} className="col-span-full h-10" />
        </TabsContent>

        <TabsContent
          value="joined"
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {joinedThreads.length > 0 ? (
            joinedThreads.map((thread: any) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              You haven’t joined any threads yet. Ask a thread owner to invite
              you.
            </p>
          )}
          <div ref={bottomRef} className="col-span-full h-10" />
        </TabsContent>
      </Tabs>

      <AddThread
        isOpen={openThread}
        onClose={() => setOpenThread(false)}
        refetchThreads={refetchThreads}
        isFetchingThreads={isFetchingThreads}
      />
    </div>
  );
};

export default ThreadsPage;

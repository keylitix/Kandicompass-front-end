'use client';

import React from 'react';
import { useAppSelector } from '@/app/hook/useReduxApp';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useGetThreadsByMemberQuery, useGetThreadsByOwnerQuery } from '@/redux/api/thredApi';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ThreadCard } from '@/app/_components/dashboard/ThreadCards';


const ThreadsPage = () => {
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

  const ownedThreads = threads?.data ?? [];
  const joinedThreads = memberThreads?.data ?? [];

  return (
    <div className="p-4 space-y-8">
      {/* 🪐 Carousel */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Featured Threads</h2>
        <Carousel>
          <CarouselContent>
            {ownedThreads.slice(0, 3).map((thread: any) => (
              <CarouselItem key={thread.id} className="md:basis-1/1 lg:basis-1/1">
                <ThreadCard thread={thread} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* 🧵 Tabs */}
      <Tabs defaultValue="my" className="w-full">
        <TabsList className="bg-[#1c102b] text-white">
          <TabsTrigger value="my">My Threads</TabsTrigger>
          <TabsTrigger value="joined">Joined Threads</TabsTrigger>
        </TabsList>

        <TabsContent value="my" className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ownedThreads.map((thread: any) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </TabsContent>

        <TabsContent value="joined" className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {joinedThreads.map((thread: any) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThreadsPage;

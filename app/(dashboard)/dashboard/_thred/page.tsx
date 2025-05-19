'use client';
import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useGetAllThreadsQuery } from '@/redux/api/thredApi';
import thred from "@/public/thred.svg";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

import { useRouter } from 'next/navigation';


// 👇 Dynamically import GlobeDisplay and disable SSR
const GlobeDisplay = dynamic(() => import('@/components/GlobeDisplay'), {
  ssr: false,
});

export default function LoggedThread() {
  const [openThread, setOpenThread] = useState<any>(null);
  const [visibleThread, setVisibleThread] = useState(3);
  const router = useRouter();

  const {
    data: getAllThreaddata,
    isLoading: getAllThreadloading,
  } = useGetAllThreadsQuery({ page_number: 1, page_size: 10 });

  // Function to handle scanning and notifying admin
  const handleScan = async (threadId: string) => {
    const response = await fetch('/api/scan-thread', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ threadId, status: 'pending' }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Your request has been sent to the admin for approval!');
    } else {
      alert('There was an error.');
    }
  };

  return (
    <div id='thred-screen' className="min-h-screen  text-white pb-6">
      {/* <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
          <GlobeDisplay />
        </div>
        <div className="bg-[#1c0a38] p-4 rounded-lg text-sm shadow-md">
          <p>Total Miles Travelled: <span className="text-pink-500">112 mi</span></p>
          <p>Number of Handshifts: <span className="text-pink-500">18</span></p>
          <p>Average Time per Handsh: <span className="text-pink-500">1.8 hr</span></p>
        </div>
      </div> */}

      <div className="text-center mt-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className="text-white">Your </span>
          <span className="text-pink-500">Logged </span>
          <span className="text-cyan-400">Thread</span>
        </h2>
        <p className="mt-2 text-gray-300 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
        {getAllThreaddata?.data.slice(0, visibleThread).map((thread: any) => (
          <Card key={thread._id} className="bg-[#1c0a38] border border-[#2d1d52] text-center">
            <CardContent className="flex flex-col items-center p-6 space-y-4">
              <Image src={thred} alt="Thread Icon" className="w-50" />
              <h3 className="text-xl font-semibold text-white">{thread.threadName}</h3>

              <div className='flex gap-4'>
                <Button
                  onClick={() => router.push('/dashboard/thread')}
                  className="bg-gradient-to-r from-pink-500 to-cyan-400 text-white px-4 py-2 rounded-full shadow-md hover:opacity-90"
                >
                  VIEW THREAD
                </Button>
                <Button
                  onClick={() => setOpenThread(thread)}
                  className="bg-gradient-to-r from-pink-500 to-cyan-400 text-white px-4 py-2 rounded-full shadow-md hover:opacity-90"
                >
                  Scan QR
                </Button>
              </div>
              {thread.status === 'pending' && (
                <Button
                  onClick={() => handleScan(thread._id)}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-full shadow-md mt-4"
                >
                  REQUEST APPROVAL
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Dialog
        open={!!openThread}
        onOpenChange={() => setOpenThread(null)}
      >
        <DialogContent className="rounded-3xl text-white">
          {openThread && (
            <>
              <DialogHeader>
                <DialogTitle>{openThread.threadName}</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center space-y-4">
                <Image
                  src={`https://kandi-backend.cradle.services/${openThread.qrCode}`}
                  alt="QR Code"
                  width={250}
                  height={250}
                  className="object-contain"
                />
                <p className="text-black text-xl font-semibold text-center">
                  {openThread.status === 'pending'
                    ? 'This thread is pending approval by admin. Please wait for approval.'
                    : 'Scan the QR code to become a part of our community'}
                </p>
              </div>
              <DialogFooter>
                <Button
                  className="mt-4 bg-gradient-to-r from-pink-500 to-cyan-400 text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 cursor-pointer"
                  onClick={() => setOpenThread(null)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="text-center mt-10">
        <Button
          onClick={() => {
            setVisibleThread(visibleThread >= getAllThreaddata.data.length ? 3 : getAllThreaddata.data.length);
          }}
          className="border border-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 hover:text-white"
        >
          {visibleThread >= getAllThreaddata?.data?.length ? "VIEW LESS" : "VIEW ALL"}
        </Button>
      </div>
    </div>
  );
}

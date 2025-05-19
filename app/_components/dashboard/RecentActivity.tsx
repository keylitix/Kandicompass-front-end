'use client';
import React from 'react';
import Image from 'next/image';
import userImg from '@/public/User.svg';

export const RecentActivity: React.FC = () => {
    return (
        <div className="bg-[#1c102b]  border border-[#3f2e6a] rounded-xl p-6">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent mb-4">
                Recent Activity
            </h2>

            <div className="space-y-4">
                {[1, 2, 3].map((_, idx) => (
                    <div key={idx} className="flex items-center bg-white/5 rounded-lg p-3">
                        <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-r from-[#FF005D] to-[#00D1FF] mr-3">
                            <Image
                                src={userImg}
                                alt="User"
                                width={36}
                                height={36}
                                className="rounded-full object-cover w-full h-full"
                            />
                        </div>

                        <div>
                            <div className="">
                                <span className="font-semibold text-[#00D1FF]">Zephyr Nova</span>{' '}
                                {idx === 0
                                    ? 'acquired'
                                    : idx === 1
                                        ? 'shared a story about'
                                        : 'created the thread'}{' '}
                                <span className="text-[#FF005D] font-medium">
                                    {idx === 0
                                        ? 'Quantum Diamond'
                                        : idx === 1
                                            ? 'Celestial Amethyst'
                                            : 'Galactic Treasures'}
                                </span>
                            </div>
                            <div className="text-xs text-gray-500">
                                {idx === 0 ? '2 days ago' : idx === 1 ? '3 days ago' : '1 week ago'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

'use client';

import Image from 'next/image';
import avatar from '@/public/User.svg';

const users = [
  'John Wick',
  'Vickie',
  'John Wick',
  'John Wick',
  'Vickie',
  'John Wick',
  'Vickie',
  'Alice',
  'Bob',
  'Charlie',
  'Diana',
  'Eve',
];

const RightSection = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-white">Logged Users</h3>

      <div className="bg-[#1c102b] p-4 rounded-md border border-[#3f2e6a]">
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {users.map((user, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-[#2a1c40] p-3 rounded-lg hover:bg-[#3e2c58] transition-colors"
            >
              <Image
                src={avatar}
                alt="User Avatar"
                width={50}
                height={50}
                className="border border-zinc-300/20 bg-zinc-500 p-3 rounded-full"
              />
              <span className="text-sm text-white">{user}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSection;

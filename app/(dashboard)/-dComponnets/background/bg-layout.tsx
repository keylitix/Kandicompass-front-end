import React, { ReactNode } from 'react';
import Image from 'next/image';

interface DecorativeBackgroundProps {
  children: ReactNode;
  title?: string;
}

export default function BgLayout({
  children,
  title = 'About Us',
}: DecorativeBackgroundProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-purple-950 to-purple-900">
      {/* Sparkling lines - left side */}
      <div className="absolute left-0 top-1/4 w-24 h-24 opacity-70">
        <Image
          src="/sparkle-left.svg"
          alt="Decorative sparkle"
          width={100}
          height={100}
          className="w-full h-full"
        />
      </div>

      {/* Sparkling lines - right side */}
      <div className="absolute right-0 top-1/3 w-24 h-24 opacity-70">
        <Image
          src="/sparkle-right.svg"
          alt="Decorative sparkle"
          width={100}
          height={100}
          className="w-full h-full"
        />
      </div>

      {/* Additional sparkles */}
      <div className="absolute left-4 bottom-1/4 w-16 h-16 opacity-50">
        <Image
          src="/sparkle-left.svg"
          alt="Decorative sparkle"
          width={80}
          height={80}
          className="w-full h-full"
        />
      </div>

      <div className="absolute right-8 bottom-1/3 w-16 h-16 opacity-50">
        <Image
          src="/sparkle-right.svg"
          alt="Decorative sparkle"
          width={80}
          height={80}
          className="w-full h-full"
        />
      </div>

      {/* Bangles at the top */}
      <div className="relative w-full flex justify-center pt-8 pb-12">
        <div className="relative w-[300px] h-[120px]">
          <Image
            src="/bangles.svg"
            alt="Decorative bangles"
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1
              className="text-3xl font-bold"
              style={{
                background: 'linear-gradient(90deg, #ff3366 0%, #33ccff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow:
                  '0 0 10px rgba(255, 51, 102, 0.5), 0 0 20px rgba(51, 204, 255, 0.3)',
              }}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 pb-12">
        <div className="bg-opacity-20 bg-black backdrop-blur-sm rounded-lg p-6 md:p-8 text-white shadow-xl border border-purple-800/30">
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 pb-6 text-center text-xs text-purple-300">
        <div className="flex justify-center space-x-4 mb-2">
          <span>Privacy Policy</span>
          <span>|</span>
          <span>Contact Us</span>
        </div>
        <div>
          Copyright © {new Date().getFullYear()} | Powered by Your Brand
        </div>
      </div>
    </div>
  );
}

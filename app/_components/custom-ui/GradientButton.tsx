'use client';

import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

type GradientButtonProps = {
  variant?: 'fill' | 'outline';
  icon?: LucideIcon;
  href?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const GradientButton: React.FC<GradientButtonProps> = ({
  variant = 'fill',
  icon: Icon,
  href,
  children,
  className = '',
  ...props
}) => {
  const content = (
    <button
      {...props}
      className={`flex items-center font-semibold transition-all cursor-pointer
        ${variant === 'fill'
          ? 'border border-transparent bg-gradient-to-r from-[#FF005D] to-[#00D1FF] text-white px-4 py-2 rounded-lg hover:opacity-90'
          : 'p-[2px] bg-gradient-to-r from-[#FF005D] to-[#00D1FF] rounded-lg'}
        ${className}`}
    >
      {variant === 'outline' ? (
        <div className="flex items-center bg-[#1c102b] text-white px-4 py-2 rounded-md hover:opacity-90 transition-all font-semibold">
          {Icon && <Icon size={18} className="mr-2" />}
          {children}
        </div>
      ) : (
        <>
          {Icon && <Icon size={18} className="mr-2" />}
          {children}
        </>
      )}
    </button>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};

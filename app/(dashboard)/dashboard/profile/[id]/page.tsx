'use client';
import React, { useEffect, useState } from 'react';
import { mockUsers } from '@/app/data/mockdata';
import { useParams } from 'next/navigation';
import { UserProfile } from '@/app/_components/user/UserProfile';
import { useAppSelector } from '@/app/hook/useReduxApp';
import { useGetUserByIdQuery } from '@/redux/api/userApi';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data,
    isLoading: isLoadingUser,
    refetch: refetchUser,
    isFetching: isFetchingUser,
  } = useGetUserByIdQuery({ id: id });
  const userData = data?.data?.[0] || null;

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-slow text-cosmic-glow">
          <div className="w-16 h-16 border-4 border-cosmic-glow border-t-transparent rounded-full animate-rotate-slow"></div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-cosmic-card backdrop-blur-md rounded-xl overflow-hidden border border-cosmic-glow border-opacity-20 p-8 text-center">
        <h2 className="text-xl font-semibold text-cosmic-accent mb-2">
          User Not Found
        </h2>
        <p className="text-cosmic-text-secondary mb-4">
          The user you're looking for does not exist or has transcended to
          another plane.
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-cosmic-accent text-white px-4 py-2 rounded-lg hover:bg-cosmic-glow transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return <UserProfile user={userData as any} />;
};

export default ProfilePage;

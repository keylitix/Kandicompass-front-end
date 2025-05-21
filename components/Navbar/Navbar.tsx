import { useLoginUserMutation } from '@/redux/api/userApi';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { User2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store/store';
import { logout } from '@/redux/slice/UserSlice';

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="w-full h-[74px] bg-[#170F24] shadow-sm flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10">
      <Link
        href={'/sign-in'}
        className="text-white text-sm sm:text-base md:text-sm font-medium hover:opacity-80 transition-opacity border-2"
      >
        SHOP NOW
      </Link>
      {user && user.token ? (
        <>
          <div className="bg-red">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full ">
                  <User2 />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button
                    variant={'outline'}
                    className="w-full"
                    onClick={() => {
                      localStorage.removeItem('user');
                      toast.success('Logged out successfully!');
                      dispatch(logout());
                    }}
                  >
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <Link
          href="/sign-in"
          className="text-white text-sm sm:text-base md:text-sm font-medium hover:opacity-80 transition-opacity"
        >
          SIGN IN
        </Link> // Show sign-in link if no token
      )}
    </div>
  );
};

export default Navbar;

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Bell,
  LogOut,
  HelpCircle,
  User,
  ReceiptText,
  MapPin,
  User2Icon,
  User2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store/store';
import {
  disableLocation,
  enableLocation,
  logout,
} from '@/redux/slice/UserSlice';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';

const DashboardRoutes = [
  {
    id: 1,
    label: 'HOME',
    link: '/dashboard',
  },
  // {
  //   id: 2,
  //   label: "Thred",
  //   link: "/dashboard/thred"
  // },
  // {
  //   id: 3,
  //   label: "NOTIFICATIONS",
  //   link: "/dashboard/notifications"
  // },
  // {
  //   id: 4,
  //   label: "ACCOUNT",
  //   link: "/dashboard/account"
  // },
  // {
  //   id: 5,
  //   label: "CHANGE",
  //   link: "/dashboard/change"
  // },
  {
    id: 6,
    label: 'ABOUT US',
    link: '/dashboard/about',
  },
  // {
  //   id: 7,
  //   label: "Privacy Policy",
  //   link: "/dashboard/privacy-policy"
  // },
  {
    id: 8,
    label: 'Contact Us',
    link: '/dashboard/contact-us',
  },
];

const notifications = [
  {
    id: 1,
    title: 'Tracking Update',
    time: '10 PM',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lectus elit.',
    action: null,
  },
  {
    id: 2,
    title: 'New Charm Rivaltakia!',
    time: '10 PM',
    content: 'Check out our newest charm collection.',
    action: 'VIEW NOW',
  },
  {
    id: 3,
    title: 'Exclusive Offer',
    time: '10 PM',
    content: 'Special discounts for our premium members.',
    action: 'SHOP NOW',
  },
];

const Dnavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const dispatch = useDispatch<AppDispatch>();
  const route = useRouter();

  const { isLocationEnabled, locationDenied } = useSelector(
    (state: RootState) => state.auth,
  );

  const toggleLocation = () => {
    if (isLocationEnabled) {
      dispatch(disableLocation());
    } else {
      dispatch(enableLocation());
    }
  };

  return (
    <nav className="w-full relative">
      {/* Desktop Navbar */}
      <div className="flex px-4 sm:px-10 lg:px-20 py-4 justify-between items-center">
        <Link href="/dashboard">
          <h1 className="font-[700] text-[30px] bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent">
            Kandi
          </h1>
        </Link>

        {/* Desktop Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex gap-x-10 lg:gap-x-10 items-center">
          {DashboardRoutes.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="text-white font-orbitron font-normal text-sm leading-[52px] tracking-[0%] uppercase hover:opacity-80 transition-opacity"
            >
              {item.label}
            </Link>
          ))}

          {/* Notification Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative cursor-pointer">
                <Bell className="text-white h-6 w-6 hover:opacity-80" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white">
                    {unreadCount}
                  </Badge>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-80 bg-gray-900 border-gray-700 text-white rounded-lg shadow-lg"
              align="end"
            >
              <div className="p-2 border-b border-gray-700">
                <div className="flex justify-between items-center px-2">
                  <h3 className="font-bold">NOTIFICATIONS</h3>
                  <div className="flex gap-2">
                    <button className="text-xs text-blue-400 hover:text-blue-300">
                      VIEW ALL
                    </button>
                    <button className="text-xs text-blue-400 hover:text-blue-300">
                      MARK AS READ
                    </button>
                  </div>
                </div>
              </div>

              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start gap-1 p-3 hover:bg-gray-800 rounded cursor-pointer"
                >
                  <div className="flex justify-between w-full">
                    <span className="font-semibold">{notification.title}</span>
                    <span className="text-xs text-gray-400">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">
                    {notification.content}
                  </p>
                  {notification.action && (
                    <button className="text-xs text-blue-400 hover:text-blue-300 mt-1">
                      {notification.action}
                    </button>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full p-[2px] bg-gradient-to-r from-[#FF005D] to-[#00D1FF] cursor-pointer">
                {/* <Image
                  src="/avatar.jfif"
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full object-cover w-full h-full"
                /> */}
                <User2 className="w-[80%] h-[80%]" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-auto bg-gray-900 text-white border border-gray-700 mt-2">
              <DropdownMenuItem
                className="flex items-center gap-2 px-3 py-2 text-white hover:bg-gray-800 cursor-pointer"
                onClick={() => route.push('/dashboard/account')}
              >
                <User className="h-4 w-4" />
                <span>My Account</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center gap-2 px-3 py-2 text-white hover:bg-gray-800 cursor-pointer"
                onClick={() => {}}
              >
                <HelpCircle className="h-4 w-4" />
                <span>FAQ</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center gap-2 px-3 py-2 text-white hover:bg-gray-800 cursor-pointer"
                onClick={() => {}}
              >
                <ReceiptText className="h-4 w-4" />
                <span>Terms & Conditions</span>
              </DropdownMenuItem>

              <div className="w-full px-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 " />
                    <span className="text-gray-300">Location</span>
                  </div>
                  <Switch
                    checked={isLocationEnabled}
                    onCheckedChange={toggleLocation}
                    className="self-end data-[state=unchecked]:bg-gray-700 data-[state=checked]:bg-green-700"
                  />
                </div>
              </div>

              <DropdownMenuSeparator className="my-2 border-gray-700" />

              <DropdownMenuItem
                className="flex items-center gap-2 px-3 py-2 text-white hover:bg-gray-800 cursor-pointer"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button - Visible only on mobile */}
        <button
          className="md:hidden text-white focus:outline-none z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Slides down when open */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-sm w-full h-screen pt-20 px-4 z-40">
          <div className="flex flex-col space-y-4">
            {DashboardRoutes.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="text-white font-orbitron font-normal text-xl py-4 px-4 uppercase hover:bg-white/10 rounded transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Dnavbar;

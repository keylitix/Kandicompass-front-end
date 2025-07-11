'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
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
  MailIcon,
  ToggleRight,
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
  setRefetchUser,
} from '@/redux/slice/UserSlice';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { useAppSelector } from '@/app/hook/useReduxApp';
import {
  useGetBeadRequestByEmailQuery,
  useGetInvitationsQuery,
} from '@/redux/api/thredApi';
import { AppNotification } from '@/app/types/notification';
import { toast } from 'sonner';
import { CORE_BACKEND_URL } from '@/helper/path';
import { DEFAULT_PROFILE_PICTURE } from '@/lib/variables';
import { useGetUserByIdQuery } from '@/redux/api/userApi';
import BeadAcceptRequestModal from '@/app/_components/modal/BeadAcceptRQ';
import { setBeadRequestRes } from '@/redux/slice/Notification';

const DashboardRoutes = [
  {
    id: 1,
    label: 'HOME',
    link: '/dashboard',
  },
  {
    id: 2,
    label: 'ABOUT US',
    link: '/dashboard/about',
  },
  {
    id: 3,
    label: 'Contact Us',
    link: '/dashboard/contact-us',
  },
];

const statusColors = {
  pending: 'bg-yellow-800 text-white',
  accepted: 'bg-green-800 text-white',
  declined: 'bg-red-800 text-white',
};

const Dnavbar = () => {
  const { user, shouldRefetchUser } = useAppSelector((state) => state.auth);
  const { refecthNotification } = useAppSelector((state) => state.notification);
  const userId = user?.id || '';
  const {
    data,
    isLoading: isLoadingUser,
    refetch: refetchUser,
    isFetching: isFetchingUser,
  } = useGetUserByIdQuery({ id: userId });
  const userData = data?.data?.[0] || null;
  const userEmail = user?.email as string;
  const { data: invitations, isLoading } = useGetInvitationsQuery(userEmail, {
    skip: !userEmail,
    refetchOnMountOrArgChange: refecthNotification,
  });
  const { data: beadRequests } = useGetBeadRequestByEmailQuery(userEmail, {
    skip: !userEmail,
    refetchOnMountOrArgChange: refecthNotification,
  });
  const invitationsData = invitations?.data;
  const beadRequestsData = beadRequests?.data?.data;
  console.log('invitationsData', beadRequestsData);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number | undefined>();
  const prevIdsRef = useRef<Set<string>>(new Set());

  const dispatch = useDispatch<AppDispatch>();
  const route = useRouter();

  const { isLocationEnabled, locationDenied } = useSelector(
    (state: RootState) => state.auth,
  );

  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const threadInvitations: AppNotification[] =
    invitationsData?.map((invite) => ({
      id: invite._id,
      title: 'Thread Invitation',
      content: `You have been invited to "${invite.threadName}"`,
      time: new Date(invite.createdAt).toLocaleTimeString(),
      type: 'thread_invitation',
      icon: <MailIcon size={16} className="text-[#FF005D]" />,
      status: invite.status,
      action: {
        label: 'View Thread',
        onClick: () => {
          route.push(
            `/dashboard/thread/${invite.threadId}?inviteId=${invite._id}`,
          );
        },
      },
    })) || [];

  const beadRequestsNotifications: AppNotification[] =
    beadRequestsData?.map((request: any) => ({
      id: request._id,
      title: 'Bead Purchase Request',
      content: `${request.buyerId.email} wants to purchase a bead: "${request.message}"`,
      time: new Date(request.createdAt).toLocaleTimeString(),
      type: 'bead_purchase_request',
      icon: <User2Icon size={16} className="text-[#FF005D]" />,
      status: request.status,
      action: {
        label: 'View Request',
        onClick: () => {
          dispatch(
            setBeadRequestRes({
              isOpen: true,
              reqId: request._id,
              beadName: request.beadName,
              buyerID: request.buyerId.id,
              offerPrice: request.offerPrice,
              message: request.message,
              threadName: request.threadId.threadName,
              beadId: request.beadId._id,
              status: request.status,
              threadId: request.threadId._id,
            }),
          );
        },
      },
    })) || [];

  const allNotifications = [...threadInvitations, ...beadRequestsNotifications];

  const toggleLocation = () => {
    if (isLocationEnabled) {
      dispatch(disableLocation());
    } else {
      dispatch(enableLocation());
    }
  };

  useEffect(() => {
    if (!invitationsData) return;

    const currentIds: Set<string> = new Set(
      invitationsData.map((invite) => invite._id),
    );
    const prevIds = prevIdsRef.current;

    const newInvites = invitationsData.filter(
      (invite) => !prevIds.has(invite._id) && invite.status === 'pending',
    );

    if (newInvites.length > 0) {
      setUnreadCount((prevCount) => (prevCount || 0) + newInvites.length);
      toast.message(
        `You have ${newInvites.length} new thread invitation${newInvites.length > 1 ? 's' : ''}.`,
      );
      prevIdsRef.current = currentIds;
    }
  }, [invitationsData]);

  useEffect(() => {
    if (!beadRequestsData) return;

    const currentIds: Set<string> = new Set(
      beadRequestsData.map((request: any) => request._id),
    );
    const prevIds = prevIdsRef.current;

    const newRequests = beadRequestsData.filter(
      (request: any) =>
        !prevIds.has(request._id) && request.status === 'pending',
    );

    if (newRequests.length > 0) {
      setUnreadCount((prevCount) => (prevCount || 0) + newRequests.length);
      toast.message(
        `You have ${newRequests.length} new bead purchase request${newRequests.length > 1 ? 's' : ''}.`,
      );
      prevIdsRef.current = currentIds;
    }
  }, [beadRequestsData]);

  useEffect(() => {
    const pendingInvitations =
      invitationsData?.filter((inv) => inv.status === 'pending') || [];
    const unreadCount = [...pendingInvitations];
    setUnreadCount(unreadCount.length);
  }, [invitationsData, refecthNotification]);

  useEffect(() => {
    if (shouldRefetchUser) {
      refetchUser();
      dispatch(setRefetchUser());
    }
  }, [shouldRefetchUser]);

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
                {typeof unreadCount === 'number' && unreadCount > 0 && (
                  <Badge className="absolute -top-2 -right-1 h-4  w-4 flex items-center justify-center rounded-full p-0 bg-red-500 text-white text-[10px]">
                    {unreadCount}
                  </Badge>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-xl h-[calc(100vh-30vh)] overflow-y-auto bg-[#1c102b] border border-white/20 text-white rounded-2xl shadow-2xl shadow-[#1c102b]/50 space-y-2"
              align="end"
            >
              <div className="p-2 border-b border-gray-700">
                <div className="flex justify-between items-center px-2">
                  <h3 className="font-bold">NOTIFICATIONS</h3>
                </div>
              </div>

              {allNotifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`flex flex-col items-start gap-1 p-3 ${notification.status === 'pending' ? 'bg-gray-600' : ''} hover:bg-gray-800 hover:text-white rounded-xl cursor-pointer focus:bg-gray-900`}
                  onClick={() => {
                    if (notification.action) {
                      notification.action.onClick();
                    }
                  }}
                >
                  <div className="flex justify-between w-full">
                    <span className="font-semibold flex items-center gap-2 hover:text-white">
                      {notification.icon}
                      {notification.title}
                    </span>
                    <span className="flex flex-col items-end justify-between">
                      <Badge
                        className={`text-[8px] ${statusColors[notification.status]}`}
                      >
                        {notification.status.toUpperCase()}
                      </Badge>
                    </span>
                  </div>

                  <p className="text-sm text-gray-300">
                    {notification.content}
                  </p>

                  <span className="flex items-end justify-between w-full">
                    {notification.action && (
                      <button
                        className="text-xs text-blue-400 hover:text-blue-300 mt-1"
                        onClick={notification.action.onClick}
                      >
                        {notification.action.label}
                      </button>
                    )}
                    <span className="text-xs text-gray-400">
                      {notification.time}
                    </span>
                  </span>

                  {/* {notification.action && (
                    <button className="text-xs text-blue-400 hover:text-blue-300 mt-1">
                      {notification.action}
                    </button>
                  )} */}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="relative cursor-pointer flex items-center justify-center w-[50px] h-[50px] rounded-full relative">
                <CircularProgressbarWithChildren
                  strokeWidth={5}
                  value={userData?.profileScore || 0}
                  styles={buildStyles({
                    pathColor: '#FF005D',
                    trailColor: '#FFFFFF9C',
                    rotation: 1,
                  })}
                >
                  <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full p-[2px] bg-gradient-to-r from-[#FF005D] to-[#00D1FF]">
                    <Image
                      src={
                        userData?.avatar
                          ? `${CORE_BACKEND_URL}${userData.avatar}`
                          : DEFAULT_PROFILE_PICTURE
                      }
                      alt="Profile"
                      unoptimized
                      width={36}
                      height={36}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                </CircularProgressbarWithChildren>
                <div className="absolute -bottom-4 w-[130px] h-[15px] bg-gradient-to-r from-[#FF005D] to-[#00D1FF] rounded-xl flex items-center justify-center">
                  <span className="text-[8px] text-white">
                    {`${userData?.profileScore || 0}%`} profile complete
                  </span>
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-auto bg-gray-900 text-white border border-gray-700 mt-2">
              <DropdownMenuItem
                className="flex items-center gap-2 px-3 py-2 text-white hover:bg-gray-800 cursor-pointer"
                onClick={() => {
                  if (window.location.pathname === '/dashboard') {
                    route.push('/home');
                  } else {
                    route.push('/dashboard');
                  }
                }}
              >
                <ToggleRight className="h-4 w-4" />
                <span>
                  {window.location.pathname === '/dashboard'
                    ? 'Switch to Home'
                    : 'Switch to Dashboard'}
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center gap-2 px-3 py-2 text-white hover:bg-gray-800 cursor-pointer"
                onClick={() => route.push('/dashboard/profile')}
              >
                <User className="h-4 w-4" />
                <span>My Account</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center gap-2 px-3 py-2 text-white hover:bg-gray-800 cursor-pointer"
                onClick={() => {
                  route.push('/dashboard/faq');
                }}
              >
                <HelpCircle className="h-4 w-4" />
                <span>FAQ</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center gap-2 px-3 py-2 text-white hover:bg-gray-800 cursor-pointer"
                onClick={() => {
                  route.push('/terms-and-conditions');
                }}
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
      <BeadAcceptRequestModal />
    </nav>
  );
};

export default Dnavbar;

'use client';
import React, { useEffect, useState } from 'react';
import {
  QrCode,
  Calendar,
  Plus,
  Share2Icon,
} from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { BeadCard } from '@/app/_components/beads/BeadCard';
import { GradientButton } from '@/app/_components/custom-ui/GradientButton';
import Image from 'next/image';
import { useGetThreadByIdQuery } from '@/redux/api/thredApi';
import AddBead from '@/app/_components/modal/AddBead';
import { useGetBeadByThreadIdQuery } from '@/redux/api/beadApi';
import AddMembers from '@/app/_components/modal/AddMember';
import ViewQrCodeModal from '@/app/_components/modal/view-qr-code';
import SocialShare from '@/app/_components/modal/SocialShare';
import { CORE_BACKEND_URL } from '@/helper/path';
import { toast } from 'sonner';
import InvitationAction from '@/app/_components/modal/InvitationAction';
import { set } from 'lodash';
import { Bead } from '@/app/types/bead';
import JoiningRequest from '@/app/_components/modal/JoiningRequest';
import { DEFAULT_PROFILE_PICTURE } from '@/lib/variables';

const ThreadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const inviteId = searchParams.get('inviteId');
  const forJoining = searchParams.get('jt');
  const router = useRouter();
  // const [thread, setThread] = useState<Thread | null>(null);
  const [showQrCode, setShowQrCode] = useState(false);
  const [shareQrCode, setShareQrCode] = useState(false);
  const [hasThreadAccess, setHasThreadAccess] = useState(false);
  const { data, isLoading: isThreadLoading } = useGetThreadByIdQuery(id);
  const {
    data: beadData,
    isLoading: isBeadsLoading,
    refetch: refetchBeads,
    isFetching: isFetchingBeads,
  } = useGetBeadByThreadIdQuery({
    threadId: id ?? '',
    page_number: 1,
    page_size: 50,
  });

  const thread = data?.data[0] ?? {};
  const beads = beadData?.data?.data ?? [];

  const [openBeadModal, setOpenBeadModal] = useState(false);
  const [openMemberModal, setOpenMemberModal] = useState(false);
  const [openInvitationActionModal, setOpenInvitationActionModal] = useState(false);
  const [openJoiningRequestModal, setOpenJoiningRequestModal] = useState(false);

  const [qrCode, setQrCode] = useState<{
    qrCode: string | null;
    name: string;
  }>({ qrCode: null, name: '' });
  const [SocialShareData, setSocialShareData] = useState<{
    qrCode: string | null;
    title: string;
    link?: string;
  }>({ qrCode: null, title: '', link: document.location.href });

  useEffect(() => {
    if (inviteId && typeof window !== 'undefined') {
      setOpenInvitationActionModal(true);
    }

    if (forJoining && typeof window !== 'undefined') {
      setOpenJoiningRequestModal(true);
    }
  }, [inviteId, forJoining]);


  useEffect(() => {
    const hasAccess = beads.length >= 2 && beads.filter((b: Bead) => b.images.length > 0).length >= 2;
    setHasThreadAccess(hasAccess);
  }, [beads]);


  if (isThreadLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-slow text-[#00D1FF]">
          <div className="w-16 h-16 border-4 border-[#00D1FF] border-t-transparent rounded-full animate-rotate-slow"></div>
        </div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="bg-[#1c102b] flex flex-col justify-center items-center backdrop-blur-md rounded-xl overflow-hidden border border-[#3f2e6a] border-opacity-20 p-8 text-center">
        <h2 className="text-xl font-semibold text-[#FF005D] mb-2">
          Thread Not Found
        </h2>
        <p className=" mb-4">
          The thread you're looking for does not exist or has been moved to
          another dimension.
        </p>
        <GradientButton onClick={() => window.history.back()}>
          Go Back
        </GradientButton>
      </div>
    );
  }




  return (
    <div className="container mx-auto px-4 pb-8 mt-8 space-y-6">
      <div className="bg-[#1c102b] backdrop-blur-md rounded-xl overflow-hidden border border-[#3f2e6a] border-opacity-20">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#00D1FF]">
                {thread.threadName}
              </h1>
              <div className="flex items-center mt-1 text-sm ">
                <Calendar size={16} className="mr-1" />
                <span>
                  Created {new Date(thread.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <GradientButton
                variant="fill"
                icon={QrCode}
                onClick={() => {
                  setQrCode({ qrCode: thread.qrCode, name: thread.threadName });
                  setShowQrCode(!showQrCode);
                }}
              >
                Show QR Code
              </GradientButton>
              <GradientButton
                variant="outline"
                icon={Share2Icon}
                onClick={() => router.push(`/social-share/thread/${thread._id}?from=${encodeURIComponent(window.location.href)}`)
                }
              >
                Share Qr Code
              </GradientButton>
            </div>
          </div>

          <p className=" mb-6">{thread?.description}</p>
          {hasThreadAccess && (
            <div className="mb-6">
              <h3 className="text-sm font-medium pb-2">Members</h3>
              <div className="flex items-center -space-x-2">
                {thread?.members?.map((member: any, index: any) => (
                  <div
                    key={member._id}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#2a1a3d]"
                    style={{ zIndex: 10 - index }}
                  >
                    <Image
                      width={50}
                      height={50}
                      unoptimized
                      src={member.avatar ? CORE_BACKEND_URL + member.avatar : DEFAULT_PROFILE_PICTURE}
                      alt={member.name}
                      className="object-cover p-1"
                    />
                  </div>
                ))}

                <button
                  onClick={() => setOpenMemberModal(true)}
                  className="w-10 h-10 rounded-full bg-[#2a1a3d] bg-opacity-50 flex items-center justify-center ml-2 border-2 border-[#00D1FF] border-dashed hover:bg-[#00D1FF] transition-colors"
                >
                  <Plus size={16} className="" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#00D1FF]">Thread Beads</h2>
          <button
            className="flex items-center text-[#FF005D] hover:text-[#00D1FF] transition-colors"
            onClick={() => setOpenBeadModal(true)}
          >
            <Plus size={18} className="mr-1" />
            Add Bead
          </button>
        </div>

        {beadData && beadData?.data?.data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beadData?.data?.data?.map((bead: any) => (
              <BeadCard key={bead?._id} bead={bead} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center bg-[#1c102b] backdrop-blur-md rounded-xl overflow-hidden border border-[#3f2e6a] border-opacity-20 border-dashed p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">No Beads Yet</h3>
            <p className=" mb-4">
              This thread doesn't have any beads. Add your first bead to start
              the collection!
            </p>
            <GradientButton icon={Plus} onClick={() => setOpenBeadModal(true)}>
              Add First Bead
            </GradientButton>
          </div>
        )}
      </div>
      <AddBead
        isOpen={openBeadModal}
        onClose={() => setOpenBeadModal(false)}
        threadId={id}
        refetchBeads={refetchBeads}
        isFetchingBeads={isFetchingBeads}
      />
      <AddMembers
        isOpen={openMemberModal}
        onClose={() => setOpenMemberModal(false)}
        threadId={id}
      />
      <ViewQrCodeModal
        isOpen={showQrCode}
        onClose={() => {
          setShowQrCode(false);
        }}
        qrURL={qrCode.qrCode ?? ''}
        title={qrCode.name ?? ''}
      />
      <SocialShare
        isOpen={shareQrCode}
        onClose={() => {
          setShareQrCode(false);
        }}
        imageURL={`${CORE_BACKEND_URL ?? ''}${SocialShareData.qrCode ?? ''}`}
        shareURL={SocialShareData.link ?? ''}
        title={SocialShareData.title ?? ''}
      />
      <InvitationAction
        inviteId={inviteId ?? ''}
        threadName={thread.threadName}
        isOpen={openInvitationActionModal}
        onClose={() => {
          setOpenInvitationActionModal(false);
          router.back();
        }}
        onSuccessResponse={() => setOpenInvitationActionModal(false)}
      />
      <JoiningRequest
        inviteId={inviteId ?? ''}
        threadName={thread.threadName}
        isOpen={openJoiningRequestModal}
        onClose={() => {
          setOpenJoiningRequestModal(false);
          router.back();
        }}
        onSuccessResponse={() => setOpenInvitationActionModal(false)}
      />
    </div>
  );
};

export default ThreadDetailPage;

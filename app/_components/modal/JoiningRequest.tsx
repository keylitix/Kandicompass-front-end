'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from '@/components/ui/dialog';
import { GradientButton } from '../custom-ui/GradientButton';
import { useRequestToJoinThreadMutation, useRespondeToInvitationMutation } from '@/redux/api/thredApi';
import { toast } from 'sonner';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hook/useReduxApp';
import { setRefetchNotification } from '@/redux/slice/Notification';
import { useRouter } from 'next/navigation';
import { joinThreadResponse } from '@/app/types/bead';

interface InvitationActionProps {
  isOpen: boolean;
  onClose: () => void;
  thread: any;
}

const JoiningRequest: React.FC<InvitationActionProps> = ({
  isOpen,
  onClose,
  thread,
}) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [requestToJoinThread, { isLoading: isRequesting }] = useRequestToJoinThreadMutation();

  const onCancelClick = () => {
    router.push('/dashboard');
  }

  let message = `Hi, ${user.fullName} would like to join the thread "${thread.threadName || ''}" as a member.`;

  const onSendRequest = async () => {
    try {
      const res = await requestToJoinThread({ threadId: thread._id, userId: user.id, message: message });
      const { data } = res.data as joinThreadResponse;
      if (data.success) {
        toast.success('Request sent successfully');
        onCancelClick();
      }
    } catch (error) {
      toast.error('Failed to send request');
    }
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={() => { }}  >
        <DialogOverlay className="bg-black/10 backdrop-blur-xs fixed inset-0 z-50 pointer-events-none" />
        <DialogContent className="[&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-500">
              <h2 className="font-bold text-white">Request to Join This Thread?</h2>
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 text-gray-300 text-sm">
            You need permission to join the thread <h2 className="font-bold text-white">"{thread.threadName || ''}"</h2>.
            Please submit a request to become a member.
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <GradientButton
              variant="outline"
              onClick={onCancelClick}
            >
              Cancel
            </GradientButton>
            <GradientButton
              onClick={onSendRequest}
              disabled={isRequesting}
            >
              Request to Join
            </GradientButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JoiningRequest;

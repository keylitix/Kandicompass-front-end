'use client';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogOverlay,
} from '@/components/ui/dialog';
import { GradientButton } from '../custom-ui/GradientButton';
import { useRespondeToInvitationMutation } from '@/redux/api/thredApi';
import { toast } from 'sonner';
import { useState } from 'react';
import { useAppDispatch } from '@/app/hook/useReduxApp';
import { setRefetchNotification } from '@/redux/slice/Notification';

interface InvitationActionProps {
    isOpen: boolean;
    onClose: () => void;
    inviteId: string;
    threadName: string
    onSuccessResponse?: () => void
}

const JoiningRequest: React.FC<InvitationActionProps> = ({ isOpen, onClose, inviteId, threadName, onSuccessResponse }) => {
    const [respondeToInvitation, { isLoading: isResponding }] = useRespondeToInvitationMutation();
    const [accepting, setAccepting] = useState(false);
    const [declining, setDeclining] = useState(false);
    const dispatch = useAppDispatch();

    const onResponde = async (status: string) => {
        if (!inviteId || isResponding) return;
        if (status === 'accept') {
            try {
                const res = await respondeToInvitation({ inviteId, accept: true }).unwrap();
                if (isResponding) setAccepting(true);
                const { isSuccess } = res;
                if (isSuccess) {
                    setAccepting(false);
                    dispatch(setRefetchNotification(true));
                    toast.success('Invitation accepted successfully! you are now part of the thread', { position: 'top-center' });
                    onSuccessResponse && onSuccessResponse();
                }
            } catch (error) {
                setAccepting(false);
                toast.error('Failed to accept invitation. Try again.');
                console.error('Error accepting invitation:', error);
            }
        } else {
            try {
                const res = await respondeToInvitation({ inviteId, accept: false }).unwrap();
                if (isResponding) setDeclining(true);
                const { isSuccess } = res;
                if (isSuccess) {
                    setDeclining(false);
                    dispatch(setRefetchNotification(true));
                    toast.success('Invitation declined successfully!');
                    onSuccessResponse && onSuccessResponse();
                }
            } catch (error) {
                setDeclining(false);
                toast.error('Failed to decline invitation. Try again.');
                console.error('Error declining invitation:', error);
            }
        }
    };



    return (
        <div>
            <Dialog open={isOpen}>
                <DialogOverlay className="bg-black/10 backdrop-blur-xs fixed inset-0 z-50 pointer-events-none" />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-red-500">
                            This thread is private
                        </DialogTitle>
                    </DialogHeader>

                    <div className="mt-4 text-gray-300 text-sm">
                        You need permission to become a member of <h2 className="font-bold text-white">"{threadName}"</h2>.
                        Please request to join.
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <GradientButton
                            variant="outline"
                            onClick={onClose}
                            disabled={isResponding}
                        >
                            Cancel
                        </GradientButton>
                        <GradientButton
                            onClick={() => onResponde("request")}
                            disabled={isResponding}
                        >
                            {isResponding ? "Requesting..." : "Request to Join"}
                        </GradientButton>
                    </div>
                </DialogContent>
            </Dialog>


        </div>
    );
};

export default JoiningRequest;

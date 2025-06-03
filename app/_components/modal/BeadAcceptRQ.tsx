'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { GradientButton } from '../custom-ui/GradientButton';
import { useAppDispatch, useAppSelector } from '@/app/hook/useReduxApp';
import { setBeadRequestRes } from '@/redux/slice/Notification';
import { useGetBeadByIdQuery } from '@/redux/api/beadApi';
import { useGetUserByIdQuery } from '@/redux/api/userApi';
import Image from 'next/image';
import { CORE_BACKEND_URL } from '@/helper/path';
import { DEFAULT_PROFILE_PICTURE } from '@/lib/variables';
import Link from 'next/link';
import { useState } from 'react';
import Input from '../custom-ui/Input';
import { useRespondToBeadPurchaseRequestMutation } from '@/redux/api/thredApi';
import { toast } from 'sonner';

const BeadAcceptRequestModal = () => {
  const { beadRequestRes } = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  console.log('beadRequestRes', beadRequestRes);

  const { data: beads } = useGetBeadByIdQuery(beadRequestRes.beadId, {
    skip: !beadRequestRes.beadId,
  });
  const beadData = Array.isArray(beads?.data) ? beads.data[0] : {};

  const { data: user } = useGetUserByIdQuery(
    { id: beadRequestRes.buyerID },
    { skip: !beadRequestRes.buyerID },
  );
  const buyerData = Array.isArray(user?.data) ? (user.data[0] as any) : {};

  const [respondToBeadPurchaseRequest] =
    useRespondToBeadPurchaseRequestMutation();

  const [isResponding, setIsResponding] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const onClose = () => {
    dispatch(
      setBeadRequestRes({
        isOpen: false,
        reqId: '',
        beadId: '',
        buyerID: '',
        offerPrice: 0,
        message: '',
        threadName: '',
        status: '',
        threadId: '',
      }),
    );
  };

  const onRespondOffer = async (type: string) => {
    const payload = {
      requestId: beadRequestRes.reqId,
      accept: type === 'accept',
      responseMessage: responseMessage,
    };
    try {
      const res = await respondToBeadPurchaseRequest(payload);
      const { data } = res;
      if (type === 'accept') {
        if (data?.isSuccess) {
          toast.success('Offer accepted successfully!');
          onClose();
        }
      } else if (type === 'reject') {
        if (data?.isSuccess) {
          toast.success('Offer rejected successfully!');
          onClose();
        }
      }
    } catch (err: any) {
      toast.error('An error occurred while responding to the offer.');
    }
  };

  return (
    <Dialog open={beadRequestRes.isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            <h2 className="text-lg font-semibold">Bead Purchase Request</h2>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 flex justify-between bg-[#2a1c40] p-3 rounded-md">
          <div className="flex items-center gap-3">
            <Image
              src={
                buyerData?.avatar
                  ? CORE_BACKEND_URL + buyerData.avatar
                  : DEFAULT_PROFILE_PICTURE
              }
              width={40}
              height={40}
              unoptimized
              className="rounded-full object-cover"
              alt={buyerData?.fullName || 'User Avatar'}
            />
            <div>
              <p className="text-white font-semibold text-sm">
                {buyerData?.fullName}
              </p>
              <p className="text-xs text-gray-400">{buyerData?.email}</p>
            </div>
          </div>
          <div className="flex items-end text-right text-xs text-gray-300 hover:text-blue-500 transition-colors ">
            <Link
              href={`/dashboard/profile/${buyerData?._id}`}
              className="cursor-pointer italic"
            >
              View Profile
            </Link>
          </div>
        </div>

        <div className="text-sm text-gray-300 mt-4 leading-relaxed">
          <p>
            <h2 className="text-white font-semibold">{buyerData?.fullName}</h2>{' '}
            has requested to purchase your bead{' '}
            <h2
              onClick={onClose}
              className="text-white font-semibold cursor-pointer italic"
            >
              <Link href={`/dashboard/beads/${beadData?._id}`}>
                {beadData?.beadName}
              </Link>
            </h2>{' '}
            from the thread{' '}
            <h2
              onClick={onClose}
              className="text-white font-semibold cursor-pointer italic"
            >
              <Link href={`/dashboard/thread/${beadRequestRes?.threadId}`}>
                {beadRequestRes?.threadName}
              </Link>
            </h2>
            .
          </p>

          <p className="mt-3">
            <strong className="text-white">Offer Price:</strong> $
            {beadRequestRes?.offerPrice}
          </p>

          <p className="mt-1">
            <strong className="text-white">Message from Buyer:</strong>{' '}
            <em>"{beadRequestRes?.message}"</em>
          </p>
        </div>

        {isResponding ? (
          <>
            <div>
              <Input
                label="Response Message"
                type="textarea"
                placeholder="Type your response here..."
                onChange={(e) => setResponseMessage(e.target.value)}
                value={responseMessage}
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <GradientButton
                variant="outline"
                onClick={() => onRespondOffer('reject')}
              >
                Reject Offer
              </GradientButton>
              <GradientButton onClick={() => onRespondOffer('accept')}>
                Accept Offer
              </GradientButton>
            </div>
          </>
        ) : (
          <>
            {beadRequestRes?.status === 'accepted' ? (
              <div className="mt-6 text-sm text-green-500">
                <p className="font-semibold">You already accepted</p>
                <p className="text-gray-400">
                  This offer has already been accepted.
                </p>
              </div>
            ) : (
              <div className="mt-6 text-sm text-gray-400">
                Would you like to accept this offer and proceed with the sale?
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <GradientButton variant="outline" onClick={onClose}>
                Cancel
              </GradientButton>
              {beadRequestRes?.status === 'pending' && (
                <GradientButton onClick={() => setIsResponding(true)}>
                  Respond to Offer
                </GradientButton>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BeadAcceptRequestModal;

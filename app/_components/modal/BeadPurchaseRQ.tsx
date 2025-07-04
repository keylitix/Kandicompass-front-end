'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { GradientButton } from '../custom-ui/GradientButton';
import { useAppDispatch } from '@/app/hook/useReduxApp';
import { useState } from 'react';
import Input from '../custom-ui/Input';
import { DollarSign } from 'lucide-react';
import { useBeadPurchaseRequestMutation } from '@/redux/api/thredApi';

interface BeadPurchaseRQProps {
  isOpen: boolean;
  onClose: () => void;
  beadName: string;
  currentPrice: number;
  threadId: string;
  beadId: string;
  buyerId: string;
}

const BeadPurchaseRQ: React.FC<BeadPurchaseRQProps> = ({
  isOpen,
  onClose,
  beadName,
  currentPrice,
  threadId,
  beadId,
  buyerId,
}) => {
  const dispatch = useAppDispatch();
  const [beadPurchaseRequest, { isLoading: isBeadPurchaseRQLoading }] =
    useBeadPurchaseRequestMutation();
  const [offerPrice, setOfferPrice] = useState<number>(currentPrice);
  const [message, setMessage] = useState<string>(
    'Interested in purchasing this bead',
  );

  const handleConfirm = async () => {
    console.log(`Offer submitted: ${offerPrice} for bead "${beadName}"`);
    if (!beadId || !buyerId || !threadId || !offerPrice) return;

    const payload = {
      threadId: threadId,
      beadId: beadId,
      buyerId: buyerId,
      offerPrice: offerPrice,
      message: message,
    };

    const res = await beadPurchaseRequest(payload)?.unwrap();
    console.log('Bead Purchase Request Response:', res);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Request to Buy: {beadName}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 text-gray-300 text-sm">
          <p className="mb-2">
            This bead is currently listed at:{' '}
            <h2 className="font-semibold text-white">${currentPrice}</h2>
          </p>
          <p className="mt-2">
            Enter your offer price below to request a purchase from the bead
            owner.
          </p>
        </div>

        <div className="mt-4">
          <Input
            label="Your Offer ($)"
            icon={DollarSign}
            type="number"
            value={offerPrice}
            onChange={(e) => setOfferPrice(Number(e.target.value))}
          />
        </div>

        <div className="mt-4">
          <Input
            label="Your Message"
            type="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <GradientButton variant="outline" onClick={onClose}>
            Cancel
          </GradientButton>
          <GradientButton onClick={handleConfirm}>Send Request</GradientButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BeadPurchaseRQ;

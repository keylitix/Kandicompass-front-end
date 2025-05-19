"use client";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import Image from 'next/image';

interface ViewQrCodeModalType {
    isOpen: boolean,
    onClose: () => void;
    qrURL: string;
    title: string;
    status?: string;
}

export default function ViewQrCodeModal({ isOpen, onClose, qrURL, title, status }: ViewQrCodeModalType) {
    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent className="rounded-3xl text-white">
                <>
                    <DialogHeader>
                         <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent">
                {title}
              </h2>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4">
                        <Image
                            src={`https://kandi-backend.cradle.services/${qrURL}`}
                            alt="QR Code"
                            width={250}
                            height={250}
                            className="object-contain"
                        />
                        {/* <p className="text-black text-xl font-semibold text-center">
                            {status === 'pending'
                                ? 'This thread is pending approval by admin. Please wait for approval.'
                                : 'Scan the QR code to become a part of our community'}
                        </p> */}
                    </div>
                    <DialogFooter>
                        <Button
                            className="mt-4 bg-gradient-to-r from-pink-500 to-cyan-400 text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 cursor-pointer"
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </>
            </DialogContent>
        </Dialog>
    )
}
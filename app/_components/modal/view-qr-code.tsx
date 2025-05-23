'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { CORE_BACKEND_URL } from '@/helper/path';
import Image from 'next/image';
import { inputBaseClasses } from '../custom-ui/Input';
import { GradientButton } from '../custom-ui/GradientButton';
import { Download, Printer } from 'lucide-react';

interface ViewQrCodeModalType {
  isOpen: boolean;
  onClose: () => void;
  qrURL: string;
  title: string;
  status?: string;
}

export default function ViewQrCodeModal({
  isOpen,
  onClose,
  qrURL,
  title,
  status,
}: ViewQrCodeModalType) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [copyCount, setCopyCount] = useState<number>(1);

  useEffect(() => {
    if (copyCount > 100) {
      setCopyCount(100);
    } else if (copyCount < 1) {
      setCopyCount(1);
    }
  }, [copyCount]);

  const downloadQRCode = async (name: string) => {
    try {
      const response = await fetch(`${CORE_BACKEND_URL}${qrURL}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name}-qr-code.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download QR code:', error);
    }
  };

  const printMultipleQRCodes = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const qrHTML = Array.from({ length: copyCount })
      .map(() => {
        return `<div style="page-break-after: always; display: flex; justify-content: center; align-items: center; height: 100vh;">
                <img src="${CORE_BACKEND_URL}${qrURL}" width="250" height="250" style="object-fit: contain;" />
              </div>`;
      })
      .join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Codes</title>
        </head>
        <body>
          ${qrHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => open && onClose()}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="bg-white"
        aria-describedby={undefined}
      >
        <>
          <DialogHeader>
            <h2 className="text-3xl font-bold">{title}</h2>
          </DialogHeader>

          <div className="flex flex-col items-center space-y-4">
            <Image
              ref={imageRef}
              src={`${CORE_BACKEND_URL}${qrURL}`}
              alt="QR Code"
              width={250}
              height={250}
              className="object-contain"
            />
          </div>

          <div className="mt-4">
            <label className="font-semibold text-black">How many copies?</label>
            <input
              type="number"
              min={1}
              max={100}
              className={`${inputBaseClasses(false)} text-black`}
              value={copyCount}
              onChange={(e) => setCopyCount(parseInt(e.target.value))}
              style={{
                borderImage: 'linear-gradient(to right, #FF005D, #00D1FF) 1',
                outline: 'none',
                color: 'black',
              }}
            />
          </div>

          <DialogFooter className="flex flex-col gap-2 mt-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <GradientButton
                icon={Download}
                variant="outline"
                onClick={() => {
                  downloadQRCode(title);
                }}
              >
                Download QR
              </GradientButton>

              <GradientButton
                icon={Printer}
                variant="outline"
                onClick={printMultipleQRCodes}
              >
                Print QR
              </GradientButton>

              <GradientButton onClick={onClose}>Close</GradientButton>
            </div>
          </DialogFooter>
        </>
      </DialogContent>
    </Dialog>
  );
}

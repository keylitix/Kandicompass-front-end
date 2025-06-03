'use client';
import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { CORE_BACKEND_URL } from '@/helper/path';
import Image from 'next/image';
import { inputBaseClasses } from '../custom-ui/Input';
import { GradientButton } from '../custom-ui/GradientButton';
import { Download, Printer } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

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
  const [isMultiple, setIsMultiple] = useState<boolean>(false);
  const [copyCount, setCopyCount] = useState<number>(4);
  const [perRow, setPerRow] = useState<number>(2);
  const totalQRCodeCount = 1000;

  useEffect(() => {
    if (copyCount > totalQRCodeCount) setCopyCount(totalQRCodeCount);
    if (copyCount < 1) setCopyCount(1);
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

  const printQRCodes = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const imageSrc = `${CORE_BACKEND_URL}${qrURL}`;

    const qrHTML = isMultiple
      ? Array.from({ length: copyCount })
          .map(() => `<div class="qr"><img src="${imageSrc}" /></div>`)
          .join('')
      : `<div class="qr qr-single"><img src="${imageSrc}" /></div>`;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body {
              margin: 20px;
              padding: 0;
              font-family: sans-serif;
            }
            .grid {
              display: ${isMultiple ? 'grid' : 'flex'};
              grid-template-columns: repeat(${perRow}, 1fr);
              gap: 20px;
              justify-items: center;
              align-items: center;
              justify-content: center;
            }
            .qr img {
              width: ${isMultiple ? '150px' : '100%'};
              height: ${isMultiple ? '150px' : '100%'};
              object-fit: contain;
            }
            .qr-single {
              width: 100vw;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          </style>
        </head>
        <body>
          <div class="grid">
            ${qrHTML}
          </div>
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
        <DialogHeader>
          <h2 className="text-2xl font-bold">{title}</h2>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          <Image
            src={`${CORE_BACKEND_URL}${qrURL}`}
            alt="QR Code"
            width={250}
            height={250}
            className="object-contain"
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-3">
            <label className="font-semibold text-black">Print Multiple?</label>
            <Switch
              checked={isMultiple}
              onCheckedChange={setIsMultiple}
              className={`data-[state=checked]:bg-[#FF005D] bg-gray-300 `}
            />
          </div>
        </div>

        {isMultiple && (
          <>
            <div className="mt-4">
              <label className="font-semibold text-black">
                How many copies?
              </label>
              <input
                type="number"
                min={1}
                max={totalQRCodeCount}
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

            <div className="mt-4">
              <label className="font-semibold text-black">QRs per row?</label>
              <input
                type="number"
                min={1}
                max={4}
                className={`${inputBaseClasses(false)} text-black`}
                value={perRow}
                onChange={(e) => setPerRow(parseInt(e.target.value))}
                style={{
                  borderImage: 'linear-gradient(to right, #FF005D, #00D1FF) 1',
                  outline: 'none',
                  color: 'black',
                }}
              />
            </div>
          </>
        )}

        <DialogFooter className="flex flex-col gap-2 mt-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <GradientButton
              icon={Download}
              variant="outline"
              onClick={() => downloadQRCode(title)}
            >
              Download QR
            </GradientButton>

            <GradientButton
              icon={Printer}
              variant="outline"
              onClick={printQRCodes}
            >
              Print QR
            </GradientButton>

            <GradientButton onClick={onClose}>Close</GradientButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

'use client';
import { Dialog, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import Image from 'next/image';
import { GradientButton } from '../custom-ui/GradientButton';
import { Download } from 'lucide-react';
import { CORE_BACKEND_URL } from '@/helper/path';
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
} from 'next-share'
import { useRouter } from 'next/navigation';

interface SocialShareProps {
    isOpen: boolean;
    onClose: any;
    imageURL: string;
    shareURL: string;
    title: string;
    description?: string;
}

export default function SocialShare({
    isOpen,
    onClose,
    imageURL,
    shareURL,
    title,
    description = '',
}: SocialShareProps) {
    console.log('shareURL', imageURL);
    const router = useRouter();

    const downloadImage = async () => {
        try {
            const response = await fetch(imageURL);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'shared-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed', error);
        }
    };

    const encodedURL = encodeURIComponent(shareURL);
    const encodedTitle = encodeURIComponent(title);
    const encodedDesc = encodeURIComponent(description);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => open}>
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
                    {/* <Image
                        src={imageURL}
                        alt="Share Image"
                        width={300}
                        height={300}
                        className="object-contain"
                    /> */}
                    <p className="text-center text-sm text-gray-600">{description}</p>
                    <EmailShareButton
                        url={'https://github.com/next-share'}
                        subject={'Next Share'}
                        body={`Check out this image: ${imageURL}`}
                    >
                        <EmailIcon size={32} round />
                    </EmailShareButton>

                    <FacebookShareButton
                        url={window.location.href}
                        quote={'next-share is a social share buttons for your next React apps.'}
                        hashtag={'#nextshare'}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                </div>

                <DialogFooter className="flex flex-col gap-3 mt-6">
                    <div className="flex flex-wrap justify-center gap-3">
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GradientButton variant="outline">Facebook</GradientButton>
                        </a>

                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GradientButton variant="outline">Twitter</GradientButton>
                        </a>
                        <a
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&title=${encodedTitle}&summary=${encodedDesc}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GradientButton variant="outline">LinkedIn</GradientButton>
                        </a>
                    </div>

                    <GradientButton icon={Download} onClick={downloadImage}>
                        Download Image
                    </GradientButton>

                    <GradientButton onClick={() => {router.push(onClose)}}>Close</GradientButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

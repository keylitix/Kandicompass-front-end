'use client';

import { Copy, Mail, MailIcon, Mails, Text } from 'lucide-react';
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  TwitterIcon,
    TelegramShareButton,
  TelegramIcon,
} from 'next-share';

interface Props {
  url: any;
  title: string;
  description: string;
}

export default function SocialButtons({ url, title, description }: Props) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {/* Facebook */}
      <FacebookShareButton url={url} quote={description} hashtag="#nextshare">
        <FacebookIcon size={50} round />
      </FacebookShareButton>

      {/* Messenger */}
      <FacebookMessengerShareButton url={url} appId="YOUR_FACEBOOK_APP_ID">
        <FacebookMessengerIcon size={50} round />
      </FacebookMessengerShareButton>

      
      {/* Telegram */}
      <TelegramShareButton url={url} title={title}>
        <TelegramIcon size={50} round />
      </TelegramShareButton>

      {/* Twitter (X) */}
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={50} round />
      </TwitterShareButton>

      {/* SMS */}
      <a href={`sms:?body=${encodeURIComponent(`${title} - ${url}`)}`}>
        <button className="bg-green-600 text-white p-2 py-2 rounded-full cursor-pointer">
            <MailIcon size={30} />
        </button>
      </a>

      {/* Copy URL */}
      <button
        onClick={handleCopy}
        className="bg-gray-700 text-white p-2 rounded-full cursor-pointer"
      >
        <Copy size={30} />
      </button>
    </div>
  );
}

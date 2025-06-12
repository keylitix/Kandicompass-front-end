'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from '@/components/ui/dialog';
import { GradientButton } from '../custom-ui/GradientButton';
import { FB_ICON, GOOGLE_ICON } from '@/lib/variables';
import Image from 'next/image';
import { useFirebaseAuth } from '@/context/AuthContext';

interface SocialLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SocialLoginModal: React.FC<SocialLoginModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { loginWithGoogle, loginWithFacebook } = useFirebaseAuth();

  const handleLogin = async (provider: 'google' | 'facebook') => {
    try {
      if (provider === 'google') {
        await loginWithGoogle();
      } else {
        await loginWithFacebook();
      }
      onClose();
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogOverlay className="backdrop-blur-xl fixed inset-0 z-50 pointer-events-none" />
      <DialogContent className="max-w-sm text-center [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Continue with</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <GradientButton
            onClick={() => handleLogin('google')}
            className="flex items-center gap-2"
          >
            <span className="flex items-center gap-2 pl-[20%]">
              <Image src={GOOGLE_ICON} alt="Google Icon" width={22} height={22} />
              <span>Continue with Google</span>
            </span>
          </GradientButton>

          <GradientButton
            onClick={() => handleLogin('facebook')}
            className="flex items-center gap-2"
          >
            <span className="flex items-center gap-2 pl-[20%]">
              <Image src={FB_ICON} alt="Facebook Icon" width={22} height={22} />
              <span>Continue with Facebook</span>
            </span>
          </GradientButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialLoginModal;

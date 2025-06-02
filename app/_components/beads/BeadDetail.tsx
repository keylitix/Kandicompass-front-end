import { Bead } from '@/app/types/common';
import {
  MapPin,
  Star,
  MessageCircle,
  History,
  Share2,
  ChevronDown,
  ChevronUp,
  User,
  Clock,
  Globe,
  Share2Icon,
  QrCode,
  ShoppingBag,
} from 'lucide-react';
import { useState } from 'react';
import { OwnershipTimeline } from './OwnershipTimeline';
import { StoryList } from '../story/StoryList';
import { GradientButton } from '../custom-ui/GradientButton';
import { useParams, useRouter } from 'next/navigation';
import { useGetBeadByIdQuery } from '@/redux/api/beadApi';
import Image from 'next/image';
import { CORE_BACKEND_URL } from '@/helper/path';
import WorldMap from '../Charms/world-map';
import { DEFAULT_IMAGE } from '@/lib/variables';
import BeadPurchaseRQ from '../modal/BeadPurchaseRQ';
import ViewQrCodeModal from '../modal/view-qr-code';
import { useBeadPurchaseRequestMutation } from '@/redux/api/thredApi';
import { useAppSelector } from '@/app/hook/useReduxApp';

interface BeadDetailProps {
  bead: any;
}

export const BeadDetail: React.FC<BeadDetailProps> = ({ bead }) => {
  const [activeTab, setActiveTab] = useState<
    'history' | 'stories' | 'reviews'
  >('history');
  const [isRotating, setIsRotating] = useState(true);
  const [isBeadPurchaseRQOpen, setIsBeadPurchaseRQOpen] = useState(false);
  const router = useRouter();
  const [showQrCode, setBeadQrCode] = useState(false);
  const [qrCode, setQrCode] = useState<{
    qrCode: string | null;
    name: string;
  }>({ qrCode: null, name: '' });
  const { user } = useAppSelector((state) => state.auth);


  console.log('beadbeadbeadbeadbeadbeadbead', bead);

  // Calculate the average rating
  const averageRating = bead.reviews.length
    ? bead.reviews.reduce((sum: any, review: any) => sum + review.rating, 0) /
    bead.reviews.length
    : 0;

  // Get the current owner
  const currentOwner =
    bead.ownershipHistory.length > 0
      ? bead.ownershipHistory[bead.ownershipHistory.length - 1]
      : null;

  const locations = bead.ownerId.map((owner: any, index: number) => ({
    id: index + 1,
    title: owner.location.city + ', ' + owner.location.country,
    lat: owner.location.lat,
    lng: owner.location.lon
  }))


  const handleCloseBeadPurchaseRQ = async () => {
    setIsBeadPurchaseRQOpen(false);
  };



  return (
    <div className="max-w-6xl mx-auto bg-[#1c102b] mt-8 backdrop-blur-md rounded-xl overflow-hidden border border-[#3f2e6a] border-opacity-20 shadow-lg">
      {/* Hero section with bead image and basic info */}
      <div className="relative md:flex">
        {/* Bead 3D visualization */}
        <div className="relative w-full md:w-2/5 h-64 md:h-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-[#00D1FF] opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`relative w-40 h-40 rounded-full overflow-hidden 
                        ${isRotating ? 'animate-rotate-slow' : ''} border-2 border-[#00D1FF] shadow-lg`}
              onClick={() => setIsRotating(!isRotating)}
            >
              <Image
                fill
                unoptimized
                src={
                  bead.thumbnail
                    ? `${CORE_BACKEND_URL}${bead?.thumbnail}`
                    : DEFAULT_IMAGE
                }
                alt={bead.beadName || 'Bead'}
                className="w-full h-full object-cover"
              />

              {/* Energy aura effect */}
              <div className="absolute inset-0 border-4 border-[#00D1FF] rounded-full opacity-30 animate-pulse-slow"></div>
            </div>
          </div>

          {/* Rotation control button */}
          <button
            className="absolute bottom-4 right-4 bg-[#1c102b] bg-opacity-60 p-2 rounded-full text-[#00D1FF] 
                     hover:bg-[#00D1FF] hover:text-white transition-colors"
            onClick={() => setIsRotating(!isRotating)}
          >
            {isRotating ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        </div>

        {/* Bead information */}
        <div className="p-6 md:w-3/5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold">{bead.beadName}</h1>
              <div className="flex items-center mt-1 text-sm">
                <Clock size={16} className="mr-1" />
                <span>
                  Created {new Date(bead.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Type badge */}
            <span className="text-sm bg-[#00D1FF] bg-opacity-20 px-3 py-1 rounded-full text-[#2a1a3d]">
              {bead.type}
            </span>
          </div>

          <p className="text-[#8a86a0] mb-6">{bead.description}</p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {/* Value */}
            <div className="bg-[#2a1a3d] bg-opacity-40 rounded-lg p-3 text-center">
              <div className="text-[#00D1FF] text-xl font-semibold">
                ${bead?.pricePerUnit}
              </div>
              <div className="text-xs text-[#8a86a0] mt-1">Current Value</div>
            </div>

            {/* Rating */}
            <div className="bg-[#2a1a3d] bg-opacity-40 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center text-[#FF005D] text-xl font-semibold">
                {averageRating ? averageRating.toFixed(1) : '—'}
                <Star size={16} className="ml-1" />
              </div>
              <div className="text-xs text-[#8a86a0] mt-1">Rating</div>
            </div>

            {/* Owners */}
            <div className="bg-[#2a1a3d] bg-opacity-40 rounded-lg p-3 text-center">
              <div className="text-[#00D1FF] text-xl font-semibold">
                {bead.ownershipHistory.length}
              </div>
              <div className="text-xs text-[#8a86a0] mt-1">Owners</div>
            </div>

            {/* Stories */}
            <div className="bg-[#2a1a3d] bg-opacity-40 rounded-lg p-3 text-center">
              <div className="text-[#00D1FF] text-xl font-semibold">
                {bead.stories.length}
              </div>
              <div className="text-xs text-[#8a86a0] mt-1">Stories</div>
            </div>
          </div>

          {/* Current owner */}
          {currentOwner && (
            <div className="flex items-center mb-6">
              <div className="mr-3 w-10 h-10 rounded-full overflow-hidden border border-[#00D1FF]">
                <img
                  src={currentOwner.userAvatar}
                  alt={currentOwner.userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm text-[#8a86a0]">Current Owner</div>
                <div className="text-[#00D1FF] font-medium">
                  {currentOwner.userName}
                </div>
              </div>
              <div className="ml-auto flex items-center text-sm text-[#FF005D]">
                <MapPin size={16} className="mr-1 text-[#00D1FF]" />
                <span>{currentOwner.location.name}</span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <GradientButton
              variant="outline"
              icon={ShoppingBag}
              onClick={() => setIsBeadPurchaseRQOpen(true)}
            >Request to Buy</GradientButton>

            <GradientButton
              variant="outline"
              icon={Share2Icon}
              onClick={() => router.push(`/social-share/beads/${bead._id}?from=${encodeURIComponent(window.location.href)}`)}
            > Share Bead</GradientButton>

            <GradientButton
              onClick={() => {
                setQrCode({ qrCode: bead.qrCode, name: bead.beadName });
                setBeadQrCode(!showQrCode);
              }}
              variant="outline" icon={QrCode}>
              Show QR Code
            </GradientButton>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="px-6 border-b border-[#3f2e6a] border-opacity-20">
        <div className="flex overflow-x-auto scrollbar-none">
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'history' ? 'border-[#00D1FF] text-[#00D1FF]' : 'border-transparent text-[#FF005D]'}`}
            onClick={() => setActiveTab('history')}
          >
            Ownership History
          </button>
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'stories' ? 'border-[#00D1FF] text-[#00D1FF]' : 'border-transparent text-[#FF005D]'}`}
            onClick={() => setActiveTab('stories')}
          >
            Stories
          </button>
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-[#00D1FF] text-[#00D1FF]' : 'border-transparent text-[#FF005D]'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'history'  && (
          <div>
            <h3 className="text-xl font-semibold text-[#00D1FF] mb-4">
              Ownership Timeline
            </h3>
            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <OwnershipTimeline ownershipHistory={bead.ownerId} />
              </div>
              <div className="flex-1">
                <WorldMap locations={locations} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stories' && (
          <div>
            <h3 className="text-xl font-semibold text-[#00D1FF] mb-4">
              Bead Stories
            </h3>
            {bead.stories.length > 0 ? (
              <StoryList stories={bead.stories} />
            ) : (
              <p className="text-[#8a86a0] italic">
                No stories have been shared about this bead yet.
              </p>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h3 className="text-xl font-semibold text-[#00D1FF] mb-4">
              Bead Reviews
            </h3>
            {bead.reviews.length > 0 ? (
              <div className="space-y-4">
                {bead.reviews.map((review: any) => (
                  <div
                    key={review.id}
                    className="bg-[#2a1a3d] bg-opacity-30 rounded-lg p-4"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-[#00D1FF] mr-3">
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-[#00D1FF]">
                          {review.userName}
                        </div>
                        <div className="text-xs text-[#FF005D]">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="ml-auto flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < review.rating
                                  ? 'text-[#FF005D]'
                                  : 'text-[#FF005D] opacity-30'
                              }
                              fill={i < review.rating ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-[#00D1FF]">{review.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#8a86a0] italic">
                No reviews yet. Be the first to review this bead!
              </p>
            )}
          </div>
        )}
      </div>
      <BeadPurchaseRQ
        isOpen={isBeadPurchaseRQOpen}
        onClose={handleCloseBeadPurchaseRQ}
        beadName={bead.beadName}
        currentPrice={bead?.pricePerUnit}
        threadId={bead.threadId[0]._id}
        beadId={bead._id}
        buyerId={user.id }
      />

      <ViewQrCodeModal
        isOpen={showQrCode}
        onClose={() => {
          setBeadQrCode(false);
        }}
        qrURL={qrCode.qrCode ?? ''}
        title={qrCode.name ?? ''}
      />
    </div >
  );
};

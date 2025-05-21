'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetBeadsQuery } from '@/redux/api/beadApi';
import { QrCode, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

const Home = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredBead, setHoveredBead] = useState<string | null>(null);
  const router = useRouter();

  const {
    data: beadsResponse,
    isLoading,
    isError,
  } = useGetBeadsQuery({
    page_number: 1,
    page_size: 10,
  });

  const beads = beadsResponse?.data || [];

  const handleToggle = () => {
    setVisibleCount(isExpanded ? 3 : beads.length);
    setIsExpanded(!isExpanded);
  };

  const handleNavigate = (id: string) => {
    router.push(`/dashboard/charms/${id}`);
  };

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <Card
              key={i}
              className="bg-gray-800/50 border-gray-700 rounded-lg overflow-hidden w-full max-w-[320px] mx-auto"
            >
              <Skeleton className="h-[200px] w-full rounded-t-lg" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4 mx-auto rounded-full" />
                <Skeleton className="h-9 w-full mt-3 rounded-md" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Card className="bg-red-900/20 border-red-700/50 max-w-md mx-auto">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-red-400 mb-3">
              Error Loading Beads
            </h2>
            <Button
              variant="outline"
              className="text-white border-white/70 hover:bg-white/10"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Your Bead Inventory
        </h1>
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
          Manage your bead collection with ease
        </p>
        <Badge
          variant="outline"
          className="mt-3 bg-gray-800/50 text-gray-300 border-gray-600 text-xs sm:text-sm p-3"
        >
          Total: {beads.length} beads
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
        {beads.slice(0, visibleCount).map((bead: any) => (
          <Card
            key={bead._id}
            className="bg-gray-800/50 border-gray-700 hover:border-pink-500/70 transition-all duration-300 w-full max-w-[320px] shadow-md hover:shadow-lg hover:shadow-pink-500/10"
          >
            <div
              className="relative h-[200px] w-full overflow-hidden"
              onMouseEnter={() => setHoveredBead(bead._id)}
              onMouseLeave={() => setHoveredBead(null)}
            >
              {bead.avatar ? (
                <Image
                  src={`https://kandi-backend.cradle.services/${bead.avatar}`}
                  alt={bead.beadName}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">
                    No Image Available
                  </span>
                </div>
              )}

              {bead.qrCode && hoveredBead === bead._id && (
                <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 transition-opacity duration-300">
                  <div className="bg-white p-3 rounded-lg flex flex-col items-center">
                    <Image
                      src={`https://kandi-backend.cradle.services/${bead.qrCode}`}
                      width={120}
                      height={120}
                      alt="QR Code"
                      className="object-contain"
                    />
                    <p className="text-black mt-2 text-xs sm:text-sm font-medium">
                      Scan QR Code
                    </p>
                  </div>
                  <QrCode className="text-white mt-3 animate-pulse" size={20} />
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <h3 className="text-white font-semibold text-base sm:text-lg text-center line-clamp-2">
                {bead.beadName}
              </h3>
              {bead.category && (
                <div className="flex justify-center mt-2">
                  <Badge
                    variant="secondary"
                    className="bg-pink-500/20 text-pink-300 text-xs"
                  >
                    {bead.category}
                  </Badge>
                </div>
              )}
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button
                onClick={() => handleNavigate(bead._id)}
                variant="outline"
                className="w-full bg-transparent text-white border-white/70 hover:bg-gradient-to-r hover:from-pink-500/80 hover:to-blue-500/80 hover:border-transparent text-sm py-6"
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {beads.length > 3 && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="bg-transparent text-white border-white/70 hover:bg-gradient-to-r hover:from-pink-500/80 hover:to-blue-500/80 hover:border-transparent text-sm sm:text-base px-5 py-2"
            onClick={handleToggle}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Show All
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;

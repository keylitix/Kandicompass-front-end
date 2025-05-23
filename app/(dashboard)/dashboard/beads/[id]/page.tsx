'use client';
import { BeadDetail } from '@/app/_components/beads/BeadDetail';
// import { mockBeads } from '@/app/_components/dashboard/YourThreads';
import { Bead } from '@/app/types/common';
import { useGetBeadByIdQuery } from '@/redux/api/beadApi';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const BeadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: beadData, isLoading: beadLoading } = useGetBeadByIdQuery(id);
  const [_, setBead] = useState<Bead | null>(null);
  const [loading, setLoading] = useState(true);

  const bead = Array.isArray(beadData?.data) ? beadData.data[0] : [];

  console.log('bead', bead);

  useEffect(() => {
    // Simulate API call
    const fetchBead = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        const foundBead = null;

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (foundBead) {
          setBead(foundBead);
        }
      } catch (error) {
        console.error('Error fetching bead:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBead();
  }, [id]);

  if (beadLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-slow text-cosmic-glow">
          <div className="w-16 h-16 border-4 border-cosmic-glow border-t-transparent rounded-full animate-rotate-slow"></div>
        </div>
      </div>
    );
  }

  if (!bead) {
    return (
      <div className="bg-cosmic-card backdrop-blur-md rounded-xl overflow-hidden border border-cosmic-glow border-opacity-20 p-8 text-center">
        <h2 className="text-xl font-semibold text-cosmic-accent mb-2">
          Bead Not Found
        </h2>
        <p className="text-cosmic-text-secondary mb-4">
          The bead you're looking for does not exist or has been transferred to
          another dimension.
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-cosmic-accent text-white px-4 py-2 rounded-lg hover:bg-cosmic-glow transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return <BeadDetail bead={bead} />;
};

export default BeadDetailPage;

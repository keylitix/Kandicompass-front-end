"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGetBeadsQuery } from "@/redux/api/beadApi";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { QrCode, MapPin, DollarSign } from "lucide-react";
import dynamic from "next/dynamic";
import WorldMap from "@/app/_components/Charms/world-map";

// Dynamically import the LeafletMap component to avoid SSR issues
const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-gray-800 rounded-lg animate-pulse" />,
});

const BeadPage = () => {
    const params = useParams();
    const [filteredBead, setFilteredBead] = useState<any>(null);

    const { data: beadsResponse, isLoading, isError } = useGetBeadsQuery({
        page_number: 1,
        page_size: 100,
    });

    const beads = beadsResponse?.data || [];
    const beadId = Array.isArray(params.charmsId) ? params.charmsId[0] : params.charmsId;
    const defaultCenter: [number, number] = [28.6139, 77.2090];

    useEffect(() => {
        if (beads.length > 0 && beadId) {
            const foundBead = beads.find((bead) => bead._id === beadId);
            setFilteredBead(foundBead);
        }
    }, [beads, beadId]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 min-h-screen">
                <div className="flex flex-col items-center gap-8">
                    <Skeleton className="h-12 w-3/4 max-w-2xl" />
                    <Skeleton className="h-6 w-full max-w-3xl" />
                    <Skeleton className="w-full h-64 md:h-96 rounded-lg" />
                    <Skeleton className="w-full max-w-4xl h-16 rounded-lg" />
                    <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
                        <Skeleton className="w-full md:w-64 h-64 rounded-lg" />
                        <div className="flex-1 space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="h-6 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-6 max-w-md text-center">
                    <h2 className="text-xl font-bold text-red-400 mb-3">Error Loading Bead</h2>
                    <Button
                        variant="outline"
                        className="text-white border-white/70 hover:bg-white/10"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    if (!filteredBead) {
        return (
            <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 max-w-md text-center">
                    <h2 className="text-xl font-bold text-white mb-3">Bead Not Found</h2>
                    <p className="text-gray-300 mb-4">
                        The bead you're looking for doesn't exist or may have been removed.
                    </p>
                    <Button
                        variant="outline"
                        className="text-white border-white/70 hover:bg-white/10"
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto py-6 sm:py-8 min-h-screen">
            {/* Header Section */}
            <div className="container w-full mx-auto text-center mb-8 md:mb-12 px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text font-orbitron mb-4">
                    Journey of Your Charm
                </h1>
                <p className="text-sm text-gray-300 lg:max-w-[75%] mx-auto">
                    {filteredBead.description || "No description available"}
                </p>
            </div>

            <div className="container mx-auto flex flex-col lg:flex-row-reverse justify-evenly items-start gap-18 md:gap-8 px-4">
                {/* Right Section: World Map (shows on top in mobile view) */}
                <div className="w-full lg:w-[30%]">
                    <WorldMap />
                </div>

                {/* Left Section: Bead Image and Details */}
                <div className="w-full lg:w-[60%] flex flex-col justify-center gap-8">
                    <div className="w-full flex flex-col gap-6 lg:gap-12 justify-center">
                        {/* Bead Image Section */}
                        <div className="w-full lg:w-[90%] relative rounded-none overflow-hidden border-0 border-gray-700 h-50 lg:h-80 bg-[#D9D9D9]/10">
                            {filteredBead.avatar ? (
                                <Image
                                    src={`https://kandi-backend.cradle.services/${filteredBead.avatar}`}
                                    alt={filteredBead.beadName || "Bead image"}
                                    fill
                                    className="object-contain hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex flex-col items-center justify-center p-4">
                                    <QrCode className="h-12 w-12 text-gray-500 mb-2" />
                                    <p className="text-gray-400 text-center">No image available</p>
                                </div>
                            )}
                        </div>

                        {/* Bead Details Section */}
                        <div className="lg:w-[90%]">
                            <div className="w-full lg:w-[80%] mx-auto space-y-4 text-white">
                                <div className="flex">
                                    <span className="w-1/2 flex justify-between">Bead Name<span>:</span></span>
                                    <span className="w-1/2 text-end">{filteredBead.beadName || "Royal Sapphire"}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-1/2 flex justify-between">Miles Travelled<span>:</span></span>
                                    <span className="w-1/2 text-end">1,500 miles</span>
                                </div>
                                <div className="flex">
                                    <span className="w-1/2 flex justify-between">Total Hands-off<span>:</span></span>
                                    <span className="w-1/2 text-end">6</span>
                                </div>
                                <div className="flex">
                                    <span className="w-1/2 flex justify-between">Locations Visited<span>:</span></span>
                                    <span className="w-1/2 text-end">5 Locations</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable component for detail cards (not currently used)
const DetailCard = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}) => (
    <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-3">
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            {icon}
            <span>{label}</span>
        </div>
        <div className="text-white font-medium text-lg">{value}</div>
    </div>
);

export default BeadPage;

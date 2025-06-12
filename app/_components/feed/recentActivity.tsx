import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users } from 'lucide-react';

interface RecentActivityProps {
  recentBeads: any[];
  onViewBead: (beadId: string) => void;
}

export function RecentActivity({ recentBeads, onViewBead }: RecentActivityProps) {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <Card className="glass-card border-white/20 sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentBeads.map(bead => {
          const latestEntry = bead.thread[bead.thread.length - 1];
          const ownerCount = new Set(bead.thread.map((entry: any) => entry.userId)).size;
          
          return (
            <div
              key={bead.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
              onClick={() => onViewBead(bead.id)}
            >
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={latestEntry.userAvatar} alt={latestEntry.userName} />
                  <AvatarFallback className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white text-sm">
                    {latestEntry.userInitials}
                  </AvatarFallback>
                </Avatar>
                {bead.image && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full overflow-hidden border-2 border-white/20">
                    <img src={bead.image} alt={bead.name} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-white text-sm truncate">
                    {latestEntry.userName}
                  </span>
                  <Badge variant="secondary" className="bg-white/10 text-white text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    {ownerCount}
                  </Badge>
                </div>
                
                <p className="text-white/80 text-sm font-medium truncate mb-1">
                  {bead.name}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span>{formatTimeAgo(latestEntry.timestamp)}</span>
                  {latestEntry.location && (
                    <>
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{latestEntry.location.address}</span>
                    </>
                  )}
                </div>
                
                {latestEntry.message && (
                  <p className="text-white/70 text-xs mt-1 line-clamp-2">
                    {latestEntry.message}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
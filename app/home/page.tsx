'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Scan, Sparkles, Users, LogIn, Home, Compass } from 'lucide-react';
// import { CreateBeadData, Bead, ThreadEntry } from '../../types';
import { FeedPage } from '../_components/feed/feedPage';



const HomePage: React.FC = () => {
  // const { isAuthenticated, isAdmin, user } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentTab, setCurrentTab] = useState('feed');

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList className="bg-white/10 border border-white/20">
          <TabsTrigger value="feed" className="text-white data-[state=active]:bg-white/20">
            <Home className="w-4 h-4 mr-2" />
            Feed
          </TabsTrigger>
          <TabsTrigger value="explore" className="text-white data-[state=active]:bg-white/20">
            <Compass className="w-4 h-4 mr-2" />
            Explore Beads
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed">
          <FeedPage onViewBead={() => {}} />
        </TabsContent>

        <TabsContent value="explore">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBeads.map(bead => (
              <BeadCard
                key={bead.id}
                bead={bead}
                onViewDetails={onViewBead}
              />
            ))}
          </div> */}
          <></>
        </TabsContent>

          
      </Tabs>
    </div>
  );
}

export default HomePage;
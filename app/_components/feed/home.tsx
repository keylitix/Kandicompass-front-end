'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Scan, Sparkles, Users, LogIn, Home, Compass } from 'lucide-react';
import { FeedPage } from '../feed/feedPage';
import { useGetExploreBeadsQuery } from '@/redux/api/beadApi';
import { BeadCard } from '../beads/BeadCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HomeScreen: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentTab, setCurrentTab] = useState('feed');
  const { data: exploreBeads, isLoading } = useGetExploreBeadsQuery();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, x: currentTab === 'feed' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: currentTab === 'feed' ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="feed">
                <FeedPage onViewBead={() => {}} />
              </TabsContent>

              <TabsContent value="explore">
                <motion.div 
                  className="mb-6 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-xl font-semibold text-white">Explore Most Traveled Beads</h2>
                  <p className="text-sm text-white/70">
                    Publicly available beads shared by the community. Scan the QR to view and follow their journey.
                  </p>
                </motion.div>

                {isLoading ? (
                  <div className="text-center text-white/70">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5] 
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 1.5 
                      }}
                    >
                      Loading beads...
                    </motion.div>
                  </div>
                ) : exploreBeads && exploreBeads.beads.length > 0 ? (
                  <motion.div 
                    ref={ref}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                  >
                    {exploreBeads.beads.map((bead: any, index: number) => (
                      <motion.div 
                        key={bead._id} 
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.03,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <BeadCard bead={bead} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    className="text-center text-white/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    No public beads found.
                  </motion.div>
                )}
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </div>
  );
}

export default HomeScreen;

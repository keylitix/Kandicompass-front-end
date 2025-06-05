'use client';
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Charms from '../_components/Charms/Charms';
import Deals from '../_components/Deals/Deals';
import HomeOne from '../_components/Home/HomeOne';
import Process from '../_components/Process/Process';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <div className='mb-[100px]'>
      {/* <Navbar /> */}
      <HomeOne />
      <Process />
      {/* <Deals /> */}
      <Charms/>
    {/* <Footer/> */}
    </div>
  );
}

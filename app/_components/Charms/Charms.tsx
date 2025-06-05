'use client';
import './Charms.css';
import ring from '../../../public/ring4.svg';
import ring5 from '../../../public/ring5.svg';
import Image from 'next/image';
import React from 'react';
const Charms = () => {

  const [isHovered, setIsHovered] = React.useState('');

  const renderShopNowButton = () => {
    return (
      <div className="w-full h-full flex items-center justify-center blur-effect transition-all duration-300 ease-in-out">
        <button onClick={() => {
          window.open("https://kandicompass.com/", "_blank");
        }} className="firstChild1Button absolute text-white cursor-pointer">
          SHOP NOW
        </button>
      </div>
    );
  }
  return (
    <div className="charmsMain">
      <div className='flex justify-center items-center flex-col'>
        <h3 className="charmsMainH3">Charms in Action</h3>
      </div>

      <div className="charmsMainCard flex items-center justify-center gap-12 pt-20">

        <div
          className="firstChild flex flex-col gap-5">
          <div
            onMouseEnter={() => setIsHovered('firstChild1-1')}
            onMouseLeave={() => setIsHovered('')}
            className="firstChild1 flex items-cener justify-center relative">
            <Image
              src={ring}
              alt="ring"
              width={220}
              height={248}
              className=" absolute top-8"
            />
            {isHovered === 'firstChild1-1' && renderShopNowButton()}
            <div className="absolute bottom-6 text-gray-600 ">
              <h3>RainBow Hear</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
            </div>
          </div>

          <div
            onMouseEnter={() => setIsHovered('firstChild1-2')}
            onMouseLeave={() => setIsHovered('')}
            className="secondChild2 text-white flex flex-col items-center relative">
            <Image src={ring} alt="ring" width={262} height={122} className='absolute top-8' />
            {isHovered === 'firstChild1-2' && renderShopNowButton()}
            <div className='absolute bottom-6 text-gray-600'>
              <h3>RainBow Hear</h3>
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
              </p>
            </div>
          </div>
        </div>

        <div
          onMouseEnter={() => setIsHovered('secondChild')}
          onMouseLeave={() => setIsHovered('')}
          className="secondChild text-white flex flex-col items-center justify-around relative">
          <Image src={ring5} alt="ring" width={262} height={258} className='absolute top-[80px]' />
          {isHovered === 'secondChild' && renderShopNowButton()}
          <div className='absolute top-12 text-gray-600 top-[300px]'>
            <h3>RainBow Hear</h3>
            <p className="text-[14px] w-50 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
            </p>
          </div>
        </div>

        <div className="thiirdChild flex flex-col gap-5">

          <div
            onMouseEnter={() => setIsHovered('thiirdChild1-1')}
            onMouseLeave={() => setIsHovered('')}
            className="thiirdChild1 text-white flex flex-col items-center relative">
            <Image src={ring} alt="ring" width={262} height={122} className='absolute top-8' />
            {isHovered === 'thiirdChild1-1' && renderShopNowButton()}
            <div className='absolute bottom-6 text-gray-600'>
              <h3>RainBow Hear</h3>
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
              </p>
            </div>
          </div>

          <div
            onMouseEnter={() => setIsHovered('thiirdChild2-2')}
            onMouseLeave={() => setIsHovered('')}
            className="thiirdChild2 text-white flex flex-col items-center relative">
            <Image src={ring} alt="ring" width={262} height={122} className='absolute top-8' />
            {isHovered === 'thiirdChild2-2' && renderShopNowButton()}
            <div className='absolute bottom-6 text-gray-600'>
              <h3>RainBow Hear</h3>
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* <div className="charmsBottom">
        <h3 className="pt-32">Stay in Touch</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.{' '}
        </p>

        <div className="charmsBottomInput text-center mt-4">
          <input type="text" />
          <button>Subscribe</button>
        </div>
      </div> */}
    </div>
  );
};

export default Charms;

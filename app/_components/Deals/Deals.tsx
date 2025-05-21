// import "./Deals.css"

// import Cart from "../../../public/cart.svg"
// import Gift from "../../../public/gift.svg"
// import Percantage from "../../../public/percentage.svg"
// import Image from "next/image"

// const dealsData=[
//     {
//         image:Gift,
//         text:"Buy 2 Get 1 Free on Charms!",
//         button:"claim now"
//     },
//     {
//         image:Percantage,
//         text:"20% Off All Charms This Week!",
//         button:"claim now"
//     },
//     {
//         image:Cart,
//         text:"Free Shipping on Orders Over $30!",
//         button:"claim now"
//     }
// ]
// const Deals = () => {
//     return (
//         <div className="dealsMain">
//             <p className="dealsMainP text-center pt-12">Current Deals</p>
//             <div className="flex items-center justify-center w-full gap-56 pt-8">
//            {
//             dealsData.map((item,index)=>(
//                 <div className="dealsMainItem">
//                 <Image src={item.image} alt="logo" width={260} height={181} />
//                 <div className="flex flex-col gap-3 items-center">
//                     <p className="dealsMainItemP pt-4 p-4 font-semibold">{item.text}</p>
//                     <button className="dealsMainItemButton capitalize">{item.button}</button>
//                 </div>
//             </div>
//             ))
//            }
//             </div>
//         </div>
//     )
// }

// export default Deals

import './Deals.css';
import Cart from '../../../public/cart.svg';
import Gift from '../../../public/gift.svg';
import Percantage from '../../../public/percentage.svg';
import Image from 'next/image';

const dealsData = [
  {
    image: Gift,
    text: 'Buy 2 Get 1 Free on Charms!',
    button: 'claim now',
  },
  {
    image: Percantage,
    text: '20% Off All Charms This Week!',
    button: 'claim now',
  },
  {
    image: Cart,
    text: 'Free Shipping on Orders Over $30!',
    button: 'claim now',
  },
];

const Deals = () => {
  return (
    <div className="dealsMain w-full min-h-[524px] py-12 px-4 sm:px-6 lg:px-8">
      <p className="dealsMainP text-center pt-12 pb-8 text-3xl sm:text-4xl md:text-5xl lg:text-[46px]">
        Current Deals
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 lg:gap-14 xl:gap-56 pt-8">
        {dealsData.map((item, index) => (
          <div
            key={index}
            className="dealsMainItem w-full max-w-[260px] h-[329px] bg-[#170F24] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-center pt-6">
              <Image
                src={item.image}
                alt="logo"
                width={180}
                height={126}
                className="w-[180px] h-auto"
              />
            </div>
            <div className="flex flex-col gap-3 items-center p-4">
              <p className="dealsMainItemP pt-4 font-semibold text-center text-sm sm:text-base md:text-lg">
                {item.text}
              </p>
              <button className="dealsMainItemButton capitalize w-[153px] h-[42px] bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-md text-white font-medium transition-colors duration-300">
                {item.button}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;

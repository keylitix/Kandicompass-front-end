// import Image from "next/image";
// import "./Process.css";
// import BorderLogo from "../../../public/borderImg.svg";
// import UploadingLogo from "../../../public/UploadingBordr.svg";
// import UserLogo from "../../../public/UserBorder.svg";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// import { Card, CardContent } from "@/components/ui/card";
// import ring1 from "../../../public/ring1.svg";
// import ring2 from "../../../public/ring2.svg";

// const imageData = [
//     {
//         id: 1,
//         image: ring1,
//         text: "Rainbow Star",
//         desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacinia elit. Nulla at ante vel leo feugiat vehicula."
//     },
//     {
//         id: 2,
//         image: ring2,
//         text: "Cosmic Shine",
//         desc: "Sed sit amet lacinia elit. Nulla at ante vel leo feugiat vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//     },
//     {
//         id: 3,
//         image: ring1, // You can replace with a new image if needed
//         text: "Moonlight Glow",
//         desc: "Nulla at ante vel leo feugiat vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacinia elit."
//     },
//     {
//         id: 4,
//         image: ring2,
//         text: "Starlight Dream",
//         desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacinia elit. Nulla at ante vel leo feugiat vehicula."
//     },
//     {
//         id: 5,
//         image: ring1, 
//         text: "Nebula Twist",
//         desc: "Sed sit amet lacinia elit. Nulla at ante vel leo feugiat vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//     },
//     {
//         id: 6,
//         image: ring2,
//         text: "Galactic Vibe",
//         desc: "Nulla at ante vel leo feugiat vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacinia elit."
//     },
//     {
//         id: 7,
//         image: ring1,
//         text: "Solar Flare",
//         desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacinia elit. Nulla at ante vel leo feugiat vehicula."
//     }
// ];


// const Process = () => {
//     return (
//         <div className="Processmain flex flex-col  justify-center items-center gap-5">
//             <div className="ProcessmainFirstSec">
//                 <p className="text-white text-center">How It Works</p>
//                 <p className="text-center">Three-Step Process</p>
//             </div>
//             <div className="ProcessmainSecondSec flex justify-between items-center w-100">
//                 <div className="flex flex-col items-center gap-7">
//                     <Image alt="qrLogo" width={160.5} height={160.5} src={BorderLogo} />
//                     <p>Buy/Scan a Kandi/Charm</p>
//                 </div>
//                 <div className="flex flex-col items-center gap-7">
//                     <Image alt="qrLogo" width={160.5} height={160.5} src={UploadingLogo} />
//                     <p>Share Your <br /> Story</p>
//                 </div>
//                 <div className="flex flex-col items-center gap-7">
//                     <Image alt="qrLogo" width={160.5} height={160.5} src={UserLogo} />
//                     <p>Follow Its <br /> Journey</p>
//                 </div>
//             </div>
//            <div className="pt-24">
//            <button className="flex items-center justify-center processbuttton">
//                 <p className="text-white">Explore Our Charms</p>
//             </button>
//            </div>
//             <div className="w-[1100px] mt-4 pb-10">
//                 <Carousel className="w-[1100px]">
//                     <CarouselContent className="-ml-1 flex gap-20">
//                         {imageData.map((item, index) => (
//                             <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4">
//                                 <div className="p-1">
//                                     <Image src={item.image} width={358} height={236} alt="ring" />
//                                     <h2 className="text-white text-center text-[24px] font-[600] leading-[52px]">{item.text}</h2>
//                                     <p className="text-white text-center text-[16px] font-[500] leading-[24px]">{item.desc}</p>
//                                 </div>
//                             </CarouselItem>
//                         ))}
//                     </CarouselContent>
//                 </Carousel>
//             </div>
//         </div>
//     );
// };

// export default Process;




import Image from "next/image";
import BorderLogo from "../../../public/borderImg.svg";
import UploadingLogo from "../../../public/UploadingBordr.svg";
import UserLogo from "../../../public/UserBorder.svg";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import ring1 from "../../../public/ring1.svg";
import ring2 from "../../../public/ring2.svg";

const imageData = [
    {
        id: 1,
        image: ring1,
        text: "Rainbow Star",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacinia elit. Nulla at ante vel leo feugiat vehicula."
    },
    {
        id: 2,
        image: ring2,
        text: "Cosmic Shine",
        desc: "Sed sit amet lacinia elit. Nulla at ante vel leo feugiat vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        id: 3,
        image: ring1, // You can replace with a new image if needed
        text: "Moonlight Glow",
        desc: "Nulla at ante vel leo feugiat vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacinia elit."
    },
    {
        id: 4,
        image: ring2,
        text: "Starlight Dream",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacinia elit. Nulla at ante vel leo feugiat vehicula."
    },
    {
        id: 5,
        image: ring1, 
        text: "Nebula Twist",
        desc: "Sed sit amet lacinia elit. Nulla at ante vel leo feugiat vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        id: 6,
        image: ring2,
        text: "Galactic Vibe",
        desc: "Nulla at ante vel leo feugiat vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacinia elit."
    },
    {
        id: 7,
        image: ring1,
        text: "Solar Flare",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacinia elit. Nulla at ante vel leo feugiat vehicula."
    }
    // ... (keep your existing imageData array)
];

const Process = () => {
    return (
        <div className="relative bg-[#170F24] flex flex-col items-center gap-5 py-10 px-4 sm:px-6 lg:px-8">
            <div className="left-spark" style={{top: "10%"}} />
            <div className="right-spark" style={{top: "40%"}} />
            {/* First Section - Heading */}
            <div className="w-full  text-center space-y-2">
                <p className="font-orbitron font-bold text-xl text-white">
                    How It Works
                </p>
                <h2 className="font-orbitron font-bold text-3xl sm:text-4xl md:text-[46px]  text-[#FF005D] text-shadow-pink">
                    Three-Step Process
                </h2>
            </div>

            {/* Second Section - Process Steps */}
            <div className="w-full max-w-[1000px] flex flex-col md:flex-row justify-between items-center gap-10 py-10">
                {[
                    { icon: BorderLogo, text: "Buy/Scan a Kandi/Charm" },
                    { icon: UploadingLogo, text: "Share Your Story" },
                    { icon: UserLogo, text: "Follow Its Journey" }
                ].map((step, index) => (
                    <div key={index} className="flex flex-col items-center gap-7">
                        <Image 
                            alt="process-step" 
                            width={160} 
                            height={160} 
                            src={step.icon} 
                            className="w-32 h-32 sm:w-40 sm:h-40"
                        />
                        <p className="w-[80%] font-orbitron  text-lg sm:text-xl md:text-2xl text-center font-[600] bg-gradient-to-r from-[#00D1FF] to-[#FF005D] bg-clip-text text-transparent">
                            {step.text}
                        </p>
                    </div>
                ))}
            </div>

            {/* Explore Button */}
            <div className="w-full max-w-[1100px] py-10">
                <button className="w-full h-[70px] bg-gradient-to-r from-[#FF005D] to-[#00D1FF] shadow-[0_0_20px_0_#FF005D] flex items-center justify-center">
                    <p className="font-orbitron font-bold text-xl sm:text-2xl md:text-[30px] leading-[54px] text-white">
                        Explore Our Charms
                    </p>
                </button>
            </div>

            {/* Carousel Section */}
            <div className="w-full max-w-[1100px] mt-4 pb-10">
                <Carousel className="w-full">
                    <CarouselContent className="-ml-1 flex gap-4 sm:gap-10">
                        {imageData.map((item) => (
                            <CarouselItem key={item.id} className="pl-1 basis-full sm:basis-1/2 lg:basis-1/4">
                                <div className="p-1 flex flex-col items-center">
                                    <Image 
                                        src={item.image} 
                                        width={358} 
                                        height={236} 
                                        alt={item.text}
                                        className="w-full h-auto max-w-[358px]"
                                    />
                                    <h2 className="text-white text-center text-xl sm:text-2xl font-semibold leading-[52px]">
                                        {item.text}
                                    </h2>
                                    <p className="text-white text-center text-sm sm:text-base font-medium leading-6 max-w-[300px]">
                                        {item.desc}
                                    </p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    
                </Carousel>
            </div>
        </div>
    );
};

export default Process;
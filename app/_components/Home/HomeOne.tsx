import Image from "next/image";
import HomeBg from "../../../public/Home1.png";
import Link from "next/link";

const HomeOne = () => {
  return (
    <div className="relative h-[calc(100vh-200px)] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={HomeBg}
        alt="Background"
        fill
        className="object-cover object-bottom"
        priority
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center bg-gradient-to-b from-black/80 to-black/0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-0">
          <div className="w-full pl-0 lg:pl-[90px] pt-[100px] lg:mt-[-100px] space-y-4">
            <h1 className="relative font-orbitron font-bold text-3xl sm:text-4xl md:text-[46px] leading-[52px] text-white">
              <span className="text-shadow-pink absolute inset-0 text-[#ff005d] z-0">
                Track Your <br /> Kandi's Journey <br /> Across the World!
              </span>
              <span className="relative bg-gradient-to-r from-[#ff005d] to-[#00D1FF] bg-clip-text text-transparent z-10">
                Track Your <br /> Kandi's Journey <br /> Across the World!
              </span>
            </h1>

            <p className="font-sans text-white font-medium text-sm sm:text-base md:text-sm">
              Discover the story of your Kandi charms as they travel <br /> across the globe. We are looking to market this more as <br /> an experience rather than the charms themselves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 pt-4">
              <Link
                href={"/sign-in"}
                className="px-3 text-white h-[51px] bg-gradient-to-r from-[#FF005D] to-[#00D1FF] font-orbitron font-semibold text-xs uppercase leading-[52px] cursor-pointer">
                Start Your Journey
              </Link>
              <Link
                href={"/dashboard/about"}
                className="w-[181px] h-[51px] font-orbitron font-semibold text-xs uppercase leading-[52px] border-2 cursor-pointer flex justify-center">
                <span className="bg-white/90 bg-clip-text text-transparent">
                  Learn More
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeOne;
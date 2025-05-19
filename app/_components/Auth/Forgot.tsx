import { Facebook, Globe, Mail } from "lucide-react";
import Link from "next/link";

export default function Forgot() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-[url('/AuthBackground.svg')] bg-cover bg-center"
      ></div>
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Main content container */}
      <div className="z-20 bg-transparent border border-white/30 rounded-lg p-6 sm:p-8 w-full max-w-[400px] mx-4 backdrop-blur-md">
        <h1 className="text-center font-semibold text-white text-2xl sm:text-[32px]">
          Forgot Password
        </h1>
        <p className="text-center text-white mt-2 text-sm sm:text-base">
          Enter the email address associated with your account, and we'll send you a link to reset your password.
        </p>

        <div className="relative w-full h-[54px] mt-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full h-full pl-4 pr-10 bg-transparent border border-white/60 rounded-sm text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/70"
          />
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <Mail className="w-5 h-5 text-white" />
          </span>
        </div>

        <button className="w-full h-[54px] mt-6 text-white cursor-pointer font-semibold border border-white/60 rounded-sm hover:bg-gradient-to-r hover:from-[#FF005D] hover:to-[#00D1FF] hover:shadow-[0_0_20px_0_rgba(249,6,214,0.7)] transition-all duration-300">
          SEND LINK
        </button>

        <p className="text-white mt-4 text-center text-sm sm:text-base">
          Remembered your Password?{' '}
          <Link href="/sign-in" className="hover:underline">
            Log In
          </Link>
        </p>

        <div className="flex items-center w-full my-4">
          <div className="border-t border-white/30 flex-grow"></div>
          <span className="mx-4 text-white">or</span>
          <div className="border-t border-white/30 flex-grow"></div>
        </div>

        <div className="flex justify-center space-x-6">
          <button className="w-10 h-10 flex items-center justify-center border border-white/60 rounded-full hover:bg-white/10 transition-colors">
            <Facebook className="w-6 h-6 text-white" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center border border-white/60 rounded-full hover:bg-white/10 transition-colors">
            <Globe className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
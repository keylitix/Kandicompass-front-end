"use client";
import { Lock, User, Facebook, Globe, Mail } from "lucide-react";
import "./SignUp.css";
import Link from "next/link";
import { useCreateUserMutation } from "@/redux/api/userApi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

export default function SignUp() {
  const [createUser, { isLoading, error }] = useCreateUserMutation();
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createUser(formData).unwrap();
      console.log('User created:', response.user);

      // Show success toast
      toast.success("Account created successfully! Redirecting to login...");

      // Navigate to sign-in page after 2 seconds to display the toast
      setTimeout(() => {
        router.push('/sign-in');
      }, 2000);
    } catch (err) {
      console.error('Signup failed:', err);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="authMain flex items-center justify-center h-screen">
      <div className="authMainFirstSec bg-transparent border border-white/30 rounded-lg p-8 w-[400px] backdrop-blur-md">
        <p className="text-center font-semibold text-white text-[32px]">Sign Up</p>
        
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative w-[350px] h-[54px] mt-6">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full h-full p-4 pl-4 pr-10 border border-white/60 rounded-sm text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white/70 placeholder-white"
              required
            />
            <span className="absolute inset-y-0 right-3 flex items-center">
              <User className="w-5 h-5 text-white" />
            </span>
          </div>

          {/* Email */}
          <div className="relative w-[350px] h-[54px] mt-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-full p-4 pl-4 pr-10 border border-white/60 rounded-sm text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white/70 placeholder-white"
              required
            />
            <span className="absolute inset-y-0 right-3 flex items-center">
              <Mail className="w-5 h-5 text-white" />
            </span>
          </div>

          {/* Password */}
          <div className="relative w-[350px] h-[54px] mt-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-full p-4 pl-4 pr-10 border border-white/60 rounded-sm text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white/70 placeholder-white"
              required
              minLength={6}
            />
            <span className="absolute inset-y-0 right-3 flex items-center">
              <Lock className="w-5 h-5 text-white" />
            </span>
          </div>

          {/* Phone Number */}
          <div className="relative w-[350px] h-[54px] mt-6">
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full h-full p-4 pl-4 pr-10 border border-white/60 rounded-sm text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white/70 placeholder-white"
            />
            <span className="absolute inset-y-0 right-3 flex items-center">
              <User className="w-5 h-5 text-white" />
            </span>
          </div>

          {/* Terms Checkbox */}
          <label className="text-white flex items-center space-x-2 mt-4">
            <input 
              type="checkbox" 
              className="accent-white" 
              required 
            />
            <span>I agree with your <Link href='/terms-and-conditions'>Terms and Conditions</Link>.</span>
          </label>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className={`authLogiButton p-4 w-[350px] h-[54px] mt-6 text-white cursor-pointer font-semibold border border-white/60 rounded-sm flex items-center justify-center transition-colors ${
              isLoading ? 'opacity-70' : 'hover:bg-white/10'
            }`}
          >
            {isLoading ? 'Creating Account...' : 'SIGN UP'}
          </button>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 mt-2 text-center">
              {('data' in error) ? 
                (error.data as { message: string }).message : 
                'Signup failed. Please try again.'}
            </p>
          )}
        </form>

        {/* Login Link */}
        <p className="text-white mt-4 text-center">
          I Have an Account?{' '}
          <Link href="/sign-in" className="underline hover:text-blue-300">
            Login
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center w-[350px] my-4">
          <div className="border-t border-white/30 flex-grow"></div>
          <span className="mx-4 text-white">or</span>
          <div className="border-t border-white/30 flex-grow"></div>
        </div>

        {/* Social Login */}
        <div className="flex justify-center space-x-6">
          <button 
            type="button"
            className="w-10 h-10 flex items-center justify-center border border-white/60 rounded-full hover:bg-white/10 transition-colors"
          >
            <Facebook className="w-6 h-6 text-white" />
          </button>
          <button 
            type="button"
            className="w-10 h-10 flex items-center justify-center border border-white/60 rounded-full hover:bg-white/10 transition-colors"
          >
            <Globe className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

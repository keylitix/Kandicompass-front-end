"use client";
import { Lock, User, Facebook, Globe } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "@/redux/api/userApi";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { setUser } from "@/redux/slice/UserSlice";

export default function SignIn() {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: 'User@gmail.com',
    password: 'User@123'
  });
  const dispatch = useDispatch<AppDispatch>();

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
      const response = await loginUser(formData).unwrap();
      if (response && response.statusCode === 201) {
        await fetch('/api/auth/set-cookie', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: response.data.token }),
        });
        dispatch(setUser(response.data));
        toast.success("Login successful! Redirecting...");
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      router.push('/dashboard');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black px-4 sm:px-6 lg:px-8">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/AuthBackground.svg')" }}
      />
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="bg-transparent border border-white/30 rounded-lg p-6 sm:p-8 backdrop-blur-md">
          <h1 className="text-center font-semibold text-white text-2xl sm:text-3xl mb-6">
            Log In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 pr-4 h-12 bg-transparent border-white/60 text-white placeholder:text-white/70 focus-visible:ring-white/70 w-full"
                  required
                  autoComplete="off"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
              </div>

              <div className="relative">
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-4 h-12 bg-transparent border-white/60 text-white placeholder:text-white/70 focus-visible:ring-white/70 w-full"
                  required
                  minLength={6}
                  autoComplete="off"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" className="border-white/60" />
                <Label htmlFor="remember-me" className="text-white cursor-pointer text-sm sm:text-base">
                  Remember me
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-white underline text-sm hover:text-blue-300 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full h-12 mt-2 text-white font-semibold border border-white/60 rounded-sm ${isLoading
                ? 'opacity-70'
                : 'hover:bg-gradient-to-r from-[#FF005D] to-[#00D1FF] hover:shadow-[0_0_20px_0_rgba(249,6,214,0.7)]'
                }`}
            >
              {isLoading ? 'LOGGING IN...' : 'LOG IN'}
            </Button>

            {error && (
              <div className="text-red-500 text-center text-sm">
                Login failed. Please check your credentials.
              </div>
            )}
          </form>

          <p className="text-white mt-4 text-center text-sm sm:text-base">
            Don't have an Account?{' '}
            <Link
              href="/sign-up"
              className="underline hover:text-blue-300 transition-colors"
            >
              Register
            </Link>
          </p>

          <div className="flex items-center my-4">
            <div className="border-t border-white/30 flex-grow"></div>
            <span className="mx-4 text-white text-sm">or</span>
            <div className="border-t border-white/30 flex-grow"></div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 border-white/60 rounded-full hover:bg-white/10"
            >
              <Facebook className="w-5 h-5 text-white" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 border-white/60 rounded-full hover:bg-white/10"
            >
              <Globe className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
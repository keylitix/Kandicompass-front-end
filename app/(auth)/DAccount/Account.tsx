import Image from "next/image";
import ProfileImage from "@/public/Rectangle 48.svg";
import { Label } from "@/components/ui/label";
import EditIcon from "@/public/Edit.svg";

const AccountPage = () => {
  return (
    <div className="min-h-screen bg-black p-4 md:p-8 flex flex-col items-center justify-between">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold font-orbitron bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent mb-8 md:mb-12 text-center">
        Account
      </h1>

      {/* Main Content */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20 mb-8">
        {/* Profile Image */}
        <div className="w-full max-w-[305px]">
          <Image 
            src={ProfileImage} 
            alt="ProfileImage" 
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Form Fields */}
        <div className="w-full max-w-[350px] space-y-4 md:space-y-6">
          {/* First Name */}
          <div className="space-y-2">
            <Label className="text-white text-sm md:text-base">First Name</Label>
            <div className="relative">
              <input
                type="text"
                placeholder="username"
                className="w-full h-12 md:h-14 pl-4 pr-10 rounded-sm text-white border-2 border-transparent bg-transparent focus:outline-none focus:ring-2 focus:ring-white/70"
                style={{
                  borderImage: "linear-gradient(90deg, #FF005D 0%, #00D1FF 100%) 1",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
                }}
                autoComplete="off"
              />
              <span className="absolute inset-y-0 right-3 flex items-center">
                <Image src={EditIcon} className="w-5 h-5" alt="edit" />
              </span>
            </div>
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label className="text-white text-sm md:text-base">Last Name</Label>
            <div className="relative">
              <input
                type="text"
                placeholder="Lastname"
                className="w-full h-12 md:h-14 pl-4 pr-10 rounded-sm text-white border-2 border-transparent bg-transparent focus:outline-none focus:ring-2 focus:ring-white/70"
                style={{
                  borderImage: "linear-gradient(90deg, #FF005D 0%, #00D1FF 100%) 1",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
                }}
                autoComplete="off"
              />
              <span className="absolute inset-y-0 right-3 flex items-center">
                <Image src={EditIcon} className="w-5 h-5" alt="edit" />
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-white text-sm md:text-base">Email</Label>
            <div className="relative">
              <input
                type="email"
                placeholder="email"
                className="w-full h-12 md:h-14 pl-4 pr-10 rounded-sm text-white border-2 border-transparent bg-transparent focus:outline-none focus:ring-2 focus:ring-white/70"
                style={{
                  borderImage: "linear-gradient(90deg, #FF005D 0%, #00D1FF 100%) 1",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
                }}
                autoComplete="off"
              />
              <span className="absolute inset-y-0 right-3 flex items-center">
                <Image src={EditIcon} className="w-5 h-5" alt="edit" />
              </span>
            </div>
          </div>

          {/* Old Password */}
          <div className="space-y-2">
            <Label className="text-white text-sm md:text-base">Old password</Label>
            <div className="relative">
              <input
                type="password"
                placeholder="password"
                className="w-full h-12 md:h-14 pl-4 pr-10 rounded-sm text-white border-2 border-transparent bg-transparent focus:outline-none focus:ring-2 focus:ring-white/70"
                style={{
                  borderImage: "linear-gradient(90deg, #FF005D 0%, #00D1FF 100%) 1",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
                }}
                autoComplete="off"
              />
              <span className="absolute inset-y-0 right-3 flex items-center">
                <Image src={EditIcon} className="w-5 h-5" alt="edit" />
              </span>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label className="text-white text-sm md:text-base">New Password</Label>
            <div className="relative">
              <input
                type="password"
                placeholder="New password"
                className="w-full h-12 md:h-14 pl-4 pr-10 rounded-sm text-white border-2 border-transparent bg-transparent focus:outline-none focus:ring-2 focus:ring-white/70"
                style={{
                  borderImage: "linear-gradient(90deg, #FF005D 0%, #00D1FF 100%) 1",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
                }}
                autoComplete="new-password"
              />
              <span className="absolute inset-y-0 right-3 flex items-center">
                <Image src={EditIcon} className="w-5 h-5" alt="edit" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Update Button with Hover Effect */}
      <button className="
        w-full max-w-[350px] h-12 md:h-14 
        border border-white 
        text-white font-medium
        relative
        overflow-hidden
        transition-all
        duration-300
        hover:text-black
        before:content-['']
        before:absolute
        before:top-0
        before:left-0
        before:w-0
        before:h-full
        before:bg-gradient-to-r
        before:from-[#FF005D]
        before:to-[#00D1FF]
        before:transition-all
        before:duration-300
        before:opacity-80
        hover:before:w-full
        z-10
        mb-8
      ">
        <span className="relative z-20">UPDATE PROFILE</span>
      </button>
    </div>
  );
};

export default AccountPage;
export default function ContactUs() {
  return (
    <div className="bg-wrapper">
      <div className="bg-page">
        <div className="left-spark" />
        <div className="right-spark" />
        <div className="container mx-auto px-[100px]">
          <div className="h-[300px] flex items-center justify-center">
            <h1 className="font-[700] text-[46px] bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent">
              Contact Us
            </h1>
          </div>
          <div className="mb-[100px]">
            <form className="w-[669px] mx-auto">
              <div className="mb-6">
                <label className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  placeholder="xyz"
                  className="w-full p-3 text-white bg-transparent border-2 border-transparent"
                  style={{
                    borderImage:
                      'linear-gradient(to right, #FF005D, #00D1FF) 1',
                    outline: 'none',
                  }}
                />
              </div>

              <div className="mb-6">
                <label className="block text-white mb-2">Email</label>
                <input
                  type="text"
                  placeholder="xyz"
                  className="w-full p-3 text-white border-2 border-transparent bg-[#170F24]"
                  style={{
                    borderImage:
                      'linear-gradient(to right, #FF005D, #00D1FF) 1',
                    outline: 'none',
                  }}
                />
              </div>

              <div className="mb-6">
                <label className="block text-white mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="xyz"
                  className="w-full p-3 text-white border-2 border-transparent bg-[#170F24]"
                  style={{
                    borderImage:
                      'linear-gradient(to right, #FF005D, #00D1FF) 1',
                    outline: 'none',
                  }}
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="
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
      "
                >
                  <span className="relative z-20">SUBMIT</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

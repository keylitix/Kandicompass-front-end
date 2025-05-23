export default function TermsAndConditions() {
  return (
    <div className="bg-wrapper">
      <div className="left-spark" />
      <div className="right-spark" />
      <div className="container mx-auto px-[100px]">
        <div className="h-[300px] flex items-center justify-center">
          <h1 className="font-[700] text-[46px] bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent">
            Terms and Conditions
          </h1>
        </div>

        <div className="mb-[100px] space-y-6">
          <div className="p-3">
            <h3 className="text-sm font-semibold">1. Introduction</h3>
            <p className="text-xs font-sans leading-[1.6]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              condimentum tortor sem.
            </p>
          </div>

          <div className="p-3">
            <h3 className="text-sm font-semibold">2. Intellectual Property Rights</h3>
            <p className="text-xs font-sans leading-[1.6]">
              Except as otherwise provided, all content is the property of the website.
            </p>
          </div>

          <div className="p-3">
            <h3 className="text-sm font-semibold">3. User Obligations</h3>
            <p className="text-xs font-sans leading-[1.6]">
              Users must not use the website in a way that causes, or may cause, damage to the website.
            </p>
          </div>

          <div className="p-3">
            <h3 className="text-sm font-semibold">4. Limitation of Liability</h3>
            <p className="text-xs font-sans leading-[1.6]">
              In no event shall the company be liable for any damages arising out of or in connection with the use of this website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

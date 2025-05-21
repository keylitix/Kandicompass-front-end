export default function PrivacyAndPolicy() {
  return (
    <div className="bg-wrapper">
      <div className="bg-page">
        <div className="left-spark" />
        <div className="right-spark" />
        <div className="container mx-auto px-[100px]">
          <div className="h-[300px] flex items-center justify-center">
            <h1 className="font-[700] text-[46px] bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>
          <div className="mb-[100px]">
            <div className="p-3">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">
                  1. Information We Collect
                </h3>
                <p className="text-xs font-sans leading-[1.6]">
                  We may collect the following types of personal information:
                </p>
                <ul className="list-disc pl-5">
                  <li className="text-xs font-sans leading-[1.6]">
                    Personal Identification Information: Name, email address,
                    phone number, etc.
                  </li>
                  <li className="text-xs font-sans leading-[1.6]">
                    Account Information: Username, password, and other
                    account-related data.
                  </li>
                  <li className="text-xs font-sans leading-[1.6]">
                    Payment Information: Billing address, credit card number
                    (processed securely through third-party providers).
                  </li>
                  <li className="text-xs font-sans leading-[1.6]">
                    Usage Data: IP address, browser type, device information,
                    pages visited, and interaction with the site.
                  </li>
                  <li className="text-xs font-sans leading-[1.6]">
                    Cookies and Tracking Technologies: We use cookies and
                    similar technologies to enhance user experience and gather
                    analytics.
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-3">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">
                  2. How We Use Your Information
                </h3>
                <p className="text-xs font-sans leading-[1.6]">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-5">
                  <li className="text-xs font-sans leading-[1.6]">
                    Provide, operate, and maintain our services
                  </li>
                  <li className="text-xs font-sans leading-[1.6]">
                    Improve and personalize user experience
                  </li>
                  <li className="text-xs font-sans leading-[1.6]">
                    Process transactions and send related information
                  </li>
                  <li className="text-xs font-sans leading-[1.6]">
                    Communicate with you about products, services, and updates
                  </li>
                  <li className="text-xs font-sans leading-[1.6]">
                    Monitor and analyze usage and trends
                  </li>
                  <li className="text-xs font-sans leading-[1.6]">
                    Comply with legal obligations
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-3">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">
                  3. Sharing Your Information
                </h3>
                <p className="text-xs font-sans leading-[1.6]">
                  We do not sell your personal information. We may share it with
                  third parties under the following circumstances:
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

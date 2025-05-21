// app/threadcharm/page.tsx
import { Metadata } from 'next';
import { META } from '@/lib/meta';
import LeftSection from '@/app/_components/dashboard/LeftSection';
import RightSection from '@/app/_components/dashboard/RightSection';

export const metadata: Metadata = META.HOME;

const ThreadCharmPage = () => {
  return (
    <div className="min-h-screen bg-[#0d0719] text-white px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/5 order-2 lg:order-1">
          <LeftSection />
        </div>

        <div className="w-full lg:w-2/5 order-1 lg:order-2">
          <RightSection />
        </div>
      </div>
    </div>
  );
};

export default ThreadCharmPage;

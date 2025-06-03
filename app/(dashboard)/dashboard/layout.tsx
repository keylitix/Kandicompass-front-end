import Footer from '@/components/Footer/Footer';
import Dnavbar from '../-dComponnets/Dnavbar/Dnavbar';
import BeadAcceptRequestModal from '@/app/_components/modal/BeadAcceptRQ';

const DashboardLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Dnavbar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayoutPage;

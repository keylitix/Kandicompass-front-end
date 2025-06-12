import Footer from '@/components/Footer/Footer';
import Dnavbar from '../(dashboard)/-dComponnets/Dnavbar/Dnavbar';

const HomeLayoutPage = ({ children }: { children: React.ReactNode }) => {
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

export default HomeLayoutPage;

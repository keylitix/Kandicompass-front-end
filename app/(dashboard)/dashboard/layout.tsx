import Footer from "@/components/Footer/Footer";
import Dnavbar from "../-dComponnets/Dnavbar/Dnavbar";

const DashboardLayoutPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Dnavbar/>
            {children}
            <Footer/>
        </div>
    )
}

export default DashboardLayoutPage;
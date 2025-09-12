import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { useAuthGuard } from '../hooks/useAuthGuard';

const Home: React.FC = () => {
    const { isLoading, isAuthenticated } = useAuthGuard();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // 리디렉션 중이므로 아무것도 렌더링하지 않음
    }

    return(
        <>  
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen pt-[85px]">
                <Sidebar />
            </div>
        </>
    )
}

export default Home;
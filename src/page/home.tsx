import Header from "../components/Header";
import { useAuthGuard } from '../hooks/useAuthGuard';

const Home: React.FC = () => {
    const { isLoading, isAuthenticated } = useAuthGuard();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div>인증 확인 중...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // 리디렉션 중이므로 아무것도 렌더링하지 않음
    }

    return(
        <>  
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Header />
            </div>
        </>
    )
}

export default Home;
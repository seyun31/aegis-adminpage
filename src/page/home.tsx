import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import { Members } from '../api/members';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authenticated = await Members();
                if (authenticated) {
                    setIsAuthenticated(true);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('인증 확인 실패:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

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
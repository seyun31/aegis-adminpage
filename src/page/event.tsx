import { useEffect, useState } from 'react';
import EventTable from "../components/EventTable";
import Header from "../components/Header";
import SearchBar from "../components/Search";
import { useAuthGuard } from '../hooks/useAuthGuard';
import { GetActivities, type Activity } from '../api/activity/get-activities';

const Event: React.FC = () => {
    const { isLoading, isAuthenticated } = useAuthGuard();
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        // 활동 목록 전체 조회
        const fetchActivities = async () => {
            try {
                const data = await GetActivities();
                setActivities(data);
            } catch (error) {
                console.error('활동 목록 조회 중 오류 발생:', error);
            }
        };

        // 권한 확인
        if (isAuthenticated) {
            fetchActivities();
        }
    }, [isAuthenticated]);

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

    // 활동 데이터를 EventTable이 기대하는 형식으로 변환
    const tableRows = activities.map(activity => ({
        id: activity.activityId,
        name: activity.name,
        amount: activity.pointAmount
    }));

    return(
        <>  <Header />
            <div className="flex flex-col min-h-screen w-full mt-20 px-8">
                <div className="flex flex-col gap-6">
                    <SearchBar/>
                        <EventTable rows={tableRows} />
                </div>
            </div>
        </>
    )
}

export default Event;
import { useState } from 'react';
import QRScannerComponent from './QRScanner';

interface EventRow {
    id: number;
    name: string;
    amount: number;
}

interface EventTableProps {
    rows: EventRow[];
}

const EventTable: React.FC<EventTableProps> = ({ rows }) => {
    const [showQRScanner, setShowQRScanner] = useState(false);


    const handleQRClose = () => {
        // URL 파라미터에서 id 제거
        const url = new URL(window.location.href);
        url.searchParams.delete('id');
        window.history.pushState({}, '', url);
        
        setShowQRScanner(false);
    };

    const handleGoQR = (eventId: number) => {
        // 로컬 저장소에 활동 ID 저장
        localStorage.setItem('currentActivityId', eventId.toString());
        
        // URL 파라미터에 이벤트 ID 추가
        const url = new URL(window.location.href);
        url.searchParams.set('id', eventId.toString());
        window.history.pushState({}, '', url);
        
        setShowQRScanner(true);
    };

    return(
        <>
        {/* 버튼 section */}
        <div className="flex flex-col items-center gap-4">
            <div className="flex justify-end gap-3 w-[1165px]">
                <button className="w-[100px] h-[40px] rounded-[10px] bg-gray-20 text-gray-90">행사 생성</button>
                <button className="w-[100px] h-[40px] rounded-[10px] bg-gray-20 text-gray-90">정렬순</button>
            </div>

            {/* 데이터 표 */}
            <section className="w-[1165px]">
                {/* 데이터 제목 */}
                <div className="grid grid-cols-6 items-center rounded-t-[12px] bg-white h-[50px] justify-center table-header">
                    <div className="text-center">ID</div>
                    <div className="text-center">행사 이름</div>
                    <div className="text-center">포인트</div>
                    <div className="text-center">수정</div>
                    <div className="text-center">삭제</div>
                    <div className="text-center">QR</div>
                </div>

                {/* 데이터 내용 */}
                <div className="space-y-3 py-3">
                    {rows.map((r) => (
                    <div
                        key={r.id}
                        className="grid grid-cols-6 items-center rounded-[12px] bg-white h-[50px] justify-center table-data"
                    >
                        <div className="text-center">{r.id}</div>
                        <div className="text-center">{r.name}</div>
                        <div className="text-center">{r.amount}</div>

                        {/* 수정 */}
                        <div className="flex justify-center table-data">
                        <button
                            onClick={() => ""}
                            className="h-8 px-3 rounded-[10px] bg-blue-100 text-blue-600 hover:bg-blue-200"
                        >
                            수정하기
                        </button>
                        </div>

                        {/* 삭제 */}
                        <div className="flex justify-center table-data">
                        <button
                            onClick={() => ""}
                            className="h-8 px-3 rounded-[10px] bg-red-100 text-red-600 hover:bg-red-200"
                        >
                            삭제하기
                        </button>
                        </div>

                        {/* QR */}
                        <div className="flex justify-center table-data">
                        <button
                            onClick={() => handleGoQR(r.id)}
                            className="h-8 px-3 rounded-[10px] bg-green-100 text-green-700 hover:bg-green-200"
                        >
                            이동하기
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
            </section>
        </div>

        {/* QR Scanner Modal */}
        {showQRScanner && (
            <QRScannerComponent
                onClose={handleQRClose}
            />
        )}
        </>
    )

}

export default EventTable;
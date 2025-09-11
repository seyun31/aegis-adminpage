import { useState } from 'react';
import QRScannerComponent from './QRScanner';
import { showError, showSuccess, showWarning } from '../utils/alert';
import { getActivityById, updateActivity } from '../api/activity/put-activities';
import { deleteActivity } from '../api/activity/delete-acitivites';
import { GetActivities } from '../api/activity/get-activities';
import { PostMemberActivities } from '../api/activity/post-activities';

interface EventRow {
    id: number;
    name: string;
    amount: number;
}

interface EventTableProps {
    rows: EventRow[];
    setRows: (rows: EventRow[]) => void;
}

const EventTable: React.FC<EventTableProps> = ({ rows, setRows }) => {
    const [showQRScanner, setShowQRScanner] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [eventName, setEventName] = useState('');
    const [pointAmount, setPointAmount] = useState('');
    const [editingActivityId, setEditingActivityId] = useState<number | null>(null);


    const handleQRClose = () => {
        // URL 파라미터에서 ID 제거
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

    const handleEdit = async (activityId: number) => {
        
        // 현재 테이블에서 해당 활동 찾기
        const currentRow = rows.find(row => row.id === activityId);
        if (currentRow) {
            setEditingActivityId(activityId);
            setEventName(currentRow.name);
            setPointAmount(currentRow.amount.toString());
            setShowEditModal(true);
            return;
        }

        // API 호출
        try {
            const activity = await getActivityById(activityId);
            if (activity) {
                setEditingActivityId(activityId);
                setEventName(activity.name);
                setPointAmount(activity.pointAmount.toString());
                setShowEditModal(true);
            } else {
                console.log('활동 정보를 찾을 수 없습니다.');
                showError('활동 정보를 불러올 수 없습니다.');
            }
        } catch (error) {
            console.error('수정 모달 열기 오류:', error);
            showError('오류가 발생했습니다.');
        }
    };

    const handleDelete = async (activityId: number) => {
        const confirmed = await showWarning('정말로 이 활동을 삭제하시겠습니까?');
        if (confirmed) {
            const success = await deleteActivity(activityId);
            if (success) {
                showSuccess('활동이 삭제되었습니다.');
                // 삭제 후 자동으로 정보 업데이트
                const updatedActivities = await GetActivities();
                const formattedRows = updatedActivities.map(activity => ({
                    id: activity.activityId,
                    name: activity.name,
                    amount: activity.pointAmount
                }));
                setRows(formattedRows);
            } else {
                showError('삭제에 실패했습니다.');
            }
        }
    };

    const handleCreateEvent = () => {
        setShowCreateModal(true);
    };

    const handleCloseModal = () => {
        setShowCreateModal(false);
        setShowEditModal(false);
        setEventName('');
        setPointAmount('');
        setEditingActivityId(null);
    };

    const handleSubmitEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!eventName.trim()) {
            showError('행사 이름을 입력하세요.');
            return;
        }

        const pointValue = parseInt(pointAmount, 10);
        if (isNaN(pointValue)) {
            showError('올바른 포인트 값을 입력하세요.');
            return;
        }

        if (editingActivityId) {
            // 수정 모드
            const success = await updateActivity(editingActivityId, eventName.trim(), pointValue);
            if (success) {
                showSuccess('행사가 수정되었습니다.');
                handleCloseModal();
                // 수정 후 자동으로 정보 업데이트
                const updatedActivities = await GetActivities();
                const formattedRows = updatedActivities.map(activity => ({
                    id: activity.activityId,
                    name: activity.name,
                    amount: activity.pointAmount
                }));
                setRows(formattedRows);
            } else {
                showError('행사 수정에 실패했습니다.');
            }
        } else {
            // 생성 모드
            const success = await PostMemberActivities(eventName.trim(), pointValue);
            if (success) {
                showSuccess('행사가 생성되었습니다.');
                handleCloseModal();
                // 생성 후 자동으로 정보 업데이트
                const updatedActivities = await GetActivities();
                const formattedRows = updatedActivities.map(activity => ({
                    id: activity.activityId,
                    name: activity.name,
                    amount: activity.pointAmount
                }));
                setRows(formattedRows);
            } else {
                showError('행사 생성에 실패했습니다.');
            }
        }
    };

    return(
        <>
        {/* 버튼 section */}
        <div className="flex flex-col items-center gap-4">
            <div className="flex justify-end gap-3 w-[1165px]">
                <button 
                    onClick={handleCreateEvent}
                    className="w-[100px] h-[40px] rounded-[10px] bg-gray-20 text-gray-90 hover:bg-gray-30"
                >
                    행사 생성
                </button>
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
                    {rows.sort((a, b) => a.id - b.id).map((r) => (
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
                            onClick={() => handleEdit(r.id)}
                            className="h-8 px-3 rounded-[10px] bg-blue-100 text-blue-600 hover:bg-blue-200"
                        >
                            수정하기
                        </button>
                        </div>

                        {/* 삭제 */}
                        <div className="flex justify-center table-data">
                        <button
                            onClick={() => handleDelete(r.id)}
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

        {/* 행사 생성/수정 모달 */}
        {(showCreateModal || showEditModal) && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-[10px] p-6 w-[40vw]">
                    <h2 className="font-size-24px font-weight-700 mb-2 color-black">
                        {editingActivityId ? '행사 수정' : '행사 생성'}
                    </h2>
                    <p className="font-size-16px font-weight-500 mb-4 color-gray-90">
                        {editingActivityId ? '수정하고 싶은 행사 정보를 입력해주세요' : '생성하고 싶은 행사 이름을 입력해주세요'}
                    </p>
                    <form onSubmit={handleSubmitEvent}>
                        <div className="mb-4">
                            <label className="block font-size-16px font-weight-500 color-black mb-2">
                                행사 이름
                            </label>
                            <input
                                type="text"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-50 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-black"
                                placeholder="행사 이름을 입력하세요"
                                autoFocus
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block font-size-16px font-weight-500 color-black mb-2">
                                포인트
                            </label>
                            <input
                                type="number"
                                value={pointAmount}
                                onChange={(e) => setPointAmount(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-50 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-black"
                                placeholder="포인트를 입력하세요"
                                min="0"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={handleCloseModal}
                               className="w-[120px] py-2 bg-gray-20 color-gray-90 rounded-[10px] cursor-pointer"
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                className="w-[120px] py-2 bg-black color-white rounded-[10px] cursor-pointer"
                            >
                                {editingActivityId ? '수정하기' : '생성하기'}
                            </button>   
                        </div>
                    </form>
                </div>
            </div>
        )}
        </>
    )

}

export default EventTable;
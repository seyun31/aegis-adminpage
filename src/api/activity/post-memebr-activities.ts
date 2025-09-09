const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface MemberActivityRequest {
  activityId: number;
  memberId: number;
}

export async function PostMemberActivities(activityId: number, memberId: number): Promise<boolean> {
  try {
    const requestBody: MemberActivityRequest = {
      activityId,
      memberId
    };
    
    const res = await fetch(`${API_BASE_URL}/admin/activity-participation`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    
    if (!res.ok) {
      switch (res.status) {
      case 400:
        alert("잘못된 요청입니다. 입력 데이터를 확인해주세요.");
        break;
      case 404:
        alert("해당 활동 또는 회원을 찾을 수 없습니다.");
        break;
      case 409:
        alert("이미 참여한 활동입니다.");
        break;
      default:
        alert("요청 처리 중 오류가 발생했습니다.");
        break;
      }
    }

    return true;
  } catch (err) {
    console.error("멤버 활동 참여 등록 실패:", err);
    return false;
  }
}
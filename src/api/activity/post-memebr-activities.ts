const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { showError } from '../../utils/alert';

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
        showError("잘못된 요청입니다. 관리자에게 문의해주세요.");
        break;
      case 404:
        showError("해당 활동 또는 회원을 찾을 수 없습니다. 관리자에게 문의해주세요.");
        break;
      case 409:
        showError("이미 참여한 활동입니다.");
        break;
      default:
        showError("요청 처리 중 오류가 발생했습니다. 관리자에게 문의해주세요.");
        break;
      }
      return false;
    }

    return true;
  } catch (err) {
    console.error("멤버 활동 참여 등록 실패:", err);
    return false;
  }
}
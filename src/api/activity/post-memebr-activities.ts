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
    
    const res = await fetch(`${API_BASE_URL}/admin/acitivity-participation`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    
    if (!res.ok) {
      console.log("응답이 실패했습니다:", res.status);
      return false;
    }

    const data = await res.json();
    console.log("응답 데이터:", data);
    
    return true;
  } catch (err) {
    console.error("멤버 활동 참여 등록 실패:", err);
    return false;
  }
}
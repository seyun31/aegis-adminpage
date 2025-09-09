const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface MemberActivityRequest {
  name: string;
  pointAmount: number;
}

export async function PostMemberActivities(name: string, pointAmount: number): Promise<boolean> {
  try {
    const requestBody: MemberActivityRequest = {
      name,
      pointAmount,
    };
    
    const res = await fetch(`${API_BASE_URL}/admin/activities`, {
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
    return true;
  } catch (err) {
    console.error("활동 등록 실패:", err);
    return false;
  }
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface ActivityInfo {
  activityId: number;
  name: string;
  pointAmount: number;
}

// 조회
export async function getActivityById(activityId: number): Promise<ActivityInfo | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/activities/${activityId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      console.log("응답이 실패했습니다:", res.status);
      return null;
    }

    const data: ActivityInfo = await res.json();
    console.log("받아온 활동 정보:", data);
    
    return data;
  } catch (err) {
    console.error("활동 정보 조회 실패:", err);
    return null;
  }
}

// 수정
export async function updateActivity(activityId: number, name: string, pointAmount: number): Promise<boolean> {
  try {
    const requestBody = {
      name,
      pointAmount,
    };

    const res = await fetch(`${API_BASE_URL}/admin/activities/${activityId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!res.ok) {
      console.log("활동 수정 실패:", res.status);
      return false;
    }

    return true;
  } catch (err) {
    console.error("활동 수정 실패:", err);
    return false;
  }
}
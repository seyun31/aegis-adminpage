const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Activity {
  activityId: number;
  name: string;
  pointAmount: number;
}

export async function GetActivities(): Promise<Activity[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/activities`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        accept: 'application/json',
      },
    });
    
    if (!res.ok) {
      console.log("응답이 실패했습니다:", res.status);
      return [];
    }

    const data: Activity[] = await res.json();
    console.log("받아온 활동 목록:", data);
    
    return data;
  } catch (err) {
    console.error("활동 목록 조회 실패:", err);
    return [];
  }
}
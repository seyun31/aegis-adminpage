const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function deleteActivity(activityId: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/activities/${activityId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        accept: '*/*',
      },
    });
    
    if (!res.ok) {
      console.log("활동 삭제 실패:", res.status);
      return false;
    }

    return true;
  } catch (err) {
    console.error("활동 삭제 실패:", err);
    return false;
  }
}
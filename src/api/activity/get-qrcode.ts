const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface MemberInfo {
  memberId: number;
  name: string;
  studentId: string;
}

export async function GetQRCode(uuid: string): Promise<MemberInfo | null> {
  try {    
    const res = await fetch(`${API_BASE_URL}/admin/qrcode/${uuid}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        accept: 'application/json',
      },
    });

    if (!res.ok) {
      console.log("응답이 실패했습니다:", res.status);
      return null;
    }

    const data: MemberInfo = await res.json();
    console.log("받아온 멤버 정보:", data);
    return data;
  } catch (err) {
    console.error("QR 코드 멤버 정보 조회 실패:", err);
    return null;
  }
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function Members(): Promise<boolean> {
  try {
    console.log("API 요청 시작:", `${API_BASE_URL}/members`);
    const res = await fetch(`${API_BASE_URL}/members`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        accept: 'application/json',
      },
    });

    // console.log("응답 상태:", res.status, res.statusText);
    
    if (!res.ok) {
      console.log("응답이 실패했습니다:", res.status);
      return false;
    }

    const data = await res.json();

    if (data.role === "ADMIN") {
      // 처음 로그인 시에만 환영 메시지 표시
      const Welcome = localStorage.getItem('Welcome');
      if (!Welcome) {
        alert(`안녕하세요 ${data.name} 관리자님!`);
        localStorage.setItem('Welcome', 'true');
      }
      return true;
    } else {
      alert("로그인 실패! 관리자만 접근 가능합니다.");
      return false;
    }
  } catch (err) {
    console.error("인증 확인 실패:", err);
    return false;
  }
}
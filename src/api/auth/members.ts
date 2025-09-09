const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function Members(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/members`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        accept: 'application/json',
      },
    });
    
    if (!res.ok) {
      console.log("응답이 실패했습니다:", res.status);
      return false;
    }

    const data = await res.json();

    if (data.role === "ADMIN") {
      // 세션 스토리지에서 환영 메시지 표시 여부 확인
      const hasShownWelcome = sessionStorage.getItem('hasShownWelcome');
      
      if (!hasShownWelcome) {
        alert(`안녕하세요 ${data.name} 관리자님!`);
        // 환영 메시지를 표시했다는 것을 세션 스토리지에 저장
        sessionStorage.setItem('hasShownWelcome', 'true');
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
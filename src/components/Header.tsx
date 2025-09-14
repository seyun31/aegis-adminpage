import { IoLogOutOutline } from "react-icons/io5";
import AegisLogo from '../assets/logos/aegis.svg';
import { useNavigate } from "react-router-dom";
import { logout } from '../api/auth/logout';
import { showSuccess, showError, showCustomConfirm } from "../utils/alert";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/");
    }

    const handleLogout = async () => {
        const confirmed = await showCustomConfirm('로그아웃 하시겠습니까?');
        if (confirmed) {
            const success = await logout();
            if (success) {
                showSuccess('로그아웃 되었습니다.');
                window.location.href = '/login';
            } else {
                showError('로그아웃 중 오류가 발생했습니다.');
            }
        }
    }

    return(
        <>
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-[85px] bg-white">
                <div className="flex justify-left items-center w-full h-full bg-white cursor-pointer"
                     onClick={onClick}>
                    <img className="w-[35px] h-[35px] ml-6" src={AegisLogo} alt="Aegis Logo" />
                    <p className="ml-4 font-size-20px font-weight-600 color-black">Aegis</p>
                </div>
                <div className="flex justify-center w-full h-[85px] bg-white"/>
                <div className="flex flex-col justify-center items-center h-[85px] bg-white">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-[111px] h-[43px] rounded-[10px] bg-white border-[1px] border-gray-30 mr-6 cursor-pointer hover:bg-gray-10"
                    >
                        <IoLogOutOutline className="text-[20px]" />
                        로그아웃
                    </button>
                </div>
            </div>
        </>
    )
}

export default Header;
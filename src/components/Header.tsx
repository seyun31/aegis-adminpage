import { IoLogOutOutline } from "react-icons/io5";
import AegisLogo from '../assets/logos/aegis.svg';
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/");
    }

    return(
        <>
            <div className="flex justify-center items-center w-full h-[85px]">
                <div className="flex justify-left items-center w-full h-[85px] bg-white"
                     onClick={onClick}>
                    <img className="w-[35px] h-[35px] ml-6" src={AegisLogo} alt="Aegis Logo" />
                    <p className="ml-4 font-size-20px font-weight-600 color-black">Aegis</p>
                </div>
                <div className="flex justify-center w-full h-[85px] bg-white"/>
                <div className="flex flex-col justify-center items-center h-[85px] bg-white">
                    <button className="flex items-center justify-center gap-2 w-[111px] h-[43px] rounded-[10px] bg-white border-[1px] border-gray-30 mr-6">
                    <IoLogOutOutline className="text-[20px]" />
                    로그아웃
                    </button>
                </div>
            </div>
        </>
    )
}

export default Header;
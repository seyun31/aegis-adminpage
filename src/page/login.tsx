import AegisLogo from '../assets/logos/aegis.svg';

const Login: React.FC = () => {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <img className="w-[70px] h-[70px] mb-8" src={AegisLogo} alt="Aegis Logo" />
            <div className="flex flex-col w-[588px] h-[413px] rounded-[10px] bg-white items-center justify-center">
                <h1 className="font-size-32px font-weight-800 color-black mb-2">Welcome Aegis Admin</h1>
                <h3 className="font-size-16px font-weight-500 color-gray-90 mb-8">Aegis 관리자만 접근 가능합니다.</h3>
                {/* <input className="login-input login-input-placeholder w-[366px] h-[43px] rounded-[10px] bg-white border-[0.5px] border-gray-30 mb-6"
                       placeholder="Enter ID"></input>
                <input className="login-input login-input-placeholder w-[366px] h-[43px] rounded-[10px] bg-white border-[0.5px] border-gray-30 mb-6"
                       placeholder="Enter Password"></input> */}
                <button className="font-size-12px font-weight-600 color-white w-[366px] h-[43px] rounded-[10px] bg-black">관리자 인증</button>
            </div>
        </div>
    )
}

export default Login;
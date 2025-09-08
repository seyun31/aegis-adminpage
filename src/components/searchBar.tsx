import { FiSearch } from "react-icons/fi";

const SearchBar: React.FC = () => {
    return(
        <>
            <div className="flex justify-center gap-10">
                <div className="relative flex justify-center">
                    <FiSearch className="absolute left-4 top-1/3 -translate-y-1/3 text-[24px]" />
                    <input className="search-input search-input-placeholder w-[974px] h-[68px] rounded-[10px] bg-white border-[0.5px] border-gray-30 mb-6 pl-14"
                           placeholder="검색어를 입력하세요"></input>
                </div>
                <button className="font-size-20px font-weight-700 color-white w-[150px] h-[68px] rounded-[10px] bg-black">
                    검색
                </button>
            </div>
        </>
    )
}

export default SearchBar;
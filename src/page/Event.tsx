import Header from "../components/Header";
import SearchBar from "../components/Search";

const Event: React.FC = () => {
    return(
        <>  <Header />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <SearchBar/>
            </div>
        </>
    )
}

export default Event;
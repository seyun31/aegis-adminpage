import Header from "../components/Header";
import SearchBar from "../components/searchBar";

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
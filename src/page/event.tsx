import EventTable from "../components/EventTable";
import Header from "../components/Header";
import SearchBar from "../components/Search";

const Event: React.FC = () => {

    return(
        <>  <Header />
            <div className="flex flex-col min-h-screen w-full mt-20 px-8">
                <div className="flex flex-col gap-6">
                    <SearchBar/>
                    {/* 임시 데이터 */}
                    <EventTable rows={[
                        { id: 1, name: "신년회", amount: 100 },
                        { id: 2, name: "크리스마스 파티", amount: 100 },
                        { id: 3, name: "워크샵", amount: 100 }
                    ]} />
                </div>
            </div>
        </>
    )
}

export default Event;
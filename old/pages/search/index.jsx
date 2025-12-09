import SearchBar from "../../components/SearchBar";
import Filter from "../../components/Filter";
import SearchResults from "./SearchResults";

const SearchPage = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <SearchBar />
      <div className="flex w-full max-w-7xl gap-4">
        <div className="w-fit h-fit">
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg overflow-hidden mb-4 py-4"
            style={{
              backgroundImage: "url(https://ik.imagekit.io/tvlk/image/imageResource/2024/09/05/1725509884357-7c1a5596fb0e685b4d41bee6ba3b3edd.svg?tr=q-75)",
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/11/16/1700131234701-4b2708ab9c8da08fbcd18fc444610aa6.png?tr=q-75"
                 alt="Traveloka Logo"
                 className="w-9 h-auto"
            />
            <button className="text-white text-sm font-semibold px-3 py-2 rounded-full cursor-pointer"
              style={{ 
                backgroundColor: 'rgb(0, 148, 243)',
                backgroundImage: "linear-gradient(136.94deg, rgb(2, 69, 144) 0%, rgb(0, 113, 206) 46.1%, rgb(10, 154, 242) 96.84%)"
              }}
            >
              Xem trên bản đồ
            </button>
          </div>
          <Filter />
        </div>
        <div className="flex-1 flex-col space-y-4">
          <SearchResults />
        </div>
      </div>
    </div>
    )
};

export default SearchPage;
import SearchBar from "../../components/SearchBar";
import Filter from "../../components/Filter";
import SearchResults from "./SearchResults";

const SearchPage = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <SearchBar />
      <div className="flex w-full max-w-7xl gap-4">
        <Filter />
        <div className="flex-1 flex-col space-y-4">
          <SearchResults />
        </div>
      </div>
    </div>
    )
};

export default SearchPage;
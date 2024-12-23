import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "../../../components/search_bar";
import { Pagination, Button, Divider } from "antd";
import Filter from "../../../components/filter";
import { fake_products } from "../../../fake_data";
import ProductCard from "../../../components/ProductCard";
import SearchStatus from "../SearchStatus";
import { ReactComponent as ShowOnMapImage } from '../../../assets/images/show_on_map.svg';
import mapMarkerIcon from '../../../assets/images/map_marker.png';

const ShowOnMap = ({ onShowMapView }) => {
  return (
    <div className="relative flex h-28 bg-white border border-gray-300 rounded-lg p-4 justify-center overflow-hidden">
      <ShowOnMapImage alt="map" className="absolute inset-0 object-cover" />
      <div className="absolute flex flex-col items-center justify-center space-y-2">
        <img src={mapMarkerIcon} alt="marker" className="w-8 h-auto" />
        <Button
          type="primary"
          className="bg-blue-500 hover:bg-blue-400 font-semibold"
          onClick={onShowMapView}
        >
          Xem trên bản đồ
        </Button>
      </div>
    </div>
  );
};


const CardView = ({ searchQuery, setSearchQuery, filter, setFilter, onShowMapView }) => {
  //Need to be replaced with actual fetch logic
  const [spec, setSpec] = useState({
    location: '',
    checkInOut: [],
    guestsAndRooms: { adults: 2, children: 0, rooms: 1 },
  });

  const [isListView, setIsListView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // const [query, setQuery] = useState({ location: '', checkInOut: [], guestsAndRooms: { adults: 2, children: 0, rooms: 1 } });
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const totalPages = 20;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = useCallback((searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    console.log('Fetching search results for query:', query, 'page:', currentPage);
    window.setTimeout(() => {
      // Simulate fetching data
      setSearchResults(fake_products); // Replace with actual fetch logic
      setIsLoading(false);
    }, 1000);

    return () => {
      window.clearTimeout();
    };
  }, [query, currentPage]);

  return (
    <div className="flex flex-row w-full h-full justify-center">
      <div className="flex flex-col space-y-4 w-full max-w-7xl">
        <div className="flex items-center justify-center w-full py-2">
          <SearchBar spec={spec} setSpec={setSpec} />
        </div>

        <div className="flex flex-row w-full space-x-8">
          <div className={"w-72 h-full transition-all duration-300"}>
            <ShowOnMap onShowMapView={onShowMapView} />
            <Divider />
            <Filter />
          </div>

          <div className="flex flex-col w-full space-y-4">
            <SearchStatus
              query={query}
              found={searchResults.length}
              onSort={(value) => console.log(value)}
              isListView={isListView}
              setIsListView={setIsListView}
            />

            {searchResults.length === 0 ?
              (
                <div className="flex flex-col items-center justify-center w-full h-96">
                  <p className="text-lg text-gray-500">Không tìm thấy kết quả nào</p>
                  <Button type="primary" className="mt-4">Tìm kiếm lại</Button>
                </div>
              )
              :
              (
                <>
                  <div className={isListView ? "flex flex-col w-full space-y-4" : "grid grid-cols-3 gap-4"}>
                    {searchResults.map((product, index) => (
                      <ProductCard key={index} product={product} isLoading={isLoading} isListView={isListView} />
                    ))}
                  </div>
                  <div className="flex justify-center w-full px-4">
                    <Pagination
                      current={currentPage}
                      total={totalPages}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                    />
                  </div>
                </>
              )
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default CardView;
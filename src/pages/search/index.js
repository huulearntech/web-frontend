import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Pagination, Button, Divider } from "antd";
import SearchBar from "../../components/search_bar/index copy";
import Filter from "../../components/filter";
import Map from "./map_view";
import ProductCard from "../../components/ProductCard";
import SearchStatus from "./SearchStatus";

import { LeftOutlined } from '@ant-design/icons';
import { ReactComponent as ShowOnMapImage } from '../../assets/images/show_on_map.svg';
import mapMarkerIcon from '../../assets/images/map_marker.png';

import searchServices from "../../services/searchServices";

import { fake_products } from "../../fake_data";

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

const SearchPage = () => {
  const reactLocation = useLocation();
  const initialSpec = {
    location: "",
    checkInOut: [],
    guestsAndRooms: { adults: 2, children: 0, rooms: 1 },
  };

  const [spec, setSpec] = useState(initialSpec);
  const [filter, setFilter] = useState([]);

  const [isMapView, setIsMapView] = useState(false);
  const [isListView, setIsListView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(fake_products);
  const totalResults = 20;

  useEffect(() => {
    setIsLoading(true);
    const query = new URLSearchParams(reactLocation.search);
    const location = query.get("location");
    const checkInDate = query.get("checkInDate");
    const checkOutDate = query.get("checkOutDate");
    const adults = query.get("adults");
    const children = query.get("children");
    const rooms = query.get("rooms");

    console.log({
      location: location,
      checkInOut: [new Date(checkInDate)
        , new Date(checkOutDate)],
      guestsAndRooms: { adults, children, rooms },
    });

    // Update the state with the extracted query parameters
    setSpec({
      location: location,
      checkInOut: [checkInDate, checkOutDate],
      guestsAndRooms: { adults, children, rooms },
    });

    window.setTimeout(() => {
      // Simulate fetching data
      setSearchResults(fake_products); // Replace with actual fetch logic
      setIsLoading(false);
    }, 1000);

    return () => {
      window.clearTimeout();
    }
  }, [reactLocation.search]);

  return (
    isMapView ? (
      <div className="relative">
        <Map center={[51.505, -0.09]} results={searchResults} />
        <Button
          type="default"
          className="absolute top-2 left-12 font-semibold"
          icon={<LeftOutlined />}
          onClick={() => setIsMapView(false)}
        >
          Quay lại
        </Button>
      </div>
    ) : (
      <div className="flex flex-row w-full h-full justify-center">
        <div className="flex flex-col space-y-4 w-full max-w-7xl">

          <div className="flex items-center justify-center w-full py-2">
            <SearchBar spec={spec} setSpec={setSpec} />
          </div>

          <div className="flex flex-row w-full space-x-8">
            <div className="w-72 h-full transition-all duration-300">
              <ShowOnMap onShowMapView={() => setIsMapView(true)} />
              <Divider />
              <Filter />
            </div>

            <div className="flex flex-col w-full space-y-4">
              <SearchStatus
                location={spec.location}
                found={searchResults.length}
                onSort={(value) => console.log(value)}
                isListView={isListView}
                setIsListView={setIsListView}
              />

              {searchResults.length === 0 ?
                (
                  <div className="flex flex-col items-center justify-center w-full h-96">
                    <p className="text-lg text-black">Không tìm thấy kết quả nào phù hợp với yêu cầu của bạn</p>
                    <p className="text-gray-500">Bạn có thể đặt lại bộ lọc</p>
                  </div>
                )
                :
                (
                  <div className={isListView ? "flex flex-col w-full space-y-4" : "grid grid-cols-3 gap-4"}>
                    {searchResults.map((product, index) => (
                      <ProductCard key={index} product={product} isLoading={isLoading} isListView={isListView} />
                    ))}
                  </div>
                )
              }

              <div className="flex justify-center w-full px-4">
                <Pagination
                  pageSize={24}
                  current={currentPage}
                  total={totalResults}
                  onChange={(page) => setCurrentPage(page)}
                  showSizeChanger={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SearchPage;
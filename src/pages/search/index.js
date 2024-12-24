import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Pagination, Button, Divider, Spin } from "antd";
import SearchBar from "../../components/search_bar";
import Filter from "../../components/filter";
import Map from "./map_view/index2";
import ProductCard from "../../components/ProductCard";
import SearchStatus from "./SearchStatus";

import { LeftOutlined } from '@ant-design/icons';
import { ReactComponent as ShowOnMapImage } from '../../assets/images/show_on_map.svg';
import mapMarkerIcon from '../../assets/images/map_marker.png';
import noResult from '../../assets/images/no_result.webp';

import searchServices from "../../services/searchServices";

import dayjs from "dayjs";

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

  const [location, setLocation] = useState('');
  const [checkInOut, setCheckInOut] = useState([]);
  const [guestsAndRooms, setGuestsAndRooms] = useState({ adults: 2, children: 0, rooms: 1 });


  const [isMapView, setIsMapView] = useState(false);
  const [isListView, setIsListView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const totalResults = 20;

  useEffect(() => {
    setIsLoading(true);
    console.log(reactLocation.state);
    const params = new URLSearchParams(reactLocation.search);
    const location = params.get('location') || '';
    const checkIn = dayjs(params.get('checkIn'));
    const checkOut = dayjs(params.get('checkOut'));
    const adults = parseInt(params.get('adults'));
    const children = parseInt(params.get('children'));
    const rooms = parseInt(params.get('rooms'));

    const isValidDate = (date) => date.isValid ? date.isValid() : false;

    const validCheckIn = isValidDate(checkIn) ? checkIn : undefined;
    const validCheckOut = isValidDate(checkOut) ? checkOut : undefined;
    const validAdults = isNaN(adults) ? 2 : adults;
    const validChildren = isNaN(children) ? 0 : children;
    const validRooms = isNaN(rooms) ? 1 : rooms;

    setLocation(location);
    setCheckInOut([validCheckIn, validCheckOut]);
    setGuestsAndRooms({ adults: validAdults, children: validChildren, rooms: validRooms });

    async function getResults() {
      setIsLoading(true);
      try {
        const response = await searchServices.searchBySpec(location, validCheckIn, validCheckOut, validAdults, validChildren, validRooms);
        setSearchResults(response);
      } catch (error) {
        console.error("Error occurred during search:", error);
        // Handle the error, e.g., show an error message to the user
      } finally {
        setIsLoading(false);
      }
    };

    getResults();

  }, [reactLocation.search]);

  return (
    isMapView ? (
      <div className="relative">
        <Map center={[51.505, -0.09]} zoom={13} results={searchResults} />
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
            <SearchBar
              location={location}
              checkInOut={checkInOut}
              guestsAndRooms={guestsAndRooms}
              setLocation={setLocation}
              setCheckInOut={setCheckInOut}
              setGuestsAndRooms={setGuestsAndRooms}
            />
          </div>

          <div className="flex flex-row w-full space-x-8">
            <div className="w-72 h-full transition-all duration-300">
              <ShowOnMap onShowMapView={() => setIsMapView(true)} />
              <Divider />
              <Filter />
            </div>

            <div className="flex flex-col w-full items-center space-y-4">
              <SearchStatus
                location={location}
                found={searchResults.length}
                onSort={(value) => console.log(value)}
                isListView={isListView}
                setIsListView={setIsListView}
              />

              {isLoading ?
                (
                  <div className="flex flex-col items-center justify-center w-full h-96">
                    <Spin size="large" tip="Đang tìm kiếm..." />
                  </div>
                )
                :
                searchResults.length === 0 ?
                  (
                    <div className="flex flex-col items-center justify-center w-full h-96">
                      <img src={noResult} alt="not found" className="w-32 h-auto" />
                      <p className="text-lg text-black mt-6">Không tìm thấy kết quả nào phù hợp với yêu cầu của bạn</p>
                      <p className="text-gray-500">Bạn có thể đặt lại bộ lọc</p>
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
                      <Pagination
                        pageSize={24}
                        current={currentPage}
                        total={totalResults}
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false}
                      />
                    </>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SearchPage;
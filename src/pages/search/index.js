import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Pagination, Button, Divider, Spin } from "antd";
import { LeftOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import { debounce } from "lodash";

import SearchBar from "../../components/search_bar";
import Filter from "../../components/filter";
import Map from "./map";
import ProductCard from "../../components/ProductCard";
import SearchStatus from "./SearchStatus";

import ShowOnMapImage from '../../assets/images/show_on_map.svg';
import mapMarkerIcon from '../../assets/images/map_marker.png';
import noResult from '../../assets/images/no_result.webp';

import hotelServices from "../../services/hotelServices";
import searchServices from "../../services/searchServices";
import withCommonLayout from "../../layouts_hoc/Common";

const gMinPrice = 100_000;
const gMaxPrice = 20_000_000;


const ShowOnMap = ({ onShowMapView }) => {
  return (
    <div className="relative flex w-full h-28 bg-white border border-gray-300 rounded-lg p-4 justify-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${ShowOnMapImage})` }}>
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

  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [statusLocation, setStatusLocation] = useState('');
  const [totalResults, setTotalResults] = useState(0);

  const [location, setLocation] = useState('');
  const [checkInOut, setCheckInOut] = useState([]);
  const [guestsAndRooms, setGuestsAndRooms] = useState({ adults: 2, children: 0, rooms: 1 });

  const [minPrice, setMinPrice] = useState(gMinPrice);
  const [maxPrice, setMaxPrice] = useState(gMaxPrice);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState({
    'Điểm đánh giá': [],
    'Loại hình lưu trú': [],
    'Tiện nghi': []
  });

  const [filter, setFilter] = useState({
    minPrice: gMinPrice,
    maxPrice: gMaxPrice,
    selectedCharacteristics: {
      'Điểm đánh giá': [],
      'Loại hình lưu trú': [],
      'Tiện nghi': []
    }
  });

  const [sortBy, setSortBy] = useState('price-asc');

  const handleSliderChange = useCallback((value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  }, []);

  const handlePriceInputChange = useCallback((e) => {
    const name = e.target.name;
    const value = e.target.value.replace(/\D/g, "");
    if (name === 'minPrice') {
      setMinPrice(value ? parseInt(value, 10) : gMinPrice);
    } else {
      setMaxPrice(value ? parseInt(value, 10) : gMaxPrice);
    }
  }, []);

  const handleCheckboxChange = useCallback((category, characteristic) => {
    setSelectedCharacteristics((prev) => {
      const newSelected = { ...prev };
      if (newSelected[category].includes(characteristic)) {
        newSelected[category] = newSelected[category].filter((item) => item !== characteristic);
      } else {
        newSelected[category].push(characteristic);
      }
      return newSelected;
    });
  }, []);

  const handleApplyFilters = useCallback(() => {
    setFilter({
      minPrice,
      maxPrice,
      selectedCharacteristics
    });
    console.log(filter, sortBy, currentPage);
  }, [minPrice, maxPrice, selectedCharacteristics]);

  const handleResetFilters = useCallback(() => {
    setMinPrice(gMinPrice);
    setMaxPrice(gMaxPrice);
    setSelectedCharacteristics({
      'Điểm đánh giá': [],
      'Loại hình lưu trú': [],
      'Tiện nghi': []
    });
  }, []);

  const [isMapView, setIsMapView] = useState(false);
  const [isListView, setIsListView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
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

    setStatusLocation(location);
    setLocation(location);
    setCheckInOut([validCheckIn, validCheckOut]);
    setGuestsAndRooms({ adults: validAdults, children: validChildren, rooms: validRooms });

    async function getResults() {
      setIsLoading(true);
      try {
        const response = await searchServices.searchBySpec_Filter_Sort_Page(
          location,
          validCheckIn,
          validCheckOut,
          validAdults,
          validChildren,
          
        );
        setSearchResults(response.data);
        setTotalResults(response.total);
      } catch (error) {
        console.error("Error occurred during search:", error);
        // Handle the error, e.g., show an error message to the user
      } finally {
        setIsLoading(false);
      }
    };

    getResults();

  }, [reactLocation.search, filter, sortBy, currentPage]);

  const fetchHotelsWithinBounds = useCallback(debounce(async (bounds) => {
    setIsLoading(true);
    try {
      const response = await searchServices.searchByMapBounds(bounds);
      setSearchResults(response);
    } catch (error) {
      console.error("Error occurred during search within bounds:", error);
      // Handle the error, e.g., show an error message to the user
    } finally {
      setIsLoading(false);
    }
  }, 500), []);

  return (
    isMapView ? (
      <div className="relative">
        <Map center={[51.505, -0.09]} zoom={13} results={searchResults} fetchHotelsWithinBounds={fetchHotelsWithinBounds} />
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
            <div className="w-80 h-full transition-all duration-300">
              <ShowOnMap onShowMapView={() => setIsMapView(true)} />
              <Divider />
              <Filter
                minPrice={minPrice}
                maxPrice={maxPrice}
                selectedCharacteristics={selectedCharacteristics}
                onSliderChange={handleSliderChange}
                onPriceInputChange={handlePriceInputChange}
                onCheckboxChange={handleCheckboxChange}
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
              />
            </div>

            <div className="flex flex-col w-full items-center space-y-4">
              <SearchStatus
                location={statusLocation}
                found={searchResults.length}
                onChange={(value) => setSortBy(value)}
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
                        pageSize={6}
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

export default withCommonLayout(SearchPage);
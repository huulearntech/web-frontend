import React, { useState, useCallback } from 'react';
import { Button } from 'antd';
import 'moment/locale/vi';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import searchServices from '../../services/searchServices';

import Location from './Location';
import InoutDate from './InoutDate';
import GuestsAndRooms from './GuestsAndRooms';

const SearchButton = React.memo(({ handleSubmit, isLoading }) => {
  return (
    <Button
      type='primary'
      icon={<SearchOutlined style={{ fontSize: '20px', marginRight: '4px', color: 'white' }} />}
      size='large'
      onClick={handleSubmit}
      loading={isLoading}
    >
      <span className='text-[16px] font-semibold text-white'>Tìm kiếm</span>
    </Button>
  );
});

const SearchBar = ({ spec, setSpec }) => {
  const navigate = useNavigate();
  const { location, checkInOut, guestsAndRooms } = spec;
  const [isLoading, setIsLoading] = useState(false);

  const setLocation = (newLocation) => {
    setSpec((prevSpec) => ({ ...prevSpec, location: newLocation }));
  };

  const setCheckInOut = (newCheckInOut) => {
    setSpec((prevSpec) => ({ ...prevSpec, checkInOut: newCheckInOut }));
  };

  const setGuestsAndRooms = (newGuestsAndRooms) => {
    setSpec((prevSpec) => ({ ...prevSpec, guestsAndRooms: newGuestsAndRooms }));
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setIsLoading(true);
    const { checkInDate, checkOutDate } = checkInOut.reduce((acc, date, index) => {
      if (index === 0) {
        acc.checkInDate = date.format('YYYY-MM-DD');
      } else {
        acc.checkOutDate = date.format('YYYY-MM-DD');;
      }
      return acc;
    }, {});

    // Replace with actual fetch logic
    // searchServices.searchBySpec(location, checkInDate, checkOutDate, guestsAndRooms.adults, guestsAndRooms.children, guestsAndRooms.rooms);
    const queryParams = new URLSearchParams({
      location: location,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      adults: guestsAndRooms.adults,
      children: guestsAndRooms.children,
      rooms: guestsAndRooms.rooms,
    }).toString();

    setIsLoading(false);
    navigate(`/search?${queryParams}`);
  }, [location, checkInOut, guestsAndRooms, navigate]);

  return (
    <div className="flex w-full max-w-7xl items-end justify-center space-x-2">
      <Location location={location} setLocation={setLocation} />
      <InoutDate checkInOut={checkInOut} setCheckInOut={setCheckInOut} />
      <GuestsAndRooms guestsAndRooms={guestsAndRooms} setGuestsAndRooms={setGuestsAndRooms} />
      <SearchButton handleSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}

export default SearchBar;
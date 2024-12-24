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

const SearchBar = ({ location, checkInOut, guestsAndRooms, setLocation, setCheckInOut, setGuestsAndRooms }) => {
  const navigate = useNavigate();
  console.log('SearchBar location:', location);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const checkInOutDate = checkInOut.map(date => date ? date.toDate() : null);

    const queryParams = new URLSearchParams({
      location: location,
      checkIn: checkInOutDate[0]? checkInOutDate[0].toISOString() : '',
      checkOut: checkInOutDate[1]? checkInOutDate[1].toISOString() : '',
      adults: guestsAndRooms.adults,
      children: guestsAndRooms.children,
      rooms: guestsAndRooms.rooms
    }).toString();

    navigate(`/search?${queryParams}`);
    // navigate(`/search?location=${location}&checkIn=${checkInOutDate[0].toISOString()}&checkOut=${checkInOutDate[1].toISOString()}&adults=${guestsAndRooms.adults}&children=${guestsAndRooms.children}&rooms=${guestsAndRooms.rooms}`);

  }, [location, checkInOut, guestsAndRooms, navigate]);

  return (
    <div className="flex w-full max-w-7xl items-end justify-center space-x-2">
      <Location location={location} setLocation={setLocation} />
      <InoutDate checkInOut={checkInOut} setCheckInOut={setCheckInOut} />
      <GuestsAndRooms guestsAndRooms={guestsAndRooms} setGuestsAndRooms={setGuestsAndRooms} />
      <SearchButton handleSubmit={handleSubmit} isLoading={false} />
    </div>
  );
}

export default React.memo(SearchBar);
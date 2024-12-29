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
    const checkInDate = (checkInOut && checkInOut[0]) ?
      checkInOut[0].toDate()
      :
      new Date(new Date().setDate(new Date().getDate() + 1));
    const checkOutDate = (checkInOut && checkInOut[1]) ?
      checkInOut[1].toDate()
      :
      new Date(new Date().setDate(new Date().getDate() + 2));

    const queryParams = new URLSearchParams({
      location: location,
      checkIn: checkInDate.toISOString(),
      checkOut: checkOutDate.toISOString(),
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
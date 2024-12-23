// HomePage.js
import React, { useState } from 'react';
import FavoriteDestination from './FavoriteDestination';
import WhyUs from './WhyUs';
import SearchBar from '../../components/search_bar/index copy';
import { Divider } from 'antd';

const HomePage = () => {
  const [spec, setSpec] = useState({
    location: '',
    checkInOut: [],
    guestsAndRooms: { adults: 2, children: 0, rooms: 1 },
  });

  return (
    <div className="flex flex-col items-center justify-start space-y-4">
      <div className="flex w-full h-96 items-center justify-center bg-gray-300">
        <div className="flex w-full max-w-7xl p-2 rounded-lg bg-white">
          <SearchBar spec={spec} setSpec={setSpec}/>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-7xl space-y-4">

        <FavoriteDestination />
        <FavoriteDestination />
        <FavoriteDestination />
        <Divider />
        <WhyUs />
      </div>
    </div>
  );
};

export default HomePage; 
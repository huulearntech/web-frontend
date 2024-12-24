import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import SimplifiedProductCard from '../../components/SimplifiedProductCard';
import searchServices from '../../services/searchServices';

const FavoriteDestination = ({ title, locations }) => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [hotels, setHotels] = useState({});

  useEffect(() => {
    const fetchHotels = async () => {
      const hotelsData = {};
      for (const location of locations) {
        const hotelsForLocation = await searchServices.getFavoriteHotelsAtLocation(location);
        hotelsData[location] = hotelsForLocation;
      }
      setHotels(hotelsData);
    };

    fetchHotels();
  }, [locations]);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Tabs
        defaultActiveKey={selectedLocation}
        onChange={(key) => setSelectedLocation(key)}
        className="w-full"
        size='large'
      >
        {locations.map((location) => (
          <Tabs.TabPane tab={location} key={location}>
            <div className="flex flex-row flex-wrap gap-4 transition-opacity duration-300">
              {hotels[location]?.slice(0, 5).map((hotel) => (
                <SimplifiedProductCard key={hotel.id} product={hotel} />
              ))}
            </div>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default FavoriteDestination;
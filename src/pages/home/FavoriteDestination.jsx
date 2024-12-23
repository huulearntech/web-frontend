import React, { useState } from 'react';
import { Tabs, Button, Card, Carousel } from 'antd';
import { GrNext } from 'react-icons/gr';

const { TabPane } = Tabs;

const locations = ['Đà Nẵng', 'Vũng Tàu', 'Hồ Chí Minh', 'Hà Nội'];
const hotels = {
  'Đà Nẵng': [
    { name: 'Hotel 1', description: 'Description 1' },
    { name: 'Hotel 2', description: 'Description 2' },
  ],
  'Vũng Tàu': [
    { name: 'Hotel 3', description: 'Description 3' },
    { name: 'Hotel 4', description: 'Description 4' },
  ],
  'Hồ Chí Minh': [
    { name: 'Hotel 5', description: 'Description 5' },
    { name: 'Hotel 6', description: 'Description 6' },
  ],
  'Hà Nội': [
    { name: 'Hotel 7', description: 'Description 7' },
    { name: 'Hotel 8', description: 'Description 8' },
  ],
};

const FavoriteDestination = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <div className="flex flex-col items-start">
      <h2 className="text-2xl font-bold">Top các điểm đến được yêu thích</h2>
      <Tabs
        defaultActiveKey={selectedLocation}
        onChange={(key) => setSelectedLocation(key)}
        className="w-full"
        size='large'
      >
        {locations.map((location) => (
          <TabPane tab={location} key={location}>
            <div className="flex flex-row flex-wrap gap-4 transition-opacity duration-300">
              {hotels[location].map((hotel, index) => (
                <Card key={index} className="w-full md:w-1/2 lg:w-1/3 bg-blue-200" title={hotel.name}>
                  <p>{hotel.description}</p>
                </Card>
              ))}
            </div>
          </TabPane>
        ))}
      </Tabs>
      <Button
        type="primary"
        className="flex items-center justify-center mt-4 px-4 py-2 rounded-full font-semibold transition-colors duration-300 hover:bg-blue-600"
      >
        <span>Book Hotel Now</span>
        <GrNext className="inline-block ml-2" />
      </Button>
    </div>
  );
};

export default FavoriteDestination;
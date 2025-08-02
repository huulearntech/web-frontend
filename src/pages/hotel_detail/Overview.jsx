import React from 'react';
import { Button, Rate, Tag, Carousel } from 'antd';

const HotelInfo = ({ hotel }) => {
  const { name, type, rating, minPrice, address, amenities, description } = hotel;
  return (
    <div id='overview' className="w-full flex flex-col p-4 bg-white shadow-md rounded-lg">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{name}</h1>
          <Tag color="blue">{type}</Tag>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex flex-col mr-4 items-end">
            <span className="text-sm text-gray-500">Giá/phòng/đêm từ:</span>
            <span className='font-bold text-xl text-orange-600'>{minPrice} VND</span>
          </div>
          <Button type="primary" className='font-semibold'>Xem phòng</Button>
        </div>
      </div>

      <div className="flex flex-row items-center mb-4">
        <Rate disabled defaultValue={rating} className="mr-4" />
        <span className="text-gray-500">{address}</span>
      </div>
      <div className="flex flex-wrap mb-4">
        {amenities.map((amenity, index) => (
          <Tag key={index} color="green" className="mr-2 mb-2">{amenity}</Tag>
        ))}
      </div>
      <div>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  )
};

const Overview = ({ hotel }) => {
  return (
    <div className="w-full bg-gray-100 rounded-lg shadow-lg">
      <Carousel autoplay>
        <div>
          <img className="w-full h-128 object-cover rounded-lg" src="https://placehold.co/800x400" alt="placeholder" />
        </div>
        {/* Add more carousel items here if needed */}
      </Carousel>
      <div className="mt-4">
        <HotelInfo hotel={hotel} />
      </div>
    </div>
  );
};

export default Overview;
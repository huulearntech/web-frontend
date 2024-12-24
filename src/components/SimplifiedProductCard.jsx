import React from 'react';
import { Rate, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaBuilding as AccommodationIcon } from 'react-icons/fa';
import { PiMapPinFill as LocationIcon } from 'react-icons/pi';

const SimplifiedProductCard = ({ product }) => {
  const navigate = useNavigate();

  const cardWrapper = 'flex flex-col w-60 h-96 bg-white shadow-lg rounded-lg overflow-hidden duration-300 hover:shadow-blue-300 cursor-pointer';
  const cardImage = 'object-cover h-48 bg-gray-300 w-full';
  const cardContent = 'flex flex-col p-4 w-full h-full justify-between'; // Updated
  const cardDescription = 'flex flex-col flex-grow items-start h-full space-y-2';

  return (
    <div className={cardWrapper} onClick={() => console.log('clicked')}>
      <img alt={product.name} src={product.images? product.images[0] : null} className={cardImage} />
      <div className={cardContent}>
        <div className={cardDescription}>
          <h2 className="font-bold line-clamp-2 text-sm">{product.name}</h2>
          <div className='flex flex-col space-y-2'>
            <Rate
              disabled
              defaultValue={product.rating}
              allowHalf
              style={{ fontSize: '14px', marginRight: '-4px' }}
            />
            <div className='flex items-center text-blue-500 text-sm space-x-2'>
              <AccommodationIcon />
              <span>{product.accommodation}</span>
            </div>

            <div className='flex items-center text-gray-700 text-sm space-x-2'>
              <LocationIcon />
              <span>{product.location}</span>
            </div>
          </div>
        </div>
        <span className='self-start font-semibold text-orange-600'>{product.price} VND</span>
      </div>
    </div>
  );
};

export default SimplifiedProductCard;
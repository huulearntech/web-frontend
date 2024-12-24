import React from 'react';
import { Rate, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaBuilding as AccommodationIcon } from 'react-icons/fa';
import { PiMapPinFill as LocationIcon } from 'react-icons/pi';

const MapProductCard = ({ product }) => {
  const navigate = useNavigate();

  const cardWrapper = 'w-60 mx-auto shadow-lg rounded-lg overflow-hidden duration-300 hover:shadow-blue-300';
  const cardImage = 'object-cover h-48 w-full';
  const cardContent = 'flex flex-col p-4 w-full space-y-4 divide-y divide-gray-200';
  const cardDescription = 'flex flex-col space-y-2';
  const cardPricing = 'h-12 flex flex-row justify-between items-center';

  return (
    <div className={cardWrapper}>
      <img alt={product.name} src={product.images[0]} className={cardImage} />
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
        <div className={cardPricing}>
          <p className='text-xl font-bold text-orange-600'>${product.price}</p>
          <Button
            type="primary"
            onClick={() => {
              navigate(`/product-detail/${product.id}`, { state: { product } });
            }}
          >
            Xem
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapProductCard;
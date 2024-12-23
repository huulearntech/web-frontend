import React from 'react';
import { Rate, Button, Popover, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaBuilding as AccommodationIcon } from 'react-icons/fa';
import { PiMapPinFill as LocationIcon } from 'react-icons/pi';

import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import userServices from '../services/userServices';
import { notification } from 'antd';

const ProductCard = ({ product, isListView, isLoading, isLiked }) => {
  const navigate = useNavigate();

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      notification.info({
        message: "Bạn chưa đăng nhập",
        description: "Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích.",
        pauseOnHover: false,
      });
      return;
    }

    try {
      await userServices.addFavorite(product.id);
    } catch (error) {
      console.error("Error adding favorite:", error);
      alert("Failed to add favorite. Please try again.");
    }
  };

  const cardWrapper = isListView ? 'relative flex flex-row w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden duration-300 hover:shadow-blue-300' : 'relative w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden duration-300 hover:shadow-blue-300';
  const cardImage = isListView ? 'object-cover h-full w-72' : 'object-cover h-48 w-full';
  const cardContent = isListView ? 'flex flex-row p-4 w-full space-x-4 divide-x divide-gray-200' : 'flex flex-col p-4 w-full space-y-4 divide-y divide-gray-200';
  const cardDescription = isListView ? 'flex flex-col w-full space-y-4' : 'h-48 flex flex-col space-y-4';
  const cardPricing = isListView ? 'flex flex-col w-60 justify-end items-end border-l border-gray-200 space-y-6' : 'h-12 flex flex-row justify-between items-end';

  return (
    <Skeleton loading={isLoading} active>
      <div className={cardWrapper}>
        <img alt={product.name} src={product.images[0]} className={cardImage} />
        <div className={cardContent}>
          <div className={cardDescription}>
            <h2 className="font-bold line-clamp-2">{product.name}</h2>

            <div className="flex flex-col space-y-4">
              <div className="flex flex-row items-center justify-between">
                <div className='flex flex-col space-y-2'>
                  <div className='flex items-center text-blue-500 text-sm space-x-2'>
                    <AccommodationIcon />
                    <span>{product.accommodation}</span>
                  </div>

                  <div className='flex items-center text-gray-700 text-sm space-x-2'>
                    <LocationIcon />
                    <span>{product.location}</span>
                  </div>
                </div>

                <div className='flex flex-col items-end space-y-2'>
                  <Rate
                    disabled
                    defaultValue={product.rating}
                    allowHalf
                    style={{ fontSize: '14px', marginRight: '-4px' }}
                  />
                  <span className="text-sm text-gray-700">( ... )</span>
                </div>
              </div>

              <div className='flex flex-wrap'>
                {product.amenities.slice(0, 3).map((amenity, index) => (
                  <span key={index} className="bg-gray-200 text-gray-700 px-2 rounded-full text-xs mr-2 mb-2">
                    {amenity}
                  </span>
                ))}
                {product.amenities.length > 3 && (
                  <Popover
                    content={product.amenities.slice(3).map((amenity, index) => (
                      <span key={index} className="block text-gray-700 text-xs mb-1">
                        {amenity}
                      </span>
                    ))}
                    title="Tiện nghi khác"
                    overlayStyle={{ maxWidth: '160px' }}
                  >
                    <span className="bg-gray-200 text-gray-700 px-2 rounded-full text-xs mr-2 mb-2 cursor-pointer">
                      +{product.amenities.length - 3}
                    </span>
                  </Popover>
                )}
              </div>
            </div>
          </div>
          <div className={cardPricing}>
            <p className='text-xl font-bold text-orange-600'>${product.price}</p>
            <Button
              type="primary"
              onClick={() => {
                console.log('View product');
                navigate(`/product-detail/${product.id}`);
              }}
            >
              Xem
            </Button>
          </div>
        </div>
        <Button
          className={"absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full"}
          onClick={handleLike}
          loading={false}
          icon={isLiked ? <HeartFilled className='text-red-500' /> : <HeartOutlined />}
        >
        </Button>
      </div>
    </Skeleton>
  );
};

export default ProductCard;
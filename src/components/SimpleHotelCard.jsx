import { Rate } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined as AccommodationIcon,
  EnvironmentOutlined as LocationIcon
} from '@ant-design/icons';

const SimpleHotelCard = ({ hotel }) => {
  const {
    id,
    name,
    imageSrcs,
    location,
    price,
    rating,
    type,
  } = hotel;
  const cardWrapper = 'flex flex-col w-60 h-96 bg-white shadow-lg rounded-lg overflow-hidden duration-300 hover:shadow-blue-300 cursor-pointer';
  const cardImage = 'object-cover h-48 bg-gray-300 w-full';
  const cardContent = 'flex flex-col p-4 w-full h-full justify-between'; // Updated
  const cardDescription = 'flex flex-col flex-grow items-start h-full space-y-2';

  return (
    <Link to={`/hotels/${id}`}>
      <div className={cardWrapper}>
        <img alt={name} src={imageSrcs ? imageSrcs[0] : null} className={cardImage} />
        <div className={cardContent}>
          <div className={cardDescription}>
            <h2 className="font-bold line-clamp-2 text-sm text-gray-700">{name}</h2>
            <div className='flex flex-col space-y-2'>
              <Rate
                disabled
                defaultValue={rating}
                allowHalf
                style={{ fontSize: '12px' }}
              />
              <div className='flex items-center text-blue-500 text-sm space-x-2'>
                <AccommodationIcon />
                <span>{type}</span>
              </div>

              <div className='flex items-center text-gray-700 text-sm space-x-2'>
                <LocationIcon />
                <span>{location}</span>
              </div>
            </div>
          </div>
          <span className='text-lg font-semibold text-orange-600'>{price} VND</span>
        </div>
      </div>
    </Link>
     );
};

export default SimpleHotelCard;
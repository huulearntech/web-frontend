import { useState } from "react";
import { Link } from "react-router-dom";
import { Rate, Button, Tooltip  } from "antd";
import {
  EnvironmentOutlined as LocationIcon,
  HeartOutlined,
  HeartFilled
} from "@ant-design/icons";

import paths from "../const/paths";


const hotel_icon = "https://ik.imagekit.io/tvlk/image/imageResource/2023/03/28/1679986877455-c9fba4a49268f20248a89a0b68c86973.png?tr=h-12,q-75,w-12";

const HotelCard = ({ hotel }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const {
    id,
    name,
    imageSrcs,
    location,
    price,
    rating,
    type,
    amenities,
    numberOfReviews
  } = hotel;
  return (
    <div className="flex w-full bg-white rounded-xl shadow-lg hover:shadow-blue-300/50">
      {/* images */}
      <div className="w-2/6 relative">
        <img
          src={imageSrcs[0]}
          alt={name}
          className="h-full w-auto object-cover rounded-l-xl"
        />
        <Tooltip title={isFavorite ? "Bỏ thích" : "Yêu thích"}>
          <button
            className={`absolute right-2 top-2 text-center cursor-pointer size-8 rounded-full
              bg-white hover:bg-gray-100 hover:shadow-md ${isFavorite ? "text-red-500" : "text-black"}`}
            aria-label="Toggle favorite"
            style={{ zIndex: 10 }}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite
              ? <HeartFilled />
              : <HeartOutlined />}
          </button>
        </Tooltip>
      </div>
      {/* end images */}

      {/* details */}
      <div className="flex w-4/6 p-4 divide-x-2 divide-gray-200">
        <div className="w-3/4 pr-2">
          <h2 className="text-base font-semibold line-clamp-2">{name}</h2>
          <div className="flex flex-col space-y-1">
            <div>
              <Rate
                disabled
                defaultValue={rating}
                allowHalf
                style={{ fontSize: "12px" }}
              />
              <span className="ml-2 text-sm text-gray-700">{"(" + numberOfReviews + " đánh giá)"}</span>
            </div>
            <div className="text-blue-500 bg-blue-50 inline-flex items-center w-fit p-1 rounded">
              <img src={hotel_icon} alt="Hotel Icon" className="mr-2" />
              <span className="text-xs font-semibold">{type}</span>
            </div>

            <div className="text-gray-700 inline-flex items-center">
              <LocationIcon style={{ fontSize: "12px" }} />
              <span className="ml-2">{location}</span>
            </div>
            <div className="flex flex-wrap space-x-2 mt-1">
              {amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 font-semibold text-xs px-2 py-1 rounded">
                  {amenity}
                </span>
              ))}
              {amenities.length > 3 && (
                <Tooltip
                  title={
                    <div className="p-2">
                     <p className="mb-2">Cơ sở lưu trú này có:</p>
                     <ul className="list-disc grid grid-cols-2 gap-1 pl-3">
                       {amenities.map((amenity, index) => (
                         <li key={index}>{amenity}</li>
                       ))}
                     </ul>
                    </div>
                  }
                >
                  <span className="bg-gray-200 text-gray-700 font-semibold text-xs px-2 py-1 rounded">
                    +{amenities.length - 3}
                  </span>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
        {/* end details */}

        {/* price and button */}
        <div className="flex flex-col items-end justify-end w-1/4">
          <span className="text-gray-500 text-sm">Giá từ</span>
          <span className="font-semibold text-lg text-orange-600 mb-2">VND {price}</span>
          <Link
            to={`${paths.hotelDetail}/${id}`}
            target="_blank"
            className="text-blue-500 hover:underline">
            <Button type="primary">Xem</Button>
          </Link>
        </div>
        {/* end price and button */}
      </div>
    </div>
  );
};

export default HotelCard;
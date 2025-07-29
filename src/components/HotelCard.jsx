import { useState } from "react";
import { Rate, Button, Tooltip, Carousel } from "antd";
import {
  EnvironmentOutlined as LocationIcon,
  HomeOutlined as AccommodationIcon,
  HeartOutlined,
  HeartFilled
} from "@ant-design/icons";
import { Link } from "react-router-dom";

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
    <div className="flex w-4xl bg-white rounded-xl shadow-lg hover:shadow-blue-300/50">
      {/* images */}
      <div className="w-2/6 relative">
        <Carousel arrows infinite={false}>
          {imageSrcs.map((src, index) => (
            <img
              key={index}
              alt={`${name} - Image ${index + 1}`}
              src={src}
              className="w-full h-48 object-cover rounded-l-lg"
            />
          ))}
        </Carousel>
        <Tooltip title={isFavorite ? "Bỏ thích" : "Yêu thích"}>
          <button
            className={"absolute right-2 top-2 text-center cursor-pointer size-8 rounded-full bg-white hover:bg-gray-200"}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite
              ? <HeartFilled style={{ color: "red" }} />
              : <HeartOutlined />}
          </button>
        </Tooltip>
      </div>
      {/* end images */}

      {/* details */}
      <div className="flex w-4/6 p-4 divide-x-2 divide-gray-200">
        <div className="w-3/4 pr-2">
          <h2 className="font-semibold line-clamp-2">{name}</h2>
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
            <div className="text-blue-500 text-sm">
              <AccommodationIcon />
              <span className="ml-2">{type}</span>
            </div>

            <div className="text-gray-700 text-sm">
              <LocationIcon />
              <span className="ml-2">{location}</span>
            </div>
            <div className="flex flex-wrap space-x-2 mt-1">
              {amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 rounded-full">
                  {amenity}
                </span>
              ))}
              {amenities.length > 3 && (
                <Tooltip
                  title={amenities.slice(3).map((amenity, index) => (
                    <span key={index} className="block text-xs">
                      {amenity}
                    </span>
                  ))}
                  style={{ root: { maxWidth: "160px" } }}
                >
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 rounded-full">
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
          <Link to={`/hotels/${id}`} className="text-blue-500 hover:underline">
            <Button type="primary">Xem</Button>
          </Link>
        </div>
        {/* end price and button */}
      </div>
    </div>
  );
};

export default HotelCard;
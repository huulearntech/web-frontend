import { Rate, Tag, Image, Row, Col } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import {
  air_conditioner_icon,
  parking_icon,
  knife_fork_icon,
  elevator_icon,
  pool_icon,
  wifi_icon,
  receptionist_24h_icon,
  tvlk_title_logo
} from '../../assets/icons/iconUrl';

const Overview = ({ hotel }) => {
  const { name, type, rating, minPrice, address, amenities, description } = hotel;

  return (
    <div id='overview' className="w-full flex flex-col space-y-4 rounded-lg overflow-hidden">
      <Image.PreviewGroup preview={{ toolbarRender: () => null }}>
        <Row gutter={[8, 8]} justify="center">
          <Col span={9}>
            <Image src={hotel.images[0]} alt={`Image 1`} />
          </Col>

          <Col span={15}>
            <Row gutter={[8, 16]}>
              <Col span={8}>
                <Image src={hotel.images[1]} alt={`Image 2`} />
              </Col>
              <Col span={8}>
                <Image src={hotel.images[2]} alt={`Image 3`} />
              </Col>
              <Col span={8}>
                <Image src={hotel.images[2]} alt={`Image 3`} />
              </Col>
            </Row>

            <Row gutter={[8, 16]}>
              <Col span={8}>
                <Image src={hotel.images[3]} alt={`Image 4`} />
              </Col>
              <Col span={8}>
                <Image src={hotel.images[4]} alt={`Image 5`} />
              </Col>
              <Col span={8}>
                <Image src={hotel.images[5]} alt={`Image 6`} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Image.PreviewGroup>

      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{name}</h1>
          <div className="flex items-center">
            <Tag color="blue">{type}</Tag>
            <Rate disabled defaultValue={rating} style={{ marginRight: '8px' }} />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500">Giá/phòng/đêm từ:</span>
            <span className="font-bold text-xl text-orange-600">{minPrice} VND</span>
          </div>
          <a href="#available-rooms"
            className="bg-orange-500 text-white p-2 rounded-md font-semibold
            hover:bg-orange-600 transition-colors"
          >
            Chọn phòng
          </a>
        </div>
      </div>

      {/* 3 cards go here: Review, Location, Amenities */}
      <div className="flex flex-wrap gap-3">
        <div className="bg-white border border-gray-200 rounded-lg p-2 flex-1">
          <div className="flex space-x-4">
            <div className="flex items-center">
              <img src={tvlk_title_logo} alt="Tvlk Icon" className="mr-2" />
              <div className="flex items-end text-blue-500">
                <div className="text-2xl font-bold">{rating}</div>
                <div className="text-sm font-semibold"> /10 </div>
              </div>
            </div>

            <div className="flex flex-col font-semibold">
              <span>Rất tốt</span>
              <a href="#feedbacks" className="text-sm text-blue-500">
                {hotel.feedbacks.length} đánh giá
                <RightOutlined />
              </a>
            </div>
          </div>
          <h2 className="font-semibold mb-2">Khách nói gì về kỳ nghỉ của họ</h2>
          { /*
            review_tags.map((tag, index) => (
              <Tag key={index} color="green" className="mr-1">
                {tag}
              </Tag>
            ))
            */
          }
          <div className="flex flex-col overflow-y-auto max-h-32 space-y-2">
            {hotel.feedbacks.map((feedback, index) => (
              <div key={index} className="border border-gray-200 rounded p-2">
                <span>{feedback.author}</span>
                <p className="text-gray-700">{feedback.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-4 flex-1" >
          <div className="flex items-center justify-between mb-2 font-semibold" >
            <h2>Vị trí</h2>
            <a href="#location" className="text-sm text-blue-500 ml-2">
              Xem bản đồ
              <RightOutlined />
            </a>
          </div>
          <div className="text-gray-700">
            <p>{address}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-4 flex-1">
          <div className="flex items-center justify-between mb-2 font-semibold">
            <h2>Tiện nghi</h2>
            <a href="#amenities" className="text-sm text-blue-500 ml-2">
              Xem thêm
              <RightOutlined />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="inline-flex items-center">
              <img src={air_conditioner_icon} alt="Air Conditioner Icon" className="size-6 mr-2" />
              <span className="text-sm">Máy lạnh</span>
            </div>
            <div className="inline-flex items-center">
              <img src={parking_icon} alt="Parking Icon" className="size-6 mr-2" />
              <span className="text-sm">Chỗ đậu xe</span>
            </div>
            <div className="inline-flex items-center">
              <img src={knife_fork_icon} alt="Restaurant Icon" className="size-6 mr-2" />
              <span className="text-sm">Nhà hàng</span>
            </div>
            <div className="inline-flex items-center">
              <img src={elevator_icon} alt="Elevator Icon" className="size-6 mr-2" />
              <span className="text-sm">Thang máy</span>
            </div>
            <div className="inline-flex items-center">
              <img src={pool_icon} alt="Pool Icon" className="size-6 mr-2" />
              <span className="text-sm">Hồ bơi</span>
            </div>
            <div className="inline-flex items-center">
              <img src={wifi_icon} alt="Wifi Icon" className="size-6 mr-2" />
              <span className="text-sm">Wifi</span>
            </div>
            <div className="inline-flex items-center">
              <img src={receptionist_24h_icon} alt="Receptionist Icon" className="size-6 mr-2" />
              <span className="text-sm">Tiếp tân 24h</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default Overview;
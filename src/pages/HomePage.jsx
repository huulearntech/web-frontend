import { useState, useEffect } from 'react';
import { Divider, Tabs } from 'antd';

import SearchBar from '../components/search_bar';

import HomePageBg from '../../assets/images/homepage_bg.jpeg';
import HotelPartners from '../../assets/images/hotel_partners.png';
import PaymentPartners from '../../assets/images/payment_partner.png';
import SimplifiedProductCard from '../components/SimplifiedProductCard';
import searchServices from '../services/searchServices';

import luggage from '../../assets/icons/luggage.webp';
import checklist from '../../assets/icons/checklist.webp';
import shield from '../../assets/icons/shield.webp';

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

const Partners = ({ title, description, imageSrc }) => {
  return (
    <div className="flex flex-row w-full h-60 items-center justify-center bg-white rounded-lg shadow-lg space-x-12 p-4">
        <div className="w-full flex flex-col justify-start space-y-4">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      <img src={imageSrc} alt={title} className="w-full" />
    </div>
  );
};

const WhyUsCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-row w-full items-center bg-white rounded-lg shadow-sm p-4 space-x-4">
      <img src={icon} alt={title} />
      <div className="flex flex-col">
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

const WhyUs = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 bg-gray-100">
      <h1 className="text-2xl font-semibold">Lý do nên đặt chỗ với Traveloka?</h1>
      <div className="flex flex-row w-full justify-center space-x-10 mt-10">
        <WhyUsCard icon={luggage} title="Đáp ứng mọi nhu cầu của bạn" description="Từ chuyến bay, lưu trú, đến điểm tham quan, bạn có thể tin chọn sản phẩm hoàn chỉnh và Hướng Dẫn Du Lịch của chúng tôi." />
        <WhyUsCard icon={checklist} title="Tùy chọn đặt chỗ linh hoạt" description="Kế hoạch thay đổi bất ngờ? Đừng lo!Đổi lịch hoặc Hoàn tiền dễ dàng." />
        <WhyUsCard icon={shield} title="Thanh toán an toàn và thuận tiện" description="Tận hưởng nhiều cách thanh toán an toàn, bằng loại tiền thuận tiện nhất cho bạn." />
      </div>
    </div>
  );
};

const HomePage = () => {
  const [location, setLocation] = useState('');
  const [checkInOut, setCheckInOut] = useState([]);
  const [guestsAndRooms, setGuestsAndRooms] = useState({ adults: 2, children: 0, rooms: 1 });

  return (
    <div className="flex flex-col items-center justify-start space-y-4">
      <div
        className="flex w-full h-96 items-center justify-center bg-gray-300"
        style={{
          backgroundImage: `url(${HomePageBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="flex w-full max-w-7xl p-2 rounded-lg bg-white">
          <SearchBar
            location={location}
            checkInOut={checkInOut}
            guestsAndRooms={guestsAndRooms}
            setCheckInOut={setCheckInOut}
            setLocation={setLocation}
            setGuestsAndRooms={setGuestsAndRooms}
          />
        </div>
      </div>
      <div className="flex flex-col w-full max-w-7xl space-y-4">

        <FavoriteDestination title={"Deal nội địa tiết kiệm cuối năm"} locations={['Đà Nẵng', 'Vũng Tàu', 'Hồ Chí Minh', 'Hà Nội', 'Đà Lạt']} />
        <Divider />
        <FavoriteDestination title={"Vi vu quốc tế cuối năm"} locations={['Bangkok', 'Singapore', 'Kuala Lumpur', 'Seoul']} />
        <div className='flex flex-col items-center justify-center h-20'>
          <Divider />
        </div>

        <Partners title="Đối tác khách sạn" description="Chúng tôi hợp tác với các chuỗi khách sạn trên toàn thế giới để bảo đảm mang lại kỳ nghỉ tuyệt vời nhất tại mọi điểm đến trong mơ của bạn!" imageSrc={HotelPartners} />
        <Divider />
        <Partners title="Đối tác thanh toán" description="Những đối tác thanh toán đáng tin cậy của chúng tôi sẽ giúp cho bạn luôn an tâm thực hiện mọi giao dịch một cách thuận lợi nhất!" imageSrc={PaymentPartners} />
        <div className='flex flex-col items-center justify-center h-20'>
          <Divider />
        </div>
        <WhyUs />
      </div>
    </div>
  );
};

export default HomePage; 
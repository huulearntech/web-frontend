import { useState, useEffect } from 'react';
import { Divider, Tabs } from 'antd';

import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

import HotelPartners from '../assets/images/hotel_partners.png';
import PaymentPartners from '../assets/images/payment_partner.png';
import SimpleHotelCard from '../components/SimpleHotelCard';
import searchServices from '../services/searchServices';

const home_page_bg = "https://ik.imagekit.io/tvlk/image/imageResource/2025/01/05/1736039153373-64c979a852c7ec9063c6f2104bcf58dd.png?tr=q-75";
const luggage_icon = "https://ik.imagekit.io/tvlk/image/imageResource/2023/06/14/1686718236517-bf9a3e5ffd872b781ba2e56e93fe8840.webp?tr=h-64,q-75,w-64";
const checklist_icon = "https://ik.imagekit.io/tvlk/image/imageResource/2023/06/14/1686718238370-9ef6b6e0701e9074614951c0bd49930c.webp?tr=h-64,q-75,w-64";
const shield_icon = "https://ik.imagekit.io/tvlk/image/imageResource/2023/06/14/1686718240417-96131eb957c39a098a12d2d7926e3342.webp?tr=h-64,q-75,w-64";

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
                <SimpleHotelCard key={hotel.id} hotel={hotel} />
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

const WhyUsCard = ({ imageSrc, title, description }) => {
  return (
    <div className="flex w-full items-center bg-white rounded-lg shadow-lg p-4 gap-4">
      <img src={imageSrc} alt={title} />
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  );
};

const WhyUsSection = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h1 className="text-2xl font-semibold">Lý do nên đặt chỗ với Traveloka?</h1>
      <div className="flex flex-row w-full justify-center space-x-10 mt-10">
        <WhyUsCard
          imageSrc={luggage_icon}
          title="Đáp ứng mọi nhu cầu của bạn"
          description={<>Từ chuyến bay, lưu trú, đến điểm tham quan, bạn có thể tin chọn <b>sản phẩm hoàn chỉnh</b> và <b>Hướng Dẫn Du Lịch</b> của chúng tôi.</>} 
        />
        <WhyUsCard
          imageSrc={checklist_icon}
          title="Tùy chọn đặt chỗ linh hoạt"
          description={<>Kế hoạch thay đổi bất ngờ? Đừng lo! <b>Đổi lịch</b> hoặc <b>Hoàn tiền</b> dễ dàng.</>}
        />
        <WhyUsCard
          imageSrc={shield_icon}
          title="Thanh toán an toàn và thuận tiện"
          description={<>Tận hưởng nhiều cách <b>thanh toán an toàn</b>, bằng loại tiền thuận tiện nhất cho bạn.</>}
        />
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-start space-y-4">
      <div
        className="flex w-full h-96 items-center justify-center bg-gray-300"
        style={{
          backgroundImage: `url(${home_page_bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <SearchBar />
      </div>

      <div className="flex flex-col w-full max-w-7xl space-y-4">
        <FavoriteDestination title={"Deal nội địa tiết kiệm cuối năm"} locations={['Đà Nẵng', 'Vũng Tàu', 'Hồ Chí Minh', 'Hà Nội', 'Đà Lạt']} />
        <Divider />
        <FavoriteDestination title={"Vi vu quốc tế cuối năm"} locations={['Bangkok', 'Singapore', 'Kuala Lumpur', 'Seoul']} />
        <div className='flex flex-col items-center justify-center h-20'>
          <Divider />
        </div>

        <Partners title="Đối tác khách sạn" description="Chúng tôi hợp tác với các chuỗi khách sạn trên toàn thế giới để bảo đảm mang lại kỳ nghỉ tuyệt vời nhất tại mọi điểm đến trong mơ của bạn!" imageSrc={HotelPartners} />
        <div className='flex flex-col items-center justify-center h-20'>
          <Divider />
        </div>
        <Partners title="Đối tác thanh toán" description="Những đối tác thanh toán đáng tin cậy của chúng tôi sẽ giúp cho bạn luôn an tâm thực hiện mọi giao dịch một cách thuận lợi nhất!" imageSrc={PaymentPartners} />
        <div className='flex flex-col items-center justify-center h-20'>
          <Divider />
        </div>
        <WhyUsSection />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage; 
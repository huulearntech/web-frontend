// HomePage.js
import React, { useState } from 'react';
import { Divider } from 'antd';

import SearchBar from '../../components/search_bar';
import FavoriteDestination from './FavoriteDestination';
import Partners from './Partners';
import WhyUs from './WhyUs';

import HomePageBg from '../../assets/images/homepage_bg.jpeg';
import HotelPartners from '../../assets/images/hotel_partners.png';
import PaymentPartners from '../../assets/images/payment_partner.png';

import withCommonLayout from '../../layouts_hoc/Common';

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

        <FavoriteDestination title={"Deal nội địa tiết kiệm cuối năm"} locations={['Đà Nẵng', 'Vũng Tàu', 'Hồ Chí Minh', 'Hà Nội', 'Đà Lạt']}/>
        <Divider />
        <FavoriteDestination title={"Vi vu quốc tế cuối năm"} locations={['Bangkok', 'Singapore', 'Kuala Lumpur', 'Seoul']} />
        <Divider />
        <Partners title="Đối tác khách sạn" description="Chúng tôi hợp tác với các chuỗi khách sạn trên toàn thế giới để bảo đảm mang lại kỳ nghỉ tuyệt vời nhất tại mọi điểm đến trong mơ của bạn!" imageSrc={HotelPartners} />
        <Divider />
        <Partners title="Đối tác thanh toán" description="Những đối tác thanh toán đáng tin cậy của chúng tôi sẽ giúp cho bạn luôn an tâm thực hiện mọi giao dịch một cách thuận lợi nhất!" imageSrc={PaymentPartners} />
        <Divider />
        <WhyUs />
      </div>
    </div>
  );
};

export default withCommonLayout(HomePage); 
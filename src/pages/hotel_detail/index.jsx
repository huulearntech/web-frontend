import Overview from "./Overview";
import AvailableRoomList from "./AvailableRoomList";
import Feedbacks from "./Feedbacks";
import SearchBar from "../../components/SearchBar";

import { Anchor } from "antd";

const HotelDetail = () => {

  // useEffect to get hotel details, rooms, and feedbacks can be added here

  return (
    <div className="bg-gray-100 w-full min-h-screen flex flex-col items-center justify-center">
          {/* <SearchBar /> */}
          <Anchor 
           direction="horizontal"
           items={[
            {
              key: 'overview',
              href: '#overview',
              title: 'Overview',
            },
            {
              key: 'available-rooms',
              href: '#available-rooms',
              title: 'Available Rooms',
            },
            {
              key: 'feedbacks',
              href: '#feedbacks',
              title: 'Feedbacks',
            },
          ]}
          />
        <Overview hotel={mockHotel} />
        <AvailableRoomList rooms={mockRooms} hotelName={mockHotel.name} />
        <Feedbacks feedbacks={mockFeedbacks} hotelName={mockHotel.name} />
    </div>
  );
};

export default HotelDetail;


// Mock data
const mockRooms = [
  {
    id: 1,
    name: 'Deluxe Room',
    images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
    area: '30',
    price: '$100',
    description: 'A deluxe room with all the amenities you need.',
    adults: 2,
    children: 1,
    amenities: ['Free WiFi', 'TV', 'Mini Bar']
  },
  {
    id: 2,
    name: 'Standard Room',
    images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
    area: '20',
    price: '$80',
    description: 'A standard room with basic amenities.',
    adults: 2,
    children: 0,
    amenities: ['Free WiFi', 'TV']
  }
];

const mockFeedbacks = [
  {
    id: 1,
    author: "John Doe",
    date: "2023-10-01",
    content: "Great experience! Highly recommend this hotel."
  },
  {
    id: 2,
    author: "Jane Smith",
    date: "2023-10-02",
    content: "The service was excellent and the rooms were clean."
  },
  {
    id: 3,
    author: "Alice Johnson",
    date: "2023-10-03",
    content: "Had a wonderful stay. Will come back again!"
  }
];

const mockHotel = {
  name: "Grand Hotel",
  type: "Luxury",
  rating: "5 stars",
  minPrice: "$200",
  address: "123 Main St, City, Country",
  amenities: ["Free WiFi", "Pool", "Spa", "Gym"],
  description: "The Grand Hotel offers luxurious rooms with stunning views, top-notch amenities, and exceptional service. Perfect for both business and leisure travelers."
};

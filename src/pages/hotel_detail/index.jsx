import Overview from "./Overview";
import AvailableRoomList from "./AvailableRoomList";
import Feedbacks from "./Feedbacks";
import SearchBar from "../../components/SearchBar";
import Amenities from "./Amenities";

import { Anchor, Affix, Breadcrumb } from "antd";

const HotelDetail = () => {

  // useEffect to get hotel details, rooms, and feedbacks can be added here

  return (
    <div className="bg-gray-100 w-full min-h-screen flex flex-col items-center justify-center">
      <Affix offsetTop={0}>
        <SearchBar />
      </Affix>
      <Anchor
        affix={{ offsetTop: 100 }}
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
            key: 'amenities',
            href: '#amenities',
            title: 'Amenities',
          },
          {
            key: 'feedbacks',
            href: '#feedbacks',
            title: 'Feedbacks',
          },
        ]}
      />
      <Breadcrumb
        items={[
          { title: 'Home', href: '/' },
          { title: 'Hotels', href: '/hotels' },
          { title: 'Hotel Detail' },
        ]}
      />
      <div className="flex flex-col w-full max-w-7xl bg-white shadow-md p-4">
        <Overview hotel={mockHotel} />
        <AvailableRoomList rooms={mockRooms} hotelName={mockHotel.name} />
        <Amenities />
        <Feedbacks feedbacks={mockFeedbacks} hotelName={mockHotel.name} />
      </div>
    </div>
  );
};

export default HotelDetail;


// Mock data
const mockRooms = [
  {
    id: 1,
    name: 'Deluxe Room',
    images: ['https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20048096-69f6ff7501afccbbdbd57cc3de21fc52.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724',
      'https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20048096-4fc3eb68978e69a7f493deb6dbddbc19.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724',
      'https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20048096-0e97b1980d4aa684427c0193e6b6418c.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724',],
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
    images: ['https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20048096-f9202bb9a81da005cc4ab07055bbd14b.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724',
        'https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20048096-8a6c1b937c736e9f8250cf77bf5b57f4.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724',
        'https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20048096-e69bac413dae2f3c84ef3e7471a70d44.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724',],
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
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
    date: "2023-10-01",
    rating: 10,
    content: "Great experience! Highly recommend this hotel.",
    images: ['https://ik.imagekit.io/tvlk/ugc-review/guys1L+Yyer9kzI3sp-pb0CG1j2bhflZGFUZOoIf1YOBAm37kEUOKR41ieUZm7ZJ/ugc-photo-ap-southeast-1-581603780057-acd24e232f75f09e/REVIEW/REVIEW_1753867915264_99a3366bb7715dcb?_src=imagekit&tr=c-at_max,h-1280,q-40,w-720',
      'https://ik.imagekit.io/tvlk/ugc-review/guys1L+Yyer9kzI3sp-pb0CG1j2bhflZGFUZOoIf1YOBAm37kEUOKR41ieUZm7ZJ/ugc-photo-ap-southeast-1-581603780057-acd24e232f75f09e/REVIEW/REVIEW_1753868100584_c628dc0b0d2650d0?_src=imagekit&tr=c-at_max,h-1280,q-40,w-720']
  },
  {
    id: 2,
    author: "Jane Smith",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
    date: "2023-10-02",
    rating: 8,
    content: "The service was excellent and the rooms were clean.",
    images: ['https://ik.imagekit.io/tvlk/ugc-review/guys1L+Yyer9kzI3sp-pb0CG1j2bhflZGFUZOoIf1YOBAm37kEUOKR41ieUZm7ZJ/ugc-photo-ap-southeast-1-581603780057-acd24e232f75f09e/REVIEW/REVIEW_1753244682976_bb4fe24dde4432d6?_src=imagekit&tr=c-at_max,h-1280,q-40,w-720',]
  },
  {
    id: 3,
    author: "Alice Johnson",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
    date: "2023-10-03",
    rating: 9,
    content: "Had a wonderful stay. Will come back again!",
    images: ['https://ik.imagekit.io/tvlk/ugc-review/guys1L+Yyer9kzI3sp-pb0CG1j2bhflZGFUZOoIf1YOBAm37kEUOKR41ieUZm7ZJ/ugc-photo-ap-southeast-1-581603780057-acd24e232f75f09e/REVIEW/REVIEW_1753244546072_7d877b61ae4e3e0a?_src=imagekit&tr=c-at_max,h-1280,q-40,w-720',]
  }
];

const mockHotel = {
  name: "Grand Hotel",
  type: "Hotel",
  rating: 8.8,
  minPrice: "$200",
  address: "123 Main St, City, Country",
  amenities: ["Free WiFi", "Pool", "Spa", "Gym"],
  description: "The Grand Hotel offers luxurious rooms with stunning views, top-notch amenities, and exceptional service. Perfect for both business and leisure travelers.",
  images: [
    "https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20048096-69f6ff7501afccbbdbd57cc3de21fc52.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724",
    "https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20048096-4fc3eb68978e69a7f493deb6dbddbc19.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724",
    "https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20048096-0e97b1980d4aa684427c0193e6b6418c.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-460,pr-true,q-40,w-724",
    "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20048096-0368d53d73dc502039060197fd00cc0d.jpeg?_src=imagekit&tr=c-at_max,f-jpg,fo-auto,h-332,pr-true,q-80,w-480",
    "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20048096-6960ca315c3908bc069f46573fd45c0f.jpeg?_src=imagekit&tr=c-at_max,f-jpg,fo-auto,h-162,pr-true,q-80,w-234.66666666666666",
    "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20048096-f1ec9c07fbedf655b60e8a6e81a499eb.jpeg?_src=imagekit&tr=c-at_max,f-jpg,fo-auto,h-162,pr-true,q-80,w-234.66666666666666",
  ],
  feedbacks: mockFeedbacks,
  rooms: mockRooms
};

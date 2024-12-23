
import hanoiImage from './assets/images/hanoi.webp';
import hoianImage from './assets/images/hoian.jpg';
import dalatImage from './assets/images/dalat.jpg';
import saigonImage from './assets/images/saigon.jpg';
import danangImage from './assets/images/danang.webp';

export const images = {
  hanoi: hanoiImage,
  hoian: hoianImage,
  dalat: dalatImage,
  saigon: saigonImage,
  danang: danangImage,
}

export const slides = [
    {
      id: 1,
      name: 'Ha Noi',
      image: hanoiImage,
      link: '/products/hanoi'
    },
    {
      id: 2,
      name: 'Hoi An',
      image: hoianImage,
      link: '/products/hanoi'
    },
    {
      id: 3,
      name: 'Da Lat',
      image: dalatImage,
      link: '/products/hanoi'
    },
    {
      id: 4,
      name: 'Sai Gon',
      image: saigonImage,
      link: '/products/hanoi'
    },
    {
      id: 5,
      name: 'Da Nang',
      image: danangImage,
      link: '/products/hanoi'
    },
    // Add more products as needed
];



export const fake_products = [
  {
    id: 1,
    name: "Dummy product",
    images: [
      "https://placehold.co/400x300?text=Main+Image",
      "https://placehold.co/100x75?text=Image+1",
      "https://placehold.co/100x75?text=Image+2",
      "https://placehold.co/100x75?text=Image+3"
    ],
    rating: 2.7,
    accommodation: "Hotel",
    location: "New York, USA",
    description: "This product is good",
    amenities: ["Wifi", "Parking", "Pool"],
    price: 129.99,
    position: [51.505, -0.09]
  },
  {
    id: 2,
    name: "Another dummy product",
    images: [
      "https://placehold.co/400x300?text=Main+Image",
      "https://placehold.co/100x75?text=Image+1",
      "https://placehold.co/100x75?text=Image+2",
      "https://placehold.co/100x75?text=Image+3"
    ],
    rating: 2.8,
    accommodation: "Hotel",
    location: "New York, USA",
    description: "Bla bla bla",
    amenities: ["Wifi", "Parking", "Pool", "Gym", "Spa"],
    price: 129.99,
    position: [51.515, -0.1]
  },
  {
    id: 3,
    name: "This is a very long name to test the overflow of the text",
    images: [
      "https://placehold.co/400x300?text=Main+Image",
      "https://placehold.co/100x75?text=Image+1",
      "https://placehold.co/100x75?text=Image+2",
      "https://placehold.co/100x75?text=Image+3"
    ],
    rating: 4.9,
    accommodation: "Hotel",
    location: "New York, USA",
    description: "This product is good",
    amenities: ["Wifi", "Parking", "Pool", "Bar", "Restaurant"],
    price: 129.99,
    position: [51.525, -0.11]
  },
  {
    id: 4,
    name: "Another dummy product",
    images: [
      "https://placehold.co/400x300?text=Main+Image",
      "https://placehold.co/100x75?text=Image+1",
      "https://placehold.co/100x75?text=Image+2",
      "https://placehold.co/100x75?text=Image+3"
    ],
    rating: 3.2,
    accommodation: "Hotel",
    location: "New York, USA",
    description: "Bla bla bla",
    amenities: ["Wifi", "Parking", "Pool", "Casino"],
    price: 129.99,
    position: [51.535, -0.12]
  },
];

export const fake_user = {
  fullName: "Nguyen Van Muoi",
  email: "muoi.nguyenvan@gmail.com",
  phone: "0987654321",
  address: "123 Nguyen Van Linh, Da Nang",
};

export const fake_locations = [
  {
    id: 1,
    name: "Hà Nội",
    count: 123
  },
  {
    id: 2,
    name: "Hồ Chí Minh",
    count: 123
  },
  {
    id: 3,
    name: "Đà Nẵng",
    count: 123
  },
  {
    id: 4,
    name: "Hải Phòng",
    count: 123
  },
  {
    id: 5,
    name: "Cần Thơ",
    count: 123
  },
  {
    id: 6,
    name: "Vũng Tàu",
    count: 123
  },
  {
    id: 7,
    name: "Quảng Ninh",
    count: 123
  },
  {
    id: 8,
    name: "Nha Trang",
    count: 123
  },
  {
    id: 9,
    name: "Đà Lạt",
    count: 123
  },
  {
    id: 10,
    name: "Phú Quốc",
    count: 123
  }
];